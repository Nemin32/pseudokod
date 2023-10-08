import { IToken } from "./ITokenizer.ts";

export enum BaseType {
	NUMBER,
	STRING,
	LOGIC
}

export function stringToBaseType(type: string): BaseType {
	switch (type) {
		case "egész": return BaseType.NUMBER
		case "szöveg": return BaseType.STRING
		case "logikai": return BaseType.LOGIC
	}

	throw new Error(`Expected type, got ${type}.`)
}

type ASTBase<Tag extends string, Fields> = { tag: Tag, token: IToken | null } & Fields;

export type AtomValue = number | string | boolean;

export type Atom = ASTBase<"atom", {
	value: AtomValue;
	type: BaseType
}>

export type Debug = ASTBase<"debug", { msg?: string }>

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
	GREATER = 10,

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
	[">", BinOpType.GREATER],
	["és", BinOpType.AND],
	["vagy", BinOpType.OR],
]);

export type BinaryOperation = ASTBase<"binop", {
	lhs: Expression;
	rhs: Expression;
	op: BinOpType;
}>

export type If = ASTBase<"if", {
	main_path: { pred: Expression; branch: Block };
	elif_path: Array<{ pred: Expression; branch: Block }>;
	false_path: Block | null;
}>

export type Block = ASTBase<"block", {
	statements: Statement[];
}>

export type Variable = ASTBase<"variable", {
	name: string;
}>

export type ArrayIndex = ASTBase<"arrindex", {
	variable: Variable;
	index: Expression[];
}>

export type Reference = ASTBase<"reference", {
	inner: Variable | ArrayIndex;
}>

export type NewArray = ASTBase<"arrnew", {
	type: BaseType;
	dimensions: Expression[];
	variable: Variable
}>

export type ArrayComprehension = ASTBase<"arrcomp", {
	variable: Variable;
	expressions: Array<Expression>;
}>

export type Assignment = ASTBase<"assign", {
	variable: Variable | ArrayIndex;
	value: Expression;
}>

export type For = ASTBase<"for", {
	from: Expression;
	to: Expression;
	variable: Variable;
	body: Block;
}>

export type While = ASTBase<"while", {
	predicate: Expression;
	body: Block;
	postPred: boolean; // true -> do while
}>

export type Not = ASTBase<"not", {
	expr: Expression;
}>

export type Print = ASTBase<"print", {
	expr: Expression;
}>

export type Return = ASTBase<"return", {
	expr: Expression;
}>

export type FunctionCall = ASTBase<"funccall", {
	name: string;
	arguments: (Expression | IToken)[];
}>

export type FunctionDeclaration = ASTBase<"funcdecl", {
	name: string;
	parameters: Parameter[];
	body: Block;
}>

export type Parameter = ASTBase<"param", {
	name: Variable | string; // string = funcname
	type: BaseType;
	byRef: boolean;
	isArr: boolean;
}>

export type Swap = ASTBase<"swap", {
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
	| Block
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

export type ASTKind = Expression | Statement | Parameter;
