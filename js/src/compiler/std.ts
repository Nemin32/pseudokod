import { parseFuncDecl } from "../parser/ast_parser.ts"
import { Type, FunctionType, NUMBER, HeterogenousArrayType, ArrayType, LOGIC, GenericType, ReferenceType, NONE } from "../interfaces/types.ts"
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

const dummy = parseFuncDecl.run(t(`
függvény Kerekit(x : egész)
vissza x
függvény vége
`)).extract()

const GENARRAY = new ArrayType(new GenericType("T"))
const NUMARRAY = new ArrayType(NUMBER)

export const vars: { name: string, type: Type }[] = [
	{ name: "érték0", type: NUMBER },
	{ name: "végtelen", type: NUMBER },
	{ name: "minuszVégtelen", type: NUMBER },
	{ name: "Max", type: new FunctionType(NUMBER, [NUMBER, NUMBER], max) },
	{ name: "Min", type: new FunctionType(NUMBER, [NUMBER, NUMBER], min) },
	{ name: "Kerekit", type: new FunctionType(NUMBER, [NUMBER], dummy) },
	{ name: "Halmaz", type: new FunctionType(new ArrayType(NUMBER), [], dummy) },
	{ name: "Unio", type: new FunctionType(new ArrayType(NUMBER), [new ArrayType(NUMBER), NUMBER], dummy) },
	{ name: "LNKO", type: new FunctionType(NUMBER, [NUMBER, NUMBER], dummy) },
	{ name: "Gyök", type: new FunctionType(NUMBER, [NUMBER], dummy) },
	{ name: "Osztója", type: new FunctionType(LOGIC, [NUMBER, NUMBER], dummy) },

	{ name: "Szétválogat", type: new FunctionType(NUMBER, [new ReferenceType(GENARRAY), NUMBER, NUMBER], dummy) },

	{ name: "Összefésül", type: new FunctionType(GENARRAY, [new ReferenceType(GENARRAY), NUMBER, NUMBER, NUMBER], dummy)},

	{ name: "KompatiblisEseményErőforrással", type: new FunctionType(LOGIC, [NUMARRAY, NUMARRAY, NUMARRAY, NUMBER, NUMBER], dummy)},

	{ name: "KezdetiTávolság", type: new FunctionType(NUMBER, [NUMBER], dummy) },
	{ name: "KövetkezőTávolság", type: new FunctionType(NUMBER, [NUMBER], dummy) },

	{ name: "Kupacol", type: new FunctionType(NONE, [new ReferenceType(GENARRAY), NUMBER, NUMBER, NUMBER], dummy) },
	{ name: "KupacotÉpít", type: new FunctionType(NONE, [new ReferenceType(GENARRAY), NUMBER], dummy) },
]
