import { IAST } from "../interfaces/IParser.ts";
import {
  ASTKind,
  Atom,
  AtomValue,
  BinOpType,
  BinaryOperation,
  Block,
  Expression,
  If,
  Print,
  Statement,
} from "../interfaces/astkinds.ts";

function optimizeBinOp(value: IAST<BinaryOperation>): IAST<BinaryOperation> | IAST<Atom> {
  const mkAtom = (aval: Atom["value"]): IAST<Atom> => ({
    token: value.token,
    kind: { tag: "atom", value: aval },
  });

  const [lhsE, rhsE] = [optimizeExpr(value.kind.lhs), optimizeExpr(value.kind.rhs)];
  if (lhsE.kind.tag === "atom" && rhsE.kind.tag === "atom") {
    const [lhs, rhs] = [lhsE.kind.value, rhsE.kind.value];

    switch (value.kind.op) {
      case BinOpType.ADD:
        return mkAtom(Number(lhs) + Number(rhs));
      case BinOpType.SUB:
        return mkAtom(Number(lhs) - Number(rhs));
      case BinOpType.MUL:
        return mkAtom(Number(lhs) * Number(rhs));
      case BinOpType.DIV:
        return mkAtom(Number(lhs) / Number(rhs));
      case BinOpType.MOD:
        return mkAtom(Number(lhs) % Number(rhs));
      case BinOpType.EQ:
        return mkAtom(lhs === rhs);
      case BinOpType.NEQ:
        return mkAtom(lhs !== rhs);
      case BinOpType.LE:
        return mkAtom(lhs <= rhs);
      case BinOpType.GE:
        return mkAtom(lhs >= rhs);
      case BinOpType.LESS:
        return mkAtom(lhs < rhs);
      case BinOpType.GREATER:
        return mkAtom(lhs > rhs);
      case BinOpType.AND:
        return mkAtom(Boolean(lhs) && Boolean(rhs));
      case BinOpType.OR:
        return mkAtom(Boolean(lhs) || Boolean(rhs));
    }
  }

  return { ...value, kind: { ...value.kind, lhs: lhsE, rhs: rhsE } };
}

function optimizePrint(print: IAST<Print>): IAST<Print> {
  return {
    token: print.token,
    kind: {
      tag: "print",
      expr: optimizeExpr(print.kind.expr),
    },
  };
}

function optimizeExpr(expr: IAST<Expression>): IAST<Expression> {
  if (expr.kind.tag === "binop") return optimizeBinOp(expr as IAST<BinaryOperation>);

  return expr;
}

function optimizeStatement(statement: IAST<Statement>): IAST<Statement> | IAST<Block> | null {
  if (statement.kind.tag === "if") {
    return optimizeIf(statement as IAST<If>);
  }

  if (statement.kind.tag === "print") {
    return optimizePrint(statement as IAST<Print>);
  }

  return statement;
}

function optimizeStatements(stmts: IAST<Statement>[]): IAST<Statement>[] {
  return stmts.map((s) => optimizeStatement(s)).filter((e) => e !== null) as Exclude<
    ReturnType<typeof optimizeStatement>,
    null
  >[];
}

function optimizeIf(ifIAST: IAST<If>): IAST<If> | IAST<Block> | null {
  function isAtomValue(expr: IAST<ASTKind>, value: AtomValue) {
    return expr.kind.tag === "atom" && expr.kind.value === value;
  }

  const ifStatement = ifIAST.kind;

  const main_path = {
    pred: optimizeExpr(ifStatement.main_path.pred),
    branch: optimizeBlock(ifStatement.main_path.branch),
  };

  // Ha az első if-ben már igaz a predikátum, akkor minden más lényegtelen.
  if (isAtomValue(main_path.pred, true)) {
    return main_path.branch;
  }

  const false_path = ifStatement.false_path ? optimizeBlock(ifStatement.false_path) : null;

  const elif_path = ifStatement.elif_path
    .filter((elif) => !isAtomValue(optimizeExpr(elif.pred), false))
    .map((elif) => ({ pred: optimizeExpr(elif.pred), branch: optimizeBlock(elif.branch) }));

  // Ha viszont hamis...
  if (isAtomValue(main_path.pred, false)) {
    // és nincs elif...
    if (elif_path.length === 0) {
      // akkor visszatérünk a hamis ággal (ami lehet null is),
      return false_path;
    } else {
      // Ha van elif, akkor pedig az első elifből lesz az első if és a maradékból pedig az elifek.
      return {
        ...ifIAST,
        kind: {
          ...ifStatement,
          main_path: elif_path[0],
          elif_path: elif_path.slice(1),
          false_path,
        },
      };
    }
  }

  // Végül, ha nem tudunk mit mondani a fő ág predikátumáról, akkor csak simán visszatérünk a kioptimalizált iffel.
  return {
    ...ifIAST,
    kind: {
      tag: "if",
      main_path,
      elif_path,
      false_path,
    },
  };
}

export function optimizeBlock(block: IAST<Block>): IAST<Block> {
  return {
    token: block.token,
    kind: {
      tag: "block",
      statements: optimizeStatements(block.kind.statements),
    },
  };
}
