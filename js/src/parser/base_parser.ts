type ParseResult<Tokens, T, E> = ({ kind: "capture"; next: Tokens; value: T } | { kind: "error"; where: Tokens; value: E })[];

class BaseParser<Token, Result> {
  constructor(public exec: (input: Token[]) => ParseResult<Token[], Result, string>) {}

  static result = <Token, Q>(value: Q): BaseParser<Token, Q> => new BaseParser((input: Token[]): ParseResult<Token[], Q, never> => [{ kind: "capture", next: input, value }]);
  static zero = <Token>(): BaseParser<Token, never> => new BaseParser((inp: Token[]): ParseResult<Token[], never, string> => [{ kind: "error", where: inp, value: "Zero!" }]);

  static item = <Token>(): BaseParser<Token, Token> =>
    new BaseParser((inp: Token[]): ParseResult<Token[], Token, string> => {
      if (inp.length == 0) {
        return [{kind: "error", where: inp, value: "EOF"}]
      }

      return [{
        kind: "capture",
        next: inp.slice(1),
        value: inp[0]
      }]
    })

  bind<Q>(func: (value: Result) => BaseParser<Token, Q>): BaseParser<Token, Q> {
    return new BaseParser<Token, Q>((inp: Token[]) => {
      const firstRun = this.exec(inp);

      const values = firstRun.flatMap(fR => {
        if (fR.kind == "error") return fR;

        const { next, value } = fR;
        return func(value).exec(next);
      })

      return values;
    });
  }

  static sat = <Token>(predicate: (value: Token) => boolean) => {
    return BaseParser.item<Token>().bind(value => {
      if (predicate(value)) {
        return BaseParser.result(value);
      } else {
        return BaseParser.zero();
      }
    })
  }
}

let num = BaseParser.sat<string>(n => n >= '0' && n <= '9')
