grammar PseudoCode;

program: statement+;

body: statement*;

statement
    : vars
    | methodCallStatement
    | ifStatement 
    | whileStatement
    | doWhileStatement
    | forStatement
    | arrayElementAssignmentStatement
    | arrayAssignmentStatement
    | assignmentStatement
    | returnStatement
    | functionDeclarationStatement
    | debugPrintStatement
    | debug
    ;

debug: 'debug';

debugPrintStatement: 'kiir' expression;

vars: 'változók';

ifStatement
    : HA expression AKKOR body ELVEGE #simpleIfStatement
    | HA expression AKKOR body elseBranch ELVEGE #ifElseStatement
    | HA expression AKKOR body elseIfBranch* elseBranch ELVEGE #ifElseIfStatement
    ;

elseIfBranch: KULONBEN HA expression AKKOR body;
elseBranch: KULONBEN body;

whileStatement:
        CIKLUS AMIG expression
            body
        CVEGE;

doWhileStatement:
        CIKLUS
            body
        AMIG expression;

forStatement:
        CIKLUS variable NYIL expression CSTART expression CEND
            body
        CVEGE ;

returnStatement: VISSZA expression;

methodCallStatement
    : functionName parameters;

functionDeclarationStatement
    : FUGGVENY functionName '(' parameterWithType (',' parameterWithType)* ')'
        body
      FVEGE #functionDeclarationWithParameters
    | FUGGVENY functionName '()'
        body
      FVEGE #functionDeclarationWithoutParameters
    ;

parameterWithType: CIMSZERINT? variable ':' type;

type
    : 'egész'
    | 'logikai'
    | 'szöveg'
    | 'egész tömb'
    | 'logikai tömb'
    | 'szöveg tömb'
    ;

arrayElementAssignmentStatement: variable '[' expression ']' NYIL expression;
arrayAssignmentStatement: variable NYIL 'Létrehoz[' type '](' expression ')';

assignmentStatement: variable NYIL expression;

/* EXPRESSIONS */
expression
    : expression OPERATOR expression #calculationExpression
    | expression COMPARISON expression #comparisonExpression
    | functionCall #functionCallExpression
    | NOT expression #notExpression
    | expression ES expression #andExpression
    | expression VAGY expression #orExpression
    | value #valueExpression
    ;

functionCall: functionName parameters;
parameters: '()' | '(' expression (',' expression)* ')';

functionName: FUNCTION;

value: arrayIndex | atom | variable;
atom: number | bool | string | arrayShorthand;

string: STRING;
number: NUMBER;
bool: BOOL;

arrayShorthand: '(' expression (',' expression)+ ')';
arrayIndex: variable '[' expression ']';
variable: VARIABLE;

OPERATOR
    : '*'
    | '/'
    | '-'
    | '+'
    | 'mod'
    ;

COMPARISON
    : '<'
    | '>'
    | '='
    | '=/='
    | '<='
    | '>='
    ;

CIMSZERINT: 'címszerint';
AMIG: 'amíg';
CIKLUS: 'ciklus' | 'Ciklus';
HA: 'ha' | 'Ha';
KULONBEN: 'különben';
AKKOR: 'akkor';
CSTART: '-tól' | '-től';
CEND: '-ig';
CVEGE: 'ciklus vége';
ELVEGE: 'elágazás vége';
FUGGVENY: 'függvény';
FVEGE: 'függvény vége';

NYIL: '<-';

STRING: '"' ('\\' ["\\] | ~["\\\r\n])* '"';
NOT: '~';
NUMBER: '0' | '1'..'9' '0'..'9'*;
BOOL: IGAZ | HAMIS;
IGAZ: 'igaz' | 'Igaz';
VISSZA: 'vissza';
HAMIS: 'hamis' | 'Hamis';

ES: '/\\';
VAGY: '\\/';

FUNCTION: [A-Z] ([a-z]|[A-Z])*;
VARIABLE: 'a'..'z'+;

WS : [ \t\r\n]+ -> skip ;