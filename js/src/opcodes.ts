import { Atom } from "./pseudo_types";

export enum OpCode {
  CALC,
  COMP,
  FJMP,
  GETVAR,
  JMP,
  LABEL,
  LOGIC,
  NOT,
  PRINT,
  PUSH,
  RETURN,
  SETVAR,
}

export type ByteCode = {
  opCode: OpCode;
  payload: Atom["value"];
};
