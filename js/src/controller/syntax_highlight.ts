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
  [
    [TokenType.HA, TokenType.AKKOR, TokenType.KULONBEN, TokenType.ELAGAZAS],
    "#a878cf",
  ],
  [[TokenType.VISSZA, TokenType.KIIR], "#8ec07c"],
  [[TokenType.SYMBOL], "#efefef"],
  [[TokenType.VEGE], "#ff000"],
];

const kwColor = "#fb4934";

const tokenToColor = (token: PseudoToken, previous: PseudoToken): string => {
  const type = token.type == TokenType.VEGE ? previous.type : token.type;
  return colors.find(([types, _]) => types.includes(type))?.[1] ?? kwColor;
};

const tokenToSpan = (
  token: PseudoToken,
  previous: PseudoToken,
): HTMLSpanElement => {
  const span = document.createElement("span");

  span.style.whiteSpace = "pre";
  span.innerText = token.lexeme;
  span.style.color = tokenToColor(token, previous);

  return span;
};

const tokensToSpan = (tokens: PseudoToken[]) =>
  tokens.map((token, idx) => tokenToSpan(token, tokens[Math.max(0, idx - 2)]));

export const colorize = (overlay: HTMLDivElement, tokens: PseudoToken[]) => {
  const spans: HTMLSpanElement[] = tokensToSpan(tokens);
  overlay.replaceChildren(...spans);
};
