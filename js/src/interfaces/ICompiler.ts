import { AtomValue, IAST } from "./IParser.ts";

// IAST -> IByteCode
enum OpCode {
  ADDRESS = 0,
  ARRADDR = 1,

  CALL = 2,
  RETURN = 3,

  VALARR = 4,
  PUSH = 5,
  BINOP = 6,
  NOT = 7,
  PRINT = 8,
  VOID = 9,

  GETARR = 10,
  GETVAR = 11,

  SETARR = 12,
  SETVAR = 13,

  LABEL = 14,
  FJMP = 15,
  JMP = 16,

  ESCOPE = 17,
  LSCOPE = 18,

  MKARR = 19,
  MKREF = 20,

  DEBUG = 21,
}

export interface IByteCode {
  opCode: OpCode;
  payload?: AtomValue;
  ast: IAST;
}

export interface ICompiler {
  compile(input: IAST): IByteCode[];
}
