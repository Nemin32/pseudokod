import * as PseudoVisitor from "./esbundle.js";
import * as Callbacks from "./Callbacks.js";
import * as SyntaxHighlight from "./SyntaxHighlight.js";

// TODO:
// [X] Two step transform? függvény -> [<#123456>]függvény[<>] -> <span style="color: #123456">függvény</span>
// [X] Osztályokra bontani ezt a fájlt
// [?] Befejezni a css-t
// [?] Átírható változók (és stack?)
// [X] IP stack implementálás
// [X] Tömb grammar átírás
// [?] Valami szebb color scheme
// [ ] Algoritmus-választó
// [ ] Hibák!!! Szemantika, szintaxis, runtime errors - ANTLR
// [ ] Eljárások?
// [ ] Set-ek? Más adatstruktúrák?
// [ ] Tutorial - Popup?
// [ ] Generikus típusok?
// [ ] Tesztek - Selenium? Branch teszt?
// [ ] Jobb syntax highlight?
// [ ] Időutazás?! (Immutable.js? Mekkora overhead?)
// [ ] Refactoring??
// [ ] Interpreter???

function gatherHTMLElements() {
  const soughtElems = {
    /* User controls */
    codeInput: "#input",
    syntaxHighlightOverlay: "#syntax",
    compileButton: "#compile",
    instStepButton: "#step",
    lineStepButton: "#stepLine",
    runButton: "#run",

    /* Program output */
    standardOutput: "#output div",
    vmInstructions: "#code div",
    variableInspector: "#vars div",
    stackInspector: "#stack div",
    ipStackInspector: "#ipStack div",
  };

  return Object.fromEntries(
    Object.entries(soughtElems).map(([k, v]) => [k, document.querySelector(v)])
  );
}

window.addEventListener("load", () => {
  const elems = gatherHTMLElements();
  const callbacks = Callbacks.generateCallbacks(
    elems.standardOutput,
    elems.stackInspector,
    elems.variableInspector,
    elems.ipStackInspector,
    elems.vmInstructions
  );

  let environment = null;
  let executor = null;

  const populateOverlay = () => {
    elems.syntaxHighlightOverlay.innerHTML = "";
    SyntaxHighlight.colorSyntax(elems.codeInput.value).forEach((s) =>
      elems.syntaxHighlightOverlay.appendChild(s)
    );
  };

  elems.codeInput.addEventListener("input", () => populateOverlay());
  populateOverlay();

  elems.codeInput.addEventListener("scroll", () => {
    elems.syntaxHighlightOverlay.scrollTop = elems.codeInput.scrollTop;
  });

  elems.compileButton.addEventListener("click", () => {
    environment = new PseudoVisitor.generateLinearEnvironment(
      elems.codeInput.value
    );
    executor = new PseudoVisitor.LinearExecutor(environment, callbacks);

    elems.standardOutput.innerText = "";
  });

  elems.runButton.addEventListener("click", () => executor?.run());
  elems.instStepButton.addEventListener("click", () => executor?.step());
  elems.lineStepButton.addEventListener("click", () => executor?.stepLine());
});
