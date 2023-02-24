import { ByteCode, OpCode } from "../compiler/opcodes.ts";
import { ASTCompiler } from "../compiler/pseudo_compiler.ts";
import { VM } from "../runtime/vm.ts";

self.addEventListener("load", () => {
  const domElements: Readonly<Record<string, HTMLElement>> = Object.fromEntries([
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
  ].map(([name, id]) => [name, document.querySelector(id)!]))

  let byteCode: Array<ByteCode> = [];

  domElements.compileButton.addEventListener("click", () => {
    byteCode = ASTCompiler.compile((<HTMLTextAreaElement>domElements.codeInput).value);

    domElements.vmInstructions.innerHTML = byteCode.map((value, idx) => {
      return `<span><pre>${String(idx).padStart(4, " ")}: ${OpCode[value.opCode].padEnd(6, " ")} ${value.payload ?? ""}</pre></span>`
    }).join("\n");
  })

  domElements.runButton.addEventListener("click", () => {
    const vm = new VM(byteCode, (value) => {
      domElements.standardOutput.innerText += value + "\n";
    });

    vm.run();
  })
})