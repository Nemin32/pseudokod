import { Box } from "./box.ts";

type ArrayHead = {length: number, start: number};

export class Store {
  counter: number = 0;
  boxes: Box<any>[] = [];

  reset() {
    this.counter = 0;
    this.boxes = [];
  }

  get(idx: number) {
    return this.boxes[idx].get();
  }

  getBox(idx: number): Box<any> {
    return this.boxes[idx];
  }

  set<T>(idx: number, value: T) {
    this.boxes[idx].set(value);
  }

  public add<T>(value: T | T[]): number {
    return this.internal_add(value, true).start;
  }

  private internal_add<T>(value: T | T[], root: boolean): {box: Box<T | ArrayHead>, start: number} {
    if (!Array.isArray(value)) {
      const box = new Box(value);
      const start = this.counter;

      if (root) {
        this.boxes[this.counter++] = box;
      }

      return {box, start};
    }

    const offset = (root) ? 1 : 0;
    let {box, start} = this.internal_add({length: value.length, start: this.counter + offset}, root);
    this.counter += value.length;

    for (let i = 0; i < value.length; i++) {
      this.boxes[start + i + offset] = this.internal_add(value[i], false).box;
    }

    return {box, start};
  }

  getArrayElementBoxIndex(headIdx: number, offset: number): number {
    const head = this.get(headIdx);
    if (!this.isArrayHead(head)) {
      throw new Error("getArrayElementBoxIndex: Not an array head pointer.");
    }

    if (offset > head.length) {
      throw new Error("getArrayElementBoxIndex: Out-of-bounds");
    }

    return head.start + offset;
  }

  getArrayElement<T>(headIdx: number, offset: number): T {
    return this.get(this.getArrayElementBoxIndex(headIdx, offset));
  }

  isArrayHead(head: object): head is ArrayHead {
    if (typeof head == "object" && head.hasOwnProperty("length") && head.hasOwnProperty("start")) {
      return true;
    }

    return false;
  }

  getArray(idx: number): any[] {
    const head = this.get(idx);
    if (!this.isArrayHead(head)) {
      throw new Error("arrayGet: Not an array head pointer.");
    }

    const arr: any[] = [];
    for (let i = 0; i < head.length; i++) {
      arr.push(this.get(head.start + i))
    }

    return arr;
  }
}
