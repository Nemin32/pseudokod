type Sentinel = { kind: "sentinel" };
type Value<T> = { kind: "value"; key: string; value: T };

export class Environment<T> {
  static readonly sentinel: Sentinel = { kind: "sentinel" };
  private variables: Array<Value<T> | Sentinel> = [];
  private references: Array<Map<string, string>> = [];

  get length() {return {vLength: this.variables.length, rLength: this.references.length}}

  private dereference(varName: string): [string, boolean] {
    for (let i = this.references.length; i >= 0; i--) {
      if (this.references[i].has(varName)) {
        return [this.references[i].get(varName)!, true]
      }
    }

    return [varName, false]
  }

  private isSentinel(elem: Value<T> | Sentinel): elem is Sentinel {
    return elem.kind == "sentinel";
  }

  private findVar(varName: string, ignoreSentinel: boolean): T | null {
    let i = this.variables.length - 1;

    while (i >= 0) {
      const curr = this.variables[i];

      if (!ignoreSentinel && this.isSentinel(curr)) {
        return null;
      }

      if (curr.kind == "value" && curr.key == varName) {
        return curr.value;
      }

      i--;
    }

    return null;
  }

  makeScope() {
    this.variables.push(Environment.sentinel);
  }

  leaveScope() {
    const idx: number = this.variables.findLastIndex((e: Value<T> | Sentinel) =>
      this.isSentinel(e)
    );
    this.variables = this.variables.slice(0, Math.max(0, idx));
  }

  getVar(varName: string): T | null {
    const [key, isRef] = this.dereference(varName);
    return this.findVar(key, isRef);
  }

  setVar(varName: string, value: T) {
    const [key, _] = this.dereference(varName);
    this.variables.push({ kind: "value", key, value });
  }

  makeReference(oldName: string, newName: string): void {
    if (this.findVar(oldName, true)) {
      this.references[this.references.length-1].set(oldName, newName);
    } else {
      throw new Error("Trying to make reference for non-existent variable.");
    }
  }
}
