export class Stack<T> {
  private stack: Array<T> = [];

  get length() {
    return this.stack.length;
  }

  push(val: T) {
    this.stack.push(val);
  }

  pop(): T {
    if (this.stack.length == 0) {
      throw new Error("Stack is empty!");
    }

    return this.stack.pop() as T;
  }
}
