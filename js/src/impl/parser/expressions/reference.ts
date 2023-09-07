import { Reference } from "../../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import { parseArrayIndex } from "./array_index.ts";
import { parseVariable } from "./variable.ts";

export const parseReference: P<Reference> = Parser.matchT(TT.REFERENCE).bind((token) =>
  parseArrayIndex
    .or(parseVariable)
    .map((expr) => mkToken(token, { tag: "reference", inner: expr })),
);
