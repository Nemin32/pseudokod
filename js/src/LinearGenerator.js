import PseudoCodeVisitor from "./libs/PseudoCodeVisitor.js";

export class LinearGenerator extends PseudoCodeVisitor {
    output = []

    createOp(opcode, payload = null) {
        this.output.push({
            opcode,
            payload
        })
    }

    constructor() {
        super()
    }

    visitProgram(ctx) {
        super.visitChildren(ctx)

        // console.log(this.output)
    }

    visitDebugPrintStatement(ctx) {
        this.visit(ctx.expression())
        this.createOp("print")
    }

    visitSimpleIfStatement(ctx) {
        this.visit(ctx.expression())

        this.createOp("if")

        this.visit(ctx.body())

        this.createOp("endIf")
    }

    visitIfElseStatement(ctx) {
        this.visit(ctx.expression())

        this.createOp("if")

        this.visit(ctx.body())

        this.createOp("jmp", "endIf")

        this.visit(ctx.elseBranch())

        this.createOp("endIf")
    }

    visitElseBranch(ctx) {
        this.createOp("else")

        this.visit(ctx.body())
    }

    visitIfElseIfStatement(ctx) {
        this.visit(ctx.expression())

        this.createOp("if")

        this.visit(ctx.body())

        this.createOp("jmp", "endIf")

        const elIfBranches = ctx.elseIfBranch();

        elIfBranches.forEach(branch => {
            this.visit(branch);
        })

        this.visit(ctx.elseBranch())

        this.createOp("endIf")
    }

    visitElseIfBranch(ctx) {
        this.visit(ctx.expression())

        this.createOp("elIf")

        this.visit(ctx.body())

        this.createOp("jmp", "endIf")
    }

    visitComparisonExpression(ctx) {
        const comparer = ctx.COMPARISON().getText();

        this.visit(ctx.expression(1))
        this.visit(ctx.expression(0))

        this.createOp("compare", comparer)
    }

    visitCalculationExpression(ctx) {
        const operator = ctx.OPERATOR().getText()

        this.visit(ctx.expression(1))
        this.visit(ctx.expression(0))

        this.createOp("calculate", operator)
    }

    visitVariable(ctx) {
        const varname = ctx.getText()
        this.createOp("pushVar", varname)
    }

    visitAssignmentStatement(ctx) {
        const varname = ctx.variable().getText()

        this.visit(ctx.expression())
        this.createOp("assign", varname)
    }

    visitNumber(ctx) {
        const num = Number(ctx.getText())
        this.createOp("push", num)
    }

    visitBool(ctx) {
        const bool = ctx.getText().toLowerCase() == "igaz";
        this.createOp("push", bool)
    }

    visitString(ctx) {
        const str = String(ctx.getText().replaceAll("\"", ""))
        this.createOp("push", str)
    }
}

export class LinearExecutor {
    ip = 0;

    /** @type {Array<{opcode: String}>} */
    instructions = []

    stack = []

    variables = new Map();

    /**
     * Initializes a new execution context.
     * @param {Array<{opcode: String}>} instructions The list of instructions to execute.
     */
    constructor(instructions, outputFunc = console.log) {
        this.instructions = instructions
        this.outputFunc = outputFunc
    }

    currentOpcode() {
        return this.instructions[this.ip].opcode
    }

    skipTo(opcodes) {
        while (!opcodes.includes(this.currentOpcode())) {
            this.ip++;
        }
    }

    skipBack(opcodes) {
        while (!opcodes.includes(this.currentOpcode())) {
            this.ip--;
        }
    }

    execute(instruction) {
        const { opcode, payload } = instruction;

        // console.log(instruction.opcode)
        switch (opcode) {
            case "print":
                this.outputFunc(this.stack.pop())
                break;

            case "push":
                this.stack.push(payload)
                break;

            case "compare":
                {
                    const exp1 = this.stack.pop()
                    const exp2 = this.stack.pop()

                    switch (payload) {
                        case "=": this.stack.push(exp1 === exp2); break;
                        case "=/=": this.stack.push(exp1 !== exp2); break;
                        case ">": this.stack.push(exp1 > exp2); break;
                        case "<": this.stack.push(exp1 < exp2); break;
                        case ">=": this.stack.push(exp1 >= exp2); break;
                        case "<=": this.stack.push(exp1 <= exp2); break;
                        default: this.stack.push(false)
                    }
                }
                break;

            case "calculate":
                {
                    const exp1 = this.stack.pop()
                    const exp2 = this.stack.pop()

                    switch (payload) {
                        case "+": this.stack.push(exp1 + exp2); break;
                        case "-": this.stack.push(exp1 - exp2); break;
                        case "*": this.stack.push(exp1 * exp2); break;
                        case "/": this.stack.push(exp1 / exp2); break;
                        case "mod": this.stack.push(exp1 % exp2); break;
                        default: this.stack.push(false)
                    }
                }
                break;

            case "jmp":
                this.skipTo([payload])
                break;

            case "if":
            case "elIf":
                const isIf = opcode == "if";
                const enter = this.stack.pop()

                if (!enter) {
                    this.skipTo(["else", "elIf", "endIf"])

                    if (isIf && this.instructions[this.ip].opcode == "elIf") {
                        this.skipBack(["jmp"])
                    }
                }
                break;

            case "else":
                this.skipTo(["endif"])
                break;

            case "assign":
                this.variables.set(payload, this.stack.pop());
                break;

            case "pushVar":
                this.stack.push(this.variables.get(payload))
                break;

        }
    }

    step() {
        const current_instruction = this.instructions[this.ip];
        this.execute(current_instruction)
        this.ip++;
    }

    run() {
        while (this.ip < this.instructions.length) {
            this.step()
        }
    }
}