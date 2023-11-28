import { Compiler } from "../src/compiler/compiler.ts";
import { typeCheck } from "../src/compiler/typecheck.ts";
import { TypeMap } from "../src/compiler/typemap.ts";
import { TokenType } from "../src/interfaces/ITokenizer.ts";
import { Inst } from "../src/interfaces/instructions.ts";
import { ArrayType, LOGIC, NUMBER, ReferenceType, STRING, Type } from "../src/interfaces/types.ts";
import { parseBlock } from "../src/parser/ast_parser.ts";
import { Tokenizer } from "../src/parser/tokenizer.ts";
import { DeepArray, ValueType, Variables } from "../src/runtime/variables.ts";
import { VM, Value } from "../src/runtime/vm.ts";

type JSValue = ReturnType<typeof pseudoToJS>

function pseudoToJS(value: Value, vars: Variables) {
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

function provisionVM(code: Inst[], input: JSValue): VM {
    const vm = new VM(code, (a,b) => {})

    vm.currentState.vars.escope(false)
    if (Array.isArray(input)) {
        vm.currentState.vars.addArray("bemenet", input)
    } else {
        vm.currentState.vars.setVariable("bemenet", input);
    }

    vm.currentState.vars.setVariable("kimenet", 0)

    return vm
}

function compare(a: JSValue, b: JSValue, vars: Variables): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
        const inner = (elem: Value | Value[]) => typeof elem === "object" && "pointer" in elem ? pseudoToJS(vars.getBox(elem.pointer).value, vars) : elem

        return a.every((elem, idx) => compare(inner(elem), inner(b[idx]), vars))
    } else {
        return a === b
    }
}

function runVM(vm: VM, expected: JSValue): boolean {
    vm.run()
    
    const result = pseudoToJS(vm.currentState.vars.findBinding("kimenet"), vm.currentState.vars)
    vm.currentState.vars.lscope(false, [])

    const valid = compare(result, expected, vm.currentState.vars)

    if (valid) {
        return true
    }

    console.log(`Expected: ${expected}, got ${result}.`)
    return false
}

function test(inputCode: string, input: JSValue, expected: JSValue): boolean {
    const tokenizer = new Tokenizer()
    const tokens = tokenizer.tokenize(inputCode)
    const ast = parseBlock.run(tokens.filter(t => t.type !== TokenType.WHITESPACE))

    if (ast.type === "match") {
        const type = (e: Value | DeepArray<Value>): Type => Array.isArray(e)
            ? new ArrayType(type(e[0]))
            : typeof e === "object" && "pointer" in e ?
                new ReferenceType(NUMBER)
                : typeof e === "number" ? NUMBER : typeof e === "string" ? STRING : LOGIC

        typeCheck(ast.value, new TypeMap([], []).with("bemenet", type(input)))

        const compiler = new Compiler()
        compiler.visit(ast.value)

        const vm = provisionVM(compiler.code, input)

        return runVM(vm, expected)
    } else {
        console.log("Can't match: " + ast.cause)
        return false
    }
}

console.log(test("kimenet <- bemenet * 2\n", 5, 10))
console.log(test(`kimenet <- 0 ciklus i <- 1-től 10-ig kimenet <- kimenet + i ciklus vége`, 0, [1,2,3,4,5,6,7,8,9,10].reduce((a,b) => a+b))) // 55
console.log(test(`kimenet <- bemenet kimenet[1] <- 5`, [1,2,3], [5,2,3]))


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

const factor = `
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

console.log(test(buborek, [3,2,1,5,4], [1,2,3,4,5]))
console.log(test(lnko, [15, 33], 3))

console.log(test(factor, 5, [1,2,3,5,8]))
console.log(test(factor, 8, [1,2,3,5,8,13,21,34]))

console.log(test(rendezett, [3,2,1], false))
console.log(test(rendezett, [1,2,3,4,5], true))

console.log(test(keres, [3,5,8,10,12], 4))

console.log(test("kimenet <- bemenet + 5", "hello", 5))