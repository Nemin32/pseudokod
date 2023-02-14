import { astToString } from "./ast_printer.ts";
import { ASTCompiler } from "./pseudo_compiler.ts";
import { parseBlock } from "./pseudo_parser.ts";
import { VM } from "./vm.ts";

const ainput = `függvény Teszt(címszerint x : egesz, y : egesz)
vissza x + y
függvény vége
x <- Teszt(5, 6)
kiír x`;

const input = `a <- Létrehoz[egész](3+5)
a[5] <- 3
kiír a`;

// const input = "kiír igaz || hamis"

/*const input = `x <- 5+5
kiír "ekcske"
kiír x`*/

// const input = prompt("> ") ?? ""

parseBlock.run(input).onSuccess((ast) => {
  console.log("AST:\n" + astToString(ast.value) + "\n");

  const compiler = new ASTCompiler();

  compiler.visitBlock(ast.value);

  const vm = new VM(compiler.bytecode);

  console.log("Bytecode:");

  vm.dump();

  console.log("\nValue:");
  vm.run();
}).onError((err) => {
  console.error("Error: " + err.what);
});
