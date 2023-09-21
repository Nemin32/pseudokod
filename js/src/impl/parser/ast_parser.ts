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
import { P, Parser, TT, mkToken } from "./monadic_parser_base.ts";

const parseStatement: P<Statement> = Parser.of<Statement>(
  () =>
    Parser.choice<Statement>([
      parseIf,
      parseReturn,
      parseFor,
      parseSwap,
      parseAssignment,
      parseFuncDecl,
      parsePrint,
      parseWhile,
      parseDebug,
    ]),
  //.or(parseExpression), Ha támogatni akarjuk a lógó expressionöket.
);

export const parseExpression: P<Expression> = Parser.of(() =>
  Parser.choice([/*parseNot, parseReference,*/ parseBinOp, parseComprehension, parseNewArray]),
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
  .bind("index", parseExpression.brackets())
  .result(({ variable, index }) => mkToken(variable.token, "arrindex", { variable, index }));

const parseNewArray: P<NewArray> = Parser.do()
  .bindT("token", TT.LETREHOZ)
  .bind("type", Parser.matchT(TT.TYPE).parens())
  .bind("length", parseExpression.brackets())
  .result(({ token, type, length }) => mkToken(token, "arrnew", { length, type: type.lexeme }));

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
  .bind("args", parseExpression.sepBy(Parser.matchT(TT.COMMA)).parens())
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

const parseArithmOp: P<Expression> = Parser.chainl1(primary, addOp).map(toBinopOrExpr);
const parseMulOp: P<Expression> = Parser.chainl1(parseArithmOp, mulOp).map(toBinopOrExpr);
const parseCompOp: P<Expression> = Parser.chainl1(parseMulOp, compOp).map(toBinopOrExpr);
export const parseBinOp: P<Expression> = Parser.chainl1(parseCompOp, logicOp).map(toBinopOrExpr);

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

const parseParameter: P<Parameter> = Parser.do()
  .bind("byRef", parseByRef)
  .bind("name", parseVariable.or(Parser.matchT(TT.FUNCNAME)))
  .ignoreT(TT.COLON)
  .bindT("type", TT.TYPE)
  .bind("isArr", Parser.matchT(TT.TOMB).maybe()) // TODO
  .result(({ byRef, name, type }) =>
    mkToken("token" in name ? name.token : name, "param", {
      byRef,
      name: "token" in name ? name : name.lexeme,
      type: type.lexeme,
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
