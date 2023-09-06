import { Return } from "../../../interfaces/astkinds";
import parseExpression from "../expressions/expression";
import { P, Parser, TT, mkToken } from "../hParser";

export const parseReturn: P<Return> = Parser.matchT(TT.VISSZA).bind((token) =>
  parseExpression.map((value) => mkToken(token, { tag: "return", expr: value })),
);