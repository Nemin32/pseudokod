import { Either } from "./error.js";

type Input = {
  text: string;
  index: number;
};

type Capture<T> = {
  value: T;
  next: Input;
};

type Error = {
  what: string;
  where: Input;
};

// A Record is Either...
// - A successful parse.
// - A parsing error.
type PRecord<T> = Either<Capture<T>, Error>;

export class Parser<T> {
  constructor(private func: (input: Input) => PRecord<T>) {}

  private exec(input: Input): PRecord<T> {
    return this.func(input);
  }

  public run(input: string): PRecord<T> {
    return this.exec(Parser.wrap(input));
  }

  static wrap = (input: string): Input => ({ text: input, index: 0 });

  static zero = <T>() => new Parser<never>((input) => Either.fail({ what: "Generic parser fail: " + input.text.substring(input.index), where: input }));

  static result = <T>(v: T) => new Parser<T>((input) => Either.succeed({ value: v, next: input }));

  static item = () => {
    return new Parser<string>((input) => {
      const { text, index } = input;

      if (index >= text.length) {
        return Either.fail<Error>({ what: "End-of-File", where: input });
      } else {
        return Either.succeed<Capture<string>>({ value: text[index], next: { text, index: index + 1 } });
      }
    });
  };

  bind<W>(f: (elem: T) => Parser<W>): Parser<W> {
    return new Parser((inp) => this.exec(inp).bind(({ value, next }) => f(value).exec(next)));
  }

  bindResult = <W>(f: (elem: T) => W): Parser<W> => this.bind((val) => Parser.result(f(val)));

  static left<L, R>(l: Parser<L>, r: Parser<R>): Parser<L> {
    return l.bind((lV) => r.bindResult((_) => lV));
  }

  left<R>(r: Parser<R>): Parser<T> {
    return Parser.left(this, r);
  }

  static right<L, R>(l: Parser<L>, r: Parser<R>): Parser<R> {
    return l.bind((_) => r.bindResult((rV) => rV));
  }

  right<R>(r: Parser<R>): Parser<R> {
    return Parser.right(this, r);
  }

  static sat(p: (char: string) => boolean): Parser<string> {
    return Parser.item().bind((x) => (p(x) ? Parser.result(x) : Parser.zero()).onError((_) => `'${x}'`));
  }

  onError(format: (prev: Error) => string): Parser<T> {
    return new Parser<T>((input) => {
      return this.exec(input).mapError((prevMsg) => (input.index < prevMsg.where.index ? prevMsg : { what: format(prevMsg), where: input }));
    });
  }

  expect(what: string): Parser<T> {
    return this.onError((_) => what);
  }

  static or = <T, Q>(p: Parser<T>, q: Parser<Q>): Parser<T | Q> =>
    new Parser<T | Q>((inp) => {
      return (p.exec(inp) as PRecord<T | Q>).bindError((pErr) =>
        q.exec(inp).bindError((qErr) => {
          const [p, q] = [pErr.where.index, qErr.where.index];

          if (p == 0 && q == 0) {
            return Either.fail({ what: "Nothing", where: pErr.where });
          } else if (pErr.where.index > qErr.where.index) {
            return Either.fail(pErr);
          } else if (pErr.where.index < qErr.where.index) {
            return Either.fail(qErr);
          } else {
            const both = `${pErr.what} or ${qErr.what}`;
            return Either.fail<Error>({ what: both, where: pErr.where });
          }
        })
      );
    });

  or = <Q>(q: Parser<Q>): Parser<T | Q> => Parser.or(this, q);

  many1 = (): Parser<T[]> => this.bind((x) => this.many().bind((xs) => Parser.result([x].concat(xs)))).onError((p) => `at least one [${p.what}]`);
  static many1 = <T>(p: Parser<T>): Parser<T[]> => p.many1();

  many = (): Parser<T[]> =>
    this.many1()
      .or(Parser.result<T[]>([]))
      .onError((p) => `${p.what}.`);
  static many = <T>(p: Parser<T>): Parser<T[]> => p.many();

  maybe = (): Parser<T | null> => Parser.maybe(this);
  static maybe = <T>(p: Parser<T>): Parser<T | null> => new Parser<T | null>((input) => p.or(Parser.result(null)).exec(input));

  static char = (c: string) => Parser.sat((x) => x == c).expect(`'${c}'`);
  static lower = Parser.sat((c) => c >= "a" && c <= "z").expect("a-z");
  static upper = Parser.sat((c) => c >= "A" && c <= "Z").expect("A-Z");
  static digit = Parser.sat((c) => c >= "0" && c <= "9").expect("0-9");
  static letter = Parser.lower.or(Parser.upper).expect("a-Z");
  static alphanumeric = Parser.letter.or(Parser.digit);

  static spaces = Parser.char(" ").many1().expect("space(s)");

  static word: Parser<string> = Parser.letter.bind((x) => Parser.word.bind((xs) => Parser.result(x.concat(xs)))).or(Parser.result(""));

  static string = (input: string): Parser<string> => {
    if (input == "") return Parser.result("");

    const [x, xs] = [input[0], input.substring(1)];

    return Parser.char(x)
      .onError((_) => `"${input}"`)
      .bind((_) => Parser.string(xs))
      .bind((_) => Parser.result(x.concat(xs)));
  };

  sepBy = <S>(separator: Parser<S>): Parser<T[]> => {
    const valueBind = (_: S) => this.bind(Parser.result);
    const sepBind = separator.bind(valueBind);

    const resultConcat = (x: T, xs: T[]) => Parser.result([x].concat(xs));
    return this.bind((x) => Parser.many(sepBind).bind((xs) => resultConcat(x, xs)));
  };

  bracket = <O, C>(open: Parser<O>, close: Parser<C>): Parser<T> => open.bind((_) => this).bind((x) => close.bind((_) => Parser.result(x)));

  static of = <T>(func: () => Parser<T>): Parser<T> => new Parser((inp) => func().exec(inp));

  parens = () => this.onError((p) => `[${p.what}] in parens`).bracket(Parser.char("("), Parser.char(")"));
  static parens = <T>(p: Parser<T>) => p.parens();

  /*
  static choice = <T>(parsers: Parser<any>[]): Parser<T> => {
    if (parsers.length == 0) return this.zero();
    return Parser.or(parsers[0], this.choice(parsers.slice(1)));
  };
  */

  static choice<A, B = never, C = never, D = never, E = never, F = never>(
    p1: Parser<A>,
    p2?: Parser<B>,
    p3?: Parser<C>,
    p4?: Parser<D>,
    p5?: Parser<E>,
    p6?: Parser<F>,
    // deno-lint-ignore no-explicit-any
    ...prest: Parser<any>[]
  ): Parser<A | B | C | D | E | F> {
    let p: Parser<A | B | C | D | E | F> = p1;

    if (p2) {
      p = p.or(p2);
    }
    if (p3) {
      p = p.or(p3);
    }
    if (p4) {
      p = p.or(p4);
    }
    if (p5) {
      p = p.or(p5);
    }
    if (p6) {
      p = p.or(p6);
    }

    if (prest.length > 0) {
      return prest.reduce((f, c) => f.or(c), p);
    }

    return p;
  }

  // deno-lint-ignore no-explicit-any
  /** @internal */
  static __doNotation<Obj = any>(parsers: Array<[string, Parser<any>]>): Parser<Obj> {
    // deno-lint-ignore no-explicit-any
    const descend = (list: Array<[string, Parser<any>]>, obj: Record<string, any>): Parser<any> => {
      if (list.length == 0) {
        return Parser.result(obj);
      } else {
        const [varName, parser] = list[0];

        return parser.bind((value) => {
          const objCopy = { ...obj };

          if (varName != "") {
            objCopy[varName] = value;
          }

          return descend(list.slice(1), objCopy);
        });
      }
    };

    return descend(parsers, {});
  }

  static chainl1 = <T, O>(p: Parser<T>, op: Parser<O>): Parser<{ f: O; a: T; b: T } | T> => {
    return p.bind((a) =>
      op.maybe().bind((f) => {
        if (f == null) {
          return Parser.result<{ f: O; a: T; b: T } | T>(a);
        } else {
          return p.bindResult<{ f: O; a: T; b: T } | T>((b) => ({ f, a, b }));
        }
      })
    );
  };

  static chainl = <T, O, A>(p: Parser<T>, op: Parser<O>, a: Parser<A>) => Parser.chainl1(p, op).or(a);

  static bindChain = <T, O, Q>(p: Parser<T>, op: Parser<O>, fOTT: (val: { f: O; a: T; b: T }) => Q) => {
    return Parser.chainl1(p, op).bindResult((chain) => {
      if (chain != null && typeof chain == "object" && "f" in chain) {
        return fOTT(chain);
      } else {
        return chain;
      }
    });
  };

  bindChain<O, Q>(op: Parser<O>, f: (val: { f: O; a: T; b: T }) => Q): Parser<T | Q> {
    return Parser.bindChain(this, op, f);
  }

  static do() {
    return new Do([],[]);
  }
}

class Do<B extends {}> {
  constructor(public parsers: Parser<any>[], public names: string[]) {}

  bind<BindName extends string, BindType extends any>(name: BindName, parser: Parser<BindType>): Do<B & Record<BindName, BindType>> {
    return new Do(this.parsers.concat([parser]), this.names.concat([name]));
  }

  ignore(parser: Parser<any>): Do<B> {
    return new Do(this.parsers.concat([parser]), this.names.concat([""]));
  }

  bindResult<T>(f: (val: B) => T): Parser<T> {
    const zipped: Array<[string, Parser<any>]> = this.parsers.map((p, idx) => [this.names[idx], p]);
    return Parser.__doNotation<B>(zipped).bindResult(f);
  }
}

/* Can't find a way to make it work.
type TMap<M extends Parser<any>[], A = never> =
  M extends [Parser<infer H>]
  ? Parser<H | A>
  : M extends [Parser<infer H>, ...infer T]
    ? T extends Parser<any>[]
      ? TMap<T, H | A>
      : A
    : A;
*/
