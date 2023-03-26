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

  pop<K extends keyof StT>(type: K): StT[K]
  {
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
  "string": string,
  "number": number,
  "boolean": boolean,
  "any": any
}
