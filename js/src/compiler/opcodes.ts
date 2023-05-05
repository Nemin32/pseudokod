import { AST, Atom, Block, Parameter } from "./pseudo_types.ts";

export enum OpCode {
  CALC,
  CALL,
  COMP,
  DEBUG,
  ESCOPE,
  FJMP,
  ADDRESS,
  ARRADDR,
  GETARR,
  GETVAR,
  JMP,
  LABEL,
  LOGIC,
  LSCOPE,
  MKARR,
  MKREF,
  NOT,
  PRINT,
  PUSH,
  RETURN,
  SETARR,
  SETVAR,
  TJMP,
  VALARR,
  VOID,
}

export type ByteCode = {
  opCode: OpCode;
  payload: Atom["value"] | null;
  ast: Exclude<AST, Block | Parameter[]>
};
