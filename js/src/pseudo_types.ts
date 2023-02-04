/* Types */

export type Atom = {
  kind: "atom",
  value: number | string | boolean | Array<number | string | boolean>
}

export type BinOp = {
  kind: "binop",
  value: {
    op: string,
    exp1: Expression,
    exp2: Expression
  }
}

export type Expression = Atom | BinOp;

/* Constructors */

export function make_atom(value: Atom['value']): Atom {
  return { kind: "atom", value }
}

export function make_binop(value: BinOp['value']): BinOp {
  return {
    kind: "binop",
    value
  }
}