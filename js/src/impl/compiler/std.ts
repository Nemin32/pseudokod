import { parseFuncDecl } from "../parser/ast_parser.ts"
import { Type, FunctionType, NUMBER } from "../../interfaces/types.ts"
import { t } from "../parser/monadic_parser_base.ts"

const max = parseFuncDecl.run(t(`
függvény Max(x : egész, y : egész)
		ha x > y akkor
				vissza x
		különben
				vissza y
		elágazás vége
függvény vége
`)).extract()

const min = parseFuncDecl.run(t(`
függvény Min(x : egész, y : egész)
		ha x < y akkor
				vissza x
		különben
				vissza y
		elágazás vége
függvény vége
`)).extract()

const kerekit = parseFuncDecl.run(t(`
függvény Kerekit(x : egész)
vissza x
függvény vége
`)).extract()

export const vars: { name: string, type: Type }[] = [
	{ name: "érték0", type: NUMBER },
	{ name: "végtelen", type: NUMBER },
	{ name: "minuszVégtelen", type: NUMBER },
	{ name: "Max", type: new FunctionType(NUMBER, [NUMBER, NUMBER], max) },
	{ name: "Min", type: new FunctionType(NUMBER, [NUMBER, NUMBER], min) },
	{ name: "Kerekit", type: new FunctionType(NUMBER, [NUMBER], kerekit) },
]
