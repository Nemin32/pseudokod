type Entry = {
	name: string,
	inputs: string,
	outputs: string,
	code: string[]
	skip?: boolean
}

type Programs = Record<string, Entry[]>

const firstWord = (input: string) => {
	const spaceIdx = input.indexOf(" ")
	if (spaceIdx === -1) return input;

	return input.slice(0, spaceIdx)
}

const lastWord = (input: string) => {
	const spaceIdx = input.lastIndexOf(" ")
	if (spaceIdx === -1) return input;

	return input.slice(spaceIdx + 1)
}

export const formatCode = (input: string[]): string => {
	return input.map(line => line.trim().trimEnd())
		.reduce<{ output: string, indent: number }>(({ output: prevOutput, indent: oldIndent }, line) => {
			const shouldIndent = ["eljárás", "függvény", "ciklus", "ha"].includes(firstWord(line))
			const shouldDedent = lastWord(line) === "vége"
			const elseKW = firstWord(line) === "különben"

			let indent = oldIndent;

			if (elseKW || shouldDedent) {
				indent -= 2;
			}

			const output = prevOutput + (shouldIndent ? "\n" : "") + " ".repeat(indent) + line + "\n";

			if (elseKW || (!shouldDedent && shouldIndent)) {
				indent += 2;
			}

			return { output, indent }
		}, { output: "", indent: 0 }).output
}

export const generateSelect = (json: Programs) => {
	const select = document.createElement("select");
	select.multiple = true;

	for (const elem in json) {
		const group = document.createElement("optgroup")

		group.label = `${elem}. Fejezet`

		const collection = json[elem]
		collection.forEach((prog, idx) => {
			const entry = document.createElement("option")
			entry.innerText = prog.name
			entry.value = `${elem},${idx}`

			group.appendChild(entry)
		})

		select.appendChild(group)
	}

	return select
}
