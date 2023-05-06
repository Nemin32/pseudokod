/* = classs = */

import { PseudoToken } from "../parser/tokenizer.ts";

export enum ASTKind {
  ARRASSIGN = 0,
  ARRELEMASSIGN = 1,
  ARRINDEX = 2,
  ASSIGNMENT = 3,
  ATOM = 4,
  CALCBINOP = 5,
  COMPBINOP = 6,
  COMPREHENSION = 7,
  DEBUG = 8,
  DOWHILE = 9,
  FOR = 10,
  FUNCCALL = 11,
  FUNCDECL = 12,
  IF = 13,
  LOGICBINOP = 14,
  NOT = 15,
  PARAMETER = 16,
  PRINT = 17,
  RETURN = 18,
  VARIABLE = 19,
  WHILE = 20,
}

export class Debug {
  readonly kind = ASTKind.DEBUG;

  constructor(readonly token: PseudoToken) {}
}

/* Expressions */
export type AtomValue = number | string | boolean;

export class Atom {
  readonly kind = ASTKind.ATOM;

  constructor(
    readonly token: PseudoToken,

    public value: AtomValue,
  ) {}
}

export class ArrayComprehension {
  readonly kind = ASTKind.COMPREHENSION;

  constructor(readonly token: PseudoToken, public exps: Expression[]) {}
}

export class ArrayIndex {
  readonly kind = ASTKind.ARRINDEX;

  constructor(readonly token: PseudoToken, public variable: Variable, public index: Expression) {}
}

export class ArithmeticBinOp {
  readonly kind = ASTKind.CALCBINOP;

  constructor(
    readonly token: PseudoToken,

    public op: string,
    public exp1: Expression,
    public exp2: Expression,
  ) {}
}

export class Variable {
  readonly kind = ASTKind.VARIABLE;

  constructor(readonly token: PseudoToken, public name: string, public isReference: boolean) {}
}

export type Value = Atom | Variable;

export class Comparison {
  readonly kind = ASTKind.COMPBINOP;

  constructor(
    readonly token: PseudoToken,

    public op: string,
    public exp1: Expression,
    public exp2: Expression,
  ) {}
}

export class FunctionCall {
  readonly kind = ASTKind.FUNCCALL;

  constructor(
    readonly token: PseudoToken,

    public functionName: string,
    public parameters: Array<Expression>,
  ) {}
}

export class Not {
  readonly kind = ASTKind.NOT;
  constructor(readonly token: PseudoToken, public exp: Expression) {}
}

export class LogicBinOp {
  readonly kind = ASTKind.LOGICBINOP;

  constructor(
    readonly token: PseudoToken,

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

  constructor(readonly token: PseudoToken, public value: Expression) {}
}

export class If {
  readonly kind = ASTKind.IF;

  constructor(
    readonly token: PseudoToken,

    public headBranch: { pred: Expression; body: Block },
    public elIfs: Array<{ pred: Expression; body: Block }>,
    public elseBranch: Block | null,
  ) {}
}

export class Assignment {
  readonly kind = ASTKind.ASSIGNMENT;

  constructor(readonly token: PseudoToken, public variable: Variable, public value: Expression) {}
}

export class Parameter {
  readonly kind = ASTKind.PARAMETER;

  constructor(
    readonly token: PseudoToken,
    public name: string,
    public byReference: boolean,
    public type: string,
  ) {}
}

export class While {
  readonly kind = ASTKind.WHILE;

  constructor(readonly token: PseudoToken, public pred: Expression, public body: Block) {}
}

export class DoWhile {
  readonly kind = ASTKind.DOWHILE;

  constructor(readonly token: PseudoToken, public pred: Expression, public body: Block) {}
}

export class For {
  readonly kind = ASTKind.FOR;

  constructor(
    readonly token: PseudoToken,

    public variable: Variable,
    public from: Expression,
    public to: Expression,
    public body: Block,
  ) {}
}

export class ArrayElementAssignment {
  readonly kind = ASTKind.ARRELEMASSIGN;

  constructor(
    readonly token: PseudoToken,

    public arrayIndex: ArrayIndex,
    public value: Expression,
  ) {}
}

export class ArrayAssignment {
  readonly kind = ASTKind.ARRASSIGN;

  constructor(
    readonly token: PseudoToken,

    public variable: Variable,
    public type: string,
    public length: Expression,
  ) {}
}

export class Return {
  readonly kind = ASTKind.RETURN;

  constructor(readonly token: PseudoToken, public value: Expression) {}
}

export class FunctionDeclaration {
  readonly kind = ASTKind.FUNCDECL;

  constructor(
    readonly token: PseudoToken,

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
  | For
  | If
  | Print
  | Return
  | While;

export type AST = Parameter | Parameter[] | Block | Statement | Expression;
