import { AtomValue, Value } from "../compiler/pseudo_types.ts";
import { Box, IBox } from "./box.ts";

type ArrayHead = { length: number; start: number };

function splitArray<T>(array: T[], n: number): [T[], T, T[]] {
  return [array.slice(0, n - 1), array[n], array.slice(n + 1)];
}

type StoreValue = AtomValue | ArrayHead;

type NestedArray = AtomValue | (AtomValue | NestedArray)[];
type NestedBoxArray = StoreValue | (StoreValue | NestedBoxArray)[];

export class ImmutableStore {
  private constructor(readonly counter: number, readonly boxes: IBox<StoreValue>[]) {}
  static init() {
    return new ImmutableStore(0, []);
  }

  get(idx: number): NestedArray {
    if (idx > this.counter) throw new Error(`Addressed memory (${idx}) is outside bounds (${this.counter}).`);

    const value = this.boxes[idx].get();

    // Value is ArrayHead
    if (typeof value == "object") {
      return this.getArray(value);
    }

    return value;
  }

  getArray(value: ArrayHead): NestedArray {
    const output: NestedArray = [];

    for (let i = 0; i < value.length; i++) {
      output.push(this.get(value.start + i));
    }

    return output;
  }

  getBox(idx: number): IBox<StoreValue> {
    return this.boxes[idx];
  }

  getArrayElementBoxIndex(arrayPtr: number, offset: number): number {
    const arrayHead = this.get(arrayPtr);

    if (!this.isArrayHead(arrayHead)) throw new Error("Pointer wasn't pointing at array head.");
    if (offset > arrayHead.length) throw new Error("Out-of-bounds.");

    return arrayHead.start + offset;
  }

  getArrayElementBox(arrayPtr: number, offset: number): IBox<StoreValue> {
    return this.getBox(this.getArrayElementBoxIndex(arrayPtr, offset));
  }

  getArrayElement(arrayPtr: number, offset: number): NestedArray {
    return this.get(this.getArrayElementBoxIndex(arrayPtr, offset));
  }

  set(idx: number, value: StoreValue): ImmutableStore {
    const [bh, box, bt] = splitArray(this.boxes, idx);
    const newBox = box.set(value);
    return new ImmutableStore(this.counter, [...bh, newBox, ...bt]);
  }

  add(value: NestedArray): [ImmutableStore, number] {
    const [boxes, counter, index, { box, start }] = this.inner_add([], this.counter, 0, value, true);
    return [new ImmutableStore(counter + index, [...this.boxes, ...boxes]), start];
  }

  private inner_add(
    boxes: IBox<StoreValue>[],
    counter: number,
    index: number,
    value: NestedBoxArray,
    root: boolean
  ): [IBox<StoreValue>[], number, number, { box: IBox<StoreValue>; start: number }] {
    if (!Array.isArray(value)) {
      const box = Box.init(value);
      const start = index;

      if (root) {
        boxes[index++] = box;
      }

      return [boxes, counter, index, { box, start }];
    }

    const offset = root ? 1 : 0;
    const [_, __, newIndex, obj] = this.inner_add(boxes, counter, index, { length: value.length, start: counter + index + offset }, root);
    index = newIndex + value.length;

    for (let i = 0; i < value.length; i++) {
      boxes[i + offset] = this.inner_add(boxes, counter, index, value[i], false)[3].box;
    }

    return [boxes, counter, index, obj];
  }

  isArrayHead(head: any): head is ArrayHead {
    if (typeof head == "object" && head.hasOwnProperty("length") && head.hasOwnProperty("start")) {
      return true;
    }

    return false;
  }
}

/*
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

*/
