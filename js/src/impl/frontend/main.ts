import { Compiler } from "../compiler/compiler.ts"
import { parseBlock } from "../parser/ast_parser.ts"
import { Tokenizer } from "../parser/tokenizer.ts"

window.addEventListener("load", () => {
	const code = document.getElementById("code")! as HTMLTextAreaElement
	const byteCode = document.getElementById("instructions")!
	const compButton = document.getElementById("compile")!

	compButton.addEventListener("click", () => {
		const tok = new Tokenizer()
		const tokens = tok.tokenize(code.value)
		const block = parseBlock.run(tokens)

		if (block.type === "match") {
			const comp = new Compiler()
			comp.visit(block.value)

			byteCode.innerText = comp.code.join("\n")
		}

	})

})
