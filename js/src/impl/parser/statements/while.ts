import { While } from "../../../interfaces/astkinds";
import parseExpression from "../expressions/expression";
import { P, Parser, TT, mkToken } from "../hParser";
import { parseBlock } from "./block";

const parseNormalWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("pred", parseExpression)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .finalize({ postPred: false });

const parseDoWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("body", parseBlock)
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .finalize({ postPred: true });

export const parseWhile = parseDoWhile.or(parseNormalWhile).map((value) =>
  mkToken(value.token, {
    tag: "while",
    body: value.body,
    postPred: value.postPred,
    predicate: value.pred,
  }),
);
