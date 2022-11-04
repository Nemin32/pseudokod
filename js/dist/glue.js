import * as PseudoVisitor from "./esbundle.js"

const dumpEnvironment = (executor, codeOutput, varOutput) => {
	codeOutput.innerText = ""
	//varOutput.innerText = ""

	let [code, stack, vars, paramTypes, ip, ipStack] = [
		executor.instructions,
		executor.stack,
		executor.variables,
		executor.paramTypes,
		executor.ip,
		executor.ipStack,
	];

	const padRight = (inp, length, char = "0") => {
		return char.repeat(length - inp.length) + inp
	}

	const colors = {
		"push": "red",
		"pushVar": "red",
		"functionCall": "green",
		"functionDef": "green",
		"functionEnd": "green"
	};

	let codeText = ""
	codeText += "  IP: " + padRight(String(ip), 4) + "\n\n";

	let indent = 2;
	let lineNum = 1;
	for (let i = 0; i < code.length; i++) {
		if (["endIf", "loop", "functionEnd", "elIf", "else"].includes(code[i].opcode)) {
			indent -= 2
		}

		const spaces = " ".repeat(indent)
		const opcode = code[i].opcode.toUpperCase();
		const payload = code[i].payload ? `(${code[i].payload})` : ""

		const colorCode = colors[code[i].opcode]

		// Set back to true.
		const color = (false && colorCode) ? `style="color: ${colorCode};"` : ""

		// codeText += `<span><pre>${cursor} ${padRight(String(code[i].lineNum), 3)} ${padRight(String(i), 4)}</pre> <pre ${color}>${spaces}${opcode}${payload}</pre></span>\n`

		let span = document.createElement("span")

		if (ip == i) {
			span.className = "current"
		}

		if (lineNum != code[i].lineNum) {
			lineNum = code[i].lineNum
			span.classList.add("separator")
		}

		span.innerHTML = `<pre>${padRight(String(i), 4)}</pre> <pre ${color}>${spaces}${opcode}${payload}</pre>`
		span.addEventListener("mouseenter", () => {
			highlight(code[i].lineNum - 1, true)
		})

		span.addEventListener("mouseleave", () => {
			highlight(code[i].lineNum - 1, false)
		})

		span.setAttribute("line", code[i].lineNum - 1)

		codeOutput.appendChild(span)

		if (["if", "elIf", "else", "functionDef", "while"].includes(code[i].opcode)) {
			indent += 2
		}
	}

	codeText += "\nIP STACK:\n"

	for (let sip of ipStack) {
		codeText += padRight(String(sip), 4) + "\n"
	}

	// codeOutput.innerHTML = codeText;
};

const pushStackCallback = (div, value) => {
	let span = document.createElement("span");
	span.innerText = value.toString()
	div.insertBefore(span, div.firstChild)
};

const popStackCallback = (div) => {
	let toBeRemoved = div.querySelector("span:not(.deleted)")
	toBeRemoved.className = "deleted"

	setTimeout(() => {
		div.removeChild(toBeRemoved)
	}, 250)
};

const variableSetCallback = (div, variable) => {
	let newElem = document.createElement("div")
	newElem.innerHTML = `<span class="varname">${variable.key}</span><span class="value">${variable.value}</span>`
	div.appendChild(newElem)
}

const scopeLeaveCallback = (div, variables) => {
	div.innerHTML = ""

	for (let variable of variables) {
		let newElem = document.createElement("div")
		newElem.innerHTML = `<span class="varname">${variable.key}</span><span class="value">${variable.value}</span>`
		div.appendChild(newElem)
	}
}

const colorSyntax = (input) => {
	const colors = [
		[/[0-9]+/g, "#b16286"],
		[/<-|\+|\-|\*|,/g, "#a0a0a0"],
		[/ha|akkor|különben|elágazás vége/g, "#fb4934"],
		[/függvény (vége)?/g, "#b8bb26"],
		[/ciklus (vége)?|amíg/g, "#fe8019"],
		[/kiir|vissza/g, "#8ec07c"],
	]

	const mapLine = (line) => {
		return colors.reduce((line, [rx, color]) => line.replaceAll(rx, `<span style="color: ${color}">$&</span>`), line)
	}

	// Using NBSP instead of normal space.

	let lineNum = 0;
	return input.split("\n").map(line => {
		const span = document.createElement("span")

		if (line != "") {
			span.innerHTML = mapLine(line)

			let num = lineNum
			span.addEventListener("mouseenter", () => { highlight(num, true) })
			span.addEventListener("mouseleave", () => { highlight(num, false) })
		} else {
			span.innerHTML = " "
		}

		lineNum++;

		return span
	})
}

const highlight = (lineNum, should) => {
	const syntaxElem = document.getElementById("syntax")
	const codeOutput = document.getElementById("code")

	syntaxElem.children[lineNum].classList.toggle("highlight")
	codeOutput.querySelectorAll(`span[line="${lineNum}"]`).forEach(span => span.classList.toggle("highlight"))
}

const outputFunction = (output, wrappedValue) => {
	output.innerText += wrappedValue?.value + "\n";
	output.scrollIntoView(false)
};

const compileEnvironment = (input) => {
	const env = PseudoVisitor.generateLinearEnvironment(input);
	return env
}

window.addEventListener("load", () => {
	/* User controls */
	const inputElem = document.getElementById("input")
	const syntaxElem = document.getElementById("syntax")
	const compile = document.getElementById("compile")
	const step = document.getElementById("step")
	const run = document.getElementById("run")

	/* Program output */
	const output = document.getElementById("output")
	const codeOutput = document.getElementById("code")
	const varOutput = document.querySelector("#vars div")
	const stackOutput = document.querySelector("#stack div")

	let environment = null;
	let executor = null;

	const callbacks = {
		output: (val) => outputFunction(output, val),
		pushStack: (val) => pushStackCallback(stackOutput, val),
		popStack: () => popStackCallback(stackOutput),
		variableSet: (variable) => variableSetCallback(varOutput, variable),
		scopeLeave: (variables) => scopeLeaveCallback(varOutput, variables)
	}

	inputElem.addEventListener("input", () => {
		syntaxElem.innerHTML = ""
		colorSyntax(inputElem.value).forEach(s => syntaxElem.appendChild(s))
	})

	syntaxElem.innerHTML = ""
	colorSyntax(inputElem.value).forEach(s => syntaxElem.appendChild(s))

	inputElem.addEventListener("scroll", () => {
		syntaxElem.scrollTop = inputElem.scrollTop
	})


	compile.addEventListener("click", () => {
		environment = compileEnvironment(inputElem.value);
		executor = new PseudoVisitor.LinearExecutor(environment, callbacks);

		dumpEnvironment(executor, codeOutput, varOutput)

		output.innerText = ""
	})

	run.addEventListener("click", () => {
		if (executor) {
			executor.run()
			dumpEnvironment(executor, codeOutput, varOutput)
		}
	})

	step.addEventListener("click", () => {
		if (executor) {
			executor.step()
			dumpEnvironment(executor, codeOutput, varOutput)
		}
	})
})
