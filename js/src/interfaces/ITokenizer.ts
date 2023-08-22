// string -> IToken[]
enum TokenType {
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
  REFERENCE = 24,

  /* Special */
  NUMBER = 25,
  BOOLEAN = 26,
  STRING = 27,
  SYMBOL = 28,
  FUNCNAME = 29,
  ARITHMOP = 30,
  COMPOP = 31,
  LOGICOP = 32,
  WHITESPACE = 33,
  TYPE = 34,

  ERROR = 35,
}

export interface IToken {
  readonly lexeme: string;
  readonly start: number;
  readonly length: number;
  readonly type: TokenType;
}

export interface ITokenizer {
  tokenize(input: string): Array<IToken>;
}
