import { OpCode as OC } from "../interfaces/ICompiler.ts";
import { ASTKind, ArrayComprehension, ArrayIndex, Assignment, Atom, BinOpType, BinaryOperation, Block, Debug, Expression, For, FunctionCall, FunctionDeclaration, If, NewArray, Not, Parameter, Print, Reference, Return, Statement, Swap, Variable, While } from "../interfaces/astkinds.ts";
import { Inst } from "../interfaces/instructions.ts";
import { parseBlock } from "./parser/ast_parser.ts";
import { t } from "./parser/test.ts";
import { Variables } from "./variables.ts";

class Compiler {
	code: Inst[] = [];
	counter = 0;

	addOp<T extends Inst>(op: T["code"], args: Omit<T, "code">) {
		this.code.push({ code: op, ...args } as Inst);
	}

	setVariable(variable: Variable | ArrayIndex) {
		if (variable.tag === "variable") {
			this.addOp(OC.SETVAR, { name: variable.name })
		} else {
			variable.index.forEach(e => this.visitExpression(e))
			this.addOp(OC.SETARR, { name: variable.variable.name, dimensions: variable.index.length })
		}
	}

	visitAtom(ast: Atom) {
		this.addOp(OC.PUSH, { value: ast.value });
	}

	visitBinop(ast: BinaryOperation) {
		this.visitExpression(ast.lhs);
		this.visitExpression(ast.rhs);
		this.addOp(OC.BINOP, { type: ast.op });
	}

	visitVariable(ast: Variable) {
		this.addOp(OC.GETVAR, { name: ast.name })
	}

	visitReference(ast: Reference) {
		if (ast.inner.tag == "variable") {
			this.addOp(OC.ADDRESS, { name: ast.inner.name })
		} else {
			ast.inner.index.forEach(e => this.visitExpression(e))
			this.addOp(OC.ARRADDR, { name: ast.inner.variable.name, dimensions: ast.inner.index.length })
		}
	}

	visitNot(ast: Not) {
		this.visitExpression(ast.expr);
		this.addOp(OC.NOT, {});
	}

	visitArrcomp(ast: ArrayComprehension) {
		ast.expressions.forEach(e => this.visitExpression(e))
		this.addOp(OC.ARRCMP, { name: ast.variable.name, length: ast.expressions.length })
	}

	visitArrindex(ast: ArrayIndex) {
		ast.index.forEach(e => this.visitExpression(e))
		this.addOp(OC.GETARR, { name: ast.variable.name, dimensions: ast.index.length })
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
				this.addOp(OC.PUSH, { value: arg.lexeme })
			}
		})

		this.addOp(OC.CALL, { name: ast.name })
	}

	visitArrnew(ast: NewArray) {
		ast.dimensions.forEach(e => this.visitExpression(e))
		this.addOp(OC.MKARR, { name: ast.variable.name, numDimensions: ast.dimensions.length })
	}

	visitExpression(ast: Expression) {
		switch (ast.tag) {
			case "atom": return this.visitAtom(ast)
			case "binop": return this.visitBinop(ast)
			case "variable": return this.visitVariable(ast)
			case "reference": return this.visitReference(ast)
			case "not": return this.visitNot(ast)
			case "arrindex": return this.visitArrindex(ast)
			case "funccall": return this.visitFunccall(ast)
		}
	}

	visitBlock(ast: Block) {
		this.addOp(OC.ESCOPE, { isFun: false })
		ast.statements.forEach(s => this.visitStatement(s));
		this.addOp(OC.LSCOPE, {})
	}

	visitPrint(ast: Print) {
		this.visitExpression(ast.expr)
		this.addOp(OC.PRINT, {});
	}

	visitReturn(ast: Return) {
		this.visitExpression(ast.expr)
		this.addOp(OC.RETURN, {});
	}

	visitDebug(ast: Debug) {
		this.addOp(OC.DEBUG, { msg: ast.msg ?? "DBG" });
	}

	visitIf(ast: If) {
		let counter = this.counter++;
		let branch_count = 0;
		const endLabel = `if_${counter}_end`;

		const visitBranch = (branch: If["main_path"]) => {
			const label = `if_${counter}_fail_${branch_count}`

			// Ha predikátum hamis -> ugrunk label-re...
			this.visitExpression(branch.pred)
			this.addOp(OC.FJMP, { label })
			// Ha viszont igaz, a fentebbi ugrás nem fut le és belépünk ebbe az ágba...
			this.visitBlock(branch.branch);
			// Majd ugrunk az if végére, hisz a többi ág ekkor nem érdekel már minket...
			this.addOp(OC.JMP, { label: endLabel })
			// Hamis predikátum esetén ide ugrunk és lépünk a következő ágra, (ha van ilyen egyáltalán)
			this.addOp(OC.LABEL, { name: label })
			branch_count++;
		}

		// ha EXPR akkor BLOCK
		visitBranch(ast.main_path);
		// különben ha EXPR akkor BLOCK
		ast.elif_path.forEach(b => visitBranch(b))
		// különben BLOCK
		if (ast.false_path) this.visitBlock(ast.false_path);
		// Itt van az if legvége, ide ugrunk ha bármely ág lefutott.
		this.addOp(OC.LABEL, { name: endLabel })
	}

	visitWhile(ast: While) {
		const counter = this.counter++;
		const predLabel = `while_${counter}_pred`
		const endLabel = `while_${counter}_end`
		const bodyLabel = `while_${counter}_body`

		// Ha ez egy do-while, akkor átugorjuk az első predikátum vizsgálatot.
		if (ast.postPred) this.addOp(OC.JMP, { label: bodyLabel })
		// Különben pedig megvizsgáljuk a predikátumot és ha hamis, akkor ugrunk a while végére.
		this.addOp(OC.LABEL, { name: predLabel })
		this.visitExpression(ast.predicate)
		this.addOp(OC.FJMP, { label: endLabel })
		// Sikees pred esetén itt vannak a while-on belüli utasítások.
		this.addOp(OC.LABEL, { name: bodyLabel })
		this.visitBlock(ast.body)
		// Ha egyszer lefutott a kód ellenőrizzük, visszaugrunk a predikátumvizsgálatra.
		this.addOp(OC.JMP, { label: predLabel })
		this.addOp(OC.LABEL, { name: endLabel })
	}

	visitFor(ast: For) {
		const counter = this.counter++;
		const predLabel = `for_${counter}_pred`
		const endLabel = `for_${counter}_end`

		this.addOp(OC.ESCOPE, { isFun: false })
		// i = from
		this.visitExpression(ast.from)
		this.addOp(OC.SETVAR, { name: ast.variable.name })
		// i <= to
		this.addOp(OC.LABEL, { name: predLabel })
		this.addOp(OC.GETVAR, { name: ast.variable.name })
		this.visitExpression(ast.to)
		this.addOp(OC.BINOP, { type: BinOpType.LE })
		this.addOp(OC.FJMP, { label: endLabel })
		// { ... }
		this.visitBlock(ast.body)
		// i = i + 1
		this.addOp(OC.GETVAR, { name: ast.variable.name })
		this.addOp(OC.PUSH, { value: 1 })
		this.addOp(OC.BINOP, { type: BinOpType.ADD })
		this.addOp(OC.SETVAR, { name: ast.variable.name })
		// Vissza az elejére.
		this.addOp(OC.JMP, { label: predLabel })
		this.addOp(OC.LABEL, { name: endLabel })
		this.addOp(OC.LSCOPE, {})
	}

	visitAssign(ast: Assignment) {
		this.visitExpression(ast.value)
		this.setVariable(ast.variable)
	}

	visitFuncdecl(ast: FunctionDeclaration) {
		const endLabel = `${ast.name}_end`
		this.addOp(OC.JMP, { label: endLabel })
		// A label ahová ugrunk.
		this.addOp(OC.LABEL, { name: ast.name })
		// Új scope, hisz a változókat fel akarjuk majd takarítani.
		this.addOp(OC.ESCOPE, { isFun: true })

		// A függvényhívás dolga, hogy a paramétereket sorra a stackre tolja
		// Itt pedig ezeket poppoljuk le az MKREF és a SETVAR segítségével.
		ast.parameters.forEach(p => this.visitParam(p))

		// Végül lefuttatjuk a függvénytestet.
		this.visitBlock(ast.body)

		// És feltakarjtjuk a változókat
		// Itt az LSCOPE technikailag szükségtelen, hisz a return
		// ellátja a feladatát, azonban az átláthatóság és pedánsság 
		// kedvéért megtartjuk.
		this.addOp(OC.PUSH, { value: 0 })
		this.addOp(OC.RETURN, {})
		this.addOp(OC.LSCOPE, {})
		this.addOp(OC.LABEL, { name: endLabel })
	}

	visitSwap(ast: Swap) {
		this.addOp(OC.ESCOPE, { isFun: false })

		// temp <- from
		this.visitExpression(ast.var1)
		this.addOp(OC.SETVAR, { name: "temp" })

		// from <- to
		this.visitExpression(ast.var2)
		this.setVariable(ast.var1);

		// to <- temp
		this.addOp(OC.GETVAR, { name: "temp" });
		this.setVariable(ast.var2);

		this.addOp(OC.LSCOPE, {})
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
			case "funccall": { this.visitFunccall(ast); this.addOp(OC.VOID, {}); return; }
			case "arrnew": return this.visitArrnew(ast)
			case "arrcomp": return this.visitArrcomp(ast)
		}
	}

	visitParam(ast: Parameter) {
		const name = (typeof (ast.name) === "string") ? ast.name : ast.name.name;
		const op = ast.byRef ? OC.MKREF : OC.SETVAR;
		return this.addOp(op, { name })
	}

	visit(ast: ASTKind) {
		console.log(ast.tag)
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
	ipStack: number[] = [];
	stack: Atom["value"][] = [];
	idx = 0;
	jmpTable: Map<string, number> = new Map()

	vars = new Variables();

	constructor(private tape: Inst[]) {
		// build jmpTable
		for (let i = 0; i < this.tape.length; i++) {
			const inst = this.tape[i]
			if (inst.code === OC.LABEL) {
				const name = inst.name
				if (this.jmpTable.get(name) !== undefined) throw new Error(`Label "${name}" appears twice in code!`)
				this.jmpTable.set(name, i)
			}
		}

		console.log(this.jmpTable)
	}

	fetch(): Inst | null {
		if (this.idx < this.tape.length)
			return this.tape[this.idx];

		return null;
	}

	pop(): Atom["value"] {
		const val = this.stack.pop()
		if (val === undefined) throw new Error("Stack was empty!");
		return val;
	}

	popMany(n: number): Atom["value"][] {
		const values = [];

		for (let i = 0; i < n; i++) {
			values.push(this.pop())
		}

		return values.reverse()
	}

	push(val: Atom["value"]) {
		this.stack.push(val)
	}

	jmp(label: string): void {
		const addr = this.jmpTable.get(label)
		if (addr === undefined)
			throw new Error(`Can't find label "${label}"!`)

		this.idx = addr - 1;
	}

	step(inst: Inst) {
		switch (inst.code) {
			case OC.ADDRESS: {
				const { name } = inst
				const value = this.vars.getAddress(name)

				if (value === null) throw new Error(`${name} doesn't exist!`)
				this.push(value)
			} break;

			case OC.ARRADDR: {
				const indexes = this.popMany(inst.dimensions)

				if (!indexes.map(i => typeof i === "number").every(v => v))
					throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				this.push(this.vars.getArrayElemAddr(inst.name, indexes as number[]))
			} break;

			case OC.ARRCMP: {
				const elems = this.popMany(inst.length)
				this.vars.addArray(inst.name, elems)
			} break;

			case OC.BINOP: {
				const { type } = inst
				const second = this.pop()
				const first = this.pop()

				switch (type) {
					case BinOpType.ADD: this.push((first as number) + (second as number)); break;
					case BinOpType.SUB: this.push((first as number) - (second as number)); break;
					case BinOpType.MUL: this.push((first as number) * (second as number)); break;
					case BinOpType.DIV: this.push((first as number) / (second as number)); break;
					case BinOpType.MOD: this.push((first as number) % (second as number)); break;

					case BinOpType.EQ: this.push(first === second); break;
					case BinOpType.NEQ: this.push(first !== second); break;
					case BinOpType.LE: this.push(first <= second); break;
					case BinOpType.GE: this.push(first >= second); break;
					case BinOpType.LESS: this.push(first < second); break;
					case BinOpType.GREATER: this.push(first > second); break;

					case BinOpType.AND: this.push(first && second); break;
					case BinOpType.OR: this.push(first || second); break;
				}
			} break;

			case OC.CALL: {
				const { name } = inst
				this.ipStack.push(this.idx);
				this.jmp(name)
			} break;

			case OC.DEBUG: {
				this.idx++;
				return false;
			} // break;

			case OC.ESCOPE: {
				const { isFun } = inst
				this.vars.escope(isFun)
			} break;

			case OC.FJMP: {
				const { label } = inst
				if (this.pop() === false) {
					this.jmp(label)
				}
			} break;

			case OC.GETARR: {
				const indexes = this.popMany(inst.dimensions)

				if (!indexes.map(i => typeof i === "number").every(v => v))
					throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				this.push(this.vars.getArrayElem(inst.name, indexes as number[]))
			} break;

			case OC.GETVAR: {
				const { name } = inst
				const value = this.vars.getVariable(name)
				if (value === null) throw new Error(`${name} has no value!`);
				this.push(value)
			} break;

			case OC.JMP: {
				const { label } = inst
				this.jmp(label)
			} break;

			case OC.LABEL: { } break;

			case OC.LSCOPE: { this.vars.lscope(false) } break;

			case OC.MKARR: {
				const indexes = this.popMany(inst.numDimensions)

				if (!indexes.map(i => typeof i === "number").every(v => v))
					throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				this.vars.addEmptyArray(inst.name, indexes as number[])
			} break;

			case OC.MKREF: {
				const { name } = inst
				const pointer = this.pop()
				if (typeof pointer !== "number") throw new Error(`${name}: Expected address, got ${typeof pointer}`)
				this.vars.makeReference(name, pointer);
			} break;

			case OC.NOT: {
				this.push(!this.pop())
			} break;

			case OC.PRINT: {
				console.log(this.pop())
			} break;

			case OC.PUSH: {
				const { value } = inst
				this.push(value);
			} break;

			case OC.RETURN: {
				this.vars.lscope(true)
				const newIp = this.ipStack.pop()
				if (!newIp) throw new Error("IP Stack is empty.")
				this.idx = newIp
			} break;

			case OC.SETARR: {
				const indexes = this.popMany(inst.dimensions)
				if (!indexes.map(i => typeof i === "number").every(v => v)) throw new Error(`SETARR: Not all indexes are numbers! ([${indexes.join(", ")}])`)

				const value = this.pop()
				this.vars.setArrayElem(inst.name, indexes as number[], value)
			} break;

			case OC.SETVAR: {
				const { name } = inst
				this.vars.setVariable(name, this.pop())
			} break;

			case OC.VOID: { this.pop() } break;

		}

		this.idx++;
		return true;
	}

	run() {
		while (true) {
			const inst = this.fetch()
			if (!inst) return;

			//console.log(this.idx, OC[inst.code], inst.args)
			if (!this.step(inst)) return;

			//console.log(this.stack)
			//console.log(this.vars.variables.map(v => ({ n: v.name, v: this.vars.values[v.pointer] })))
			//console.log(this.vars.values)
		}
	}
}

/*
	
függvény LNKO(m : egész, n : egész)
	r <- m mod n
  
	ciklus amíg r =/= 0
		m <- n
		n <- r
		r <- m mod n  
		iklus vége
																												
	vissza n
függvény vége
	iír LNKO(15, 33)
 */

const block = parseBlock.run(t(`

függvény Setter(címszerint teszt : egész tömb)
teszt[3,3] <- 2
függvény vége

kecske <- TáblaLétrehoz(egész)[5, 5]

Setter(&kecske)

kiír kecske[3,3]

`))

function printCode(code: Inst[]) {
	const index = (i: number) => i.toString().padStart(3, " ")
	const lines: string[] = [];
	let indent = 0;

	for (let i = 0; i < code.length; i++) {
		const l = code[i]
		if (l.code === OC.LSCOPE) indent -= 2;

		const idx = index(i)
		const op = " ".repeat(indent) + OC[l.code]
		const args = Object.values(l).slice(1).join(" ")

		if (l.code === OC.ESCOPE) indent += 2;

		lines.push(`${idx}: ${op} ${args}`)
	}

	return lines
}

if (block.type === "match") {
	const comp = new Compiler();
	comp.visit(block.value)

	console.log(printCode(comp.code).join("\n"))


	const vm = new VM(comp.code)

	vm.vars.escope(true)
	vm.vars.addArray("teszt", [
		[1, 2, 3, 0],
		[4, 5, 6, 0],
		[7, 8, 9, 0]
	])

	vm.run()
	vm.vars.lscope(true)
}
