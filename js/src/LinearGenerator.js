import PseudoCodeVisitor from "./libs/PseudoCodeVisitor.js";
import { Stack, Value, TYPES } from "./Stack.js";

export class LinearGenerator extends PseudoCodeVisitor {
    output = {
        code: [],
        parameterTypes: new Map()
    }

    createOp(opcode, payload = null) {
        this.output.code.push({
            opcode,
            payload
        })
    }

    constructor() {
        super()
    }

    /*
    visitProgram(ctx) {
        super.visitChildren(ctx)

        // console.log(this.output)
    }*/

    visitFunctionCall(ctx) {
        const fName = ctx.functionName().getText();

        this.visit(ctx.parameters())

        this.createOp("functionCall", fName)
    }

    visitParameterWithType(ctx) {
        return {
            name: ctx.variable().getText(),
            reference: ctx.CIMSZERINT() !== null,
            type: ctx.type().getText()
        };
    }

    visitFunctionDeclarationWithParameters(ctx) {
        const fName = ctx.functionName().getText();
        const params = ctx.parameterWithType().map(p => this.visit(p))

        this.output.parameterTypes.set(fName, params);

        this.createOp("functionDef", fName)

        this.visit(ctx.body())

        this.createOp("functionEnd", fName);
    }

    visitFunctionDeclarationWithoutParameters(ctx) {
        const fName = ctx.functionName().getText();

        this.createOp("functionDef", fName);

        this.visit(ctx.body())

        this.createOp("functionEnd", fName);
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

    depth = 0;
    visitWhileStatement(ctx) {
        this.createOp("while_prep", ++this.depth)

        this.visit(ctx.expression());

        this.createOp("while", this.depth)

        this.visit(ctx.body())

        this.createOp("loop", this.depth--)

    }

    visitComparisonExpression(ctx) {
        const comparer = ctx.COMPARISON().getText();

        this.visit(ctx.expression(0))
        this.visit(ctx.expression(1))

        this.createOp("compare", comparer)
    }

    visitCalculationExpression(ctx) {
        const operator = ctx.OPERATOR().getText()

        this.visit(ctx.expression(0))
        this.visit(ctx.expression(1))

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

    ipStack = []

    /** @type {Array<{opcode: String}>} */
    instructions = []

    stack = []

    /*
    /** @type {Map<string, string | number | boolean>}
    variables = new Map();
    */

    variables = new Stack()

    /** @type {Map<string, Array<{name: string, reference: boolean, type: string}>>} */
    parameterTypes = null;

    /**
     * Initializes a new execution context.
     * @param {Array<{opcode: String}>} instructions The list of instructions to execute.
     */
    constructor(environment, outputFunc = console.log) {
        this.instructions = environment.code
        this.parameterTypes = environment.parameterTypes
        this.outputFunc = outputFunc
    }

    currentOpcode() {
        return this.instructions[this.ip].opcode
    }

    currentPayload() {
        return this.instructions[this.ip].payload
    }

    #skip(opcodes, payload, direction, full = false) {
        if (full) {
            this.ip = 0;
        }

        const checkPayload = () => (payload == null) ? false : (this.currentPayload() != payload);
        const checkOpcode = (Array.isArray(opcodes))
            ? () => !opcodes.includes(this.currentOpcode())
            : () => this.currentOpcode() != opcodes;

        while (checkOpcode() || checkPayload()) {
            this.ip += direction;
        }
    }

    fullSeek(opcode, payload) {
        this.#skip(opcode, payload, 1, true)
    }

    skipTo(opcodes, payload) {
        this.#skip(opcodes, payload, 1)
    }

    skipBack(opcodes, payload) {
        this.#skip(opcodes, payload, -1)
    }

    execute(instruction) {
        const { opcode, payload } = instruction;

        // console.log(instruction.opcode)
        switch (opcode) {
            case "print":
                this.outputFunc(this.stack.pop()?.value)
                break;

            case "push":
                this.stack.push(new Value(payload, null))
                break;

            case "compare":
                {
                    const exp2 = this.stack.pop().safe_get(TYPES.number)
                    const exp1 = this.stack.pop().safe_get(TYPES.number)

                    this.stack.push(new Value((() => {
                        switch (payload) {
                            case "=": return exp1 === exp2
                            case "=/=": return exp1 !== exp2
                            case ">": return exp1 > exp2
                            case "<": return exp1 < exp2
                            case ">=": return exp1 >= exp2
                            case "<=": return exp1 <= exp2
                            default: return false
                        }
                    })(), TYPES.boolean))
                }
                break;

            case "calculate":
                {
                    const exp2 = this.stack.pop().safe_get(TYPES.number)
                    const exp1 = this.stack.pop().safe_get(TYPES.number)

                    this.stack.push(new Value((() => {
                        switch (payload) {
                            case "+": return exp1 + exp2;
                            case "-": return exp1 - exp2;
                            case "*": return exp1 * exp2;
                            case "/": return exp1 / exp2;
                            case "mod": return exp1 % exp2;
                            default: return 0;
                        }
                    })(), TYPES.number))
                }
                break;

            case "jmp":
                this.skipTo([payload])
                this.ip--;
                break;

            case "if":
            case "elIf":
                const isIf = opcode == "if";
                const enter = this.stack.pop().safe_get(TYPES.boolean)

                if (!enter) {
                    // To handle elIf
                    if (!isIf) {
                        this.ip++
                    }

                    this.skipTo(["else", "elIf", "endIf"])

                    if (isIf && this.instructions[this.ip].opcode == "elIf") {
                        this.skipBack(["jmp"])
                    }
                }

                this.variables.enterBasicScope()
                break;

            case "else":
                this.skipTo(["endIf"])
                break;

            case "endIf":
                this.variables.leaveBasicScope()
                break;

            case "while":
                const should = this.stack.pop().safe_get(TYPES.boolean)

                if (!should) {
                    this.skipTo("loop", payload)
                }
                break;

            case "loop":
                this.skipBack("while_prep", payload);
                break;

            case "functionDef":
                this.skipTo("functionEnd", payload)
                break;

            case "functionEnd":
                this.ip = this.ipStack.pop()
                this.variables.leaveBasicScope()
                break;

            case "functionCall":
                this.ipStack.push(this.ip)

                this.variables.enterBasicScope(true)

                const parameters = this.parameterTypes.get(payload).reverse();

                for (let paramType of parameters) {
                    this.variables.set(paramType.name, this.stack.pop())
                }

                this.fullSeek("functionDef", payload);
                break;

            case "assign":
                const val = this.stack.pop()
                this.variables.set(payload, val.clone());
                break;

            case "pushVar":
                this.stack.push(this.variables.get(payload))
                break;

        }
    }

    step() {
        if (this.ip < this.instructions.length) {
            const current_instruction = this.instructions[this.ip];
            this.execute(current_instruction)
            this.ip++;
        }
    }

    run() {
        while (this.ip < this.instructions.length) {
            this.step()
        }
    }

    reset() {
        this.variables = []
        this.stack = []
        this.ip = 0;
    }
}