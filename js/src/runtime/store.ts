import { Box } from "./box.ts";

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

  private internal_add<T>(value: T | T[], root: boolean): {box: Box<any>, start: number} {
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

  arrayGet(idx: number): any[] {
    const head = this.get(idx);
    const arr: any[] = [];

    if (typeof head != "object" || !head.hasOwnProperty("length") || !head.hasOwnProperty("start")) {
      throw new Error("arrayGet: Not an array pointer head.");
    }

    for (let i = 0; i < head.length; i++) {
      arr.push(this.get(head.start + i))
    }

    return arr;
  }
}
