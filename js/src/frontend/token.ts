import { IToken, TokenType as TT } from "../interfaces/ITokenizer.ts"
import { Tokenizer } from "../parser/tokenizer.ts"

const tokenTypeToClass = (tt: TT): string => {
	switch (tt) {
		case TT.AKKOR:
		case TT.AMIG:
		case TT.CIKLUS:
		case TT.ELAGAZAS:
		case TT.FUGGVENY:
		case TT.HA:
		case TT.KULONBEN:
		case TT.LETREHOZ:
		case TT.TABLALETREHOZ:
		case TT.VEGE:
			return "keyword";

		case TT.KIIR:
		case TT.VISSZA:
			return "statement";

		case TT.DEBUG:
			return "debug";

		case TT.CIMSZERINT:
		case TT.RENDEZETT:
		case TT.TOMB:
		case TT.TYPE:
			return "type";

		case TT.NEGAL:
		case TT.OPAREN:
		case TT.CPAREN:
		case TT.OBRACKET:
		case TT.CBRACKET:
		case TT.COLON:
		case TT.COMMA:
		case TT.FORSTART:
		case TT.FOREND:
		case TT.NYIL:
		case TT.SWAP:
		case TT.REFERENCE:
			return "nyil";

		case TT.NUMBER:
			return "number";
		case TT.BOOLEAN:
			return "bool";
		case TT.STRING:
			return "string";

		case TT.FUNCNAME:
			return "funcname";

		case TT.COMMENT:
			return "comment";

		case TT.ERROR:
			return "error";

		case TT.SYMBOL:
		case TT.BINOP:
		case TT.WHITESPACE:
			return "normal";
	}
}

const tokenToHTML = (tok: IToken) => {
	const c = document.createElement("span")
	c.innerText = tok.lexeme;
	c.dataset.row = String(tok.position.row);
	c.dataset.column = String(tok.position.column);
	c.classList.add(tokenTypeToClass(tok.type));

	if (tok.lexeme.includes("\n")) c.dataset.isWS = "true";

	return c
}

export const tokenize = (input: string): [HTMLSpanElement[], IToken[]] => {
	const tok = new Tokenizer()
	const tokensRaw = tok.tokenize(input)
	const tokens = tokensRaw.filter(t => !(t.type === TT.WHITESPACE || t.type === TT.COMMENT))

	const spans = tokensRaw.map(tokenToHTML)

	return [spans, tokens]
}
