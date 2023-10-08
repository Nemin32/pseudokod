import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { Tokenizer } from "../src/impl/tokenizer.ts";
import { parseBlock } from "../src/impl/parser/ast_parser.ts";
import { TokenType } from "../src/interfaces/ITokenizer.ts";
import { TT } from "../src/impl/parser/monadic_parser_base.ts";
import { TypeMap, typeCheck } from "../src/impl/typecheck.ts";

type Entry = {
	name: string,
	inputs: string,
	outputs: string,
	code: string[]
}

type Programs = Record<string, Entry[]>

const parseCode = (code: string) => {
	const tokenizer = new Tokenizer()
	const tokens = tokenizer.tokenize(code).filter(t => t.type !== TokenType.WHITESPACE)

	assertEquals(tokenizer.index, code.length, `Tokenizer failed: ${code[tokenizer.index]}`);

	const parse = parseBlock.run(tokens);

	if (parse.type === "error") {
		console.log(tokens.map((t, i) => ({ i, name: t.lexeme, type: TT[t.type] })))
		console.log(parse.cause)
	} else {
		typeCheck(parse.value, new TypeMap([]))
	}

	assertEquals(parse.type, "match");
}

const test = (/*t: Deno.TestContext,*/ input: Entry) => Deno.test(input.name, () => {
	const code = input.code.join("\n")
	parseCode(code);
})

await Deno.readTextFile('../../programs/jegyzet.json').then(data => {
	const json: Programs = JSON.parse(data)

	for (const [chapter, entries] of Object.entries(json)) {
		//Deno.test(`${chapter}. Fejezet`, async (t) => {
		for (const entry of entries) {
			test(entry);
		}
		//})
	}
})
