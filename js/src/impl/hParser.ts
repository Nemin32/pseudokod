import { IToken, ITokenizer, TokenType } from "../interfaces/ITokenizer.ts";
import { ASTKind } from "../interfaces/astkinds.ts";
import { Tokenizer } from "./tokenizer.ts";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
type Indexable = string | any[];

// Ha T string akkor beleindexelve is stringet kapunk. Ha T valami más elem, akkor az abból alkotott tömb eleme T.
type ArrayElem<T extends Indexable> = T extends string ? string : T extends (infer Q)[] ? Q : never;

// Megmutatja, hogy egy adott input hanyadik eleménél járunk.
type Input<T extends Indexable> = { input: T; index: number };

// Ha a keresés sikeres, eltároljuk a következő keresés helyét és az értéket, melyet találtunk.
// Pl.: {input: "asd", index: 0}, keresés c => c == 'a' esetén: {type: "match", next: {input: "asd", index: 1}, value: "a"}
type Match<T extends Indexable, Output> = {
  value: Output;
  next: Input<T>;
  type: "match";
};

// Ha a keresés sikertelen, akkor eltároljuk annak okát és a hibás keresés helyét.
// Pl.: {input: "asd", index: 0}, keresés c => c == 'b' esetén: {type: "error", location: {input: "asd", index: 0}, cause: "Wanted 'b', found 'a'"}
type ParsingError<T extends Indexable> = {
  type: "error";
  location: Input<T>;
  cause: string;
};

// Egy keresés eredménye vagy találat vagy hiba.
type Result<T extends Indexable, Output> = Match<T, Output> | ParsingError<T>;

/** Parser capable of parsing from either arbitrary arrays or strings.
 * @template TS TokenStream: an Indexable type that contains either an array of arbitrary tokens or a string.
 * @template O Output: The type of a successful match.
 */
class Parser<TS extends Indexable, O> {
  constructor(private exec: (inp: Input<TS>) => Result<TS, O>) {}

  run(input: TS): Result<TS, O> {
    return this.exec({ input, index: 0 });
  }

  // Kiveszi egy tokenstream első elemét és visszatér vele.
  // Ha a lista üres / végére értünk, hibát dob.
  static item<TS extends Indexable>(): Parser<TS, ArrayElem<TS>> {
    return new Parser((inp) =>
      inp.index >= inp.input.length
        ? { type: "error", cause: "EOF", location: inp }
        : {
            type: "match",
            value: inp.input[inp.index],
            next: { index: inp.index + 1, input: inp.input },
          },
    );
  }

  static result<TS extends Indexable, O>(value: O): Parser<TS, O> {
    return new Parser((inp) => ({ type: "match", next: inp, value }));
  }

  static fail<TS extends Indexable>(msg: string): Parser<TS, never> {
    return new Parser((inp) => ({ type: "error", cause: msg, location: inp }));
  }

  bind<NewOutput>(other: (val: O) => Parser<TS, NewOutput>): Parser<TS, NewOutput> {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error") return current;
      return other(current.value).exec(current.next);
    });
  }

  catch(error: (previous: string) => string): Parser<TS, O> {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error")
        return { type: "error", cause: error(current.cause), location: current.location };
      return current;
    });
  }

  static or<TS extends Indexable, O, OO>(one: Parser<TS, O>, other: Parser<TS, OO>) {
    return new Parser<TS, O | OO>((inp) => {
      const thisValue = one.exec(inp);
      if (thisValue.type === "error") return other.exec(inp);
      return thisValue;
    });
  }

  static sat<TS extends Indexable>(
    predicate: (val: ArrayElem<TS>) => boolean,
    failMsg = (val: ArrayElem<TS>) => "Parsing error.",
  ): Parser<TS, ArrayElem<TS>> {
    return Parser.item<TS>().bind((elem: ArrayElem<TS>) =>
      predicate(elem) ? Parser.result<TS, ArrayElem<TS>>(elem) : Parser.fail<TS>(failMsg(elem)),
    );
  }

  static many<TS extends Indexable, O>(p: Parser<TS, O>): Parser<TS, O[]> {
    return Parser.many1(p).or(Parser.result<TS, O[]>([] as O[]));
  }

  static many1<TS extends Indexable, O>(p: Parser<TS, O>): Parser<TS, O[]> {
    return p
      .bind((first) => Parser.many(p).bind((rest) => Parser.result([first, ...rest])))
      .catch((p) => `Multiple(${p})`);
  }

  static sepBy<TS extends Indexable, O>(
    parser: Parser<TS, O>,
    separator: Parser<TS, unknown>,
  ): Parser<TS, O[]> {
    return Parser.sepBy1(parser, separator).or(Parser.result([]));
  }

  static sepBy1<TS extends Indexable, O>(
    parser: Parser<TS, O>,
    separator: Parser<TS, unknown>,
  ): Parser<TS, O[]> {
    return parser
      .bind((first) =>
        Parser.many(separator.bind((_) => parser.bind((val) => Parser.result(val)))).bind((rest) =>
          this.result([first, ...rest]),
        ),
      )
      .catch((prev) => `${prev}, sep. by ${separator}`);
  }

  static chainl<TS extends Indexable, Term, Operator, BaseCase>(
    term: Parser<TS, Term>,
    op: Parser<TS, Operator>,
    baseCase: Parser<TS, BaseCase>,
  ) {
    return Parser.chainl1(term, op).or(baseCase);
  }

  static chainl1<TS extends Indexable, Term, Operator>(
    term: Parser<TS, Term>,
    opParser: Parser<TS, Operator>,
  ) {
    return term
      .bind((left) =>
        opParser.bind((op) => term.bind((right) => Parser.result({ left, op, right }))),
      )
      .catch((prev) => `${prev} ${opParser} ${term}`);
  }

  // BINDINGS
  // Here the static methods are bound to class objects. This allows chaining them.
  // i.e. Parser.item().many() instead of Parser.many(Parser.item())
  // This helps readability, imagine 5 levels of nesting from left to right.
  
  bindResult<T>(value: T) {
    return this.bind(_ => Parser.result(value));
  }

  or<OtherOutput>(other: Parser<TS, OtherOutput>) {
    return Parser.or(this, other);
  }

  many(): Parser<TS, O[]> {
    return Parser.many<TS, O>(this);
  }

  many1(): Parser<TS, O[]> {
    return Parser.many1<TS, O>(this);
  }

  sepBy(separator: Parser<TS, unknown>): Parser<TS, O[]> {
    return Parser.sepBy<TS, O>(this, separator);
  }

  sepBy1(separator: Parser<TS, unknown>): Parser<TS, O[]> {
    return Parser.sepBy1<TS, O>(this, separator);
  }

  chainl<Operator, BaseCase>(op: Parser<TS, Operator>, baseCase: Parser<TS, BaseCase>) {
    return Parser.chainl<TS, ArrayElem<TS>, Operator, BaseCase>(this, op, baseCase);
  }

  chainl1<Operator>(op: Parser<TS, Operator>) {
    return Parser.chainl1<TS, ArrayElem<TS>, Operator>(this, op);
  }
}

class TParser<O> extends Parser<IToken[], O> {
  static matchT(type: TokenType): TParser<IToken> {
    return TParser.sat<IToken[]>(elem => elem.type === type, elem => `Expected type "${TokenType[type]}", got "${TokenType[elem.type]}".`);
  }
  
  end() {
    return this.bind(match => TParser.matchT(TokenType.VEGE).bindResult(match));
  }

}


const tok: ITokenizer = new Tokenizer();
const tokens = tok.tokenize("függvény vége").filter(t => t.type !== TokenType.WHITESPACE);

const val = TParser.matchT(TokenType.FUGGVENY).end().run(tokens)

console.log(val);
