import { TokenType as TT, Tokenizer } from "../parser/tokenizer.ts";
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

const matchToken = (type: TT) => P.sat((t) => t.type == type, "EOF!", "");

const WS = matchToken(TT.WHITESPACE).maybe();
const OWS = WS.maybe();

/* = Groupings = */

const parseExpression: P<Expression> = P.of(() => parseNegate.or(parseNumber).or(parseBool).or(parseString));
const parseStatement: P<Statement> = P.of(() => parseExpression.or(parsePrint).or(parseDoWhile).or(parseWhile).or(parseDebug));
const parseBlock: P<Block> = OWS.right(parseStatement.sepBy(WS));

/* = Expressions = */

/* Atom */
const parseNumber: P<Atom> = matchToken(TT.NUMBER).bindResult((token) => new Atom(Number(token.lexeme)));
const parseString: P<Atom> = matchToken(TT.STRING).bindResult((token) => new Atom(token.lexeme.slice(1, token.lexeme.length - 1)));
const parseBool: P<Atom> = matchToken(TT.BOOLEAN).bindResult((token) => new Atom(token.lexeme == "igaz"));

/* Negation */
const parseNegate = matchToken(TT.NEGAL)
  .right(parseExpression)
  .bindResult((exp) => new Not(exp));

/* = Statements = */

const parseFuncName = matchToken(TT.FUNCNAME).bindResult((t) => t.lexeme);

const parseSymbol = matchToken(TT.SYMBOL).bindResult((t) => t.lexeme);
const parseType = matchToken(TT.TYPE).bindResult((t) => t.lexeme);

const parseParameter = P.do()
  .bind("ref", matchToken(TT.CIMSZERINT).maybe())
  .bind("name", parseSymbol)
  .ignore(matchToken(TT.COLON))
  .bind("type", parseType)
  .ignore(matchToken(TT.TOMB).maybe())
  .bindResult(({ ref, name, _type }) => new Parameter(name, ref != null));

const parseParamList = parseParameter.sepBy(matchToken(TT.COMMA)).bracket(matchToken(TT.OPAREN), matchToken(TT.CPAREN));

const parseFuncDecl = P.do()
  .ignore(matchToken(TT.FUGGVENY))
  .bind("name", parseFuncName)
  .bind("params", parseParamList)
  .bind("body", parseBlock)
  .ignore(matchToken(TT.FUGGVENY))
  .ignore(matchToken(TT.VEGE))
  .bindResult(({ name, params, body }) => new FunctionDeclaration(name, params, body));

/* Print */
const parsePrint = matchToken(TT.KIIR)
  .right(WS)
  .right(parseExpression)
  .bindResult((exp) => new Print(exp));

/* Debug */
const parseDebug = matchToken(TT.DEBUG).bindResult((_) => new Debug());

/* While */
const parseWhile = P.do()
  .ignore(matchToken(TT.CIKLUS))
  .ignore(matchToken(TT.AMIG))
  .bind("pred", parseExpression)
  .bind("body", parseBlock)
  .ignore(matchToken(TT.CIKLUS))
  .ignore(matchToken(TT.VEGE))
  .bindResult(({ pred, body }) => new While(pred, body));

/* Do While */
const parseDoWhile = P.do()
  .ignore(matchToken(TT.CIKLUS))
  .bind("body", parseBlock)
  .ignore(matchToken(TT.AMIG))
  .bind("pred", parseExpression)
  .bindResult(({ pred, body }) => new DoWhile(pred, body));

function run(input: string) {
  const tokenizer = new Tokenizer(input);
  const tokens = tokenizer.parse().filter((t) => t.type != TT.WHITESPACE);

  return parseBlock.run(tokens).filter((c) => c.kind == "capture")?.[0]?.value;
}

console.log(run("ciklus kiír 5 amíg 5"));
