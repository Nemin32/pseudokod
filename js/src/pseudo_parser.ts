import { Either } from "./parser/error.ts";
import { Parser } from "./parser/parser.ts";
import {
  Assignment,
  AST,
  Atom,
  Block,
  Expression,
  If,
  make_assignment,
  make_atom,
  make_binop,
  make_if,
  make_print,
  make_variable,
  Print,
  Statement,
  Variable,
} from "./pseudo_types.ts";

const OSPACES = Parser.char(" ").many();
const SPACES = Parser.char(" ").many1();

const ONL = Parser.char("\n").many();
const NL = Parser.char("\n").many1();

const WS = Parser.or(Parser.char(" "), Parser.char("\n")).many1();
const OWS = Parser.or(Parser.char(" "), Parser.char("\n")).many();

function left<L, R>(l: Parser<L>, r: Parser<R>): Parser<L> {
  return l.bind((lV) => r.bindResult((_) => lV));
}

function right<L, R>(l: Parser<L>, r: Parser<R>): Parser<R> {
  return l.bind((_) => r.bindResult((rV) => rV));
}

function astToString(ast: AST): string {
  if (Array.isArray(ast)) {
    return ast.map(astToString).join("\n");
  } else {
    return (
      "(" +
      ast.kind +
      " " +
      (function (ast: Exclude<AST, Block>) {
        switch (ast.kind) {
          case "assignment":
            return astToString(ast.variable) + " <- " + astToString(ast.value);

          case "atom":
            return ast.value.toString();

          case "binop":
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;

          case "if":
            return `T: ${astToString(ast.truePath)} F: ${astToString(ast.falsePath)}`;

          case "print":
            return astToString(ast.value);

          case "variable":
            return ast.value;
        }
      })(ast) +
      ")"
    );
  }
}

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

const parsePrintStatement: Parser<Print> = Parser.string("kiír ").bind((_) => parseExpression.bindResult((exp) => make_print(exp)));

const parseIfStatement: Parser<If> = Parser.doNotation<{ pred: Expression; tBlock: Block; fBlock: Block }>([
  ["", left(Parser.string("ha"), WS)],
  ["pred", parseExpression],
  ["", Parser.string("akkor").bracket(WS, WS)],
  ["tBlock", Parser.of(() => parseBlock)],
  ["", Parser.string("különben").bracket(WS, WS)],
  ["fBlock", Parser.of(() => parseBlock)],
  ["", right(WS, Parser.string("elágazás vége"))],
]).bindResult(({ pred, tBlock, fBlock }) => make_if(pred, tBlock, fBlock));

const parseAssignmentStatement: Parser<Assignment> = Parser.doNotation<{ variable: Variable; value: Expression }>([
  ["variable", parseVariable],
  ["", Parser.string("<-").bracket(OWS, OWS)],
  ["value", parseExpression],
]).bindResult(({ variable, value }) => make_assignment(variable, value));

const parseStatement: Parser<Statement> = parseAssignmentStatement.or(parsePrintStatement).or(parseIfStatement);
const parseBlock = parseStatement.many1();

const input = `ha 1+1 akkor 
  kiír (1, 2, 3)
különben 
  x <- 5   + 5
elágazás vége`;

const ast = parseBlock.run(input);

ast
  .bind((ast) => {
    console.log("S: " + astToString(ast.value));
    return Either.succeed(null);
  })
  .bindError((e) => {
    console.error("E: " + e.what);
    return Either.fail(null);
  });
