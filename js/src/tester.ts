import { astToString } from "./ast_printer.ts";
import { ASTCompiler } from "./pseudo_compiler.ts";
import { parsePrintStatement } from "./pseudo_parser.ts";
import { VM } from "./vm.ts";

const input = `kiír ~igaz`

parsePrintStatement.run(input).onSuccess(ast => {
  console.log("AST:\n"+astToString(ast.value)+"\n")

  const compiler = new ASTCompiler();

  compiler.visitPrint(ast.value)

  const vm = new VM(compiler.bytecode);

  console.log("Bytecode:")

  vm.dump()

  console.log("\nValue:")
  vm.run()
}).onError(err => {
  console.error("Error: " + err.what);
})