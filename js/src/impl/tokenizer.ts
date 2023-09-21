import { IToken, ITokenizer, TokenType as TT } from "../interfaces/ITokenizer.ts";

type ParseResult = IToken | null;

const kwToType: ReadonlyMap<string, TT> = new Map([
  /* Keywords */
  ["akkor", TT.AKKOR],
  ["amíg", TT.AMIG],
  ["ciklus", TT.CIKLUS],
  ["címszerint", TT.CIMSZERINT],
  ["debug", TT.DEBUG],
  ["elágazás", TT.ELAGAZAS],
  ["függvény", TT.FUGGVENY],
  ["eljárás", TT.FUGGVENY],
  ["ha", TT.HA],
  ["kiír", TT.KIIR],
  ["különben", TT.KULONBEN],
  ["tömb", TT.TOMB],
  ["vissza", TT.VISSZA],
  ["vége", TT.VEGE],
  ["Létrehoz", TT.LETREHOZ],

  /* Misc. */
  ["~", TT.NEGAL],
  ["(", TT.OPAREN],
  [")", TT.CPAREN],
  ["[", TT.OBRACKET],
  ["]", TT.CBRACKET],
  [":", TT.COLON],
  [",", TT.COMMA],
  ["&", TT.REFERENCE],

  ["<-", TT.NYIL],
  ["<->", TT.SWAP],
  ["-tól", TT.FORSTART],
  ["-től", TT.FORSTART],
  ["-ig", TT.FOREND],
  ["//", TT.COMMENT],
]);

export class Tokenizer implements ITokenizer {
  input = "";
  index = 0;

  row = 0;
  column = 0;

  // Helpers
  peek(): string | null {
    if (this.index >= this.input.length) return null;
    return this.input[this.index];
  }

  eat(): string | null {
    if (this.index >= this.input.length) return null;
    this.column++;
    return this.input[this.index++];
  }

  eatWhile(fn: (c: string) => boolean): string | null {
    if (this.peek() === null) return null;
    let retval = "";

    while (true) {
      const c = this.eat();
      if (c == null) return retval;

      if (fn.call(this, c)) {
        retval += c;
      } else {
        this.index--;
        this.column--;
        return retval.length === 0 ? null : retval;
      }
    }
  }

  getKeywordTokenType(kw: string | null): TT | null {
    if (kw == null) return null;
    return kwToType.get(kw) ?? null;
  }

  isWhitespace(char: string): boolean {
    return [" ", "\t", "\n"].includes(char);
  }

  isNum(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  isLetter(char: string): boolean {
    return char.toLowerCase() !== char.toUpperCase();
  }

  isLetterOrUnderline(char: string): boolean {
    return char.toLowerCase() !== char.toUpperCase() || char === "_";
  }

  tryParse(fn: () => IToken | null): IToken | null {
    const state = this.saveState();

    const token = fn.call(this);
    if (token !== null) return token;

    this.index = state.index;
    this.row = state.row;
    this.column = state.column;

    return null;
  }

  saveState() {
    return {
      index: this.index,
      row: this.row,
      column: this.column,
    };
  }

  mkToken(type: TT, tokenFn: () => string | null): ParseResult {
    const state = this.saveState();
    const value = tokenFn.call(this);
    if (!value) return null;

    return {
      lexeme: value,
      position: { row: state.row, column: state.column },
      length: this.index - state.index,
      type: type,
    };
  }

  // === Parsers === 
  
  newLine(): ParseResult {
    return this.mkToken(TT.WHITESPACE, () => {
      let len = 0;

      while (this.peek() === "\n") {
        this.eat();
        this.column = 0;
        this.row++;
        len++;
      }

      if (len === 0) return null;

      return "\n".repeat(len);
    });
  }

  whitespace(): ParseResult {
    return this.mkToken(TT.WHITESPACE, () => {
      return this.eatWhile(this.isWhitespace);
    });
  }
  
  singleLetterKeyword(): ParseResult {
    const char = this.eat();
    const type = this.getKeywordTokenType(char) ?? null;
    
    return (type == null) ? type : this.mkToken(type, () => char);
  }

  keyword(): ParseResult {
    const slkw = this.tryParse(this.singleLetterKeyword);
    if (slkw) return slkw;

    const kw = this.eatWhile(c => !["[", "(", ",", ")", "]"].includes(c) && !this.isWhitespace(c));
    const type = this.getKeywordTokenType(kw);
    
    if (type === null) return null;

    const token = this.mkToken(type, () => kw);

    if (!token) return null;

    return token
  }

  comment(): ParseResult {
    return this.mkToken(TT.COMMENT, () => {
      if (this.eat() !== "/" || this.eat() !== "/") return null;
      const comment = this.eatWhile((c) => c !== "\n");
      return `//${comment}`;
    });
  }

  number(): ParseResult {
    return this.mkToken(TT.NUMBER, () => {
      const num = this.eatWhile(this.isNum);
      return num;
    });
  }

  string(): ParseResult {
    return this.mkToken(TT.STRING, () => {
      if (this.eat() !== '"') return null;
      const inner = this.eatWhile((c) => c !== '"');
      if (this.eat() !== '"') return null;

      return inner;
    });
  }
  
  bool(): ParseResult {
    return this.mkToken(TT.BOOLEAN, () => {
      const word = this.eatWhile(this.isLetter)
      if (!word || !["igaz", "Igaz", "hamis", "Hamis"].includes(word)) return null;
      
      return word;
    })
  }

  binop(): ParseResult {
    const validBinops = ["<", ">", "=", "<=", ">=", "=/=", "és", "vagy", "+", "-", "/", "*", "mod"];

    return this.mkToken(TT.BINOP, () => {
      const str = (this.eat() ?? "") + (this.eat() ?? "") + (this.eat() ?? "") + (this.eat() ?? "");

      for (let i = str.length; i > 0; i--) {
        const sub = str.substring(0, i);
        if (validBinops.includes(sub)) {
          // Mivel négy karaktert "ettünk meg", így annyival vissza kell lökni az indexet,
          // amennyit végül mégse használtunk fel.
          this.index -= str.length - i;
          this.column -= str.length - i;
          return sub;
        }
      }

      return null;
    });
  }
  
  symbol(): ParseResult {
    return this.mkToken(TT.SYMBOL, () => {
      return this.eatWhile(c => this.isLetter(c) || this.isNum(c))
    })
  }
  
  funcName(): ParseResult {
    return this.mkToken(TT.FUNCNAME, () => {
      const c = this.eat()
      if (!c || !this.isLetter(c) || c.toUpperCase() !== c) return null;

      const rest = this.eatWhile(this.isLetterOrUnderline)

      return c + (rest ?? "");
    })
  }
  
  type(): ParseResult {
    return this.mkToken(TT.TYPE, () => {
      const val = this.eatWhile(this.isLetter);
      if (!val) return null;
      return ["egész", "szöveg", "logikai", "T"].includes(val) ? val : null
    })
  }
  
  // === Driver ===

  parse(): ParseResult {
    this.newLine();

    const parsers = [
      this.comment,
      this.type,
      this.keyword,
      this.binop,
      this.bool,
      this.number,
      this.string,
      this.funcName,
      this.symbol,
      this.whitespace,
    ];

    for (const parser of parsers) {
      const value = this.tryParse(parser);
      if (value) {
        return value;
      }
    }

    return null;
  }

  parseWhileNotEOF(): IToken[] {
    const retval = [];

    while (true) {
      const token = this.parse();
      if (token) {
        retval.push(token);
      } else {
        break;
      }
    }

    return retval;
  }

  tokenize(input: string): IToken[] {
    this.input = input;
    this.index = 0;

    return this.parseWhileNotEOF();
  }
}

/*
const a = new Tokenizer();
console.log(a.tokenize(`
függvény LNKO(m : egész, n : egész)
  r <- m mod n
  
  ciklus amíg r =/= 0
    m <- n
    n <- r
    r <- m mod n  
  ciklus vége

  vissza n
függvény vége

kiír LNKO(15, 33)
`).map(t => ({name: t.lexeme, type: TT[t.type]})));
*/