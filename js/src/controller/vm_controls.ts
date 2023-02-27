import { ByteCode, OpCode } from "../compiler/opcodes.ts";
import { ASTCompiler } from "../compiler/pseudo_compiler.ts";
import { parseBlock } from "../compiler/pseudo_parser.ts";
import { AtomValue } from "../compiler/pseudo_types.ts";
import { PseudoToken, Tokenizer, TokenType } from "../parser/tokenizer.ts";
import { VM } from "../runtime/vm.ts";
import { colorize } from "./syntax_highlight.ts";

self.addEventListener("load", () => {
  const domElements: Readonly<Record<string, HTMLElement>> = Object.fromEntries(
    [
      /* User controls */
      ["codeInput", "#input"],
      ["syntaxHighlightOverlay", "#syntax"],
      ["compileButton", "#compile"],
      ["instStepButton", "#step"],
      ["lineStepButton", "#stepLine"],
      ["runButton", "#run"],

      /* Program output */
      ["standardOutput", "#output div"],
      ["vmInstructions", "#code div"],
      ["variableInspector", "#vars div"],
      ["stackInspector", "#stack div"],
      ["ipStackInspector", "#ipStack div"],
    ].map(([name, id]) => [name, document.querySelector(id)!]),
  );

  let tokens: PseudoToken[] = [];
  let byteCode: Array<ByteCode> = [];
  let vm: VM | null = null;

  domElements.codeInput.addEventListener("input", () => {
    console.time("tokenize");
    const input = (domElements.codeInput as HTMLTextAreaElement).value;
    const tk = new Tokenizer(input + "\n");
    tokens = tk.parse();
    console.timeEnd("tokenize");

    console.time("colorize");
    colorize(<HTMLDivElement> domElements.syntaxHighlightOverlay, tokens);
    console.timeEnd("colorize");
  });

  domElements.codeInput.addEventListener("scroll", () => {
    domElements.syntaxHighlightOverlay.scrollTop =
      domElements.codeInput.scrollTop;
  });

  domElements.compileButton.addEventListener("click", () => {
    domElements.standardOutput.innerText = "";

    console.time("parsing");

    const filtered = tokens.filter((t) => t.type != TokenType.WHITESPACE);
    const AST = parseBlock.run(filtered);

    if (!AST) {
      console.timeEnd("parsing");
      throw new Error("Couldn't convert tokens to AST!");
    }

    const compiler = new ASTCompiler();
    compiler.visitBlock(AST[0]);
    byteCode = compiler.bytecode; //ASTCompiler.compile(input);
    console.timeEnd("parsing");

    let indent = -2;
    const spans: HTMLSpanElement[] = byteCode
      .map((value, idx) => {
        const span = document.createElement("span");
        const pre = document.createElement("pre");

        if (value.opCode == OpCode.ESCOPE) indent += 2;

        pre.innerText = `${String(idx).padStart(4, " ")}: ${
          " ".repeat(indent) + OpCode[value.opCode].padEnd(6, " ")
        } ${value.payload ?? ""}`;

        span.appendChild(pre);

        if (value.opCode == OpCode.LSCOPE) indent -= 2;
        return span;
      });

    vm = new VM(byteCode, {
      out: (value) => {
        domElements.standardOutput.innerText += value + "\n";
      },
      stack: (stack: AtomValue[]) => {
        domElements.stackInspector.innerText = "";
        stack.forEach((e) => {
          domElements.stackInspector.innerText += e + "\n";
        });
      },
    });

    domElements.vmInstructions.replaceChildren(...spans);
  });

  domElements.runButton.addEventListener("click", () => {
    try {
      vm?.run();
    } catch (_) {
      console.log(vm?.ip);
    }
  });

  domElements.instStepButton.addEventListener("click", () => {
    vm?.step();
  });
});
