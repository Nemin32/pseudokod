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

const getBindings = () => ({
	editor: document.getElementById("code")! as HTMLTextAreaElement,
	byteCode: document.querySelector("#instructions div")! as HTMLDivElement,
	output: document.querySelector("#output")! as HTMLDivElement,
	highlight: document.getElementById("highlight")!,
	algorithms: document.querySelector("#picker div")!,

	error: document.getElementById("error")! as HTMLDivElement,
	errorType: document.querySelector("#errorType")! as HTMLParagraphElement,
	errorMsg: document.querySelector("#errorMsg")! as HTMLParagraphElement,

	stackDiv: document.querySelector("#stack div")! as HTMLDivElement,
	ipStackDiv: document.querySelector("#ipStack div")! as HTMLDivElement,
	varsDiv: document.querySelector("#variables div")! as HTMLDivElement,
	memDiv: document.querySelector("#memory div")! as HTMLDivElement,
})

const getButtons = () => ({
	formatButton: document.getElementById("format")!,
	compButton: document.getElementById("compile")!,
	runButton: document.getElementById("run")!,
	stepButton: document.getElementById("step")!,
	backButton: document.getElementById("back")!,
})

type Bindings = ReturnType<typeof getBindings>
type Buttons = ReturnType<typeof getButtons>

class UI {
	constructor(private bindings: Bindings, private buttons: Buttons) {
		this.bindings.editor.addEventListener("scroll", this.matchScroll)
		this.bindings.editor.addEventListener("input", this.handleInput)
		this.buttons.formatButton.addEventListener("click", this.formatEditor)
		this.buttons.compButton.addEventListener("click", this.compile)
		this.buttons.runButton.addEventListener("click",  () => { this.handleError(() => this.vm?.run()); })
		this.buttons.stepButton.addEventListener("click", () => { this.handleError(() => this.vm?.step()); })
		this.buttons.backButton.addEventListener("click", () => { this.handleError(() => this.vm?.stepBack()); })

		this.loadAlgorithms().then(() => { this.formatEditor() })
	}

	private tokens: IToken[] | null = null;
	private tokenSpans: HTMLSpanElement[] = [];
	private instructionSpans: HTMLSpanElement[] = [];
	private vm: VM | null = null;

	handleInput = () => {
		const { editor, highlight } = this.bindings;

		// No real idea why it works, but you need to add \n to fix an ugly error with scrolling.
		const [newTokenSpans, newTokens] = tokenize(editor.value + "\n");
		this.tokens = newTokens;
		this.tokenSpans = newTokenSpans;

		highlight.replaceChildren(...this.tokenSpans)
		this.matchScroll()
	}

	formatEditor = () => {
		const { editor } = this.bindings

		editor.value = formatCode(editor.value.split("\n").filter(l => l.trim().length > 0))
		this.handleInput()
	}

	comparisonFunc = (prev: State, current: State) => {
		const { stackDiv, ipStackDiv, varsDiv, memDiv, output } = this.bindings;

		const renderResult = render(prev, current)

		stackDiv.replaceChildren(...renderResult.stackSpans)
		ipStackDiv.replaceChildren(...renderResult.ipStackSpans)
		varsDiv.replaceChildren(...renderResult.varsSpans)
		memDiv.replaceChildren(...renderResult.memorySpans)

		this.instructionSpans.at(current.idx - 1)?.scrollIntoView();
		this.instructionSpans.at(current.idx - 1)?.classList.add("current");
		this.instructionSpans.at(prev.idx - 1)?.classList.remove("current");

		output.innerText = current.output;
	}

	handleError = (fn: () => void) => {
		const { error, errorMsg, errorType } = this.bindings

		try {
			fn()
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
	}

	compile = () => {
		const { error, byteCode, highlight } = this.bindings

		this.formatEditor()

		if (!this.tokens) return;

		const block = parseBlock.run(this.tokens)

		this.handleError(() => {
			error.style.visibility = "hidden";
			if (block.type === "match") {
				if (block.next.index != block.next.input.length) {
					throw new ParsingError({
						cause: "Could not parse till EOF.",
						location: block.next,
						type: "error",
						extract() { throw new Error() },
					})
				}

				typeCheck(block.value, new TypeMap([], []))

				const compiler = new Compiler()
				compiler.visit(block.value)
				this.vm = new VM(compiler.code, this.comparisonFunc);

				this.instructionSpans = generateDump(compiler.code, this.tokenSpans, byteCode);

				byteCode.replaceChildren(...this.instructionSpans)
				highlight.replaceChildren(...this.tokenSpans)
			} else {
				throw new ParsingError(block)
			}
		})
	}

	matchScroll = () => {
		const { editor, highlight } = this.bindings

		highlight.scrollTop = editor.scrollTop
		highlight.scrollLeft = editor.scrollLeft
	}

	loadAlgorithms = async () => {
		const { editor, algorithms } = this.bindings

		const json = await (await fetch("./jegyzet.json")).json();
		const select = generateSelect(json)

		select.addEventListener("change", () => {
			if (!select.selectedOptions[0]) return;

			const [ch, idx] = select.selectedOptions[0].value.split(",").map(elem => Number(elem))

			editor.value = formatCode(json[ch][idx].code)
			this.handleInput()
		})

		algorithms.appendChild(select);
	}
}

window.addEventListener("load", () => { new UI(getBindings(), getButtons()); })
