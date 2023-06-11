import { AST, Atom, Block, Parameter } from "./pseudo_types.ts";

export enum OpCode {
  CALC = 0,
  CALL = 1,
  COMP = 2,
  DEBUG = 3,
  ESCOPE = 4,
  FJMP = 5,
  ADDRESS = 6,
  ARRADDR = 7,
  GETARR = 8,
  GETVAR = 9,
  JMP = 10,
  LABEL = 11,
  LOGIC = 12,
  LSCOPE = 13,
  MKARR = 14,
  MKREF = 15,
  NOT = 16,
  PRINT = 17,
  PUSH = 18,
  RETURN = 19,
  SETARR = 20,
  SETVAR = 21,
  VALARR = 22,
  VOID = 23,
}

export type ByteCode = {
  opCode: OpCode;
  payload: Atom["value"] | null;
  ast: Exclude<AST, Block | Parameter[]>;
};
