import { IToken } from "./ITokenizer.ts";
import { ASTKind, Block } from "./astkinds.ts";

// IToken[] -> ASTBase

export interface ITokenToASTParser {
  parse(input: IToken[]): Block;
}