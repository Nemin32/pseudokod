grammar PseudoCode;

program: WS? (newline | statement)+;

body: WS? (statement | newline)+;

statement: (
		methodCallStatement
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
	) newline;

debug: 'debug';

debugPrintStatement: 'kiir' WS expression;

ifStatement:
	HA WS expression WS AKKOR newline body (
		elseIfBranch+ elseBranch
		| elseBranch?
	) ELVEGE;

elseIfBranch:
	KULONBEN WS HA WS expression WS AKKOR newline body;
elseBranch: KULONBEN newline body;

whileStatement: CIKLUS WS AMIG WS expression newline body CVEGE;

doWhileStatement: CIKLUS newline body AMIG WS expression;

forStatement:
	CIKLUS WS variable ASSIGN expression CSTART WS expression CEND newline body CVEGE;

returnStatement: VISSZA WS expression;

methodCallStatement: functionName parameters;

functionDeclarationStatement:
	FUGGVENY WS functionName parameterList newline body FVEGE;

parameterList:
	| '()'
	| '(' parameterWithType (',' parameterWithType)* ')';

parameterWithType:
	newline? (CIMSZERINT WS)? variable WS? ':' WS? type newline?;

type:
	'egész'
	| 'logikai'
	| 'szöveg'
	| 'egész tömb'
	| 'logikai tömb'
	| 'szöveg tömb';

arrayElementAssignmentStatement:
	variable '[' WS? expression WS? ']' ASSIGN expression;

arrayAssignmentStatement:
	variable ASSIGN 'Létrehoz[' WS? type WS? '](' WS? expression WS? ')';

assignmentStatement: variable ASSIGN expression;

/* EXPRESSIONS */
expression:
	expression WS? OPERATOR WS? expression		# calculationExpression
	| expression WS? COMPARISON WS? expression	# comparisonExpression
	| functionCall								# functionCallExpression
	| NOT expression							# notExpression
	| expression WS? ES WS? expression			# andExpression
	| expression WS? VAGY WS? expression		# orExpression
	| value										# valueExpression;

functionCall: functionName parameters;
parameters: '()' | '(' expression (',' WS? expression)* ')';

functionName: FUNCTION;

value: arrayIndex | atom | variable;
atom: number | bool | string | arrayShorthand;

string: STRING;
number: NUMBER;
bool: BOOL;

arrayShorthand: '(' expression (',' WS? expression)* ')';
arrayIndex: variable ('[' expression ']')+;

variable: VARIABLE;

newline: NL+;

OPERATOR: '*' | '/' | '-' | '+' | 'mod';

COMPARISON: '<' | '>' | '=' | '=/=' | '<=' | '>=';

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

ASSIGN: WS? NYIL WS?;
NYIL: '<-';

STRING: '"' ('\\' ["\\] | ~["\\\r\n])* '"';
NOT: '~';
NUMBER: '0' | '1' ..'9' '0' ..'9'*;
BOOL: IGAZ | HAMIS;
IGAZ: 'igaz' | 'Igaz';
VISSZA: 'vissza';
HAMIS: 'hamis' | 'Hamis';

ES: '/\\';
VAGY: '\\/';

FUNCTION: [A-Z] ([a-z] | [A-Z])*;
VARIABLE: 'a' ..'z'+;

NL: (WS? [\r\n] WS?);
WS: [ \t]+;