import { BaseParser } from "./base_parser.ts";

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

  /* Special */
  NUMBER,
  BOOLEAN,
  STRING,
  SYMBOL,
  WHITESPACE,
  TYPE,
}

class BaseToken {
  constructor(public type: TokenType, public lexeme: string, public start: number, public end: number) {}
}

class TextParser extends BaseParser<string, string, string> {
  static char = (which: string) => this.sat<string, string>(c => c==which, "EOF!", "Not " + which);
  static letter = this.sat((l: string) => l != " ", "EOF!", "Not a letter!");
  static word = this.item<string, string>("EOF!").many1().bindResult((letters) => letters.join(""));
  static whitespace = this.char(" ").many1();

  static string = (input: string): TextParser => {
    if (input == "") return TextParser.result("");

    const [x, xs] = [input[0], input.substring(1)];

    return TextParser.char(x)
      .bind((_) => TextParser.string(xs))
      .bind((_) => TextParser.result(x.concat(xs)));
  };
}

class TokenParser extends BaseParser<string, BaseToken, string> {
  static kwToType: Map<string, TokenType> = new Map([
    /* Keywords */
    ["ciklus", TokenType.VISSZA],
    ["amíg", TokenType.HA],
    ["vége", TokenType.CIMSZERINT],
    ["elágazás", TokenType.NYIL],
    ["függvény", TokenType.KIIR],
    ["kiír", TokenType.FUGGVENY],
    ["<-", TokenType.ELAGAZAS],
    ["címszerint", TokenType.VEGE],
    ["ha", TokenType.AMIG],
    ["vissza", TokenType.CIKLUS],

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
  ]);

  static parseWhitespace = TextParser.whitespace.bindResult(
    (spaces, inp) => new BaseToken(TokenType.WHITESPACE, spaces.join(""), inp.index - spaces.length, inp.index)
  );

  static parseNum = TextParser.word.bind((word, inp) => {
    const isNum = parseInt(word);

    if (!Number.isNaN(isNum)) {
      return BaseParser.result(new BaseToken(TokenType.NUMBER, word, inp.index - word.length, inp.index));
    }

    return TokenParser.zero<string, string>("Couldn't parse number!");
  });

  static parseKeyword = TextParser.word.bind((word: string, inp) => {
    const toToken = (type: TokenType): TokenParser => BaseParser.result(new BaseToken(type, word, inp.index - word.length, inp.index));

    const type = this.kwToType.get(word);

    if (type !== undefined) {
      return toToken(type);
    }

    return TokenParser.zero<string, string>("Couldn't parse keyword!");
  });

  static parseIdentifier = TextParser.word.bindResult((word, inp) => new BaseToken(TokenType.SYMBOL, word, inp.index-word.length, inp.index));

  static parse = this.parseWhitespace.plus(this.parseNum).plus(this.parseKeyword).plus(this.parseIdentifier);

  static first = (p: TokenParser, input: string) => p.run(input as unknown as string[]).filter(e => e.kind == "capture" && e.next.index == input.length).at(0)?.value
}
