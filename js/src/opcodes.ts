export enum OpCode {
  PRINT,
  PUSH,
  CALC,
  NOT,
}

export type ByteCode = {
  opCode: OpCode,
  payload: any
}