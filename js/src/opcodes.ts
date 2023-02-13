import { Atom } from "./pseudo_types";

export enum OpCode {
  CALC,
  CALL,
  COMP,
  FJMP,
  GETVAR,
  JMP,
  LABEL,
  LOGIC,
  MAKEARR,
  NOT,
  PRINT,
  PUSH,
  RETURN,
  SETARR,
  SETVAR,
  TJMP,
  VALARR,
}

export type ByteCode = {
  opCode: OpCode;
  payload: Atom["value"];
};
