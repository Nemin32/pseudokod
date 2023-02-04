/* = Types = */

/* Expressions */
export type Atom = {
  kind: "atom";
  value: number | string | boolean | Array<number | string | boolean>;
};

export type BinOp = {
  kind: "binop";
  value: {
    op: string;
    exp1: Expression;
    exp2: Expression;
  };
};

export type Variable = {
  kind: "variable";
  value: string;
};

export type Value = Atom | Variable;

export type Expression = Value | BinOp;

/* Statements */
export type PrintStatement = {
  kind: "print";
  value: Expression;
};

export type IfStatement = {
  kind: "if";
  pred: Expression;
  truePath: Block;
  falsePath: Block;
};

export type AssignmentStatement = {
  kind: "assignment";
  variable: Variable;
  value: Expression;
};

export type Block = Array<Statement>;
export type Statement = AssignmentStatement | IfStatement | PrintStatement | Expression;

export type AST = Block | Statement | Expression;

/* = Constructors = */

export function make_atom(value: Atom["value"]): Atom {
  return { kind: "atom", value };
}

export function make_binop(op: string, exp1: Expression, exp2: Expression): BinOp {
  return { kind: "binop", value: { op, exp1, exp2 } };
}

export function make_variable(value: Variable["value"]): Variable {
  return { kind: "variable", value };
}

export function make_print(value: PrintStatement["value"]): PrintStatement {
  return { kind: "print", value };
}

export function make_if(pred: Expression, tBlock: Block, fBlock: Block): IfStatement {
  return { kind: "if", pred, truePath: tBlock, falsePath: fBlock };
}

export function make_assignment(variable: Variable, value: Expression): AssignmentStatement {
  return { kind: "assignment", variable, value };
}
