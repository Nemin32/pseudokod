import { Parser } from "../parser/parser.ts";
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
  Expression,
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

// const OSPACES = Parser.char(" ").many();
const SPACES = Parser.char(" ").many1();

// const ONL = Parser.char("\n").many();
// const NL = Parser.char("\n").many1();

const WS = Parser.or(Parser.char(" "), Parser.char("\n")).many1();
const OWS = Parser.or(Parser.char(" "), Parser.char("\n")).many();

/*
const tokenize = (words: string | string[]): Parser<string> => {
  if (typeof words === "string") {
    return OWS.right(Parser.string(words));
  } else if (words.length === 1) {
    return OWS.right(Parser.string(words[0]));
  } else if (words.length === 0) {
    throw new Error("Length must be more than one");
  } else {
    return OWS.right(
      words.slice(1).reduce(
        (p, str) => p.left(WS).bind((_) => Parser.string(str)),
        Parser.string(words[0]),
      ),
    );
  }
};
*/

const parseFuncName: Parser<string> = Parser.upper.bind((l) =>
  Parser.letter.many().bindResult((rest) => l + rest.join(""))
);

const parseType: Parser<string> = Parser.choice(
  Parser.string("egész"),
  Parser.string("szöveg"),
);

/* Groupings */

export const parseStatement: Parser<Statement> = OWS.right(
  Parser.of(() =>
    Parser.choice(
      parseDebug,
      parseReturn,
      parseFuncCall,
      parseFunctionDecl,
      parseWhileStatement,
      parseArrayAssignment,
      parseArrayElementAssignment,
      parseAssignmentStatement,
      parsePrintStatement,
      parseIfStatement,
    )
  ),
);

export const parseExpression: Parser<Expression> = OWS.right(
  Parser.of(() =>
    Parser.choice(
      parseArrayComprehension,
      parseArrayIndex,
      parseFuncCall,
      parseNot,
      parseComp,
    )
  ),
);

export const parseBlock: Parser<Block> = OWS.right(parseStatement).sepBy(WS);

/* = Expressions = */

/* Comprehension */

export const parseArrayComprehension = parseExpression
  .sepBy(Parser.char(",").left(OWS))
  .parens()
  .bindResult((exps: Expression[]) => new ArrayComprehension(exps))
  .expect("<expression list>");

/* Atom */

export const parseNumber = Parser.digit.many1().bindResult((digits) =>
  Number(digits.join(""))
).expect(
  "<number>",
);

export const parseString = Parser.sat((c) => c != '"')
  .many()
  .bracket(Parser.char('"'), Parser.char('"'))
  .bindResult((chars) => chars.join(""))
  .expect("<string>");

export const parseBool = Parser.or(
  Parser.string("igaz")
    .or(Parser.string("Igaz"))
    .bindResult((_) => true),
  Parser.string("hamis")
    .or(Parser.string("Hamis"))
    .bindResult((_) => false),
).expect("<bool>");

export const parseAtom: Parser<Atom> = parseNumber
  .or(parseString)
  .or(parseBool)
  .bindResult((v) => new Atom(v))
  .expect("<atom>");

/* Variable */

const parseVarName: Parser<string> = Parser.letter.bind((l) =>
  Parser.alphanumeric.many().bindResult((rest) => l + rest.join(""))
);
export const parseVariable: Parser<Variable> = parseVarName.bindResult((name) =>
  new Variable(name)
);

/* Array Indexing */

export const parseArrayIndex: Parser<ArrayIndex> = Parser.do()
  .bind("variable", parseVariable)
  .bind("index", parseExpression.bracket(Parser.char("["), Parser.char("]")))
  .bindResult(({ variable, index }) => new ArrayIndex(variable, index));

/* Value */

export const parseValue = parseAtom.or(parseVariable);

/* Binary Ops */

export const parseCompOp: Parser<string> = Parser.choice(
  Parser.string("=/="),
  Parser.string("<="),
  Parser.string(">="),
  Parser.char("="),
  Parser.char("<"),
  Parser.char(">"),
).bracket(OWS, OWS);

export const parseLogicOp: Parser<string> = Parser.or(
  Parser.string("&&"),
  Parser.string("||"),
).bracket(OWS, OWS);
export const parseMulOp: Parser<string> = Parser.char("*").or(Parser.char("/"))
  .or(Parser.string("mod")).bracket(OWS, OWS);
export const parseAddOp: Parser<string> = Parser.char("+").or(Parser.char("-"))
  .bracket(OWS, OWS);

const parseFactor: Parser<Expression> = parseValue.or(
  Parser.of(() => parseLogic).parens(),
);

const parseArithmAdd: Parser<Expression> = parseFactor
  .bindChain(parseAddOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));

const parseArithmMul: Parser<Expression> = parseArithmAdd
  .bindChain(parseMulOp, ({ f, a, b }) => new ArithmeticBinOp(f, a, b));

const parseComp: Parser<Expression> = parseArithmMul
  .bindChain(parseCompOp, ({ f, a, b }) => new Comparison(f, a, b));

const parseLogic: Parser<Expression> = parseComp
  .bindChain(parseLogicOp, ({ f, a, b }) => new LogicBinOp(f, a, b));

/* Not */

export const parseNot: Parser<Not> = Parser.char("~")
  .right(parseExpression)
  .bindResult((e) => new Not(e));

/* Function Call */

const parseExpressionList = Parser.or(
  OWS.parens().bindResult((_) => []),
  parseExpression.sepBy(Parser.char(",").left(OWS))
    .parens(),
);

export const parseFuncCall: Parser<FunctionCall> = Parser.do()
  .bind("name", parseFuncName.left(OWS))
  .bind("params", parseExpressionList)
  .bindResult(({ name, params }) => new FunctionCall(name, params));

/* = Statements = */

/* Debug */

export const parseDebug: Parser<Debug> = Parser.string("debug").bindResult(
  (_) => new Debug(),
);

/* Print */

export const parsePrintStatement: Parser<Print> = Parser.string("kiír ")
  .bind((_) => parseExpression.bindResult((exp: Expression) => new Print(exp)));

/* If */

const parseIfHead: Parser<{ pred: Expression; body: Block }> = Parser.do()
  .ignore(Parser.string("ha").left(WS))
  .bind("pred", parseExpression)
  .ignore(Parser.string("akkor").bracket(WS, WS))
  .bind("body", parseBlock)
  .toParser();

const parseElse: Parser<Block> = Parser.string("különben").bracket(WS, WS)
  .right(parseBlock);

const parseElseIfBranches: Parser<Array<{ pred: Expression; body: Block }>> =
  Parser.do()
    .ignore(Parser.string("különben ha").bracket(WS, WS))
    .bind("pred", parseExpression)
    .ignore(Parser.string("akkor").bracket(WS, WS))
    .bind("body", parseBlock)
    .toParser().many1();

// if ...
const parseIf: Parser<If> = parseIfHead.left(
  OWS.right(Parser.string("elágazás vége")),
).bindResult((head) => new If(head, [], null));

// if ... else ...
const parseIfElse: Parser<If> = Parser.do()
  .bind("head", parseIfHead)
  .bind("elseBranch", parseElse)
  .ignore(OWS.right(Parser.string("elágazás vége")))
  .bindResult(({ head, elseBranch }) => new If(head, [], elseBranch));

// if ... (else if...)* else ...
const parseElseIfStatement: Parser<If> = Parser.do()
  .bind("head", parseIfHead)
  .bind("elIf", parseElseIfBranches)
  .bind("elseBranch", parseElse)
  .ignore(OWS.right(Parser.string("elágazás vége")))
  .bindResult(({ head, elIf, elseBranch }) => new If(head, elIf, elseBranch));

const parseIfStatement = parseElseIfStatement.or(parseIfElse).or(parseIf);

/* Arrays */

const parseArrayAssignment: Parser<ArrayAssignment> = Parser.do()
  .bind("variable", parseVariable)
  .ignore(Parser.string("<-").bracket(OWS, OWS))
  .ignore(Parser.string("Létrehoz"))
  .bind("type", parseType.bracket(Parser.char("["), Parser.char("]")))
  .bind("length", parseExpression.parens())
  .bindResult(({ variable, type, length }) =>
    new ArrayAssignment(variable, type, length)
  );

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
  .bind("type", parseType)
  .bindResult(({ varName, isRef }) => new Parameter(varName, isRef != null));

const parseFuncList = Parser.or(
  OWS.parens().bindResult((_) => []),
  parseParameter.sepBy(Parser.char(",").left(OWS)).parens(),
);

export const parseFunctionDecl: Parser<FunctionDeclaration> = Parser.do()
  .ignore(Parser.string("függvény").left(WS))
  .bind("funcName", parseFuncName.left(OWS))
  .bind("params", parseFuncList.left(WS))
  .bind("body", parseBlock.left(WS))
  .ignore(Parser.string("függvény vége"))
  .bindResult(({ funcName, params, body }) =>
    new FunctionDeclaration(funcName, params, body)
  );

export const parseReturn: Parser<Return> = Parser.string("vissza")
  .left(SPACES)
  .right(parseExpression)
  .bindResult((e) => new Return(e));

export const parseArrayElementAssignment: Parser<ArrayElementAssignment> =
  Parser.do()
    .bind("arrayIndex", parseArrayIndex)
    .ignore(Parser.string("<-").bracket(OWS, OWS))
    .bind("expression", parseExpression)
    .bindResult(({ arrayIndex, expression }) =>
      new ArrayElementAssignment(arrayIndex, expression)
    );
