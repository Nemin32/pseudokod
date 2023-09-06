import { Statement } from "../../../interfaces/astkinds.ts";
import parseExpression from "../expressions/expression.ts";
import { P, Parser } from "../hParser.ts";
import { parseAssignment } from "./assignment.ts";
import { parsePrint } from "./print.ts";
import { parseReturn } from "./return.ts";

const parseStatement: P<Statement> = Parser.of<Statement>(() =>
  parseArrayElementAssignment
    .or(parseArrayAssignment)
    .or(parseIf)
    .or(parseReturn)
    .or(parseFor)
    .or(parseAssignment)
    .or(parseFuncDecl)
    .or(parsePrint)
    .or(parseDoWhile)
    .or(parseWhile)
    .or(parseDebug)
    .or(parseExpression),
);

export default parseStatement;