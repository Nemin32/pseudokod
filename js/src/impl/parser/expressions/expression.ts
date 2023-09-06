import { Expression } from "../../../interfaces/astkinds.ts";
import { P, Parser } from "../hParser.ts";
import { parseBinOp } from "./binop.ts";
import { parseNot } from "./not.ts";
import { parseReference } from "./reference.ts";

const parseExpression: P<Expression> = Parser.of(() => parseNot.or(parseReference).or(parseBinOp));

export default parseExpression;
