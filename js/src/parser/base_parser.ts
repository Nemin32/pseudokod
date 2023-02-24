type Input<T> = { tokens: T[]; index: number };
type ParseResult<T, R, E> = ({ kind: "capture"; next: Input<T>; value: R } | { kind: "error"; where: Input<T>; value: E })[];

class BaseParser<Token, Result, Error> {
  constructor(public exec: (input: Input<Token>) => ParseResult<Token, Result, Error>) {}

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

  bind<Q>(func: (value: Result) => BaseParser<Token, Q, Error>): BaseParser<Token, Q, Error> {
    return new BaseParser<Token, Q, Error>((inp: Input<Token>) => {
      const firstRun = this.exec(inp);

      const values = firstRun.flatMap((fR) => {
        if (fR.kind == "error") return fR;

        const { next, value } = fR;
        return func(value).exec(next);
      });

      return values;
    });
  }

  static sat = <Token, Error>(predicate: (value: Token) => boolean, eofError: Error, noSatError: Error) => {
    return BaseParser.item<Token, Error>(eofError).bind((value) => {
      if (predicate(value)) {
        return BaseParser.result(value);
      } else {
        return BaseParser.zero(noSatError);
      }
    });
  };

  or = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Q | Result, Error> => new BaseParser(inp => {
    const firstRun = this.exec(inp) as ParseResult<Token, Q|Result, Error>;

    return firstRun.flatMap(run => {
      if (run.kind == "capture") {
        return run;
      } else {
        return other.exec(inp) as ParseResult<Token, Q|Result, Error>
      }
    })
  });

  bindResult<W>(f: (val: Result) => W): BaseParser<Token, W, Error> {
    return this.bind((val) => BaseParser.result(f(val)));
  }

  left = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Result, Error> => this.bind((v) => other.bindResult((_) => v));
  right = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Q, Error> => this.bind((_) => other.bindResult((v) => v));
  bracket = <Q,T>(leftB: BaseParser<Token, Q, Error>, rightB: BaseParser<Token, T, Error>) => leftB.right(this).left(rightB);

  plus = <Q>(other: BaseParser<Token, Q, Error>): BaseParser<Token, Result | Q, Error> =>
    new BaseParser((inp) => (this as BaseParser<Token, Result | Q, Error>).exec(inp).concat(other.exec(inp)));

  many1 = (): BaseParser<Token, Result[], Error> => this.bind((x) => this.many().bindResult((xs) => [x].concat(xs)));
  many = (): BaseParser<Token, Result[], Error> => this.many1().plus(BaseParser.result<Token, Result[], Error>([]));
  maybe = (): BaseParser<Token, Result | null, Error> => this.or(BaseParser.result(null));

  static of = <T,R,E>(p: BaseParser<T,R,E>) => new BaseParser<T,R,E>(inp => p.exec(inp));
}
