import { ByteCode } from "../compiler/opcodes.ts";
import { ASTCompiler } from "../compiler/pseudo_compiler.ts";
import { parseProgram } from "../compiler/pseudo_parser.ts";
import { astToDiv, divMaker } from "../debug/ast_printer.ts";
import { PseudoToken, TokenizeError, Tokenizer, TokenType } from "../parser/tokenizer.ts";
import { IVM, IBindings } from "../runtime/interfaces.ts";
import { VM } from "../runtime/vm.ts";
import { TypeCheckError, typeCheck } from "../typechecker/typecheck_v2.ts";
import { ByteCodeDumper } from "./bytecode_dumper.ts";
import { colorize } from "./syntax_highlight.ts";

// Main entry point.
self.addEventListener("load", () => {
  MainDriver.getInstance().attach();
});

const enum domElemName {
  /* User controls */
  codeInput = "#input",
  syntaxHighlightOverlay = "#syntax",
  compileButton = "#compile",
  instStepButton = "#step",
  lineStepButton = "#stepLine",
  runButton = "#run",

  lineNumbers = "#lineNumbers",

  /* Program output */
  standardOutput = "#output div",
  vmInstructions = "#code div",
  variableInspector = "#vars div",
  stackInspector = "#stack div",
  ipStackInspector = "#ipStack div",

  error = "#error"
}

export class MainDriver {
  getElem = <T extends HTMLElement = HTMLElement>(name: domElemName): T => {
    const elem = this.domElems.get(name) ?? document.querySelector<T>(name);

    if (elem) {
      if (!this.domElems.get(name)) {
        this.domElems.set(name, elem);
      }

      return elem as T;
    }

    throw new Error("Can't queryselect!");
  };

  private domElems: Map<string, HTMLElement> = new Map();
  private tokens: PseudoToken[] = [];
  private byteCode: ByteCode[] = [];

  private vm: IVM | null = null;
  private dumper: ByteCodeDumper = new ByteCodeDumper();

  private bindings: IBindings = {
    out: (value) => {
      const output = this.getElem(domElemName.standardOutput);
      output.innerText += value + "\n";
      output.scrollTo(0, output.scrollHeight);
    },
    stack: (stack) => {
      const stackInspector = this.getElem(domElemName.stackInspector);

      let output = "";
      stack.forEach((s) => {
        output += s + "\n";
      });

      stackInspector.innerText = output;
    },
  };

  private constructor() {}

  highlighted = 0;

  public attach = () => {
    this.getElem(domElemName.codeInput).addEventListener("input", this.onInput);
    this.getElem(domElemName.codeInput).addEventListener("scroll", this.onScroll);
    this.getElem(domElemName.compileButton).addEventListener("click", this.onCompile);
    this.getElem(domElemName.runButton).addEventListener("click", this.onRun);
    this.getElem(domElemName.instStepButton).addEventListener("click", this.onInstStep);

    this.onScroll();
    this.onInput();
  };

  public onInput = () => {
    const input = this.getElem<HTMLTextAreaElement>(domElemName.codeInput);
    const syntax = this.getElem<HTMLDivElement>(domElemName.syntaxHighlightOverlay);
    const linums = this.getElem<HTMLDivElement>(domElemName.lineNumbers)

    // Tokenize
    this.tokens = this.tokenize(input);

    console.log(this.highlighted)
    // Colorize
    colorize(syntax, linums, this.tokens, {hover: this.highlighted, active: this.vm?.fetch().ast.token.line ?? -1});
  };

  public onCompile = () => {
    if (this.tokens.at(-1)?.type == TokenType.ERROR) {
      return;
    }

    const AST = parseProgram(this.tokens);
    const error = this.getElem(domElemName.error);

    try {
      if (AST.kind == "capture") {
        typeCheck(AST.value, new Map(), new Map());

        this.byteCode = ASTCompiler.compile(AST.value);
        this.getElem(domElemName.variableInspector).replaceChildren(divMaker(astToDiv(AST.value)));

        this.dumper.generateSpans(this.byteCode, this);
        this.dumper.show(this.getElem(domElemName.vmInstructions));

        this.vm = VM.init(this.byteCode, this.bindings);
        error.style.display = "none";
      } else {
        throw new Error(`(${AST.where.index}) AST Parsing error: ${AST.value}`);
      }
    } catch (e) {
      if (e instanceof TypeCheckError) {
        error.querySelector("p")!.innerText = `(${(e?.token?.line ?? 0)+1}:${(e?.token?.column ?? 0)+1}) Typechecking error: ${e.message}`
      } else {
        error.querySelector("p")!.innerText = e.message;
      }
      error.style.display = "flex";
    }
  };

  public onRun = () => {
    const error = this.getElem(domElemName.error);

    if (this.vm) {
      try {
      this.vm.run();
      this.dumper.setHighlight(this.vm.lastState().ip);
        error.querySelector("p")!.innerText = "";
      error.style.display = "none";
      } catch(e) {
        error.querySelector("p")!.innerText = e.message;
      error.style.display = "flex";
      }
    }
  };

  public onInstStep = () => {
    if (this.vm) {
      this.vm.step();
      this.dumper.setHighlight(this.vm.lastState().ip);
      this.onInput()
    }
  };

  public onLineStep = () => {};

  public onScroll = () => {
    const input = this.getElem<HTMLTextAreaElement>(domElemName.codeInput);
    const syntax = this.getElem<HTMLDivElement>(domElemName.syntaxHighlightOverlay);
    const lines = this.getElem<HTMLDivElement>(domElemName.lineNumbers)

    lines.scrollTop = syntax.scrollTop = input.scrollTop;
  };

  private tokenize = (inputElem: HTMLTextAreaElement): PseudoToken[] => {
    const input = inputElem.value;
    const tk = new Tokenizer(input + "\n");

    try {
      return tk.parse();
    } catch (e: unknown) {
      if (e instanceof TokenizeError) {
        const errorToken = tk.mkToken(TokenType.ERROR, e.input.slice(e.index), e.index)!;

        return e.tokens.concat(errorToken);
      } else {
        throw e;
      }
    }
  };

  private static instance: MainDriver | null = null;
  static getInstance(): MainDriver {
    if (MainDriver.instance == null) {
      MainDriver.instance = new MainDriver();
    }

    return MainDriver.instance;
  }
}
