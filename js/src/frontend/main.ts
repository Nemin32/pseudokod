import { IToken } from "../interfaces/ITokenizer.ts"
import { Compiler } from "../compiler/compiler.ts"
import { parseBlock } from "../parser/ast_parser.ts"
import { VM } from "../runtime/vm.ts"
import { generateDump } from "./instruction.ts"
import { formatCode, generateSelect } from "./program_loader.ts"
import { tokenize } from "./token.ts"
import { render } from "./vm_render.ts"

window.addEventListener("load", () => {
	const editor = document.getElementById("code")! as HTMLTextAreaElement
	const byteCode = document.querySelector("#instructions div")! as HTMLDivElement
	const output = document.querySelector("#output")! as HTMLDivElement
	const highlight = document.getElementById("highlight")!
	const algorithms = document.querySelector("#picker div")!

	const compButton = document.getElementById("compile")!
	const runButton = document.getElementById("run")!
	const stepButton = document.getElementById("step")!
	const backButton = document.getElementById("back")!

	const stackDiv = document.querySelector("#stack div")! as HTMLDivElement
	const ipStackDiv = document.querySelector("#ipStack div")! as HTMLDivElement
	const varsDiv = document.querySelector("#variables div")! as HTMLDivElement

	let tokens: IToken[] | null = null;
	let tokenSpans: HTMLSpanElement[] = [];
	let instructionSpans: HTMLSpanElement[] = [];
	let vm: VM | null = null;

	const handleInput = () => {
		// No real idea why it works, but you need to add \n to fix an ugly error with scrolling.
		const [newTokenSpans, newTokens] = tokenize(editor.value + "\n");
		tokens = newTokens;
		tokenSpans = newTokenSpans;

		highlight.replaceChildren(...tokenSpans)
		highlight.scrollTop = editor.scrollTop
		highlight.scrollLeft = editor.scrollLeft
	}

	fetch("./jegyzet.json").then(r => r.json()).then(json => {
		const select = generateSelect(json)

		select.addEventListener("change", () => {
			if (!select.selectedOptions[0]) return;

			const [ch, idx] = select.selectedOptions[0].value.split(",").map(elem => Number(elem))

			editor.value = formatCode(json[ch][idx].code)
			handleInput()
		})

		algorithms.appendChild(select);
	})

	editor.addEventListener("scroll", () => {
		highlight.scrollTop = editor.scrollTop
		highlight.scrollLeft = editor.scrollLeft
	})

	editor.addEventListener("input", handleInput)
	handleInput()

	compButton.addEventListener("click", () => {
		if (!tokens) return;

		const block = parseBlock.run(tokens)

		if (block.type === "match") {
			const comp = new Compiler()
			comp.visit(block.value)
			vm = new VM(comp.code, (prev, current) => {
				const renderResult = render(prev, current)

				stackDiv.replaceChildren(...renderResult.stackSpans)
				ipStackDiv.replaceChildren(...renderResult.ipStackSpans)
				varsDiv.replaceChildren(...renderResult.varsSpans)

				instructionSpans.at(current.idx - 1)?.classList.add("current");
				instructionSpans.at(prev.idx - 1)?.classList.remove("current");

				output.innerText = current.output;
			});

			instructionSpans = generateDump(comp.code, tokenSpans, byteCode);

			byteCode.replaceChildren(...instructionSpans)
			highlight.replaceChildren(...tokenSpans)
		} else {
			throw new Error(block.cause)
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

	backButton.addEventListener("click", () => {
		if (!vm) return;
		vm.stepBack();
	})

})
