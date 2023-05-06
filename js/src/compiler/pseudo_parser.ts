import { PseudoToken, TokenType as TT } from "../parser/tokenizer.ts";
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
  parseNegate.or(parseArrayComprehension).or(parseFuncCall).or(parseLogic),
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
    .or(parseExpression),
);

export const parseProgram = (tokens: PseudoToken[]) =>
  parseBlock.run(tokens.filter((t) => t.type !== TT.WHITESPACE));
export const parseBlock: P<Block> = parseStatement.many1();

/* = Utils = */

const parseFuncName = P.matchToken(TT.FUNCNAME); //.bindResult((t) => t.lexeme);
const parseSymbol = P.matchToken(TT.SYMBOL).bindResult((t) => t.lexeme);
const parseType = P.matchToken(TT.TYPE).bindResult((t) => t.lexeme);

const parseParameter = P.do()
  .bind("ref", P.matchToken(TT.CIMSZERINT).maybe())
  .bind("name", parseSymbol)
  .bindT("colon", TT.COLON)
  .bind("type", parseType)
  .bind("tomb", P.matchToken(TT.TOMB).maybe())
  .bindResult(
    ({ ref, colon, name, type, tomb }) =>
      new Parameter(ref ?? colon, name, ref != null, type + (tomb ? " tömb" : "")),
  );

const parseParamList = parseParameter.sepBy(P.matchToken(TT.COMMA)).or(P.result([])).parens();
const parseExpressionList = parseExpression.sepBy(P.matchToken(TT.COMMA)).or(P.result([])).parens();

/* = Expressions = */

/* Atom */
const parseNumber: P<Atom> = P.matchToken(TT.NUMBER).bindResult(
  (token) => new Atom(token, Number(token.lexeme)),
);
const parseString: P<Atom> = P.matchToken(TT.STRING).bindResult(
  (token) => new Atom(token, token.lexeme.slice(1, token.lexeme.length - 1)),
);
const parseBool: P<Atom> = P.matchToken(TT.BOOLEAN).bindResult(
  (token) => new Atom(token, token.lexeme === "igaz"),
);

/* Variable */
const parseVariable: P<Variable> = P.matchToken(TT.REFERENCE)
  .maybe()
  .bind((isRef) =>
    P.matchToken(TT.SYMBOL).bindResult(
      (token) => new Variable(token, token.lexeme, isRef !== null),
    ),
  );

/* Array Index */
const parseArrayIndex: P<ArrayIndex> = parseVariable.bind((variable) =>
  parseExpression.brackets().bindResult((index) => new ArrayIndex(variable.token, variable, index)),
);

/* Array Comprehension */
const parseArrayComprehension: P<ArrayComprehension> = parseExpressionList.bindResult(
  (exps) => new ArrayComprehension(exps[0].token, exps),
);

/* Negation */
const parseNegate: P<Not> = P.matchToken(TT.NEGAL).bind((tok) =>
  parseExpression.bindResult((exp) => new Not(tok, exp)),
);

/* Function Call */
const parseFuncCall: P<FunctionCall> = P.do()
  .bind("name", parseFuncName)
  .bind("params", parseExpressionList)
  .bindResult(({ name, params }) => new FunctionCall(name, name.lexeme, params));

/* = Statements = */
const parseFuncDecl: P<FunctionDeclaration> = P.do()
  .bindT("kw", TT.FUGGVENY)
  .bind("name", parseFuncName)
  .bind("params", parseParamList)
  .bind("body", parseBlock)
  .ignore(P.matchToken(TT.FUGGVENY).end())
  .bindResult(
    ({ kw, name, params, body }) => new FunctionDeclaration(kw, name.lexeme, params, body),
  );

/* Print */
const parsePrint: P<Print> = P.matchToken(TT.KIIR).bind((tok) =>
  parseExpression.bindResult((exp) => new Print(tok, exp)),
);

/* Debug */
const parseDebug: P<Debug> = P.matchToken(TT.DEBUG).bindResult((tok) => new Debug(tok));

/* Return */
const parseReturn: P<Return> = P.matchToken(TT.VISSZA).bind((tok) =>
  parseExpression.bindResult((exp) => new Return(tok, exp)),
);

/* Assignment */
const parseAssignment: P<Assignment> = P.do()
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .bind("exp", parseExpression)
  .bindResult(({ variable, exp }) => new Assignment(variable.token, variable, exp));

/* BinOps */

const parseAddOp = P.matchToken(TT.ARITHMOP).bind((t) =>
  ["+", "-"].includes(t.lexeme) ? P.result(t) : P.zero("Not an add/sub operator."),
);
const parseMulOp = P.matchToken(TT.ARITHMOP).bind((t) =>
  ["*", "/", "mod"].includes(t.lexeme) ? P.result(t) : P.zero("Not an add/sub operator."),
);
const parseCompOp = P.matchToken(TT.COMPOP);
const parseLogicOp = P.matchToken(TT.LOGICOP);

const parseValue = parseArrayIndex.or(parseVariable).or(parseNumber).or(parseBool).or(parseString);
const parseFactor: P<Expression> = parseValue.or(P.of(() => parseLogic).parens());
const parseArithmAdd: P<Expression> = parseFactor.bindChain(
  parseAddOp,
  ({ f, a, b }) => new ArithmeticBinOp(f, f.lexeme, a, b),
);
const parseArithmMul: P<Expression> = parseArithmAdd.bindChain(
  parseMulOp,
  ({ f, a, b }) => new ArithmeticBinOp(f, f.lexeme, a, b),
);
const parseComp: P<Expression> = parseArithmMul.bindChain(
  parseCompOp,
  ({ f, a, b }) => new Comparison(f, f.lexeme, a, b),
);
const parseLogic: P<Expression> = parseComp.bindChain(
  parseLogicOp,
  ({ f, a, b }) => new LogicBinOp(f, f.lexeme, a, b),
);

/* If  */

// ha PRED akkor BODY
// ((különben ha PRED akkor BODY)* különben BODY)) | (különben BODY)?
// elágazás vége

// ha PRED akkor BODY
const parseIfHead: P<{ token: PseudoToken; pred: Expression; body: Block }> = P.do()
  .bindT("token", TT.HA)
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
  .bindResult(({ head, elseB }) => new If(head.token, head, [], elseB));

const parseIfElse = P.do()
  .bind("head", parseIfHead)
  .bind("elseIf", parseElseIf)
  .bind("elseB", parseElse)
  .ignoreT(TT.ELAGAZAS)
  .ignoreT(TT.VEGE)
  .bindResult(({ head, elseIf, elseB }) => new If(head.token, head, elseIf, elseB));

const parseIf: P<If> = parseIfElse.or(parseSimpleIf);

/* Array Assignment */
const parseArrayAssignment = P.do()
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .ignoreT(TT.LETREHOZ)
  .bind("type", parseType.brackets())
  .bind("length", parseExpression.parens())
  .bindResult(
    ({ variable, type, length }) => new ArrayAssignment(variable.token, variable, type, length),
  );

/* Array Element Assignment */
const parseArrayElementAssignment = P.do()
  .bind("variable", parseArrayIndex)
  .ignoreT(TT.NYIL)
  .bind("exp", parseExpression)
  .bindResult(({ variable, exp }) => new ArrayElementAssignment(variable.token, variable, exp));

/* For */
const parseFor: P<For> = P.do()
  .bindT("kw", TT.CIKLUS)
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .bind("fromE", parseExpression)
  .ignoreT(TT.FORSTART)
  .bind("toE", parseExpression)
  .ignoreT(TT.FOREND)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .bindResult(({ kw, variable, fromE, toE, body }) => new For(kw, variable, fromE, toE, body));

/* While */
const parseWhile = P.do()
  .bindT("kw", TT.CIKLUS)
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .bindResult(({ kw, pred, body }) => new While(kw, pred, body));

/* Do While */
const parseDoWhile = P.do()
  .bind("kw", P.matchToken(TT.CIKLUS))
  .bind("body", parseBlock)
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .bindResult(({ kw, pred, body }) => new DoWhile(kw, pred, body));

/*
function run<T>(p: P<T>, input: string) {
  const tk = new Tokenizer(input);
  const tokens = tk.parse().filter((f) => f.type != TokenType.WHITESPACE);
  return [tokens, p.run(tokens)?.at(0)];
}
*/
