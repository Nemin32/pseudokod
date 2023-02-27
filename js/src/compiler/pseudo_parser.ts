import { TokenType as TT } from "../parser/tokenizer.ts";
import { TokenToASTParser as P } from "../parser/token_parser.ts";
import {
  ArithmeticBinOp,
  ArrayAssignment,
  ArrayComprehension,
  ArrayElementAssignment,
  ArrayIndex,
  Assignment,
  Atom,
  Block,
  Comparison,
  Debug,
  DoWhile,
  Expression,
  For,
  FunctionCall,
  FunctionDeclaration,
  If,
  LogicBinOp,
  Not,
  Parameter,
  Print,
  Return,
  Statement,
  Variable,
  While,
} from "./pseudo_types.ts";

/* = Groupings = */

const parseExpression: P<Expression> = P.of(() =>
  // parseNegate.or(parseArrayComprehension).or(parseFuncCall).or(parseArrayIndex) .or(parseLogic).or(parseVariable).or(parseNumber).or(parseBool).or(parseString)
  parseNegate.or(parseArrayComprehension).or(parseFuncCall).or(parseLogic)
);

const parseStatement: P<Statement> = P.of<Statement>(() =>
  parseArrayElementAssignment
    .or(parseArrayAssignment)
    .or(parseIf)
    .or(parseReturn)
    .or(parseFor)
    .or(parseAssignment)
    .or(parseFuncDecl)
    .or(parsePrint)
    .or(parseDoWhile)
    .or(parseWhile)
    .or(parseDebug)
    .or(parseExpression)
);

export const parseBlock: P<Block> = parseStatement.many1(); //parseStatement.bind(s => parseBlock.bind(ps => P.result([s].concat(ps)))).or(P.result([])) //parseStatement.many1(); //.or(P.result([]));

/* = Utils = */

const parseFuncName = P.matchToken(TT.FUNCNAME).bindResult((t) => t.lexeme);
const parseSymbol = P.matchToken(TT.SYMBOL).bindResult((t) => t.lexeme);
const parseType = P.matchToken(TT.TYPE).bindResult((t) => t.lexeme);

const parseParameter = P.do()
  .bind("ref", P.matchToken(TT.CIMSZERINT).maybe())
  .bind("name", parseSymbol)
  .ignore(P.matchToken(TT.COLON))
  .bind("type", parseType)
  .ignore(P.matchToken(TT.TOMB).maybe())
  .bindResult(({ ref, name, _type }) => new Parameter(name, ref != null));

const parseParamList = parseParameter.sepBy(P.matchToken(TT.COMMA)).or(
  P.result([]),
).parens();
const parseExpressionList = parseExpression.sepBy(P.matchToken(TT.COMMA)).or(
  P.result([]),
).parens();

/* = Expressions = */

/* Atom */
const parseNumber: P<Atom> = P.matchToken(TT.NUMBER).bindResult((token) =>
  new Atom(Number(token.lexeme))
);
const parseString: P<Atom> = P.matchToken(TT.STRING).bindResult((token) =>
  new Atom(token.lexeme.slice(1, token.lexeme.length - 1))
);
const parseBool: P<Atom> = P.matchToken(TT.BOOLEAN).bindResult((token) =>
  new Atom(token.lexeme == "igaz")
);

/* Variable */
const parseVariable: P<Variable> = P.matchToken(TT.SYMBOL).bindResult((token) =>
  new Variable(token.lexeme)
);

/* Array Index */
const parseArrayIndex: P<ArrayIndex> = parseVariable.bind((variable) =>
  parseExpression.brackets().bindResult((index) =>
    new ArrayIndex(variable, index)
  )
);

/* Array Comprehension */
const parseArrayComprehension: P<ArrayComprehension> = parseExpressionList
  .bindResult((exps) => new ArrayComprehension(exps));

/* Negation */
const parseNegate: P<Not> = P.matchToken(TT.NEGAL)
  .right(parseExpression)
  .bindResult((exp) => new Not(exp));

/* Function Call */
const parseFuncCall: P<FunctionCall> = P.do()
  .bind("name", parseFuncName)
  .bind("params", parseExpressionList)
  .bindResult(({ name, params }) => new FunctionCall(name, params));

/* = Statements = */
const parseFuncDecl: P<FunctionDeclaration> = P.do()
  .ignore(P.matchToken(TT.FUGGVENY))
  .bind("name", parseFuncName)
  .bind("params", parseParamList)
  .bind("body", parseBlock)
  .ignore(P.matchToken(TT.FUGGVENY).end())
  .bindResult(({ name, params, body }) =>
    new FunctionDeclaration(name, params, body)
  );

/* Print */
const parsePrint: P<Print> = P.matchToken(TT.KIIR)
  .right(parseExpression)
  .bindResult((exp) => new Print(exp));

/* Debug */
const parseDebug: P<Debug> = P.matchToken(TT.DEBUG).bindResult((_) =>
  new Debug()
);

/* Return */
const parseReturn: P<Return> = P.matchToken(TT.VISSZA)
  .right(parseExpression)
  .bindResult((exp) => new Return(exp));

/* Assignment */
const parseAssignment: P<Assignment> = P.do()
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .bind("exp", parseExpression)
  .bindResult(({ variable, exp }) => new Assignment(variable, exp));

/* BinOps */

const parseAddOp = P.matchToken(TT.ARITHMOP).bind(
  (
    t,
  ) => (["+", "-"].includes(t.lexeme)
    ? P.result(t.lexeme)
    : P.zero("Not an add/sub operator.")),
);
const parseMulOp = P.matchToken(TT.ARITHMOP).bind(
  (
    t,
  ) => (["*", "/", "mod"].includes(t.lexeme)
    ? P.result(t.lexeme)
    : P.zero("Not an add/sub operator.")),
);
const parseCompOp = P.matchToken(TT.COMPOP).bindResult((t) => t.lexeme);
const parseLogicOp = P.matchToken(TT.LOGICOP).bindResult((t) => t.lexeme);

const parseValue = parseArrayIndex.or(parseVariable).or(parseNumber).or(
  parseBool,
).or(parseString);

const parseFactor: P<Expression> = parseValue.or(
  P.of(() => parseLogic).parens(),
);

const parseArithmAdd: P<Expression> = parseFactor
  .bindChain(parseAddOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));

const parseArithmMul: P<Expression> = parseArithmAdd
  .bindChain(parseMulOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));

const parseComp: P<Expression> = parseArithmMul
  .bindChain(parseCompOp, ({ f, a, b }) => new Comparison(f, a, b));

const parseLogic: P<Expression> = parseComp
  .bindChain(parseLogicOp, ({ f, a, b }) => new LogicBinOp(f, a, b));

/* If  */

// ha PRED akkor BODY
// ((különben ha PRED akkor BODY)* különben BODY)) | (különben BODY)?
// elágazás vége

// ha PRED akkor BODY
const parseIfHead: P<{ pred: Expression; body: Block }> = P.do()
  .ignoreT(TT.HA)
  .bind("pred", parseExpression)
  .ignoreT(TT.AKKOR)
  .bind("body", parseBlock)
  .toBaseParser();

// (különben ha PRED akkor BODY)*
const parseElseIf = P.matchToken(TT.KULONBEN).right(parseIfHead).many1();

// különben BODY
const parseElse = P.matchToken(TT.KULONBEN).right(parseBlock);

const parseSimpleIf = P.do()
  .bind("head", parseIfHead)
  .bind("elseB", parseElse.maybe())
  .ignoreT(TT.ELAGAZAS)
  .ignoreT(TT.VEGE)
  .bindResult(({ head, elseB }) => new If(head, [], elseB));

const parseIfElse = P.do()
  .bind("head", parseIfHead)
  .bind("elseIf", parseElseIf)
  .bind("elseB", parseElse)
  .ignoreT(TT.ELAGAZAS)
  .ignoreT(TT.VEGE)
  .bindResult(({ head, elseIf, elseB }) => new If(head, elseIf, elseB));

const parseIf: P<If> = parseIfElse.or(parseSimpleIf);

/* Array Assignment */
const parseArrayAssignment = P.do()
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .ignoreT(TT.LETREHOZ)
  .bind("type", parseType.brackets())
  .bind("length", parseExpression.parens())
  .bindResult(({ variable, type, length }) =>
    new ArrayAssignment(variable, type, length)
  );

/* Array Element Assignment */
const parseArrayElementAssignment = P.do()
  .bind("variable", parseArrayIndex)
  .ignoreT(TT.NYIL)
  .bind("exp", parseExpression)
  .bindResult(({ variable, exp }) => new ArrayElementAssignment(variable, exp));

/* For */
const parseFor: P<For> = P.do()
  .ignoreT(TT.CIKLUS)
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .bind("fromE", parseExpression)
  .ignoreT(TT.FORSTART)
  .bind("toE", parseExpression)
  .ignoreT(TT.FOREND)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .bindResult(({ variable, fromE, toE, body }) =>
    new For(variable, fromE, toE, body)
  );

/* While */
const parseWhile = P.do()
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .bindResult(({ pred, body }) => new While(pred, body));

/* Do While */
const parseDoWhile = P.do()
  .ignore(P.matchToken(TT.CIKLUS))
  .bind("body", parseBlock)
  .ignore(P.matchToken(TT.AMIG))
  .bind("pred", parseExpression)
  .bindResult(({ pred, body }) => new DoWhile(pred, body));

/*
function run<T>(p: P<T>, input: string) {
  const tk = new Tokenizer(input);
  const tokens = tk.parse().filter((f) => f.type != TokenType.WHITESPACE);
  return [tokens, p.run(tokens)?.at(0)];
}
*/
