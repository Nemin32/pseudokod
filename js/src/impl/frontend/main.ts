import { OpCode } from "../../interfaces/ICompiler.ts"
import { IToken, TokenType as TT } from "../../interfaces/ITokenizer.ts"
import { BinOpType } from "../../interfaces/astkinds.ts"
import { Inst } from "../../interfaces/instructions.ts"
import { Compiler } from "../compiler/compiler.ts"
import { parseBlock } from "../parser/ast_parser.ts"
import { Tokenizer } from "../parser/tokenizer.ts"
import { VM } from "../runtime/vm.ts"

const tokenTypeToClass = (tt: TT): string => {
	if ([TT.HA, TT.AKKOR, TT.FUGGVENY, TT.VEGE, TT.ELAGAZAS, TT.CIKLUS, TT.AMIG].includes(tt)) return "keyword";
	if ([TT.NYIL, TT.SWAP].includes(tt)) return "nyil";
	if ([TT.OPAREN, TT.CPAREN, TT.OBRACKET, TT.CBRACKET, TT.COLON].includes(tt)) return "parens";

	if (TT.FUNCNAME === tt) return "funcname";
	if ([TT.KIIR, TT.VISSZA].includes(tt)) return "print";

	if (TT.BINOP === tt) return "binop";
	if (TT.TYPE === tt) return "type";

	if (TT.NUMBER === tt) return "number";
	if (TT.STRING === tt) return "string";
	if (TT.BOOLEAN === tt) return "bool";

	return "normal";
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

const tokenize = (input: string): [HTMLSpanElement[], IToken[]] => {
	const tok = new Tokenizer()
	const tokensRaw = tok.tokenize(input)
	const tokens = tokensRaw.filter(t => t.type !== TT.WHITESPACE)

	const spans = tokensRaw.map(tokenToHTML)

	return [spans, tokens]
}


const setActive = (span: HTMLSpanElement, bc: Inst, tokenSpans: HTMLSpanElement[], codeRoot: HTMLDivElement) => {
	const prev = codeRoot.querySelectorAll("span.active")
	prev.forEach(p => p.classList.remove("active"));

	tokenSpans.filter(s => (s.dataset.isWS !== "true") && Number(s.dataset.row) === bc.origin.token?.position.row).forEach(s => s.classList.add("active"));
	span.classList.add("active");
}

const setInactive = (span: HTMLSpanElement, bc: Inst, tokenSpans: HTMLSpanElement[]) => {
	tokenSpans.filter(s => Number(s.dataset.row) === bc.origin.token?.position.row).forEach(s => s.classList.remove("active"));
	span.classList.remove("active");
}

const bcToHTML = (bc: Inst, idx: number, indent: number, tokenSpans: HTMLSpanElement[], codeRoot: HTMLDivElement) => {
	const c = document.createElement("span")
	const args = document.createElement("pre")

	if (bc.code === OpCode.BINOP) {
		args.innerText = bc.origin.token!.lexeme
	} else {
		args.innerText = Object.values(bc).slice(1, -1).join(", ")
	}

	const lineCount = document.createElement("pre")
	lineCount.innerText = String(idx).padStart(4, " ")

	const code = document.createElement("pre")
	code.innerText = `${" ".repeat(indent)}${OpCode[bc.code]}`

	//c.dataset.row = String(bc.origin.token?.position.row ?? 0)
	//c.dataset.column = String(bc.origin.token?.position.column ?? 0)
	c.addEventListener("mouseover", () => setActive(c, bc, tokenSpans, codeRoot))
	c.addEventListener("mouseout", () => setInactive(c, bc, tokenSpans))
	c.replaceChildren(lineCount, code, args)

	return c
}

const generateDump = (code: Inst[], tokenSpans: HTMLSpanElement[], codeRoot: HTMLDivElement) => {
	return code.reduce<{ lst: HTMLSpanElement[], indent: number }>((state, inst, idx) => {
		let indent = state.indent;

		if (inst.code === OpCode.LSCOPE) indent -= 1;
		const pre = bcToHTML(inst, idx, indent, tokenSpans, codeRoot)
		if (inst.code === OpCode.ESCOPE) indent += 1;

		return { lst: state.lst.concat(pre), indent }
	}, { lst: [], indent: 0 }).lst
}

window.addEventListener("load", () => {
	const editor = document.getElementById("code")! as HTMLTextAreaElement
	const byteCode = document.querySelector("#instructions div")! as HTMLDivElement
	const compButton = document.getElementById("compile")!
	const runButton = document.getElementById("run")!
	const stepButton = document.getElementById("step")!
	const highlight = document.getElementById("highlight")!

	const stackDiv = document.querySelector("#stack div")! as HTMLDivElement

	let tokens: IToken[] | null = null;
	let tokenSpans: HTMLSpanElement[] = [];
	let pres: HTMLSpanElement[] = [];
	//let code: Inst[] = []

	let vm: VM | null = null;

	const handleInput = () => {
		const [newTokenSpans, newTokens] = tokenize(editor.value);
		tokens = newTokens;
		tokenSpans = newTokenSpans;

		highlight.replaceChildren(...tokenSpans)
	}

	editor.addEventListener("input", handleInput)
	handleInput()

	compButton.addEventListener("click", () => {
		if (!tokens) return;

		const block = parseBlock.run(tokens)

		if (block.type === "match") {
			const comp = new Compiler()
			comp.visit(block.value)
			vm = new VM(comp.code, (prev, current) => {
				const stack = compare(prev.stack, current.stack, (a, b) => a === b)
				const ipStack = compare(prev.ipStack, current.ipStack, (a, b) => a === b)
				const bindings = compare(prev.vars.bindings, current.vars.bindings, (a, b) => a.name === b.name && a.pointer === b.pointer)

				stackDiv.replaceChildren(...stack.map(s => {
					const span = document.createElement("span");
					span.classList.add(Comparison[s.state].toLowerCase());
					span.innerText = String(s.value)
					return span
				}))

				pres.at(current.idx)?.classList.add("current");
				pres.at(prev.idx)?.classList.remove("current");

			});

			pres = generateDump(comp.code, tokenSpans, byteCode);

			byteCode.replaceChildren(...pres)
			highlight.replaceChildren(...tokenSpans)
		}
	})

	runButton.addEventListener("click", () => {
		if (!vm) return;

		vm.run();
	})

	stepButton.addEventListener("click", () => {
		if (!vm) return;

		vm.step();
	})

})

enum Comparison {
	SAME,
	CHANGED,
	DELETED,
	NEW
}

const compare = <T>(oldArr: T[], newArr: T[], compFn: (a: T, b: T) => boolean): Array<{ state: Comparison, value: T }> => {
	const vals = oldArr.map((o, idx) => {
		const newVal = newArr.at(idx)
		if (!newVal) return ({ state: Comparison.DELETED, value: o })
		return ({ state: compFn(o, newVal) ? Comparison.SAME : Comparison.CHANGED, value: newVal })
	})

	const newVals = newArr.slice(oldArr.length).map(v => ({ state: Comparison.NEW, value: v }))

	return vals.concat(newVals)
}

console.log(compare([1, 2, 3], [1, 2], (a, b) => a === b))
