// rome-ignore lint/suspicious/noExplicitAny: <explanation>
abstract class ParserBase<E extends string | any[], T> {
  constructor(private input: E) {}
  private index = 0;

  peek(): E | null {
    if (this.index >= this.input.length) return null;
    return this.input[this.index];
  }

  eat(): E | null {
    if (this.index >= this.input.length) return null;
    return this.input[this.index++];
  }

  tryParse(fn: () => T | null): T | null {
    const prevIdx = this.index;
    const value = fn.call(this);

    if (value) return value;

    this.index = prevIdx;
    return null;
  }

  abstract parse(): T;
}