import { Print } from "../../../interfaces/astkinds.ts";
import parseExpression from "../expressions/expression.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";

export const parsePrint: P<Print> = Parser.matchT(TT.KIIR).bind((token) =>
  parseExpression.map((value) => mkToken(token, { tag: "print", expr: value })),
);
