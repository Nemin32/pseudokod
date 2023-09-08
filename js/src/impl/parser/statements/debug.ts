import { Debug } from "../../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";

export const parseDebug: P<Debug> = Parser.matchT(TT.DEBUG).map((token) =>
  mkToken(token, { tag: "debug" }),
);
