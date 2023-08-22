import { ByteCode, OpCode } from "../compiler/opcodes.ts";
import { MainDriver } from "./vm_controls.ts";

export class ByteCodeDumper {
  spans: HTMLSpanElement[] = [];
  previousHighlight = 0;

  indent = -2;

  private generateSpan(idx: number, bc: ByteCode, driver: MainDriver): HTMLSpanElement {
    const span = document.createElement("span");
    const pre = document.createElement("pre");
    span.appendChild(pre);

    if (bc.opCode === OpCode.ESCOPE) {
      this.indent += 2;
    }

    const ip = String(idx).padStart(4, " ");
    const op = " ".repeat(this.indent) + OpCode[bc.opCode].padEnd(6, " ");
    const payload = bc.payload ?? "";
    const line = bc.ast.token.line;

    pre.innerText = `${ip}: ${op} ${payload}`;
    pre.setAttribute("linum", String(line));

    if (bc.opCode === OpCode.LSCOPE) {
      this.indent -= 2;
    }

    span.addEventListener("mouseover", () => {
      driver.highlightLine(line, true);
    });
    span.addEventListener("mouseleave", () => {
      driver.highlightLine(line, false);
    });

    return span;
  }

  generateSpans(byteCode: ByteCode[], driver: MainDriver) {
    this.spans = byteCode.map((bc, idx) => this.generateSpan(idx, bc, driver));
    this.setHighlight(0);
  }

  show(rootElem: HTMLDivElement) {
    rootElem.replaceChildren(...this.spans);
  }

  setHighlight(n: number) {
    this.spans.at(this.previousHighlight)?.classList.remove("current");
    this.spans.at(n)?.classList.add("current");
    this.spans.at(n)?.scrollIntoView();
    this.previousHighlight = n;
  }
}
