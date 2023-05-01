export enum TokenType {
  /* Keywords */
  AKKOR,
  AMIG,
  CIKLUS,
  CIMSZERINT,
  DEBUG,
  ELAGAZAS,
  FUGGVENY,
  HA,
  KIIR,
  KULONBEN,
  LETREHOZ,
  TOMB,
  VEGE,
  VISSZA,

  /* Misc. */
  NEGAL,
  OPAREN,
  CPAREN,
  OBRACKET,
  CBRACKET,
  COLON,
  COMMA,
  FORSTART,
  FOREND,
  NYIL,
  REFERENCE,

  /* Special */
  NUMBER,
  BOOLEAN,
  STRING,
  SYMBOL,
  FUNCNAME,
  ARITHMOP,
  COMPOP,
  LOGICOP,
  WHITESPACE,
  TYPE,

  ERROR,
}

export class PseudoToken {
  start: number;

  constructor(
    readonly type: TokenType,
    readonly lexeme: string,
    readonly end: number,
    readonly line: number,
    readonly column: number
  ) {
    this.start = this.end - lexeme.length;
  }
}

abstract class SimpleParser<Token> {
  constructor(protected input: string) {}
  index = 0;

  row = 0;
  column = 0;

  peek(): string | null {
    //let lookahed = 0;

    //while (this.index+lookahed < this.input.length && this.input[this.index+lookahed] == '\n') lookahed++;

    //if (this.index+lookahed < this.input.length) return this.input[this.index+lookahed];
    // return null;

    if (this.index >= this.input.length) return null;

   /* if (this.input[this.index] == "\n") {
      if (this.index+1 < this.input.length) {
        return null
      } else {
        return this.input[this.index+1]
      }
    }*/

    return this.input[this.index];
  }

  eat(): string | null {
    if (this.index >= this.input.length) return null;
    this.column++;
    return this.input[this.index++];
  }

  tryParse(func: () => Token | null): Token | null {
    const prevIdx = this.index;
    const prevCol = this.column;
    const prevRow = this.row;

    const value = func.bind(this)();

    if (value) {
      return value;
    }

    this.index = prevIdx;
    this.column = prevCol;
    this.row = prevRow;
    return null;
  }

  parse(): Token[] {
    const tokens: Token[] = [];

    let t;
    while ((t = this.parseOne()) != null) {
      tokens.push(t);
    }

    return tokens;
  }

  abstract parseOne(): Token | null;

  eatWhile(pred: (c: string) => boolean): string | null {
    let retVal = "";

    while (true) {
      const c = this.peek();

      if (c && pred(c)) {
        retVal += this.eat();
      } else {
        break;
      }
    }

    if (retVal.length > 0) {
      return retVal;
    }

    return null;
  }

  parseWhile(
    eatPred: (c: string) => boolean,
    parser: (str: string, idx: number) => Token | null,
  ): Token | null {
    let value = "";

    while (true) {
      const c = this.peek();

      if (c && eatPred(c)) {
        value += this.eat();

        const parsed = parser(value, this.index);

        if (parsed) {
          return parsed;
        }
      } else {
        break;
      }
    }

    return null;
  }
}

export class TokenizeError extends Error {
  constructor(
    public msg: string,
    public input: string,
    public index: number,
    public tokens: PseudoToken[],
  ) {
    super(msg);
  }
}

export class Tokenizer extends SimpleParser<PseudoToken> {
  static kwToType: Map<string, TokenType> = new Map([
    /* Keywords */
    ["akkor", TokenType.AKKOR],
    ["amíg", TokenType.AMIG],
    ["ciklus", TokenType.CIKLUS],
    ["címszerint", TokenType.CIMSZERINT],
    ["debug", TokenType.DEBUG],
    ["elágazás", TokenType.ELAGAZAS],
    ["függvény", TokenType.FUGGVENY],
    ["ha", TokenType.HA],
    ["kiír", TokenType.KIIR],
    ["különben", TokenType.KULONBEN],
    ["tömb", TokenType.TOMB],
    ["vissza", TokenType.VISSZA],
    ["vége", TokenType.VEGE],
    ["Létrehoz", TokenType.LETREHOZ],

    /* Misc. */
    ["~", TokenType.NEGAL],
    ["(", TokenType.OPAREN],
    [")", TokenType.CPAREN],
    ["[", TokenType.OBRACKET],
    ["]", TokenType.CBRACKET],
    [":", TokenType.COLON],
    [",", TokenType.COMMA],
    ["&", TokenType.REFERENCE],

    ["<-", TokenType.NYIL],
    ["-tól", TokenType.FORSTART],
    ["-től", TokenType.FORSTART],
    ["-ig", TokenType.FOREND],
  ]);

  static isNum(char: string) {
    return char >= "0" && char <= "9";
  }

  static isLetter(char: string) {
    return char.toLowerCase() != char.toUpperCase();
  }

  static isWhitespace(char: string) {
    return char == " " //|| char == "\n";
  }

  override parse(): PseudoToken[] {
    const tokens = super.parse();

    if (this.index < this.input.length) {
      const idx = tokens.at(-1)?.end ?? 0;
      throw new TokenizeError(
        "Lexing error at " + idx,
        this.input,
        idx,
        tokens,
      );
    }

    return tokens;
  }

  mkToken(
    type: TokenType | null,
    lexeme: string | null,
    index: number | null = null,
    line: number | null = null,
    col: number | null = null,
  ): PseudoToken | null {
    if (lexeme == null) return null;
    if (type == null) return null;
    return new PseudoToken(type, lexeme, index ?? this.index, line ?? this.row, col ?? this.column);
  }

  parseOne(): PseudoToken | null {
    const parsers = [
      this.parseNewLine,
      this.parseWhitespace,
      this.parseForStuff,
      this.parseArrow,
      this.parseString,
      this.parseType,
      this.parseBool,
      this.parseKeyword,
      this.parseCompOp,
      this.parseArithmOp,
      this.parseLogicOp,
      this.parseNumber,
      this.parseFuncName,
      this.parseSymbol,
    ];

    for (const parser of parsers) {
      const value = this.tryParse(parser);
      if (value) {
        return value;
      }
    }

    return null;
  }

  parseWhitespace(): PseudoToken | null {
    const spaces = this.eatWhile(Tokenizer.isWhitespace);
    return this.mkToken(TokenType.WHITESPACE, spaces);
  }

  parseNewLine(): PseudoToken | null {
    let len = 0;

    while (this.index < this.input.length && this.input[this.index] == "\n") {
      this.row++;
      this.column = 0;
      this.index++;
      len++;
    }

    // if (this.index >= this.input.length) return null;
    if (len == 0) return null;

    console.log(this.row, this.column, this.index)

    return this.mkToken(TokenType.WHITESPACE, '\n'.repeat(len))
  }

  parseArrow(): PseudoToken | null {
    if (this.eat() == "<" && this.eat() == "-") {
      return this.mkToken(TokenType.NYIL, "<-");
    }

    return null;
  }

  parseForStuff(): PseudoToken | null {
    if (this.eat() == "-") {
      const word = this.eatWhile(Tokenizer.isLetter);

      if (word == "től" || word == "tól") {
        return this.mkToken(TokenType.FORSTART, "-" + word);
      } else if (word == "ig") {
        return this.mkToken(TokenType.FOREND, "-" + word);
      }
    }

    return null;
  }

  parseString(): PseudoToken | null {
    if (this.eat() == '"') {
      const value = this.eatWhile((c) => c != '"');

      if (!value) {
        return null;
      }

      if (this.eat() == '"') {
        return new PseudoToken(TokenType.STRING, '"' + value + '"', this.index, this.row, this.column);
      }
    }

    return null;
  }

  parseNumber(): PseudoToken | null {
    const num = this.eatWhile(Tokenizer.isNum);
    return this.mkToken(TokenType.NUMBER, num);
  }

  parseSymbol(): PseudoToken | null {
    const symbol = this.eatWhile(Tokenizer.isLetter);
    return this.mkToken(TokenType.SYMBOL, symbol);
  }

  parseType(): PseudoToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (
        str,
        idx,
      ) => (["egész", "szöveg"].includes(str) ? new PseudoToken(TokenType.TYPE, str, idx, this.row, this.column) : null),
    );
  }

  parseBool(): PseudoToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (
        str,
        idx,
      ) => (["igaz", "hamis"].includes(str) ? new PseudoToken(TokenType.BOOLEAN, str, idx, this.row, this.column) : null),
    );
  }

  parseFuncName(): PseudoToken | null {
    const starter = this.eat();

    if (starter && starter >= "A" && starter <= "Z") {
      const rest = this.eatWhile(Tokenizer.isLetter);
      return this.mkToken(TokenType.FUNCNAME, rest ? starter + rest : null);
    }

    return null;
  }

  parseArithmOp(): PseudoToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (
        str,
        idx,
      ) => (["+", "-", "/", "*", "mod"].includes(str)
        ? new PseudoToken(TokenType.ARITHMOP, str, idx, this.row, this.column)
        : null),
    );
  }

  parseCompOp(): PseudoToken | null {
    let op = this.eat();
    if (op == "=") {
      if (this.peek() == "/") {
        op += this.eat();
        op += this.eat();
        if (op == "=/=") {
          return this.mkToken(TokenType.COMPOP, op);
        } else {
          return null;
        }
      } else {
        return this.mkToken(TokenType.COMPOP, op);
      }
    }

    if (op == ">" || op == "<") {
      if (this.peek() == "=") {
        op += this.eat();
      }

      return this.mkToken(TokenType.COMPOP, op);
    }

    return null;
  }

  parseLogicOp(): PseudoToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (
        str,
        idx,
      ) => (["és", "vagy"].includes(str) ? new PseudoToken(TokenType.LOGICOP, str, idx, this.row, this.column) : null),
    );
  }

  parseKeyword(): PseudoToken | null {
    const skw = this.tryParse(this.parseSingleCharKw);
    if (skw) return skw;

    const kw = this.eatWhile((c) => Tokenizer.isLetter(c));
    if (!kw) return null;

    return this.mkToken(Tokenizer.kwToType.get(kw) ?? null, kw);
  }

  parseSingleCharKw(): PseudoToken | null {
    const c = this.eat();
    if (!c) return null;

    const type = Tokenizer.kwToType.get(c) ?? null;
    return this.mkToken(type, c);
  }
}
