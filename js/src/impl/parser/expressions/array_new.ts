import { NewArray } from "../../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import parseExpression from "./expression.ts";

export const parseNewArray: P<NewArray> = Parser.do()
  .bindT("token", TT.LETREHOZ)
  .bind("type", Parser.matchT(TT.TYPE).brackets())
  .bind("length", parseExpression.parens())
  .result(({ token, type, length }) =>
    mkToken(token, { tag: "arrnew", length, type: type.lexeme }),
  );
