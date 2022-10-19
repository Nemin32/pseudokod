//import * as PseudoVisitor from "./main.js"

import * as PseudoVisitor from "./esbundle.js"

window.addEventListener("load", () => {
	const inputElem = document.getElementById("input")
	const output = document.getElementById("output")
	const vars = document.getElementById("vars")
	const button = document.getElementById("send")

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
