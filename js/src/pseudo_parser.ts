import { Parser } from "./parser/parser";
import {
  ArithmeticBinOp,
  Assignment,
  Atom,
  Block,
  Expression,
  FunctionCall,
  FunctionDeclaration,
  LogicBinOp,
  If,
  Not,
  Parameter,
  Print,
  Return,
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

const parseFuncName: Parser<string> = Parser.upper.bind((l) => Parser.letter.many().bindResult((rest) => l + rest.join("")));

/* Groupings */

export const parseStatement: Parser<Statement> = Parser.of(() =>
  Parser.choice(parseReturn, parseFunctionDecl, parseWhileStatement, parseAssignmentStatement, parsePrintStatement, parseIfStatement)
);

export const parseExpression = Parser.of(() => Parser.choice(parseFuncCall, parseNot, parseLogicExp, parseBinExp));

export const parseBlock = parseStatement.sepBy(NL);

/* = Expressions = */

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

export const parseAtom: Parser<Atom> = parseArrayComprehension
  .or(parseSingleAtom)
  .bindResult((v) => new Atom(v))
  .expect("<atom>");

/* Variable */

const parseVarName: Parser<string> = Parser.letter.bind((l) => Parser.alphanumeric.many().bindResult((rest) => l + rest.join("")));
export const parseVariable: Parser<Variable> = parseVarName.bindResult((name) => new Variable(name));

/* Value */

export const parseValue = parseAtom.or(parseVariable);

/* Binary Ops */

export const parseAddOp: Parser<string> = Parser.char("+").or(Parser.char("-")).bracket(OWS, OWS);
export const parseMulOp = Parser.char("*").or(Parser.char("/")).or(Parser.string("mod")).bracket(OWS, OWS);

export const parseBinExp: Parser<Expression> = Parser.of(() => parseBinTerm).bindChain(parseAddOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));
export const parseBinTerm: Parser<Expression> = Parser.of(() => parseBinFactor).bindChain(parseMulOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));
export const parseBinFactor: Parser<Expression> = Parser.or(parseValue, Parser.of(() => parseBinExp).parens());

/* Logic Ops */

export const parseLogicOp: Parser<string> = Parser.or(Parser.string("&&"), Parser.string("||")).bracket(OWS, OWS)

export const parseLogicExp: Parser<Expression> = Parser.of(() => parseLogicFactor).bindChain(parseLogicOp, ({f,a,b}) => new LogicBinOp(f, a, b))
export const parseLogicFactor: Parser<Expression> = Parser.or(parseValue, parseLogicExp.parens())

/* Not */

export const parseNot: Parser<Not> = Parser.char("~")
  .right(parseExpression)
  .bindResult((e) => new Not(e));

/* Function Call */

const parseExpressionList = parseExpression.sepBy(Parser.char(",").left(OWS)).parens();

export const parseFuncCall: Parser<FunctionCall> = Parser.do()
  .bind("name", parseFuncName.left(OWS))
  .bind("params", parseExpressionList)
  .bindResult(({ name, params }) => new FunctionCall(name, params));

/* = Statements = */

export const parsePrintStatement: Parser<Print> = Parser.string("kiír ").bind((_) => parseExpression.bindResult((exp) => new Print(exp)));

export const parseIfStatement: Parser<If> = Parser.do()
  .ignore(Parser.string("ha").left(WS))
  .bind("pred", parseExpression)
  .ignore(Parser.string("akkor").bracket(WS, WS))
  .bind("tBlock", parseBlock)
  .ignore(Parser.string("különben").bracket(WS, WS))
  .bind("fBlock", parseBlock)
  .ignore(WS.right(Parser.string("elágazás vége")))
  .bindResult(({ pred, tBlock, fBlock }) => new If(pred, tBlock, fBlock));

export const parseAssignmentStatement: Parser<Assignment> = Parser.do()
  .bind("variable", parseVariable)
  .ignore(Parser.string("<-").bracket(OWS, OWS))
  .bind("value", parseExpression)
  .bindResult(({ variable, value }) => new Assignment(variable, value));

export const parseWhileStatement: Parser<While> = Parser.do()
  .ignore(Parser.string("ciklus amíg").right(WS))
  .bind("pred", parseExpression.left(WS))
  .bind("body", parseBlock.left(WS))
  .ignore(Parser.string("ciklus vége"))
  .bindResult(({ pred, body }) => new While(pred, body));

const parseParameter: Parser<Parameter> = Parser.do()
  .bind("isRef", Parser.string("címszerint").left(OWS).maybe())
  .bind("varName", parseVarName)
  .ignore(Parser.char(":").bracket(OWS, OWS))
  .bind("type", Parser.letter.many1())
  .bindResult(({ varName, isRef }) => new Parameter(varName, isRef != null));

const parseFuncList = parseParameter.sepBy(Parser.char(",").left(OWS)).parens();

export const parseFunctionDecl: Parser<FunctionDeclaration> = Parser.do()
  .ignore(Parser.string("függvény").left(WS))
  .bind("funcName", parseFuncName.left(OWS))
  .bind("params", parseFuncList.left(WS))
  .bind("body", parseBlock.left(WS))
  .ignore(Parser.string("függvény vége"))
  .bindResult(({ funcName, params, body }) => new FunctionDeclaration(funcName, params, body));

export const parseReturn: Parser<Return> = Parser.string("vissza")
  .left(SPACES)
  .right(parseExpression)
  .bindResult((e) => new Return(e));
