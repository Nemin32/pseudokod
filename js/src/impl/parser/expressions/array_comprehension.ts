import { ArrayComprehension } from "../../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import parseExpression from "./expression.ts";

export const parseComprehension: P<ArrayComprehension> = parseExpression
  .sepBy(Parser.matchT(TT.COMMA))
  .parens()
  .map((exprs) => mkToken(null, { tag: "arrcomp", expressions: exprs }));
