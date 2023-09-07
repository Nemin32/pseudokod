import { ArrayIndex } from "../../../interfaces/astkinds.ts";
import { P, Parser, mkToken } from "../hParser.ts";
import parseExpression from "./expression.ts";
import { parseVariable } from "./variable.ts";

export const parseArrayIndex: P<ArrayIndex> = Parser.do()
  .bind("variable", parseVariable)
  .bind("index", parseExpression.brackets())
  .result(({ variable, index }) => mkToken(variable.token, { tag: "arrindex", variable, index }));
