import { IBox } from "./interfaces.ts";

export enum ValueType {
  VOID,
  NUMBER, 
  STRING, 
  BOOL,
  ARRAY,
  REFERENCE,
}

export class Box<T> implements IBox<T> {
  readonly kind: "box" = "box";
  //type: ValueType = ValueType.VOID;
  private constructor(readonly rc: number, readonly value: T) {}
  static init<T>(value: T) {return new Box(1, value)}

  get(): T {
    return this.value;
  }

  set(value: T): IBox<T> {
    return new Box(this.rc, value);
  }

  incrementRc(): IBox<T> {
    return new Box(this.rc+1, this.value);
  }

  decrementRc(): IBox<T> {
    if (this.rc == 0) throw new Error("RC was already 0!");
    
    return new Box(this.rc-1, this.value);
  }
}