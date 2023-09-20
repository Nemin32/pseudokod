import { IToken } from "./ITokenizer.ts";
import { Block } from "./astkinds.ts";

// IAST -> IByteCode
export enum OpCode {
  ADDRESS,
  ARRADDR,

  CALL,
  RETURN,
  
  PUSHS,

  VALARR,
  PUSH,
  BINOP,
  NOT,
  PRINT,
  VOID,

  GETARR,
  GETVAR,

  SETARR,
  SETVAR,

  LABEL,
  FJMP,
  JMP,

  ESCOPE,
  LSCOPE,

  MKARR,
  MKREF,

  DEBUG,
}

export interface IByteCode {
  opCode: OpCode;
  token: IToken
}

export interface ICompiler {
  compile(input: Block): IByteCode[];
}
