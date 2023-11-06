import { Atom } from "../interfaces/astkinds.ts"
import { Pointer, State, Value } from "./vm.ts"

type DeepArray<T> = (T | DeepArray<T>)[]

export const enum ValueType {
	// Normal variable, (number, bool, string), no indirection.
	NORMAL,
	// Regular array (rows and cols are pre-set length)
	// array[m][n] = array[m * rowLength + n]
	ARRAY,
}

type Boundary = { isFun: boolean, lastIndex: number }
export type VariableBinding = { name: string, pointer: number }
export type ValueADT = { marked: boolean, value: Value } & (
	| { type: ValueType.NORMAL }
	| { type: ValueType.ARRAY, dimensions: number[] }
)

export class VariableError extends Error {
	constructor(msg: string) {
		super(msg)
	}
}

export class Variables {
	constructor(
		public bounds: Boundary[] = [],
		public bindings: VariableBinding[] = [],
		public values: ValueADT[] = [],
	) { }

	clone() {
		return new Variables(structuredClone(this.bounds), structuredClone(this.bindings), structuredClone(this.values))
	}

	escope(isFun: boolean) {
		this.bounds.push({ isFun, lastIndex: this.bindings.length })
	}

	lscope(untilFun: boolean, stack: State["stack"]) {
		if (untilFun) {
			const lastFun = this.bounds.findLastIndex(b => b.isFun)
			if (lastFun === -1) throw new VariableError("Attempting to leave function while not being in one.")

			// slice is non-end-inclusive so + 1
			this.bounds = this.bounds.slice(0, lastFun + 1)
		}

		const length = this.bounds.pop()?.lastIndex
		if (length === undefined || length === -1) throw new VariableError("Trying to leave scope without being in one.")

		this.mark()

		const varsLeavingScope = this.bindings.slice(length);
		this.bindings = this.bindings.slice(0, length)

		stack.forEach(e => {
			if (this.isPointer(e)) {
				this.setMark(e.pointer)
			}
		})

		this.sweep()
	}

	get activeScope() {
		const lastBinding = this.bounds.findLast(b => b.isFun)

		if (lastBinding !== undefined) {
			return this.bindings.slice(lastBinding.lastIndex)
		}

		return this.bindings
	}

	setMark(address: number) {
		const value = this.getBox(address);

		if (value.type === ValueType.ARRAY) {
			const length = value.dimensions.reduce((a,b) => a*b)

			for (let i = 0; i < length; i++) {
				const box = this.getBox(address + i)
				box.marked = true;
			}

		} else {
			value.marked = true;

			if (this.isPointer(value.value)) {
				this.setMark(value.value.pointer)
			}
		}
	}

	mark() {
		this.values.forEach(v => v.marked = false)
		this.bindings.forEach(binding => {
			this.setMark(binding.pointer)
		})
	}
	sweep() {
		this.values = this.values.filter(v => v.marked)
	}

	getAddressOrNull(name: string): number | null {
		return this.findBindingOrNull(name)?.pointer ?? null
	}

	getAddress(name: string): number {
		return this.findBinding(name).pointer
	}

	// NORMAL OPS

	makeReference(name: string, pointer: number) {
		const variable = this.findBindingOrNull(name);
		const box = this.getBox(pointer)

		if (variable) {
			const prevBox = this.getBox(variable.pointer)
			variable.pointer = pointer;
		} else {
			this.bindings.push({
				name,
				pointer
			})
		}
	}

	setVariable(name: string, value: Value) {
		const variable = this.findBindingOrNull(name);

		if (variable) {
			const box = this.getBox(variable.pointer)
			box.value = value;
		} else {
			const binding = {
				name,
				pointer: this.addBox(value)
			}

			this.bindings.push(binding)
		}
	}

	getVariable(name: string): Value {
		return this.getBox(this.getAddress(name)).value
	}

	getVariableOrNull(name: string): Value | null {
		const address = this.getAddressOrNull(name);
		if (address === null) return null;

		return this.getBoxOrNull(address)?.value ?? null
	}

	valueToString(value: Value | Value[]): string {
		if (Array.isArray(value)) {
			return `[${value.map(v => this.valueToString(v)).join(", ")}]`
		} else if (this.isPointer(value)) {
			const box = this.getBox(value.pointer)

			if (box.type === ValueType.NORMAL) {
				return this.valueToString(box.value)
			} else {
				const rawArray = this.getArrayByAddr(value.pointer)
				return this.valueToString(rawArray as Value[])
			}
		} else {
			return String(value)
		}
	}

	isPointer(x: Value | Value[]): x is Pointer {
		return !Array.isArray(x) && typeof x === "object" && "pointer" in x;
	}

	// ARRAY OPS
	addArray(name: string, array: DeepArray<Value>) {
		const dimensions: number[] = this.getDimensions(array)
		this.makeReference(name, this.addArrayRef(array, dimensions));
	}

	addArrayRef(array: DeepArray<Value>, dimensions: number[]) {
		const values = (array.flat(Infinity as 1) as Value[]);

		const base = this.values.length
		this.values.push({
			dimensions,
			marked: true,
			type: ValueType.ARRAY,
			value: values[0]
		})


		const rest: ValueADT[] = values.slice(1).map(value => ({ marked: true, value, type: ValueType.NORMAL }))
		this.values = this.values.concat(rest)

		return base;
	}

	addEmptyArray(name: string, dimensions: number[]) {
		const length = dimensions.reduce((a, b) => a * b, 1)
		const arr: number[] = Array.from<number>({ length }).fill(0)
		const base = this.addArrayRef(arr, dimensions);

		this.makeReference(name, base);
	}

	setArrayElem(name: string, indexes: number[], value: Value) {
		const box = this.getArrayBox(name, indexes)
		box.value = value
	}


	getArrayElem(name: string, indexes: number[]): Value {
		const box = this.getArrayBox(name, indexes)
		return box.value
	}

	isArray(name: string): boolean {
		const base = this.getAddressOrNull(name)
		if (base === null) return false;

		const box = this.getBoxOrNull(base)

		return box !== null && box.type === ValueType.ARRAY;
	}

	getArrayElemAddr(name: string, indexes: number[]): number {
		const base = this.getAddress(name)
		const box = this.getBox(base)
		if (box.type !== ValueType.ARRAY) throw new VariableError(`${name}: Isn't an array variable!`)

		const index = this.calculateIndex(box, indexes)

		return base + index
	}

	getArray(name: string): DeepArray<Value> {
		const base = this.getAddress(name)
		const box = this.getBox(base)
		if (box.type !== ValueType.ARRAY) throw new VariableError(`${name}: Isn't an array variable!`)

		const length = box.dimensions.reduce((a, b) => a * b, 1)
		return this.values.slice(base, base + length).map(v => v.value)
	}

	getArrayByAddr(base: number): DeepArray<Value> {
		const box = this.getBox(base)
		if (box.type !== ValueType.ARRAY) throw new VariableError(`${base}: Isn't an array variable!`)

		const length = box.dimensions.reduce((a, b) => a * b, 1)
		return this.values.slice(base, base + length).map(v => v.value)
	}

	// HELPERS

	private addBox(value: Value): number {
		this.values.push({
			marked: true,
			type: ValueType.NORMAL,
			value
		})

		return this.values.length - 1;
	}

	private findBindingOrNullGlobal(name: string): VariableBinding | null {
		const idx = this.bindings.findLastIndex(b => b.name === name);
		if (idx === -1) return null;

		return this.bindings[idx];
	}

	private findIndexOrNull(name: string): number | null {
		// If there are no function boundary, findLastIndex will return -1, so we just default to the outermost scope, hence the max(0).
		const lastFunBound = Math.max(this.bounds.findLastIndex(b => b.isFun), 0)
		const lastIndex = this.bounds.at(lastFunBound)?.lastIndex
		if (lastIndex === undefined) throw new VariableError("No scope.")

		const vars = this.bindings.slice(lastIndex)
		const idx = vars.findLastIndex(v => v.name === name);
		if (idx === -1) return null;

		return lastIndex + idx;
	}

	private findIndex(name: string): number {
		const idx = this.findIndexOrNull(name)
		if (idx === null) throw new VariableError(`${name}: No such variable!`)

		return idx;
	}

	private findBindingOrNull(name: string): VariableBinding | null {
		const idx = this.findIndexOrNull(name)
		if (idx === null) return null;
		return this.bindings[idx];
	}

	findBinding(name: string): VariableBinding {
		return this.bindings[this.findIndex(name)];
	}

	private getBoxOrNull(pointer: number): ValueADT | null {
		const box = this.values.at(pointer)
		if (box === undefined) return null;

		return box
	}

	getBox(pointer: number): ValueADT {
		const box = this.values.at(pointer)
		if (box === undefined) throw new VariableError(`No box at address ${pointer}!`)

		return box
	}

	// ARRAY HELPERS

	getDimensions(arr: DeepArray<Value>): number[] {
		let curr: Value | DeepArray<Value> = arr;
		let dims = [];

		while (Array.isArray(curr)) {
			dims.push(curr.length)
			curr = curr[0]
		}

		return dims
	}

	calculateIndex(box: ValueADT, indexes: number[]): number {
		if (box.type === ValueType.NORMAL) throw new VariableError(`Box isn't an array variable!`)

		// Drops the first element and adds 1 at the end.
		// Suppose we have a 4x5x6 array and we want to get [3,2,4]
		//   [3,2,4]
		//     \ \ \
		//  (4) 5 6 1
		// To step in dimension n, you have to add (n-1)'s length to the array.
		const lengths = box.dimensions.slice(1).concat(1)
		// To stay with the previous example, here we'd calculate
		// (3 * 5) + (2 * 6) + (4 * 1) = 31 as our index.
		const index = indexes.reduce((prev, curr, idx) => prev + (curr * lengths[idx]), 0)

		return index;
	}

	getArrayBox(name: string, indexes: number[]): ValueADT {
		const base = this.getAddress(name)
		const box = this.getBox(base)
		if (box.type !== ValueType.ARRAY) throw new VariableError(`${name}: Isn't an array variable!`)

		const index = this.calculateIndex(box, indexes)

		return this.getBox(base + index)
	}
}
