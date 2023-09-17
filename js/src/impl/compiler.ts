import { IByteCode, OpCode } from "../interfaces/ICompiler.ts";
import { IAST } from "../interfaces/IParser.ts";
import { ASTKind, Atom, Block, Not, Print } from "../interfaces/astkinds.ts";
import { parseBlock } from "./parser/ast_parser.ts";
import { t } from "./parser/test.ts";

class Compiler {
  byteCode: (OpCode | number)[] = [];

  strings: { str: string; start: number }[] = [];
  sIdx = 0;

  addRaw(num: number) {
    this.byteCode.push(num);
  }

  addOp(op: OpCode) {
    this.byteCode.push(op);
  }

  addString(str: string) {
    this.addRaw(str.length);
    this.addRaw(this.internString(str));
  }

  private internString(str: string): number {
    const match = this.strings.find((s) => s.str === str);
    if (match) {
      return match.start;
    }

    const start = this.sIdx;
    this.strings.push({ start, str });
    this.sIdx += str.length;
    console.log(str);
    console.log(str.length);
    return start;
  }

  visitAtom(atom: Atom) {
    if (typeof atom.value === "string") {
      this.addOp(OpCode.PUSHS);
      this.addString(atom.value);
    } else {
      this.addOp(OpCode.PUSH);
      this.addRaw(Number(atom.value));
    }
  }

  visitBlock(block: Block) {
    for (const stmt of block.statements) {
      this.visit(stmt);
    }
  }

  visitPrint(print: Print) {
    this.visit(print.expr);
    this.addOp(OpCode.PRINT);
  }

  visitNot(not: Not) {
    this.visit(not.expr);
    this.addOp(OpCode.NOT);
  }

  visit(val: IAST<ASTKind>) {
    switch (val.kind.tag) {
      case "atom":
        return this.visitAtom(val.kind);
      case "binop":
      case "variable":
      case "reference":
        break;
      case "not":
        return this.visitNot(val.kind);
      case "arrcomp":
      case "arrindex":
      case "funccall":
      case "arrnew":
      case "if":
      case "assign":
      case "while":
      case "for":
        break;
      case "print":
        return this.visitPrint(val.kind);
      case "return":
      case "funcdecl":
      case "debug":
        break;
      case "block":
        return this.visitBlock(val.kind);
      case "param":
    }
  }

  compile(input: IAST<Block>) {
    this.visit(input);
    this.addRaw(99);
    const chars = this.strings.flatMap((s) => [...s.str].map((c) => c.charCodeAt(0)));

    for (const char of chars) {
      this.addRaw(char);
    }
  }
}

class VM {
  stringStart: number;
  index = 0;
  stack: (number | string)[] = [];

  constructor(private tape: (OpCode | number)[]) {
    this.stringStart = tape.findIndex((elem) => elem === 99) + 1;
    if (this.stringStart === 0) throw new Error("No end of tape!");
  }

  get() {
    return this.tape[this.index++];
  }

  getString(start: number, length: number) {
    const str = String.fromCharCode(
      ...this.tape.slice(this.stringStart + start, this.stringStart + start + length),
    );
    console.log(`STR: ${start}-${start + length} = ${str}`);
    return str;
  }

  step() {
    const op = this.get() as OpCode;

    switch (op) {
      case OpCode.ADDRESS:
      case OpCode.ARRADDR:
      case OpCode.CALL:
      case OpCode.RETURN:
      case OpCode.PUSHS: {
        const length = this.get();
        const start = this.get();
        this.stack.push(this.getString(start, length));
      }
      break;
      case OpCode.VALARR:
      case OpCode.PUSH: {
        this.stack.push(this.get());
      }
      break;
      case OpCode.BINOP:
      case OpCode.NOT:
      case OpCode.PRINT: {
        console.log(this.stack.pop());
      }
      break;
      case OpCode.VOID:
      case OpCode.GETARR:
      case OpCode.GETVAR:
      case OpCode.SETARR:
      case OpCode.SETVAR:
      case OpCode.LABEL:
      case OpCode.FJMP:
      case OpCode.JMP:
      case OpCode.ESCOPE:
      case OpCode.LSCOPE:
      case OpCode.MKARR:
      case OpCode.MKREF:
      case OpCode.DEBUG:
        break;
      default:
        throw new Error(`Invalid OpCode: ${op}`);
    }

    console.log(`${op}: ${OpCode[op]}`);
  }
}

const tokens = t(`kiír "hello" kiír "hello" kiír "world" kiír "world"`);
const ast = parseBlock.run(tokens);

if (ast.type === "match") {
  const compiler = new Compiler();
  compiler.compile(ast.value);
  console.log(compiler.strings);
  console.log(compiler.byteCode);

  const vm = new VM(compiler.byteCode);
  vm.step();
  vm.step();
  vm.step();
  vm.step();
} else {
  console.log(ast);
}
