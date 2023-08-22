import { AtomValue, IAST } from "./IParser";

// IAST -> IByteCode
enum OpCode {}

export interface IByteCode {
  opCode: OpCode;
  payload?: AtomValue
  ast: IAST;
}

export interface ICompiler {
  compile(input: IAST): IByteCode[];
}
