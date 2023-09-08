import { IAST } from "../../../interfaces/IParser.ts";
import { IToken } from "../../../interfaces/ITokenizer.ts";
import { Expression } from "../../../interfaces/astkinds.ts";
import { Parser, mkToken, P } from "../hParser.ts";
import { parseArrayIndex } from "./array_index.ts";
import { parseAtom } from "./atom.ts";
import parseExpression from "./expression.ts";
import { parseFuncCall } from "./function_call.ts";
import { parseVariable } from "./variable.ts";

const addOp = Parser.sat((tok) => ["+", "-"].includes(tok.lexeme));
const mulOp = Parser.sat((tok) => ["*", "/", "mod"].includes(tok.lexeme));
const compOp = Parser.sat((tok) => [">", "<", "=", "<=", ">=", "=/="].includes(tok.lexeme));
const logicOp = Parser.sat((tok) => ["és", "vagy"].includes(tok.lexeme));

const toBinopOrExpr = (
  value: IAST<Expression> | { left: IAST<Expression>; op: IToken; right: IAST<Expression> },
) => {
  if ("op" in value) {
    return mkToken(value.op, {
      tag: "binop",
      lhs: value.left,
      rhs: value.right,
      op: value.op,
    });
  } else {
    return value;
  }
};

const primary: P<Expression> = Parser.of(() => parseExpression
  .parens()
  .or(parseFuncCall)
  .or(parseArrayIndex)
  .or(parseVariable)
  .or(parseAtom));

const parseArithmOp: P<Expression> = Parser.chainl1(primary, addOp).map(toBinopOrExpr);
const parseMulOp: P<Expression> = Parser.chainl1(parseArithmOp, mulOp).map(toBinopOrExpr);
const parseCompOp: P<Expression> = Parser.chainl1(parseMulOp, compOp).map(toBinopOrExpr);
export const parseBinOp: P<Expression> = Parser.chainl1(parseCompOp, logicOp).map(toBinopOrExpr)
