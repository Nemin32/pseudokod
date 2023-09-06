import {
  Variable,
  Assignment,
  Atom,
  Expression,
  ASTKind,
  Print,
  Return,
  ArrayIndex,
  BinaryOperation,
  Not,
  Reference,
} from "../interfaces/astkinds.ts";
import { IAST } from "../interfaces/IParser.ts";
import { IToken, ITokenizer } from "../interfaces/ITokenizer.ts";
import { Parser } from "./hParser.ts";
import { Tokenizer } from "./tokenizer.ts";
import { TokenType as TT } from "../interfaces/ITokenizer.ts";

type P<T> = Parser<IAST<T>>;
const mkToken = <T extends ASTKind>(token: IToken | null, rest: IAST<T>["kind"]): IAST<T> => ({
  token,
  kind: rest,
});

const parseExpression: P<Expression> = Parser.of(() => parseNot.or(parseReference).or(parseLogicOp));

const parseStatement: P<Statement> = P.of<Statement>(() =>
  parseArrayElementAssignment
    .or(parseArrayAssignment)
    .or(parseIf)
    .or(parseReturn)
    .or(parseFor)
    .or(parseAssignment)
    .or(parseFuncDecl)
    .or(parsePrint)
    .or(parseDoWhile)
    .or(parseWhile)
    .or(parseDebug)
    .or(parseExpression),
);

/* Not */

const parseNot: P<Not> = Parser.matchT(TT.NEGAL).bind(token => parseExpression.map(expr => mkToken(token, {tag: "not", expr})))

/* Reference */

const parseReference: P<Reference> = Parser.matchT(TT.REFERENCE).bind(token => parseArrayIndex.or(parseVariable).map(expr => mkToken(token, {tag: "reference", inner: expr})))

/* Atom */

const number: P<Atom> = Parser.matchT(TT.NUMBER).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: Number(token.lexeme),
  }),
);

const boolean: P<Atom> = Parser.matchT(TT.BOOLEAN).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: ["Igaz", "igaz"].includes(token.lexeme),
  }),
);

const string: P<Atom> = Parser.matchT(TT.STRING).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: token.lexeme,
  }),
);

const parseAtom = number.or(boolean).or(string);

/* Variable */

const parseVariable: P<Variable> = Parser.matchT(TT.SYMBOL).map((token) =>
  mkToken(token, {
    tag: "variable",
    name: token.lexeme,
  }),
);

/* Array Index */

const parseArrayIndex: P<ArrayIndex> = Parser.do()
  .bind("variable", parseVariable)
  .bind("index", parseExpression.brackets())
  .result(({ variable, index }) => mkToken(variable.token, { tag: "arrindex", variable, index }));

/* BinOp */

const addOp = Parser.sat((tok) => ["+", "-"].includes(tok.lexeme));
const mulOp = Parser.sat((tok) => ["*", "/", "mod"].includes(tok.lexeme));
const compOp = Parser.sat((tok) => [">", "<", "=", "<=", ">=", "=/="].includes(tok.lexeme));
const logicOp = Parser.sat((tok) => ["és", "vagy"].includes(tok.lexeme));

const toBinopOrExpr = (
  value: IAST<Expression> | { left: IAST<Expression>; op: IToken; right: IAST<Expression> },
) => {
  if ("op" in value) {
    return mkToken(value.op, {
      tag: "binop",
      lhs: value.left,
      rhs: value.right,
      op: value.op,
    });
  } else {
    return value;
  }
};

const primary: P<Expression> = parseExpression
  .parens()
  .or(parseArrayIndex)
  .or(parseVariable)
  .or(parseAtom);

const parseArithmOp: P<Expression> = Parser.chainl1(primary, addOp).map(toBinopOrExpr);
const parseMulOp: P<Expression> = Parser.chainl1(parseArithmOp, mulOp).map(toBinopOrExpr);
const parseCompOp: P<Expression> = Parser.chainl1(parseMulOp, compOp).map(toBinopOrExpr);
const parseLogicOp: P<Expression> = Parser.chainl1(parseCompOp, logicOp).map(toBinopOrExpr);

/* Assignment */

const parseAssignment: P<Assignment> = Parser.do()
  .bind("variable", parseArrayIndex.or(parseVariable))
  .bindT("nyil", TT.NYIL)
  .bind("value", parseExpression)
  .result(({ variable, nyil, value }) =>
    mkToken(nyil, {
      tag: "assign",
      variable,
      value,
    }),
  );

/* Return */

const parseReturn: P<Return> = Parser.matchT(TT.VISSZA).bind((token) =>
  parseExpression.map((value) => mkToken(token, { tag: "return", expr: value })),
);

/* Print */

const parsePrint: P<Print> = Parser.matchT(TT.KIIR).bind((token) =>
  parseExpression.map((value) => mkToken(token, { tag: "print", expr: value })),
);

const tok: ITokenizer = new Tokenizer();
const tokens = tok.tokenize("függvény vége").filter((t) => t.type !== TT.WHITESPACE);

const val = Parser.matchT(TT.FUGGVENY).end().run(tokens);

console.log(val);
