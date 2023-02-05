import { astToString } from "./ast_printer.js";
import { ASTCompiler } from "./pseudo_compiler.js";
import { parseAtom, parsePrintStatement, parseWhileStatement } from "./pseudo_parser.js";
import { VM } from "./vm";

/*const input = `ciklus amíg igaz
kiír ~igaz
ciklus vége`*/

const input = "kiír igaz"

parsePrintStatement.run(input).onSuccess(ast => {
  console.log("AST:\n"+astToString(ast.value)+"\n")

  const compiler = new ASTCompiler();


  console.log(ast.value)

  compiler.visitPrint(ast.value)

  const vm = new VM(compiler.bytecode);

  console.log("Bytecode:")

  vm.dump()

  console.log("\nValue:")
  vm.run()
}).onError(err => {
  console.error("Error: " + err.what);
})