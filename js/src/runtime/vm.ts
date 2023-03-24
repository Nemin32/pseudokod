import { ByteCode, OpCode } from "../compiler/opcodes.js";
import { Atom, AtomValue } from "../compiler/pseudo_types.js";
import { Stack } from "./stack.js";
import { Environment, IEnvironment } from "./environment.js";
import { Store } from "./store.js";
import { Box } from "./box.js";

type NoArrValue = Exclude<Atom["value"], AtomValue[]>;
type Value =  NoArrValue | (Value|Box<any>)[];

export interface IBindings {
  out: (value: Value) => void;
  stack: (stack: Value[]) => void;
}

export class VM {
  ip = 0;
  private stack: Stack<Value>;
  private ipStack: Array<number> = [];
  private store: Store = new Store();
  private vars: IEnvironment<Value> = new Environment(this.store);
  private code: Array<ByteCode> = [];

  constructor(private bindings: IBindings) {
    this.stack = new Stack(bindings.stack);
  }

  setup(code: ByteCode[]) {
    this.ip = 0;
    this.ipStack = [];
    this.vars.reset();
    this.stack.reset();
    this.store.reset();

    this.code = code;
  }

  dump() {
    for (const line of this.code) {
      this.bindings.out(`${OpCode[line.opCode]} ${line.payload ?? ""}`);
    }
  }

  jmpLabel(label: string) {
    this.ip = 0;

    while (this.ip < this.code.length) {
      const row = this.code[this.ip];

      if (row.opCode == OpCode.LABEL && row.payload == label) {
        return;
      }

      this.ip++;
    }
  }

  fetch(): ByteCode {
    if (this.ip < this.code.length) {
      return this.code[this.ip];
    }

    throw new Error("IP ran out of tape.");
  }

  execute({ opCode, payload }: ByteCode): boolean {
    switch (opCode) {
      case OpCode.DEBUG:
        return true;

      case OpCode.LABEL:
        break;

      case OpCode.ESCOPE:
        this.vars.enterScope(payload !== null);
        break;

      case OpCode.LSCOPE:
        this.vars.leaveScope();
        break;

      case OpCode.MKREF:
        {
          const originalVar = this.stack.pop(); // string

          if (typeof payload != "string") {
            throw new Error("Variable name must be string.");
          }

          if (!(typeof originalVar == "string" || typeof originalVar == "number")) {
            throw new Error("Variable name must be string or number.");
          }

          this.vars.makeReference(originalVar, payload);
        }
        break;

      case OpCode.GETARR:
        {
          if (typeof payload != "string") throw new Error("GETARR: Payload must be string.");
          
          const index = this.stack.pop();

          if (typeof index != "number") {
            throw new Error("GETARR: Index must be a number!");
          }

          const headValue = this.vars.getVar(payload);
          const headIdx = this.vars.getVarBoxIdx(payload);

          if (typeof headValue != "number" || headIdx == null) throw new Error("GETARR: Head wasn't an array header.");

          if (index > headValue) {
            throw new Error("SETARR: Out-of-bounds");
          }

          this.stack.push(this.store.get(headIdx + index));
        }
        break;

      case OpCode.ARRADDR:
        {
          if (typeof payload != "string") {
            throw new Error("ARRADDR: Payload must be string.");
          }

          const index = this.stack.pop();

          if (typeof index != "number") {
            throw new Error("ARRADDR: Index must be a number!");
          }

          const arrayIdx = this.vars.getVarBoxIdx(payload)
          if (arrayIdx == null) {
            throw new Error("ARRADDR: No such variable.");
          }

          const arrayLength = this.store.get(arrayIdx);

          if (!arrayLength) {
            throw new Error("ARRADDR: Can't find array in store!");
          }

          if (index > arrayLength) {
            throw new Error("ARRADDR: Out of bounds.");
          }

          this.stack.push(arrayIdx + index);
        }
        break;

      case OpCode.GETVAR:
        {
          const variable = this.vars.getVar(payload as string);

          if (variable == null) {
            throw new Error(`Variable '${payload}' doesn't exist!`);
          }

          this.stack.push(variable);
        }
        break;

      case OpCode.ADDRESS:
        {
          const variable = this.vars.getVarBoxIdx(payload as string);

          if (variable == null) {
            throw new Error(`Variable '${payload}' doesn't exist!`);
          }

          this.stack.push(variable);
        }
        break;

      case OpCode.SETVAR:
        {
          const value = this.stack.pop();
          if (Array.isArray(value)) {
            const head = this.store.add(value);
            this.vars.makeReference(head, payload as string);
          } else {
            this.vars.setVar(payload as string, value);
          }
        }
        break;

      case OpCode.VALARR:
        {
          if (payload == null || typeof payload != "number") {
            throw new Error(
              "VALARR: Payload must be number, but it was " + typeof payload,
            );
          }

          const arr: Array<Value> = [];

          for (let i = 0; i < payload; i++) {
            arr.push(this.stack.pop());
          }

          this.stack.push(arr.reverse());
        }
        break;

      case OpCode.JMP:
        this.jmpLabel(payload as string);
        break;

      case OpCode.FJMP:
        {
          const val = this.stack.pop();

          if (!val) {
            this.jmpLabel(payload as string);
          }
        }
        break;

      case OpCode.TJMP:
        {
          const val = this.stack.pop();

          if (!val) {
            this.jmpLabel(payload as string);
          }
        }
        break;

      case OpCode.CALL:
        this.ipStack.push(this.ip);
        this.jmpLabel(payload as string);
        break;

      case OpCode.RETURN:
        {
          if (payload == null) {
            this.stack.push("void");
          }

          const newIp = this.ipStack.pop();

          if (!newIp) throw new Error("IP Stack is empty!");

          this.ip = newIp;
        }
        break;

      case OpCode.PRINT:
        this.bindings.out(this.stack.pop());
        break;

      case OpCode.PUSH:
        if (payload === null) {
          throw new Error("PUSH: Payload is null!");
        }

        this.stack.push(payload);
        break;

      case OpCode.CALC:
        {
          const exp2 = this.stack.pop();
          const exp1 = this.stack.pop();
          const op = payload;

          if (typeof exp1 != "number") {
            throw new Error("CALC: Exp1 must be number!");
          }

          if (typeof exp2 != "number") {
            throw new Error("CALC: Exp2 must be number!");
          }

          switch (op) {
            case "+":
              this.stack.push(exp1 + exp2);
              break;

            case "-":
              this.stack.push(exp1 - exp2);
              break;

            case "/":
              this.stack.push(exp1 / exp2);
              break;

            case "*":
              this.stack.push(exp1 * exp2);
              break;

            case "mod":
              this.stack.push(exp1 % exp2);
              break;
          }
        }
        break;

      case OpCode.LOGIC:
        {
          const exp2 = this.stack.pop();
          const exp1 = this.stack.pop();
          const op = payload;

          switch (op) {
            case "és":
              this.stack.push(exp1 && exp2);
              break;

            case "vagy":
              this.stack.push(exp1 || exp2);
              break;

            default:
              throw new Error("Logic payload was bad!");
          }
        }
        break;

      case OpCode.COMP:
        {
          const exp2 = this.stack.pop();
          const exp1 = this.stack.pop();
          const op = payload;

          switch (op) {
            case "=/=":
              this.stack.push(exp1 != exp2);
              break;

            case "=":
              this.stack.push(exp1 == exp2);
              break;

            case "<=":
              this.stack.push(exp1 <= exp2);
              break;

            case ">=":
              this.stack.push(exp1 >= exp2);
              break;

            case "<":
              this.stack.push(exp1 < exp2);
              break;

            case ">":
              this.stack.push(exp1 > exp2);
              break;
          }
        }
        break;

      case OpCode.MKARR:
        {
          if (typeof payload != "string") throw new Error("MKARR: Payload must be string.");

          const length = this.stack.pop();
          if (typeof length != "number") throw new Error("MKARR: Length must be number.");
          
          const arr: Value[] = Array(length).fill(0);
          const head = this.store.arrayAdd(arr);         
          this.vars.makeReference(head, payload);
        }
        break;

      case OpCode.SETARR:
        {
          const idx = this.stack.pop();
          const val = this.stack.pop();


          if (typeof payload != "string") {
            throw new Error("SETARR: Varname must be string!");
          }

          if (typeof idx != "number") {
            throw new Error("SETARR: Idx must be number!");
          }

          const headValue = this.vars.getVar(payload);
          const headIdx = this.vars.getVarBoxIdx(payload);

          if (typeof headValue != "number" || headIdx == null) throw new Error("SETARR: Head wasn't an array header.");

          if (idx > headValue) {
            throw new Error("SETARR: Out-of-bounds");
          }

          const arrElem = this.store.getBox(headIdx + idx);
          arrElem.set(val);

          /*const arr = this.vars.getVar(payload);

          if (!Array.isArray(arr)) {
            throw new Error("SETARR: Arr must be an array!");
          }

          if (arr) {
            // Pseudocode is a 1-indexed lang.
            const maybeBox = arr[idx - 1];

            if (maybeBox instanceof Box) {
              maybeBox.set(val);
            } else {
              arr[idx-1] = val;
            }
          }*/
        }
        break;

      case OpCode.NOT:
        {
          const val = this.stack.pop();
          this.stack.push(!val);
        }
        break;

      case OpCode.VOID:
        this.stack.pop();
        break;

      default:
        throw new Error(OpCode[opCode] + " is not yet implemented!");
    }

    return false;
  }

  step(): boolean {
    const val = this.execute(this.fetch());
    this.ip++;

    return val;
  }

  run() {
    while (this.ip < this.code.length) {
      if (this.step()) return;
    }

    console.log(this.ip);
  }
}
