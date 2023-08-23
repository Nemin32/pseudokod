import { IToken } from "./ITokenizer.ts";
import { ASTKind, Block } from "./astkinds.ts";

// IToken[] -> IAST

export interface IAST<T> {
  readonly token: IToken;
  readonly kind: T;
}

export interface ITokenToASTParser {
  parse(input: IToken[]): IAST<Block>;
}