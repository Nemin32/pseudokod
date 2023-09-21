import { ITokenizer } from "../../interfaces/ITokenizer.ts";
import { Tokenizer } from "../tokenizer.ts";
import { TT } from "./monadic_parser_base.ts";
import { RDParser } from "./rd_ast_parser.ts";
import { parseBlock as horfBlock } from "./ast_parser.ts";

export const t = (inp: string) => new Tokenizer().tokenize(inp).filter(token => token.type !== TT.WHITESPACE);
const tokens = t(`
függvény LNKO(m : egész, n : egész)
  r <- m mod n
  
  ciklus amíg r =/= 0
    m <- n
    n <- r
    r <- m mod n  
  ciklus vége

  vissza n
függvény vége

kiír LNKO(15, 33)
`)

const testRound = (title: string, rounds: number, fn: () => unknown): void => {
    const start = performance.now();
    for (let i = 0; i < rounds; i++) {
        fn();
    }
    const end = performance.now();
    console.log(`${title}: ${rounds} rounds - ${end - start} ms. (~${(end - start) / rounds} ms / call)`);
}

/*
[1, 10, 100, 1000].forEach(rounds => {
    const parser = new RDParser();
    
    testRound("RecDesc", rounds, () => parser.parse(tokens))
    testRound("OneFile", rounds, () => horfBlock.run(tokens))
    console.log("---")
})
*/