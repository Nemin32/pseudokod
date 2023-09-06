import { Not } from "../../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import parseExpression from "./expression.ts";

export const parseNot: P<Not> = Parser.matchT(TT.NEGAL).bind((token) =>
  parseExpression.map((expr) => mkToken(token, { tag: "not", expr })),
);
