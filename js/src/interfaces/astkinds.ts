import { GenericType, LOGIC, NUMBER, STRING, SimpleType, Type } from "./types.ts";
import { IToken } from "./ITokenizer.ts";
import { TypeCheckError } from "../compiler/typecheck.ts";

export function stringToBaseType(type: string): SimpleType | GenericType {
	switch (type) {
		case "egész": return NUMBER
		case "szöveg": return STRING
		case "logikai": return LOGIC
	}

	// For stuff like Function(x : T)
	if (type.length === 1 && type >= 'A' && type <= 'Z') return new GenericType(type)

	throw new TypeCheckError(`Expected type, got ${type}.`)
}

export enum ASTTag {
	ARRAYCOMP,
	ARRINDEX,
	ASSIGN,
	ATOM,
	BINOP,
	BLOCK,
	DEBUG,
	FOR,
	FUNCCALL,
	FUNCDECL,
	IF,
	NEWARRAY,
	NOT,
	PARAMETER,
	PRINT,
	REFERENCE,
	RETURN,
	SWAP,
	VARIABLE,
	WHILE,
}

type ASTBase<Tag extends ASTTag, Fields> = { tag: Tag, token: IToken | null } & Readonly<Fields>;

export type AtomValue = number | string | boolean;

export type Atom = ASTBase<ASTTag.ATOM, {
	value: AtomValue;
	type: SimpleType
}>

export type Debug = ASTBase<ASTTag.DEBUG, { msg?: string }>

export enum BinOpType {
	ADD = 0,
	SUB = 1,
	MUL = 2,
	DIV = 3,
	MOD = 4,

	EQ = 5,
	NEQ = 6,

	LE = 7,
	GE = 8,

	LESS = 9,
	MORE = 10,

	AND = 11,
	OR = 12,
}

export const BinOpTypeMap = new Map([
	["+", BinOpType.ADD],
	["-", BinOpType.SUB],
	["*", BinOpType.MUL],
	["/", BinOpType.DIV],
	["mod", BinOpType.MOD],
	["=", BinOpType.EQ],
	["=/=", BinOpType.NEQ],
	["<=", BinOpType.LE],
	[">=", BinOpType.GE],
	["<", BinOpType.LESS],
	[">", BinOpType.MORE],
	["és", BinOpType.AND],
	["vagy", BinOpType.OR],
]);

export type BinaryOperation = ASTBase<ASTTag.BINOP, {
	lhs: Expression;
	rhs: Expression;
	op: BinOpType;
}>

export type If = ASTBase<ASTTag.IF, {
	main_path: { pred: Expression; branch: Block };
	elif_path: Array<{ pred: Expression; branch: Block }>;
	false_path: Block | null;
}>

export type Block = ASTBase<ASTTag.BLOCK, {
	statements: Statement[];
}>

export type Variable = ASTBase<ASTTag.VARIABLE, {
	name: string;
}>

export type ArrayIndex = ASTBase<ASTTag.ARRINDEX, {
	variable: Variable;
	index: Expression[];
}>

export type Reference = ASTBase<ASTTag.REFERENCE, {
	inner: Variable | ArrayIndex;
}>

export type NewArray = ASTBase<ASTTag.NEWARRAY, {
	type: SimpleType | GenericType;
	dimensions: Expression[];
	variable: Variable
}>

export type ArrayComprehension = ASTBase<ASTTag.ARRAYCOMP, {
	variable: ArrayIndex | Variable;
	expressions: Array<Expression>;
}>

export type Assignment = ASTBase<ASTTag.ASSIGN, {
	variable: Variable | ArrayIndex;
	value: Expression;
}>

export type For = ASTBase<ASTTag.FOR, {
	from: Expression;
	to: Expression;
	variable: Variable;
	body: Block;
}>

export type While = ASTBase<ASTTag.WHILE, {
	predicate: Expression;
	body: Block;
	postPred: boolean; // true -> do while
}>

export type Not = ASTBase<ASTTag.NOT, {
	expr: Expression;
}>

export type Print = ASTBase<ASTTag.PRINT, {
	expr: Expression;
}>

export type Return = ASTBase<ASTTag.RETURN, {
	expr: Expression | Expression[];
}>

export type FunctionCall = ASTBase<ASTTag.FUNCCALL, {
	name: string;
	arguments: (Expression | IToken)[];
}>

export type ASTType = {
	core_type: SimpleType | GenericType;
	byRef: boolean;
	isArr: boolean;
}

export type FunctionDeclaration = ASTBase<ASTTag.FUNCDECL, {
	name: string;
	parameters: Parameter[];
	body: Block;
	return_type: ASTType | null
}>

export type Parameter = ASTBase<ASTTag.PARAMETER, {
	name: Variable | string; // string = funcname
	type: ASTType
}>

export type Swap = ASTBase<ASTTag.SWAP, {
	var1: Variable | ArrayIndex,
	var2: Variable | ArrayIndex
}>

export type Expression =
	| ArrayIndex
	| Atom
	| BinaryOperation
	| FunctionCall
	| Not
	| Reference
	| Variable

export type Statement =
	| ArrayComprehension
	| Assignment
	| Debug
	| For
	| FunctionCall
	| FunctionDeclaration
	| If
	| NewArray
	| Print
	| Return
	| Swap
	| While;

export type ASTKind = Expression | Statement | Block | Parameter;
