import { If } from "../../../interfaces/astkinds.ts";
import parseExpression from "../expressions/expression.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import { parseBlock } from "./block.ts";

const parseIfHead = Parser.do()
  .bindT("token", TT.HA)
  .bind("pred", parseExpression)
  .ignoreT(TT.AKKOR)
  .bind("branch", Parser.of(() => parseBlock))
  .finalize({});

const parseElse = Parser.matchT(TT.KULONBEN).right(Parser.of(() => parseBlock));

const parseElIf = Parser.matchT(TT.KULONBEN).right(parseIfHead);

export const parseIf: P<If> = Parser.do()
  .bind("main_path", parseIfHead)
  .bind("elif_path", parseElIf.many())
  .bind("false_path", parseElse.or(Parser.result(null)))
  .result(({ main_path, elif_path, false_path }) =>
    mkToken(main_path.token, { tag: "if", main_path, elif_path, false_path }),
  );
