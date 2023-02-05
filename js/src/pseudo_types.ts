/* = Types = */

export enum ASTKind {
  ARRASSIGN,
  ARRELEMASSIGN,
  ASSIGNMENT,
  ATOM,
  CALCBINOP,
  COMPBINOP,
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

/* Expressions */
export type Atom = {
  kind: ASTKind.ATOM;
  value: number | string | boolean | Array<number | string | boolean>;
};

export type ArithmeticBinOp = {
  kind: ASTKind.CALCBINOP;
  op: string;
  exp1: Expression;
  exp2: Expression;
};

export type Variable = {
  kind: ASTKind.VARIABLE;
  name: string;
};

export type Value = Atom | Variable;

export type Comparison = {
  kind: ASTKind.COMPBINOP;
  op: string;
  exp1: Expression;
  exp2: Expression;
};

export type FunctionCall = {
  kind: ASTKind.FUNCCALL;
  functionName: string;
  parameters: Array<Expression>;
};

export type Not = {
  kind: ASTKind.NOT;
  exp: Expression;
};

export type LogicBinOp = {
  kind: ASTKind.LOGICBINOP;
  op: string;
  exp1: Expression;
  exp2: Expression;
};

export type Expression = ArithmeticBinOp | Comparison | FunctionCall | LogicBinOp | Not | Value;

/* Statements */
export type Print = {
  kind: ASTKind.PRINT;
  value: Expression;
};

export type If = {
  kind: ASTKind.IF;
  pred: Expression;
  truePath: Block;
  falsePath: Block;
};

export type Assignment = {
  kind: ASTKind.ASSIGNMENT;
  variable: Variable;
  value: Expression;
};

export type Parameter = {
  kind: ASTKind.PARAMETER;
  name: string;
  byReference: boolean;
  /* type: string */
};

export type While = {
  kind: ASTKind.WHILE;
  pred: Expression;
  body: Block;
};

export type DoWhile = {
  kind: ASTKind.DOWHILE;
  pred: Expression;
  body: Block;
};

export type For = {
  kind: ASTKind.FOR;
  variable: Variable;
  from: Expression;
  to: Expression;
  body: Block;
};

export type ArrayElementAssignment = {
  kind: ASTKind.ARRELEMASSIGN;
  array: Variable;
  index: Expression;
  value: Expression;
};

export type ArrayAssignment = {
  kind: ASTKind.ARRASSIGN;
  variable: Variable;
  length: Expression;
};

export type Return = {
  kind: ASTKind.RETURN;
  value: Expression;
};

export type FunctionDeclaration = {
  kind: ASTKind.FUNCDECL;
  name: string;
  parameters: Array<Parameter>;
  body: Block;
};

export type Block = Array<Statement>;
export type Statement = ArrayAssignment | ArrayElementAssignment | Assignment | DoWhile | Expression | FunctionDeclaration | If | Print | Return | While;

export type AST = Parameter | Parameter[] | Block | Statement | Expression;

/* = Constructors = */

export function make_atom(value: Atom["value"]): Atom {
  return { kind: ASTKind.ATOM, value };
}

export function make_binop(op: string, exp1: Expression, exp2: Expression): ArithmeticBinOp {
  return { kind: ASTKind.CALCBINOP, op, exp1, exp2 };
}

export function make_variable(name: Variable["name"]): Variable {
  return { kind: ASTKind.VARIABLE, name };
}

export function make_print(value: Print["value"]): Print {
  return { kind: ASTKind.PRINT, value };
}

export function make_if(pred: Expression, tBlock: Block, fBlock: Block): If {
  return { kind: ASTKind.IF, pred, truePath: tBlock, falsePath: fBlock };
}

export function make_assignment(variable: Variable, value: Expression): Assignment {
  return { kind: ASTKind.ASSIGNMENT, variable, value };
}

export function make_not(exp: Expression): Not {
  return { kind: ASTKind.NOT, exp };
}

export function make_while(pred: Expression, body: Block): While {
  return { kind: ASTKind.WHILE, pred, body };
}
