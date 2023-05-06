import { PseudoToken, TokenType } from "./tokenizer.ts";

type Error = string;
type Token = PseudoToken;

type InputWrap<T> = { tokens: T[]; index: number };

class Capture<T, R> {
  kind: Readonly<"capture"> = "capture";
  done(): boolean {
    return this.next.tokens.length === this.next.index;
  }
  constructor(public next: InputWrap<T>, public value: R) {}
}

class CError<T, E> {
  kind: Readonly<"error"> = "error";
  constructor(public where: InputWrap<T>, public value: E) {}
}

type ParseInput = InputWrap<Token>;
type ParseResult<T> = (Capture<Token, T> | CError<Token, Error>)[];

export class TokenToASTParser<T> {
  constructor(private exec: (input: ParseInput) => ParseResult<T>) {}

  wrap(input: Token[]): ParseInput {
    return {
      tokens: input,
      index: 0,
    };
  }

  run(input: Token[]): Capture<Token, T> | CError<T, Error> {
    const results = this.exec(this.wrap(input));
    const capture =
      (results.filter((c) => c.kind === "capture" && c.done()) as Capture<Token, T>[]).at(0) ??
      null;

    if (capture === null) {
      return results[0] as CError<T, Error>;
    }

    return capture;
  }

  static result = <Q>(value: Q): TokenToASTParser<Q> =>
    new TokenToASTParser((input: ParseInput): ParseResult<Q> => [new Capture(input, value)]);
  static zero = (error: Error): TokenToASTParser<never> =>
    new TokenToASTParser((inp: ParseInput): ParseResult<never> => [new CError(inp, error)]);

  static item = (error: Error): TokenToASTParser<Token> =>
    new TokenToASTParser((inp: ParseInput): ParseResult<Token> => {
      if (inp.index >= inp.tokens.length) {
        return [new CError(inp, error)];
      }

      return [new Capture({ tokens: inp.tokens, index: inp.index + 1 }, inp.tokens[inp.index])];
    });

  bind<Q>(func: (value: T, prevInput: ParseInput) => TokenToASTParser<Q>): TokenToASTParser<Q> {
    return new TokenToASTParser<Q>((inp: ParseInput) =>
      this.exec(inp).flatMap((fR) =>
        fR.kind === "error" ? fR : func(fR.value, fR.next).exec(fR.next),
      ),
    );
  }

  static sat = (predicate: (value: Token) => boolean, eofError: Error, noSatError: Error) => {
    return TokenToASTParser.item(eofError).bind((value) =>
      predicate(value) ? TokenToASTParser.result(value) : TokenToASTParser.zero(noSatError),
    );
  };

  or = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<Q | T> =>
    new TokenToASTParser<Q | T>((inp) => {
      const firstRun = this.exec(inp) as ParseResult<Q | T>;

      return firstRun.flatMap((run) => {
        if (run.kind === "capture") {
          return run;
        } else {
          return other.exec(inp) as ParseResult<Q | T>;
        }
      });
    });

  sepBy = <S>(separator: TokenToASTParser<S>): TokenToASTParser<T[]> => {
    const valueBind = (_: S) => this.bind(TokenToASTParser.result);
    const resultConcat = (x: T, xs: T[]): TokenToASTParser<T[]> =>
      TokenToASTParser.result([x].concat(xs));
    const sepBind = separator.bind(valueBind);

    return this.bind((x) => sepBind.many().bind((xs) => resultConcat(x, xs)));
  };

  bindResult<W>(f: (val: T, inp: ParseInput) => W): TokenToASTParser<W> {
    return this.bind((val, inp) => TokenToASTParser.result(f(val, inp)));
  }

  left = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<T> =>
    this.bind((v) => other.bindResult((_) => v));
  right = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<Q> =>
    this.bind((_) => other.bindResult((v) => v));
  bracket = <L, R>(leftB: TokenToASTParser<L>, rightB: TokenToASTParser<R>): TokenToASTParser<T> =>
    leftB.right(this).left(rightB);

  plus = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<T | Q> =>
    new TokenToASTParser<T | Q>((inp) =>
      (this as TokenToASTParser<T | Q>).exec(inp).concat(other.exec(inp)),
    );

  many1 = (): TokenToASTParser<T[]> =>
    this.bind((x) => this.many().bindResult((xs) => [x].concat(xs)));
  many = (): TokenToASTParser<T[]> => this.many1().or(TokenToASTParser.result<T[]>([]));
  maybe = (): TokenToASTParser<T | null> => this.or(TokenToASTParser.result(null));

  static matchToken = (type: TokenType) => TokenToASTParser.sat((t) => t.type === type, "EOF!", "");
  brackets = (): TokenToASTParser<T> =>
    this.bracket(
      TokenToASTParser.matchToken(TokenType.OBRACKET),
      TokenToASTParser.matchToken(TokenType.CBRACKET),
    );
  parens = (): TokenToASTParser<T> =>
    this.bracket(
      TokenToASTParser.matchToken(TokenType.OPAREN),
      TokenToASTParser.matchToken(TokenType.CPAREN),
    );
  end = (): TokenToASTParser<T> => this.left(TokenToASTParser.matchToken(TokenType.VEGE));

  static exact = <T>(value: T) =>
    TokenToASTParser.sat((elem) => elem === value, "EOF!", `Expected ${value}`);
  static of = <T>(p: () => TokenToASTParser<T>) => new TokenToASTParser<T>((inp) => p().exec(inp));

  static chainl1 = <T, O>(
    p: TokenToASTParser<T>,
    op: TokenToASTParser<O>,
  ): TokenToASTParser<{ f: O; a: T; b: T } | T> => {
    return p.bind((a) =>
      op
        .maybe()
        .bind((f) =>
          f === null
            ? TokenToASTParser.result<{ f: O; a: T; b: T } | T>(a)
            : p.bindResult<{ f: O; a: T; b: T } | T>((b) => ({ f, a, b })),
        ),
    );
  };

  static chainl = <T, O, A>(
    p: TokenToASTParser<T>,
    op: TokenToASTParser<O>,
    a: TokenToASTParser<A>,
  ) => TokenToASTParser.chainl1(p, op).or(a);

  static bindChain = <T, O, Q>(
    p: TokenToASTParser<T>,
    op: TokenToASTParser<O>,
    fOTT: (val: { f: O; a: T; b: T }) => Q,
  ) => {
    return TokenToASTParser.chainl1(p, op).bindResult((chain) => {
      if (chain != null && typeof chain === "object" && "f" in chain) {
        return fOTT(chain);
      } else {
        return chain;
      }
    });
  };

  bindChain<O, Q>(
    op: TokenToASTParser<O>,
    f: (val: { f: O; a: T; b: T }) => Q,
  ): TokenToASTParser<T | Q> {
    return TokenToASTParser.bindChain(this, op, f);
  }

  static do() {
    return new BaseDo([], []);
  }
}

class BaseDo<B extends Record<symbol | number | string, never>> {
  constructor(
    // rome-ignore lint: noExplicitAny
    public parsers: TokenToASTParser<any>[],
    public names: string[],
  ) {}

  // rome-ignore lint: noExplicitAny
  bind<BindName extends string, BindType extends any>(
    name: BindName,
    parser: TokenToASTParser<BindType>,
  ): BaseDo<B & Record<BindName, BindType>> {
    return new BaseDo(this.parsers.concat([parser]), this.names.concat([name]));
  }

  bindT<BindName extends string>(
    name: BindName,
    token: TokenType,
  ): BaseDo<B & Record<BindName, PseudoToken>> {
    return this.bind(name, TokenToASTParser.matchToken(token));
  }

  // rome-ignore lint: noExplicitAny
  ignore(parser: TokenToASTParser<any>): BaseDo<B> {
    return new BaseDo(this.parsers.concat([parser]), this.names.concat([""]));
  }

  ignoreT(token: TokenType): BaseDo<B> {
    return this.ignore(TokenToASTParser.matchToken(token));
  }

  bindResult<T>(f: (val: B) => T): TokenToASTParser<T> {
    // rome-ignore lint: noExplicitAny
    const zipped: Array<[string, TokenToASTParser<any>]> = this.parsers.map((p, idx) => [
      this.names[idx],
      p,
    ]);
    return BaseDo.finalize<B>(zipped).bindResult(f);
  }

  toBaseParser(): TokenToASTParser<B> {
    return this.bindResult<B>((val) => val);
  }

  /** @internal */
  private static finalize<Obj>(
    // rome-ignore lint: noExplicitAny
    parsers: Array<[string, TokenToASTParser<any>]>,
  ): TokenToASTParser<Obj> {
    const descend = (
      // rome-ignore lint: noExplicitAny
      list: Array<[string, TokenToASTParser<any>]>,
      // rome-ignore lint: noExplicitAny
      obj: Record<string, any>,
      // rome-ignore lint: noExplicitAny
    ): TokenToASTParser<any> => {
      if (list.length === 0) {
        return TokenToASTParser.result(obj);
      } else {
        const [varName, parser] = list[0];

        return parser.bind((value) => {
          const newObj = { ...obj };

          if (varName !== "") {
            newObj[varName] = value;
          }

          return descend(list.slice(1), newObj);
        });
      }
    };

    return descend(parsers, {});
  }
}
