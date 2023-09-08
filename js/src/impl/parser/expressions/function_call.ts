import { FunctionCall } from "../../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import parseExpression from "./expression.ts";

export const parseFuncCall: P<FunctionCall> = Parser.do()
  .bindT("name", TT.FUNCNAME)
  .bind("args", Parser.of(() => parseExpression).sepBy(Parser.matchT(TT.COMMA)).parens())
  .result(({ name, args }) =>
    mkToken(name, { tag: "funccall", name: name.lexeme, arguments: args }),
  );
