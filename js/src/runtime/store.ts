import { Box } from "./box.ts";
import { ArrayHead, IBox, IStore, NestedArray, NestedBoxArray, StoreValue } from "./interfaces.ts";

enum MemCellType {
  VALUE,
  REFERENCE,
}

interface IMemCell {
  id: number;
  content: NestedArray;
  next: IMemCell | null;
  rc: number;
  type: MemCellType;

  shouldBeFreed(): boolean;
  addReference(): void;
  removeReference(): boolean;
}

interface IImmutableMemcell {
  id: number;
  content: NestedArray;
  next: IMemCell | null;
  rc: number;
  type: MemCellType;

  shouldBeFreed(): boolean;
  addReference(): IImmutableMemcell;
  removeReference(): [IImmutableMemcell, boolean];
}

interface IAllocator {
  allocate(value: NestedArray): number;
  reference(id: number): number;
  deallocate(id: number): void;

  gc(): void;
  get(id: number, shouldDereference: boolean): IMemCell | null;
  set(id: number, value: NestedArray): void;
}

interface IImmutableAllocator {
  allocate(value: NestedArray): [IImmutableAllocator, number];
  reference(id: number): [IImmutableAllocator, number];
  deallocate(id: number): IImmutableAllocator;

  gc(): IImmutableAllocator;
  get(id: number, shouldDereference: boolean): IMemCell | null;
  set(id: number, value: NestedArray): IImmutableAllocator;
}

class MemCell implements IMemCell {
  next: IMemCell | null = null;
  rc = 1;

  constructor(readonly id: number, public content: NestedArray, public type: MemCellType) {}

  shouldBeFreed(): boolean {
    return this.rc == 0;
  }

  addReference(): void {
    this.rc++;
  }

  removeReference(): boolean {
    this.rc--;
    return this.shouldBeFreed();
  }
}

class Allocator implements IAllocator {
  head: IMemCell | null = null;
  id = 0;

  allocate(value: NestedArray): number {
    if (this.head) {
      const tail = new MemCell(this.id++, value, MemCellType.VALUE);
      tail.next = this.head;
      this.head = tail;
    } else {
      this.head = new MemCell(this.id++, value, MemCellType.VALUE);
    }

    return this.head.id;
  }

  reference(id: number): number {
    if (!this.head) throw new Error("Cannot make a reference with an empty list.");

    const cell = this.get(id, false);
    if (!cell) throw new Error(`Can't find MemCell with ID ${id}.`);
    cell.addReference();

    const tail = new MemCell(this.id++, id, MemCellType.REFERENCE);
    tail.next = this.head;
    this.head = tail;

    return this.head.id;
  }

  deallocate(id: number): void {
    const cell = this.get(id, false);
    if (!cell) throw new Error(`Can't find MemCell with ID ${id}.`);
    cell.removeReference();

    if (cell.type == MemCellType.REFERENCE) {
      this.get(cell.content as number, false)?.removeReference();
    }
  }

  gc(): void {
    while (this.head && this.head.rc == 0) {
      this.head = this.head.next;
    }

    let current = this.head;

    while (current != null) {
      if (current.next?.shouldBeFreed()) {
        current.next = current.next.next;
      }

      current = current.next;
    }
  }

  get(id: number, shouldDereference: boolean): IMemCell | null {
    let current = this.head;

    while (current != null) {
      if (current.id == id) {
        if (!shouldDereference) return current;

        if (current.type == MemCellType.REFERENCE) {
          return this.get(current.content as number, true)
        } else {
          return current;
        }
      }
      current = current.next;
    }

    return null;
  }

  set(id: number, value: NestedArray): void {
    let current = this.head;

    while (current != null) {
      if (current.id == id) {
        current.content = value;
        return;
      }
      current = current.next;
    }

    throw new Error(`Can't find MemCell with ID ${id}`);
  }

  list(): void {
    let current = this.head;

    while (current != null) {
      console.log(`${current.id}: [RC: ${current.rc}] ${current.type == MemCellType.VALUE ? "[VAL]" : "[PTR]"} ${current.content}`)

      current = current.next
    }
  }
}

const alloc = new Allocator();
alloc.allocate(123)
alloc.allocate("hello")
alloc.allocate([4,5,6])
alloc.allocate(true)

alloc.reference(1)
alloc.reference(4)
alloc.reference(5)
alloc.reference(6)

alloc.list()

/*
function splitArray<T>(array: T[], n: number): [T[], T, T[]] {
  return [array.slice(0, n), array[n], array.slice(n + 1)];
}


export class ImmutableStore implements IStore {
  private constructor(readonly counter: number, readonly boxes: IBox<StoreValue>[]) {}
  static init() {
    return new ImmutableStore(0, []);
  }

  get(idx: number): NestedArray {
    if (idx > this.counter) throw new Error(`Addressed memory (${idx}) is outside bounds (${this.counter}).`);

    const value = this.boxes[idx].get();

    if (this.isArrayHead(value)) {
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
    return [new ImmutableStore(counter + index, [...this.boxes, ...boxes]), counter];
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

  private isArrayHead(head: any): head is ArrayHead {
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
