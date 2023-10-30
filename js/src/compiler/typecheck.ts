import { ASTKind, ASTTag, BinOpType } from "../interfaces/astkinds.ts";
import { ArrayType, BaseType, FunctionType, GenericType, HeterogenousArrayType, LOGIC, NONE, NUMBER, NoneType, ReferenceType, STRING, SimpleType, Type, TypeCheckError, TypeVariants, UnknownType } from "../interfaces/types.ts";
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
		case ASTTag.ARRINDEX: {
			ast.index.forEach(e => ensure(e, NUMBER))
			const variable = env.get(ast.variable.name)

			if (variable.kind === TypeVariants.ARRAY) {
				return [variable.t, env]
			} else if (variable.kind === TypeVariants.HETEROGENOUS) {
				return [new UnknownType(), env]
			}

			throw new Error(`Expected ${ast.variable.name} to be T ARRAY, got ${show(variable)}.`)
		}

		case ASTTag.ATOM: {
			if (typeof ast.value === "number") return [NUMBER, env];
			if (typeof ast.value === "boolean") return [LOGIC, env];
			if (typeof ast.value === "string") return [STRING, env];
			throw new Error(`Expected number|string|boolean, got ${typeof ast.value}`);
		}

		case ASTTag.BINOP: {
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
				case BinOpType.MORE:
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

		case ASTTag.NOT: {
			ensure(ast.expr, LOGIC)
			return [LOGIC, env]
		}

		case ASTTag.REFERENCE: {
			return [new ReferenceType(typeCheck(ast.inner, env)[0]), env]
		}

		case ASTTag.VARIABLE: {
			return [env.get(ast.name), env]
		}

		case ASTTag.ARRAYCOMP: {
			const types = ast.expressions.map(e => typeCheck(e, env)[0]);
			const same = types.every(t => compare(t, types[0]))

			if (same) {
				return [NONE, env.with(ast.variable.name, new ArrayType(types[0]))]
			} else {
				return [NONE, env.with(ast.variable.name, new HeterogenousArrayType(types))]
			}
		}

		case ASTTag.ASSIGN: {
			const valueType = typeCheck(ast.value, env)[0]

			if (ast.variable.tag === ASTTag.ARRINDEX) {
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

		case ASTTag.BLOCK: {
			const wantToPush = (ast: ASTKind) => [ASTTag.IF, ASTTag.FOR, ASTTag.RETURN, ASTTag.WHILE].some(t => ast.tag === t)

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

		case ASTTag.DEBUG: {
			return [NONE, env]
		}

		case ASTTag.FOR: {
			ensure(ast.from, NUMBER)
			ensure(ast.to, NUMBER)

			return typeCheck(ast.body, env.with(ast.variable.name, NUMBER))
		}

		case ASTTag.FUNCDECL: {
			const types = ast.parameters.map(t => typeCheck(t, env)[0])
			const nEnv = types.reduce<TypeMap>((state, t, idx) => {
				const arg = ast.parameters[idx].name
				const name = (typeof arg === "string") ? arg : arg.name
				const inner = (t instanceof ReferenceType) ? t.t : t;

				return state.with(name, inner)
			}, env).with(ast.name, new FunctionType(NUMBER, null, null))

			const type = typeCheck(ast.body, nEnv)[0]
			return [NONE, env.with(ast.name, new FunctionType(type, types, ast))]
		}

		case ASTTag.FUNCCALL: {
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

			// Arguments arrive in reverse order, so we need to do a copy and reverse before we can compare the types.
			const nEnv = [...ast.arguments].reverse().reduce<TypeMap>((state, arg, idx) => {
				const type = ("lexeme" in arg) ? env.get(arg.lexeme) : typeCheck(arg, env)[0]
				const name = ("lexeme" in arg) ? arg.lexeme : arg.token!.lexeme;
				const expected = at[idx];

				if (expected instanceof GenericType) {
					return state.substitute(expected.name, type).with(name, type)
				} else {
					if (!compare(type, expected)) throw new Error(`Expected ${show(expected)}, got ${show(type)}.`)
					return state.with(name, type)
				}
			}, env)

			typeCheck(func.decl, nEnv)
			return [func.rType, env]
		}

		case ASTTag.PARAMETER: {
			const isFunc = (typeof ast.name === "string")
			let type: Type = ast.type
			if (ast.isArr) type = new ArrayType(type);
			if (ast.byRef) type = new ReferenceType(type);
			if (isFunc) type = new FunctionType(type, null, null)

			return [type, env]
		}

		case ASTTag.IF: {
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

		case ASTTag.NEWARRAY: {
			ast.dimensions.forEach(e => ensure(e, NUMBER))

			return [NONE, env.with(ast.variable.name, new ArrayType(ast.type))]
		}

		case ASTTag.PRINT: {
			typeCheck(ast.expr, env)
			return [NONE, env]
		}

		case ASTTag.RETURN: {
			if (Array.isArray(ast.expr)) {
				return [new HeterogenousArrayType(ast.expr.map(e => typeCheck(e, env)[0])), env]
			} else {
				return typeCheck(ast.expr, env)
			}
		}

		case ASTTag.SWAP: {
			const t2 = typeCheck(ast.var2, env)[0]
			ensure(ast.var1, t2)

			return [NONE, env]
		}

		case ASTTag.WHILE: {
			ensure(ast.predicate, LOGIC)
			return typeCheck(ast.body, env)
		}
	}
}