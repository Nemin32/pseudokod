import { ByteCode, OpCode } from "../compiler/opcodes.ts";

export class ByteCodeDumper {
  spans: HTMLSpanElement[] = [];
  previousHighlight = 0;

  indent = -2;

  private generateSpan(idx: number, bc: ByteCode): HTMLSpanElement {
    const span = document.createElement("span");
    const pre = document.createElement("pre");
    span.appendChild(pre);

    if (bc.opCode == OpCode.ESCOPE) {
      this.indent += 2;
    }

    const ip = String(idx).padStart(4, " ");
    const op = " ".repeat(this.indent) + OpCode[bc.opCode].padEnd(6, " ");
    const payload = bc.payload ?? "";

    pre.innerText = `${ip}: ${op} ${payload}`;

    if (bc.opCode == OpCode.LSCOPE) {
      this.indent -= 2;
    }

    return span;
  }

  generateSpans(byteCode: ByteCode[]) {
    this.spans = byteCode.map((bc, idx) => this.generateSpan(idx, bc));
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
