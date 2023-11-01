import { OpCode as OC } from "../interfaces/ICompiler.ts";
import { ASTKind, ASTTag, ArrayComprehension, ArrayIndex, Assignment, Atom, BinOpType, BinaryOperation, Block, Debug, Expression, For, FunctionCall, FunctionDeclaration, If, NewArray, Not, Parameter, Print, Reference, Return, Statement, Swap, Variable, While } from "../interfaces/astkinds.ts";
import { Inst } from "../interfaces/instructions.ts";

type DistributiveOmit<T, K extends keyof any> = T extends any
	? Omit<T, K>
	: never;

export class Compiler {
	code: Inst[] = [];
	counter = 0;

	addOp<T extends Inst>(op: T["code"], args: DistributiveOmit<T, "code" | "origin">, origin: ASTKind) {
		this.code.push({ code: op, ...args, origin } as Inst);
	}

	setVariable(variable: Variable | ArrayIndex) {
		if (variable.tag === ASTTag.VARIABLE) {
			this.addOp(OC.SETVAR, { name: variable.name }, variable)
		} else {
			variable.index.forEach(e => this.visitExpression(e))
			this.addOp(OC.SETARR, { name: variable.variable.name, dimensions: variable.index.length }, variable)
		}
	}

	visitAtom(ast: Atom) {
		this.addOp(OC.PUSH, { value: ast.value }, ast);
	}

	visitBinop(ast: BinaryOperation) {
		this.visitExpression(ast.lhs);
		this.visitExpression(ast.rhs);
		this.addOp(OC.BINOP, { type: ast.op }, ast);
	}

	visitVariable(ast: Variable) {
		this.addOp(OC.GETVAR, { name: ast.name }, ast)
	}

	visitReference(ast: Reference) {
		if (ast.inner.tag == ASTTag.VARIABLE) {
			this.addOp(OC.ADDRESS, { name: ast.inner.name }, ast)
		} else {
			ast.inner.index.forEach(e => this.visitExpression(e))
			this.addOp(OC.ARRADDR, { name: ast.inner.variable.name, dimensions: ast.inner.index.length }, ast)
		}
	}

	visitNot(ast: Not) {
		this.visitExpression(ast.expr);
		this.addOp(OC.NOT, {}, ast);
	}

	visitArrcomp(ast: ArrayComprehension) {
		ast.expressions.forEach(e => this.visitExpression(e))

		if ("variable" in ast.variable) {
			ast.variable.index.forEach(e => this.visitExpression(e))
			this.addOp(OC.ARRCMP, { name: ast.variable.variable.name, dimensions: ast.variable.index.length, length: ast.expressions.length }, ast)
		} else {
			this.addOp(OC.COMPRE, { name: ast.variable.name, length: ast.expressions.length }, ast)
		}
	}

	visitArrindex(ast: ArrayIndex) {
		ast.index.forEach(e => this.visitExpression(e))
		this.addOp(OC.GETARR, { name: ast.variable.name, dimensions: ast.index.length }, ast)
	}

	visitFunccall(ast: FunctionCall) {
		// Ha az argumentum egy sima kifejezés, akkor kiértékeljük és stackre nyomjuk.
		// Ha viszont függvénynév, akkor annak a nevét nyomjuk a stackre.
		// Függvényhívás esetén lookup => ha van ilyen változó akkor annak értékét hívjuk meg (CALL változók[P]),
		// ha nincs, akkor pedig a nevet magát értelmezzük függvénynévnek (CALL P).
		ast.arguments.forEach(arg => {
			if ("token" in arg) {
				this.visitExpression(arg)
			} else {
				this.addOp(OC.PUSH, { value: arg.lexeme }, ast)
			}
		})

		this.addOp(OC.CALL, { name: ast.name }, ast)
	}

	visitArrnew(ast: NewArray) {
		ast.dimensions.forEach(e => this.visitExpression(e))
		this.addOp(OC.MKARR, { name: ast.variable.name, numDimensions: ast.dimensions.length }, ast)
	}

	visitExpression(ast: Expression) {
		switch (ast.tag) {
			case ASTTag.ATOM: return this.visitAtom(ast)
			case ASTTag.BINOP: return this.visitBinop(ast)
			case ASTTag.VARIABLE: return this.visitVariable(ast)
			case ASTTag.REFERENCE: return this.visitReference(ast)
			case ASTTag.NOT: return this.visitNot(ast)
			case ASTTag.ARRINDEX: return this.visitArrindex(ast)
			case ASTTag.FUNCCALL: return this.visitFunccall(ast)
		}
	}

	visitBlock(ast: Block) {
		this.addOp(OC.ESCOPE, { isFun: false }, ast)
		ast.statements.forEach(s => this.visitStatement(s));
		this.addOp(OC.LSCOPE, {}, ast)
	}

	visitPrint(ast: Print) {
		this.visitExpression(ast.expr)
		this.addOp(OC.PRINT, {}, ast);
	}

	visitReturn(ast: Return) {
		if (Array.isArray(ast.expr)) {
			ast.expr.forEach(expr => this.visitExpression(expr))
			this.addOp(OC.RETCMP, { length: ast.expr.length }, ast);
		} else {
			this.visitExpression(ast.expr)
			this.addOp(OC.RETURN, {}, ast);
		}
	}

	visitDebug(ast: Debug) {
		this.addOp(OC.DEBUG, { msg: ast.msg ?? "DBG" }, ast);
	}

	visitIf(ast: If) {
		let counter = this.counter++;
		let branch_count = 0;
		const endLabel = `if_${counter}_end`;

		const visitBranch = (branch: If["main_path"]) => {
			const label = `if_${counter}_fail_${branch_count}`

			// Ha predikátum hamis -> ugrunk label-re...
			this.visitExpression(branch.pred)
			this.addOp(OC.FJMP, { label }, ast)
			// Ha viszont igaz, a fentebbi ugrás nem fut le és belépünk ebbe az ágba...
			this.visitBlock(branch.branch);
			// Majd ugrunk az if végére, hisz a többi ág ekkor nem érdekel már minket...
			this.addOp(OC.JMP, { label: endLabel }, ast)
			// Hamis predikátum esetén ide ugrunk és lépünk a következő ágra, (ha van ilyen egyáltalán)
			this.addOp(OC.LABEL, { name: label }, ast)
			branch_count++;
		}

		// ha EXPR akkor BLOCK
		visitBranch(ast.main_path);
		// különben ha EXPR akkor BLOCK
		ast.elif_path.forEach(b => visitBranch(b))
		// különben BLOCK
		if (ast.false_path) this.visitBlock(ast.false_path);
		// Itt van az if legvége, ide ugrunk ha bármely ág lefutott.
		this.addOp(OC.LABEL, { name: endLabel }, ast)
	}

	visitWhile(ast: While) {
		const counter = this.counter++;
		const predLabel = `while_${counter}_pred`
		const endLabel = `while_${counter}_end`
		const bodyLabel = `while_${counter}_body`

		// Ha ez egy do-while, akkor átugorjuk az első predikátum vizsgálatot.
		if (ast.postPred) this.addOp(OC.JMP, { label: bodyLabel }, ast)
		// Különben pedig megvizsgáljuk a predikátumot és ha hamis, akkor ugrunk a while végére.
		this.addOp(OC.LABEL, { name: predLabel }, ast)
		this.visitExpression(ast.predicate)
		this.addOp(OC.FJMP, { label: endLabel }, ast)
		// Sikees pred esetén itt vannak a while-on belüli utasítások.
		this.addOp(OC.LABEL, { name: bodyLabel }, ast)
		this.visitBlock(ast.body)
		// Ha egyszer lefutott a kód ellenőrizzük, visszaugrunk a predikátumvizsgálatra.
		this.addOp(OC.JMP, { label: predLabel }, ast)
		this.addOp(OC.LABEL, { name: endLabel }, ast)
	}

	visitFor(ast: For) {
		const counter = this.counter++;
		const predLabel = `for_${counter}_pred`
		const endLabel = `for_${counter}_end`

		this.addOp(OC.ESCOPE, { isFun: false }, ast)
		// i = from
		this.visitExpression(ast.from)
		this.addOp(OC.SETVAR, { name: ast.variable.name }, ast)
		// i <= to
		this.addOp(OC.LABEL, { name: predLabel }, ast)
		this.addOp(OC.GETVAR, { name: ast.variable.name }, ast)
		this.visitExpression(ast.to)
		this.addOp(OC.BINOP, { type: BinOpType.LE }, ast)
		this.addOp(OC.FJMP, { label: endLabel }, ast)
		// { ... }
		this.visitBlock(ast.body)
		// i = i + 1
		this.addOp(OC.GETVAR, { name: ast.variable.name }, ast)
		this.addOp(OC.PUSH, { value: 1 }, ast)
		this.addOp(OC.BINOP, { type: BinOpType.ADD }, ast)
		this.addOp(OC.SETVAR, { name: ast.variable.name }, ast)
		// Vissza az elejére.
		this.addOp(OC.JMP, { label: predLabel }, ast)
		this.addOp(OC.LABEL, { name: endLabel }, ast)
		this.addOp(OC.LSCOPE, {}, ast)
	}

	visitAssign(ast: Assignment) {
		this.visitExpression(ast.value)
		this.setVariable(ast.variable)
	}

	visitFuncdecl(ast: FunctionDeclaration) {
		const endLabel = `${ast.name}_end`
		this.addOp(OC.JMP, { label: endLabel }, ast)
		// A label ahová ugrunk.
		this.addOp(OC.LABEL, { name: ast.name }, ast)
		// Új scope, hisz a változókat fel akarjuk majd takarítani.
		this.addOp(OC.ESCOPE, { isFun: true }, ast)

		// A függvényhívás dolga, hogy a paramétereket sorra a stackre tolja
		// Itt pedig ezeket poppoljuk le az MKREF és a SETVAR segítségével.
		ast.parameters.forEach(p => this.visitParam(p))

		// Végül lefuttatjuk a függvénytestet.
		this.visitBlock(ast.body)

		// És feltakarjtjuk a változókat
		// Itt az LSCOPE technikailag szükségtelen, hisz a return
		// ellátja a feladatát, azonban az átláthatóság és pedánsság 
		// kedvéért megtartjuk.
		this.addOp(OC.PUSH, { value: 0 }, ast)
		this.addOp(OC.RETURN, {}, ast)
		this.addOp(OC.LSCOPE, {}, ast)
		this.addOp(OC.LABEL, { name: endLabel }, ast)
	}

	visitSwap(ast: Swap) {
		this.addOp(OC.ESCOPE, { isFun: false }, ast)

		// temp <- from
		this.visitExpression(ast.var1)
		this.addOp(OC.SETVAR, { name: "temp" }, ast)

		// from <- to
		this.visitExpression(ast.var2)
		this.setVariable(ast.var1);

		// to <- temp
		this.addOp(OC.GETVAR, { name: "temp" }, ast);
		this.setVariable(ast.var2);

		this.addOp(OC.LSCOPE, {}, ast)
	}

	visitStatement(ast: Statement) {
		switch (ast.tag) {
			case ASTTag.BLOCK: return this.visitBlock(ast)
			case ASTTag.IF: return this.visitIf(ast)
			case ASTTag.ASSIGN: return this.visitAssign(ast)
			case ASTTag.WHILE: return this.visitWhile(ast)
			case ASTTag.FOR: return this.visitFor(ast)
			case ASTTag.PRINT: return this.visitPrint(ast)
			case ASTTag.RETURN: return this.visitReturn(ast)
			case ASTTag.FUNCDECL: return this.visitFuncdecl(ast)
			case ASTTag.DEBUG: return this.visitDebug(ast)
			case ASTTag.SWAP: return this.visitSwap(ast)
			case ASTTag.FUNCCALL: { this.visitFunccall(ast); this.addOp(OC.VOID, {}, ast); return; }
			case ASTTag.NEWARRAY: return this.visitArrnew(ast)
			case ASTTag.ARRAYCOMP: return this.visitArrcomp(ast)
		}
	}

	visitParam(ast: Parameter) {
		const name = (typeof (ast.name) === "string") ? ast.name : ast.name.name;
		const op = ast.type.byRef ? OC.MKREF : OC.SETVAR;
		return this.addOp(op, { name }, ast)
	}

	visit(ast: ASTKind) {
		switch (ast.tag) {
			case ASTTag.ATOM: return this.visitAtom(ast)
			case ASTTag.BINOP: return this.visitBinop(ast)
			case ASTTag.VARIABLE: return this.visitVariable(ast)
			case ASTTag.REFERENCE: return this.visitReference(ast)
			case ASTTag.NOT: return this.visitNot(ast)
			case ASTTag.ARRAYCOMP: return this.visitArrcomp(ast)
			case ASTTag.ARRINDEX: return this.visitArrindex(ast)
			case ASTTag.FUNCCALL: return this.visitFunccall(ast)
			case ASTTag.NEWARRAY: return this.visitArrnew(ast)
			case ASTTag.BLOCK: return this.visitBlock(ast)
			case ASTTag.IF: return this.visitIf(ast)
			case ASTTag.ASSIGN: return this.visitAssign(ast)
			case ASTTag.WHILE: return this.visitWhile(ast)
			case ASTTag.FOR: return this.visitFor(ast)
			case ASTTag.PRINT: return this.visitPrint(ast)
			case ASTTag.RETURN: return this.visitReturn(ast)
			case ASTTag.FUNCDECL: return this.visitFuncdecl(ast)
			case ASTTag.DEBUG: return this.visitDebug(ast)
			case ASTTag.SWAP: return this.visitSwap(ast)
			case ASTTag.PARAMETER: return this.visitParam(ast)
		}
	}
}


