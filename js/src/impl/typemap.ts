import { GenericType, Type } from "../interfaces/types.ts";


type Binding = { name: string, type: Type }
export class TypeMap {
	constructor(readonly types: Binding[], readonly substitutions: Binding[]) { }

	with(name: string, type: Type): TypeMap {
		return new TypeMap([...this.types, { name, type }], this.substitutions);
	}

	substitute(name: string, type: Type): TypeMap {
		return new TypeMap(this.types, [...this.substitutions, { name, type }]);
	}

	private find(name: string): Binding | undefined {
		const first = this.types.find(t => t.name === name);
		if (!first) return undefined;

		if (first.type instanceof GenericType) {
			return this.substitutions.find(t => t.name === (first.type as GenericType).name) ?? first
		}

		return first
	}

	/*
realize(t: Type) {
	if (t instanceof GenericType) {
		return this.substitutions.find(t => t.name === (first.type as GenericType).name) ?? first
	}
}
	 */

	exists(name: string): boolean {
		return this.find(name) !== undefined
	}

	get(name: string): Type {
		const val = this.find(name)
		if (!val) throw new Error(`${name} has no binding.`)

		return val.type
	}

	getSubst(gt: GenericType): Type {
		const type = this.substitutions.find(t => t.name === gt.name)?.type
		//if (!type) throw new Error(`${t.name} has no substitution.`)

		return type ?? gt;
	}
}
