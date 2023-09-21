import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { Tokenizer } from "../src/impl/tokenizer.ts";

type Entry = {
    name: string,
    inputs: string,
    outputs: string,
    code: string[]
}

type Programs = Record<string, Entry[]>

const test = (t: Deno.TestContext, input: Entry) => t.step(input.name, () => {
    const code = input.code.join("\n")
    const tokenizer = new Tokenizer()
    tokenizer.tokenize(code)
    
    assertEquals(tokenizer.index, code.length);
})

await Deno.readTextFile('../../programs/jegyzet.json').then(data => {
    const json: Programs = JSON.parse(data)
    
    Deno.test("Sanity", () => {
        const code = "ha igaz akkor vissza hamis különben vissza igaz"
    const tokenizer = new Tokenizer()
    tokenizer.tokenize(code)
    
    assertEquals(tokenizer.index, code.length);
    })
    
    for (const [chapter, entries] of Object.entries(json)) {
        console.log(chapter)
        
        Deno.test(chapter, async (t) => {
        for (const entry of entries) {
            await test(t, entry);
        }
        })
    }
})