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

	codeOutput.innerText += "  IP: " + padRight(String(ip), 4) + "\n\n";

	for (let i = 0; i < code.length; i++) {
		const cursor = i == ip ? ">" : " ";
		const opcode = code[i].opcode.toUpperCase();
		const payload = code[i].payload ? `(${code[i].payload})` : ""

		codeOutput.innerText += `${cursor} ${padRight(String(i), 4)} ${opcode}${payload}\n`
	}

	codeOutput.innerText += "\nIP STACK:\n"

	for (let sip of ipStack) {
		codeOutput.innerText += padRight(String(sip), 4) + "\n"
	}
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

	console.log(newElem)
}

const scopeLeaveCallback = (div, variables) => {
	div.innerHTML = ""

	for (let variable of variables) {
		let newElem = document.createElement("div")
		newElem.innerHTML = `<span class="varname">${variable.key}</span><span class="value">${variable.value}</span>`
		div.appendChild(newElem)
	}
}

const outputFunction = (output, wrappedValue) => {
	output.innerText += wrappedValue?.value;
};

const compileEnvironment = (input) => {
	const env = PseudoVisitor.generateLinearEnvironment(input);
	return env
}

window.addEventListener("load", () => {
	/* User controls */
	const inputElem = document.getElementById("input")
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

	compile.addEventListener("click", () => {
		environment = compileEnvironment(inputElem.value);
		executor = new PseudoVisitor.LinearExecutor(environment, callbacks);

		dumpEnvironment(executor, codeOutput, varOutput)
	})

	run.addEventListener("click", () => {
		if (executor) {
			output.innerText = ""
			executor.reset()
			executor.run()
		}
	})

	step.addEventListener("click", () => {
		if (executor) {
			executor.step()
			dumpEnvironment(executor, codeOutput, varOutput)
		}
	})
})
