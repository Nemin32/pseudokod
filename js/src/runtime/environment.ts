import { AtomValue } from "../compiler/pseudo_types.ts";
import { EnvVar, IBindings, IVariableStore } from "./interfaces.ts";
import { MemAllocator } from "./store.ts";

export class VariableStore implements IVariableStore {
  private constructor(readonly callback: IBindings["vars"], readonly variables: EnvVar[]) {}

  public static init(callback: IBindings["vars"]) {
    return new VariableStore(callback, []);
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

    const retval: [MemAllocator, VariableStore] = [
      store,
      new VariableStore(this.callback, [...this.variables, { kind: "value", name, points: index }]),
    ];

    this.callback(retval[1].variables, retval[0]);

    return retval;
  }

  makeReference(oldName: string | number, newName: string): VariableStore {
    const index = typeof oldName === "string" ? this.getBoxIndex(oldName) : oldName;
    return new VariableStore(this.callback, [
      ...this.variables,
      { kind: "value", name: newName, points: index },
    ]);
  }

  enterScope(boundary: boolean, alloc: MemAllocator): VariableStore {
    const retval = new VariableStore(this.callback, [
      ...this.variables,
      { kind: "sentinel", boundary },
    ]);

    this.callback(retval.variables, alloc);

    return retval;
  }

  leaveScope(alloc: MemAllocator): VariableStore {
    const scopeIdx = this.variables.findLastIndex((e) => e.kind === "sentinel");

    if (scopeIdx === -1) {
      throw new Error("No active scope!");
    }

    const retval = new VariableStore(this.callback, this.variables.slice(0, scopeIdx));

    this.callback(retval.variables, alloc);

    return retval;
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
