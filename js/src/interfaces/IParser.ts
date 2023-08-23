import { IToken } from "./ITokenizer.ts";

// IToken[] -> IAST
type ASTKind = Expression | Statement;

export interface IAST {
  readonly token: IToken;
  readonly kind: ASTKind;
}

export interface ITokenToASTParser {
  parse(input: IToken[]): IAST;
}

// --- //

export type AtomValue = number | string | boolean;

interface Atom {
  tag: "atom";
  value: AtomValue;
}

interface Debug {
  tag: "debug";
}

interface BinaryOperation {
  tag: "binop";
  lhs: Expression;
  rhs: Expression;
}

interface If {
  tag: "if";
  main_path: { pred: Expression; branch: Block };
  elif_path: Array<{ pred: Expression; branch: Block }>;
  false_path?: Block;
}

interface Block {
  tag: "block";
  statements: Array<Statement>;
}

interface Variable {
  tag: "variable";
  name: string;
}

interface ArrayIndex {
  tag: "arrindex";
  variable: Variable;
  index: Expression;
}

interface Reference {
  tag: "reference";
  inner: Variable | ArrayIndex;
}

interface NewArray {
  tag: "arrnew";
  type: string;
  length: number;
}

interface ArrayComprehension {
  tag: "arrcomp";
  expressions: Array<Expression>;
}

interface Assignment {
  tag: "assign";
  variable: Variable | ArrayIndex;
  value: Expression;
}

interface For {
  tag: "for";
  from: Expression;
  to: Expression;
  body: Block;
}

interface While {
  tag: "while";
  predicate: Expression;
  body: Block;
  postPred: boolean; // true -> do while
}

interface Not {
  tag: "not";
  expr: Expression;
}

interface Print {
  tag: "print";
  expr: Expression;
}

interface Return {
  tag: "return";
  expr: Expression;
}

interface FunctionCall {
  tag: "funccall";
  name: string;
  arguments: Expression[];
}

interface FunctionDeclaration {
  tag: "funcdecl";
  name: string;
  parameters: Parameter[];
  body: Block;
}

interface Parameter {
  tag: "param";
  name: string;
  type: string;
  byRef: boolean;
}

type Expression =
  | Atom
  | BinaryOperation
  | Variable
  | Debug
  | Reference
  | Not
  | ArrayComprehension
  | FunctionCall
  | NewArray;

type Statement = If | Assignment | While | For | Print | Return | FunctionDeclaration;
