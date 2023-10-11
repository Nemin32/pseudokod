import { IToken, ITokenizer, TokenType as TT } from "../interfaces/ITokenizer.ts";

const kwToType: ReadonlyMap<string, TT> = new Map([
	/* Keywords */
	["akkor", TT.AKKOR],
	["amíg", TT.AMIG],
	["ciklus", TT.CIKLUS],
	["címszerint", TT.CIMSZERINT],
	["debug", TT.DEBUG],
	["elágazás", TT.ELAGAZAS],
	["függvény", TT.FUGGVENY],
	["eljárás", TT.FUGGVENY],
	["ha", TT.HA],
	["kiír", TT.KIIR],
	["különben", TT.KULONBEN],

	["tömb", TT.TOMB],
	["halmaz", TT.TOMB],
	["tábla", TT.TOMB],

	["vissza", TT.VISSZA],
	["vége", TT.VEGE],
	["Létrehoz", TT.LETREHOZ],
	["TáblaLétrehoz", TT.TABLALETREHOZ],
	["rendezett", TT.RENDEZETT],

	/* Misc. */
	["~", TT.NEGAL],
	["(", TT.OPAREN],
	[")", TT.CPAREN],
	["[", TT.OBRACKET],
	["]", TT.CBRACKET],
	[":", TT.COLON],
	[",", TT.COMMA],
	["&", TT.REFERENCE],

	["<-", TT.NYIL],
	["<->", TT.SWAP],
	["-tól", TT.FORSTART],
	["-től", TT.FORSTART],
	["-ig", TT.FOREND],
	["//", TT.COMMENT],
]);

type State = {
	text: string,
	index: number,

	column: number,
	row: number
}

type Capture<T> = {
	success: true,
	state: State,
	capture: T
}

type Fail = {
	success: false
}

type Match<T> = Capture<T> | Fail

function eatWhile(input: State, fn: (char: string) => boolean): string {
	let index = input.index;
	let output = "";

	while (index < input.text.length && fn(input.text[index])) {
		output += input.text[index++]
	}

	return output;
}

function eat(input: State): Match<string> {
	if (input.index + 1 >= input.text.length) return fail();

	return {
		success: true,
		capture: input.text[input.index + 1],
		state: mkState(input, 1)
	}
}

function mkState(input: State, step: number): State {
	return {
		text: input.text,
		index: input.index + step,
		column: input.column + step,
		row: input.row
	}
}

function fail(): Fail {
	return { success: false }
}

function mkToken(input: State, type: TT, lexeme: string): IToken {
	return {
		type,
		lexeme,
		length: lexeme.length,
		position: { column: input.column, row: input.row }
	}
}

function mkCapture(input: State, type: TT, lexeme: string): Capture<IToken> {
	return {
		success: true,
		state: mkState(input, lexeme.length),
		capture: mkToken(input, type, lexeme)
	}
}

function wrap(input: string): State {
	return {
		text: input,
		index: 0,
		column: 0,
		row: 0
	}
}

type Tok = (input: State) => Match<IToken>;

function isWhitespace(char: string): boolean {
	return [" ", "\t", "\n"].includes(char);
}

function isNum(char: string): boolean {
	return char >= "0" && char <= "9";
}

function isLetter(char: string): boolean {
	return char.toLowerCase() !== char.toUpperCase();
}

// Atoms
function number(input: State): Match<IToken> {
	const numStr = eatWhile(input, isNum);
	if (numStr.length === 0) fail()
	return mkCapture(input, TT.NUMBER, numStr);
}

function string(input: State): Match<IToken> {
	//const peekquals = (n: number, c: string) => (input.index + n <= input.text.length && input.text[input.index + n] === c);

	const first = eat(input)
	if (!first.success || first.capture !== '"') return fail()
	const str = eatWhile(first.state, c => c !== '"')
	const second = eat(mkState(first.state, str.length))
	if (!second.success || second.capture !== '"') return fail()

}

function newLine(input: State): Match<IToken> {
	const nls = eatWhile(input, c => c === "\n");
	if (nls.length === 0) fail()

	const state = mkState(input, nls.length)
	state.column = 0;
	state.row += nls.length;

	return {
		success: true,
		state,
		token: mkToken(input, TT.WHITESPACE, nls)
	};
}

function parse(input: State, p: Tok[]): Match {
	const parsers = p.map(par => par(input)).filter(p => p.state === "success")
	if (parsers.length === 0) return { state: "fail" }

	return parsers.reduce((max, curr) => ((max as State).index > (curr as State).index) ? max : curr)
}

console.log(parse(wrap("\n500"), [number, newLine]))
