import { Assignment } from "../../../interfaces/astkinds.ts";
import { parseArrayIndex } from "../expressions/array_index.ts";
import parseExpression from "../expressions/expression.ts";
import { parseVariable } from "../expressions/variable.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";

export const parseAssignment: P<Assignment> = Parser.do()
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
