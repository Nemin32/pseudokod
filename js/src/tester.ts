import { ASTCompiler } from "./pseudo_compiler.ts";
import { parsePrintStatement } from "./pseudo_parser.ts";
import { VM } from "./vm.ts";

const input = `kiír 5 + 5`

const ast = parsePrintStatement.run(input).unwrap().value;

const compiler = new ASTCompiler();

compiler.visitPrint(ast)

const vm = new VM(compiler.bytecode);

console.log(compiler.bytecode)

vm.run()