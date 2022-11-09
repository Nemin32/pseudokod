import { highlight } from "./SyntaxHighlight.js";

export const generateCallbacks = (
  output,
  stackOutput,
  varOutput,
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
  };
};

const stepCallback = (vmInstructions, ip) => {
  const spans = vmInstructions.childNodes;

  vmInstructions.querySelector("span.current")?.classList.remove("current");
  spans[Math.min(spans.length - 1, ip)].classList.add("current");
};

const pushStackCallback = (div, value) => {
  let span = document.createElement("span");
  span.innerText = value.toString();
  div.insertBefore(span, div.firstChild);
};

const popStackCallback = (div) => {
  let toBeRemoved = div.querySelector("span:not(.deleted)");
  toBeRemoved.className = "deleted";

  setTimeout(() => {
    div.removeChild(toBeRemoved);
  }, 250);
};

const variableSetCallback = (div, variable) => {
  let newElem = document.createElement("div");
  newElem.innerHTML = `<span class="varname">${variable.key}</span><span class="value">${variable.value}</span>`;
  div.appendChild(newElem);
};

const scopeLeaveCallback = (div, variables) => {
  div.innerHTML = "";

  for (let variable of variables) {
    let newElem = document.createElement("div");
    newElem.innerHTML = `<span class="varname">${variable.key}</span><span class="value">${variable.value}</span>`;
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
  // TODO: Add all.
  const colors = {
    green: ["functionCall", "functionDef", "functionEnd"],
    red: ["push", "pushVar"],
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
