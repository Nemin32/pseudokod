import { While } from "../../../interfaces/astkinds.ts";
import parseExpression from "../expressions/expression.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import { parseBlock } from "./block.ts";

const parseNormalWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .bind("body", Parser.of(() => parseBlock))
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .finalize({ postPred: false });

const parseDoWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("body", Parser.of(() => parseBlock))
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .finalize({ postPred: true });

export const parseWhile: P<While> = parseDoWhile.or(parseNormalWhile).map((value) =>
  mkToken(value.token, {
    tag: "while",
    body: value.body,
    postPred: value.postPred,
    predicate: value.pred,
  }),
);
