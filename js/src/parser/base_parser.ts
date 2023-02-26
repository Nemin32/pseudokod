type Input<T> = { tokens: T[]; index: number };
type Capture<T, R> = { kind: "capture"; next: Input<T>; value: R } 
type CError<T, E> = { kind: "error"; where: Input<T>; value: E }

type ParseResult<T, R, E> = (Capture<T,R> | CError<T, E>)[];

export class BaseParser<Token, Result, Error> {
  constructor(private exec: (input: Input<Token>) => ParseResult<Token, Result, Error>) {}

  wrap(input: Token[]): Input<Token> {
    return {
      tokens: input,
      index: 0,
    };
  }

  run(input: Token[]) {
    return this.exec(this.wrap(input));
  }

  static result = <Token, Q, Error>(value: Q): BaseParser<Token, Q, Error> =>
    new BaseParser(
      (input: Input<Token>): ParseResult<Token, Q, never> => [
        {
          kind: "capture",
          next: input,
          value,
        },
      ]
    );

  static zero = <Token, Error>(error: Error): BaseParser<Token, never, Error> =>
    new BaseParser(
      (inp: Input<Token>): ParseResult<Token, never, Error> => [
        {
          kind: "error",
          where: inp,
          value: error,
        },
      ]
    );

  static item = <Token, Error>(error: Error): BaseParser<Token, Token, Error> =>
    new BaseParser((inp: Input<Token>): ParseResult<Token, Token, Error> => {
      if (inp.index >= inp.tokens.length) {
        return [{ kind: "error", where: inp, value: error }];
      }

      return [
        {
          kind: "capture",
          next: { tokens: inp.tokens, index: inp.index + 1 },
          value: inp.tokens[inp.index],
        },
      ];
    });

  bind<Q>(func: (value: Result, prevInput: Input<Token>) => BaseParser<Token, Q, Error>): BaseParser<Token, Q, Error> {
    return new BaseParser<Token, Q, Error>((inp: Input<Token>) =>
      this.exec(inp).flatMap((fR) => (fR.kind == "error" ? fR : func(fR.value, fR.next).exec(fR.next)))
    );
  }

  static sat = <Token, Error>(predicate: (value: Token) => boolean, eofError: Error, noSatError: Error) => {
    return BaseParser.item<Token, Error>(eofError).bind((value) => (predicate(value) ? BaseParser.result(value) : BaseParser.zero(noSatError)));
  };

  or = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Q | Result, Error> =>
    new BaseParser<Token, Q | Result, Error>((inp) => {
      const firstRun = this.exec(inp) as ParseResult<Token, Q | Result, Error>;

      return firstRun.flatMap((run) => {
        if (run.kind == "capture") {
          return run;
        } else {
          return other.exec(inp) as ParseResult<Token, Q | Result, Error>;
        }
      });
    });

  sepBy = <S>(separator: BaseParser<Token, S, Error>): BaseParser<Token, Result[], Error> => {
    const valueBind = (_: S) => this.bind(BaseParser.result);
    const resultConcat = (x: Result, xs: Result[]): BaseParser<Token, Result[], Error> => BaseParser.result([x].concat(xs));
    const sepBind = separator.bind(valueBind);

    return this.bind((x) => sepBind.many().bind((xs) => resultConcat(x, xs)));
  };

  bindResult<W>(f: (val: Result, inp: Input<Token>) => W): BaseParser<Token, W, Error> {
    return this.bind((val, inp) => BaseParser.result(f(val, inp)));
  }

  left = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Result, Error> => this.bind((v) => other.bindResult((_) => v));
  right = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Q, Error> => this.bind((_) => other.bindResult((v) => v));
  bracket = <Q, T>(leftB: BaseParser<Token, Q, Error>, rightB: BaseParser<Token, T, Error>) => leftB.right(this).left(rightB);

  plus = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Result | Q, Error> =>
    new BaseParser<Token, Q | Result, Error>((inp) => (this as BaseParser<Token, Result | Q, Error>).exec(inp).concat(other.exec(inp)));

  many1 = (): BaseParser<Token, Result[], Error> => this.bind((x) => this.many().bindResult((xs) => [x].concat(xs)));
  many = (): BaseParser<Token, Result[], Error> => this.many1().plus(BaseParser.result<Token, Result[], Error>([]));
  maybe = (): BaseParser<Token, Result | null, Error> => this.or(BaseParser.result(null));

  static exact = <T>(value: T) => BaseParser.sat(elem => elem == value, "EOF!", "Expected " + value);

  static of = <T, R, E>(p: BaseParser<T, R, E>) => new BaseParser<T, R, E>((inp) => p.exec(inp));

  static do<Token>() {
    return new BaseDo<{}, Token>([], []);
  }
}

class BaseDo<B extends Record<symbol | number | string, never>, Token> {
  // deno-lint-ignore no-explicit-any
  constructor(public parsers: BaseParser<Token, any, any>[], public names: string[]) {}

  // deno-lint-ignore no-explicit-any
  bind<BindName extends string, BindType extends any>(name: BindName, parser: BaseParser<Token, BindType, any>): BaseDo<B & Record<BindName, BindType>, Token> {
    return new BaseDo(this.parsers.concat([parser]), this.names.concat([name]));
  }

  // deno-lint-ignore no-explicit-any
  ignore(parser: BaseParser<Token, any, any>): BaseDo<B, Token> {
    return new BaseDo(this.parsers.concat([parser]), this.names.concat([""]));
  }

  // deno-lint-ignore no-explicit-any
  bindResult<T>(f: (val: B) => T): BaseParser<Token, T, any> {
  // deno-lint-ignore no-explicit-any
    const zipped: Array<[string, BaseParser<Token, any, any>]> = this.parsers.map((p, idx) => [this.names[idx], p]);
    return BaseDo.finalize<B, Token>(zipped).bindResult(f);
  }

  // deno-lint-ignore no-explicit-any
  toBaseParser(): BaseParser<Token, B, any> {
    return this.bindResult<B>((val) => val);
  }

  /** @internal */
  // deno-lint-ignore no-explicit-any
  private static finalize<Obj, Token>(parsers: Array<[string, BaseParser<Token, any, any>]>): BaseParser<Token, Obj, any> {
    const descend = (
      // deno-lint-ignore no-explicit-any
      list: Array<[string, BaseParser<Token, any, any>]>,
      // deno-lint-ignore no-explicit-any
      obj: Record<string, any>
      // deno-lint-ignore no-explicit-any
    ): BaseParser<Token, any, any> => {
      if (list.length == 0) {
        return BaseParser.result(obj);
      } else {
        const [varName, parser] = list[0];

        return parser.bind((value) => {
          if (varName != "") {
            obj[varName] = value;
          }

          return descend(list.slice(1), obj);
        });
      }
    };

    return descend(parsers, {});
  }
}