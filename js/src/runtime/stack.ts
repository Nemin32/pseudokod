export class Stack<T> {
  private stack: Array<T> = [];

  constructor(private callback: (stack: T[]) => void) {}

  get length() {
    return this.stack.length;
  }

  push(val: T) {
    this.stack.push(val);
    this.callback(this.stack);
  }

  pop(): T {
    if (this.stack.length == 0) {
      throw new Error("Stack is empty!");
    }

    return this.stack.pop() as T;
  }
}
