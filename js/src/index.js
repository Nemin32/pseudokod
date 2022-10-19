import antlr4 from "antlr4";
import PseudoCodeLexer from "./libs/PseudoCodeLexer.js";
import PseudoCodeParser from "./libs/PseudoCodeParser.js";
import { LinearExecutor, LinearGenerator } from "./LinearGenerator.js";

import { PseudoVisitor } from "./PseudoVisitor.js";

const binput = `
ha igaz akkor
kiir "1. Elág jó"
elágazás vége

ha hamis akkor
dummy
különben
kiir "2. Elág jó"
elágazás vége

ha hamis akkor
dummy
különben ha hamis akkor
dummy
különben
kiir "3. Elág jó"
elágazás vége

ha hamis akkor
dummy
különben ha igaz akkor
kiir "4. Elág jó"
különben
dummy
elágazás vége

x <- 5

ha x = x akkor
kiir "If jó"
különben
kiir "If rossz"
elágazás vége

ciklus i <- 1-től x*2-ig
kiir i * 2
ciklus vége

x <- 1
ciklus amíg x < 5
x <- x + 1
ciklus vége

ha x = 5 akkor
kiir "While jó"
különben
kiir "While hibás"
kiir x
elágazás vége

x <- 1
ciklus
x <- x + 1
amíg x < 5
kiir x

ha x = 5 akkor
kiir "Do While 1. jó"
különben
kiir "Do While 1. hibás"
kiir x
elágazás vége

függvény Paramnelkul()
 vissza 5
függvény vége

függvény Egyparameter(x : egész)
 vissza x * 2
függvény vége

függvény Ketparameter(x : egész, y : logikai)
 ha y akkor
vissza x + 3
 különben
vissza x - 3
 elágazás vége
függvény vége

kiir Paramnelkul()
kiir Egyparameter(5)
kiir Ketparameter(3, igaz)

függvény Faktorialis(x : egész)
debug
  ha x <= 1 akkor
    vissza x
  különben
    vissza x * Faktorialis(x - 1)
  elágazás vége
függvény vége

kiir Faktorialis(5)

`;

const ainput = `
függvény LNKO(m : egész, n : egész)
  r <- m mod n
  
  ciklus amíg r =/= 0
    m <- n
    n <- r
    r <- m mod n  
  ciklus vége

  vissza n
függvény vége

kiir LNKO(15, 33)
`

export { LinearExecutor } from "./LinearGenerator.js";

export function createProgram(input) {
  const chars = new antlr4.InputStream(input + "\n");
  const lexer = new PseudoCodeLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new PseudoCodeParser(tokens);
  const tree = parser.program();

  const generator = new LinearGenerator()
  generator.visit(tree)

  return generator.output
}

export function runLinear(input, outputFunc) {
  const chars = new antlr4.InputStream(input + "\n");
  const lexer = new PseudoCodeLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new PseudoCodeParser(tokens);
  const tree = parser.program();

  const generator = new LinearGenerator()
  generator.visit(tree)

  const executor = new LinearExecutor(generator.output, outputFunc)
  executor.run()
}

export function runText(input, errorFunc, outputFunc, varOutput) {
  const chars = new antlr4.InputStream(input + "\n");
  const lexer = new PseudoCodeLexer(chars);

  lexer.removeErrorListeners();
  lexer.addErrorListener({ syntaxError: errorFunc });

  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new PseudoCodeParser(tokens);

  parser.removeErrorListeners();
  parser.addErrorListener({ syntaxError: errorFunc });

  const tree = parser.program();

  const visitor = new PseudoVisitor(outputFunc, varOutput);
  const generator = new LinearGenerator()

  //outputFunc(tree.toStringTree(parser.ruleNames))

  //outputFunc("VISITOR:")
  visitor.visit(tree);

  /*
  generator.visit(tree)

  const executor = new LinearExecutor(generator.output, outputFunc)

  outputFunc("EXECUTOR:")
  executor.run()
  */
}


console.log("Hello!")