import { Variable } from "../../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";

export const parseVariable: P<Variable> = Parser.matchT(TT.SYMBOL).map((token) =>
  mkToken(token, {
    tag: "variable",
    name: token.lexeme,
  }),
);
