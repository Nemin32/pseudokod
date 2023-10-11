import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { Tokenizer } from "../src/impl/tokenizer.ts";
import { parseAssignment, parseBinOp, parseBlock, parseFuncDecl, parseWhile } from "../src/impl/parser/ast_parser.ts";
import { TokenType } from "../src/interfaces/ITokenizer.ts";
import { TT } from "../src/impl/parser/monadic_parser_base.ts";
import { TypeMap } from "../src/impl/typemap.ts";
import { t } from "../src/impl/parser/test.ts";
import { vars } from "../src/impl/std.ts";
import { typeCheck } from "../src/impl/typecheck.ts";

type Entry = {
	name: string,
	inputs: string,
	outputs: string,
	code: string[]
	skip?: boolean
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
		typeCheck(parse.value, new TypeMap(vars, []))
	}

	assertEquals(parse.type, "match");
}

const test = (/*t: Deno.TestContext,*/ input: Entry) => Deno.test(input.name, () => {
	if (input?.skip) return;

	const code = input.code.join("\n")
	parseCode(code);
})

await Deno.readTextFile('../../programs/jegyzet.json').then(data => {
	const json: Programs = JSON.parse(data)

	Deno.test("Sanity", () => {
		let tokens = t([
			"függvény BejárásiÚtKiolvas(f : egész tömb, m : egész, n : egész)",
			"p <- Létrehoz(egész)[m + n - 1]",
			"i <- m",
			"j <- n",
			"k <- m + n - 1",
			/*"ciklus amíg (i >= 2) és (j >= 2)",
			"p[k] <- (i, j)",
			"k <- k - 1",
			"ha f[i - 1, j] > f[i, j - 1] akkor",
			"i <- i - 1",
			"különben",
			"j <- j - 1",
			"elágazás vége",
			"ciklus vége",*/
			/*"ciklus amíg i >= 2",
			"p[k] <- (i, j)",
			"k <- k - 1",
			"i <- i - 1",
			"ciklus vége",*/
			/*"ciklus amíg j >= 2",
			"p[k] <- (i, j)",
			"k <- k - 1",
			"j <- j - 1",
			"ciklus vége",*/
			//"p[1] <- (1, 1)",
			//"vissza p",
			"függvény vége"
		].join("\n"))

		let parse = parseBlock.run(tokens)

		if (parse.type === "error") {
			console.log(tokens.map((t, i) => ([i, t.lexeme, TT[t.type]])))
			console.log(parse.cause)
		} else {
			console.log(parse.value)
		}
		assertEquals(parse.type, "match");
	})

	for (const [chapter, entries] of Object.entries(json)) {
		//Deno.test(`${chapter}. Fejezet`, async (t) => {
		for (const entry of entries) {
			test(entry);
		}
		//})
	}
})
