import { Debug } from "../../../interfaces/astkinds";
import { P, Parser, TT, mkToken } from "../hParser";

export const parseDebug: P<Debug> = Parser.matchT(TT.DEBUG).map((token) =>
  mkToken(token, { tag: "debug" }),
);
