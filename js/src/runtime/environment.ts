import { AtomValue } from "../compiler/pseudo_types";
import { Box } from "./box";
import { ImmutableStore } from "./store";

type Sentinel = { readonly kind: "sentinel"; boundary: boolean }
type EnvValue = {readonly kind: "value"; name: string; points: number}

type EnvVar = Sentinel | EnvValue;

export class ImmutableEnvironment {
  private constructor(readonly variables: EnvVar[]) {}
  public static init() {return new ImmutableEnvironment([]);}

  getVariable(store: ImmutableStore, name: string) {
    const index = this.getBoxIndex(name);
    const value = store.get(index);

    if (value == null) {
      throw new Error(`Variable "${name}" points to invalid memory.`);
    }

    return value;
  }

  getBoxIndex(name: string): number {
    const index = this.lookup(name);

    if (index == null) {
      throw new Error(`Can't find variable "${name}"!`)
    }

    return index;
  }

  setVariable(store: ImmutableStore, name: string, value: AtomValue): [ImmutableStore, ImmutableEnvironment] {
    const idx = this.lookup(name);

    if (idx != null) {
      const newStore = store.set(idx, value);
      return [newStore, this];
    }

    const [newStore, index] = store.add(value);

    return [
      newStore,
      new ImmutableEnvironment([...this.variables, {kind: "value", name, points: index}])
    ]
  }

  makeReference(oldName: string | number, newName: string): ImmutableEnvironment {
    const index = (typeof oldName == "string") ? this.getBoxIndex(oldName) : oldName;
    return new ImmutableEnvironment([...this.variables, {kind: "value", name: newName, points: index}])
  }

  enterScope(boundary: boolean): ImmutableEnvironment {
    return new ImmutableEnvironment([...this.variables, {kind: "sentinel", boundary}]);
  }

  leaveScope(): ImmutableEnvironment {
    const scopeIdx = this.variables.findLastIndex((e) => e.kind == "sentinel");

    if (scopeIdx == -1) {
      throw new Error("No active scope!");
    }

    return new ImmutableEnvironment(this.variables.slice(0, scopeIdx));
  }

  private lookup(name: string): number | null {
    let idx = this.variables.length-1;

    while (idx >= 0) {
      const current = this.variables[idx];

      if (current.kind == "sentinel" && current.boundary) return null;
      if (current.kind == "value" && current.name == name) return current.points;

      idx--;
    }

    return null;
  }
}

/*
export interface IEnvironment<T> {
  getVar(varName: string): T;
  getBoxIndex(varName: string): number;
  setVar(varName: string, value: T): void;
  setVar(varName: string, value: T): void;
  makeReference(old: string | number, newName: string): void;

  enterScope(boundary: boolean): void;
  leaveScope(): void;

  reset(): void;
}

export class Environment<T> implements IEnvironment<T> {
  variables: EnvVar[] = [];

  constructor(private store: Store) {}

  getVar(varName: string): T {
    const value = this.getVarOrNull(varName);

    if (value === null) {
      throw new Error("Variable " + varName + " is not set.");
      
    }

    return value;
  }

  getBoxIndex(varName: string): number {
    const idx = this.getBoxIndexOrNull(varName);

    if (idx === null) {
      throw new Error("Variable " + varName + " is not set.");
      
    }

    return idx;
  }

  private getVarOrNull(varName: string): T | null {
    const idx = this.getBoxIndexOrNull(varName);

    if (idx != null) {
      return this.store.get(idx);
    }

    return null;
  }

  private isBoundary(ev: EnvVar) {
    return ev.kind == "sentinel" && ev.boundary;
  }

  private getBoxIndexOrNull(varName: string): number | null {
    let i = this.variables.length-1;

    while (i >= 0) {
      const current = this.variables[i]
      if (this.isBoundary(current)) return null;
      if (current.kind == "value" && current.name == varName) return current.points;

      i--;
    }

    return null;
  }

  setVar(varName: string, value: T): void {
    const boxIdx = this.getBoxIndexOrNull(varName);

    if (boxIdx) {
      this.store.set(boxIdx, value)
    } else {
      const newIdx = this.store.add(value);
      this.variables.push({kind: "value", name: varName, points: newIdx});
    }
  }

  makeReference(old: string | number, newName: string): void {
    const idx = (typeof old == "string") ? this.getBoxIndexOrNull(old) : old;

    if (idx == null) {
      throw new Error("makeReference: Idx was null.");
    }

    this.variables.push({kind: "value", name: newName, points: idx});
  }

  enterScope(boundary: boolean): void {
    this.variables.push({kind: "sentinel", boundary});
  }

  leaveScope(): void {
    const scopeIdx = this.variables.findLastIndex((e) => e.kind == "sentinel");

    if (scopeIdx == -1) {
      throw new Error("No active scope!");
    }

    this.variables = this.variables.slice(0, scopeIdx);
  }

  reset(): void {
    this.variables = [];
  }
}
*/