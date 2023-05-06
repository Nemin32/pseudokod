import { AtomValue } from "../compiler/pseudo_types.ts";
import { NestedArray } from "./interfaces.ts";

class MemBlock {
  public constructor(
    public id: number,
    public length: number,
    public index: number,
    public previous: number | null, //MemBlock | null = null,
    public next: MemBlock | null = null,
    public children: MemBlock[] = [],
  ) {}

  clone(prev: number | null): MemBlock {
    return new MemBlock(
      this.id,
      this.length,
      this.index,
      prev,
      this.next?.clone(this.id),
      this.children.map((c) => c.clone(c.previous)),
    );
  }
}

class MemCell {
  public constructor(public rc: number, public content: AtomValue) {}

  clone(): MemCell {
    return new MemCell(this.rc, this.content);
  }
}

export class MemAllocator {
  constructor(
    public head: MemBlock | null = null,
    public memory: (MemCell | null)[] = [],
    public id = 0,
  ) {}

  public clone(): MemAllocator {
    return new MemAllocator(
      this.head?.clone(null),
      this.memory.map((m) => m?.clone() ?? null),
      this.id,
    );
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
    return this.copyJSIntoMemory(value, this.findEmptySpace(length) ?? this.memory.length, true)[0]
      .id;
  }

  dealloc(id: number, deallocChildren: boolean) {
    const block = this.find(id);

    if (deallocChildren) block.children.forEach((c) => this.dealloc(c.id, true));

    if (block.previous == null) {
      this.head = this.head?.next ?? null;
    } else {
      this.find(block.previous).next = block.next;
    }

    if (!deallocChildren || block.children.length === 0) {
      for (let i = block.index; i < block.index + block.length; i++) {
        if (this.memory[i]) {
          //rome-ignore lint: noNonNullAssertion
          this.memory[i]!.rc -= 1;
        }
      }
    }
  }

  find(id: number): MemBlock {
    let current = this.head;

    while (current) {
      if (current.id === id) return current;

      current = current.next;
    }

    throw new Error(`Can't find block with ID ${id}.`);
  }

  gc() {
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i]?.rc === 0) {
        this.memory[i] = null;
      }
    }
  }

  reference(id: number): number {
    const block = this.find(id);

    for (let i = 0; i < block.length; i++) {
      //rome-ignore lint: noNonNullAssertion
      this.memory[block.index + i]!.rc += 1;
    }

    const newBlock = new MemBlock(
      this.id++,
      block.length,
      block.index,
      null,
      this.head,
      block.children,
    );
    if (this.head) this.head.previous = newBlock.id;
    this.head = newBlock;

    return newBlock.id;
  }

  set(id: number, value: AtomValue) {
    const block = this.find(id);

    if (!this.memory.at(block.index)) throw new Error(`No memory at ${block.index}.`);

    //rome-ignore lint: noNonNullAssertion
    this.memory[block.index]!.content = value;
  }

  setArr(id: number, offset: number[], value: AtomValue) {
    let block = this.find(id);

    for (const elem of offset) {
      if (elem > block.children.length) throw new Error(`Index ${elem} out of bounds.`);
      block = block.children[elem];
    }

    //rome-ignore lint: noNonNullAssertion
    this.memory[block.index]!.content = value;
  }

  get(id: number): NestedArray {
    const block = this.find(id);

    if (block.children.length === 0) {
      //rome-ignore lint: noNonNullAssertion
      return this.memory[block.index]!.content;
    }

    return block.children.map((c) => this.get(c.id));
  }
}
