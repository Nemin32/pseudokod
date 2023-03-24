export enum ValueType {
  VOID,
  NUMBER, 
  STRING, 
  BOOL,
  ARRAY,
  REFERENCE,
}

export interface IBox<T> {
  get(): T;
  set(value: T): void;
}

export class Box<T> implements IBox<T> {
  readonly kind: "box" = "box";
  //type: ValueType = ValueType.VOID;

  //rc = 0;

  constructor(private value: T) {}

  get(): T {
    return this.value;
  }

  set(value: T): void {
    this.value = value;
  }
}