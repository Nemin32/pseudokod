import { FunctionDeclaration, Parameter } from "../../../interfaces/astkinds.ts";
import { parseVariable } from "../expressions/variable.ts";
import { P, Parser, TT, mkToken } from "../hParser.ts";
import { parseBlock } from "./block.ts";

const parseByRef = Parser.matchT(TT.CIMSZERINT)
  .map((_) => true)
  .or(Parser.result(false));

const parseParameter: P<Parameter> = Parser.do()
  .bind("byRef", parseByRef)
  .bind("name", parseVariable)
  .ignoreT(TT.COLON)
  .bindT("type", TT.TYPE)
  .result(({ byRef, name, type }) =>
    mkToken(name.token, { tag: "param", byRef, name, type: type.lexeme }),
  );

export const parseFuncDecl: P<FunctionDeclaration> = Parser.do()
  .bindT("token", TT.FUGGVENY)
  .bindT("name", TT.FUNCNAME)
  .bind("parameters", parseParameter.sepBy(Parser.matchT(TT.COMMA)).parens())
  .bind("body", parseBlock)
  .result(({ token, body, name, parameters }) =>
    mkToken(token, { tag: "funcdecl", body, name: name.lexeme, parameters }),
  );
