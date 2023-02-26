import { ByteCode, OpCode } from "../compiler/opcodes.ts";
import { ASTCompiler } from "../compiler/pseudo_compiler.ts";
import { Tokenizer, TokenType } from "../parser/tokenizer.ts";
import { VM } from "../runtime/vm.ts";

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
    ].map(([name, id]) => [name, document.querySelector(id)!])
  );

  let byteCode: Array<ByteCode> = [];

  const colorize = () => {
    const colors: [TokenType[], string][] = [
      [[TokenType.NUMBER], "#b16286"],
      [[TokenType.STRING], "#aaefba"],
      [[TokenType.ARITHMOP, TokenType.LOGICOP, TokenType.COMPOP], "#a0a0a0"],
      [[TokenType.FUNCNAME], "#7899cf"],
      [[TokenType.TYPE, TokenType.TOMB], "#a9cf78"],
      [[TokenType.CIMSZERINT], "#888"],
      [[TokenType.NYIL, TokenType.FORSTART, TokenType.FOREND], "#aaa"],
      [[TokenType.FUGGVENY], "#8c9472"],
      [[TokenType.CIKLUS, TokenType.AMIG], "#bf9475"],
      [[TokenType.HA, TokenType.AKKOR, TokenType.KULONBEN, TokenType.ELAGAZAS], "#a878cf"],
      [[TokenType.VISSZA, TokenType.KIIR], "#8ec07c"],
      [[TokenType.SYMBOL], "#efefef"],
    ];

    const kwColor = "#fb4934";
    const input = (<HTMLTextAreaElement>domElements.codeInput).value.trimEnd();
    const tokens = new Tokenizer(input).parse();

    const spans: HTMLSpanElement[] = [];

    tokens.forEach((token, idx) => {
      const type = token.type == TokenType.VEGE ? tokens[idx - 2].type : token.type
      const color = colors.find(([types, _]) => types.includes(type))?.[1] ?? kwColor;

      const span = document.createElement("span");
      span.innerText = token.lexeme;
      span.style.whiteSpace = "pre";
      span.style.color = color;

      spans.push(span);
    });

    domElements.syntaxHighlightOverlay.replaceChildren(...spans);
  };

  domElements.codeInput.addEventListener("input", () => {
    console.time();
    colorize();
    console.timeEnd()
  });

  domElements.codeInput.addEventListener("scroll", () => {
    domElements.syntaxHighlightOverlay.scrollTop = domElements.codeInput.scrollTop;
  });

  domElements.compileButton.addEventListener("click", () => {
    const input = (<HTMLTextAreaElement>domElements.codeInput).value;

    byteCode = ASTCompiler.compile(input);

    domElements.vmInstructions.innerHTML = byteCode
      .map((value, idx) => {
        return `<span><pre>${String(idx).padStart(4, " ")}: ${OpCode[value.opCode].padEnd(6, " ")} ${value.payload ?? ""}</pre></span>`;
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
