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
 * @template T Token: The type of an elem of @template TS .
 * @template O Output: The type of a successful match.
*/
class Parser<TS extends Indexable, T extends ArrayElem<TS>, O> {
  constructor(private exec: (inp: Input<TS>) => Result<TS, O>) {}

  run(input: TS): Result<TS, O> {
    return this.exec({ input, index: 0 });
  }

  // Kiveszi egy tokenstream első elemét és visszatér vele.
  // Ha a lista üres / végére értünk, hibát dob.
  static item<TS extends Indexable, T extends ArrayElem<TS>>(): Parser<TS, T, T> {
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

  static result<T extends Indexable, TS extends ArrayElem<T>, O>(value: O): Parser<T, TS, O> {
    return new Parser((inp) => ({ type: "match", next: inp, value }));
  }

  static fail<T extends Indexable, TS extends ArrayElem<T>>(msg: string): Parser<T, TS, never> {
    return new Parser((inp) => ({ type: "error", cause: msg, location: inp }));
  }

  bind<NewOutput>(other: (val: O) => Parser<TS, T, NewOutput>): Parser<TS, T, NewOutput> {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error") return current;
      return other(current.value).exec(current.next);
    });
  }

  catch(error: (previous: string) => string): Parser<TS, T, O> {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error") return { type: "error", cause: error(current.cause), location: current.location };
      return current;
    });
  }

  static or<T extends Indexable, TS extends ArrayElem<T>, O, OO>(
    one: Parser<T, TS, O>,
    other: Parser<T, TS, OO>,
  ) {
    return new Parser<T, TS, O | OO>((inp) => {
      const thisValue = one.exec(inp);
      if (thisValue.type === "error") return other.exec(inp);
      return thisValue;
    });
  }

  static sat<TS extends Indexable, T extends ArrayElem<TS>>(
    predicate: (val: T) => boolean,
    failMsg = "Parsing error.",
  ): Parser<TS, T, T> {
    return Parser.item<TS, T>().bind((elem: T) =>
      predicate(elem) ? Parser.result<TS, T, T>(elem) : Parser.fail<TS, T>(failMsg),
    );
  }

  static many<T extends Indexable, TS extends ArrayElem<T>, O>(
    p: Parser<T, TS, O>,
  ): Parser<T, TS, O[]> {
    return Parser.many1(p).or(Parser.result([]));
  }

  static many1<T extends Indexable, TS extends ArrayElem<T>, O>(
    p: Parser<T, TS, O>,
  ): Parser<T, TS, O[]> {
    return p
      .bind((first) => Parser.many(p).bind((rest) => Parser.result([first, ...rest])))
      .catch((p) => `Multiple(${p})`);
  }

  static sepBy<T extends Indexable, TS extends ArrayElem<T>, O>(
    parser: Parser<T, TS, O>,
    separator: Parser<T, TS, unknown>,
  ): Parser<T, TS, O[]> {
    return Parser.sepBy1(parser, separator).or(Parser.result([]));
  }

  static sepBy1<T extends Indexable, TS extends ArrayElem<T>, O>(
    parser: Parser<T, TS, O>,
    separator: Parser<T, TS, unknown>,
  ): Parser<T, TS, O[]> {
    return parser
      .bind((first) =>
        Parser.many(separator.bind((_) => parser.bind((val) => Parser.result(val)))).bind((rest) =>
          this.result([first, ...rest]),
        ),
      )
      .catch((prev) => `${prev}, sep. by ${separator}`);
  }

  static chainl<T extends Indexable, TS extends ArrayElem<T>, Term, Operator, BaseCase>(
    term: Parser<T, TS, Term>,
    op: Parser<T, TS, Operator>,
    baseCase: Parser<T, TS, BaseCase>,
  ) {
    return Parser.chainl1(term, op).or(baseCase);
  }

  static chainl1<T extends Indexable, TS extends ArrayElem<T>, Term, Operator>(
    term: Parser<T, TS, Term>,
    opParser: Parser<T, TS, Operator>,
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

  or<OtherOutput>(other: Parser<TS, T, OtherOutput>) {
    return Parser.or(this, other);
  }

  many(): Parser<TS, T, O[]> {
    return Parser.many(this);
  }

  many1(): Parser<TS, T, O[]> {
    return Parser.many1(this);
  }

  sepBy(separator: Parser<TS, T, unknown>): Parser<TS, T, O[]> {
    return Parser.sepBy(this, separator);
  }

  sepBy1(separator: Parser<TS, T, unknown>): Parser<TS, T, O[]> {
    return Parser.sepBy1(this, separator);
  }

  chainl<Operator, BaseCase>(op: Parser<TS, T, Operator>, baseCase: Parser<TS, T, BaseCase>) {
    return Parser.chainl(this, op, baseCase);
  }

  chainl1<Operator, BaseCase>(op: Parser<TS, T, Operator>) {
    return Parser.chainl1(this, op);
  }
}

const p = Parser.many(Parser.item())
  .bind((i: string[]) => Parser.result(i.map((o) => o.toUpperCase())))
  .run("hello");

console.log(p);
