import { OpCode } from "../interfaces/ICompiler.ts"
import { Inst } from "../interfaces/instructions.ts"

const setActive = (bc: Inst, tokenSpans: HTMLSpanElement[], codeRoot: HTMLDivElement) => {
	const prev = codeRoot.querySelectorAll("span.active")
	prev.forEach(p => p.classList.remove("active"));

	tokenSpans.filter(s => (s.dataset.isWS !== "true") && Number(s.dataset.row) === bc.origin.token?.position.row).forEach(s => s.classList.add("active"));

	Array.from(codeRoot.querySelectorAll("span")).filter(p => Number(p.dataset.row) === bc.origin.token?.position.row).forEach(span =>
		span.classList.add("active"));
}

const setInactive = (bc: Inst, tokenSpans: HTMLSpanElement[], codeRoot: HTMLDivElement) => {
	tokenSpans.filter(s => Number(s.dataset.row) === bc.origin.token?.position.row).forEach(s => s.classList.remove("active"));

	Array.from(codeRoot.querySelectorAll("span")).filter(p => Number(p.dataset.row) === bc.origin.token?.position.row).forEach(span =>
		span.classList.remove("active"));
}

const bcToHTML = (bc: Inst, idx: number, indent: number, tokenSpans: HTMLSpanElement[], codeRoot: HTMLDivElement) => {
	const c = document.createElement("span")
	const args = document.createElement("pre")

	if (bc.code === OpCode.BINOP) {
		args.innerText = bc.origin.token!.lexeme
	} else {
		args.innerText = Object.values(bc).slice(1, -1).join(", ")
	}

	const lineCount = document.createElement("pre")
	lineCount.innerText = String(idx).padStart(4, " ")

	const code = document.createElement("pre")
	code.innerText = `${" ".repeat(indent)}${OpCode[bc.code]}`

	c.dataset.row = String(bc.origin.token?.position.row ?? 0)
	c.dataset.column = String(bc.origin.token?.position.column ?? 0)
	c.addEventListener("mouseover", () => setActive(bc, tokenSpans, codeRoot))
	c.addEventListener("mouseout", () => setInactive(bc, tokenSpans, codeRoot))
	c.replaceChildren(lineCount, code, args)

	return c
}

export const generateDump = (code: Inst[], tokenSpans: HTMLSpanElement[], codeRoot: HTMLDivElement) => {
	return code.reduce<{ lst: HTMLSpanElement[], indent: number }>((state, inst, idx) => {
		let indent = state.indent;

		if (inst.code === OpCode.LSCOPE) indent -= 1;
		const pre = bcToHTML(inst, idx, indent, tokenSpans, codeRoot)
		if (inst.code === OpCode.ESCOPE) indent += 1;

		return { lst: state.lst.concat(pre), indent }
	}, { lst: [], indent: 0 }).lst
}
