class StackValue {
  storedValue = null;

  constructor(key, val, next) {
    this.key = key;
    this.storedValue = val;
    this.next = next;

    this.reference = typeof val == "object";
  }

  set value(val) {
    this.reference = typeof val == "object";
    this.storedValue = val;
  }

  get value() {
    return this.storedValue;
  }
}

export class Stack {
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
        this.create_reference(currentParamName.name, parameter, this.previousHeads[Math.max(this.previousHeads.length-1, 0)])
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
      if (this.previousHeads.includes(current)) {console.log("új scope")}
      current = current.next;
    }
    console.log("VEREM VÉGE");
  }
}

class OldStack {
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