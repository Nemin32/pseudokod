import { IAST } from "./IParser.ts";

export type AtomValue = number | string | boolean;

export interface Atom {
  tag: "atom";
  value: AtomValue;
}

export interface Debug {
  tag: "debug";
}

export interface BinaryOperation {
  tag: "binop";
  lhs: IAST<Expression>;
  rhs: IAST<Expression>;
}

export interface If {
  tag: "if";
  main_path: { pred: IAST<Expression>; branch: IAST<Block> };
  elif_path: Array<{ pred: IAST<Expression>; branch: IAST<Block> }>;
  false_path: IAST<Block> | null;
}

export interface Block {
  tag: "block";
  statements: IAST<Statement>[];
}

export interface Variable {
  tag: "variable";
  name: string;
}

export interface ArrayIndex {
  tag: "arrindex";
  variable: IAST<Variable>;
  index: IAST<Expression>;
}

export interface Reference {
  tag: "reference";
  inner: IAST<Variable> | IAST<ArrayIndex>;
}

export interface NewArray {
  tag: "arrnew";
  type: string;
  length: number;
}

export interface ArrayComprehension {
  tag: "arrcomp";
  expressions: Array<Expression>;
}

export interface Assignment {
  tag: "assign";
  variable: IAST<Variable> | IAST<ArrayIndex>;
  value: IAST<Expression>;
}

export interface For {
  tag: "for";
  from: IAST<Expression>;
  to: IAST<Expression>;
  variable: IAST<Variable>;
  body: IAST<Block>;
}

export interface While {
  tag: "while";
  predicate: IAST<Expression>;
  body: IAST<Block>;
  postPred: boolean; // true -> do while
}

export interface Not {
  tag: "not";
  expr: IAST<Expression>;
}

export interface Print {
  tag: "print";
  expr: IAST<Expression>;
}

export interface Return {
  tag: "return";
  expr: IAST<Expression>;
}

export interface FunctionCall {
  tag: "funccall";
  name: string;
  arguments: IAST<Expression>[];
}

export interface FunctionDeclaration {
  tag: "funcdecl";
  name: string;
  parameters: IAST<Parameter>[];
  body: IAST<Block>;
}

export interface Parameter {
  tag: "param";
  name: IAST<Variable>;
  type: string;
  byRef: boolean;
}

export type Expression =
  | Atom
  | BinaryOperation
  | Variable
  | Debug
  | Reference
  | Not
  | ArrayComprehension
  | FunctionCall
  | NewArray;

export type Statement = If | Assignment | While | For | Print | Return | FunctionDeclaration;

export type ASTKind = Expression | Statement | Block | Parameter;