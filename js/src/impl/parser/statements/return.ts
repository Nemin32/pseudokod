import { Return } from "../../../interfaces/astkinds.ts";
import parseExpression from "../expressions/expression.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";

export const parseReturn: P<Return> = Parser.matchT(TT.VISSZA).bind((token) =>
  parseExpression.map((value) => mkToken(token, { tag: "return", expr: value })),
);
