import { IAST } from "../../../interfaces/IParser.ts";
import { Statement } from "../../../interfaces/astkinds.ts";
import { P, Parser } from "../hParser.ts";
import { parseAssignment } from "./assignment.ts";
import { parseDebug } from "./debug.ts";
import { parseFor } from "./for.ts";
import { parseFuncDecl } from "./function_declaration.ts";
import { parseIf } from "./if.ts";
import { parsePrint } from "./print.ts";
import { parseReturn } from "./return.ts";
import { parseWhile } from "./while.ts";

const parseStatement: P<Statement> = Parser.of<IAST<Statement>>(
  () =>
    parseIf
      .or(parseReturn)
      .or(parseFor)
      .or(parseAssignment)
      .or(parseFuncDecl)
      .or(parsePrint)
      .or(parseWhile)
      .or(parseDebug),
  //.or(parseExpression), Ha támogatni akarjuk a lógó expressionöket.
);

export default parseStatement;
