import { ValueADT, VariableBinding } from "../runtime/variables.ts";
import { State, Value } from "../runtime/vm.ts";

enum ComparisonResult {
	SAME,
	CHANGED,
	DELETED,
	NEW
}

type Comparison<T> = { state: ComparisonResult, value: T }

const compare = <T>(oldArr: T[], newArr: T[], compFn: (a: T, b: T) => boolean): Comparison<T>[] => {
	const vals = oldArr.map((o, idx) => {
		const newVal = newArr.at(idx)
		if (!newVal) return ({ state: ComparisonResult.DELETED, value: o })
		return ({ state: compFn(o, newVal) ? ComparisonResult.SAME : ComparisonResult.CHANGED, value: newVal })
	})

	const newVals = newArr.slice(oldArr.length).map(v => ({ state: ComparisonResult.NEW, value: v }))

	return vals.concat(newVals)
}

function getDifferences(prev: State, current: State): {
	stack: Comparison<Value>[],
	ipStack: Comparison<number>[],
	bindings: Comparison<VariableBinding>[],
	memory: Comparison<ValueADT | null>[]
} {
	const stack = compare(prev.stack, current.stack, (a, b) => a === b)
	const ipStack = compare(prev.ipStack, current.ipStack, (a, b) => a === b)
	const bindings = compare(prev.vars.activeScope, current.vars.activeScope, (a, b) =>
		a.name === b.name
		&& a.pointer === b.pointer
		&& prev.vars.getVariableOrNull(a.name) === current.vars.getVariableOrNull(b.name))


	const isSame = (a: ValueADT | null, b: ValueADT | null): boolean => {
		if (a === null) {
			return a === b
		} else {
			if (b === null) {
				return false;
			}

			return a.type === b.type && a.value === b.value
		}
	}

	const memory = compare(prev.vars.values, current.vars.values, isSame)

	return { stack, ipStack, bindings, memory }
}

function renderSpan<T>(comp: Comparison<T>, getter: (c: Comparison<T>) => string): HTMLSpanElement {
	const span = document.createElement("span");
	span.classList.add(ComparisonResult[comp.state].toLowerCase());
	span.innerText = getter(comp)
	return span
}

export function render(prev: State, current: State): {
	stackSpans: HTMLSpanElement[],
	ipStackSpans: HTMLSpanElement[],
	varsSpans: HTMLSpanElement[],
	memorySpans: HTMLSpanElement[]
} {
	const { stack, ipStack, bindings, memory } = getDifferences(prev, current);

	const varsSpans = bindings.map(s => renderSpan(s, (s) => {
		if (s.state === ComparisonResult.DELETED) {
			return `${s.value.name} => [DELETED]`
		} else {
			const value = current.vars.isArray(s.value.name) ?
				current.vars.getArray(s.value.name)
				: current.vars.getVariableOrNull(s.value.name) ?? "[DOESN'T EXIST]"

			return `${s.value.name} => ${value}`
		}
	}))

	const stackSpans = stack.map(s => renderSpan(s, ({value}) => {
		const valueString = current.vars.valueToString(value)

		if (current.vars.isPointer(value)) {
			return `&${value.pointer} => ${valueString}`
		} else {
			return valueString
		}
	}))

	const memorySpans = memory.map((s, i) => renderSpan(s, (s) => {
		if (s.value === null) {
			return `${String(i).padStart(3)}: NULL`
		}

		const content = (current.vars.isPointer(s.value.value))
			? `&${s.value.value.pointer}`
			: String(s.value.value)

		return `${String(i).padStart(3)}: ${content.padStart(3)}`
	}))

	return {
		stackSpans,
		ipStackSpans: ipStack.map(s => renderSpan(s, (c) => String(c.value))),
		varsSpans,
		memorySpans
	}
}
