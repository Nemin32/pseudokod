import { PseudoToken, TokenType } from "../parser/tokenizer.ts";

const colorClassMap: [TokenType[], string][] = [
  [[TokenType.NUMBER], "num"],
  [[TokenType.STRING], "string"],
  [[TokenType.ARITHMOP, TokenType.LOGICOP, TokenType.COMPOP], "op"],
  [[TokenType.FUNCNAME], "func"],
  [[TokenType.TYPE, TokenType.TOMB], "type"],
  [[TokenType.CIMSZERINT], "cim"],
  [[TokenType.NYIL, TokenType.FORSTART, TokenType.FOREND], "nyil"],
  [[TokenType.FUGGVENY], "fgv"],
  [[TokenType.CIKLUS, TokenType.AMIG], "ciklus"],
  [[TokenType.HA, TokenType.AKKOR, TokenType.KULONBEN, TokenType.ELAGAZAS], "ha"],
  [[TokenType.VISSZA, TokenType.KIIR], "vissza"],
  [[TokenType.SYMBOL], "symbol"],
  [[TokenType.ERROR, TokenType.VEGE], "error"],
];

const tokenToColorClass = (token: PseudoToken, previous: PseudoToken): string => {
  const type = token.type === TokenType.VEGE ? previous.type : token.type;
  return colorClassMap.find(([types, _]) => types.includes(type))?.[1] ?? "kw";
};

const tokenToSpan = (token: PseudoToken, previous: PseudoToken): HTMLSpanElement => {
  const span = document.createElement("span");

  span.style.whiteSpace = "pre";
  span.innerText = token.lexeme;
  span.classList.add(tokenToColorClass(token, previous));
  span.setAttribute("linum", String(token.line));

  return span;
};

const tokensToSpan = (tokens: PseudoToken[]) =>
  tokens.map((token, idx) => tokenToSpan(token, tokens[Math.max(0, idx - 2)]));

const generateLinum = (token: PseudoToken) => {
  const span = document.createElement("span");

  span.innerText = String(token.line + 1);
  span.setAttribute("linum", String(token.line));

  return span;
};

export const colorize = (
  overlay: HTMLDivElement,
  linumDiv: HTMLDivElement,
  tokens: PseudoToken[],
) => {
  const spans: HTMLSpanElement[] = tokensToSpan(tokens);

  const linums = tokens.reduce<{ spans: HTMLSpanElement[]; linum: number }>(
    (acc, token) => {
      if (token.line !== acc.linum) {
        return {
          spans: acc.spans.concat([generateLinum(token)]),
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
