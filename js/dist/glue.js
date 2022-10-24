import * as PseudoVisitor from "./esbundle.js"

const dumpEnvironment = (executor, codeOutput, varOutput) => {
	codeOutput.innerText = ""
	varOutput.innerText = ""

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
	let span = div.createElement("span");
	span.innerText = value.toString()
	div.insertBefore(div.firstChild)
};

const popStackCallback = (div) => {
	div.firstChild.className = "removed";
	setTimeout(() => {
		div.removeChild(div.firstChild)
	}, 100)
};

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
	const varOutput = document.getElementById("vars")
	const stackOutput = document.getElementById("stack")

	let environment = null;
	let executor = null;

	const callbacks = {
		output: (val) => outputFunction(output, val),
		pushStack: (val) => pushStackCallback(stackOutput, val),
		popStack: () => popStackCallback(stackOutput),
	}

	compile.addEventListener("click", () => {
		environment = compileEnvironment(inputElem.value);
		executor = new PseudoVisitor.LinearExecutor(environment, callbacks.output);

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
