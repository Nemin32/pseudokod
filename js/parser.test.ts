import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import * as testCases from "./testcases.ts";
import { execute } from "./src/tester.ts";
import { AtomValue } from "./src/pseudo_types.ts";

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

    execute(test.input, mock.fn.bind(mock));

    assertEquals(mock.values.length, 1);
    assertEquals(mock.values[0], test.output ?? "OK");
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
