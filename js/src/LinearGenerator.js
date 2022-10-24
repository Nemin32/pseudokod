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

    /**
     * Creates a list of opcodes based on input and appends it to the resulting code.
     * @param {Array<[string, string?, string?]>} ops - The list of opcodes and payloads
     */
    _assemble(ctx, ops) {
        ops.forEach(([opcode, payload, maybe_arg]) => {
            switch (opcode) {
                case "VISIT":
                    let arg = Number.isNaN(Number(maybe_arg)) ? undefined : Number(maybe_arg);

                    if (ctx && ctx[payload]) {
                        const newCtx = ctx[payload](arg)

                        if (newCtx) {
                            this.visit(newCtx)
                        }
                    }
                    break;
                default:
                    this.createOp(opcode, payload);
                    break;
            }
        })
    }

    assemble(ctx, input) {
        const ops = input.split(/\n|;/).map(line => line.trim().split(" ")).filter(x => x[0] != "")
        this._assemble(ctx, ops)
    }

    constructor() {
        super()
    }

    visitMethodCallStatement(ctx) {
        this.visitFunctionCall(ctx)
    }

    visitReturnStatement(ctx) {
        this.assemble(ctx, `
            VISIT expression;
            ret
        `)
    }

    visitFunctionCall(ctx) {
        const fName = ctx.functionName().getText();

        this.assemble(ctx, `
            VISIT parameters; 
            functionCall ${fName}
        `)
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
        const params = ctx.parameterWithType().map(p => this.visitParameterWithType(p))
        this.output.parameterTypes.set(fName, params);

        this.assemble(ctx, `
            functionDef ${fName}; 
            VISIT body; 
            functionEnd ${fName}
        `)
    }

    visitFunctionDeclarationWithoutParameters(ctx) {
        const fName = ctx.functionName().getText();

        this.assemble(ctx, `
            functionDef ${fName}; 
            VISIT body; 
            functionEnd ${fName}
        `)
    }

    visitDebugPrintStatement(ctx) {
        this.assemble(ctx, `
            VISIT expression
            print
        `)
    }

    visitIfStatement(ctx) {
        this.assemble(ctx, `
            VISIT expression
            if
            VISIT body
            jmp endIf
            VISIT elseIfBranch
            VISIT elseBranch
            endIf
        `)
    }

    visitElseBranch(ctx) {
        this.assemble(ctx, `
            else
            VISIT body
        `)
    }

    visitElseIfBranch(ctx) {
        this.assemble(ctx, `
            VISIT expression
            elIf
            VISIT body
            jmp endIf
        `)
    }

    depth = 0;
    visitWhileStatement(ctx) {
        this.depth++;

        this.assemble(ctx, `
            whilePrep ${this.depth}
            VISIT expression
            while ${this.depth}
            VISIT body
            loop ${this.depth}
        `)

        this.depth--;
    }

    visitForStatement(ctx) {
        const varname = ctx.variable().getText();

        this.depth++

        this.assemble(ctx, `
            for
            VISIT expression 0
            assign ${varname}

            whilePrep ${this.depth}

            pushVar ${varname}
            VISIT expression 1
            compare <=

            while ${this.depth}
            VISIT body
        `)

        // FIXME: Make this more ergonomic.
        this.createOp("push", 1)

        this.assemble(ctx, `
            pushVar ${varname}
            calculate +
            assign ${varname}

            loop ${this.depth}

            forEnd
        `)

        this.depth--;

        /*
        this.createOp("for")

        // let varname = exp(0)
        this.visit(ctx.expression(0))
        this.createOp("assign", varname)

        // while (varname <= exp(1))
        this.createOp("whilePrep", ++this.depth);
        this.createOp("pushVar", varname)
        this.visit(ctx.expression(1))
        this.createOp("compare", "<=")
        this.createOp("while", this.depth)
        // {

        // statements...
        this.visit(ctx.body())

        // varname = varname + 1
        this.createOp("push", 1)
        this.createOp("pushVar", varname)
        this.createOp("calculate", "+")
        this.createOp("assign", varname)

        // }
        this.createOp("loop", this.depth--)

        this.createOp("forEnd")
        */
    }

    visitComparisonExpression(ctx) {
        const comparer = ctx.COMPARISON().getText();

        /*this.visit(ctx.expression(0))
        this.visit(ctx.expression(1))

        this.createOp("compare", comparer)*/

        this.assemble(ctx, `
            VISIT expression 0
            VISIT expression 1
            compare ${comparer}
        `)
    }

    visitCalculationExpression(ctx) {
        const operator = ctx.OPERATOR().getText()

        /*this.visit(ctx.expression(0))
        this.visit(ctx.expression(1))

        this.createOp("calculate", operator)*/

        this.assemble(ctx, `
            VISIT expression 0
            VISIT expression 1
            calculate ${operator}
        `)
    }

    visitArrayIndex(ctx) {
        /*
        // indexes
        const exps = ctx.expression();
        exps.forEach(exp => { this.visit(exp) })

        // array
        this.createOp("pushVar", varname)

        // index into array
        this.createOp("index", exps.length)
        */

        const varname = ctx.variable().getText()

        this.assemble(ctx, `
            VISIT expression
            pushVar ${varname}
            index ${ctx.expression().length}
        `)
    }

    visitArrayShorthand(ctx) {
        /*let exps = ctx.expression();
        exps.forEach(exp => { this.visit(exp) })
        this.createOp("array", exps.length)*/

        this.assemble(ctx, `
            VISIT expression
            array ${ctx.expression().length}
        `)
    }

    visitAssignmentStatement(ctx) {
        const varname = ctx.variable().getText()

        /*this.visit(ctx.expression())
        this.createOp("assign", varname)*/

        this.assemble(ctx, `
            VISIT expression
            assign ${varname}
        `)
    }

    visitVariable(ctx) {
        const varname = ctx.getText()
        this.createOp("pushVar", varname)
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

    /** @type {Array<{opcode: String}>} - Contains the opcodes of the program. */
    instructions = []

    /** @type {Array<Value>} - Contains the immediate values. */
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
                this.outputFunc(this.stack.pop())
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

            case "index":
                {
                    let array = this.stack.pop()
                    let indices = []

                    for (let i = 0; i < payload; i++) {
                        indices.push(this.stack.pop().safe_get(TYPES.number) - 1)
                    }
                    indices.reverse()

                    let val = indices.reduce((prev, index) => { return prev.safe_get(TYPES.array)[index] }, array)
                    this.stack.push(val.clone())
                }
                break;

            case "array":
                let arr = []

                for (let i = 0; i < payload; i++) {
                    arr.push(this.stack.pop())
                }

                arr.reverse()

                this.stack.push(new Value(arr, TYPES.array))
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
                this.skipBack("whilePrep", payload);
                break;

            case "for":
                this.variables.enterBasicScope()
                break;

            case "forEnd":
                this.variables.leaveBasicScope()
                break;

            case "functionDef":
                this.skipTo("functionEnd", payload)
                break;

            case "ret":
            case "functionEnd":
                this.ip = this.ipStack.pop()
                this.variables.leaveBasicScope()
                break;

            case "functionCall":
                this.ipStack.push(this.ip)

                this.variables.enterBasicScope(true)

                const parameters = this.parameterTypes.get(payload)?.reverse();

                if (parameters) {
                    for (let paramType of parameters) {
                        this.variables.set(paramType.name, this.stack.pop())
                    }
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
        this.variables = new Stack(this.parameterTypes)
        this.stack = []
        this.ip = 0;
    }
}