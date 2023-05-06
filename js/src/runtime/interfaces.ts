import { ByteCode } from "../compiler/opcodes.ts";
import { AtomValue } from "../compiler/pseudo_types.ts";
import { MemAllocator } from "./store.ts";

export type NestedArray = AtomValue | (AtomValue | NestedArray)[];

//#region Box
export interface IBox<T> {
  get(): T;
  set(value: T): IBox<T>;
  incrementRc(): IBox<T>;
  decrementRc(): IBox<T>;
}
//#endregion

//#region Stack
export interface StringToType {
  any: any;
  array: NestedArray;
  boolean: boolean;
  number: number;
  string: string;
}

export interface IStack {
  get length(): number;
  pop<K extends keyof StringToType>(type: K): [StringToType[K], IStack];
  push(val: NestedArray): IStack;
  reset(): IStack;
}
//#endregion

//#region Variable Store
type Sentinel = { readonly kind: "sentinel"; boundary: boolean };
type EnvValue = { readonly kind: "value"; name: string; points: number };
export type EnvVar = Sentinel | EnvValue;

export interface IVariableStore {
  enterScope(boundary: boolean): IVariableStore;
  getBoxIndex(name: string): number;
  getVariable(store: MemAllocator, name: string): NestedArray;
  leaveScope(): IVariableStore;
  makeReference(oldName: string | number, newName: string): IVariableStore;
  setVariable(store: MemAllocator, name: string, value: AtomValue): [MemAllocator, IVariableStore];
}
//#endregion

//#region Store
export type ArrayHead = { length: number; start: number };
export type StoreValue = AtomValue | ArrayHead;
export type NestedBoxArray = StoreValue | (StoreValue | NestedBoxArray)[];

export type IStore = {
  add(value: NestedArray): [IStore, number];
  get(idx: number): NestedArray;
  getArray(value: ArrayHead): NestedArray;
  getArrayElement(arrayPtr: number, offset: number): NestedArray;
  getArrayElementBox(arrayPtr: number, offset: number): IBox<StoreValue>;
  getArrayElementBoxIndex(arrayPtr: number, offset: number): number;
  getBox(idx: number): IBox<StoreValue>;
  set(idx: number, value: StoreValue): IStore;
};
//#endregion

//#region VM
export interface IBindings {
  out: (value: NestedArray) => void;
  stack: (stack: NestedArray[]) => void;
}

export type State = Readonly<{
  stack: IStack;
  store: MemAllocator;
  variables: IVariableStore;
  ipStack: Array<number>;
  ip: number;
  stopped: boolean;
  line: number
}>;

export interface IVM {
  run(): void;
  fetch(): ByteCode;
  execute(lastState: State, instruction: ByteCode): State;
  step(): boolean;
  reset(): void;
  lastState(): State;
  lineStep(): boolean;
}
//#endregion
