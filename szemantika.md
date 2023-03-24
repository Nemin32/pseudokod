# Szemantika

## Üres helyek és sorkihagyások

A Pszeudokód nem értelmezi az üres helyeket, ezeket csupán a kód fordításánál használjuk fel a nyelvi elemek és utasítások elhatárolására, a végső szintaxisfából kiszűrésre kerülnek.

Viszont mivel a kód nem tartalmaz semmiféle sorlezáró jelet (például a C-hez hasonlatos nyelvekben használt ";"), így az egymás után következő utasításokat célszerűen sortöréssel választjuk el egymástól.
A kód elemeit pedig egy soron belül legalább egy üres hellyel választhatjuk el.

## Kommentek

    <comment> ::= '//' .* '\n'

Bár a jegyzetben használt Pszeudokód nem definiálja a kommentelést, mint lehetséges nyelvi elem, hasznossága miatt ez az implementáció figyelmen kívül hagyja a C nyelvből megszokott két perjellel kezdődő sorokat.

## Típusok

    <type> ::= ('egész' | 'logikai' 'szöveg') 'tömb'?

A Pszeudokód háromféle típust különböztet meg. Ezek az egész számok, a logikai értékek, és a karakterláncok. Ezen kívül a nyelv értelmezi még az ezen típusokból alkotott tömböket is.

## Atomi értékek

    <number> ::= '0' | '1'-'9' '0'-'9'*
    <bool> ::= 'igaz' | 'hamis' | 'Igaz' | 'Hamis'
    <string> ::= '"' .* '"'

    <atom> ::= <number> | <bool> | <string>

Az atom kifejezést a Scheme nyelvből vettem át. Olyan értékeket jelöl, melyek minden külső tényezőt figyelmen kívül hagyva, mindig önmagukra értékelődnek ki. A Pszeudokód három ilyen értéket ismer, ezek az egész számok, az idézőjelek közé zárt tetszőleges hosszúságú karakterláncok, és az igaz és hamis logikai értékek.

Tehát az '500' karakterlánc az ötszázas számnak felel meg, az 'igaz' az igaz logikai értéknek, a '"példa"' pedig a "példa" szövegnek.

## Műveletek

    <value> ::= <array_index> | <variable> | <atom>
    <factor> ::= <value> | '(' <logic_binop> ')'

### Aritmetika

    <arithm_add_op> ::= '+' | '-'
    <arithm_mul_op> ::= '*' | '/' | 'mod'

    <arithm_add_binop> ::= <expression> <arithm_add_op> <expression>
    <arithm_mul_binop> ::= <expression> <arithm_mul_op> <expression> | <arithm_add_binop>

### Összehasonlítások

    <comparison_op> ::= '<=' | '>=' | '<' | '>' | '=' | '=/='
    <comparsion_binop> ::= <expression> <comparison_op> <expression> | <arithm_mul_binop>

### Logikai

    <logic_op> ::= 'és' | 'vagy'
    <logic_binop> ::= <expression> <logic_op> <expression> | <comparsion_binop>


A műveletek szabadon ágyazhatóak egymásba, ezáltal lehetővé válnak a C-szerű nyelvekből megszokott komplex összehasonlítások, mint például annak ellenőrzése, hogy egy lista végére értünk-e már és, ha nem, akkor az éppen ellenőrzött elem milyen értékkel rendelkezik.

### Negálás

    <negation> ::= '~' <expression>

Lehetőségünk van még egy logikai értéket negálni is, ez esetben az igaz érték hamissá válik, a hamis pedig igazzá.

## Változók

    <variable> ::= 'a'-'z'

A változók nevei csupa kisbetűvel írt szavak. Típusuk értékadáskor dől el implicit módon, a jobboldalt álló érték típusa alapján. Egy változó típusa inicializálás után nem változhat. Konstans deklaráció nem lehetséges, a programozó feladata, hogy a változók értéke ne változhasson, ha az nem szándékos.

A nyelv elődeklarációt nem támogat, a változók létrehozáskor kötelezően értéket is kapnak, ebből következően null-értékkel rendelkező vagy üres változó nem létezik.

A változó értékét annak nevével érhetjük el. Nem létező változó értékének elérése futásközbeni hibához vezet.

### Értékadás

    <assignment> ::= <variable> '<-' <expression>

Egy változó bármely adattípust képes eltárolni. Ha egy változó értékét egy másikára állítjuk érték-alapú másolás történik, tehát az így keletkezett adat az eredetitől függetlenül módosítható.

### Tömbök

    <array_create> ::= <variable> '<-' 'Létrehoz[' <type> '](' <expression> ')'
    <array_index> ::= <variable> '[' <expression> ']'
    <array_set> ::= <variable '[' <expression> ']' '<-' <expression>
    <array_shorthand> ::= '(' <expression> (',' <expression>)* ')'

Tömböket kétféleképp deklarálhatunk a Pszeudokód nyelvben. Egyrészt készítetünk megadott ŧípussal és hosszal rendelkező tömböt, mely ekkor a típusnak megfelelő üres értékekkel töltődik fel (0 szám, "" szöveg, és hamis logikai érték esetén). Másrészt lehetőségünk van kézzel megadni a tömb elemeit. Ezesetben a típusoknak nem feltétlen kell egyezniük.

### Cím lekérése

    <reference> ::= '&' (<array_index> | <variable>)

Lehetőségünk van még egy változó címének lekérésére is. Ez egy olyan számérték, mely a nyelvet futtató virtuális gép memóriájának a változó értékének megfelelő cellájára mutat. Ez a tömbök elemeinek címét is képes lekérni.

A címszerint átadott paramétereknél kerül használatra. Tömbökkel egyszerű mutató-aritmetikát is végezhetünk (tömb + n = n. elem), viszont a futtatási környezet hibát dob, ha megpróbálunk a tömb határain kívülre indexelni ilyen módon.

## Folyamatvezérlési szerkezetek

A Pszeudokód a három leggyakoribb Folyamatvezérlési szerkezetet bocsájtja a programozó rendelkezésére.

### Elágazás

    <else> ::= 'különben' <block>
    <else_if> ::= 'különben' 'ha' <expression> 'akkor' <block>
    <if> ::= 'ha' <expression> 'akkor' <block> (<else>? | <else_if>+ <else>)

A nyelv háromféle elágazást támogat: 

- Egyszerű predikátum-vizsgálat (if)
- Predikátum-vizsgálat és egy alternatív ág (if-else)
- Predikátum-vizsgálat, több alternatív ág, és egy végleges ág (if-else if-else)

### Ciklusok

    <while> ::= 'ciklus' 'amíg' <expression> <block> 'ciklus' 'vége'
    <do_while> ::= 'ciklus' <block> 'amíg' <expression>
    <for> ::= 'ciklus' <variable> '<-' <expression> ('-tól'|'-től') <expression> '-ig' <block> 'ciklus' 'vége'

A Pszeudokód a C nyelvből ismert for, while, és do while ciklusszerkezetek megfelelőit támogatja. For-szerű ciklus esetén a változó az első értékkel inicializálódik és ciklusonként egyel nő, amíg el nem éri a második értéket. Az érték elérésekor még lefut a ciklus.

### Függvények

    <function_name> ::= 'A'-'Z' ('a'-'z' | 'A'-'Z')*

Lehetőségünk van függvények létrehozására és hívására is. A függvények neveit nagybetűvel kezdjük, így különböztetve meg őket a változóktól.

#### Deklarálás

    <func_decl_parameter> ::= 'címszerint'? <variable> ':' <type>
    <func_decl_param_list> ::= '(' ')' | '(' <func_decl_parameter> (',' <func_decl_parameter>)* ')'
    <function_declaration> ::= 'függvény' <function_name> <func_decl_param_list> <block> 'függvény' 'vége'

A függvények deklarációját azok meghívása előtt kell megtennünk. Új függvény másik függvényen belül nem deklarálható. Lehetőségünk van érték szerint és cím szerint is bekérni paramétereket.

Előbbi esetben a változó értékének egy másolata kerül átadásra, melynek változtatása nem befolyásolja az eredeti értéket. Cím szerinti átadás esetén viszont a két változó ugyanarra az értékre mutat, így az egyik változtatása változtatja a másikat is.

#### Visszatérés

    <return> ::= 'vissza' <expression>

Függvényból értékkel visszatérni a 'vissza' kulcsszó segítségével tudunk. Ennek meghívásakor a függvény azonnal megszakad és a kapott értékkel tér vissza.

#### Hívás

    <func_call_parameter_list> ::= '(' ')' | '(' <expression> (',' <expression>)* ')'
    <function_call> ::= <function_name> <func_call_parameter_list>

Függvény hívható kifejezésként is, mely esetben az azt hívó utasítás a visszatérési értékét kapja meg, vagy hívható önmagában utasításként is, ekkor a visszatérési érték eldobásra kerül. Függvény hívhat más függvényt.

## Kiírás

    <print> ::= 'kiír' <expression>

Meghíváskor a kapott érték a felhasználó számára látható módon megjelenítésre kerül (például konzolon).

## Megszakítás

    <debug> ::= 'debug'

A kulcsszó használatakor az értelmező futtatása rögtön megszakad. Ezután a felhasználó a kódot léptetheti vagy a változók és a verem értékeit megvizsgálhatja.

## Kifejezések

    <expression> ::= <negation> | <array_shorthand> | <function_call> | <logic_binop>

## Utasítások

    <statement> ::= <array_set> | <array_create> | <if> | <return> | <for> | <assignment> | <function_declaration> | <print> | <do_while> | <while> | <debug> | <function_call>

    <block> ::= <statement>*

A kifejezések és utasítások közötti különbségeket később tárgyaljuk. A program szintaxisfájának gyökere egy <block> elem.