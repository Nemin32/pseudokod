import { ByteCode, OpCode } from "./opcodes.ts";

export class VM {
  ip = 0;
  stack: Array<any> = [];

  constructor(public code: Array<ByteCode>) {}

  fetch(): ByteCode {
    if (this.ip < this.code.length) {
      return this.code[this.ip];
    }

    throw new Error("IP ran out of tape.");
  }

  execute({ opCode, payload }: ByteCode) {
    switch (opCode) {
      case OpCode.PRINT:
        console.log(this.stack.pop());
        break;

      case OpCode.PUSH:
        this.stack.push(payload);
        break;

      case OpCode.CALC:
        this.stack.push(this.stack.pop() + this.stack.pop());
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