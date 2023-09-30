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
  TABLALETREHOZ = 11,
  TOMB = 12,
  VEGE = 13,
  VISSZA = 14,

  /* Misc. */
  NEGAL = 15,
  OPAREN = 16,
  CPAREN = 17,
  OBRACKET = 18,
  CBRACKET = 19,
  COLON = 20,
  COMMA = 21,
  FORSTART = 22,
  FOREND = 23,
  NYIL = 24,
  SWAP = 25,
  REFERENCE = 26,

  /* Special */
  NUMBER = 27,
  BOOLEAN = 28,
  STRING = 29,
  SYMBOL = 30,
  FUNCNAME = 31,
  BINOP = 32,
  WHITESPACE = 33,
  TYPE = 34,
  COMMENT = 35,
  RENDEZETT = 36,

  ERROR = 37,
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
