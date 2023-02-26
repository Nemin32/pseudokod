export const TYPES = Object.freeze({
  number: "szám",
  string: "szöveg",
  boolean: "logikai",
  array: "tömb",
  reference: "referencia",
});

export class Value {
  #_value = null;
  #_type = null;

  constructor(v, t) {
    this.#_value = v;
    this.#_type = t;
  }

  set(value, type = null) {
    if (this.#_type === TYPES.reference) {
      this.#_value.set(value, type);
    } else {
      this.#_value = value;
      this.#_type = type !== null ? type : this.#_type;
    }
  }

  get value() {
    if (this.#_type === TYPES.reference) {
      return this.#_value.value;
    } else {
      return this.#_value;
    }
  }

  get type() {
    return this.#_type;
  }

  clone() {
    return new Value(this.#_value, this.#_type);
  }

  safe_get(expected_type) {
    // FIXME: Make this more robust. Remove part after &&.
    if (this.#_type !== expected_type && this.#_type !== null) {
      throw new Error(
        `'${expected_type}' típust vártunk, de a változó '${this.#_type}' típusú volt!`,
      );
    }

    return this.value;
  }

  convertToJSValue(val = this) {
    if (val.type == TYPES.array) {
      return val.value.map((innerVal) => this.convertToJSValue(innerVal));
    } else {
      return val.value;
    }
  }

  toString() {
    return JSON.stringify(this.convertToJSValue(this))
      .replaceAll("[", "(")
      .replaceAll("]", ")")
      .replaceAll("true", "Igaz")
      .replaceAll("false", "Hamis");
  }
}

/*

get
set

create_reference

enterBasicScope
leaveBasicScope

enterFunctionScope
leaveFunctionScope

printStack

*/

export class Stack {
  #scopeBounds = [];

  get scopeBounds() {
    return this.#scopeBounds;
  }

  /** @type {Array<Value>} */
  variables = [];

  /** @type {Map<string, Array<{name: string, reference: boolean, type: string}>>} */
  parameterTypes = null;

  callbacks = null;

  /**
   * Initializes a new Stack instance.
   * @param {Map<string, Array<{name: string, reference: boolean, type: string}>>} parameterTypes - A map of all parameters assigned to their functions's names.
   */
  constructor(parameterTypes, callbacks = null) {
    this.parameterTypes = parameterTypes;
    this.callbacks = callbacks;
  }

  /**
   * Finds a value on the stack, respecting function bounds.
   * @param {string} key - Key of the variable we want to access.
   * @returns {Value | null} - The variable or null, if not found.
   */
  get(key) {
    for (let i = this.variables.length - 1; i >= 0; i--) {
      if (
        this.#scopeBounds.findLast(
          (bound) => bound.isFunctionScope && bound.length == i + 1,
        )
      ) {
        return null;
      }

      if (this.variables[i].key == key) {
        return this.variables[i].value;
      }
    }

    return null;
  }

  /**
   * Sets variable to the given value and type.
   * @param {string} key - Key of the variable we want to set.
   * @param {any} value - The value of the variable.
   */
  set(key, value) {
    const existing_var = this.get(key);

    if (existing_var) {
      existing_var.set(value.value, value.type);
      this.callbacks?.variableSet?.(this.variables);
    } else {
      const newVar = {
        key: key,
        value: value,
      };

      this.variables.push(newVar);
      this.callbacks?.variableSet?.(this.variables);
    }
  }

  create_reference(key, variable) {
    this.set(key, variable, TYPES.reference);
  }

  enterBasicScope(isFunc = false) {
    this.#scopeBounds.push({
      length: this.variables.length,
      isFunctionScope: isFunc,
    });
  }

  leaveBasicScope(isFunc = false) {
    let current_bound = this.#scopeBounds.pop();

    while (isFunc && !current_bound.isFunctionScope) {
      current_bound = this.#scopeBounds.pop();
    }

    const length_diff = this.variables.length - current_bound.length;
    this.variables.splice(this.variables.length - length_diff, length_diff);

    this.callbacks?.scopeLeave?.(this.variables);
  }

  enterFunctionScope(functionName, parameters) {
    this.enterBasicScope(true);

    const parameterTypes = this.parameterTypes.get(functionName);

    parameters.forEach((parameter, index) => {
      const current_type = parameterTypes[index];

      if (current_type.reference) {
        this.create_reference(current_type.name, parameter);
      } else {
        this.set(current_type.name, parameter, current_type.type);
      }
    });
  }

  leaveFunctionScope() {
    this.leaveBasicScope();
  }
}
