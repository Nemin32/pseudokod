import { For } from "../../../interfaces/astkinds";
import parseExpression from "../expressions/expression";
import { parseVariable } from "../expressions/variable";
import { P, Parser, TT, mkToken } from "../hParser";
import { parseBlock } from "./block";

export const parseFor: P<For> = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .bind("from", parseExpression)
  .ignoreT(TT.FORSTART)
  .bind("to", parseExpression)
  .ignoreT(TT.FOREND)
  .bind("body", parseBlock)
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
