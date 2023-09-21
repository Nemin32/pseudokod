import { IToken, TokenType as TT, TokenType } from "../../interfaces/ITokenizer.ts";
import { ASTKind } from "../../interfaces/astkinds.ts";

// Megmutatja, hogy egy adott input hanyadik eleménél járunk.
type Input = { input: IToken[]; index: number };

// Ha a keresés sikeres, eltároljuk a következő keresés helyét és az értéket, melyet találtunk.
// Pl.: {input: "asd", index: 0}, keresés c => c == 'a' esetén: {type: "match", next: {input: "asd", index: 1}, value: "a"}
type Match<Output> = {
  value: Output;
  next: Input;
  type: "match";
};

// Ha a keresés sikertelen, akkor eltároljuk annak okát és a hibás keresés helyét.
// Pl.: {input: "asd", index: 0}, keresés c => c == 'b' esetén: {type: "error", location: {input: "asd", index: 0}, cause: "Wanted 'b', found 'a'"}
type ParsingError = {
  type: "error";
  location: Input;
  cause: string;
};

// Egy keresés eredménye vagy találat vagy hiba.
type Result<Output> = Match<Output> | ParsingError;

/** Parser capable of parsing arbitrary values from a stream of IToken-s.
 * @template Output Output: The type of a successful match.
 */
export class Parser<Output> {
  constructor(private exec: (inp: Input) => Result<Output>) {}

  /**
   * Executes the parser step-by-step, returning with either a ParsingError or a Match.
   * @param input An array of IToken-s.
   * @returns The result of executing all parsers associated to this chain.
   */
  run(input: IToken[]): Result<Output> {
    return this.exec({ input, index: 0 });
  }

  // Kiveszi egy tokenstream első elemét és visszatér vele.
  // Ha a lista üres / végére értünk, hibát dob.
  static item(): Parser<IToken> {
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

  // Anélkül, hogy továbbléptetné az inputot, visszatér value-val.
  static result<O>(value: O): Parser<O> {
    return new Parser((inp) => ({ type: "match", next: inp, value }));
  }

  // Feltétel nélkül hibával tér vissza, aminek a szövegét mi adjuk.
  static fail(msg: string): Parser<never> {
    return new Parser((inp) => ({ type: "error", cause: msg, location: inp }));
  }

  // Ez a legfontosabb függvény az egész osztályban:
  // Úgy képzeld el, hogy ha van két parserünk A és B, akkor a bind "egymásba láncolja őket," úgy, hogy az A végrehajtása utáni érték elérhetővé válik.
  // Pl.: Parser.item().bind(elso => Parser.item().bind(masodik => Parser.result(elso + masodik)))
  // Ekkor először végrehajtuk az első item()-et, majd a másodikat, végül pedig a result (lásd feljebb) segítségével visszatérünk a kettő összegével.
  // Fontos megjegyezni, hogy enélkül a függvény nélkül a parserből nem tudunk értéket kinyerni.
  // Hiba esetén a futtatás korán megszakad és a hiba kipropagál egészen a végső hívásig ahol visszatérünk vele.
  bind<NewOutput>(other: (val: Output, input: Input) => Parser<NewOutput>): Parser<NewOutput> {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error") return current;
      return other(current.value, inp).exec(current.next);
    });
  }

  // Ha van egy felfelé propagáló hibánk, a catch segítségével elkaphatjuk azt és módosíthatjuk.
  // Ez hasznos pl arra, ha egyedi hibaüzenettel szeretnénk visszatérni.
  // A many parser esetén fogjuk először magát a hibaüzenetet és mellétesszük, hogy egyébként több ilyen elemet is vártunk.
  catch(error: (previous: string) => string): Parser<Output> {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error")
        return { type: "error", cause: error(current.cause), location: current.location };
      return current;
    });
  }

  static or<O, OO>(one: Parser<O>, other: Parser<OO>) {
    return new Parser<O | OO>((inp) => {
      const thisValue = one.exec(inp);
      if (thisValue.type === "error") {
        const thatValue = other.exec(inp);
        if (thatValue.type === "match") return thatValue;

        return (thisValue.location.index > thatValue.location.index) ? thisValue : thatValue;
      }
      return thisValue;
    });
  }

  static sat(
    predicate: (val: IToken) => boolean,
    failMsg = (val: IToken, input: Input) => "Parsing error.",
  ): Parser<IToken> {
    return Parser.item().bind((elem: IToken, inp) =>
      predicate(elem) ? Parser.result<IToken>(elem) : Parser.fail(failMsg(elem, inp)),
    );
  }

  static many<O>(p: Parser<O>): Parser<O[]> {
    return Parser.many1(p).or(Parser.result<O[]>([] as O[]));
  }

  static many1<O>(p: Parser<O>): Parser<O[]> {
    return p
      .bind((first) => Parser.many(p).bind((rest) => Parser.result([first, ...rest])))
      .catch((p) => `Multiple(${p})`);
  }

  static sepBy<O>(parser: Parser<O>, separator: Parser<unknown>): Parser<O[]> {
    return Parser.sepBy1(parser, separator).or(Parser.result([]));
  }

  static sepBy1<O>(parser: Parser<O>, separator: Parser<unknown>): Parser<O[]> {
    return parser
      .bind((first) =>
        Parser.many(separator.bind((_) => parser.bind((val) => Parser.result(val)))).bind((rest) =>
          this.result([first, ...rest]),
        ),
      )
      .catch((prev) => `${prev}, sep. by ${separator}`);
  }

  static chainl<Term, Operator, BaseCase>(
    term: Parser<Term>,
    op: Parser<Operator>,
    baseCase: Parser<BaseCase>,
  ) {
    return Parser.chainl1(term, op).or(baseCase);
  }

  static chainl1<Term, Operator>(term: Parser<Term>, opParser: Parser<Operator>): Parser<Term | {left : Term, op : Operator, right: Term}> {
    return term
      .bind((left) =>
        opParser.bind((op) => term.bind((right) => Parser.result({ left, op, right }))),
      )
      .or(term);
  }

  // BINDINGS
  // Here the static methods are bound to class objects. This allows chaining them.
  // i.e. Parser.item().many() instead of Parser.many(Parser.item())
  // This helps readability, imagine 5 levels of nesting from left to right.

  or<OtherOutput>(other: Parser<OtherOutput>) {
    return Parser.or(this, other);
  }

  many(): Parser<Output[]> {
    return Parser.many<Output>(this);
  }

  many1(): Parser<Output[]> {
    return Parser.many1<Output>(this);
  }

  sepBy(separator: Parser<unknown>): Parser<Output[]> {
    return Parser.sepBy<Output>(this, separator);
  }

  sepBy1(separator: Parser<unknown>): Parser<Output[]> {
    return Parser.sepBy1<Output>(this, separator);
  }

  chainl<Operator, BaseCase>(op: Parser<Operator>, baseCase: Parser<BaseCase>) {
    return Parser.chainl<IToken, Operator, BaseCase>(this, op, baseCase);
  }

  chainl1<Operator>(op: Parser<Operator>) {
    return Parser.chainl1<IToken, Operator>(this, op);
  }

  // EXTRAS
  // Things not described by the original paper, but that make parsing easier.

  static choice<T>(parsers: Parser<T>[]): Parser<T> {
    const [first, ...rest] = parsers;

    return rest.reduce((acc, curr) => acc.or(curr), first)
  }

  map<T>(fn: (value: Output) => T): Parser<T> {
    return this.bind((value) => Parser.result(fn(value)));
  }

  left(other: Parser<unknown>): Parser<Output> {
    return this.bind((value) => other.map((_) => value));
  }

  right<Other>(other: Parser<Other>): Parser<Other> {
    return this.bind((_) => other.map((oValue) => oValue));
  }
  
  maybe(): Parser<Output | null> {
    return this.or(Parser.result(null));
  }

  static matchT(type: TT): Parser<IToken> {
    return Parser.sat(
      (elem) => elem.type === type,
      (elem, input) => `${input.index} - ${input.input[input.index].lexeme}: Expected type "${TT[type]}", got "${TT[elem.type]}".`,
    );
  }

  static of<T>(fn: () => Parser<T>): Parser<T> {
    return new Parser((inp) => fn().exec(inp));
  }

  end() {
    return this.left(Parser.matchT(TT.VEGE));
  }

  parens() {
    const oparen = Parser.matchT(TT.OPAREN);
    const cparen = Parser.matchT(TT.CPAREN);
    return oparen.right(this).left(cparen);
  }

  brackets() {
    const oparen = Parser.matchT(TT.OBRACKET);
    const cparen = Parser.matchT(TT.CBRACKET);
    return oparen.right(this).left(cparen);
  }

  static do() {
    return new Do([]);
  }
}

class Do<Bindings extends Record<string, unknown> = {}> {
  constructor(private bindList: Array<{ name: string | null; parser: Parser<unknown> }>) {}

  bind<N extends string, T>(name: N, parser: Parser<T>): Do<Bindings & Record<N, T>> {
    return new Do([...this.bindList, { name, parser }]);
  }

  ignore(parser: Parser<unknown>): Do<Bindings> {
    return new Do([...this.bindList, { name: null, parser }]);
  }

  bindT<N extends string>(name: N, type: TT): Do<Bindings & Record<N, IToken>> {
    return new Do([...this.bindList, { name, parser: Parser.matchT(type) }]);
  }

  ignoreT(type: TT): Do<Bindings> {
    return new Do([...this.bindList, { name: null, parser: Parser.matchT(type) }]);
  }

  finalize<T extends Record<string, unknown>>(given: T): Parser<Bindings & T> {
    function recursion(
      parsers: Do["bindList"],
      obj: Record<string, unknown>,
    ): Parser<Bindings & T> {
      if (parsers.length === 0) return Parser.result(obj) as Parser<Bindings & T>;

      const { name, parser } = parsers[0];

      return parser.bind((value) => {
        const newObj = {...obj};
        if (name) newObj[name] = value;
        return recursion(parsers.slice(1), newObj);
      });
    }

    return recursion(this.bindList, given);
  }

  result<T>(fn: (val: Bindings) => T) {
    return this.finalize({}).map(fn);
  }
}

export type P<T> = Parser<T>;
export { TokenType as TT };

export const mkToken = <T extends ASTKind>(
  token: T["token"],
  tag: T["tag"],
  rest: Omit<T, "token" | "tag">
): T => ({
  token,
  tag,
  ...rest
} as unknown as T);
