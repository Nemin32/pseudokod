import { ArithmeticBinOp } from "../../compiler/pseudo_types.ts";
import { IToken } from "../../interfaces/ITokenizer.ts";
import {
  ArrayComprehension,
  ArrayIndex,
  Assignment,
  Atom,
  BinOpTypeMap,
  BinaryOperation,
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
  Swap,
  Variable,
  While,
} from "../../interfaces/astkinds.ts";
import { Chain, P, Parser, TT, mkToken } from "./monadic_parser_base.ts";

const parseStatement: P<Statement> = Parser.of<Statement>(
  () => {
    const statementMap: ReadonlyMap<TT, Parser<Statement>> = new Map([
      [TT.HA, parseIf as Parser<Statement>],
      [TT.VISSZA, parseReturn],
      [TT.CIKLUS, parseFor.or(parseWhile)],
      [TT.SYMBOL, parseAssignment.or(parseSwap)],
      [TT.FUGGVENY, parseFuncDecl],
      [TT.KIIR, parsePrint],
      [TT.DEBUG, parseDebug],
      [TT.FUNCNAME, parseFuncCall],
    ]);

    return Parser.peek()
      .map((t) => t.type)
      .mapChoice(statementMap);
  },
  //.or(parseExpression), Ha támogatni akarjuk a lógó expressionöket.
);

export const parseExpression: P<Expression> = Parser.of(() =>
  Parser.choice([parseBinOp, parseComprehension, parseNewArray]),
);

export const parseBlock: P<Block> = parseStatement
  .many1()
  .map((stmts) => mkToken(null, "block", { statements: stmts }));

const parseVariable: P<Variable> = Parser.matchT(TT.SYMBOL).map((token) =>
  mkToken(token, "variable", { name: token.lexeme }),
);

const parseComprehension: P<ArrayComprehension> = parseExpression
  .sepBy(Parser.matchT(TT.COMMA))
  .parens()
  .map((exprs) => mkToken(null, "arrcomp", { expressions: exprs }));

const parseArrayIndex: P<ArrayIndex> = Parser.do()
  .bind("variable", parseVariable)
  .bind("index", parseExpression.sepBy1(Parser.matchT(TT.COMMA)).brackets())
  .result(({ variable, index }) => mkToken(variable.token, "arrindex", { variable, index }));

// New Array

const parseNewMultiDimArray: P<NewArray> = Parser.do()
  .bindT("token", TT.TABLALETREHOZ)
  .bind("type", Parser.matchT(TT.TYPE).parens())
  .bind("dimensions", parseExpression.sepBy1(Parser.matchT(TT.COMMA)).brackets())
  .result(({ token, type, dimensions }) =>
    mkToken(token, "arrnew", { dimensions, type: type.lexeme }),
  );

const parseNewSingleDimArray: P<NewArray> = Parser.do()
  .bindT("token", TT.LETREHOZ)
  .bind("type", Parser.matchT(TT.TYPE).parens())
  .bind("length", parseExpression.brackets())
  .result(({ token, type, length }) =>
    mkToken(token, "arrnew", { dimensions: [length], type: type.lexeme }),
  );

const parseNewArray = parseNewSingleDimArray.or(parseNewMultiDimArray);

const parseSwap: P<Swap> = Parser.do()
  .bind("var1", parseArrayIndex.or(parseVariable))
  .bindT("token", TT.SWAP)
  .bind("var2", parseArrayIndex.or(parseVariable))
  .result(({ var1, token, var2 }) => mkToken(token, "swap", { var1, var2 }));

//#region Atom

const number: P<Atom> = Parser.matchT(TT.NUMBER).map((token) =>
  mkToken(token, "atom", { value: Number(token.lexeme) }),
);

const boolean: P<Atom> = Parser.matchT(TT.BOOLEAN).map((token) =>
  mkToken(token, "atom", { value: ["Igaz", "igaz"].includes(token.lexeme) }),
);

const string: P<Atom> = Parser.matchT(TT.STRING).map((token) =>
  mkToken(token, "atom", { value: token.lexeme }),
);

const parseAtom = Parser.choice([number, boolean, string]);

//#endregion

const parseNot: P<Not> = Parser.matchT(TT.NEGAL).bind((token) =>
  parseExpression.map((expr) => mkToken(token, "not", { expr })),
);

const parseReference: P<Reference> = Parser.matchT(TT.REFERENCE).bind((token) =>
  parseArrayIndex.or(parseVariable).map((inner) => mkToken(token, "reference", { inner })),
);

//#region BinOp

const addOp = Parser.sat((tok) => ["+", "-"].includes(tok.lexeme));
const mulOp = Parser.sat((tok) => ["*", "/", "mod"].includes(tok.lexeme));
const compOp = Parser.sat((tok) => [">", "<", "=", "<=", ">=", "=/="].includes(tok.lexeme));
const logicOp = Parser.sat((tok) => ["és", "vagy"].includes(tok.lexeme));

const toBinopOrExpr = (
  value: Expression | { left: Expression; op: IToken; right: Expression },
): Expression => {
  if ("left" in value) {
    const binop = BinOpTypeMap.get(value.op.lexeme);
    if (binop === undefined) throw new Error(`Unknown binop: "${value.op.lexeme}".`);

    return mkToken<BinaryOperation>(value.op, "binop", {
      lhs: value.left,
      rhs: value.right,
      op: binop,
    });
  } else {
    return value;
  }
};

const parseFuncCall: P<FunctionCall> = Parser.do()
  .bindT("name", TT.FUNCNAME)
  .bind("args", parseExpression.or(Parser.matchT(TT.FUNCNAME)).sepBy(Parser.matchT(TT.COMMA)).parens())
  .result(({ name, args }) => mkToken(name, "funccall", { name: name.lexeme, arguments: args }));

const primary: P<Expression> = Parser.choice([
  parseExpression.parens(),
  parseNot,
  parseReference,
  parseFuncCall,
  parseArrayIndex,
  parseVariable,
  parseAtom,
]);

const chainToExpr = (chain: Expression | Chain<Expression, IToken, Expression>): Expression => {
  // Ez egy expression, térjünk vissza vele ahogy van.
  if (!("left" in chain)) {
    return chain;
  }

  const binop = BinOpTypeMap.get(chain.op.lexeme);
  if (binop === undefined) throw new Error(`Unknown binop: "${chain.op.lexeme}".`);

  return mkToken<BinaryOperation>(chain.op, "binop", {
    lhs: "left" in chain.left ? chainToExpr(chain.left) : chain.left,
    op: binop,
    rhs: chain.right,
  });
};

const parseArithmOp: P<Expression> = Parser.chain(primary, addOp).map(chainToExpr);
const parseMulOp: P<Expression> = Parser.chain(parseArithmOp, mulOp).map(chainToExpr);
const parseCompOp: P<Expression> = Parser.chain(parseMulOp, compOp).map(chainToExpr);
export const parseBinOp: P<Expression> = Parser.chain(parseCompOp, logicOp).map(chainToExpr);

//#endregion

const parseAssignment: P<Assignment> = Parser.do()
  .bind("variable", parseArrayIndex.or(parseVariable))
  .bindT("nyil", TT.NYIL)
  .bind("value", parseExpression)
  .result(({ variable, nyil, value }) =>
    mkToken(nyil, "assign", {
      variable,
      value,
    }),
  );

const parseDebug: P<Debug> = Parser.matchT(TT.DEBUG).map((token) => mkToken(token, "debug", {}));

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
    mkToken(token, "for", {
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

const parseParamType = Parser.do()
  .bindT("type", TT.TYPE)
  .maybeT("isSorted", TT.RENDEZETT)
  .maybeT("isArray", TT.TOMB)
  .finalize({});

const parseParameter: P<Parameter> = Parser.do()
  .bind("byRef", parseByRef)
  .bind("name", parseVariable.or(Parser.matchT(TT.FUNCNAME)))
  .ignoreT(TT.COLON)
  .bind("type", parseParamType)
  .result(({ byRef, name, type }) =>
    mkToken("token" in name ? name.token : name, "param", {
      byRef,
      name: "token" in name ? name : name.lexeme,
      type: type.type.lexeme,
    }),
  );

const parseFuncDecl: P<FunctionDeclaration> = Parser.do()
  .bindT("token", TT.FUGGVENY)
  .bindT("name", TT.FUNCNAME)
  .bind("parameters", parseParameter.sepBy(Parser.matchT(TT.COMMA)).parens())
  .bind("body", parseBlock)
  .ignoreT(TT.FUGGVENY)
  .ignoreT(TT.VEGE)
  .result(({ token, body, name, parameters }) =>
    mkToken(token, "funcdecl", { body, name: name.lexeme, parameters }),
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
    mkToken(main_path.token, "if", { main_path, elif_path, false_path }),
  );

//#endregion

const parsePrint: P<Print> = Parser.matchT(TT.KIIR).bind((token) =>
  parseExpression.map((expr) => mkToken(token, "print", { expr })),
);

const parseReturn: P<Return> = Parser.matchT(TT.VISSZA).bind((token) =>
  parseExpression.map((expr) => mkToken(token, "return", { expr })),
);

//#region While

const parseNormalWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .ignoreT(TT.AMIG)
  .bind("predicate", parseExpression)
  .bind("body", parseBlock)
  .ignoreT(TT.CIKLUS)
  .ignoreT(TT.VEGE)
  .finalize({ postPred: false });

const parseDoWhile = Parser.do()
  .bindT("token", TT.CIKLUS)
  .bind("body", parseBlock)
  .ignoreT(TT.AMIG)
  .bind("predicate", parseExpression)
  .finalize({ postPred: true });

const parseWhile: P<While> = parseDoWhile
  .or(parseNormalWhile)
  .map((value) => mkToken(value.token, "while", value));

//#endregion
