import { PseudoToken, TokenType } from "../parser/tokenizer.ts";

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
  [[TokenType.SYMBOL], "#222"],

  [[TokenType.VEGE], "#ff0000"],
  [[TokenType.ERROR], "#ff0000"],
];

const kwColor = "#fb4934";

const tokenToColor = (token: PseudoToken, previous: PseudoToken): string => {
  const type = token.type === TokenType.VEGE ? previous.type : token.type;
  return colors.find(([types, _]) => types.includes(type))?.[1] ?? kwColor;
};

const tokenToSpan = (
  token: PseudoToken,
  previous: PseudoToken,
  lineNumber: { hover: number; active: number },
): HTMLSpanElement => {
  const span = document.createElement("span");

  span.style.whiteSpace = "pre";
  span.innerText = token.lexeme;
  span.style.color = tokenToColor(token, previous);

  if (token.line === lineNumber.hover) span.classList.add("hover");
  if (token.line === lineNumber.active) span.classList.add("active");

  return span;
};

const tokensToSpan = (tokens: PseudoToken[], lineNumber: { hover: number; active: number }) =>
  tokens.map((token, idx) => tokenToSpan(token, tokens[Math.max(0, idx - 2)], lineNumber));

const generateLinum = (token: PseudoToken, lineNumber: { hover: number; active: number }) => {
  const span = document.createElement("span");

  span.innerText = String(token.line + 1);

  if (token.line === lineNumber.hover) span.classList.add("hover");
  if (token.line === lineNumber.active) span.classList.add("active");

  return span;
};

export const colorize = (
  overlay: HTMLDivElement,
  linumDiv: HTMLDivElement,
  tokens: PseudoToken[],
  lineNumber: { hover: number; active: number },
) => {
  const spans: HTMLSpanElement[] = tokensToSpan(tokens, lineNumber);

  const linums = tokens.reduce<{ spans: HTMLSpanElement[]; linum: number }>(
    (acc, token) => {
      if (token.line !== acc.linum) {
        return {
          spans: acc.spans.concat([generateLinum(token, lineNumber)]),
          linum: token.line,
        };
      } else {
        return acc;
      }
    },
    { spans: [], linum: -1 },
  );

  overlay.replaceChildren(...spans);
  linumDiv.replaceChildren(...linums.spans.slice(0, -1));
};
