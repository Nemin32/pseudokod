import { IToken } from "../interfaces/ITokenizer.ts";
import {
	ASTTag,
	ArrayComprehension,
	ArrayIndex,
	Assignment,
	Atom,
	BinOpTypeMap,
	BinaryOperation,
	Block,
	Debug,
	Expression,
	For,
	FunctionCall,
	FunctionDeclaration,
	If,
	NewArray,
	Not,
	Parameter,
	Print,
	Reference,
	Return,
	Statement,
	Swap,
	Variable,
	While,
	stringToBaseType,
} from "../interfaces/astkinds.ts";
import { GenericType, LOGIC, NUMBER, STRING, SimpleType } from "../interfaces/types.ts";
import { Chain, P, Parser, TT, mkToken } from "./monadic_parser_base.ts";

const parseBaseType: P<SimpleType | GenericType> = Parser.matchT(TT.TYPE).map(t => stringToBaseType(t.lexeme))

const parseStatement: P<Statement> = Parser.of<Statement>(
	() => {
		const symbolParser = Parser.choice([
			parseSwap as Parser<Statement>,
			parseAssignment,
			parseNewArray,
			parseComprehension
		])

		const statementMap: ReadonlyMap<TT, Parser<Statement>> = new Map([
			[TT.HA, parseIf as Parser<Statement>],
			[TT.VISSZA, parseReturn],
			[TT.CIKLUS, parseFor.or(parseWhile)],
			[TT.SYMBOL, symbolParser],
			[TT.FUGGVENY, parseFuncDecl],
			[TT.KIIR, parsePrint],
			[TT.DEBUG, parseDebug],
			[TT.FUNCNAME, parseFuncCall],
		]);

		return Parser.peek(0)
			.map((t) => t.type)
			.mapChoice(statementMap);
	},
	//.or(parseExpression), Ha támogatni akarjuk a lógó expressionöket.
);

export const parseExpression: P<Expression> = Parser.of(() =>
	parseBinOp
);

export const parseBlock: P<Block> = parseStatement
	.many1()
	.map((stmts) => mkToken(null, ASTTag.BLOCK, { statements: stmts }));

const parseVariable: P<Variable> = Parser.matchT(TT.SYMBOL).map((token) =>
	mkToken(token, ASTTag.VARIABLE, { name: token.lexeme }),
);

const parseComprehension: P<ArrayComprehension> = Parser.do()
	.bind("variable", parseVariable)
	.ignoreT(TT.NYIL)
	.bind("expressions",
		parseExpression
			.sepBy(Parser.matchT(TT.COMMA))
			.parens())
	.result(({ variable, expressions }) => mkToken(null, ASTTag.ARRAYCOMP, { variable, expressions }));

const parseArrayIndex: P<ArrayIndex> = Parser.do()
	.bind("variable", parseVariable)
	.bind("index", parseExpression.sepBy1(Parser.matchT(TT.COMMA)).brackets())
	.result(({ variable, index }) => mkToken(variable.token, ASTTag.ARRINDEX, { variable, index }));

// New Array

const parseNewMultiDimArray: P<NewArray> = Parser.do()
	.bind("variable", parseVariable)
	.ignoreT(TT.NYIL)
	.bindT("token", TT.TABLALETREHOZ)
	.bind("type", parseBaseType.parens())
	.bind("dimensions", parseExpression.sepBy1(Parser.matchT(TT.COMMA)).brackets())
	.result(({ variable, token, type, dimensions }) =>
		mkToken(token, ASTTag.NEWARRAY, { variable, dimensions, type }),
	);

const parseNewSingleDimArray: P<NewArray> = Parser.do()
	.bind("variable", parseVariable)
	.ignoreT(TT.NYIL)
	.bindT("token", TT.LETREHOZ)
	.bind("type", parseBaseType.parens())
	.bind("length", parseExpression.brackets())
	.result(({ variable, token, type, length }) =>
		mkToken(token, ASTTag.NEWARRAY, { variable, dimensions: [length], type }),
	);

const parseNewArray = parseNewSingleDimArray.or(parseNewMultiDimArray);

const parseSwap: P<Swap> = Parser.do()
	.bind("var1", parseArrayIndex.or(parseVariable))
	.bindT("token", TT.SWAP)
	.bind("var2", parseArrayIndex.or(parseVariable))
	.result(({ var1, token, var2 }) => mkToken(token, ASTTag.SWAP, { var1, var2 }));

//#region Atom

const number: P<Atom> = Parser.matchT(TT.NUMBER).map((token) =>
	mkToken(token, ASTTag.ATOM, { type: NUMBER, value: Number(token.lexeme) }),
);

const boolean: P<Atom> = Parser.matchT(TT.BOOLEAN).map((token) =>
	mkToken(token, ASTTag.ATOM, { type: LOGIC, value: ["Igaz", "igaz"].includes(token.lexeme) }),
);

const string: P<Atom> = Parser.matchT(TT.STRING).map((token) =>
	mkToken(token, ASTTag.ATOM, { type: STRING, value: token.lexeme }),
);

const parseAtom = Parser.choice([number, boolean, string]);

//#endregion

const parseNot: P<Not> = Parser.matchT(TT.NEGAL).bind((token) =>
	parseExpression.map((expr) => mkToken(token, ASTTag.NOT, { expr })),
);

const parseReference: P<Reference> = Parser.matchT(TT.REFERENCE).bind((token) =>
	parseArrayIndex.or(parseVariable).map((inner) => mkToken(token, ASTTag.REFERENCE, { inner })),
);

//#region BinOp

const addOp = Parser.sat((tok) => ["+", "-"].includes(tok.lexeme));
const mulOp = Parser.sat((tok) => ["*", "/", "mod"].includes(tok.lexeme));
const compOp = Parser.sat((tok) => [">", "<", "=", "<=", ">=", "=/="].includes(tok.lexeme));
const logicOp = Parser.sat((tok) => ["és", "vagy"].includes(tok.lexeme));

// Because we're using a stack based VM, we need to reverse arguments, hence args.reverse()
const parseFuncCall: P<FunctionCall> = Parser.do()
	.bindT("name", TT.FUNCNAME)
	.bind("args", parseExpression.or(Parser.matchT(TT.FUNCNAME)).sepBy(Parser.matchT(TT.COMMA)).parens())
	.result(({ name, args }) => mkToken(name, ASTTag.FUNCCALL, { name: name.lexeme, arguments: args.reverse() }));

const primary: P<Expression> = Parser.choice([
	parseExpression.parens(),
	parseNot,
	parseReference,
	parseFuncCall,
	parseArrayIndex,
	parseVariable,
	parseAtom,
]);

const chainToExpr = (chain: Expression | Chain<Expression, IToken, Expression>): Expression => {
	// Ez egy expression, térjünk vissza vele ahogy van.
	if (!("left" in chain)) {
		return chain;
	}

	const binop = BinOpTypeMap.get(chain.op.lexeme);
	if (binop === undefined) throw new Error(`Unknown binop: "${chain.op.lexeme}".`);

	return mkToken<BinaryOperation>(chain.op, ASTTag.BINOP, {
		lhs: "left" in chain.left ? chainToExpr(chain.left) : chain.left,
		op: binop,
		rhs: chain.right,
	});
};

const parseArithmOp: P<Expression> = Parser.chain(primary, addOp).map(chainToExpr);
const parseMulOp: P<Expression> = Parser.chain(parseArithmOp, mulOp).map(chainToExpr);
const parseCompOp: P<Expression> = Parser.chain(parseMulOp, compOp).map(chainToExpr);
export const parseBinOp: P<Expression> = Parser.chain(parseCompOp, logicOp).map(chainToExpr);

//#endregion

export const parseAssignment: P<Assignment> = Parser.do()
	.bind("variable", parseArrayIndex.or(parseVariable))
	.bindT("nyil", TT.NYIL)
	.bind("value", parseExpression)
	.result(({ variable, nyil, value }) =>
		mkToken(nyil, ASTTag.ASSIGN, {
			variable,
			value,
		}),
	);

const parseDebug: P<Debug> = Parser.matchT(TT.DEBUG).map((token) => mkToken(token, ASTTag.DEBUG, {}));

const parseFor: P<For> = Parser.do()
	.bindT("token", TT.CIKLUS)
	.bind("variable", parseVariable)
	.ignoreT(TT.NYIL)
	.bind("from", parseExpression)
	.ignoreT(TT.FORSTART)
	.bind("to", parseExpression)
	.ignoreT(TT.FOREND)
	.bind("body", parseBlock)
	.ignoreT(TT.CIKLUS)
	.ignoreT(TT.VEGE)
	.result(({ token, variable, from, to, body }) =>
		mkToken(token, ASTTag.FOR, {
			from,
			to,
			body,
			variable,
		}),
	);

//#region Function Declaration

const parseByRef = Parser.matchT(TT.CIMSZERINT)
	.map((_) => true)
	.or(Parser.result(false));

const parseParamType = Parser.do()
	.bind("type", parseBaseType)
	.maybeT("isSorted", TT.RENDEZETT)
	.maybeT("isArray", TT.TOMB)
	.finalize({});

const parseParameter: P<Parameter> = Parser.do()
	.bind("byRef", parseByRef)
	.bind("name", parseVariable.or(Parser.matchT(TT.FUNCNAME)))
	.ignoreT(TT.COLON)
	.bind("type", parseParamType)
	.result(({ byRef, name, type }) =>
		mkToken("token" in name ? name.token : name, ASTTag.PARAMETER, {
			byRef,
			name: "token" in name ? name : name.lexeme,
			type: type.type,
			isArr: type.isArray !== null
		}),
	);

export const parseFuncDecl: P<FunctionDeclaration> = Parser.do()
	.bindT("token", TT.FUGGVENY)
	.bindT("name", TT.FUNCNAME)
	.bind("parameters", parseParameter.sepBy(Parser.matchT(TT.COMMA)).parens())
	.bind("body", parseBlock)
	.ignoreT(TT.FUGGVENY)
	.ignoreT(TT.VEGE)
	.result(({ token, body, name, parameters }) =>
		mkToken(token, ASTTag.FUNCDECL, { body, name: name.lexeme, parameters }),
	);

//#endregion

//#region If

const parseIfHead = Parser.do()
	.bindT("token", TT.HA)
	.bind("pred", parseExpression)
	.ignoreT(TT.AKKOR)
	.bind("branch", parseBlock)
	.finalize({});

const parseElse = Parser.matchT(TT.KULONBEN).right(parseBlock);

const parseElIf = Parser.matchT(TT.KULONBEN).right(parseIfHead);

const parseIf: P<If> = Parser.do()
	.bind("main_path", parseIfHead)
	.bind("elif_path", parseElIf.many())
	.bind("false_path", parseElse.maybe())
	.ignoreT(TT.ELAGAZAS)
	.ignoreT(TT.VEGE)
	.result(({ main_path, elif_path, false_path }) =>
		mkToken(main_path.token, ASTTag.IF, { main_path, elif_path, false_path }),
	);

//#endregion

const parsePrint: P<Print> = Parser.matchT(TT.KIIR).bind((token) =>
	parseExpression.map((expr) => mkToken(token, ASTTag.PRINT, { expr })),
);

const comp =
	parseExpression
		.sepBy(Parser.matchT(TT.COMMA))
		.parens()

const parseReturn: P<Return> = Parser.matchT(TT.VISSZA).bind((token) =>
	Parser.or(comp, parseExpression)
		.map((expr) => mkToken(token, ASTTag.RETURN, { expr })),
);

//#region While

const parseNormalWhile = Parser.do()
	.bindT("token", TT.CIKLUS)
	.ignoreT(TT.AMIG)
	.bind("predicate", parseExpression)
	.bind("body", parseBlock)
	.ignoreT(TT.CIKLUS)
	.ignoreT(TT.VEGE)
	.finalize({ postPred: false });

const parseDoWhile = Parser.do()
	.bindT("token", TT.CIKLUS)
	.bind("body", parseBlock)
	.ignoreT(TT.AMIG)
	.bind("predicate", parseExpression)
	.finalize({ postPred: true });

export const parseWhile: P<While> = parseDoWhile
	.or(parseNormalWhile)
	.map((value) => mkToken(value.token, ASTTag.WHILE, value));

//#endregion
