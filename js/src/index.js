import antlr4 from "antlr4";
import PseudoCodeLexer from "./libs/PseudoCodeLexer.js";
import PseudoCodeParser from "./libs/PseudoCodeParser.js";
import { LinearExecutor, LinearGenerator } from "./LinearGenerator.js";
// import { PseudoVisitor } from "./PseudoVisitor.js";

export { LinearExecutor } from "./LinearGenerator.js";

function generateAST(input) {
  const chars = new antlr4.InputStream(input + "\n");
  const lexer = new PseudoCodeLexer(chars);

  // lexer.removeErrorListeners();
  // lexer.addErrorListener({ syntaxError: errorFunc });

  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new PseudoCodeParser(tokens);

  // parser.removeErrorListeners();
  // parser.addErrorListener({ syntaxError: errorFunc });

  const tree = parser.program();

  return tree;
}

export function generateLinearEnvironment(input) {
  const tree = generateAST(input)
  const generator = new LinearGenerator()

  generator.visit(tree)

  return generator.output
}

export function runLinear(input, outputFunc) {
  const env = generateLinearEnvironment(input)
  const executor = new LinearExecutor(env, outputFunc)

  executor.run()
}

/*
export function runText(input, errorFunc, outputFunc, varOutput) {
  const tree = generateAST(input)
  const visitor = new PseudoVisitor(outputFunc, varOutput);

  visitor.visit(tree)
}
*/


console.log("Hello!")