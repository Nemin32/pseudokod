import { Variable, Assignment } from "../interfaces/astkinds.ts";
import { IAST } from "../interfaces/IParser.ts";
import { ITokenizer } from "../interfaces/ITokenizer.ts";
import { Parser } from "./hParser.ts";
import { Tokenizer } from "./tokenizer.ts";
import { TokenType as TT } from "../interfaces/ITokenizer.ts";

type P<T> = Parser<IAST<T>>

const variable: P<Variable> = Parser.matchT(TT.SYMBOL).map((value) => ({
  token: value,
  kind: {
    tag: "variable",
    name: value.lexeme,
  },
}));

const assignment: P<Assignment> = Parser.do()
  .bind("variable", variable)
  .bindT("nyil", TT.NYIL)
  .bind("value", variable)
  .result(({ variable, nyil, value }) => ({
    token: nyil,
    kind: {
      tag: "assign",
      variable,
      value,
    },    
  }));

const tok: ITokenizer = new Tokenizer();
const tokens = tok.tokenize("függvény vége").filter((t) => t.type !== TT.WHITESPACE);

const val = Parser.matchT(TT.FUGGVENY).end().run(tokens);

console.log(val);