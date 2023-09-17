import { IAST } from "../../interfaces/IParser.ts";
import { IToken } from "../../interfaces/ITokenizer.ts";
import {
  ArrayComprehension,
  ArrayIndex,
  Assignment,
  Atom,
  BinOpTypeMap,
  Block,
  Debug,
  Expression,
  For,
  FunctionCall,
  FunctionDeclaration,
  If,
  NewArray,
  Not,
  Parameter,
  Print,
  Reference,
  Return,
  Statement,
  Variable,
  While,
} from "../../interfaces/astkinds.ts";
import { P, Parser, TT, mkToken } from "./monadic_parser_base.ts";

const parseStatement: P<Statement> = Parser.of<IAST<Statement>>(
  () =>
    parseIf
      .or(parseReturn)
      .or(parseFor)
      .or(parseAssignment)
      .or(parseFuncDecl)
      .or(parsePrint)
      .or(parseWhile)
      .or(parseDebug),
  //.or(parseExpression), Ha támogatni akarjuk a lógó expressionöket.
);

const parseExpression: P<Expression> = Parser.of(() => parseNot.or(parseReference).or(parseComprehension).or(parseNewArray).or(parseBinOp));

export const parseBlock: P<Block> = parseStatement
  .many1()
  .map((stmts) => mkToken(null, { tag: "block", statements: stmts }));

const parseVariable: P<Variable> = Parser.matchT(TT.SYMBOL).map((token) =>
  mkToken(token, {
    tag: "variable",
    name: token.lexeme,
  }),
);

const parseComprehension: P<ArrayComprehension> = parseExpression
  .sepBy(Parser.matchT(TT.COMMA))
  .parens()
  .map((exprs) => mkToken(null, { tag: "arrcomp", expressions: exprs }));

const parseArrayIndex: P<ArrayIndex> = Parser.do()
  .bind("variable", parseVariable)
  .bind("index", parseExpression.brackets())
  .result(({ variable, index }) => mkToken(variable.token, { tag: "arrindex", variable, index }));

const parseNewArray: P<NewArray> = Parser.do()
  .bindT("token", TT.LETREHOZ)
  .bind("type", Parser.matchT(TT.TYPE).brackets())
  .bind("length", parseExpression.parens())
  .result(({ token, type, length }) =>
    mkToken(token, { tag: "arrnew", length, type: type.lexeme }),
  );

//#region Atom

const number: P<Atom> = Parser.matchT(TT.NUMBER).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: Number(token.lexeme),
  }),
);

const boolean: P<Atom> = Parser.matchT(TT.BOOLEAN).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: ["Igaz", "igaz"].includes(token.lexeme),
  }),
);

const string: P<Atom> = Parser.matchT(TT.STRING).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: token.lexeme,
  }),
);

const parseAtom = number.or(boolean).or(string);

//#endregion

//#region BinOp

const addOp = Parser.sat((tok) => ["+", "-"].includes(tok.lexeme));
const mulOp = Parser.sat((tok) => ["*", "/", "mod"].includes(tok.lexeme));
const compOp = Parser.sat((tok) => [">", "<", "=", "<=", ">=", "=/="].includes(tok.lexeme));
const logicOp = Parser.sat((tok) => ["és", "vagy"].includes(tok.lexeme));

const toBinopOrExpr = (
  value: IAST<Expression> | { left: IAST<Expression>; op: IToken; right: IAST<Expression> },
) => {
  if ("op" in value) {
    const binop = BinOpTypeMap.get(value.op.lexeme);
    if (binop === undefined) throw new Error(`Unknown binop: "${value.op.lexeme}".`)

    return mkToken(value.op, {
      tag: "binop",
      lhs: value.left,
      rhs: value.right,
      op: binop
    });
  } else {
    return value;
  }
};

const parseFuncCall: P<FunctionCall> = Parser.do()
  .bindT("name", TT.FUNCNAME)
  .bind("args", parseExpression.sepBy(Parser.matchT(TT.COMMA)).parens())
  .result(({ name, args }) =>
    mkToken(name, { tag: "funccall", name: name.lexeme, arguments: args }),
  );

const primary: P<Expression> = parseExpression
  .parens()
  .or(parseFuncCall)
  .or(parseArrayIndex)
  .or(parseVariable)
  .or(parseAtom);

const parseArithmOp: P<Expression> = Parser.chainl1(primary, addOp).map(toBinopOrExpr);
const parseMulOp: P<Expression> = Parser.chainl1(parseArithmOp, mulOp).map(toBinopOrExpr);
const parseCompOp: P<Expression> = Parser.chainl1(parseMulOp, compOp).map(toBinopOrExpr);
const parseBinOp: P<Expression> = Parser.chainl1(parseCompOp, logicOp).map(toBinopOrExpr);

//#endregion

const parseNot: P<Not> = Parser.matchT(TT.NEGAL).bind((token) =>
  parseExpression.map((expr) => mkToken(token, { tag: "not", expr })),
);

const parseReference: P<Reference> = Parser.matchT(TT.REFERENCE).bind((token) =>
  parseArrayIndex
    .or(parseVariable)
    .map((expr) => mkToken(token, { tag: "reference", inner: expr })),
);

const parseAssignment: P<Assignment> = Parser.do()
  .bind("variable", parseArrayIndex.or(parseVariable))
  .bindT("nyil", TT.NYIL)
  .bind("value", parseExpression)
  .result(({ variable, nyil, value }) =>
    mkToken(nyil, {
      tag: "assign",
      variable,
      value,
    }),
  );

const parseDebug: P<Debug> = Parser.matchT(TT.DEBUG).map((token) =>
  mkToken(token, { tag: "debug" }),
);

const parseFor: P<For> = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("variable", parseVariable)
  .ignoreT(TT.NYIL)
  .bind("from", parseExpression)
  .ignoreT(TT.FORSTART)
  .bind("to", parseExpression)
  .ignoreT(TT.FOREND)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .result(({ token, variable, from, to, body }) =>
    mkToken(token, {
      tag: "for",
      from,
      to,
      body,
      variable,
    }),
  );

//#region Function Declaration

const parseByRef = Parser.matchT(TT.CIMSZERINT)
  .map((_) => true)
  .or(Parser.result(false));

const parseParameter: P<Parameter> = Parser.do()
  .bind("byRef", parseByRef)
  .bind("name", parseVariable)
  .ignoreT(TT.COLON)
  .bindT("type", TT.TYPE)
  .result(({ byRef, name, type }) =>
    mkToken(name.token, { tag: "param", byRef, name, type: type.lexeme }),
  );

const parseFuncDecl: P<FunctionDeclaration> = Parser.do()
  .bindT("token", TT.FUGGVENY)
  .bindT("name", TT.FUNCNAME)
  .bind("parameters", parseParameter.sepBy(Parser.matchT(TT.COMMA)).parens())
  .bind("body", parseBlock)
  .ignoreT(TT.FUGGVENY)
  .ignoreT(TT.VEGE)
  .result(({ token, body, name, parameters }) =>
    mkToken(token, { tag: "funcdecl", body, name: name.lexeme, parameters }),
  );

//#endregion

//#region If

const parseIfHead = Parser.do()
  .bindT("token", TT.HA)
  .bind("pred", parseExpression)
  .ignoreT(TT.AKKOR)
  .bind("branch", parseBlock)
  .finalize({});

const parseElse = Parser.matchT(TT.KULONBEN).right(parseBlock);

const parseElIf = Parser.matchT(TT.KULONBEN).right(parseIfHead);

const parseIf: P<If> = Parser.do()
  .bind("main_path", parseIfHead)
  .bind("elif_path", parseElIf.many())
  .bind("false_path", parseElse.maybe())
  .ignoreT(TT.ELAGAZAS)
  .ignoreT(TT.VEGE)
  .result(({ main_path, elif_path, false_path }) =>
    mkToken(main_path.token, { tag: "if", main_path, elif_path, false_path }),
  );

//#endregion

const parsePrint: P<Print> = Parser.matchT(TT.KIIR).bind((token) =>
  parseExpression.map((value) => mkToken(token, { tag: "print", expr: value })),
);

const parseReturn: P<Return> = Parser.matchT(TT.VISSZA).bind((token) =>
  parseExpression.map((value) => mkToken(token, { tag: "return", expr: value })),
);

//#region While

const parseNormalWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .finalize({ postPred: false });

const parseDoWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("body", parseBlock)
  .ignoreT(TT.AMIG)
  .bind("pred", parseExpression)
  .finalize({ postPred: true });

const parseWhile: P<While> = parseDoWhile.or(parseNormalWhile).map((value) =>
  mkToken(value.token, {
    tag: "while",
    body: value.body,
    postPred: value.postPred,
    predicate: value.pred,
  }),
);

//#endregion