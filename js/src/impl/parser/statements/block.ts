import { Block } from "../../../interfaces/astkinds.ts";
import { P, mkToken } from "../hParser.ts";
import parseStatement from "./statement.ts";

export const parseBlock: P<Block> = parseStatement
  .many1()
  .map((stmts) => mkToken(null, { tag: "block", statements: stmts }));
