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

const parseBinExp: Parser<Expression> = Parser.of(() => parseBinTerm).bindChain(parseAddOp, ({ f, a, b }) => make_binop({ op: f, exp1: a, exp2: b }));
const parseBinTerm: Parser<Expression> = Parser.of(() => parseBinFactor).bindChain(parseMulOp, ({ f, a, b }) => make_binop({ op: f, exp1: a, exp2: b }));
const parseBinFactor: Parser<Expression> = Parser.or(parseAtom, Parser.of(() => parseBinExp).parens());

/* Expression */

const parseExpression = parseBinExp;

console.log(parseExpression.run("(5+5)+5*3").unwrap());
