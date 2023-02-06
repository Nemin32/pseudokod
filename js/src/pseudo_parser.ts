import { Parser } from "./parser/parser";
import {
  ArithmeticBinOp,
  Assignment,
  Atom,
  Block,
  Expression,
  FunctionCall,
  FunctionDeclaration,
  If,
  Not,
  Parameter,
  Print,
  Statement,
  Variable,
  While,
} from "./pseudo_types";

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

export const parseAtom: Parser<Atom> = parseArrayComprehension.or(parseSingleAtom).bindResult(v => new Atom(v)).expect("<atom>");

/* Variable */

const parseVarName: Parser<string> = Parser.letter.bind((l) => Parser.alphanumeric.many().bindResult((rest) => l + rest.join("")));
export const parseVariable: Parser<Variable> = parseVarName.bindResult(name => new Variable(name));

/* Value */

export const parseValue = parseAtom.or(parseVariable);

/* Binary Ops */

export const parseAddOp: Parser<string> = Parser.char("+").or(Parser.char("-")).bracket(OWS, OWS);
export const parseMulOp = Parser.char("*").or(Parser.char("/")).or(Parser.string("mod")).bracket(OWS, OWS);

export const parseBinExp: Parser<Expression> = Parser.of(() => parseBinTerm).bindChain(parseAddOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));
export const parseBinTerm: Parser<Expression> = Parser.of(() => parseBinFactor).bindChain(parseMulOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));
export const parseBinFactor: Parser<Expression> = Parser.or(parseValue, Parser.of(() => parseBinExp).parens());

/* Not */

export const parseNot: Parser<Not> = Parser.char("~").right(Parser.of(() => parseExpression)).bindResult(e => new Not(e));

/* Expression */

export const parseExpression = parseNot.or(parseBinExp)

/* Statements */

export const parsePrintStatement: Parser<Print> = Parser.string("kiír ").bind((_) => parseExpression.bindResult((exp) => new Print(exp)));

export const parseIfStatement: Parser<If> = Parser.doNotation<{ pred: Expression; tBlock: Block; fBlock: Block }>([
  ["", Parser.string("ha").left(WS)],
  ["pred", parseExpression],
  ["", Parser.string("akkor").bracket(WS, WS)],
  ["tBlock", Parser.of(() => parseBlock)],
  ["", Parser.string("különben").bracket(WS, WS)],
  ["fBlock", Parser.of(() => parseBlock)],
  ["", WS.right(Parser.string("elágazás vége"))],
]).bindResult(({ pred, tBlock, fBlock }) => new If(pred, tBlock, fBlock));

export const parseAssignmentStatement: Parser<Assignment> = Parser.doNotation<{ variable: Variable; value: Expression }>([
  ["variable", parseVariable],
  ["", Parser.string("<-").bracket(OWS, OWS)],
  ["value", parseExpression],
]).bindResult(({ variable, value }) => new Assignment(variable, value));

export const parseWhileStatement: Parser<While> = Parser.doNotation<{pred: Expression, body: Block}>([
  ["pred", Parser.string("ciklus amíg").right(SPACES).right(parseExpression).left(WS)],
  ["body", Parser.of(() => parseBlock).left(NL).left(Parser.string("ciklus vége"))]
]).bindResult(({pred, body}) => new While(pred, body));

const parseParameter: Parser<Parameter> = Parser.doNotation<{varName: string, isRef: boolean}>([
  ["isRef", Parser.string("címszerint").left(OWS).maybe()],
  ["varName", parseVarName],
  ["", Parser.char(":").bracket(OWS, OWS)],
  ["type", Parser.letter.many1()]
]).bindResult(({varName, isRef}) => new Parameter(varName, isRef));

const parseFuncName: Parser<string> = Parser.upper.bind(l => Parser.letter.many().bindResult(rest => l + rest.join("")))
const parseFuncList = parseParameter.many().parens()

export const parseFunctionDecl: Parser<FunctionDeclaration> = Parser.doNotation<{funcName: string, params: Parameter[], body: Block}>([
  ["", Parser.string("függvény").left(WS)],
  ["funcName", parseFuncName.left(OWS)],
  ["params", parseFuncList.left(WS)],
  ["body", Parser.of(() => parseBlock).left(WS).left(Parser.string("függvény vége"))],
]).bindResult(({funcName, params, body}) => new FunctionDeclaration(funcName, params, body));

export const parseFuncCall: Parser<FunctionCall> = Parser.doNotation<{name: string, params: Expression[]}>([
  ["name", parseFuncName.left(OWS)],
  ["params", parseExpression.many().parens()]
]).bindResult(({name, params}) => new FunctionCall(name, params))

export const parseStatement: Parser<Statement> = Parser.choice(
  parseFuncCall,
  parseFunctionDecl,
  parseWhileStatement,
  parseAssignmentStatement,
  parsePrintStatement,
  parseIfStatement
)

//parseWhileStatement.or(parseAssignmentStatement).or(parsePrintStatement).or(parseIfStatement);
export const parseBlock = parseStatement.sepBy(NL);