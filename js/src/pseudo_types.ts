/* = Types = */

/* Expressions */
export type Atom = {
  kind: "atom";
  value: number | string | boolean | Array<number | string | boolean>;
};

export type ArithmeticBinOp = {
  kind: "binop";
  op: string;
  exp1: Expression;
  exp2: Expression;
};

export type Variable = {
  kind: "variable";
  value: string;
};

export type Value = Atom | Variable;

export type Comparison = { kind: "comparison"; op: string; exp1: Expression; exp2: Expression };
export type FunctionCall = { kind: "functionCall"; functionName: string; parameters: Array<Expression> };
export type Not = { kind: "not"; value: Expression };
export type LogicBinOp = { kind: "logicBinop"; op: string; exp1: Expression; exp2: Expression };

export type Expression = ArithmeticBinOp | Comparison | FunctionCall | LogicBinOp | Not | Value;

/* Statements */
export type Print = {
  kind: "print";
  value: Expression;
};

export type If = {
  kind: "if";
  pred: Expression;
  truePath: Block;
  falsePath: Block;
};

export type Assignment = {
  kind: "assignment";
  variable: Variable;
  value: Expression;
};

export type Parameter = {
  kind: "parameter";
  name: string;
  byReference: boolean;
  /* type: string */
};

export type While = { kind: "while"; pred: Expression; body: Block };
export type DoWhile = { kind: "doWhile"; pred: Expression; body: Block };
export type For = { kind: "for"; variable: Variable; from: Expression; to: Expression; body: Block };
export type ArrayElementAssignment = { kind: "arrElemAssign"; array: Variable; index: Expression; value: Expression };
export type ArrayAssignment = { kind: "arrAssign"; variable: Variable; length: Expression };
export type Return = { kind: "return"; value: Expression };
export type FunctionDeclaration = { kind: "functionDecl"; name: string; parameters: Array<Parameter>; body: Block };

export type Block = Array<Statement>;
export type Statement = ArrayAssignment | ArrayElementAssignment | Assignment | DoWhile | Expression | FunctionDeclaration | If | Print | Return | While;

export type AST = Parameter | Parameter[] | Block | Statement | Expression;

/* = Constructors = */

export function make_atom(value: Atom["value"]): Atom {
  return { kind: "atom", value };
}

export function make_binop(op: string, exp1: Expression, exp2: Expression): ArithmeticBinOp {
  return { kind: "binop", op, exp1, exp2 };
}

export function make_variable(value: Variable["value"]): Variable {
  return { kind: "variable", value };
}

export function make_print(value: Print["value"]): Print {
  return { kind: "print", value };
}

export function make_if(pred: Expression, tBlock: Block, fBlock: Block): If {
  return { kind: "if", pred, truePath: tBlock, falsePath: fBlock };
}

export function make_assignment(variable: Variable, value: Expression): Assignment {
  return { kind: "assignment", variable, value };
}
