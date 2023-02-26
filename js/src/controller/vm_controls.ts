import { ByteCode, OpCode } from "../compiler/opcodes.ts";
import { ASTCompiler } from "../compiler/pseudo_compiler.ts";
import { parseBlock } from "../compiler/pseudo_parser.ts";
import { astToString } from "../debug/ast_printer.ts";
import { PseudoToken, Tokenizer, TokenType } from "../parser/tokenizer.ts";
import { TokenToASTParser } from "../parser/token_parser.ts";
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
    domElements.standardOutput.innerText = ""

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

    domElements.vmInstructions.innerHTML = byteCode
      .map((value, idx) => {
        return `<span><pre>${String(idx).padStart(4, " ")}: ${
          OpCode[value.opCode].padEnd(6, " ")
        } ${value.payload ?? ""}</pre></span>`;
      })
      .join("\n");
  });

  domElements.runButton.addEventListener("click", () => {
    const vm = new VM(byteCode, (value) => {
      domElements.standardOutput.innerText += value + "\n";
    });

    vm.run();
  });
});
