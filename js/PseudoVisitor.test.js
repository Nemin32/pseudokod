import { jest, test, describe, expect, afterEach } from "@jest/globals"
import { runText, runLinear } from "./src/index.js"

const mockOutput = jest.fn((input) => input)

/** @param {string} input */
const r = (input) => runLinear(input, mockOutput)
//const r = (input) => runText(input, (input) => { }, mockOutput)

const generateTest = (testInstance) => test(testInstance.name, () => {
    r(testInstance.input)
    expect(mockOutput.mock.calls.length).toBe(testInstance.times ?? 1)
    expect(mockOutput.mock.results[0].value).toStrictEqual(String(testInstance.output ?? "OK"))
})

const generateTestGroup = (groupDetails) => describe(groupDetails.name, () => {
    groupDetails.tests.map(generateTest)
})

afterEach(() => {
    jest.clearAllMocks();
});


const primitive_tests = {
    name: "Primitívek",
    tests: [
        { name: "Szám", input: "kiir 5", output: 5 },
        { name: "Szöveg", input: "kiir \"Helló!\"", output: "Helló!" },
        { name: "Logikai igaz", input: "kiir igaz", output: true },
        { name: "Logikai hamis", input: "kiir hamis", output: false },
        { name: "Tömb", input: "kiir (1,2,3)", output: [1, 2, 3] }]
}

const math_tests = {
    name: "Műveletek",
    tests: [
        { name: "Összeadás", input: "kiir 5 + 5", output: 10 },
        { name: "Kivonás", input: "kiir 6 - 2", output: 4 },
        { name: "Szorzás", input: "kiir 8*8", output: 64 },
        { name: "Osztás", input: "kiir 9 / 3", output: 3 },
        { name: "Modulo", input: "kiir 8 mod 5", output: 3 }]
}

const comparison_tests = {
    name: "Összehasonlítások",
    tests: [
        { name: "=", input: "kiir 5 = 5", output: true },
        { name: "=/=", input: "kiir 5 =/= 6", output: true },
        { name: "<", input: "kiir 5 < 6", output: true },
        { name: ">", input: "kiir 5 > 4", output: true },
        { name: "<= - ugyanaz", input: "kiir 5 <= 5", output: true },
        { name: "<= - kisebb", input: "kiir 5 <= 6", output: true },
        { name: ">= - ugyanaz", input: "kiir 5 >= 5", output: true },
        { name: ">= - nagyobb", input: "kiir 5 >= 4", output: true },
    ]
}

const if_tests = {
    name: "Elágazások",
    tests: [
        {
            name: "különben - igaz",
            input: `
            ha igaz akkor
                kiir "OK"
            különben
                kiir "HIBA"
            elágazás vége` },
        {
            name: "különben - hamis",
            input: `
            ha hamis akkor
                kiir "HIBA"
            különben
                kiir "OK"
            elágazás vége` },
        {
            name: "különben ha",
            input: `
            ha hamis akkor
                kiir "HIBA"
            különben ha igaz akkor
                kiir "OK"
            különben
                kiir "HIBA"
            elágazás vége` },
    ]
}

const variable_tests = {
    name: "Változók",
    tests: [
        {
            name: "Változó = értéke",
            input: `
            x <- 5
            ha x = 5 akkor
                kiir "OK"
            elágazás vége` },
        {
            name: "Változó megváltoztatható",
            input: `
            x <- 5
            ha x =/= 5 akkor
                kiir "HIBA"
            elágazás vége

            x <- 6

            ha x = 6 akkor
                kiir "OK"
            elágazás vége` },
        {
            name: "Változó hivatkozhat önmagára",
            input: `
            x <- 5
            x <- x * 2
            
            ha x = 10 akkor
                kiir "OK"
            elágazás vége` }
    ]
}

const function_tests = {
    name: "Függvények",
    tests: [
        {
            name: "Explicit árnyékolás",
            input: `
            x<-3
            függvény Teszt(x : egész)
                x<-5
            függvény vége
            kiir x`,
            output: 3
        },
        {
            name: "Implicit árnyékolás",
            input: `
            x<-3
            y<-4
            függvény Teszt()
                x<-5
            függvény vége
            Teszt()
            
            kiir x`,
            output: 3
        },
        {
            name: "Implicit árnyékolás két változóval",
            input: `
            x<-3
            függvény Teszt()
                y<-3
                x<-5
                változók
            függvény vége
            Teszt()
            
            kiir x`,
            output: 3
        },
        {
            name: "Primitív címszerint - ugyanaz a név",
            input: `
            x<-3
            függvény Teszt(címszerint x : egész)
                x<-5
            függvény vége
            Teszt("x")
            
            kiir 5`,
            output: 5
        },
        {
            name: "Primitív címszerint - más név",
            input: `
            x<-3
            függvény Teszt(címszerint y : egész)
                y<-5
            függvény vége
            Teszt("x")
            
            kiir 5`,
            output: 5
        },
    ]
}

const return_tests = {
    name: "Visszatérés",
    tests: [
        {
            name: "Egyszerű paraméteres",
            input: `
            x<-3
            függvény Teszt(x : egész)
                vissza x * 2
            függvény vége
            kiir Teszt(x)`,
            output: 6
        },
        {
            name: "Elágazásból",
            input: `
            x <- 3
            függvény Teszt(x : egész)
                ha x > 3 akkor
                    vissza x
                különben
                    vissza x * 2
                elágazás vége
            függvény vége
            kiir Teszt(x)`,
            output: 6
        },
        {
            name: "Beágyazott elágazásból",
            input: `
            x <- 3
            függvény Teszt(x : egész)
                ha x > 3 akkor
                    vissza x
                különben
                    ha x = 3 akkor
                        vissza x * 2
                    különben
                        vissza x * 4
                    elágazás vége
                elágazás vége
            függvény vége
            kiir Teszt(x)`,
            output: 6
        },
    ]
}

const array_tests = {
    name: "Tömbök",
    tests: [
        {
            name: "Üres tömb",
            input: `
            x <- Létrehoz[egész](3)
            kiir x`,
            output: [0, 0, 0]
        },
        {
            name: "Értékadás",
            input: `
            x <- Létrehoz[egész](3)
            x[2] <- 1
            kiir x`,
            output: [0, 1, 0]
        },
        {
            name: "Lekérés",
            input: `
            x <- Létrehoz[egész](3)
            x[3] <- 5
            kiir x[3]`,
            output: 5
        }
    ]
}

generateTestGroup(primitive_tests)
generateTestGroup(math_tests)
generateTestGroup(comparison_tests)
generateTestGroup(if_tests)
generateTestGroup(variable_tests)
generateTestGroup(function_tests)
generateTestGroup(return_tests)
generateTestGroup(array_tests)

describe("Ciklusok", () => {
    test("Egyszerű ciklus", () => {
        r(`
        x <- 0
        ciklus amíg x < 5
            kiir x
            x <- x + 1
        ciklus vége

        kiir x
        `)

        expect(mockOutput.mock.calls.length).toBe(6)
        expect(mockOutput.mock.results[5].value).toBe("5")
    })

    test("For ciklus", () => {
        r(`
        x <- 1
        ciklus i <- 1-től 5-ig
            x <- x * 2
        ciklus vége

        kiir x
        `)

        expect(mockOutput.mock.calls.length).toBe(1)
        expect(mockOutput.mock.results[0].value).toBe("32")
    })
})