import { Compiler } from "../src/compiler/compiler.ts";
import { TypeCheckError, typeCheck } from "../src/compiler/typecheck.ts";
import { TypeMap } from "../src/compiler/typemap.ts";
import { IToken, TokenType } from "../src/interfaces/ITokenizer.ts";
import { ASTKind } from "../src/interfaces/astkinds.ts";
import { Inst } from "../src/interfaces/instructions.ts";
import { parseBlock } from "../src/parser/ast_parser.ts";
import { Tokenizer } from "../src/parser/tokenizer.ts";
import { ValueType, Variables } from "../src/runtime/variables.ts";
import { VM, Value } from "../src/runtime/vm.ts";

type JSValue = Value | Value[]

type Test = {
    name: string,
    code: string,
    input: JSValue,
    expectedOutput: JSValue
}

const mk = (name: string, code: string, input: JSValue, expectedOutput: JSValue): Test => ({ name, code, input, expectedOutput })

const buborek = `
eljárás BuborékRendezés(címszerint x : T tömb, n : egész)
    i <- n

    ciklus amíg i >= 2
        ciklus j <- 1-től (i - 1)-ig
            ha x[j] > x[j + 1] akkor
                x[j] <-> x[j + 1]
            elágazás vége
        ciklus vége

        i <- i - 1
    ciklus vége
eljárás vége

kimenet <- bemenet
BuborékRendezés(&kimenet, 5)
`

const lnko = `
				függvény LNKO(m : egész, n : egész)
				r <- m mod n
				ciklus amíg r =/= 0
				m <- n
				n <- r
				r <- m mod n
				ciklus vége
				vissza n
				függvény vége

kimenet <- LNKO(bemenet[1], bemenet[2])
`

const fib = `
függvény FibonacciKigyűjt(n : egész)
  x <- Létrehoz(egész)[n]
  x[1] <- 1
  x[2] <- 2

  ciklus i <- 3-től n-ig
    x[i] <- x[i - 2] + x[i - 1]

  ciklus vége

  vissza x

függvény vége

kimenet <- FibonacciKigyűjt(5)

`

const keres = `
függvény LogaritmikusKeresésRekurzív(x : T rendezett tömb, bal : egész, jobb : egész, érték : T): egész
  ha bal > jobb akkor
    vissza 0
  különben
    center <- (bal+jobb)/2

    ha x[center] = érték akkor
      vissza center
    különben ha x[center] > érték akkor
      vissza LogaritmikusKeresésRekurzív(x, bal, center - 1, érték)
    különben
      vissza LogaritmikusKeresésRekurzív(x, center + 1, jobb, érték)

    elágazás vége
  elágazás vége
függvény vége

kimenet <- LogaritmikusKeresésRekurzív(bemenet, 0, 7, 10)
`

const rendezett = `
függvény Rendezett_E(x : T tömb, n : egész)
  i <- 1

  ciklus amíg (i <= n - 1) és (x[i] <= x[i + 1])
    i <- i + 1

  ciklus vége

  tombRendezett <- (i > n - 1)
  vissza tombRendezett

függvény vége

kimenet <- Rendezett_E(bemenet, 3)
`

const testCases: Test[] = [
    mk("Egyszerű hozzárendelés", "kimenet <- bemenet * 2\n", 5, 10),
    mk("Egyszerű ciklus", `kimenet <- 0 ciklus i <- 1-től 10-ig kimenet <- kimenet + i ciklus vége`, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((a, b) => a + b)), // 55
    mk("Egyszerű tömb", `kimenet <- bemenet kimenet[1] <- 5`, [1, 2, 3], [5, 2, 3]),
    mk("Buborékrendezés", buborek, [3, 2, 1, 5, 4], [1, 2, 3, 4, 5]),
    mk("LNKO", lnko, [15, 33], 3),
    mk("Fibonacci 5", fib, 5, [1, 2, 3, 5, 8]),
    mk("Fibonacci 8", fib, 8, [1, 2, 3, 5, 8, 13, 21, 34]),
    mk("Rendezetlen tömb rendezettsége", rendezett, [3, 2, 1], false),
    mk("Rendezett tömb rendezettsége", rendezett, [1, 2, 3, 4, 5], true),
    mk("Logaritmikus keresés", keres, [3, 5, 8, 10, 12], 4),
    mk("Típusellenőrzési hiba", "kimenet <- bemenet + 5", "hello", 5),
]

enum TestErrorEnum {
    WRONG_VALUE,
    TYPECHECK_ERROR,
    COMPILE_ERROR,
    AST_ERROR,
    TOKEN_ERROR,
}

type Maybe<T> = { success: true, result: T } | { success: false, type: TestErrorEnum, message: string }
class TestResult<T> {
    constructor(readonly value: Maybe<T>, readonly input: Test) { }

    then<O>(fn: (val: T, input: Test) => Maybe<O>): TestResult<O> {
        if (!this.value.success) {
            return new TestResult(this.value, this.input)
        }

        return new TestResult(fn(this.value.result, this.input), this.input);
    }
}

const ok = <T>(result: T): Maybe<T> => ({ success: true, result })
const fail = <T>(type: TestErrorEnum, message: string): Maybe<T> => ({ success: false, type, message })

class TestVM {
    private _status: TestResult<boolean>;

    get status() {
        return this._status;
    }

    get result(): string {
        if (this._status.value.success) {
            return "OK"
        } else {
            return `BAD - ${this._status.value.message}`
        }
    }

    jsToPseudo(input: JSValue): string {
        if (Array.isArray(input)) {
            return "(" + input.map(e => this.jsToPseudo(e)).join(", ") + ")"
        } 

        switch (typeof input) {
            case "object": throw new Error("Can't convert pointer to string.");
            case "boolean": return input ? "igaz" : "hamis";
            case "string": return `"${input}"`
            case "number": return input.toString()
            default: throw new Error("Unexpected value: " + input)
        }
    }

    constructor(test: Test) {
        const input = {...test, code: `bemenet <- ${this.jsToPseudo(test.input)}\n` + test.code}

        this._status = new TestResult(ok(input.code), input)
            .then(this.tokenize)
            .then(this.parse)
            .then(this.typeCheck)
            .then(this.compile)
            .then(this.provisionVM)
            .then(this.run)
    }

    private tokenize(code: string): Maybe<IToken[]> {
        const tokenizer = new Tokenizer()
        const tokens = tokenizer.tokenize(code)

        if (tokens.at(-1)?.type === TokenType.ERROR) {
            return fail(TestErrorEnum.TOKEN_ERROR, `Error tokenizing: "${tokens.at(-1)?.lexeme}".`)
        } else {
            return ok(tokens)
        }
    }

    private parse(tokens: IToken[]): Maybe<ASTKind> {
        const ast = parseBlock.run(tokens.filter(t => t.type !== TokenType.WHITESPACE))

        if (ast.type === "error") {
            return fail(TestErrorEnum.AST_ERROR, ast.cause)
        } else {
            return ok(ast.value)
        }
    }

    private typeCheck(ast: ASTKind): Maybe<ASTKind> {
        try {
            typeCheck(ast, new TypeMap([], []))
            return ok(ast)
        } catch (e: unknown) {
            if (e instanceof TypeCheckError) {
                return fail(TestErrorEnum.TYPECHECK_ERROR, e.message)
            } else {
                throw e
            }
        }
    }

    private compile(ast: ASTKind): Maybe<Inst[]> {
        const compiler = new Compiler()
        compiler.visit(ast)

        return ok(compiler.code)
    }

    private provisionVM(code: Inst[]): Maybe<VM> {
        const vm = new VM(code, () => { })

        vm.currentState.vars.escope(false)
        vm.currentState.vars.setVariable("kimenet", 0)

        return ok(vm);
    }

    private run(vm: VM, test: Test): Maybe<boolean> {
        const pseudoToJS = (value: Value, vars: Variables): JSValue => {
            if (typeof value === "object" && "pointer" in value) {
                const box = vars.getBox(value.pointer);
                if (box.type === ValueType.NORMAL) {
                    return pseudoToJS(box.value, vars)
                } else {
                    return vars.getArrayByAddr(value.pointer)
                }
            } else {
                return value
            }
        }

        const compare = (a: JSValue, b: JSValue, vars: Variables): boolean => {
            if (Array.isArray(a) && Array.isArray(b)) {
                const inner = (elem: Value | Value[]) => typeof elem === "object" && "pointer" in elem ? pseudoToJS(vars.getBox(elem.pointer).value, vars) : elem

                return a.every((elem, idx) => compare(inner(elem), inner(b[idx]), vars))
            } else {
                return a === b
            }
        }

        vm.run()
        const result = pseudoToJS(vm.currentState.vars.findBinding("kimenet"), vm.currentState.vars)
        vm.currentState.vars.lscope(false, [])

        const valid = compare(result, test.expectedOutput, vm.currentState.vars)

        if (valid) {
            return ok(true)
        } else {
            return fail(TestErrorEnum.WRONG_VALUE, `Expected ${test.expectedOutput}, got ${result}`)
        }
    }
}

testCases.forEach((test, idx) => {
    const runner = new TestVM(test)
    console.log(`${idx + 1}. ${runner.status.input.name}: ${runner.result}`)
})
