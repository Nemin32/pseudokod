import PseudoCodeVisitor from "./libs/PseudoCodeVisitor.js";
import { Stack, Value, TYPES } from "./Stack.js";

export class LinearGenerator extends PseudoCodeVisitor {
    output = {
        code: [],
        parameterTypes: new Map()
    }

    contextID = 0;
    lineNum = 1;

    createOp(opcode, payload = null) {
        this.output.code.push({
            opcode,
            payload,
            lineNum: this.lineNum
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
                case "NL":
                case "NEWLINE":
                    this.visitNewline(ctx.newline())
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

    visitNewline(ctx) {
        const nls = ctx.NL().length;

        // this.createOp("newline", nls)
        this.lineNum += nls;
    }

    visitDebug(ctx) {
        this.createOp("debug")
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
        this.assemble(ctx, `
            VISIT newline 0
            VISIT newline 1
        `)

        return {
            name: ctx.variable().getText(),
            reference: ctx.CIMSZERINT() !== null,
            type: ctx.type().getText()
        };
    }

    visitParameterList(ctx) {
        const params = ctx.parameterWithType()?.map(p => this.visitParameterWithType(p))

        if (params) {
            const fName = ctx.parentCtx.functionName().getText();
            this.output.parameterTypes.set(fName, params);
        }
    }

    visitFunctionDeclarationStatement(ctx) {
        const fName = ctx.functionName().getText();

        this.assemble(ctx, `
            functionDef ${fName}; 
            VISIT parameterList
            NL
            VISIT body; 
            functionEnd ${fName}
        `)
    }

    /*
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
    */

    visitDebugPrintStatement(ctx) {
        this.assemble(ctx, `
            VISIT expression
            print
        `)
    }

    visitIfStatement(ctx) {
        this.contextID++;

        this.assemble(ctx, `
            enterScope
            VISIT expression
            if ${this.contextID}
            NL
            VISIT body
            jmp ${this.contextID}
            VISIT elseIfBranch
            VISIT elseBranch
            endIf ${this.contextID}
            exitScope
        `)

        this.contextID--;
    }

    visitElseBranch(ctx) {
        this.assemble(ctx, `
            else ${this.contextID}
            NL
            VISIT body
        `)
    }

    visitElseIfBranch(ctx) {
        this.assemble(ctx, `
            VISIT expression
            elIf ${this.contextID}
            NL
            VISIT body
            jmp ${this.contextID}
        `)
    }

    visitWhileStatement(ctx) {
        this.contextID++;

        this.assemble(ctx, `
            enterScope
            whilePrep ${this.contextID}
            VISIT expression
            while ${this.contextID}
            NL
            VISIT body
            loop ${this.contextID}
            exitScope
        `)

        this.contextID--;
    }

    visitForStatement(ctx) {
        const varname = ctx.variable().getText();

        this.contextID++

        this.assemble(ctx, `
            enterScope
            VISIT expression 0
            assign ${varname}

            whilePrep ${this.contextID}

            pushVar ${varname}
            VISIT expression 1
            compare <=

            while ${this.contextID}
            NL
            VISIT body
        `)

        // FIXME: Make this more ergonomic.
        this.createOp("push", 1)

        this.assemble(ctx, `
            pushVar ${varname}
            calculate +
            assign ${varname}

            loop ${this.contextID}

            exitScope
        `)

        this.contextID--;
    }

    visitComparisonExpression(ctx) {
        const comparer = ctx.COMPARISON().getText();

        this.assemble(ctx, `
            VISIT expression 0
            VISIT expression 1
            compare ${comparer}
        `)
    }

    visitCalculationExpression(ctx) {
        const operator = ctx.OPERATOR().getText()

        this.assemble(ctx, `
            VISIT expression 0
            VISIT expression 1
            calculate ${operator}
        `)
    }

    visitArrayElementAssignmentStatement(ctx) {
        const varname = ctx.variable().getText();

        this.assemble(ctx, `
            pushVar ${varname}
            VISIT expression 0
            VISIT expression 1
            setElement ${varname}
        `)
    }

    visitArrayAssignmentStatement(ctx) {
        const varname = ctx.variable().getText();
        const typeName = ctx.type().getText();

        this.visit(ctx.expression())
        this.createOp("create_array", typeName)
        this.createOp("assign", varname)
    }

    visitArrayIndex(ctx) {
        const varname = ctx.variable().getText()

        this.assemble(ctx, `
            VISIT expression
            pushVar ${varname}
            index ${ctx.expression().length}
        `)
    }

    visitArrayShorthand(ctx) {
        this.assemble(ctx, `
            VISIT expression
            array ${ctx.expression().length}
        `)
    }

    visitAssignmentStatement(ctx) {
        const varname = ctx.variable().getText()

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

    /** @type {Stack} - Contains the variables of the program. */
    variables = null

    /** @type {Map<string, Array<{name: string, reference: boolean, type: string}>>} */
    parameterTypes = null;

    /**
     * Initializes a new execution context.
     * @param {Array<{opcode: String}>} instructions The list of instructions to execute.
     */
    constructor(environment, callbacks) {
        this.instructions = environment.code
        this.parameterTypes = environment.parameterTypes
        this.callbacks = callbacks
        this.variables = new Stack(this.parameterTypes, callbacks)
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

    popStack() {
        if (this.stack.length > 0) {
            this.callbacks.popStack?.()
            return this.stack.pop()
        }
    }

    pushStack(value) {
        this.callbacks.pushStack?.(value)
        this.stack.push(value)
    }

    execute(instruction) {
        const { opcode, payload } = instruction;

        switch (opcode) {
            case "debug":
                return true;

            case "print":
                this.callbacks.output?.(this.popStack())
                break;

            case "push":
                this.pushStack(new Value(payload, null))
                break;

            case "create_array":
                {
                    const defaultValue = (() => {
                        switch (payload) {
                            case "egész": return [Number(), TYPES.number];
                            case "szöveg": return [String(), TYPES.string];
                            case "logikai": return [Boolean(), TYPES.boolean];
                        }
                    })()

                    const length = this.popStack().safe_get(TYPES.number)
                    const values = Array.from(Array(length), () => new Value(...defaultValue))

                    this.pushStack(new Value(values, TYPES.array))
                }
                break

            case "compare":
                {
                    const exp2 = this.popStack().safe_get(TYPES.number)
                    const exp1 = this.popStack().safe_get(TYPES.number)

                    this.pushStack(new Value((() => {
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
                    const exp2 = this.popStack().safe_get(TYPES.number)
                    const exp1 = this.popStack().safe_get(TYPES.number)

                    this.pushStack(new Value((() => {
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

            case "setElement":
                {
                    const value = this.popStack()
                    const index = this.popStack().safe_get(TYPES.number) - 1
                    const array = this.popStack().safe_get(TYPES.array)

                    array[index] = value.clone()

                    this.variables.set(payload, new Value(array, TYPES.array))
                }
                break;

            case "index":
                {
                    let array = this.popStack()
                    let indices = []

                    for (let i = 0; i < payload; i++) {
                        indices.push(this.popStack().safe_get(TYPES.number) - 1)
                    }
                    indices.reverse()

                    let val = indices.reduce((prev, index) => { return prev.safe_get(TYPES.array)[index] }, array)
                    this.pushStack(val)
                }
                break;

            case "array":
                let arr = []

                for (let i = 0; i < payload; i++) {
                    arr.push(this.popStack())
                }

                arr.reverse()

                this.pushStack(new Value(arr, TYPES.array))
                break;

            case "elIf":
            case "if":
                const predicate = this.popStack().safe_get(TYPES.boolean);

                if (!predicate) {
                    this.skipTo(["jmp", "else"], payload)

                    if (this.instructions[this.ip + 1].opcode == "else") this.ip++;
                }
                break;

            case "else":
                this.skipTo("endIf", payload)
                this.ip--;
                break;

            case "jmp":
                this.skipTo("endIf", payload)
                this.ip--;
                break;

            case "while":
                const should = this.popStack().safe_get(TYPES.boolean)

                if (!should) {
                    this.skipTo("loop", payload)
                }
                break;

            case "loop":
                this.skipBack("whilePrep", payload);
                break;

            case "enterScope":
                this.variables.enterBasicScope()
                break;

            case "exitScope":
                this.variables.leaveBasicScope()
                break;

            case "functionDef":
                this.skipTo("functionEnd", payload)
                break;

            case "ret":
            case "functionEnd":
                this.ip = this.ipStack.pop()
                this.variables.leaveBasicScope(true)
                break;

            case "functionCall":
                this.ipStack.push(this.ip)

                this.variables.enterBasicScope(true)

                const parameters = this.parameterTypes.get(payload);

                if (parameters) {
                    for (let i = parameters.length - 1; i >= 0; i--) {
                        let paramType = parameters[i]

                        if (paramType.reference) {
                            this.variables.create_reference(paramType.name, this.popStack())
                        }
                        else {
                            this.variables.set(paramType.name, this.popStack())
                        }
                    }
                }

                this.fullSeek("functionDef", payload);
                break;

            case "assign":
                const val = this.popStack()
                this.variables.set(payload, val.clone());
                break;

            case "pushVar":
                this.pushStack(this.variables.get(payload))
                break;

        }

        return false;
    }

    step() {
        if (this.ip < this.instructions.length) {
            const current_instruction = this.instructions[this.ip];
            const retval = this.execute(current_instruction)
            this.ip++;

            return retval;
        }

        return true;
    }

    stepLine() {
        const current_line = this.instructions[this.ip].lineNum

        while (this.ip < this.instructions.length && this.instructions[this.ip].lineNum == current_line) {
            if (this.step()) return;
        }
    }

    run() {
        while (this.ip < this.instructions.length) {
            if (this.step()) return;
        }
    }

    reset() {
        this.variables = new Stack(this.parameterTypes, this.callbacks)
        this.stack = []
        this.ip = 0;
    }
}