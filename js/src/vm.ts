import { ByteCode, OpCode } from "./opcodes.ts";

export class VM {
  ip = 0;
  stack: Array<any> = [];

  constructor(public code: Array<ByteCode>) {}

  dump() {
    for (const line of this.code) {
      console.log(`${OpCode[line.opCode]} ${line.payload ?? ""}`)
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

      case OpCode.JMP:
        this.jmpLabel(payload as string);
        break;

      case OpCode.FJMP:
        {
          const val = this.stack.pop()

          if (!val) {
            this.jmpLabel(payload as string);
          }
        }
        break;

      case OpCode.PRINT:
        console.log(this.stack.pop());
        break;

      case OpCode.PUSH:
        this.stack.push(payload);
        break;

      case OpCode.CALC:
        this.stack.push(this.stack.pop() + this.stack.pop());
        break;

      case OpCode.NOT:
        {
          const val = this.stack.pop();
          this.stack.push(!val);
        }
        break;
      
      default:
        throw new Error(OpCode[opCode] + " is not yet implemented!")
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

/*
const testVM = new VM([
  {opCode: OpCode.PUSH, payload: 5},
  {opCode: OpCode.PUSH, payload: 5},
  {opCode: OpCode.CALC, payload: null},
  {opCode: OpCode.PRINT, payload: null},
])

testVM.run()
*/