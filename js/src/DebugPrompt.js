//import prompt_sync from "prompt-sync";

//console.log(tree.toStringTree(parser.ruleNames));
export class DebugPrompt {
  constructor(stack, params) {
    this.step = false;
    this.enabled = true;
    //this.input = prompt_sync({ sigint: true });
    this.stack = stack;
    this.params = params;
  }

  prompt() {
    if (!this.enabled)
      return;

    let loop = true;

    while (loop) {
      //let inp = this.input("-- (l: léptetés ki/be, s: verem kiírása, x: debug kikapcsolása, enter: folytatás) --");
      let inp = "x"
      switch (inp) {
        case "l":
          this.step = !this.step;
          if (this.step) {
            console.log("Léptetés: BE");
          } else {
            console.log("Léptetés: KI");
          }
          break;
        case "s":
          this.stack.printStack();
          break;
        case "x":
          this.enabled = false;
          loop = false;
          break;
        case "p":
          for (let [k, v] of this.params.entries()) {
            console.log(k, "=>", v);
          }
          break;
        case "":
          loop = false;
      }
    }
  }
}
