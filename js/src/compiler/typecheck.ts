import { IToken } from "../interfaces/ITokenizer.ts";
import { ASTKind, ASTTag, ASTType, BinOpType } from "../interfaces/astkinds.ts";
import { ArrayType, BaseType, FunctionType, GenericType, HeterogenousArrayType, LOGIC, NONE, NUMBER, NoneType, ReferenceType, STRING, SimpleType, Type, TypeVariants as TV, UNKNOWN, UnknownType } from "../interfaces/types.ts";
import { MutableTypeMap, TypeMap } from "./typemap.ts";

export class TypeCheckError extends Error {
	constructor(public msg: string, public token?: IToken | null) {
		super(msg)
	}
}

function compare(rt1: Type, rt2: Type, env: MutableTypeMap): boolean {
	const t1 = env.extract(rt1);
	const t2 = env.extract(rt2);

	if (t1.kind === TV.GENERIC && t2.kind === TV.NONE) return false;
	if (t2.kind === TV.GENERIC && t1.kind === TV.NONE) return false;

	if (t1.kind === TV.GENERIC && t2.kind === TV.GENERIC) {
		return t1.name === t2.name
	}

	// Binding generics to concrete types.
	if (t1.kind === TV.GENERIC) {

		if (t2.kind !== TV.GENERIC) {
			env.mutableSubstitute(t1.name, t2)
			return true
		} else {
			return compare(t1, t2, env);
		}
	}

	if (t2.kind === TV.GENERIC) {
		env.mutableSubstitute(t2.name, t1)
		return true;
	}

	// If neither are generic, we do a normal comparison.
	if (t1.kind !== t2.kind) return false;

	if (t1.kind === TV.NONE && t2.kind === TV.NONE) return true;
	if (t1.kind === TV.UNKNOWN && t2.kind === TV.UNKNOWN) return true;

	if (t1.kind === TV.SIMPLE && t2.kind === TV.SIMPLE) return t1.t === t2.t;
	if (t1.kind === TV.ARRAY && t2.kind === TV.ARRAY) return compare(t1.t, t2.t, env);
	if (t1.kind === TV.REFERENCE && t2.kind === TV.REFERENCE) return compare(t1.t, t2.t, env);

	if (t1.kind === TV.HETEROGENOUS && t2.kind === TV.HETEROGENOUS) {
		return t1.ts.every((t, idx) => compare(t, t2.ts[idx], env));
	}

	if (t1.kind === TV.FUNCTION && t2.kind === TV.FUNCTION) {
		const rTypeMatches = compare(t1.rType, t2.rType, env)
		const eitherNull = t1.argTypes === null || t2.argTypes === null

		if (eitherNull) {
			return rTypeMatches
		} else {
			return t1.argTypes.every((t, idx) => compare(t, t2.argTypes![idx], env));
		}
	}

	return false
}

function show(t: Type): string {
	switch (t.kind) {
		case TV.SIMPLE: {
			switch (t.t) {
				case BaseType.NUMBER:
					return "NUMBER";
				case BaseType.STRING:
					return "STRING";
				case BaseType.LOGIC:
					return "LOGIC";
			}
		}

		case TV.ARRAY:
			return `${show(t.t)} ARRAY`;
			
		case TV.REFERENCE:
			return `${show(t.t)} REFERENCE`;

		case TV.HETEROGENOUS: 
			return `[${t.ts.map((type) => show(type))}]`;

		case TV.FUNCTION: 
			return t.argTypes ? `FN(${t.argTypes.map(t => show(t))}) => ${show(t.rType)}` : `FN(?) => ${show(t.rType)}`

		case TV.GENERIC: 
			return t.name

		case TV.NONE: 
			return "NONE";

		case TV.UNKNOWN: 
			return "UNKNOWN";

		default:
			console.log(t)
			throw new TypeCheckError(`Show: Should not happen.`);
	}
}

function astTypeToType(type: ASTType): Type {
	let core: Type = type.core_type
	if (type.isArr) core = new ArrayType(core);
	if (type.byRef) core = new ReferenceType(core);

	return core
}


export function typeCheck(ast: ASTKind, env: TypeMap): [Type, TypeMap] {
	function ensure(ast: ASTKind, expected: Type, env: MutableTypeMap): [Type, MutableTypeMap] {
		const actual = typeCheck(ast, env)[0];

		if (!compare(actual, expected, env))
			throw new TypeCheckError(`${ast.token?.lexeme}: Expected ${show(expected)}, got ${show(actual)}`, ast.token);

		return [actual, env];
	}

	switch (ast.tag) {
		case ASTTag.ARRINDEX: {
			const nEnv = env.clone()
			ast.index.forEach(e => ensure(e, NUMBER, nEnv))
			const variable = env.get(ast.variable.name)

			if (variable.kind === TV.ARRAY) {
				return [variable.t, nEnv]
			} else if (variable.kind === TV.HETEROGENOUS) {
				return [new UnknownType(), nEnv]
			}

			throw new TypeCheckError(`Expected ${ast.variable.name} to be T ARRAY, got ${show(variable)}.`)
		}

		case ASTTag.ATOM: {
			if (typeof ast.value === "number") return [NUMBER, env];
			if (typeof ast.value === "boolean") return [LOGIC, env];
			if (typeof ast.value === "string") return [STRING, env];
			throw new TypeCheckError(`Expected number|string|boolean, got ${typeof ast.value}`);
		}

		case ASTTag.BINOP: {
			const { lhs, rhs } = ast;

			const nEnv = env.clone()
			function eqOrThrow(a1: ASTKind, a2: ASTKind) {
				const t1 = typeCheck(a1, nEnv)[0];
				const t2 = typeCheck(a2, nEnv)[0];

				if (!compare(t1, t2, nEnv)) {
					throw new TypeCheckError(`Expected both sides to be ${show(t1)}, but right side was ${show(t2)}`)
				}

			}

			switch (ast.op) {
				// Arithmetics
				case BinOpType.ADD:
				case BinOpType.SUB:
				case BinOpType.MUL:
				case BinOpType.DIV:
				case BinOpType.MOD:
					ensure(lhs, NUMBER, nEnv) && ensure(rhs, NUMBER, nEnv)
					return [NUMBER, nEnv]

				// Comparison
				case BinOpType.EQ:
				case BinOpType.GE:
				case BinOpType.LE:
				case BinOpType.NEQ:
				case BinOpType.MORE:
				case BinOpType.LESS:
					eqOrThrow(lhs, rhs);
					return [LOGIC, nEnv]

				// Logic
				case BinOpType.AND:
				case BinOpType.OR:
					ensure(lhs, LOGIC, nEnv) && ensure(rhs, LOGIC, nEnv)
					return [LOGIC, nEnv]
			}
		}

		case ASTTag.NOT: {
			const nEnv = env.clone()
			ensure(ast.expr, LOGIC, nEnv)
			return [LOGIC, nEnv]
		}

		case ASTTag.REFERENCE: {
			return [new ReferenceType(typeCheck(ast.inner, env)[0]), env]
		}

		case ASTTag.VARIABLE: {
			return [env.get(ast.name), env]
		}

		case ASTTag.ARRAYCOMP: {
			const nEnv = env.clone()
			const types = ast.expressions.map(e => typeCheck(e, env)[0]);
			const same = types.every(t => compare(t, types[0], nEnv))

			const varName = ("variable" in ast.variable) ? ast.variable.variable.name : ast.variable.name;
			const type = same ? new ArrayType(types[0]) : new HeterogenousArrayType(types)

			return [NONE, nEnv.with(varName, type)]
		}

		case ASTTag.ASSIGN: {
			const nEnv = env.clone()
			const valueType = typeCheck(ast.value, nEnv)[0]

			if (compare(valueType, NONE, nEnv)) {
				throw new TypeCheckError(`${ast.variable.token?.lexeme}: Assignment right hand side can't be NONE.`);
			}

			if (ast.variable.tag === ASTTag.ARRINDEX) {
				const variable = nEnv.get(ast.variable.variable.name)

				if (variable.kind === TV.ARRAY) {
					if (!compare(variable.t, valueType, nEnv)) {
						throw new TypeCheckError(`Previous (${show(variable.t)}) and current (${show(valueType)}) don't match.`)
					}

					if (!compare(variable.t, valueType, nEnv)) {
						throw new TypeCheckError(`Expected ${show(valueType)} ARRAY, got ${show(variable)}`)
					}

					ast.variable.index.forEach(e => ensure(e, NUMBER, nEnv))
					return [NONE, nEnv]
				} else if (variable.kind === TV.HETEROGENOUS) {
					ast.variable.index.forEach(e => ensure(e, NUMBER, nEnv))
					return [NONE, nEnv]
				} else {
					throw new TypeCheckError(`Expected ${show(valueType)} ARRAY, got ${show(variable)}`)
				}
			} else {
				const currentType = nEnv.maybeGet(ast.variable.name);

				if (currentType !== null) {
					if (!compare(currentType, valueType, nEnv)) {
						throw new TypeCheckError(`Previous (${show(currentType)}) and current (${show(valueType)}) don't match.`)
					}
				}

				return [NONE, nEnv.with(ast.variable.name, typeCheck(ast.value, nEnv)[0])]
			}
		}

		case ASTTag.BLOCK: {
			const wantToPush = (ast: ASTKind) => [ASTTag.IF, ASTTag.FOR, ASTTag.RETURN, ASTTag.WHILE].some(t => ast.tag === t)

			const state = ast.statements.reduce<{ types: Type[], env: TypeMap }>(
				(state, statement) => {
					const step = typeCheck(statement, state.env);
					return { types: wantToPush(statement) ? state.types.concat(step[0]) : state.types, env: step[1] }
				}, { types: [], env })

			const nEnv = state.env.clone()

			const types = state.types.filter(t => !compare(t, NONE, nEnv))
			if (types.length === 0) return [NONE, nEnv]
			if (types.length === 1) return [types[0], nEnv]

			return [new HeterogenousArrayType(types), nEnv]
		}

		case ASTTag.DEBUG: {
			return [NONE, env]
		}

		case ASTTag.FOR: {
			const nEnv = env.clone()
			ensure(ast.from, NUMBER, nEnv)
			ensure(ast.to, NUMBER, nEnv)

			return typeCheck(ast.body, nEnv.with(ast.variable.name, NUMBER))
		}

		case ASTTag.FUNCDECL: {
			const rType: Type = (() => {
				if (ast.return_type === null) return UNKNOWN
				return astTypeToType(ast.return_type)
			})()

			const types = ast.parameters.map(t => typeCheck(t, env)[0])
			const fTypeEnv = types.reduce<TypeMap>((state, t, idx) => {
				const arg = ast.parameters[idx].name
				const name = (typeof arg === "string") ? arg : arg.name
				const inner = (t instanceof ReferenceType) ? t.t : t;

				return state.with(name, inner)
			}, env).with(ast.name, new FunctionType(rType, null, null))

			const nEnv = fTypeEnv.clone()
			const type = typeCheck(ast.body, nEnv)[0]
			if (!compare(rType, UNKNOWN, nEnv) && !compare(type, rType, nEnv)) {
				throw new TypeCheckError(`Type signature (${show(rType)}) and calculated return type (${show(type)}) don't match!`)
			}
			return [NONE, env.with(ast.name, new FunctionType(type, types, ast))]
		}

		case ASTTag.FUNCCALL: {
			const func = env.get(ast.name);
			if (!(func instanceof FunctionType)) throw new TypeCheckError("nonfunc");

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
				throw new TypeCheckError("Nodef")
			}

			if (at.length != ast.arguments.length) throw new TypeCheckError("len")

			// Arguments arrive in reverse order, so we need to do a copy and reverse before we can compare the types.
			const nEnv = ast.arguments.toReversed().reduce<TypeMap>((state, arg, idx) => {
				const type = ("lexeme" in arg) ? env.get(arg.lexeme) : typeCheck(arg, env)[0]
				const name = ("lexeme" in arg) ? arg.lexeme : arg.token!.lexeme;
				const expected = at[idx];

				const mstate = state.clone()
				if (!compare(type, expected, mstate)) throw new TypeCheckError(`${name}: Expected ${show(mstate.extract(expected))}, got ${show(type)}.`)
				return mstate.with(name, type)
			}, env)

			typeCheck(func.decl, nEnv)
			return [func.rType, nEnv]
		}

		case ASTTag.PARAMETER: {
			const isFunc = (typeof ast.name === "string")
			let type = astTypeToType(ast.type)
			if (isFunc) type = new FunctionType(type, null, null)

			return [type, env]
		}

		case ASTTag.IF: {
			const nEnv = env.clone()
			ensure(ast.main_path.pred, LOGIC, nEnv)
			const mainType = typeCheck(ast.main_path.branch, env)[0]

			const elseType = ast.false_path ? typeCheck(ast.false_path, env)[0] : null
			const elifTypes = ast.elif_path.map(p => (ensure(p.pred, LOGIC, nEnv), typeCheck(p.branch, env)[0]))

			if (elseType && !compare(mainType, elseType, nEnv)) {
				throw new TypeCheckError(`If has type ${show(mainType)}, but else has ${show(elseType)}.`)
			}

			elifTypes.forEach((t, idx) => {
				if (!compare(mainType, t, nEnv)) {
					throw new TypeCheckError(`If has type ${show(mainType)}, but the ${idx + 1}th else if has ${show(t)}.`)
				}
			})

			return [mainType, nEnv]
		}

		case ASTTag.NEWARRAY: {
			const nEnv = env.clone()
			ast.dimensions.forEach(e => ensure(e, NUMBER, nEnv))

			return [NONE, nEnv.with(ast.variable.name, new ArrayType(ast.type))]
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
			const nEnv = env.clone()
			ensure(ast.var1, t2, nEnv)

			return [NONE, nEnv]
		}

		case ASTTag.WHILE: {
			const nEnv = env.clone()
			ensure(ast.predicate, LOGIC, nEnv)
			return typeCheck(ast.body, nEnv)
		}
	}
}