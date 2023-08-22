// string -> IToken[]
enum TokenType {}

export interface IToken {
  readonly lexeme: string;
  readonly start: number;
  readonly length: number;
  readonly type: TokenType;
}

export interface ITokenizer {
  tokenize(input: string): Array<IToken>;
}
