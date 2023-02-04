import { Parser } from "./parser/parser.ts";
import {
  AssignmentStatement,
  Atom,
  Block,
  Expression,
  IfStatement,
  make_assignment,
  make_atom,
  make_binop,
  make_if,
  make_print,
  make_variable,
  PrintStatement,
  Statement,
  Variable,
} from "./pseudo_types.ts";

const OWS = Parser.char(" ").many();
const WS = Parser.char(" ").many1();

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
const parseArrayComprehension = parseSingleAtom
  .sepBy(Parser.char(",").bind((_) => OWS))
  .parens()
  .expect("<atom list>");

const parseAtom: Parser<Atom> = parseArrayComprehension.or(parseSingleAtom).bindResult(make_atom).expect("<atom>");

/* Variable */

const parseVariable: Parser<Variable> = Parser.letter.bind((l) => Parser.alphanumeric.many().bindResult((rest) => make_variable(l + rest.join(""))));

/* Value */

const parseValue = parseVariable.or(parseAtom);

/* Binary Ops */

const parseAddOp: Parser<string> = Parser.char("+").or(Parser.char("-")).bracket(OWS, OWS);
const parseMulOp = Parser.char("*").or(Parser.char("/")).or(Parser.string("mod")).bracket(OWS, OWS);

const parseBinExp: Parser<Expression> = Parser.of(() => parseBinTerm).bindChain(parseAddOp, ({ f, a, b }) => make_binop(f, a, b));
const parseBinTerm: Parser<Expression> = Parser.of(() => parseBinFactor).bindChain(parseMulOp, ({ f, a, b }) => make_binop(f, a, b));
const parseBinFactor: Parser<Expression> = Parser.or(parseValue, Parser.of(() => parseBinExp).parens());

/* Expression */

const parseExpression = parseBinExp;

/* Statements */

const parsePrintStatement: Parser<PrintStatement> = Parser.string("kiír ").bind((_) => parseExpression.bindResult((exp) => make_print(exp)));

const parseIfStatement: Parser<IfStatement> = Parser.doNotation<{ pred: Expression; tBlock: Block; fBlock: Block }>([
  ["", Parser.string("ha ")],
  ["pred", parseExpression],
  ["", Parser.string(" akkor ")],
  ["tBlock", Parser.of(() => parseBlock)],
  ["", Parser.string(" különben ")],
  ["fBlock", Parser.of(() => parseBlock)],
  ["", Parser.string(" elágazás vége")],
]).bindResult(({ pred, tBlock, fBlock }) => make_if(pred, tBlock, fBlock));

const parseAssignmentStatement: Parser<AssignmentStatement> = Parser.doNotation<{ variable: Variable; value: Expression }>([
  ["variable", parseVariable],
  ["", Parser.string(" <- ")],
  ["value", parseExpression],
]).bindResult(({ variable, value }) => make_assignment(variable, value));

const parseStatement: Parser<Statement> = parseAssignmentStatement.or(parsePrintStatement).or(parseIfStatement);
const parseBlock = parseStatement.many();

console.log(parseBlock.run("ha 1+1 akkor kiír (1, 2, 3) különben x <- 5   + 5 elágazás vége").unwrap());