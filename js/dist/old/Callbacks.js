import { highlight } from "./SyntaxHighlight.js";

export const generateCallbacks = (
  output,
  stackOutput,
  varOutput,
  ipStackOutput,
  vmInstructionsOutput
) => {
  return {
    output: (val) => outputFunction(output, val),
    pushStack: (val) => pushStackCallback(stackOutput, val),
    popStack: () => popStackCallback(stackOutput),
    variableSet: (variable) => variableSetCallback(varOutput, variable),
    scopeLeave: (variables) => scopeLeaveCallback(varOutput, variables),
    boot: (instructions) =>
      generateVMInstructionList(vmInstructionsOutput, instructions),
    step: (ip) => stepCallback(vmInstructionsOutput, ip),
    funcCall: (name, ip) => funcCallCallback(ipStackOutput, name, ip),
    funcEnd: () => funcEndCallback(ipStackOutput),
  };
};

// TODO: Dirty. Refactor.
const funcCallCallback = (div, name, ip) => {
  div.innerHTML =
    `<div><span>${name}</span><span>${padRight(ip, 4, "0")}</span></div>` +
    div.innerHTML;
};

const funcEndCallback = (div) => {
  div.removeChild(div.firstChild);
};

const stepCallback = (vmInstructions, ip) => {
  const spans = vmInstructions.childNodes;

  vmInstructions.querySelector("span.current")?.classList.remove("current");
  spans[Math.min(spans.length - 1, ip)].classList.add("current");
};

const pushStackCallback = (div, value) => {
  let span = document.createElement("input");
  span.value = value.toString();

  span.addEventListener("input", () => {
    value.set(Number(span.value));

    console.log(value);
  });

  div.insertBefore(span, div.firstChild);
};

const popStackCallback = (div) => {
  let toBeRemoved = div.querySelector("*:not(.deleted)");
  toBeRemoved.className = "deleted";

  setTimeout(() => {
    div.removeChild(toBeRemoved);
  }, 250);
};

const _generateVarHTML = (variable) => {
  let row = document.createElement("div");

  let label = document.createElement("span");
  label.className = "varname";
  label.innerText = variable.key;

  /*let type = document.createElement("span");
  type.className = "type";
  type.innerText = variable.type;*/

  let editor = document.createElement("input");
  editor.className = "value";
  editor.value = variable.value;

  editor.addEventListener("input", () => {
    variable.value.set(Number(editor.value));
  });

  row.replaceChildren(label, editor);
  return row;
};

const variableSetCallback = (div, variables) => {
  div.innerHTML = "";

  for (let variable of variables) {
    let newElem = _generateVarHTML(variable);
    div.appendChild(newElem);
  }
};

const scopeLeaveCallback = (div, variables) => {
  div.innerHTML = "";

  for (let variable of variables) {
    let newElem = _generateVarHTML(variable);
    div.appendChild(newElem);
  }
};

const outputFunction = (output, wrappedValue) => {
  output.innerText += wrappedValue?.value + "\n";
  output.scrollIntoView(false);
};

/* Variables */

const padRight = (inp, length, char = "0") => {
  const input = String(inp);
  return char.repeat(length - input.length) + input;
};

const colorizeOpcode = (opcode, indent) => {
  // TODO: Refactor into CSS.
  const colors = {
    lightgreen: ["functionCall", "functionDef", "functionEnd"],
    "#e74c3c": ["push", "pushVar"],
    orange: ["while", "loop"],
    "#555": ["whilePrep", "jmp", "enterScope", "exitScope"],
    teal: ["index", "array"],
    "#ff5733": ["assign"],
    "#76448a": ["if", "endIf"],
    "#5dade2": ["compare", "calculate"],
    "#1e8449": ["print"],
    yellow: ["debug"],
  };

  const paddedOpcode = " ".repeat(indent) + opcode;

  for (let color in colors) {
    if (colors[color].includes(opcode)) {
      return `<pre style="color: ${color}">${paddedOpcode}</pre>`;
    }
  }

  return `<pre>${paddedOpcode}</pre>`;
};

const instructionToSpan = (instruction, indent, ip, isSeparator) => {
  const span = document.createElement("span");
  let content = "";

  // Set line separator.
  if (isSeparator) span.classList.add("separator");

  // Add ip
  content += padRight(ip, 4);

  // Add instruction
  content += colorizeOpcode(instruction.opcode, indent);

  // Add payload
  if (instruction.payload !== null) {
    content += `<pre class="payload"> ${instruction.payload}</pre>`;
  }

  // Set span
  span.innerHTML = content;

  // Set callbacks
  const line = instruction.lineNum - 1;

  span.addEventListener("mouseenter", () => {
    highlight(line, true);
  });

  span.addEventListener("mouseleave", () => {
    highlight(line, false);
  });

  span.setAttribute("line", line);

  return span;
};

const generateVMInstructionList = (vmInstructionsOutput, instructions) => {
  let indent = 2;
  let spans = [];

  const indentIn = ["endIf", "loop", "functionEnd", "elIf", "else"];
  const indentOut = ["if", "elIf", "else", "functionDef", "while"];

  instructions.forEach((instruction, ip, arr) => {
    if (indentIn.includes(instruction.opcode)) {
      indent -= 2;
    }

    const isSeparator = arr[Math.max(0, ip - 1)].lineNum != instruction.lineNum;
    spans.push(instructionToSpan(instruction, indent, ip, isSeparator));

    if (indentOut.includes(instruction.opcode)) {
      indent += 2;
    }
  });

  vmInstructionsOutput.replaceChildren(...spans);
};
