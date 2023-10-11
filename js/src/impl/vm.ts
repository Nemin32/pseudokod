import { OpCode as OC } from "../interfaces/ICompiler.ts";
import { Atom, BinOpType } from "../interfaces/astkinds.ts";
import { Inst } from "../interfaces/instructions.ts";
import { Variables } from "./variables.ts";

export class VM {
	ipStack: number[] = [];
	stack: Atom["value"][] = [];
	idx = 0;
	jmpTable: Map<string, number> = new Map()

	vars = new Variables();

	constructor(private tape: Inst[]) {
		// build jmpTable
		for (let i = 0; i < this.tape.length; i++) {
			const inst = this.tape[i]
			if (inst.code === OC.LABEL) {
				const name = inst.name
				if (this.jmpTable.get(name) !== undefined) throw new Error(`Label "${name}" appears twice in code!`)
				this.jmpTable.set(name, i)
			}
		}

		console.log(this.jmpTable)
	}

	fetch(): Inst | null {
		if (this.idx < this.tape.length)
			return this.tape[this.idx];

		return null;
	}

	pop(): Atom["value"] {
		const val = this.stack.pop()
		if (val === undefined) throw new Error("Stack was empty!");
		return val;
	}

	popMany(n: number): Atom["value"][] {
		const values = [];

		for (let i = 0; i < n; i++) {
			values.push(this.pop())
		}

		return values.reverse()
	}

	push(val: Atom["value"]) {
		this.stack.push(val)
	}

	jmp(label: string): void {
		const addr = this.jmpTable.get(label)
		if (addr === undefined)
			throw new Error(`Can't find label "${label}"!`)

		this.idx = addr - 1;
	}

	step(inst: Inst) {
		switch (inst.code) {
			case OC.ADDRESS: {
				const { name } = inst
				const value = this.vars.getAddress(name)

				if (value === null) throw new Error(`${name} doesn't exist!`)
				this.push(value)
			} break;

			case OC.ARRADDR: {
				const indexes = this.popMany(inst.dimensions)

				if (!indexes.map(i => typeof i === "number").every(v => v))
					throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				this.push(this.vars.getArrayElemAddr(inst.name, indexes as number[]))
			} break;

			case OC.ARRCMP: {
				const elems = this.popMany(inst.length)
				this.vars.addArray(inst.name, elems)
			} break;

			case OC.BINOP: {
				const { type } = inst
				const second = this.pop()
				const first = this.pop()

				switch (type) {
					case BinOpType.ADD: this.push((first as number) + (second as number)); break;
					case BinOpType.SUB: this.push((first as number) - (second as number)); break;
					case BinOpType.MUL: this.push((first as number) * (second as number)); break;
					case BinOpType.DIV: this.push((first as number) / (second as number)); break;
					case BinOpType.MOD: this.push((first as number) % (second as number)); break;

					case BinOpType.EQ: this.push(first === second); break;
					case BinOpType.NEQ: this.push(first !== second); break;
					case BinOpType.LE: this.push(first <= second); break;
					case BinOpType.GE: this.push(first >= second); break;
					case BinOpType.LESS: this.push(first < second); break;
					case BinOpType.GREATER: this.push(first > second); break;

					case BinOpType.AND: this.push(first && second); break;
					case BinOpType.OR: this.push(first || second); break;
				}
			} break;

			case OC.CALL: {
				const { name } = inst
				this.ipStack.push(this.idx);
				this.jmp(name)
			} break;

			case OC.DEBUG: {
				this.idx++;
				return false;
			} // break;

			case OC.ESCOPE: {
				const { isFun } = inst
				this.vars.escope(isFun)
			} break;

			case OC.FJMP: {
				const { label } = inst
				if (this.pop() === false) {
					this.jmp(label)
				}
			} break;

			case OC.GETARR: {
				const indexes = this.popMany(inst.dimensions)

				if (!indexes.map(i => typeof i === "number").every(v => v))
					throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				this.push(this.vars.getArrayElem(inst.name, indexes as number[]))
			} break;

			case OC.GETVAR: {
				const { name } = inst
				const value = this.vars.getVariable(name)
				if (value === null) throw new Error(`${name} has no value!`);
				this.push(value)
			} break;

			case OC.JMP: {
				const { label } = inst
				this.jmp(label)
			} break;

			case OC.LABEL: { } break;

			case OC.LSCOPE: { this.vars.lscope(false) } break;

			case OC.MKARR: {
				const indexes = this.popMany(inst.numDimensions)

				if (!indexes.map(i => typeof i === "number").every(v => v))
					throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				this.vars.addEmptyArray(inst.name, indexes as number[])
			} break;

			case OC.MKREF: {
				const { name } = inst
				const pointer = this.pop()
				if (typeof pointer !== "number") throw new Error(`${name}: Expected address, got ${typeof pointer}`)
				this.vars.makeReference(name, pointer);
			} break;

			case OC.NOT: {
				this.push(!this.pop())
			} break;

			case OC.PRINT: {
				console.log(this.pop())
			} break;

			case OC.PUSH: {
				const { value } = inst
				this.push(value);
			} break;

			// @ts-ignore Ignores fallthrough.
			case OC.RETCMP: {
				const exprs = this.popMany(inst.length)
				this.push(this.vars.addArrayRef(exprs));
				this.push("__mk")
			}

			/* Falls through! */
			case OC.RETURN: {
				this.vars.lscope(true)
				const newIp = this.ipStack.pop()
				if (!newIp) throw new Error("IP Stack is empty.")
				this.idx = newIp
			} break;

			case OC.SETARR: {
				const indexes = this.popMany(inst.dimensions)
				if (!indexes.map(i => typeof i === "number").every(v => v)) throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				const value = this.pop()
				this.vars.setArrayElem(inst.name, indexes as number[], value)
			} break;

			case OC.SETVAR: {
				const { name } = inst
				const val = this.pop()
				if (val === "__mk") {
					const ref = this.pop()
					if (typeof ref !== "number") throw new Error(`Expected REFERENCE, got ${typeof ref}`)
					this.vars.makeReference(name, ref)
				} else {
					this.vars.setVariable(name, val)
				}
			} break;

			case OC.VOID: { this.pop() } break;

		}

		this.idx++;
		return true;
	}

	run() {
		while (true) {
			const inst = this.fetch()
			if (!inst) return;
			if (!this.step(inst)) return;
		}
	}
}
