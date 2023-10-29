import {
	ASTKind,
	ASTTag,
	Atom,
	AtomValue,
	BinOpType,
	BinaryOperation,
	Block,
	Expression,
	If,
	Print,
	Statement,
} from "../interfaces/astkinds.ts";
import { LOGIC, NUMBER, SimpleType } from "../interfaces/types.ts";

function optimizeBinOp(value: BinaryOperation): BinaryOperation | Atom {
	const mkAtom = (aval: Atom["value"], type: SimpleType): Atom => ({
		token: value.token,
		tag: ASTTag.ATOM, value: aval,
		type
	});

	const [lhsE, rhsE] = [optimizeExpr(value.lhs), optimizeExpr(value.rhs)];
	if (lhsE.tag === ASTTag.ATOM && rhsE.tag === ASTTag.ATOM) {
		const [lhs, rhs] = [lhsE.value, rhsE.value];

		switch (value.op) {
			case BinOpType.ADD:
				return mkAtom(Number(lhs) + Number(rhs), NUMBER);
			case BinOpType.SUB:
				return mkAtom(Number(lhs) - Number(rhs), NUMBER);
			case BinOpType.MUL:
				return mkAtom(Number(lhs) * Number(rhs), NUMBER);
			case BinOpType.DIV:
				return mkAtom(Number(lhs) / Number(rhs), NUMBER);
			case BinOpType.MOD:
				return mkAtom(Number(lhs) % Number(rhs), NUMBER);
			case BinOpType.EQ:
				return mkAtom(lhs === rhs, LOGIC);
			case BinOpType.NEQ:
				return mkAtom(lhs !== rhs, LOGIC);
			case BinOpType.LE:
				return mkAtom(lhs <= rhs, LOGIC);
			case BinOpType.GE:
				return mkAtom(lhs >= rhs, LOGIC);
			case BinOpType.LESS:
				return mkAtom(lhs < rhs, LOGIC);
			case BinOpType.MORE:
				return mkAtom(lhs > rhs, LOGIC);
			case BinOpType.AND:
				return mkAtom(Boolean(lhs) && Boolean(rhs), LOGIC);
			case BinOpType.OR:
				return mkAtom(Boolean(lhs) || Boolean(rhs), LOGIC);
		}
	}

	return { ...value, lhs: lhsE, rhs: rhsE };
}

function optimizePrint(print: Print): Print {
	return {
		token: print.token,
		tag: ASTTag.PRINT,
		expr: optimizeExpr(print.expr),
	};
}

function optimizeExpr(expr: Expression): Expression {
	if (expr.tag === ASTTag.BINOP) return optimizeBinOp(expr as BinaryOperation);

	return expr;
}

function optimizeStatement(statement: Statement): Statement | Block | null {
	if (statement.tag === ASTTag.IF) {
		return optimizeIf(statement as If);
	}

	if (statement.tag === ASTTag.PRINT) {
		return optimizePrint(statement as Print);
	}

	return statement;
}

function optimizeStatements(stmts: Statement[]): Statement[] {
	return stmts.map((s) => optimizeStatement(s)).filter((e) => e !== null) as Exclude<
		ReturnType<typeof optimizeStatement>,
		null
	>[];
}

function optimizeIf(ifIAST: If): If | Block | null {
	function isAtomValue(expr: ASTKind, value: AtomValue) {
		return expr.tag === ASTTag.ATOM && expr.value === value;
	}

	const ifStatement = ifIAST;

	const main_path = {
		pred: optimizeExpr(ifStatement.main_path.pred),
		branch: optimizeBlock(ifStatement.main_path.branch),
	};

	// Ha az első if-ben már igaz a predikátum, akkor minden más lényegtelen.
	if (isAtomValue(main_path.pred, true)) {
		return main_path.branch;
	}

	const false_path = ifStatement.false_path ? optimizeBlock(ifStatement.false_path) : null;

	const elif_path = ifStatement.elif_path
		.filter((elif) => !isAtomValue(optimizeExpr(elif.pred), false))
		.map((elif) => ({ pred: optimizeExpr(elif.pred), branch: optimizeBlock(elif.branch) }));

	// Ha viszont hamis...
	if (isAtomValue(main_path.pred, false)) {
		// és nincs elif...
		if (elif_path.length === 0) {
			// akkor visszatérünk a hamis ággal (ami lehet null is),
			return false_path;
		} else {
			// Ha van elif, akkor pedig az első elifből lesz az első if és a maradékból pedig az elifek.
			return {
				...ifIAST,
				main_path: elif_path[0],
				elif_path: elif_path.slice(1),
				false_path,
			};
		}
	}

	// Végül, ha nem tudunk mit mondani a fő ág predikátumáról, akkor csak simán visszatérünk a kioptimalizált iffel.
	return {
		...ifIAST,
		main_path,
		elif_path,
		false_path,
	};
}

export function optimizeBlock(block: Block): Block {
	return {
		tag: ASTTag.BLOCK,
		token: block.token,
		statements: optimizeStatements(block.statements),
	};
}
