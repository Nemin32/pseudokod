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
}

export class PseudoToken {
  start: number;

  constructor(
    public type: TokenType,
    public lexeme: string,
    public end: number,
  ) {
    this.start = this.end - lexeme.length;
  }
}

abstract class SimpleParser<Token> {
  constructor(protected input: string) {}
  index = 0;

  peek() {
    if (this.index >= this.input.length) return null;

    return this.input[this.index];
  }

  eat() {
    if (this.index >= this.input.length) return null;

    return this.input[this.index++];
  }

  tryParse(func: () => Token | null): Token | null {
    const prevIdx = this.index;
    const value = func.bind(this)();

    if (value) {
      return value;
    }

    this.index = prevIdx;
    return null;
  }

  parse(): Token[] {
    const tokens = [];

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
    return char == " " || char == "\n";
  }

  override parse(): PseudoToken[] {
    const tokens = super.parse();

    if (this.index < this.input.length) {
      const idx = tokens.at(-1)?.end ?? 0;
      throw new Error("Lexing error at " + idx + ": " + this.input[idx]);
    }

    return tokens;
  }

  mkToken(
    type: TokenType | null,
    lexeme: string | null,
    index: number | null = null,
  ): PseudoToken | null {
    if (lexeme == null) return null;
    if (type == null) return null;
    return new PseudoToken(type, lexeme, index ? index : this.index);
  }

  parseOne(): PseudoToken | null {
    const parsers = [
      this.parseWhitespace,
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

  parseArrow(): PseudoToken | null {
    if (this.eat() == "<" && this.eat() == "-") {
      return this.mkToken(TokenType.NYIL, "<-");
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
        return new PseudoToken(TokenType.STRING, '"' + value + '"', this.index);
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
      ) => (["egész", "szöveg"].includes(str)
        ? new PseudoToken(TokenType.TYPE, str, idx)
        : null),
    );
  }

  parseBool(): PseudoToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (
        str,
        idx,
      ) => (["igaz", "hamis"].includes(str)
        ? new PseudoToken(TokenType.BOOLEAN, str, idx)
        : null),
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
        ? new PseudoToken(TokenType.ARITHMOP, str, idx)
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
      ) => (["&&", "||"].includes(str)
        ? new PseudoToken(TokenType.LOGICOP, str, idx)
        : null),
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
