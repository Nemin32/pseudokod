import { IToken } from "./ITokenizer.ts";

type ASTBase<Tag extends string, Fields> = { tag: Tag, token: IToken | null } & Fields;

export type AtomValue = number | string | boolean;

export type Atom = ASTBase<"atom", {
  value: AtomValue;
}>

export type Debug = ASTBase<"debug", {msg?: string}>

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
  index: Expression;
}>

export type Reference = ASTBase<"reference", {
  inner: Variable | ArrayIndex;
}>

export type NewArray = ASTBase<"arrnew",{
  type: string;
  length: Expression;
}>

export type ArrayComprehension = ASTBase<"arrcomp", {
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
  arguments: Expression[];
}>

export type FunctionDeclaration = ASTBase<"funcdecl", {
  name: string;
  parameters: Parameter[];
  body: Block;
}>

export type Parameter = ASTBase<"param", {
  name: Variable | string; // string = funcname
  type: string;
  byRef: boolean;
}>

export type Swap = ASTBase<"swap", {
  var1: Variable | ArrayIndex,
  var2: Variable | ArrayIndex
}>

export type Expression =
  | Atom
  | BinaryOperation
  | Variable
  | Reference
  | Not
  | ArrayComprehension
  | ArrayIndex
  | FunctionCall
  | NewArray;

export type Statement =
  | Block
  | If
  | Assignment
  | While
  | For
  | Print
  | Return
  | FunctionDeclaration
  | Debug
  | Swap

export type ASTKind = Expression | Statement | Parameter;
