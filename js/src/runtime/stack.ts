import { IStack, NestedArray, StringToType } from "./interfaces.ts";

export class Stack implements IStack {
  private constructor(private stack: Readonly<Array<NestedArray>> = []) {}
  public static init() {return new Stack([])}

  get length() {
    return this.stack.length;
  }

  reset(): IStack {
    return new Stack();
  }

  push(val: NestedArray): IStack {
    return new Stack([...this.stack, val]);
  }

  private checkType<K extends keyof StringToType>(type: K, value: NestedArray): value is StringToType[K] {
    return (type == "any") || (type == "array" && Array.isArray(value)) || (typeof value == type);
  }

  pop<K extends keyof StringToType>(type: K): [StringToType[K], IStack] {
    if (this.stack.length == 0) {
      throw new Error("Stack is empty!");
    }

    const [val, ...rest] = this.stack;

    if (!this.checkType(type, val)) {
      throw new Error("Expected type was " + type + ", but received " + typeof val + ".");
    }

    return [val as StringToType[K], new Stack(rest)];
  }
}
