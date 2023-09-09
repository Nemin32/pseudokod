import { ITokenizer } from "../../interfaces/ITokenizer.ts";
import { Tokenizer } from "../tokenizer.ts";
import { TT } from "./hParser.ts";
import { RDParser } from "./rdParser.ts";
import { parseBlock } from "./statements/block.ts";

import { parseBlock as horfBlock } from "./horf.ts";


const tok: ITokenizer = new Tokenizer();

const tokens = tok
  .tokenize(`
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
  //const tokens = tok.tokenize("r <- 5 + 5
  .filter((t) => t.type !== TT.WHITESPACE);
  
  
const t = (inp: string) => new Tokenizer().tokenize(inp).filter(token => token.type !== TT.WHITESPACE);

const testRound = (title: string, rounds: number, fn: () => unknown): void => {
    const start = performance.now();
    for (let i = 0; i < rounds; i++) {
        fn();
    }
    const end = performance.now();
    console.log(`${title}: ${rounds} rounds - ${end - start} ms. (~${(end - start) / rounds} ms / call)`);
}
  


/*
const parser = new RDParser();
console.log("--- RecDesc ---")
console.log(parser.parse(tokens))

console.log("--- Monadic ---")
const run = parseBlock.run(tokens)
console.log(run.type === "match" ? run.value : run.cause)
*/


[1, 10, 100, 1000, 10000].forEach(rounds => {
    const parser = new RDParser();
    
    testRound("RecDesc", rounds, () => parser.parse(tokens))
    testRound("Monadic", rounds, () => parseBlock.run(tokens))
    testRound("OneFile", rounds, () => horfBlock.run(tokens))
    console.log("---")
})