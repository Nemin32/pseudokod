import { ASTKind, BinOpType, Expression, Parameter } from "../interfaces/astkinds.ts";
import { ArrayType, BaseType, FunctionType, GenericType, HeterogenousArrayType, LOGIC, NONE, NUMBER, NoneType, ReferenceType, STRING, SimpleType, Type, TypeCheckError, TypeVariants, UnknownType } from "../interfaces/types.ts";
import { parseBlock } from "./parser/ast_parser.ts";
import { t } from "./parser/test.ts";
import { TypeMap } from "./typemap.ts";

function compare(t1: Type, t2: Type): boolean {
	if (t1 instanceof NoneType && t2 instanceof NoneType) return true;
	if (t1 instanceof UnknownType && t2 instanceof UnknownType) return true;

	if (t1 instanceof SimpleType && t2 instanceof SimpleType) return t1.t === t2.t;
	if (t1 instanceof ArrayType && t2 instanceof ArrayType) return compare(t1.t, t2.t);
	if (t1 instanceof ReferenceType && t2 instanceof ReferenceType) return compare(t1.t, t2.t);

	if (t1 instanceof HeterogenousArrayType && t2 instanceof HeterogenousArrayType) {
		return t1.ts.every((t, idx) => compare(t, t2.ts[idx]));
	}

	if (t1 instanceof FunctionType && t2 instanceof FunctionType) {
		const rTypeMatches = compare(t1.rType, t2.rType)
		const bothNull = t1.argTypes === null && t2.argTypes === null

		if (bothNull) {
			return rTypeMatches
		} else {
			if (t1.argTypes === null || t2.argTypes === null) return false;
			return t1.argTypes.every((t, idx) => compare(t, t2.argTypes![idx]));
		}
	}

	if (t1 instanceof GenericType && t2 instanceof GenericType) {
		return t1.name === t2.name
	}

	return false;
}

function show(t: Type): string {
	if (t instanceof SimpleType) {
		switch (t.t) {
			case BaseType.NUMBER:
				return "NUMBER";
			case BaseType.STRING:
				return "STRING";
			case BaseType.LOGIC:
				return "LOGIC";
		}
	}

	if (t instanceof ArrayType) {
		return `${show(t.t)} ARRAY`;
	}

	if (t instanceof ReferenceType) {
		return `${show(t.t)} REFERENCE`;
	}

	if (t instanceof NoneType) return "NONE";
	if (t instanceof UnknownType) return "UNKNOWN";

	if (t instanceof HeterogenousArrayType) return `[${t.ts.map((type) => show(type))}]`;

	if (t instanceof FunctionType) return t.argTypes ? `FN(${t.argTypes.map(t => show(t))}) => ${show(t.rType)}` : `FN(?) => ${show(t.rType)}`
	if (t instanceof GenericType) return t.name

	throw new Error(`Show: Should not happen.`);
}


export function typeCheck(ast: ASTKind, env: TypeMap): [Type, TypeMap] {
	function ensure(ast: ASTKind, expected: Type): Type {
		const actual = typeCheck(ast, env)[0];

		// TEMP FIXME
		if (actual instanceof GenericType) return actual;

		if (!compare(actual, expected))
			throw new TypeCheckError(`Expected ${show(expected)}, got ${show(actual)}`, ast.token);

		return actual;
	}

	switch (ast.tag) {
		case "arrindex": {
			ast.index.forEach(e => ensure(e, NUMBER))
			const variable = env.get(ast.variable.name)

			if (variable.kind === TypeVariants.ARRAY) {
				return [variable.t, env]
			} else if (variable.kind === TypeVariants.HETEROGENOUS) {
				return [new UnknownType(), env]
			}

			throw new Error(`Expected ${ast.variable.name} to be T ARRAY, got ${show(variable)}.`)
		}

		case "atom": {
			if (typeof ast.value === "number") return [NUMBER, env];
			if (typeof ast.value === "boolean") return [LOGIC, env];
			if (typeof ast.value === "string") return [STRING, env];
			throw new Error(`Expected number|string|boolean, got ${typeof ast.value}`);
		}

		case "binop": {
			const { lhs, rhs } = ast;

			function eqOrThrow(a1: ASTKind, a2: ASTKind) {
				const t1 = typeCheck(a1, env)[0];
				const t2 = typeCheck(a2, env)[0];

				if (!compare(t1, t2)) {
					throw new Error(`Expected both sides to be ${show(t1)}, but right side was ${show(t2)}`)
				}
			}

			switch (ast.op) {
				// Arithmetics
				case BinOpType.ADD:
				case BinOpType.SUB:
				case BinOpType.MUL:
				case BinOpType.DIV:
				case BinOpType.MOD:
					ensure(lhs, NUMBER) && ensure(rhs, NUMBER)
					return [NUMBER, env]

				// Comparison
				case BinOpType.EQ:
				case BinOpType.GE:
				case BinOpType.LE:
				case BinOpType.NEQ:
				case BinOpType.GREATER:
				case BinOpType.LESS:
					eqOrThrow(lhs, rhs);
					return [LOGIC, env]

				// Logic
				case BinOpType.AND:
				case BinOpType.OR:
					ensure(lhs, LOGIC) && ensure(rhs, LOGIC)
					return [LOGIC, env]
			}
		}

		case "not": {
			ensure(ast.expr, LOGIC)
			return [LOGIC, env]
		}

		case "reference": {
			return [new ReferenceType(typeCheck(ast.inner, env)[0]), env]
		}

		case "variable": {
			return [env.get(ast.name), env]
		}

		case "arrcomp": {
			const types = ast.expressions.map(e => typeCheck(e, env)[0]);
			const same = types.every(t => compare(t, types[0]))

			if (same) {
				return [new ArrayType(types[0]), env]
			} else {
				return [new HeterogenousArrayType(types), env]
			}
		}

		case "assign": {
			const valueType = typeCheck(ast.value, env)[0]

			if (ast.variable.tag === "arrindex") {
				const variable = env.get(ast.variable.variable.name)
				if (variable.kind === TypeVariants.ARRAY) {
					if (!compare(variable.t, valueType)) {
						throw new Error(`Expected ${show(valueType)} ARRAY, got ${show(variable)}`)
					}

					ast.variable.index.forEach(e => ensure(e, NUMBER))
					return [NONE, env]
				} else if (variable.kind === TypeVariants.HETEROGENOUS) {
					ast.variable.index.forEach(e => ensure(e, NUMBER))
					return [NONE, env]
				} else {
					throw new Error(`Expected ${show(valueType)} ARRAY, got ${show(variable)}`)
				}
			} else {
				return [NONE, env.with(ast.variable.name, typeCheck(ast.value, env)[0])]
			}
		}

		case "block": {
			const wantToPush = (ast: ASTKind) => ["if", "for", "return", "while"].some(t => ast.tag === t)

			const state = ast.statements.reduce<{ types: Type[], env: TypeMap }>(
				(state, statement) => {
					const step = typeCheck(statement, state.env);
					return { types: wantToPush(statement) ? state.types.concat(step[0]) : state.types, env: step[1] }
				}, { types: [], env })

			const types = state.types.filter(t => !compare(t, NONE))
			if (types.length === 0) return [NONE, state.env]
			if (types.length === 1) return [types[0], state.env]


			return [new HeterogenousArrayType(types), state.env]
		}

		case "debug": {
			return [NONE, env]
		}

		case "for": {
			ensure(ast.from, NUMBER)
			ensure(ast.to, NUMBER)

			return typeCheck(ast.body, env.with(ast.variable.name, NUMBER))
		}

		case "funcdecl": {
			const types = ast.parameters.map(t => typeCheck(t, env)[0])
			const nEnv = types.reduce<TypeMap>((state, t, idx) => {
				const arg = ast.parameters[idx].name
				const name = (typeof arg === "string") ? arg : arg.name
				const inner = (t instanceof ReferenceType) ? t.t : t;

				return state.with(name, inner)
			}, env).with(ast.name, new FunctionType(NUMBER, null, null))

			const type = typeCheck(ast.body, nEnv)[0]
			return [NONE, env.with(ast.name, new FunctionType(type, types, ast))]
		} break;

		case "funccall": {
			const func = env.get(ast.name);
			if (!(func instanceof FunctionType)) throw new Error("nonfunc");

			// argTypes is null if we don't yet know how many / what type of args we have.
			// For instance:
			//
			// függvény A(Belső : egész)
			//  vissza Belső(5)
			// függvény vége
			//
			// We know Belső has returntype number, but not what args it takes.
			const at = func.argTypes;
			if (at === null) {
				return [func.rType, env];
			}

			if (func.decl === null) {
				throw new Error("Nodef")
			}

			if (at.length != ast.arguments.length) throw new Error("len")

			const nEnv = ast.arguments.reduce<TypeMap>((state, arg, idx) => {
				const type = ("lexeme" in arg) ? env.get(arg.lexeme) : typeCheck(arg, env)[0]
				const name = ("lexeme" in arg) ? arg.lexeme : arg.token!.lexeme;
				const expected = at[idx];

				if (expected instanceof GenericType) {
					return state.substitute(expected.name, type).with(name, type)
				} else {
					if (!compare(type, expected)) throw new Error("Types not match")
					return state.with(name, type)
				}
			}, env)

			typeCheck(func.decl, nEnv)
			return [func.rType, env]
		} break;

		case "param": {
			const isFunc = (typeof ast.name === "string")
			let type: Type = ast.type
			if (ast.isArr) type = new ArrayType(type);
			if (ast.byRef) type = new ReferenceType(type);
			if (isFunc) type = new FunctionType(type, null, null)

			return [type, env]
		} break;

		case "if": {
			ensure(ast.main_path.pred, LOGIC)
			const mainType = typeCheck(ast.main_path.branch, env)[0]

			const elseType = ast.false_path ? typeCheck(ast.false_path, env)[0] : null
			const elifTypes = ast.elif_path.map(p => (ensure(p.pred, LOGIC), typeCheck(p.branch, env)[0]))

			if (elseType && !compare(mainType, elseType)) {
				throw new Error(`If has type ${show(mainType)}, but else has ${show(elseType)}.`)
			}

			elifTypes.forEach((t, idx) => {
				if (!compare(mainType, t)) {
					throw new Error(`If has type ${show(mainType)}, but the ${idx + 1}th else if has ${show(t)}.`)
				}
			})

			return [mainType, env]
		}

		case "arrnew": {
			ast.dimensions.forEach(e => ensure(e, NUMBER))

			return [NONE, env.with(ast.variable.name, new ArrayType(ast.type))]
		}

		case "print": {
			typeCheck(ast.expr, env)
			return [NONE, env]
		}

		case "return": {
			if (Array.isArray(ast.expr)) {
				return [new HeterogenousArrayType(ast.expr.map(e => typeCheck(e, env)[0])), env]
			} else {
				return typeCheck(ast.expr, env)
			}
		}

		case "swap": {
			const t2 = typeCheck(ast.var2, env)[0]
			ensure(ast.var1, t2)

			return [NONE, env]
		}

		case "while": {
			ensure(ast.predicate, LOGIC)
			return typeCheck(ast.body, env)
		}
	}

	return [new UnknownType(), env]
}


/*
const block = parseBlock.run(t(`
függvény Teszt(x : G, y : G)
vissza (x * y, x, y)
függvény vége

a <- Teszt(5, 6)
`))

if (block.type === "match") {
	console.log(typeCheck(block.value, new TypeMap([], [])))
}
 */

/*


		case "funcdecl": {
			const nEnv = ast.parameters.reduce<TypeMap>((map, param) => {
				const name = (typeof param.name === "string")
					? param.name
					: param.name.name

				const rawType = typeCheck(param, env)[0]
				const type = (rawType instanceof ReferenceType)
					? rawType.t
					: rawType

				return map.with(name, type)
			}, env)

			const rType = typeCheck(ast.body, nEnv)[0]
			const argTypes = ast.parameters.map(p => typeCheck(p, env)[0])
			return [NONE, env.with(ast.name, new FunctionType(rType, argTypes, ast))]
		}

		case "funccall": {
			const func = env.get(ast.name)
			if (!(func instanceof FunctionType)) throw new Error(`${ast.name} isn't bound to a function! (${show(func)})`)

			if (func.argTypes.length !== ast.arguments.length) {
				throw new Error(`${ast.name}: Expected ${func.argTypes.length} arguments, but got ${ast.arguments.length}.`)
			}

			const argToType = (arg: IToken | Expression) => {
				if ("lexeme" in arg) {
					const innerFunc = env.get(arg.lexeme)
					if (!(func instanceof FunctionType)) throw new Error(`${arg.lexeme} isn't bound to a function! (${show(func)})`)
					return innerFunc
				} else {
					return typeCheck(arg, env)[0]
				}
			}

			const nEnv = ast.arguments.reduce<TypeMap>((state, arg, idx) => {
				const func = state.get(ast.name) as FunctionType
				const argType = argToType(arg);
				const rawExpected = func.argTypes[idx]
				const expected = (rawExpected instanceof GenericType)
					? state.getSubst(rawExpected)
					: rawExpected

				if (compare(argType, expected)) {
					return state;
				} else {
					if (expected instanceof GenericType) {
						return state.substitute(expected.name, argType)
					} else {
						throw new Error(`Expected ${show(expected)}, got ${show(argType)}.`)
					}
				}

			}, env)


			// After substituting the generics, we have to recheck that the function declaration is still consistent.
			// i.e. no 
			typeCheck(func.decl, nEnv)
			return [func.rType, nEnv];


		} break;

		case "param": {
			let paramType: Type = ast.type
			if (ast.isArr) paramType = new ArrayType(paramType);

			if (ast.byRef) {
				return [new ReferenceType(paramType), env]
			} else {
				return [paramType, env]
			}
		}
 */
