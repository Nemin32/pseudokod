import { ArrayType, FunctionType, GenericType, HeterogenousArrayType, NUMBER, ReferenceType, Type, TypeVariants } from "../interfaces/types.ts";
import { TypeCheckError } from "./typecheck.ts";

type Binding = { name: string, type: Type }
export class TypeMap {
	constructor(readonly types: Binding[], readonly substitutions: Binding[]) { }

	clone(): MutableTypeMap {
		return new MutableTypeMap(structuredClone(this.types), structuredClone(this.substitutions));
	}

	with(name: string, type: Type): TypeMap {
		return new TypeMap([...this.types, { name, type }], this.substitutions);
	}

	substitute(name: string, type: Type): TypeMap {
		return new TypeMap(this.types, [...this.substitutions, { name, type }]);
	}

	extract(type: Type): Type {
		switch (type.kind) {
			case TypeVariants.SIMPLE: return type;
			case TypeVariants.ARRAY: return new ArrayType(this.extract(type.t))
			case TypeVariants.REFERENCE: return new ReferenceType(this.extract(type.t))
			case TypeVariants.HETEROGENOUS: return new HeterogenousArrayType(type.ts.map(t => this.extract(t)))
			case TypeVariants.FUNCTION: return new FunctionType(this.extract(type.rType), type.argTypes?.map(t => this.extract(t)) ?? null, type.decl)
			case TypeVariants.GENERIC: return this.substitutions.find(s => s.name === type.name)?.type ?? type
			case TypeVariants.NONE: return type
			case TypeVariants.UNKNOWN: return type
		}
	}

	maybeGet(name: string): Type | null {
		const val = this.types.findLast(t => t.name === name);
		if (val === undefined) return null

		return this.extract(val.type)
	}

	get(name: string): Type {
		const val = this.types.findLast(t => t.name === name);
		if (val === undefined) throw new TypeCheckError(`${name} has no binding.`)

		return this.extract(val.type)
	}
}

export class MutableTypeMap extends TypeMap {
	mutableWith(name: string, type: Type): MutableTypeMap {
		this.types.push({name, type});
		return this;
	}

	mutableSubstitute(name: string, type: Type) {
		this.substitutions.push({name, type});
		return this;
	}
}