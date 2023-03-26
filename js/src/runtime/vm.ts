import { ByteCode, OpCode } from "../compiler/opcodes.js";
import { Atom, AtomValue } from "../compiler/pseudo_types.js";
import { Stack } from "./stack.js";
import { Environment, IEnvironment } from "./environment.js";
import { Store } from "./store.js";
import { Box } from "./box.js";

type NoArrValue = Atom["value"];
type Value = NoArrValue;

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
      /* Misc. */
      case OpCode.DEBUG:
        return true;

      case OpCode.LABEL:
        break;

      case OpCode.VOID:
        this.stack.pop("any");
        break;

      case OpCode.PRINT:
        this.bindings.out(this.stack.pop("any"));
        break;

      /* Variables */
      case OpCode.SETVAR:
        this.vars.setVar(payload as string, this.stack.pop("any"));
        break;

      case OpCode.GETVAR:
        this.stack.push(this.vars.getVar(payload as string));
        break;

      case OpCode.SETARR:
        {
          const offset = this.stack.pop("number") - 1;
          const value = this.stack.pop("any");
          const headIdx = this.vars.getBoxIndex(payload as string);
          const arrayIndex = this.store.getArrayElementBoxIndex(headIdx, offset);

          this.store.set(arrayIndex, value);
        }
        break;

      case OpCode.GETARR:
        {
          const offset = this.stack.pop("number") - 1;
          const headIdx = this.vars.getBoxIndex(payload as string);

          this.stack.push(this.store.getArrayElement(headIdx, offset));
        }
        break;

      case OpCode.ESCOPE:
        this.vars.enterScope(payload == "func");
        break;

      case OpCode.LSCOPE:
        this.vars.leaveScope();
        break;

      /* References */
      case OpCode.ADDRESS:
        this.stack.push(this.vars.getBoxIndex(payload as string));
        break;

      case OpCode.ARRADDR:
        {
          const offset = this.stack.pop("number") - 1;
          const headIdx = this.vars.getBoxIndex(payload as string);

          this.stack.push(this.store.getArrayElementBoxIndex(headIdx, offset));
        }
        break;

      case OpCode.MKREF:
        {
          const source = this.stack.pop("any");
          if (!(typeof source == "number" || typeof source == "string")) {
            throw new Error("MKREF: Source must be string or number.");
          }

          this.vars.makeReference(source, payload as string);
        }
        break;

      /* Stack */
      case OpCode.CALC:
        {
          const exp2 = this.stack.pop("number");
          const exp1 = this.stack.pop("number");

          switch (payload as string) {
            case "+":
              this.stack.push(exp1 + exp2);
              break;
            case "-":
              this.stack.push(exp1 - exp2);
              break;
            case "*":
              this.stack.push(exp1 * exp2);
              break;
            case "/":
              this.stack.push(exp1 / exp2);
              break;
            case "mod":
              this.stack.push(exp1 % exp2);
              break;

            default:
              throw new Error("CALC: Payload was " + payload);
          }
        }
        break;

      case OpCode.COMP:
        {
          const exp2 = this.stack.pop("number");
          const exp1 = this.stack.pop("number");

          switch (payload) {
            case "=":
              this.stack.push(exp1 == exp2);
              break;
            case "=/=":
              this.stack.push(exp1 != exp2);
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

            default:
              throw new Error("COMP: Payload was " + payload);
          }
        }
        break;

      case OpCode.LOGIC:
        {
          const exp2 = this.stack.pop("boolean");
          const exp1 = this.stack.pop("boolean");

          switch (payload as string) {
            case "és":
              this.stack.push(exp1 && exp2);
              break;
            case "vagy":
              this.stack.push(exp1 || exp2);
              break;

            default:
              throw new Error("LOGIC: Payload was " + payload);
          }
        }
        break;

      case OpCode.NOT:
        this.stack.push(!this.stack.pop("boolean"));
        break;

      case OpCode.PUSH:
        this.stack.push(payload as Exclude<typeof payload, null>);
        break;

      /* Functions */
      case OpCode.TJMP:
        if (this.stack.pop("boolean") == true) this.jmpLabel(payload as string);
        break;

      case OpCode.FJMP:
        if (this.stack.pop("boolean") == false) this.jmpLabel(payload as string);
        break;

      case OpCode.JMP:
        this.jmpLabel(payload as string);
        break;

      case OpCode.RETURN: {
        if (payload != null) {
          this.stack.push("any");
        }

        const newIp = this.ipStack.pop();

        if (newIp === undefined) {
          throw new Error("Ip stack is empty.");
        }

        this.ip = newIp;
      }
      break;

      case OpCode.CALL:
        this.ipStack.push(this.ip + 1);
        this.jmpLabel(payload as string);
        break;

      /* Arrays */
      case OpCode.MKARR:
        this.stack.push(Array(payload as number).fill(0) as any);
        break;

      case OpCode.VALARR:
        {
          let arr: Value[] = [];
          for (let i = 0; i < (payload as number); i++) {
            arr.push(this.stack.pop("any"));
          }

          arr.reverse();

          this.stack.push(arr as any);
        }
        break;
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
