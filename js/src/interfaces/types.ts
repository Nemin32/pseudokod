import { FunctionDeclaration } from "./astkinds.ts";

export enum TypeVariants {
	SIMPLE = 0,
	ARRAY = 1,
	REFERENCE = 2,
	HETEROGENOUS = 3,
	FUNCTION = 4,
	GENERIC = 5,

	NONE = 6,
	UNKNOWN = 7,
}

export enum BaseType {
	NUMBER = 0,
	STRING = 1,
	LOGIC = 2,
}

export class SimpleType {
	readonly kind = TypeVariants.SIMPLE;
	constructor(readonly t: BaseType) { }
}

export class ArrayType {
	readonly kind = TypeVariants.ARRAY;
	constructor(readonly t: Type) { }
}

export class ReferenceType {
	readonly kind = TypeVariants.REFERENCE;
	constructor(readonly t: Type) { }
}

export class HeterogenousArrayType {
	readonly kind = TypeVariants.HETEROGENOUS;
	ts: Type[]
	constructor(ts: Type[]) { this.ts = ts.sort() }
}

export class NoneType {
	readonly kind = TypeVariants.NONE;
}

export class UnknownType {
	readonly kind = TypeVariants.UNKNOWN;
}

export class FunctionType {
	readonly kind = TypeVariants.FUNCTION;

	constructor(readonly rType: Type, readonly argTypes: Type[] | null, readonly decl: FunctionDeclaration | null) { }
}

export class GenericType {
	readonly kind = TypeVariants.GENERIC;

	constructor(readonly name: string) { }
}

export type Type = SimpleType | ArrayType | ReferenceType | HeterogenousArrayType | FunctionType | NoneType | UnknownType | GenericType;

export const [NUMBER, LOGIC, STRING, NONE, UNKNOWN] = [
	new SimpleType(BaseType.NUMBER),
	new SimpleType(BaseType.LOGIC),
	new SimpleType(BaseType.STRING),
	new NoneType(),
	new UnknownType()
]
