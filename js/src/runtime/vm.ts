import { OpCode as OC } from "../interfaces/ICompiler.ts";
import { Atom, BinOpType } from "../interfaces/astkinds.ts";
import { Inst } from "../interfaces/instructions.ts";
import { ValueADT, ValueType, VariableBinding, Variables } from "./variables.ts";

export type Pointer = { pointer: number }
export type Value = Atom["value"] | Pointer;

export class VMError extends Error {
	constructor(public msg: string) {
		super(msg)
	}
}

export class State {
	constructor(
		public ipStack: Array<number>,
		public stack: Array<Value>,
		public vars: Variables,
		public idx: number,
		public output: string) { }

	clone(): State {
		return new State([...this.ipStack], [...this.stack], this.vars.clone(), this.idx, this.output)
	}
}

export class VM {
	jmpTable: Map<string, number> = new Map()
	states: State[] = [new State([], [], new Variables(), 0, "")];

	saveState(): void {
		this.states.push(this.currentState.clone())
	}

	get previousState() {
		return this.states.at(-2) ?? this.states.at(-1)!;
	}

	get currentState() {
		// We must ensure there is always at least one state available.
		return this.states.at(-1)!
	}

	constructor(private tape: Inst[], private render: (prevState: State, currState: State) => void) {
		// build jmpTable
		for (let i = 0; i < this.tape.length; i++) {
			const inst = this.tape[i]
			if (inst.code === OC.LABEL) {
				const name = inst.name
				if (this.jmpTable.has(name)) throw new VMError(`Label "${name}" appears twice in code!`)
				this.jmpTable.set(name, i)
			}
		}
	}

	fetch(): Inst | null {
		if (this.currentState.idx < this.tape.length)
			return this.tape[this.currentState.idx];

		return null;
	}

	pop(): Value | Value[] {
		const val = this.currentState.stack.pop()
		if (val === undefined) throw new VMError("Stack was empty!");

		if (val === "__mk") {
			const retval = [] as Value[];
			const length = this.currentState.stack.pop() as number;

			for (let i = 0; i < length; i++) {
				const value = this.currentState.stack.pop()
				if (value === undefined) throw new VMError("Stack was empty!");
				retval.push(value)
			}

			return retval.reverse()
		}

		return val;
	}

	popMany(n: number): Value[] {
		const values: Value[] = [];

		for (let i = 0; i < n; i++) {
			const value = this.pop()
			if (Array.isArray(value)) throw new VMError("Array in popMany.");
			values.push(value)
		}

		return values.reverse()
	}

	popIndexes(dim: number): number[] {
		const dimensionsRaw = this.popMany(dim);
		const dimensions = dimensionsRaw.map(val => this.unwrapValue(val))

		dimensions.forEach(v => {
			if (typeof v !== "number") throw new VMError("Index was not number: " + v)
		})

		return (dimensions as number[]).map(i => i - 1);
	}

	unwrapValue(value: Value | Value[]): Value {
		if (Array.isArray(value)) {
			throw new VMError("Value was array.")
		}

		if (this.currentState.vars.isPointer(value)) {
			const box = this.currentState.vars.getBox(value.pointer)

			/*if (box.type === ValueType.ARRAY) {
				throw new VMError("Box was array.")
			}*/

			return box.value;
		} else {
			return value
		}
	}

	push(val: Value) {
		this.currentState.stack.push(val)
	}

	pushPointer(pointer: number) {
		this.currentState.stack.push({ pointer })
	}

	jmp(label: string): void {
		const addr = this.jmpTable.get(label)
		if (addr === undefined)
			throw new VMError(`Can't find label "${label}"!`)

		this.currentState.idx = addr - 1;
	}

	exec(inst: Inst) {
		const {
			vars,
			ipStack
		} = this.currentState;

		switch (inst.code) {
			case OC.ADDRESS: {
				this.pushPointer(vars.findBinding(inst.name).pointer);
			}; break

			case OC.ARRADDR: {
				const indexes = this.popIndexes(inst.dimensions);
				this.pushPointer(vars.getArrayElemAddr(inst.name, indexes))
			}; break

			case OC.CALL: {
				ipStack.push(this.currentState.idx);

				const funcName = vars.getVariableOrNull(inst.name)
				if (funcName != null) {
					if (typeof funcName === "string") {
						this.jmp(funcName)
					} else {
						throw new VMError("Expected function name, got " + typeof funcName + ".")
					}
				} else {
					this.jmp(inst.name);
				}
			}; break

			// @ts-ignore: Ignores fallthrough.
			case OC.RETCMP: {
				this.push(inst.length)
				this.push("__mk");
			}

			// Falls through!
			case OC.RETURN: {
				vars.lscope(true, this.currentState.stack)
				const newIp = this.currentState.ipStack.pop();
				if (!newIp) throw new VMError("IP stack is empty.")
				this.currentState.idx = newIp
			}; break

			case OC.COMPRE: {
				const elems = this.popMany(inst.length).map(v => this.unwrapValue(v));
				vars.addArray(inst.name, elems)
			}; break

			case OC.ARRCMP: {
				const indexRoot = this.popIndexes(inst.dimensions)
				const elems = this.popMany(inst.length).map(v => this.unwrapValue(v));

				for (let i = 0; i < elems.length; i++) {
					const indexes = indexRoot.concat(i);
					vars.setArrayElem(inst.name, indexes, elems[i])
				}
			}; break

			case OC.PUSH: {
				this.push(inst.value);
			}; break

			case OC.BINOP: {
				const second = this.unwrapValue(this.pop())
				const first = this.unwrapValue(this.pop())

				const methods: ReadonlyMap<BinOpType, (a: number, b: number) => Value> = new Map([
					// Arithmetics
					[BinOpType.ADD, (a, b) => a + b as Value],
					[BinOpType.SUB, (a, b) => a - b],
					[BinOpType.MUL, (a, b) => a * b],
					[BinOpType.DIV, (a, b) => Math.floor(a / b)],
					[BinOpType.MOD, (a, b) => a % b],

					// Logic
					[BinOpType.AND, (a, b) => a && b],
					[BinOpType.OR, (a, b) => a || b],

					// Comparisons
					[BinOpType.EQ, (a, b) => a === b],
					[BinOpType.NEQ, (a, b) => a !== b],
					[BinOpType.GE, (a, b) => a >= b],
					[BinOpType.LE, (a, b) => a <= b],
					[BinOpType.LESS, (a, b) => a < b],
					[BinOpType.MORE, (a, b) => a > b],
				])

				const method = methods.get(inst.type)

				if (!method) {
					throw new VMError("No such binop: " + inst.type)
				}

				this.push(method(first as number, second as number))
			}; break

			case OC.NOT: {
				const value = this.unwrapValue(this.pop());

				if (typeof value !== "boolean") {
					throw new VMError("FJMP: Value must be bool, but was " + typeof value)
				}

				this.push(!value);
			}; break

			case OC.PRINT: {
				const value = this.pop()

				this.currentState.output += vars.valueToString(value) + "\n"
			}; break

			case OC.VOID: {
				this.pop()
			}; break

			/*
			case OC.GETARR: {
				//const indexes = this.popIndexes(inst.dimensions)
				//this.push(vars.getArrayElem(inst.name, indexes))

				const indexes = this.popIndexes(inst.dimensions);
				this.pushPointer(vars.getArrayElemAddr(inst.name, indexes))
			}; break

			case OC.GETVAR: {
				this.pushPointer(vars.findBinding(inst.name).pointer);
			}; break
			*/

			case OC.SETARR: {
				const indexes = this.popIndexes(inst.dimensions)
				const value = this.unwrapValue(this.pop())

				vars.setArrayElem(inst.name, indexes, value);
			}; break

			case OC.SETVAR: {
				const { name } = inst;

				const value = this.pop();

				if (vars.isPointer(value)) {
					const box = vars.getBox(value.pointer);

					if (box.type === ValueType.NORMAL) {
						vars.setVariable(name, box.value);
					} else {
						const arr = vars.getArrayByAddr(value.pointer)
						vars.addArray(name, arr)
						console.log(arr)
					}
				} else {
					if (Array.isArray(value)) {
						vars.addArray(name, value)
					} else {
						vars.setVariable(name, value);
					}
				}
			}; break

			case OC.LABEL: {
			}; break

			case OC.FJMP: {
				const value = this.unwrapValue(this.pop());

				if (typeof value !== "boolean") {
					throw new VMError("FJMP: Value must be bool, but was " + typeof value)
				}

				if (value === false) {
					this.jmp(inst.label)
				}
			}; break

			case OC.JMP: {
				this.jmp(inst.label)
			}; break

			case OC.ESCOPE: {
				vars.escope(inst.isFun)
			}; break

			case OC.LSCOPE: {
				vars.lscope(false, this.currentState.stack)
			}; break

			case OC.MKARR: {
				const dims = this.popMany(inst.numDimensions).map(v => this.unwrapValue(v))
				dims.forEach(d => {
					if (typeof d !== "number") throw new Error("MKARR: Expeccted dimension to be number, but was " + typeof d)
				})
				vars.addEmptyArray(inst.name, dims as number[])
			}; break

			case OC.MKREF: {
				const pointer = this.pop()

				if (!vars.isPointer(pointer)) {
					throw new VMError("References must be pointer type, but was " + typeof pointer)
				}

				vars.makeReference(inst.name, pointer.pointer)
			}; break

			case OC.DEBUG: {
				this.currentState.idx++;
				return false;
			}
		}

		this.currentState.idx++;
		return true;
	}

	step() {
		const inst = this.fetch()
		if (!inst) return false;

		this.saveState()
		const retVal = this.exec(inst)

		if (this.currentState.ipStack.length > 20) {
			throw new VMError("Too much recursion.")
		}

		this.render(this.previousState, this.currentState)
		return retVal;
	}

	stepBack(): void {
		if (this.states.length >= 2) {
			this.render(this.currentState, this.previousState)
			this.states.pop();
		}
	}

	run() {
		let running = true;
		while (running) {
			running = this.step();
		}
	}
}
