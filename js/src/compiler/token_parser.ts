import { BaseParser } from "../parser/base_parser.ts";
import { PseudoToken, TokenType, Tokenizer } from "../parser/tokenizer.ts";
import { Atom } from "./pseudo_types.ts";

const matchToken = (type: TokenType) => BaseParser.sat<PseudoToken, string>(t => t.type == type, "EOF!", "");

const WS = matchToken(TokenType.WHITESPACE);

const parseNumber = matchToken(TokenType.NUMBER).bindResult(token => new Atom(Number(token.lexeme)))