import { AtomValue } from "../compiler/pseudo_types.ts";
import { EnvVar, IVariableStore } from "./interfaces.ts";
import { MemAllocator } from "./store.ts";

export class VariableStore implements IVariableStore {
  private constructor(readonly variables: EnvVar[]) {}
  public static init() {
    return new VariableStore([]);
  }

  getVariable(store: MemAllocator, name: string) {
    const index = this.getBoxIndex(name);
    const value = store.get(index);

    if (value === null) {
      throw new Error(`Variable "${name}" points to invalid memory.`);
    }

    return value;
  }

  getBoxIndex(name: string): number {
    const index = this.lookup(name);

    if (index === null) {
      throw new Error(`Can't find variable "${name}"!`);
    }

    return index;
  }

  setVariable(store: MemAllocator, name: string, value: AtomValue): [MemAllocator, VariableStore] {
    const idx = this.lookup(name);

    if (idx != null) {
      store.set(idx, value);
      return [store, this];
    }

    const index = store.alloc(value);

    return [store, new VariableStore([...this.variables, { kind: "value", name, points: index }])];
  }

  makeReference(oldName: string | number, newName: string): VariableStore {
    const index = typeof oldName === "string" ? this.getBoxIndex(oldName) : oldName;
    return new VariableStore([...this.variables, { kind: "value", name: newName, points: index }]);
  }

  enterScope(boundary: boolean): VariableStore {
    return new VariableStore([...this.variables, { kind: "sentinel", boundary }]);
  }

  leaveScope(): VariableStore {
    const scopeIdx = this.variables.findLastIndex((e) => e.kind === "sentinel");

    if (scopeIdx === -1) {
      throw new Error("No active scope!");
    }

    return new VariableStore(this.variables.slice(0, scopeIdx));
  }

  private lookup(name: string): number | null {
    let idx = this.variables.length - 1;

    while (idx >= 0) {
      const current = this.variables[idx];

      if (current.kind === "sentinel" && current.boundary) return null;
      if (current.kind === "value" && current.name === name) return current.points;

      idx--;
    }

    return null;
  }
}
