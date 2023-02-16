
export const primitive_tests = {
  name: "Primitívek",
  tests: [
    { name: "Szám", input: "kiír 5", output: 5 },
    { name: "Szöveg", input: 'kiír "Helló!"', output: "Helló!" },
    { name: "Logikai igaz", input: "kiír igaz", output: true },
    { name: "Logikai hamis", input: "kiír hamis", output: false },
    { name: "Tömb", input: "kiír (1,2,3)", output: [1, 2, 3] },
  ],
};

export const math_tests = {
  name: "Műveletek",
  tests: [
    { name: "Összeadás", input: "kiír 5 + 5", output: 10 },
    { name: "Kivonás", input: "kiír 6 - 2", output: 4 },
    { name: "Szorzás", input: "kiír 8*8", output: 64 },
    { name: "Osztás", input: "kiír 9 / 3", output: 3 },
    { name: "Modulo", input: "kiír 8 mod 5", output: 3 },
  ],
}

export const comparison_tests = {
  name: "Összehasonlítások",
  tests: [
    { name: "=", input: "kiír 5 = 5", output: true },
    { name: "=/=", input: "kiír 5 =/= 6", output: true },
    { name: "<", input: "kiír 5 < 6", output: true },
    { name: ">", input: "kiír 5 > 4", output: true },
    { name: "<= - ugyanaz", input: "kiír 5 <= 5", output: true },
    { name: "<= - kisebb", input: "kiír 5 <= 6", output: true },
    { name: ">= - ugyanaz", input: "kiír 5 >= 5", output: true },
    { name: ">= - nagyobb", input: "kiír 5 >= 4", output: true },
  ],
}

export const if_tests = {
  name: "Elágazások",
  tests: [
    {
      name: "különben - igaz",
      input: `
            ha igaz akkor
                kiír "OK"
            különben
                kiír "HIBA"
            elágazás vége`,
    },
    {
      name: "különben - hamis",
      input: `
            ha hamis akkor
                kiír "HIBA"
            különben
                kiír "OK"
            elágazás vége`,
    },
    {
      name: "különben ha",
      input: `
            ha hamis akkor
                kiír "HIBA"
            különben ha igaz akkor
                kiír "OK"
            különben
                kiír "HIBA"
            elágazás vége`,
    },
  ],
}

export const variable_tests = {
  name: "Változók",
  tests: [
    {
      name: "Változó = értéke",
      input: `
            x <- 5
            ha x = 5 akkor
                kiír "OK"
            elágazás vége`,
    },
    {
      name: "Változó megváltoztatható",
      input: `
            x <- 5
            ha x =/= 5 akkor
                kiír "HIBA"
            elágazás vége

            x <- 6

            ha x = 6 akkor
                kiír "OK"
            elágazás vége`,
    },
    {
      name: "Változó hivatkozhat önmagára",
      input: `
            x <- 5
            x <- x * 2
            
            ha x = 10 akkor
                kiír "OK"
            elágazás vége`,
    },
  ],
}; 

export const function_tests = {
  name: "Függvények",
  tests: [
    {
      name: "Explicit árnyékolás",
      input: `
            x<-3
            függvény Teszt(x : egész)
                x<-5
            függvény vége
            kiír x`,
      output: 3,
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
            
            kiír x`,
      output: 3,
    },
    {
      name: "Implicit árnyékolás két változóval",
      input: `
            x<-3
            függvény Teszt()
                y<-3
                x<-5
            függvény vége
            Teszt()
            
            kiír x`,
      output: 3,
    },
    {
      name: "Primitív címszerint - ugyanaz a név",
      input: `
            x<-3
            függvény Teszt(címszerint x : egész)
                x<-5
            függvény vége
            Teszt("x")
            
            kiír 5`,
      output: 5,
    },
    {
      name: "Primitív címszerint - más név",
      input: `
            x<-3
            függvény Teszt(címszerint y : egész)
                y<-5
            függvény vége
            Teszt("x")
            
            kiír 5`,
      output: 5,
    },
  ],
}

export const return_tests = {
  name: "Visszatérés",
  tests: [
    {
      name: "Egyszerű paraméteres",
      input: `
            x<-3
            függvény Teszt(x : egész)
                vissza x * 2
            függvény vége
            kiír Teszt(x)`,
      output: 6,
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
            kiír Teszt(x)`,
      output: 6,
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
            kiír Teszt(x)`,
      output: 6,
    },
  ],
}

export const array_tests = {
  name: "Tömbök",
  tests: [
    {
      name: "Üres tömb",
      input: `
            x <- Létrehoz[egész](3)
            kiír x`,
      output: [0, 0, 0],
    },
    {
      name: "Értékadás",
      input: `
            x <- Létrehoz[egész](3)
            x[2] <- 1
            kiír x`,
      output: [0, 1, 0],
    },
    {
      name: "Lekérés",
      input: `
            x <- Létrehoz[egész](3)
            x[3] <- 5
            kiír x[3]`,
      output: 5,
    },
  ],
}
