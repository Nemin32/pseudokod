import { Parser } from "./parser/parser.ts";
import { Atom, Expression, make_atom, make_binop } from "./pseudo_types.ts";

/* Atom */

const parseNumber = Parser.digit.many1().bindResult(Number).expect("<number>");

const parseString = Parser.alphanumeric
  .many()
  .bracket(Parser.char('"'), Parser.char('"'))
  .bindResult((chars) => '"' + chars.join("") + '"')
  .expect("<string>");

const parseBool = Parser.or(
  Parser.string("igaz")
    .or(Parser.string("Igaz"))
    .bindResult((_) => true),
  Parser.string("hamis")
    .or(Parser.string("Hamis"))
    .bindResult((_) => false)
).expect("<bool>");

const parseSingleAtom = parseNumber.or(parseString).or(parseBool).expect("<atom>");

const parseArrayComprehension = parseSingleAtom.sepBy(Parser.char(",")).parens().expect("<atom list>");

const parseAtom: Parser<Atom> = parseArrayComprehension.or(parseSingleAtom).bindResult(make_atom).expect("<atom>");

/* Binary Ops */

const parseAddOp: Parser<string> = Parser.char("+").or(Parser.char("-"));

const parseMulOp = Parser.char("*").or(Parser.char("/")).or(Parser.string("mod"));

const chainl1 = <T, O>(p: Parser<T>, op: Parser<O>): Parser<{ f: O; a: T; b: T } | T> => {
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

const chainl = <T, O, A>(p: Parser<T>, op: Parser<O>, a: Parser<A>) => chainl1(p, op).or(a);

const bindChain = <T, O, Q>(p: Parser<T>, op: Parser<O>, fT: (val: T) => Q, fOTT: (val: { f: O; a: T; b: T }) => Q) => {
  return chainl1(p, op).bindResult((chain) => {
    if (chain != null && typeof chain == "object" && "f" in chain) {
      return fOTT(chain);
    } else {
      return fT(chain);
    }
  });
};

const parseBinExp: Parser<Expression> = bindChain<Expression, string, Expression>(
  Parser.of(() => parseBinTerm),
  parseAddOp,
  (a) => a,
  ({ f, a, b }) => make_binop({ op: f, exp1: a, exp2: b })
);

const parseBinTerm: Parser<Expression> = bindChain(
  Parser.of(() => parseBinFactor),
  parseMulOp,
  (a) => a,
  ({ f, a, b }) => make_binop({ op: f, exp1: a, exp2: b })
);

const parseBinFactor: Parser<Expression> = Parser.or(parseAtom, Parser.of(() => parseBinExp).parens());

/* Expression */

const parseExpression = parseBinExp;

console.log(parseExpression.run("(5+5)+5*3").unwrap());
