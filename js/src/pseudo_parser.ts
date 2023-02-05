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
  Parameter,
  Print,
  Statement,
  Variable,
} from "./pseudo_types.ts";

export const OSPACES = Parser.char(" ").many();
export const SPACES = Parser.char(" ").many1();

export const ONL = Parser.char("\n").many();
export const NL = Parser.char("\n").many1();

export const WS = Parser.or(Parser.char(" "), Parser.char("\n")).many1();
export const OWS = Parser.or(Parser.char(" "), Parser.char("\n")).many();

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
      (function (ast: Exclude<AST, Block|Parameter[]>) {
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
            return ast.name;

          case "arrAssign":
            return `${astToString(ast.variable)}[${astToString(ast.length)}]`;

          case "arrElemAssign":
            return `${astToString(ast.array)}[${astToString(ast.index)}] = ${astToString(ast.value)}`;

          case "comparison":
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;

          case "doWhile":
            return `${astToString(ast.pred)} ${astToString(ast.body)}`;

          case "functionCall":
            return `${ast.functionName}(${astToString(ast.parameters)})`;

          case "functionDecl":
            return `${ast.name}(${astToString(ast.parameters)}) {${astToString(ast.body)}}`;

          case "logicBinop":
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;

          case "not":
            return astToString(ast.exp);

          case "parameter":
            return `${ast.name} : ${ast.byReference ? "REF" : "VAL"}`;

          case "return":
            return astToString(ast.value);

          case "while":
            return `${astToString(ast.pred)} ${astToString(ast.body)}`;
        }
      })(ast) +
      ")"
    );
  }
}

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

export const parseValue = parseVariable.or(parseAtom);

/* Binary Ops */

export const parseAddOp: Parser<string> = Parser.char("+").or(Parser.char("-")).bracket(OWS, OWS);
export const parseMulOp = Parser.char("*").or(Parser.char("/")).or(Parser.string("mod")).bracket(OWS, OWS);

export const parseBinExp: Parser<Expression> = Parser.of(() => parseBinTerm).bindChain(parseAddOp, ({ f, a, b }) => make_binop(f, a, b));
export const parseBinTerm: Parser<Expression> = Parser.of(() => parseBinFactor).bindChain(parseMulOp, ({ f, a, b }) => make_binop(f, a, b));
export const parseBinFactor: Parser<Expression> = Parser.or(parseValue, Parser.of(() => parseBinExp).parens());

/* Expression */

export const parseExpression = parseBinExp;

/* Statements */

export const parsePrintStatement: Parser<Print> = Parser.string("kiír ").bind((_) => parseExpression.bindResult((exp) => make_print(exp)));

export const parseIfStatement: Parser<If> = Parser.doNotation<{ pred: Expression; tBlock: Block; fBlock: Block }>([
  ["", left(Parser.string("ha"), WS)],
  ["pred", parseExpression],
  ["", Parser.string("akkor").bracket(WS, WS)],
  ["tBlock", Parser.of(() => parseBlock)],
  ["", Parser.string("különben").bracket(WS, WS)],
  ["fBlock", Parser.of(() => parseBlock)],
  ["", right(WS, Parser.string("elágazás vége"))],
]).bindResult(({ pred, tBlock, fBlock }) => make_if(pred, tBlock, fBlock));

export const parseAssignmentStatement: Parser<Assignment> = Parser.doNotation<{ variable: Variable; value: Expression }>([
  ["variable", parseVariable],
  ["", Parser.string("<-").bracket(OWS, OWS)],
  ["value", parseExpression],
]).bindResult(({ variable, value }) => make_assignment(variable, value));

export const parseStatement: Parser<Statement> = parseAssignmentStatement.or(parsePrintStatement).or(parseIfStatement);
export const parseBlock = parseStatement.many1();

/*
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
*/