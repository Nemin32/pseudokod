export const colorSyntax = (input) => {
  const colors = [
    [/[0-9]+/g, "#b16286"],
    [/<-|\+|\-|\*|\/|mod/g, "#a0a0a0"],
    [/ha|akkor|különben|elágazás vége/g, "#fb4934"],
    [/függvény (vége)?/g, "#b8bb26"],
    [/ciklus (vége)?|amíg/g, "#fe8019"],
    [/kiir|vissza/g, "#8ec07c"],
  ];

  const mapLine = (line) => {
    const colorTags = colors.reduce(
      (line, [rx, color]) => line.replaceAll(rx, `[<${color}>]$&[<>]`),
      line,
    );

    return colorTags
      .replaceAll(/\[<(#.{6})>\]/g, `<span style="color: $1">`)
      .replaceAll("[<>]", "</span>");
  };

  let lineNum = 0;

  return input.split("\n").map((line) => {
    const span = document.createElement("span");

    if (line !== "") {
      span.innerHTML = mapLine(line);

      const num = lineNum;

      span.addEventListener("mouseenter", () => {
        highlight(num, true);
      });

      span.addEventListener("mouseleave", () => {
        highlight(num, false);
      });
    } else {
      span.innerHTML = " ";
    }

    lineNum++;

    return span;
  });
};

export const highlight = (lineNum) => {
  const syntaxElem = document.getElementById("syntax");
  const codeOutput = document.getElementById("code");

  syntaxElem.children[lineNum].classList.toggle("highlight");
  codeOutput
    .querySelectorAll(`span[line="${lineNum}"]`)
    .forEach((span) => span.classList.toggle("highlight"));
};
