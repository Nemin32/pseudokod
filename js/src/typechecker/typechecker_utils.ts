import { parseProgram } from "../compiler/pseudo_parser.ts";
import { AST } from "../compiler/pseudo_types.ts";
import { Tokenizer } from "../parser/tokenizer.ts";

export enum BaseType {
  NUMBER,
  STRING,
  LOGIC,
  UNKNOWN,
  NONE,
}

export abstract class Type {
  abstract show(): string;
  abstract isBaseType(type: BaseType): boolean;

  abstract isSimple(): this is SimpleType;
  abstract isOr(): this is OrType;
  abstract isAnd(): this is AndType;

  ensure(type: Type, message?: string): this is typeof type {
    if (!compare(this, type)) throw new Error(message ?? "Expected type '" + type.show() + "', got '" + this.show() + "'.");
    return true;
  }
}

export class SimpleType extends Type {
  constructor(readonly t: BaseType) {
    super();
  }

  show(): string {
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
    }
  }

  isBaseType(type: BaseType): boolean {
    return this.t == type;
  }
  isSimple(): this is SimpleType {
    return true;
  }
  isOr(): this is OrType {
    return false;
  }
  isAnd(): this is AndType {
    return false;
  }
}

export const [NUMBER, STRING, LOGIC, UNKNOWN, NONE] = [
  new SimpleType(BaseType.NUMBER),
  new SimpleType(BaseType.STRING),
  new SimpleType(BaseType.LOGIC),
  new SimpleType(BaseType.UNKNOWN),
  new SimpleType(BaseType.NONE),
];

export function strToType(str: string): Type {
  switch (str) {
    case "egész": return NUMBER;
    case "szöveg": return STRING;
    case "logikai": return LOGIC;
  }

  return UNKNOWN;
}

export class OrType extends Type {
  constructor(readonly t1: Type, readonly t2: Type) {
    super();
  }
  show(): string {
    return `${this.t1.show()} | ${this.t2.show()}`;
  }

  isBaseType(type: BaseType): boolean {
    return this.t1.isBaseType(type) && this.t2.isBaseType(type);
  }
  isSimple(): this is SimpleType {
    return false;
  }
  isOr(): this is OrType {
    return true;
  }
  isAnd(): this is AndType {
    return false;
  }
}

export class AndType extends Type {
  constructor(readonly ts: Type[]) {
    super();
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
  if (t1.isSimple() && t2.isSimple()) return t1.t == t2.t;

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
    const sts = [...new Set(input.ts.map(simplify))] // .filter(t => !compare(t, NONE));
    if (sts.length == 1) return sts[0];
    if (sts.length == 0) return NONE;

    return new AndType(sts);
  }

  throw new Error("Should never happen.");
}

export type Env = Map<string, Type>;