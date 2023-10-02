import { IByteCode, OpCode as OC } from "../interfaces/ICompiler.ts";
import { ASTKind, ArrayComprehension, ArrayIndex, Assignment, Atom, BinOpType, BinaryOperation, Block, Debug, Expression, For, FunctionCall, FunctionDeclaration, If, NewArray, Not, Parameter, Print, Reference, Return, Statement, Swap, Variable, While } from "../interfaces/astkinds.ts";

type Inst = { code: OC, args: Array<Atom["value"]> }

class Compiler {
	code: Inst[] = [];
	counter = 0;

	addOp(op: OC, args: Inst["args"]) {
		this.code.push({ code: op, args });
	}

	setVariable(variable: Variable | ArrayIndex) {
		if (variable.tag === "variable") {
			this.addOp(OC.SETVAR, [variable.name])
		} else {
			variable.index.forEach(this.visitExpression)
			this.addOp(OC.SETARR, [variable.variable.name, variable.index.length])
		}
	}

	visitAtom(ast: Atom) {
		this.addOp(OC.PUSH, [ast.value]);
	}

	visitBinop(ast: BinaryOperation) {
		this.visitExpression(ast.lhs);
		this.visitExpression(ast.rhs);
		this.addOp(OC.BINOP, [ast.op]);
	}

	visitVariable(ast: Variable) {
		this.addOp(OC.GETVAR, [ast.name])
	}

	visitReference(ast: Reference) {
		if (ast.inner.tag == "variable") {
			this.addOp(OC.ADDRESS, [ast.inner.name])
		} else {
			ast.inner.index.forEach(e => this.visitExpression(e))
			this.addOp(OC.ARRADDR, [ast.inner.variable.name, ast.inner.index.length])
		}
	}

	visitNot(ast: Not) {
		this.visitExpression(ast.expr);
		this.addOp(OC.NOT, []);
	}

	visitArrcomp(ast: ArrayComprehension) {
		ast.expressions.forEach(this.visitExpression)
		this.addOp(OC.ARRCMP, [ast.expressions.length])
	}

	visitArrindex(ast: ArrayIndex) {
		ast.index.forEach(this.visitExpression)
		this.addOp(OC.GETARR, [ast.variable.name, ast.index.length])
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
				this.addOp(OC.PUSH, [arg.lexeme])
			}
		})

		this.addOp(OC.CALL, [ast.name])
	}

	visitArrnew(ast: NewArray) {
		ast.dimensions.forEach(this.visitExpression)
		this.addOp(OC.MKARR, [ast.dimensions.length])
	}

	visitExpression(ast: Expression) {
		switch (ast.tag) {
			case "atom": return this.visitAtom(ast)
			case "binop": return this.visitBinop(ast)
			case "variable": return this.visitVariable(ast)
			case "reference": return this.visitReference(ast)
			case "not": return this.visitNot(ast)
			case "arrcomp": return this.visitArrcomp(ast)
			case "arrindex": return this.visitArrindex(ast)
			case "funccall": return this.visitFunccall(ast)
			case "arrnew": return this.visitArrnew(ast)
		}
	}

	visitBlock(ast: Block) {
		ast.statements.forEach(this.visitStatement);
	}

	visitPrint(ast: Print) {
		this.visitExpression(ast.expr)
		this.addOp(OC.PRINT, []);
	}

	visitReturn(ast: Return) {
		this.visitExpression(ast.expr)
		this.addOp(OC.RETURN, []);
	}

	visitDebug(ast: Debug) {
		this.addOp(OC.DEBUG, [ast.msg ?? "DBG"]);
	}

	visitIf(ast: If) {
		let counter = this.counter++;
		let branch_count = 0;
		const endLabel = `if_${counter}_end`;

		const visitBranch = (branch: If["main_path"]) => {
			const label = `if_${counter}_fail_${branch_count}`

			// Ha predikátum hamis -> ugrunk label-re...
			this.visitExpression(branch.pred)
			this.addOp(OC.FJMP, [label])
			// Ha viszont igaz, a fentebbi ugrás nem fut le és belépünk ebbe az ágba...
			this.visitBlock(branch.branch);
			// Majd ugrunk az if végére, hisz a többi ág ekkor nem érdekel már minket...
			this.addOp(OC.JMP, [endLabel])
			// Hamis predikátum esetén ide ugrunk és lépünk a következő ágra, (ha van ilyen egyáltalán)
			this.addOp(OC.LABEL, [label])
			branch_count++;
		}

		// ha EXPR akkor BLOCK
		visitBranch(ast.main_path);
		// különben ha EXPR akkor BLOCK
		ast.elif_path.forEach(visitBranch)
		// különben BLOCK
		if (ast.false_path) this.visitBlock(ast.false_path);
		// Itt van az if legvége, ide ugrunk ha bármely ág lefutott.
		this.addOp(OC.LABEL, [endLabel])
	}

	visitWhile(ast: While) {
		const counter = this.counter++;
		const predLabel = `while_${counter}_pred`
		const endLabel = `while_${counter}_end`
		const bodyLabel = `while_${counter}_body`

		// Ha ez egy do-while, akkor átugorjuk az első predikátum vizsgálatot.
		if (ast.postPred) this.addOp(OC.JMP, [bodyLabel])
		// Különben pedig megvizsgáljuk a predikátumot és ha hamis, akkor ugrunk a while végére.
		this.addOp(OC.LABEL, [predLabel])
		this.visitExpression(ast.predicate)
		this.addOp(OC.FJMP, [endLabel])
		// Sikees pred esetén itt vannak a while-on belüli utasítások.
		this.addOp(OC.LABEL, [bodyLabel])
		this.visitBlock(ast.body)
		// Ha egyszer lefutott a kód ellenőrizzük, visszaugrunk a predikátumvizsgálatra.
		this.addOp(OC.JMP, [predLabel])
		this.addOp(OC.LABEL, [endLabel])
	}

	visitFor(ast: For) {
		const counter = this.counter++;
		const predLabel = `for_${counter}_pred`
		const endLabel = `for_${counter}_end`

		this.addOp(OC.ESCOPE, [])
		// i = from
		this.visitExpression(ast.from)
		this.addOp(OC.SETVAR, [ast.variable.name])
		// i <= to
		this.addOp(OC.LABEL, [predLabel])
		this.addOp(OC.GETVAR, [ast.variable.name])
		this.visitExpression(ast.to)
		this.addOp(OC.BINOP, [BinOpType.LE])
		this.addOp(OC.FJMP, [endLabel])
		// { ... }
		this.visitBlock(ast.body)
		// i = i + 1
		this.addOp(OC.GETVAR, [ast.variable.name])
		this.addOp(OC.PUSH, [1])
		this.addOp(OC.BINOP, [BinOpType.ADD])
		this.addOp(OC.SETVAR, [ast.variable.name])
		// Vissza az elejére.
		this.addOp(OC.JMP, [predLabel])
		this.addOp(OC.LABEL, [endLabel])
		this.addOp(OC.LSCOPE, [])
	}

	visitAssign(ast: Assignment) {
		this.visitExpression(ast.value)
		this.setVariable(ast.variable)
	}

	visitFuncdecl(ast: FunctionDeclaration) {
		// A label ahová ugrunk.
		this.addOp(OC.LABEL, [ast.name])
		// Új scope, hisz a változókat fel akarjuk majd takarítani.
		this.addOp(OC.ESCOPE, [])

		// A függvényhívás dolga, hogy a paramétereket sorra a stackre tolja
		// Itt pedig ezeket poppoljuk le az MKREF és a SETVAR segítségével.
		ast.parameters.forEach(this.visitParam)

		// Végül lefuttatjuk a függvénytestet.
		this.visitBlock(ast.body)

		// És feltakarjtjuk a változókat
		this.addOp(OC.LSCOPE, [])
	}

	visitSwap(ast: Swap) {
		this.addOp(OC.ESCOPE, [])

		// temp <- from
		this.visitExpression(ast.var1)
		this.addOp(OC.SETVAR, ["temp"])

		// from <- to
		this.visitExpression(ast.var2)
		this.setVariable(ast.var1);

		// to <- temp
		this.addOp(OC.GETVAR, ["temp"]);
		this.setVariable(ast.var2);

		this.addOp(OC.LSCOPE, [])
	}

	visitStatement(ast: Statement) {
		switch (ast.tag) {
			case "block": return this.visitBlock(ast)
			case "if": return this.visitIf(ast)
			case "assign": return this.visitAssign(ast)
			case "while": return this.visitWhile(ast)
			case "for": return this.visitFor(ast)
			case "print": return this.visitPrint(ast)
			case "return": return this.visitReturn(ast)
			case "funcdecl": return this.visitFuncdecl(ast)
			case "debug": return this.visitDebug(ast)
			case "swap": return this.visitSwap(ast)
		}
	}

	visitParam(ast: Parameter) {
		const name = (typeof (ast.name) === "string") ? ast.name : ast.name.name;
		const op = ast.byRef ? OC.MKREF : OC.SETVAR;
		return this.addOp(op, [name])
	}

	visit(ast: ASTKind) {
		switch (ast.tag) {
			case "atom": return this.visitAtom(ast)
			case "binop": return this.visitBinop(ast)
			case "variable": return this.visitVariable(ast)
			case "reference": return this.visitReference(ast)
			case "not": return this.visitNot(ast)
			case "arrcomp": return this.visitArrcomp(ast)
			case "arrindex": return this.visitArrindex(ast)
			case "funccall": return this.visitFunccall(ast)
			case "arrnew": return this.visitArrnew(ast)
			case "block": return this.visitBlock(ast)
			case "if": return this.visitIf(ast)
			case "assign": return this.visitAssign(ast)
			case "while": return this.visitWhile(ast)
			case "for": return this.visitFor(ast)
			case "print": return this.visitPrint(ast)
			case "return": return this.visitReturn(ast)
			case "funcdecl": return this.visitFuncdecl(ast)
			case "debug": return this.visitDebug(ast)
			case "swap": return this.visitSwap(ast)
			case "param": return this.visitParam(ast)
		}
	}
}

class VM {
}
