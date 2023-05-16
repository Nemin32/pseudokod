import { IBindings, IStack, NestedArray, StringToType } from "./interfaces.ts";

export class Stack implements IStack {
  private constructor(
    readonly callback: IBindings["stack"],
    readonly stack: Readonly<Array<NestedArray>> = [],
  ) {
    this.callback(this.stack);
  }

  public static init(callback: IBindings["stack"]) {
    return new Stack(callback, []);
  }

  get length() {
    return this.stack.length;
  }

  reset(): IStack {
    return new Stack(this.callback);
  }

  push(val: NestedArray): IStack {
    return new Stack(this.callback, [val, ...this.stack]);
  }

  private checkType<K extends keyof StringToType>(
    type: K,
    value: NestedArray,
  ): value is StringToType[K] {
    return type === "any" || (type === "array" && Array.isArray(value)) || typeof value === type;
  }

  pop<K extends keyof StringToType>(type: K): [StringToType[K], IStack] {
    if (this.stack.length === 0) {
      throw new Error("Stack is empty!");
    }

    const [val, ...rest] = this.stack;

    if (!this.checkType(type, val)) {
      throw new Error(`Expected type was ${type}, but received ${typeof val}.`);
    }

    const retval: [StringToType[K], Stack] = [
      val as StringToType[K],
      new Stack(this.callback, rest),
    ];

    return retval;
  }
}
