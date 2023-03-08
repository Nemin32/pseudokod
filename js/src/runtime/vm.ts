import { ByteCode, OpCode } from "../compiler/opcodes.js";
import { Atom } from "../compiler/pseudo_types.js";
import { Stack } from "./stack.js";
import { Environment, IEnvironment } from "./variables.js";

type Value = Atom["value"];

export interface IBindings {
  out: (value: Value) => void;
  stack: (stack: Value[]) => void;
}

export class VM {
  ip = 0;
  private stack: Stack<Value>;
  private ipStack: Array<number> = [];
  private vars: IEnvironment<Value> = new Environment();
  private code: Array<ByteCode> = [];

  constructor(private bindings: IBindings) {
    this.stack = new Stack(bindings.stack);
  }

  setup(code: ByteCode[]) {
    this.ip = 0;
    this.ipStack = [];
    this.vars.reset();
    this.stack.reset();

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

          if (typeof originalVar != "string") {
            throw new Error("Variable name must be string.");
          }

          this.vars.makeReference(originalVar, payload);
        }
        break;

      case OpCode.GETARR:
        {
          const index = this.stack.pop();
          const variable = this.stack.pop();

          if (typeof index != "number") {
            throw new Error("GETARR: Index must be a number!");
          }

          if (!Array.isArray(variable)) {
            throw new Error("GETARR: Variable must be an array!");
          }

          // Pseudocode is 1-indexed.
          this.stack.push(variable[index - 1]);
        }
        break;

      case OpCode.GETVAR:
        {
          const variable = this.vars.getVar(payload as string);

          if (variable == null) {
            throw new Error(`Variable '${payload}' doesn't exist!`);
          }

          this.stack.push(variable.value);
        }
        break;

      case OpCode.SETVAR:
        this.vars.setVar(payload as string, this.stack.pop());
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
            case "&&":
              this.stack.push(exp1 && exp2);
              break;

            case "||":
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
          const length = this.stack.pop();
          const arr: Value = Array(length).fill(0);
          this.stack.push(arr);
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

          const arr = this.vars.getVar(payload)?.value;

          if (!Array.isArray(arr)) {
            throw new Error("SETARR: Arr must be an array!");
          }

          if (arr) {
            // Pseudocode is a 1-indexed lang.
            arr[idx - 1] = val;
          }
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
