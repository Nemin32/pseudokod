import { ByteCode, OpCode } from "./opcodes.ts";
import { Atom } from "./pseudo_types.ts";
import { Stack } from "./stack.ts";
import { Environment } from "./variables.ts";

type Value = NonNullable<Atom["value"]>;

export class VM {
  ip = 0;
  stack: Stack<Value> = new Stack();
  ipStack: Array<number> = [];
  vars: Environment<Value> = new Environment();

  constructor(public code: Array<ByteCode>) {}

  dump() {
    for (const line of this.code) {
      console.log(`${OpCode[line.opCode]} ${line.payload ?? ""}`);
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

  execute({ opCode, payload }: ByteCode) {
    switch (opCode) {
      case OpCode.LABEL:
        break;

      case OpCode.ESCOPE:
        this.vars.makeScope();
        break;

      case OpCode.LSCOPE:
        this.vars.leaveScope();
        break;

      case OpCode.GETVAR:
        {
          const variable = this.vars.getVar(payload as string);

          if (variable == null) {
            throw new Error(`Variable '${variable}' doesn't exist!`);
          }

          this.stack.push(variable);
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
          if (payload != null) {
            this.stack.push(payload);
          }

          const newIp = this.ipStack.pop();

          if (!newIp) throw new Error("IP Stack is empty!");

          this.ip = newIp;
        }
        break;

      case OpCode.PRINT:
        console.log(this.stack.pop());
        break;

      case OpCode.PUSH:
        this.stack.push(payload);
        break;

      case OpCode.CALC:
        {
          const exp2 = this.stack.pop();
          const exp1 = this.stack.pop();
          const op = payload;

          switch (op) {
            case "+":
              this.stack.push(exp1 + exp2);
              break;

            case "-":
              this.stack.push(exp1 + exp2);
              break;

            case "/":
              this.stack.push(exp1 + exp2);
              break;

            case "*":
              this.stack.push(exp1 + exp2);
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

            case "==":
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

      case OpCode.MAKEARR:
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
            throw new Error("Varname must be string!");
          }

          const arr = this.vars.getVar(payload);

          if (arr) {
            arr[idx] = val;
          }
        }
        break;

      case OpCode.NOT:
        {
          const val = this.stack.pop();
          this.stack.push(!val);
        }
        break;

      default:
        throw new Error(OpCode[opCode] + " is not yet implemented!");
    }
  }

  step() {
    this.execute(this.fetch());
    this.ip++;
  }

  run() {
    while (this.ip < this.code.length) {
      this.step();
    }
  }
}
