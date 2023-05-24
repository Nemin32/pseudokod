import { ByteCode } from "../compiler/opcodes.ts";
import { ASTCompiler } from "../compiler/pseudo_compiler.ts";
import { parseProgram } from "../compiler/pseudo_parser.ts";
import { astToDiv, divMaker } from "../debug/ast_printer.ts";
import { PseudoToken, TokenizeError, Tokenizer, TokenType } from "../parser/tokenizer.ts";
import { IVM, IBindings } from "../runtime/interfaces.ts";
import { VM, VMError } from "../runtime/vm.ts";
import { TypeCheckError, typeCheck } from "../typechecker/typecheck_v2.ts";
import { ByteCodeDumper } from "./bytecode_dumper.ts";
import { colorize } from "./syntax_highlight.ts";

// Main entry point.
self.addEventListener("load", () => {
  MainDriver.getInstance().attach();
});

enum domElemName {
  /* User controls */
  codeInput = "#input",
  syntaxHighlightOverlay = "#syntax",
  compileButton = "#compile",
  instStepButton = "#step",
  backButton = "#back",
  lineStepButton = "#stepLine",
  runButton = "#run",

  lineNumbers = "#lineNumbers",

  /* Program output */
  standardOutput = "#output div",
  vmInstructions = "#code div",
  variableInspector = "#vars div",
  stackInspector = "#stack div",
  ipStackInspector = "#ipStack div",

  error = "#error",
  errorText = "#error p",
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
    vars: (vars, store) => {
      const variableInspector = this.getElem(domElemName.variableInspector);

      let output = "";
      vars.forEach((variable) => {
        if (variable.kind === "sentinel") {
          output += "---\n";
        } else {
          output += `${variable.name} (${variable.points}) = ${store.get(variable.points)}`;
        }
      });

      variableInspector.innerText = output;
    },

    ipStack: (stack: number[]) => {
      const ipStackInspector = this.getElem(domElemName.ipStackInspector);

      ipStackInspector.innerText = stack.reduce<string>((acc, val) => acc + String(val) + "\n", "");
    },
  };

  private constructor() {}

  highlighted = 0;

  public attach = () => {
    this.getElem(domElemName.codeInput).addEventListener("input", this.onInput);
    this.getElem(domElemName.codeInput).addEventListener("scroll", this.onScroll);
    this.getElem(domElemName.compileButton).addEventListener("click", this.onCompile);
    this.getElem(domElemName.backButton).addEventListener("click", this.onBack);
    this.getElem(domElemName.runButton).addEventListener("click", this.onRun);
    this.getElem(domElemName.instStepButton).addEventListener("click", this.onInstStep);
    this.getElem(domElemName.lineStepButton).addEventListener("click", this.onLineStep);

    this.onScroll();
    this.onInput();
  };

  handleError(error: unknown) {
    const errorDiv = this.getElem(domElemName.error);
    const errorText = this.getElem(domElemName.errorText);

    if (error instanceof VMError) {
      errorText.innerText = `VM Error: ${error.message}.`;
    } else if (error instanceof TypeCheckError) {
      errorText.innerText = `Typecheck Failure: ${error.message}.`;
    } else if (error instanceof Error) {
      errorText.innerText = `Other error: ${error.message}.`;
    } else {
      throw error;
    }

    errorDiv.style.display = "flex";
  }

  hideError() {
    const errorDiv = this.getElem(domElemName.error);
    errorDiv.style.display = "none";
  }

  public onBack = () => {
    if (this.vm) {
      this.vm.stepBack();
      this.dumper.setHighlight(this.vm.lastState().ip);
      this.onInput();
    }
  };

  public onInput = () => {
    const input = this.getElem<HTMLTextAreaElement>(domElemName.codeInput);
    const syntax = this.getElem<HTMLDivElement>(domElemName.syntaxHighlightOverlay);
    const linums = this.getElem<HTMLDivElement>(domElemName.lineNumbers);

    // Tokenize
    this.tokens = this.tokenize(input);

    console.log(this.highlighted);
    // Colorize
    colorize(syntax, linums, this.tokens, {
      hover: this.highlighted,
      active: this.vm?.fetch()?.ast.token.line ?? -1,
    });
  };

  public onCompile = () => {
    if (this.tokens.at(-1)?.type === TokenType.ERROR) {
      return;
    }

    const AST = parseProgram(this.tokens);
    this.hideError();

    try {
      if (AST.kind === "capture") {
        typeCheck(AST.value, new Map(), new Map());

        this.byteCode = ASTCompiler.compile(AST.value);
        this.getElem(domElemName.variableInspector).replaceChildren(divMaker(astToDiv(AST.value)));

        this.dumper.generateSpans(this.byteCode, this);
        this.dumper.show(this.getElem(domElemName.vmInstructions));

        this.vm = VM.init(this.byteCode, this.bindings);
      } else {
        throw new Error(`(${AST.where.index}) AST Parsing error: ${AST.value}`);
      }
    } catch (e) {
      this.handleError(e);
    }
  };

  public onRun = () => {
    this.hideError();

    if (this.vm) {
      try {
        this.vm.run();
        this.dumper.setHighlight(this.vm.lastState().ip);
      } catch (e) {
        this.handleError(e);
      }
    }
  };

  public onInstStep = () => {
    if (this.vm) {
      try {
        this.vm.step();
        this.dumper.setHighlight(this.vm.lastState().ip);
        this.onInput();
      } catch (e) {
        this.handleError(e);
      }
    }
  };

  public onLineStep = () => {
    if (this.vm) {
      try {
        this.vm.lineStep();
        this.dumper.setHighlight(this.vm.lastState().ip);
        this.onInput();
      } catch (e) {
        this.handleError(e);
      }
    }
  };

  public onScroll = () => {
    const input = this.getElem<HTMLTextAreaElement>(domElemName.codeInput);
    const syntax = this.getElem<HTMLDivElement>(domElemName.syntaxHighlightOverlay);
    const lines = this.getElem<HTMLDivElement>(domElemName.lineNumbers);

    lines.scrollTop = syntax.scrollTop = input.scrollTop;
  };

  private tokenize = (inputElem: HTMLTextAreaElement): PseudoToken[] => {
    const input = inputElem.value;
    const tk = new Tokenizer(input + "\n");

    try {
      return tk.parse();
    } catch (e: unknown) {
      if (e instanceof TokenizeError) {
        // rome-ignore lint: noNonNullAssertion
        const errorToken = tk.mkToken(TokenType.ERROR, e.input.slice(e.index), e.index)!;

        return e.tokens.concat(errorToken);
      } else {
        throw e;
      }
    }
  };

  private static instance: MainDriver | null = null;
  static getInstance(): MainDriver {
    if (MainDriver.instance === null) {
      MainDriver.instance = new MainDriver();
    }

    return MainDriver.instance;
  }
}
