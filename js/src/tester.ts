import { astToString } from "./ast_printer.js";
import { ASTCompiler } from "./pseudo_compiler.js";
import { parseBlock } from "./pseudo_parser.js";
import { VM } from "./vm";

const input = `függvény Teszt(címszerint x : egesz, y : egesz)
vissza x + y
függvény vége
x <- Teszt(5, 6)
kiír x`

/*const input = `x <- 5+5
kiír "ekcske"
kiír x`*/

parseBlock.run(input).onSuccess(ast => {
  console.log("AST:\n"+astToString(ast.value)+"\n")

  const compiler = new ASTCompiler();

  compiler.visitBlock(ast.value)

  const vm = new VM(compiler.bytecode);

  console.log("Bytecode:")

  vm.dump()

  console.log("\nValue:")
  vm.run()
}).onError(err => {
  console.error("Error: " + err.what);
})