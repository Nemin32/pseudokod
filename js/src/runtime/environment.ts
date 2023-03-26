import { Box } from "./box";
import { Store } from "./store";

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

type Sentinel = { readonly kind: "sentinel"; boundary: boolean }
type Value = {readonly kind: "value"; name: string; points: number}

type EnvVar = Sentinel | Value;

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

/*
type Sentinel = { readonly kind: "sentinel"; boundary: boolean };
// type Value<T> = { kind: "value"; key: string; value: T };
//

class ValueWrapper<T> {
  readonly kind: string = "value";
  constructor(readonly key: string, private _value: T) {}

  get value() {
    return this._value;
  }

  set value(val: T) {
    this._value = val;
  }
}

class Reference<T> {
  readonly kind: string = "reference";
  constructor(readonly key: string, readonly points: ValueWrapper<T>) {}
}

type EnvVar<T> = Sentinel | ValueWrapper<T> | Reference<T>;

export interface IEnvironment<T> {
  getVar(varName: string): ValueWrapper<T> | null;
  setVar(varName: string, value: T): void;
  makeReference(oldName: string, newName: string): void;

  enterScope(boundary: boolean): void;
  leaveScope(): void;

  reset(): void;
}

export class Environment<T> implements IEnvironment<T> {
  variables: Array<EnvVar<T>> = [];

  reset() {
    this.variables = [];
  }

  private isSentinel(elem: EnvVar<T>): elem is Sentinel {
    return elem.kind == "sentinel";
  }

  private isRef(elem: EnvVar<T>): elem is Reference<T> {
    return elem.kind == "reference";
  }

  getVar(varName: string, jump = false): ValueWrapper<T> | null {
    for (let i = this.variables.length - 1; i >= 0; i--) {
      const elem: EnvVar<T> = this.variables[i];

      if (this.isSentinel(elem)) {
        if (elem.boundary) {
          if (jump) {
            jump = false;
          } else {
            return null;
          }
        }

        continue;
      }

      if (this.isRef(elem)) {
        if (elem.key == varName) {
          return elem.points;
        }
      } else {
        if (elem.key == varName) {
          return elem;
        }
      }
    }

    return null;
  }

  setVar(varName: string, value: T): void {
    const variable = this.getVar(varName);

    if (variable) {
      variable.value = value;
    } else {
      this.variables.push(new ValueWrapper(varName, value));
    }
  }

  makeReference(oldName: string, newName: string): void {
    const variable = this.getVar(oldName, true);

    if (variable === null) {
      throw new Error(`Variable ${oldName} doesn't exist!`);
    }

    this.variables.push(new Reference(newName, variable));
  }

  enterScope(boundary: boolean): void {
    this.variables.push({ kind: "sentinel", boundary });
  }

  leaveScope(): void {
    const scopeIdx = this.variables.findLastIndex((e) => e.kind == "sentinel");

    if (scopeIdx == -1) {
      throw new Error("No active scope!");
    }

    this.variables = this.variables.slice(0, scopeIdx);
  }
}

*/