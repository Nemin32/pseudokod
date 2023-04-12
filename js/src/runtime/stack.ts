import { Atom } from "../compiler/pseudo_types";

type Value = Atom["value"]

export class ImmutableStack {
  private constructor(private stack: Readonly<Array<Value>> = []) {}
  public static init() {return new ImmutableStack([])}

  get length() {
    return this.stack.length;
  }

  reset(): ImmutableStack {
    return new ImmutableStack();
  }

  push(val: Value): ImmutableStack {
    return new ImmutableStack([...this.stack, val]);
  }

  pop<K extends keyof StT>(type: K): [StT[K], ImmutableStack] {
    if (this.stack.length == 0) {
      throw new Error("Stack is empty!");
    }

    const [val, ...rest] = this.stack;

    if (type !== "any" && typeof val != type) {
      throw new Error("Expected type was " + type + ", but received " + typeof val + ".");
    }

    return [val as StT[K], new ImmutableStack(rest)];
  }
}

export class Stack<T extends number | string | boolean> {
  private stack: Array<T> = [];

  constructor(private callback: (stack: T[]) => void) {}

  get length() {
    return this.stack.length;
  }

  reset() {
    this.stack = [];
  }

  push(val: T) {
    this.stack.push(val);
    // this.callback(this.stack);
  }

  pop<K extends keyof StT>(type: K): StT[K] {
    if (this.stack.length == 0) {
      throw new Error("Stack is empty!");
    }

    const val = this.stack.pop() as T;

    if (type !== "any" && typeof val != type) {
      throw new Error("");
    }

    return val as unknown as StT[K];
  }
}

interface StT {
  string: string;
  number: number;
  boolean: boolean;
  any: any;
}
