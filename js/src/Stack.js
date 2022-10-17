export const TYPES = Object.freeze({
  number: "szám",
  string: "szöveg",
  boolean: "logikai",
  array: "tömb",
  reference: "referencia"
})

export class Value {
  #_value = null;
  #_type = null;

  constructor(v, t) {
    this.#_value = v;
    this.#_type = t;
  }

  set(value, type) {
    if (this.#_type === TYPES.reference) {
      this.#_value.set(value, type)
    } else {
      this.#_value = value;
      this.#_type = type;
    }
  }

  get value() {
    if (this.#_type === TYPES.reference) {
      return this.#_value.value
    } else {
      return this.#_value
    }
  }

  get type() {
    return this.#_type;
  }

  safe_get(expected_type) {
    if (this.#_type !== expected_type) {
      throw new Error("Expected type was " + expected_type + ", but variable was " + this.#_type);
    }

    return this.value
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
  #scopeBounds = []

  /** @type {Array<Value>} */
  variables = []

  /** @type {Map<string, Array<{name: string, reference: boolean, type: string}>>} */
  parameterTypes = null;

  /**
   * Initializes a new Stack instance.
   * @param {Map<string, Array<{name: string, reference: boolean, type: string}>>} parameterTypes - A map of all parameters assigned to their functions's names.
   */
  constructor(parameterTypes) {
    this.parameterTypes = parameterTypes
  }

  /**
   * Finds a value on the stack, respecting function bounds.
   * @param {string} key - Key of the variable we want to access.
   * @returns {Value | null} - The variable or null, if not found.
   */
  get(key) {
    for (let i = this.variables.length - 1; i >= 0; i--) {
      if (this.#scopeBounds.findLast((bound) => bound.isFunctionScope && bound.length == i + 1)) {
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
      existing_var.set(value.value, value.type)
    } else {
      this.variables.push({
        key: key,
        value: value
      })
    }
  }

  create_reference(key, variable) {
    this.set(key, variable, TYPES.reference);
  }

  enterBasicScope(isFunc = false) {
    this.#scopeBounds.push({
      length: this.variables.length,
      isFunctionScope: isFunc
    })
  }

  leaveBasicScope() {
    const current_bound = this.#scopeBounds.pop()
    const length_diff = this.variables.length - current_bound.length;
    this.variables.splice(this.variables.length - length_diff, length_diff)
  }

  enterFunctionScope(functionName, parameters) {
    this.enterBasicScope(true)

    const parameterTypes = this.parameterTypes.get(functionName);

    parameters.forEach((parameter, index) => {
      const current_type = parameterTypes[index]

      if (current_type.reference) {
        this.create_reference(current_type.name, parameter)
      } else {
        this.set(current_type.name, parameter, current_type.type)
      }
    })
  }

  leaveFunctionScope() {
    this.leaveBasicScope()
  }
}

/*
let s = new Stack()
s.set("x", "teszt", TYPES.string);

s.enterBasicScope(false)

s.set("y", "teszt", TYPES.string);

s.enterBasicScope(false)
s.set("z", "teszt", TYPES.string);
s.set("d", "teszt", TYPES.string);

s.set("x", "tesztes", TYPES.string);

let x = s.get("x")
s.enterFunctionScope()

s.create_reference("val", x)

s.set("val", "teszte", TYPES.string);

s.leaveFunctionScope()

s.leaveBasicScope()

s.set("d", "teszt", TYPES.string);

console.log(s.get("x")?.value)
console.log(s)
s.leaveBasicScope()
*/

class OldStack {
  head = null;
  previousHeads = [];
  paramnNames = null;

  constructor(pNames) { this.paramnNames = pNames; }

  #find(key, start = null) {
    let current = start ?? this.head;

    while (current != null) {
      // Megnézzük, hogy egy függvény scope-határán vagyunk-e és ha igen akkor megszakítjuk a keresést.
      const prevHead = this.previousHeads.findLast(([elem, isFunc]) => elem == current && isFunc)
      if (prevHead) {
        console.log(prevHead[0])
        return null;
      }

      if (current.key == key) {
        return current;
      }


      current = current.next;
    }

    return null;
  }

  #extract(stackValue) {
    if (Array.isArray(stackValue?.value)) {
      return stackValue;
    }

    if (typeof stackValue?.value !== "object") {
      return stackValue;
    } else {
      return this.#extract(stackValue.value)
    }
  }

  get(key, start = null) {
    const value = this.#find(key, start)

    if (value === null) {
      return null;
    }

    return this.#extract(value)?.value
  }


  set(key, val, forced = false) {
    if (forced) {
      const value = new StackValue(key, val, this.head);
      this.head = value;
    } else {
      const svalue = this.#find(key)

      if (svalue) {
        this.#extract(svalue).value = val
      } else {
        const value = new StackValue(key, val, this.head);
        this.head = value;
      }
    }
  }

  create_reference(key, variable, start = null) {
    const value = this.#find(variable, start)

    this.set(key, value, true)
  }

  enterBasicScope(isFunc = false) { this.previousHeads.push([this.head, isFunc]); }
  leaveBasicScope() { this.head = this.previousHeads.pop()[0]; }

  enterFunctionScope(funcName, parameters) {
    this.enterBasicScope(true)

    const paramNames = this.paramnNames.get(funcName);
    parameters.forEach((parameter, index) => {
      const currentParamName = paramNames[index]

      if (currentParamName.reference) {
        this.create_reference(currentParamName.name, parameter, this.previousHeads[Math.max(this.previousHeads.length - 1, 0)])
      } else {
        this.set(currentParamName.name, parameter, true)
      }
    })
  }

  leaveFunctionScope() {
    this.leaveBasicScope()
  }

  printStack() {
    let current = this.head;

    console.log("VEREM KEZDETE");
    while (current != null) {
      console.log(current.key, " - ", current.value);
      if (this.previousHeads.includes(current)) { console.log("új scope") }
      current = current.next;
    }
    console.log("VEREM VÉGE");
  }
}

class OlderStack {
  constructor(parameters) {
    this.previousHead = [];
    this.head = null;
    this.paramNames = parameters;
  }

  newFrame() {
    this.previousHead.push(this.head);
  }

  newFunctionFrame(functionName, parameters) {
    this.newFrame();

    const paramNames = this.paramNames.get(functionName);
    parameters.forEach((param, idx) => {
      // Ha nem referencia, akkor új változóként adjuk hozzá, ha az, akkor visszont csak lekérjük az értékét korábbról.
      if (!paramNames[idx].reference) {
        this.force_set(paramNames[idx].name, param);
      }
    });
  }

  dropFrame() {
    this.head = this.previousHead.pop();
  }

  find(key) {
    let current = this.head;

    while (current != null) {
      if (current.key == key) {
        return current;
      }

      current = current.next;
    }

    return null;
  }

  get(key) {
    const elem = this.find(key);

    if (elem) {
      return elem.value;
    } else {
      return null;
    }
  }

  force_set(key, value) {
    const val = new StackValue(key, value, this.head);
    this.head = val;
  }

  set(key, value) {
    const previous = this.find(key);

    if (previous !== null) {
      previous.value = value;
    } else {
      const val = new StackValue(key, value, this.head);
      this.head = val;
    }
  }

  printStack() {
    let current = this.head;

    console.log("VEREM KEZDETE");
    while (current != null) {
      console.log(current.key, " - ", current.value);
      current = current.next;
    }
    console.log("VEREM VÉGE");
  }
}

/*
const s = new Stack()
s.set("h", 123)
s.set("x", 456)
s.create_reference("hx", "h")

console.log(s.get("hx"))
s.set("hx", 333)
console.log(s.get("h"))
*/