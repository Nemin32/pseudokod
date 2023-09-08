import { For } from "../../../interfaces/astkinds.ts";
import parseExpression from "../expressions/expression.ts";
import { parseVariable } from "../expressions/variable.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import { parseBlock } from "./block.ts";

export const parseFor: P<For> = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .bind("from", parseExpression)
  .ignoreT(TT.FORSTART)
  .bind("to", parseExpression)
  .ignoreT(TT.FOREND)
  .bind("body", Parser.of(() => parseBlock))
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .result(({ token, variable, from, to, body }) =>
    mkToken(token, {
      tag: "for",
      from,
      to,
      body,
      variable,
    }),
  );
