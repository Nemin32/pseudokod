import { Atom } from "./pseudo_types.ts";

export enum OpCode {
  CALC,
  COMP,
  GETVAR,
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
