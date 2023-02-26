export enum TokenType {
  /* Keywords */
  CIKLUS,
  AMIG,
  AKKOR,
  VEGE,
  ELAGAZAS,
  FUGGVENY,
  KIIR,
  NYIL,
  CIMSZERINT,
  HA,
  VISSZA,
  TOMB,
  DEBUG,
  KULONBEN,

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

class BaseToken {
  start: number;

  constructor(public type: TokenType, public lexeme: string, public end: number) {
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

  parseWhile(eatPred: (c: string) => boolean, parser: (str: string, idx: number) => Token | null): Token | null {
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

export class Tokenizer extends SimpleParser<BaseToken> {
  static kwToType: Map<string, TokenType> = new Map([
    /* Keywords */
    ["ciklus", TokenType.CIKLUS],
    ["amíg", TokenType.AMIG],
    ["akkor", TokenType.AKKOR],
    ["vége", TokenType.VEGE],
    ["elágazás", TokenType.ELAGAZAS],
    ["függvény", TokenType.FUGGVENY],
    ["kiír", TokenType.KIIR],
    ["<-", TokenType.NYIL],
    ["címszerint", TokenType.CIMSZERINT],
    ["ha", TokenType.HA],
    ["vissza", TokenType.VISSZA],
    ["tömb", TokenType.TOMB],
    ["debug", TokenType.DEBUG],
    ["különben", TokenType.KULONBEN],


    /* Misc. */
    ["~", TokenType.NEGAL],
    ["(", TokenType.OPAREN],
    [")", TokenType.CPAREN],
    ["[", TokenType.OBRACKET],
    ["]", TokenType.CBRACKET],
    [":", TokenType.COLON],
    [",", TokenType.COMMA],

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

  override parse(): BaseToken[] {
    const tokens = super.parse();

    if (this.index < this.input.length) {
      const idx = tokens.at(-1)?.end ?? 0
      throw new Error("Lexing error at " + idx + ": " + this.input[idx]);
    }

    return tokens;
  }

  mkToken(type: TokenType | null, lexeme: string | null, index: number | null = null): BaseToken | null {
    if (lexeme == null) return null;
    if (type == null) return null;
    return new BaseToken(type, lexeme, index ? index : this.index);
  }

  parseOne(): BaseToken | null {
    const parsers = [
      this.parseWhitespace,
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

  parseWhitespace(): BaseToken | null {
    const spaces = this.eatWhile(Tokenizer.isWhitespace);
    return this.mkToken(TokenType.WHITESPACE, spaces);
  }

  parseString(): BaseToken | null {
    if (this.eat() == '"') {
      const value = this.eatWhile((c) => c != '"');

      if (!value) {
        return null;
      }

      if (this.eat() == '"') {
        return new BaseToken(TokenType.STRING, '"' + value + '"', this.index);
      }
    }

    return null;
  }

  parseNumber(): BaseToken | null {
    const num = this.eatWhile(Tokenizer.isNum);
    return this.mkToken(TokenType.NUMBER, num);
  }

  parseSymbol(): BaseToken | null {
    const symbol = this.eatWhile(Tokenizer.isLetter);
    return this.mkToken(TokenType.SYMBOL, symbol);
  }

  parseType(): BaseToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (str, idx) => (["egész", "szöveg"].includes(str) ? new BaseToken(TokenType.TYPE, str, idx) : null)
    );
  }

  parseBool(): BaseToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (str, idx) => (["igaz", "hamis"].includes(str) ? new BaseToken(TokenType.BOOLEAN, str, idx) : null)
    );
  }

  parseFuncName(): BaseToken | null {
    const starter = this.eat();

    if (starter && starter >= "A" && starter <= "Z") {
      const rest = this.eatWhile(Tokenizer.isLetter);
      return this.mkToken(TokenType.FUNCNAME, rest ? starter + rest : null);
    }

    return null;
  }

  parseArithmOp(): BaseToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (str, idx) => (["+", "-", "/", "*", "mod"].includes(str) ? new BaseToken(TokenType.ARITHMOP, str, idx) : null)
    );
  }

  parseCompOp(): BaseToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (str, idx) => ([">", "<", ">=", "<=", "=", "=/="].includes(str) ? new BaseToken(TokenType.COMPOP, str, idx) : null)
    );
  }

  parseLogicOp(): BaseToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (str, idx) => (["&&", "||"].includes(str) ? new BaseToken(TokenType.LOGICOP, str, idx) : null)
    );
  }

  parseKeyword(): BaseToken | null {
    const skw = this.tryParse(this.parseSingleCharKw);
    if (skw) return skw;

    const kw = this.eatWhile(c =>!Tokenizer.isWhitespace(c));
    if (!kw) return null;

    return this.mkToken(Tokenizer.kwToType.get(kw) ?? null, kw);
  }

  parseSingleCharKw(): BaseToken | null {
    const c = this.eat();
    if (!c) return null;

    const type = Tokenizer.kwToType.get(c) ?? null;
    return this.mkToken(type, c);
  }
}