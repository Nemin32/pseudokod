import { PseudoToken, TokenType } from "./tokenizer.ts";

type Error = string;
type Token = PseudoToken;

type InputWrap<T> = { tokens: T[]; index: number };
type Capture<T, R> = { kind: "capture"; next: InputWrap<T>; value: R };
type CError<T, E> = { kind: "error"; where: InputWrap<T>; value: E };

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

  run(input: Token[]) {
    return this.exec(this.wrap(input));
  }

  static result = <Q>(value: Q): TokenToASTParser<Q> =>
    new TokenToASTParser(
      (input: ParseInput): ParseResult<Q> => [
        {
          kind: "capture",
          next: input,
          value,
        },
      ]
    );

  static zero = (error: Error): TokenToASTParser<never> =>
    new TokenToASTParser(
      (inp: ParseInput): ParseResult<never> => [
        {
          kind: "error",
          where: inp,
          value: error,
        },
      ]
    );

  static item = (error: Error): TokenToASTParser<Token> =>
    new TokenToASTParser((inp: ParseInput): ParseResult<Token> => {
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

  bind<Q>(func: (value: T, prevInput: ParseInput) => TokenToASTParser<Q>): TokenToASTParser<Q> {
    return new TokenToASTParser<Q>((inp: ParseInput) => this.exec(inp).flatMap((fR) => (fR.kind == "error" ? fR : func(fR.value, fR.next).exec(fR.next))));
  }

  static sat = (predicate: (value: Token) => boolean, eofError: Error, noSatError: Error) => {
    return TokenToASTParser.item(eofError).bind((value) => (predicate(value) ? TokenToASTParser.result(value) : TokenToASTParser.zero(noSatError)));
  };

  or = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<Q | T> =>
    new TokenToASTParser<Q | T>((inp) => {
      const firstRun = this.exec(inp) as ParseResult<Q | T>;

      return firstRun.flatMap((run) => {
        if (run.kind == "capture") {
          return run;
        } else {
          return other.exec(inp) as ParseResult<Q | T>;
        }
      });
    });

  sepBy = <S>(separator: TokenToASTParser<S>): TokenToASTParser<T[]> => {
    const valueBind = (_: S) => this.bind(TokenToASTParser.result);
    const resultConcat = (x: T, xs: T[]): TokenToASTParser<T[]> => TokenToASTParser.result([x].concat(xs));
    const sepBind = separator.bind(valueBind);

    return this.bind((x) => sepBind.many().bind((xs) => resultConcat(x, xs)));
  };

  bindResult<W>(f: (val: T, inp: ParseInput) => W): TokenToASTParser<W> {
    return this.bind((val, inp) => TokenToASTParser.result(f(val, inp)));
  }

  left = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<T> => this.bind((v) => other.bindResult((_) => v));
  right = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<Q> => this.bind((_) => other.bindResult((v) => v));
  bracket = <L, R>(leftB: TokenToASTParser<L>, rightB: TokenToASTParser<R>): TokenToASTParser<T> => leftB.right(this).left(rightB);

  plus = <Q>(other: TokenToASTParser<Q>): TokenToASTParser<T | Q> =>
    new TokenToASTParser<T | Q>((inp) => (this as TokenToASTParser<T | Q>).exec(inp).concat(other.exec(inp)));

  many1 = (): TokenToASTParser<T[]> => this.bind((x) => this.many().bindResult((xs) => [x].concat(xs)));
  many = (): TokenToASTParser<T[]> => this.many1().plus(TokenToASTParser.result<T[]>([]));
  maybe = (): TokenToASTParser<T | null> => this.or(TokenToASTParser.result(null));

  static matchToken = (type: TokenType) => TokenToASTParser.sat((t) => t.type == type, "EOF!", "");
  brackets = (): TokenToASTParser<T> => this.bracket(TokenToASTParser.matchToken(TokenType.OBRACKET), TokenToASTParser.matchToken(TokenType.CBRACKET))
  parens = (): TokenToASTParser<T> => this.bracket(TokenToASTParser.matchToken(TokenType.OPAREN), TokenToASTParser.matchToken(TokenType.CPAREN))
  end = (): TokenToASTParser<T> => this.left(TokenToASTParser.matchToken(TokenType.VEGE))

  static exact = <T>(value: T) => TokenToASTParser.sat((elem) => elem == value, "EOF!", "Expected " + value);
  static of = <T>(p: () => TokenToASTParser<T>) => new TokenToASTParser<T>((inp) => p().exec(inp));

  static do() {
    return new BaseDo([], []);
  }
}

class BaseDo<B extends Record<symbol | number | string, never>> {
  // deno-lint-ignore no-explicit-any
  constructor(public parsers: TokenToASTParser<any>[], public names: string[]) {}

  // deno-lint-ignore no-explicit-any
  bind<BindName extends string, BindType extends any>(name: BindName, parser: TokenToASTParser<BindType>): BaseDo<B & Record<BindName, BindType>> {
    return new BaseDo(this.parsers.concat([parser]), this.names.concat([name]));
  }

  // deno-lint-ignore no-explicit-any
  ignore(parser: TokenToASTParser<any>): BaseDo<B> {
    return new BaseDo(this.parsers.concat([parser]), this.names.concat([""]));
  }

  ignoreT(token: TokenType): BaseDo<B> {
    return this.ignore(TokenToASTParser.matchToken(token));
  }

  bindResult<T>(f: (val: B) => T): TokenToASTParser<T> {
    // deno-lint-ignore no-explicit-any
    const zipped: Array<[string, TokenToASTParser<any>]> = this.parsers.map((p, idx) => [this.names[idx], p]);
    return BaseDo.finalize<B>(zipped).bindResult(f);
  }

  toBaseParser(): TokenToASTParser<B> {
    return this.bindResult<B>((val) => val);
  }

  /** @internal */
  // deno-lint-ignore no-explicit-any
  private static finalize<Obj>(parsers: Array<[string, TokenToASTParser<any>]>): TokenToASTParser<Obj> {
    const descend = (
      // deno-lint-ignore no-explicit-any
      list: Array<[string, TokenToASTParser<any>]>,
      // deno-lint-ignore no-explicit-any
      obj: Record<string, any>
      // deno-lint-ignore no-explicit-any
    ): TokenToASTParser<any> => {
      if (list.length == 0) {
        return TokenToASTParser.result(obj);
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