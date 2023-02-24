/* = classs = */

export enum ASTKind {
  ARRASSIGN,
  ARRELEMASSIGN,
  ARRINDEX,
  ASSIGNMENT,
  ATOM,
  CALCBINOP,
  COMPBINOP,
  COMPREHENSION,
  DEBUG,
  DOWHILE,
  FOR,
  FUNCCALL,
  FUNCDECL,
  IF,
  LOGICBINOP,
  NOT,
  PARAMETER,
  PRINT,
  RETURN,
  VARIABLE,
  WHILE,
}

enum ValueTypes {
  NUMBER,
  STRING,
  BOOLEAN,
  ARRAY,
  NIL,
}

export class Debug {
  readonly kind = ASTKind.DEBUG;
}

/* Expressions */
export type AtomValue = number | string | boolean | Array<AtomValue>;

export class Atom {
  readonly kind = ASTKind.ATOM;

  constructor(
    public value: AtomValue,
  ) {}
}

export class ArrayComprehension {
  readonly kind = ASTKind.COMPREHENSION;

  constructor(public exps: Expression[]) {}
}

export class ArrayIndex {
  readonly kind = ASTKind.ARRINDEX;

  constructor(public variable: Variable, public index: Expression) {}
}

export class ArithmeticBinOp {
  readonly kind = ASTKind.CALCBINOP;

  constructor(
    public op: string,
    public exp1: Expression,
    public exp2: Expression,
  ) {}
}

export class Variable {
  readonly kind = ASTKind.VARIABLE;

  constructor(public name: string) {}
}

export type Value = Atom | Variable;

export class Comparison {
  readonly kind = ASTKind.COMPBINOP;

  constructor(
    public op: string,
    public exp1: Expression,
    public exp2: Expression,
  ) {}
}

export class FunctionCall {
  readonly kind = ASTKind.FUNCCALL;

  constructor(
    public functionName: string,
    public parameters: Array<Expression>,
  ) {}
}

export class Not {
  readonly kind = ASTKind.NOT;
  constructor(public exp: Expression) {}
}

export class LogicBinOp {
  readonly kind = ASTKind.LOGICBINOP;

  constructor(
    public op: string,
    public exp1: Expression,
    public exp2: Expression,
  ) {}
}

export type Expression =
  | ArrayComprehension
  | ArrayIndex
  | ArithmeticBinOp
  | Comparison
  | FunctionCall
  | LogicBinOp
  | Not
  | Value;

/* Statements */
export class Print {
  readonly kind = ASTKind.PRINT;

  constructor(public value: Expression) {}
}

export class If {
  readonly kind = ASTKind.IF;

  constructor(
    public headBranch: { pred: Expression; body: Block },
    public elIfs: Array<{ pred: Expression; body: Block }>,
    public elseBranch: Block | null,
  ) {}
}

export class Assignment {
  readonly kind = ASTKind.ASSIGNMENT;

  constructor(public variable: Variable, public value: Expression) {}
}

export class Parameter {
  readonly kind = ASTKind.PARAMETER;

  constructor(public name: string, public byReference: boolean) {}
  /* class: string */
}

export class While {
  readonly kind = ASTKind.WHILE;

  constructor(public pred: Expression, public body: Block) {}
}

export class DoWhile {
  readonly kind = ASTKind.DOWHILE;

  constructor(public pred: Expression, public body: Block) {}
}

export class For {
  readonly kind = ASTKind.FOR;

  constructor(
    public variable: Variable,
    public from: Expression,
    public to: Expression,
    public body: Block,
  ) {}
}

export class ArrayElementAssignment {
  readonly kind = ASTKind.ARRELEMASSIGN;

  constructor(
    public arrayIndex: ArrayIndex,
    public value: Expression,
  ) {}
}

export class ArrayAssignment {
  readonly kind = ASTKind.ARRASSIGN;

  constructor(
    public variable: Variable,
    public type: string,
    public length: Expression,
  ) {}
}

export class Return {
  readonly kind = ASTKind.RETURN;

  constructor(public value: Expression) {}
}

export class FunctionDeclaration {
  readonly kind = ASTKind.FUNCDECL;

  constructor(
    public name: string,
    public parameters: Array<Parameter>,
    public body: Block,
  ) {}
}

export type Block = Array<Statement>;
export type Statement =
  | ArrayAssignment
  | ArrayElementAssignment
  | Assignment
  | Debug
  | DoWhile
  | Expression
  | FunctionDeclaration
  | If
  | Print
  | Return
  | While;

export type AST = Parameter | Parameter[] | Block | Statement | Expression;
