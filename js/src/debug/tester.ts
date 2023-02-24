import { astToString } from "./ast_printer.ts";
import { ASTCompiler } from "../compiler/pseudo_compiler.ts";
import { parseBlock } from "../compiler/pseudo_parser.ts";
import { VM } from "../runtime/vm.ts";

const input = `
            x <- 5
            ha x =/= 5 akkor
                kiír "HIBA"
            elágazás vége

            x <- 6

            ha x = 6 akkor
                kiír "OK"
            elágazás vége`;

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
  const bc = ASTCompiler.compile(input);
  const vm = new VM(bc, outputFn);

  vm.run();
}
