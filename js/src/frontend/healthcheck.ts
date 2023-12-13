import type { Programs } from "./program_loader.ts";
import { tokenize } from "./token.ts"
import { typeCheck } from "../compiler/typecheck.ts"
import { TokenType } from "../interfaces/ITokenizer.js";
import { parseBlock } from "../parser/ast_parser.ts"
import { TypeMap } from "../compiler/typemap.ts";
import { vars } from "../compiler/std.ts";

type Chapter = {type: "chapter", number: number}
type Entry = {    type: "entry",
    name: string,
    tokenizes: boolean,
    ast: boolean,
    typechecks: boolean,
    error: string | null
}
type HCResult =  Chapter | Entry

window.addEventListener("load", () => {
    const tbody = document.getElementById("algorithms")! as HTMLTableSectionElement;
    const counter = document.getElementById("counter")! as HTMLParagraphElement;

    fetch("./jegyzet.json").then(r => r.json()).then((json: Programs) => {
        const result = [] as HCResult[];

        for (const elem in json) {
            const collection = json[elem];

            result.push({
                type: "chapter",
                number: Number(elem)
            })

            for (let idx = 0; idx < collection.length; idx++) {
                const entry = collection[idx];
                const tokens = tokenize(entry.code.join("\n"))[1]
                const name = entry.name

                if (tokens.at(-1)?.type == TokenType.ERROR) {
                    result.push({
                        type: "entry",
                        name,
                        error: "Tokenizer failed",
                        tokenizes: false,
                        ast: false,
                        typechecks: false
                    })

                    continue;
                }

                const match = parseBlock.run(tokens)

                if (match.type == "error") {
                    result.push({
                        type: "entry",
                        name,
                        error: match.cause,
                        tokenizes: true,
                        ast: false,
                        typechecks: false
                    })

                    continue;
                }

                try {
                typeCheck(match.value, new TypeMap(vars,[]));

                    result.push({
                        type: "entry",
                        name,
                        error: null,
                        tokenizes: true,
                        ast: true,
                        typechecks: true
                    })

                } catch(e) {
                    if (!(e instanceof Error)) throw e;

                    result.push({
                        type: "entry",
                        name,
                        error: e.message,
                        tokenizes: true,
                        ast: true,
                        typechecks: false
                    })
                }
            }
        }

        return result
    }).then(results => {
        const rowToHTML = (row: HCResult) => {
            if (row.type === "entry") {
                return `<tr>
                    <td class="id">${row.name.split(".")[0]}.</td>
                    <td class="name">${row.name.split(".")[1]}</td>
                    <td class="check">${row.tokenizes ? "✅" : "❌"}</td>
                    <td class="check">${row.ast ? "✅" : "❌"}</td>
                    <td class="check">${row.typechecks ? "✅" : "❌"}</td>
                </tr>`
                // <td>${row.error ? row.error : ""}</td>
            } else {
                return `<tr class="chapter"><td class="chapter" colspan=5>${row.number}. Chapter</td></tr>`;
            }
        }

        tbody.innerHTML = results.map(rowToHTML).join("\n")

        const entries = results.filter(r => r.type === "entry") as Entry[]
        const passing = entries.filter(r => r.tokenizes && r.typechecks).length
        const total = entries.length

        counter.innerHTML = `${passing === total ? "🎉" : ""} ${passing}/${total} pass. ${passing === total ? "🎉" : ""}`
    })
})
