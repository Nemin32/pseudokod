enum TokenType {
  /* Keywords */
  CIKLUS,
  AMIG,
  VEGE,
  ELAGAZAS,
  FUGGVENY,
  KIIR,
  NYIL,
  CIMSZERINT,
  HA,
  VISSZA,
  TOMB,

  ES,
  VAGY,
  NEGAL,

  /* Misc. */
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

class Tokenizer extends SimpleParser<BaseToken> {
  static kwToType: Map<string, TokenType> = new Map([
    /* Keywords */
    ["ciklus", TokenType.CIKLUS],
    ["amíg", TokenType.AMIG],
    ["vége", TokenType.VEGE],
    ["elágazás", TokenType.ELAGAZAS],
    ["függvény", TokenType.FUGGVENY],
    ["kiír", TokenType.KIIR],
    ["<-", TokenType.NYIL],
    ["címszerint", TokenType.CIMSZERINT],
    ["ha", TokenType.HA],
    ["vissza", TokenType.VISSZA],
    ["tömb", TokenType.TOMB],

    ["&&", TokenType.ES],
    ["||", TokenType.VAGY],
    ["~", TokenType.NEGAL],

    /* Misc. */
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
      throw new Error("Lexing error at " + tokens.at(-1)?.end ?? 0);
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
        return new BaseToken(TokenType.STRING, value, this.index);
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
      (str, idx) => ([">", "<", ">=", "<=", "=", "=/="].includes(str) ? new BaseToken(TokenType.ARITHMOP, str, idx) : null)
    );
  }

  parseKeyword(): BaseToken | null {
    return this.parseWhile(
      (c) => !Tokenizer.isWhitespace(c),
      (str, idx) => {
        const type = Tokenizer.kwToType.get(str) ?? null;
        return this.mkToken(type, str, idx);
      }
    );
  }
}

const input = "igaz hamis egész tömb";

const ainput = `függvény Csere(címszerint a : egész, címszerint b : egész)
   temp <- a
   a <- b
   b <- temp
függvény vége

függvény Minimum(címszerint tomb : egész tömb, n : egész)
  ciklus i <- 1-től n-1-ig
    min <- i
    ciklus j <- i+1-től n-ig
      ha tomb[min] > tomb[j] akkor
        min <- j
      elágazás vége
    ciklus vége
  Csere(tomb[i], tomb[min])
  ciklus vége
függvény vége

x <- (3, 2, 4, 6, 1)

Csere(x[1], x[2])

kiir x

Minimum(x, 5)
kiir x
`;

const tk = new Tokenizer(input);
const tokens = tk.parse()?.map((t) => `${TokenType[t.type]} - "${t.lexeme}"`);

for (const token of tokens) {
  console.log(token);
}
