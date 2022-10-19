//import * as PseudoVisitor from "./main.js"

/*import { createProgram } from "../src/index.js"
import { LinearExecutor } from "../src/LinearGenerator.js"*/
import * as PseudoVisitor from "./esbundle.js"

window.addEventListener("load", () => {
	const inputElem = document.getElementById("input")
	const output = document.getElementById("output")
	const code = document.getElementById("code")
	const vars = document.getElementById("vars")
	const button = document.getElementById("send")

	const printCode = (code, exec) => {
		code.innerHTML = ""
		exec.instructions.forEach((elem, idx) => {
			const curr = (idx == exec.ip) ? ">" : " "
			const pl = (elem.payload !== null) ? " - " + elem.payload : ""
			code.innerText += curr + elem.opcode.toUpperCase() + pl + "\n"
		})

		if (exec.ip == exec.instructions.length) {
			code.innerText += "[DONE]"
		}

		vars.innerText = "VARS:\n"

		for (const [key, val] of exec.variables.entries()) {
			vars.innerText += `${key} - ${val}\n`
		}

		vars.innerText += "STACK:\n"
		exec.stack.forEach(s => {
			vars.innerText += s + "\n"
		})
	}

	let exec = null

	compile.addEventListener("click", () => {
		exec = new PseudoVisitor.LinearExecutor(PseudoVisitor.createProgram(inputElem.value), (text) => { output.innerText += text + "\n" })
		printCode(code, exec)

	})

	document.addEventListener("keyup", (key) => {
		if (key.key == " ") {
			exec.step();
			printCode(code, exec)
		}
	})


	button.addEventListener("click", () => {
		output.innerHTML = ""
		vars.innerHTML = ""

		const syntaxReporter = (recognizer, offendingSymbol, line, column, message, error) => {
			console.log({
				recognizer,
				offendingSymbol,
				line,
				column,
				message,
				error
			})

			output.innerHTML += `${line}:${column} - ${message}\n`;
			button.className = "bad"
		}

		button.className = "good"

		try {
			PseudoVisitor.runText(
				inputElem.value,
				syntaxReporter,
				(...rest) => { rest.forEach(elem => { output.innerText += elem + "\n" }) },
				(variables, scopeBounds) => {
					vars.innerHTML = ""

					for (let i = variables.length - 1; i >= 0; i--) {
						if (scopeBounds.find((elem) => elem.isFunctionScope && elem.length == i + 1)) {
							vars.innerHTML += `<span>limit</span>`
						}

						vars.innerHTML += `<span>${variables[i].key} - ${variables[i].value.value} (${variables[i].value.type})`

					}
				}
			)
		} catch (e) {
			output.innerHTML += e.message + "\n"
			button.className = "bad"
		}
	})
})
