//import * as PseudoVisitor from "./main.js"

window.addEventListener("load", () => {
	const inputElem = document.getElementById("input")
	const output = document.getElementById("output")
	const vars = document.getElementById("vars")
	const button = document.getElementById("send")

	button.addEventListener("click", () => {
		output.innerHTML = ""
		vars.innerHTML = ""

		const syntaxReporter = (recognizer, offendingSymbol, line, column, mesage, error) => {
			console.log({
				recognizer,
				offendingSymbol,
				line,
				column,
				mesage,
				error
			})

			button.className = "bad"
		}

		button.className = "good"
		PseudoVisitor.runText(
			inputElem.value,
			syntaxReporter,
			(...rest) => { rest.forEach(elem => {output.innerText += elem +"\n"}) },
			(head, scope_limits) => {
				let current = head;

				while (current != null) {
					if (scope_limits.includes(current)) {
						vars.innerHTML += `<span>limit</span>`
					}

					vars.innerHTML += `<span>${current.key} - ${current.value}</span>`

					current = current.next
				}
			}
		)
	})
})
