import { astToString } from "./ast_printer.ts";
import { ASTCompiler } from "./pseudo_compiler.ts";
import { parseBlock } from "./pseudo_parser.ts";
import { VM } from "./vm.ts";

const input = `
            x<-3
            függvény Teszt(x : egész)
                vissza x * 2
            függvény vége
            kiír Teszt(x)`

// const input = "kiír igaz || hamis"

/*const input = `x <- 5+5
kiír "ekcske"
kiír x`*/

// const input = prompt("> ") ?? ""

parseBlock.run(input).onSuccess((ast) => {
  console.log("AST:\n" + astToString(ast.value) + "\n");

  const compiler = new ASTCompiler();

  compiler.visitBlock(ast.value);

  const vm = new VM(compiler.bytecode, console.log);

  console.log("Bytecode:");

  vm.dump();

  console.log("\nValue:");
  vm.run();
}).onError((err) => {
  console.error(err.where.index + ". Error: " + err.what);
});

export function execute(input: string, outputFn: (val: any) => void) {
  parseBlock.run(input)
    .onError((err) => {
      throw new Error(err.what);
    })
    .onSuccess((ast) => {
      const compiler = new ASTCompiler();
      compiler.visitBlock(ast.value);

      const vm = new VM(compiler.bytecode, outputFn);
      vm.run();
    });
}
