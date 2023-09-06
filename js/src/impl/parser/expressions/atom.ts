import { Atom } from "../../../interfaces/astkinds.ts";
import { P, Parser, mkToken } from "../hParser.ts";
import { TokenType as TT } from "../../../interfaces/ITokenizer.ts";

const number: P<Atom> = Parser.matchT(TT.NUMBER).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: Number(token.lexeme),
  }),
);

const boolean: P<Atom> = Parser.matchT(TT.BOOLEAN).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: ["Igaz", "igaz"].includes(token.lexeme),
  }),
);

const string: P<Atom> = Parser.matchT(TT.STRING).map((token) =>
  mkToken(token, {
    tag: "atom",
    value: token.lexeme,
  }),
);

export const parseAtom = number.or(boolean).or(string);
