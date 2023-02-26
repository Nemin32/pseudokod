import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import * as testCases from "./testcases.ts";
import { execute } from "../src/debug/tester.ts";
import { AtomValue } from "../src/compiler/pseudo_types.ts";
import { Tokenizer, TokenType } from "../src/parser/tokenizer.ts";
import { parseBlock } from "../src/compiler/pseudo_parser.ts";
import { ASTCompiler } from "../src/compiler/pseudo_compiler.ts";
import { VM } from "../src/runtime/vm.ts";

class MockOutput {
  values: AtomValue[] = [];

  fn(value: AtomValue) {
    this.values.push(value);
  }
}

type Test = { name: string; input: string; output?: any };

async function generateTest(t: Deno.TestContext, test: Test) {
  return await t.step(test.name, () => {
    const mock = new MockOutput();

    // execute(test.input, mock.fn.bind(mock));
    const tokens = new Tokenizer(test.input).parse().filter(t => t.type != TokenType.WHITESPACE);
    const AST = parseBlock.run(tokens).filter(c => c.kind == "capture" && c.done()).at(0)

    if (AST && AST.kind == "capture") {
      const compiler = new ASTCompiler();
      compiler.visitBlock(AST.value);

      const vm = new VM(compiler.bytecode, mock.fn.bind(mock))
      vm.run()

      assertEquals(mock.values.length, 1);
      assertEquals(mock.values[0], test.output ?? "OK");
    } else {
      throw new Error("Error while parsing: '" + AST?.where.tokens[AST.where.index].lexeme + "'")
    }
  });
}

function generateGroup(group: { name: string; tests: Test[] }) {
  Deno.test(group.name, async (t) => {
    for (const test of group.tests) {
      await generateTest(t, test);
    }
  });
}

generateGroup(testCases.primitive_tests)
generateGroup(testCases.if_tests)
generateGroup(testCases.math_tests)
generateGroup(testCases.array_tests)
generateGroup(testCases.return_tests)
generateGroup(testCases.function_tests)
generateGroup(testCases.variable_tests)
generateGroup(testCases.comparison_tests)
