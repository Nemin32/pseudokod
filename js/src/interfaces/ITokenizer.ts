// string -> IToken[]
export enum TokenType {
  /* Keywords */
  AKKOR = 0,
  AMIG = 1,
  CIKLUS = 2,
  CIMSZERINT = 3,
  DEBUG = 4,
  ELAGAZAS = 5,
  FUGGVENY = 6,
  HA = 7,
  KIIR = 8,
  KULONBEN = 9,
  LETREHOZ = 10,
  TOMB = 11,
  VEGE = 12,
  VISSZA = 13,

  /* Misc. */
  NEGAL = 14,
  OPAREN = 15,
  CPAREN = 16,
  OBRACKET = 17,
  CBRACKET = 18,
  COLON = 19,
  COMMA = 20,
  FORSTART = 21,
  FOREND = 22,
  NYIL = 23,
  SWAP = 24,
  REFERENCE = 25,

  /* Special */
  NUMBER = 26,
  BOOLEAN = 27,
  STRING = 28,
  SYMBOL = 29,
  FUNCNAME = 30,
  BINOP = 31,
  WHITESPACE = 32,
  TYPE = 33,
  COMMENT = 34,
  RENDEZETT = 35,

  ERROR = 36,
}

export interface Location {
    readonly row: number,
    readonly column: number
}

export interface IToken {
  readonly lexeme: string;
  readonly position: Location
  readonly length: number;
  readonly type: TokenType;
}

export interface ITokenizer {
  tokenize(input: string): Array<IToken>;
}
