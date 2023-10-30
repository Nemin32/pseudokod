import { OpCode as OC } from "./ICompiler.ts";
import { ASTKind, Atom, BinOpType } from "./astkinds.ts";

// Makes addOp type safe, also helps with VM's destructuring.
type ArraySignature = { name: string, dimensions: number }; // Varname, index dimension
export type Inst =
	({ code: OC.ADDRESS, name: string }
		| { code: OC.ARRADDR } & ArraySignature
		| { code: OC.COMPRE, name: string, length: number }
		| { code: OC.ARRCMP, length: number } & ArraySignature
		| { code: OC.BINOP, type: BinOpType }
		| { code: OC.CALL, name: string }
		| { code: OC.DEBUG, msg: string }
		| { code: OC.ESCOPE, isFun: boolean }
		| { code: OC.FJMP, label: string }
		| { code: OC.GETARR } & ArraySignature
		| { code: OC.GETVAR, name: string }
		| { code: OC.JMP, label: string }
		| { code: OC.LABEL, name: string }
		| { code: OC.LSCOPE }
		| { code: OC.MKARR, name: string, numDimensions: number }
		| { code: OC.MKREF, name: string } // Varname (of end result!)
		| { code: OC.NOT }
		| { code: OC.PRINT }
		| { code: OC.PUSH, value: Atom["value"] }
		| { code: OC.RETURN }
		| { code: OC.RETCMP, length: number }
		| { code: OC.SETARR } & ArraySignature
		| { code: OC.SETVAR, name: string }
		| { code: OC.VOID }) & { origin: ASTKind }
