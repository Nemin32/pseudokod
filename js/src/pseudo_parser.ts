import { Parser } from "./parser/parser.ts";
import {
  Assignment,
  Atom,
  Block,
  Expression,
  If,
  make_assignment,
  make_atom,
  make_binop,
  make_if,
  make_not,
  make_print,
  make_variable,
  make_while,
  Not,
  Print,
  Statement,
  Variable,
  While,
} from "./pseudo_types.ts";

export const OSPACES = Parser.char(" ").many();
export const SPACES = Parser.char(" ").many1();

export const ONL = Parser.char("\n").many();
export const NL = Parser.char("\n").many1();

export const WS = Parser.or(Parser.char(" "), Parser.char("\n")).many1();
export const OWS = Parser.or(Parser.char(" "), Parser.char("\n")).many();

/* Atom */

export const parseNumber = Parser.digit.many1().bindResult(Number).expect("<number>");

export const parseString = Parser.alphanumeric
  .many()
  .bracket(Parser.char('"'), Parser.char('"'))
  .bindResult((chars) => '"' + chars.join("") + '"')
  .expect("<string>");

export const parseBool = Parser.or(
  Parser.string("igaz")
    .or(Parser.string("Igaz"))
    .bindResult((_) => true),
  Parser.string("hamis")
    .or(Parser.string("Hamis"))
    .bindResult((_) => false)
).expect("<bool>");

export const parseSingleAtom = parseNumber.or(parseString).or(parseBool).expect("<atom>");
export const parseArrayComprehension = parseSingleAtom
  .sepBy(Parser.char(",").bind((_) => OWS))
  .parens()
  .expect("<atom list>");

export const parseAtom: Parser<Atom> = parseArrayComprehension.or(parseSingleAtom).bindResult(make_atom).expect("<atom>");

/* Variable */

export const parseVariable: Parser<Variable> = Parser.letter.bind((l) => Parser.alphanumeric.many().bindResult((rest) => make_variable(l + rest.join(""))));

/* Value */

export const parseValue = parseAtom.or(parseVariable);

/* Binary Ops */

export const parseAddOp: Parser<string> = Parser.char("+").or(Parser.char("-")).bracket(OWS, OWS);
export const parseMulOp = Parser.char("*").or(Parser.char("/")).or(Parser.string("mod")).bracket(OWS, OWS);

export const parseBinExp: Parser<Expression> = Parser.of(() => parseBinTerm).bindChain(parseAddOp, ({ f, a, b }) => make_binop(f, a, b));
export const parseBinTerm: Parser<Expression> = Parser.of(() => parseBinFactor).bindChain(parseMulOp, ({ f, a, b }) => make_binop(f, a, b));
export const parseBinFactor: Parser<Expression> = Parser.or(parseValue, Parser.of(() => parseBinExp).parens());

/* Not */

export const parseNot: Parser<Not> = Parser.char("~").right(Parser.of(() => parseExpression)).bindResult(make_not);

/* Expression */

export const parseExpression = parseBinExp.or(parseNot);

/* Statements */

export const parsePrintStatement: Parser<Print> = Parser.string("kiír ").bind((_) => parseExpression.bindResult((exp) => make_print(exp)));

export const parseIfStatement: Parser<If> = Parser.doNotation<{ pred: Expression; tBlock: Block; fBlock: Block }>([
  ["", Parser.string("ha").left(WS)],
  ["pred", parseExpression],
  ["", Parser.string("akkor").bracket(WS, WS)],
  ["tBlock", Parser.of(() => parseBlock)],
  ["", Parser.string("különben").bracket(WS, WS)],
  ["fBlock", Parser.of(() => parseBlock)],
  ["", WS.right(Parser.string("elágazás vége"))],
]).bindResult(({ pred, tBlock, fBlock }) => make_if(pred, tBlock, fBlock));

export const parseAssignmentStatement: Parser<Assignment> = Parser.doNotation<{ variable: Variable; value: Expression }>([
  ["variable", parseVariable],
  ["", Parser.string("<-").bracket(OWS, OWS)],
  ["value", parseExpression],
]).bindResult(({ variable, value }) => make_assignment(variable, value));

export const parseWhileStatement: Parser<While> = Parser.doNotation<{pred: Expression, body: Block}>([
  ["pred", Parser.string("ciklus amíg").right(SPACES).right(parseExpression).left(WS)],
  ["body", Parser.of(() => parseBlock).left(NL).left(Parser.string("ciklus vége"))]
]).bindResult(({pred, body}) => make_while(pred, body));

export const parseStatement: Parser<Statement> = parseWhileStatement.or(parseAssignmentStatement).or(parsePrintStatement).or(parseIfStatement);
export const parseBlock = parseStatement.many1();