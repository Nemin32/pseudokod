import { IToken } from "../interfaces/ITokenizer.ts"
import { Compiler } from "../compiler/compiler.ts"
import { parseBlock } from "../parser/ast_parser.ts"
import { State, VM, VMError } from "../runtime/vm.ts"
import { generateDump } from "./instruction.ts"
import { formatCode, generateSelect } from "./program_loader.ts"
import { tokenize } from "./token.ts"
import { render } from "./vm_render.ts"
import { TypeCheckError, typeCheck } from "../compiler/typecheck.ts"
import { TypeMap } from "../compiler/typemap.ts"
import { ParsingError } from "../parser/monadic_parser_base.ts"
import { VariableError } from "../runtime/variables.ts"

window.addEventListener("load", () => {
	const editor = document.getElementById("code")! as HTMLTextAreaElement
	const byteCode = document.querySelector("#instructions div")! as HTMLDivElement
	const output = document.querySelector("#output")! as HTMLDivElement
	const highlight = document.getElementById("highlight")!
	const algorithms = document.querySelector("#picker div")!

	const error = document.getElementById("error")! as HTMLDivElement
	const errorType = document.querySelector("#errorType")! as HTMLParagraphElement
	const errorMsg = document.querySelector("#errorMsg")! as HTMLParagraphElement

	const formatButton = document.getElementById("format")!
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

	const formatEditor = () => {
		editor.value = formatCode(editor.value.split("\n").filter(l => l.trim().length > 0))
		handleInput()
	}

	const comparisonFunc = (prev: State, current: State) => {
		const renderResult = render(prev, current)

		stackDiv.replaceChildren(...renderResult.stackSpans)
		ipStackDiv.replaceChildren(...renderResult.ipStackSpans)
		varsDiv.replaceChildren(...renderResult.varsSpans)

		instructionSpans.at(current.idx - 1)?.classList.add("current");
		instructionSpans.at(prev.idx - 1)?.classList.remove("current");

		output.innerText = current.output;
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
	formatEditor()

	formatButton.addEventListener("click", formatEditor)

	compButton.addEventListener("click", () => {
		formatEditor()

		if (!tokens) return;

		const block = parseBlock.run(tokens)

		try {
			error.style.visibility = "hidden";
			if (block.type === "match") {
				console.log(typeCheck(block.value, new TypeMap([], [])))

				const compiler = new Compiler()
				compiler.visit(block.value)
				vm = new VM(compiler.code, comparisonFunc);

				instructionSpans = generateDump(compiler.code, tokenSpans, byteCode);

				byteCode.replaceChildren(...instructionSpans)
				highlight.replaceChildren(...tokenSpans)
			} else {
				throw new ParsingError(block)
			}
		} catch (e) {
			if (e instanceof Error) {
			error.style.visibility = "visible";
			errorMsg.innerText = e.message

			if (e instanceof TypeCheckError) {
				errorType.innerText = "Typecheck Error:";
			} else if (e instanceof VariableError) {
				errorType.innerText = "Variable Error:";
			} else if (e instanceof ParsingError) {
				errorType.innerText = "Parsing Error:";
			} else if (e instanceof VMError) {
				errorType.innerText = "VM Error:";
			} else {
				errorType.innerText = "Other Error:";
			}

			} else {
				throw e
			}
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
