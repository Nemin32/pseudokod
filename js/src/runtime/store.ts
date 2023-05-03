import { AtomValue } from "../compiler/pseudo_types.ts";
import { Box } from "./box.ts";
import { ArrayHead, IBox, IStore, NestedArray, NestedBoxArray, StoreValue } from "./interfaces.ts";

/*
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

  clone(): IMemCell
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

export interface IAllocator {
  allocate(value: NestedArray): number;
  reference(id: number): number;
  deallocate(id: number): void;

  gc(): void;
  get(id: number, shouldDereference: boolean): IMemCell | null;
  set(id: number, value: NestedArray): void;

  clone(): IAllocator
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

  clone(): IMemCell {
      const newCell = new MemCell(this.id, structuredClone(this.content), this.type)
      newCell.next = (this.next == null) ? null : this.next.clone();

      return newCell;
  }
}

export class Allocator implements IAllocator {
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

  clone(): IAllocator {
    const newA = new Allocator()
    newA.id = this.id;
    newA.head = (this.head == null) ? null : this.head.clone();

    return newA;
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

alloc.list()*/

class MemBlock {
  public constructor(
    public id: number,
    public length: number,
    public index: number,
    public previous: number | null, //MemBlock | null = null,
    public next: MemBlock | null = null,
    public children: MemBlock[] = []
  ) {}

  copy(prev: number | null): MemBlock {
    return new MemBlock(this.id, this.length, this.index, prev, this.next?.copy(this.id), this.children.map(c => c.copy(c.previous)))
  }
}

class MemCell {
  public constructor(public rc: number, public content: AtomValue) {}

  copy(): MemCell {return new MemCell(this.rc, this.content)}
}

class MemAllocator {
  constructor(
  public head: MemBlock | null = null,
  public memory: (MemCell | null)[] = [],
  public id = 0,
  ) {}

  copy(): MemAllocator {
    return new MemAllocator(this.head?.copy(null), this.memory.map(m => m?.copy() ?? null), this.id);
  }

  private copyJSIntoMemory(value: NestedArray, start: number, _needsBlock: boolean): MemBlock[] {
    const isArr = Array.isArray(value);
    const length = this.realLength(value);

    let blocks: MemBlock[] = [];
    let idx = start;

    if (isArr) {
      for (const elem of value) {
        blocks = blocks.concat(this.copyJSIntoMemory(elem, idx, false));
        idx += this.realLength(elem);
      }
    } else {
      this.memory[idx] = new MemCell(1, value);
    }

    const block = new MemBlock(this.id++, length, start, null, this.head);
    block.children = blocks;
    if (this.head) this.head.previous = block.id;
    this.head = block;

    return [block];
  }

  private findEmptySpace(length: number): number | null {
    for (let i = 0; i < this.memory.length; i += length) {
      // First we check the first and last slots. If either is not null, this won't work anyways, so we skip.
      if (this.memory[i] != null || this.memory[i + length - 1] != null) {
        continue;
      }

      // If that is good, we check each individual cell we haven't checked yet.
      // The first and last ones don't need to be checked anymore, since we did that above.
      let good = true;
      for (let j = 1; j < length - 1; j++) {
        if (this.memory[i + j] != null) {
          good = false;
          break;
        }
      }

      // If we found an all-empty spot of given length, we return its starting index.
      if (good) {
        return i;
      }
    }

    return null;
  }

  realLength(value: NestedArray): number {
    if (!Array.isArray(value)) return 1;
    return value.reduce<number>((acc, val) => acc + this.realLength(val), 0);
  }

  alloc(value: NestedArray): number {
    const length = this.realLength(value);
    return this.copyJSIntoMemory(value, this.findEmptySpace(length) ?? this.memory.length, true)[0].id;
  }

  dealloc(id: number, deallocChildren: boolean) {
    const block = this.find(id);

    if (deallocChildren) block.children.forEach((c) => this.dealloc(c.id, true));

    if (block == this.head) {
      this.head = this.head.next;
    } else {
      this.find(block.previous!).next = block.next;
    }

    if (!deallocChildren || block.children.length == 0) {
      for (let i = block.index; i < block.index + block.length; i++) {
        if (this.memory[i] != null) {
          this.memory[i]!.rc -= 1;
        }
      }
    }
  }

  find(id: number): MemBlock {
    let current = this.head;

    while (current) {
      if (current.id == id) return current;

      current = current.next;
    }

    throw new Error(`Can't find block with ID ${id}.`);
  }

  gc() {
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i]?.rc == 0) {
        this.memory[i] = null;
      }
    }
  }

  reference(id: number): number {
    const block = this.find(id);

    for (let i = 0; i < block.length; i++) {
      this.memory[block.index + i]!.rc += 1;
    }

    const newBlock = new MemBlock(this.id++, block.length, block.index, null, this.head, block.children)
    if (this.head) this.head.previous = newBlock.id
    this.head = newBlock;

    return newBlock.id;
  }

  set(id: number, value: AtomValue) {
    const block = this.find(id);

    if (!this.memory.at(block.index)) throw new Error(`No memory at ${block.index}.`);

    this.memory[block.index]!.content = value;
  }

  setArr(id: number, offset: number[], value: AtomValue) {
    let block = this.find(id);

    for (const elem of offset) {
      if (elem > block.children.length) throw new Error(`Index ${elem} out of bounds.`);
      block = block.children[elem];
    }

    this.memory[block.index]!.content = value;
  }

  get(id: number): NestedArray {
    const block = this.find(id)

    if (block.children.length == 0) {
      return this.memory[block.index]!.content;
    }

    return block.children.map(c => this.get(c.id));
  }
}

const alloc = new MemAllocator()
alloc.alloc([1,[2,3], [[4]], 5])

console.log("Arr is [1,[2,3], [[4]], 5]")
console.log("Pre-set:", alloc.memory)
console.log("Setting arr[1,1] to 99.")
alloc.setArr(8, [1,1], 99)
console.log("Post-set:", alloc.memory)

const newAlloc = alloc.copy()
alloc.dealloc(8, true)
alloc.gc()

console.log(newAlloc.reference(8))

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
