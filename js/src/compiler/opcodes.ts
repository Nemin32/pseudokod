import { Atom } from "./pseudo_types.ts";

export enum OpCode {
  CALC,
  CALL,
  COMP,
  DEBUG,
  ESCOPE,
  FJMP,
  GETARR,
  GETVAR,
  JMP,
  LABEL,
  LOGIC,
  LSCOPE,
  MAKEARR,
  NOT,
  PRINT,
  PUSH,
  REFERENCE,
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
};
