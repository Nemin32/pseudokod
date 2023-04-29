export enum BaseType {
  NUMBER = 1 << 0,
  STRING = 1 << 1,
  LOGIC = 1 << 2,
  UNKNOWN = 1 << 3,

  ARRAY = 1 << 4,

  NONE = 0,
}

enum TypeVariant {
  SIMPLE,
  ARRAY,
  OR,
  AND,
}

export abstract class Type {
  abstract show(): string;
  abstract isBaseType(type: BaseType): boolean;

  isArray(): this is ArrayType {
    return this instanceof ArrayType;
  }
  isSimple(): this is SimpleType {
    return this instanceof SimpleType;
  }
  isOr(): this is OrType {
    return this instanceof OrType;
  }
  isAnd(): this is AndType {
    return this instanceof AndType;
  }

  ensure(type: Type, message?: string): this is typeof type {
    if (!compare(this, type)) throw new Error(message ?? "Expected type '" + type.show() + "', got '" + this.show() + "'.");
    return true;
  }

  toString(): string {
    return this.show();
  }
}

export class SimpleType extends Type {
  readonly variant: TypeVariant.SIMPLE = TypeVariant.SIMPLE;

  readonly t: BaseType;
  readonly isArr: boolean;

  constructor(t: BaseType) {
    super();

    this.t = <BaseType>(t & ~BaseType.ARRAY);
    this.isArr = (t & BaseType.ARRAY) > 0;
  }

  isArray(): boolean {
    return this.isArr;
  }

  show(): string {
    const val = (() => {
      switch (this.t) {
        case BaseType.NUMBER:
          return "NUMBER";
        case BaseType.STRING:
          return "STRING";
        case BaseType.LOGIC:
          return "LOGIC";
        case BaseType.UNKNOWN:
          return "UNKNOWN";
        case BaseType.NONE:
          return "NONE";

        case BaseType.ARRAY:
          throw new Error("A type can't just be an array.");
      }
    })();

    return val + (this.isArr ? " ARRAY" : "");
  }

  isBaseType(type: BaseType): boolean {
    return this.t == type;
  }
}

export class ArrayType extends Type {
  readonly variant: TypeVariant.ARRAY = TypeVariant.ARRAY;

  constructor(readonly inner: Type) {
    super();
  }

  show(): string {
    return this.inner.show() + " ARRAY";
  }

  isBaseType(type: BaseType): boolean {
    return this.inner.isBaseType(type);
  }
}

export const [NUMBER, STRING, LOGIC, UNKNOWN, NONE, NARRAY, SARRAY, LARRAY] = [
  new SimpleType(BaseType.NUMBER),
  new SimpleType(BaseType.STRING),
  new SimpleType(BaseType.LOGIC),
  new SimpleType(BaseType.UNKNOWN),
  new SimpleType(BaseType.NONE),

  new SimpleType(BaseType.NUMBER | BaseType.ARRAY),
  new SimpleType(BaseType.STRING | BaseType.ARRAY),
  new SimpleType(BaseType.LOGIC | BaseType.ARRAY),
];

export function strToType(str: string): Type {
  const [first, second] = str.split(" ");

  const t = (() => {
    switch (first) {
      case "egész":
        return BaseType.NUMBER;
      case "szöveg":
        return BaseType.STRING;
      case "logikai":
        return BaseType.LOGIC;
      default:
        return BaseType.UNKNOWN;
    }
  })();

  if (t == BaseType.UNKNOWN) return UNKNOWN;

  return new SimpleType(t | (second == "tömb" ? BaseType.ARRAY : 0));
}

export class OrType extends Type {
  readonly variant: TypeVariant.OR = TypeVariant.OR;

  constructor(readonly t1: Type, readonly t2: Type) {
    super();
  }
  show(): string {
    return `${this.t1.show()} | ${this.t2.show()}`;
  }

  isArray(): boolean {
    return this.t1.isArray() && this.t2.isArray();
  }

  isBaseType(type: BaseType): boolean {
    return this.t1.isBaseType(type) && this.t2.isBaseType(type);
  }

}

export class AndType extends Type {
  readonly variant: TypeVariant.AND = TypeVariant.AND;

  constructor(readonly ts: Type[]) {
    super();
  }

  isArray(): boolean {
    return this.ts.every((t) => t.isArray());
  }

  show(): string {
    return "[" + this.ts.map((t) => t.show()).join(", ") + "]";
  }

  isBaseType(_type: BaseType): boolean {
    return false;
  }
  isSimple(): this is SimpleType {
    return false;
  }
  isOr(): this is OrType {
    return false;
  }
  isAnd(): this is AndType {
    return true;
  }
}

export function compare(t1: Type, t2: Type): boolean {
  if (t1.isSimple() && t2.isSimple()) return t1.t == t2.t && t1.isArr == t2.isArr;

  if (t1.isOr() && t2.isOr()) return (compare(t1.t1, t2.t1) && compare(t1.t2, t2.t2)) || (compare(t1.t1, t2.t2) && compare(t1.t2, t2.t1));

  if (t1.isAnd() && t2.isAnd() && t1.ts.length == t2.ts.length) {
    const st1s = t1.ts.toSorted();
    const st2s = t2.ts.toSorted();

    return st1s.every((ts1, idx) => compare(ts1, st2s[idx]));
  }

  return false;
}

export function simplify(input: Type): Type {
  if (input instanceof SimpleType) return input;

  if (input instanceof OrType) {
    const st1 = simplify(input.t1);
    const st2 = simplify(input.t2);

    if (compare(st1, st2)) {
      return st1;
    }

    // if (compare(st1, NONE)) return st2;
    // if (compare(st2, NONE)) return st1;

    return new OrType(st1, st2);
  }

  if (input instanceof AndType) {
    const sts = [...new Set(input.ts.map(simplify))]; // .filter(t => !compare(t, NONE));
    if (sts.length == 1) return sts[0];
    if (sts.length == 0) return NONE;

    return new AndType(sts);
  }

  throw new Error("Should never happen.");
}

export type Env = Map<string, Type>;
