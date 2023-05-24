import { ByteCode, OpCode } from "../compiler/opcodes.ts";
import { AST, Block, Parameter } from "../compiler/pseudo_types.ts";
import { PseudoToken } from "../parser/tokenizer.ts";
import { VariableStore } from "./environment.ts";
import { IBindings, IVM, NestedArray, State } from "./interfaces.ts";
import { Stack } from "./stack.ts";
import { MemAllocator } from "./store.ts";

function handleCalc(exp1: number, exp2: number, op: string): number {
  switch (op as string) {
    case "+":
      return exp1 + exp2;
    case "-":
      return exp1 - exp2;
    case "*":
      return exp1 * exp2;
    case "/":
      return exp1 / exp2;
    case "mod":
      return exp1 % exp2;
    default:
      throw new VMError(null, `CALC: Payload was ${op}`);
  }
}

function handleComp(exp1: number | boolean, exp2: number | boolean, op: string): boolean {
  switch (op) {
    case "=":
      return exp1 === exp2;
    case "=/=":
      return exp1 !== exp2;
    case "<=":
      return exp1 <= exp2;
    case ">=":
      return exp1 >= exp2;
    case "<":
      return exp1 < exp2;
    case ">":
      return exp1 > exp2;
    default:
      throw new VMError(null, `COMP: Payload was ${op}`);
  }
}

function handleLogic(exp1: boolean, exp2: boolean, op: string): boolean {
  switch (op as string) {
    case "és":
      return exp1 && exp2;
    case "vagy":
      return exp1 || exp2;
    default:
      throw new VMError(null, `LOGIC: Payload was ${op}`);
  }
}

export class VMError extends Error {
  token: PseudoToken | null;

  constructor(ast: Exclude<AST, Block | Parameter[]> | null, message: string) {
    super(message);
    this.token = ast?.token ?? null;
  }
}

export class VM implements IVM {
  jumpTable = new Map<string, number>();
  private constructor(
    private tape: Array<ByteCode>,
    private states: Array<State>,
    private bindings: IBindings,
  ) {}

  generateInitialState(): State {
    return {
      stack: Stack.init(this.bindings.stack),
      store: new MemAllocator(),
      variables: VariableStore.init(this.bindings.vars),
      ipStack: [],
      ip: 0,
      stopped: false,
      line: 0,
    };
  }

  static init(tape: ByteCode[], bindings: IBindings): IVM {
    const vm = new VM(tape, [], bindings);
    vm.states = [vm.generateInitialState()];
    return vm;
  }

  lastState(): State {
    return this.states[this.states.length - 1];
  }

  findLabelAddress(label: string): number {
    const addr = this.jumpTable.get(label);
    if (addr !== undefined) return addr;

    const newAddr = this.tape.findIndex((bc) => bc.opCode === OpCode.LABEL && bc.payload === label);
    if (newAddr === -1) throw new VMError(null, `No such label: ${label}`);

    this.jumpTable.set(label, newAddr);
    return newAddr;
  }

  execute(_lastState: State, instruction: ByteCode): State {
    const lastState = { ..._lastState, store: _lastState.store.clone() };
    const { stack, store, variables, ipStack, ip, stopped: _stopped } = lastState;
    const { opCode, payload } = instruction;

    switch (opCode) {
      case OpCode.LABEL: {
        this.jumpTable.set(payload as string, ip + 1);
        return { ...lastState, ip: ip + 1 };
      }

      case OpCode.PUSH: {
        if (payload == null) throw new VMError(instruction.ast, "PUSH: Payload was null.");
        return { ...lastState, stack: stack.push(payload), ip: ip + 1 };
      }

      case OpCode.NOT: {
        const [value, newStack] = stack.pop("boolean");
        return { ...lastState, stack: newStack.push(!value), ip: ip + 1 };
      }

      case OpCode.VOID:
        return { ...lastState, stack: stack.length > 0 ? stack.pop("any")[1] : stack, ip: ip + 1 };

      case OpCode.PRINT: {
        const [value, newStack] = stack.pop("any");
        this.bindings.out(value);
        return { ...lastState, stack: newStack, ip: ip + 1 };
      }

      case OpCode.DEBUG:
        return { ...lastState, stopped: true, ip: ip + 1 };

      case OpCode.JMP:
        return { ...lastState, ip: this.findLabelAddress(payload as string) };

      case OpCode.TJMP: {
        const [value, newStack] = stack.pop("boolean");
        return {
          ...lastState,
          stack: newStack,
          ip: value ? this.findLabelAddress(payload as string) : ip + 1,
        };
      }

      case OpCode.FJMP: {
        const [value, newStack] = stack.pop("boolean");
        return {
          ...lastState,
          stack: newStack,
          ip: !value ? this.findLabelAddress(payload as string) : ip + 1,
        };
      }

      case OpCode.CALC: {
        const [exp1, newStack] = stack.pop("number");
        const [exp2, newStack2] = newStack.pop("number");

        return {
          ...lastState,
          stack: newStack2.push(handleCalc(exp1, exp2, payload as string)),
          ip: ip + 1,
        };
      }

      case OpCode.COMP: {
        const [exp1, newStack] = stack.pop("any");
        const [exp2, newStack2] = newStack.pop("any");

        if (
          !(typeof exp1 === "boolean" || typeof exp1 === "number") ||
          !(typeof exp2 === "boolean" || typeof exp2 === "number")
        ) {
          throw new VMError(instruction.ast, "COMP: Exp1 or Exp2 isn't num|bool.");
        }

        return {
          ...lastState,
          stack: newStack2.push(handleComp(exp1, exp2, payload as string)),
          ip: ip + 1,
        };
      }

      case OpCode.LOGIC: {
        const [exp1, newStack] = stack.pop("boolean");
        const [exp2, newStack2] = newStack.pop("boolean");

        return {
          ...lastState,
          stack: newStack2.push(handleLogic(exp1, exp2, payload as string)),
          ip: ip + 1,
        };
      }

      case OpCode.ESCOPE:
        return {
          ...lastState,
          variables: variables.enterScope(payload === "func", store),
          ip: ip + 1,
        };
      case OpCode.LSCOPE:
        return { ...lastState, variables: variables.leaveScope(store), ip: ip + 1 };

      case OpCode.CALL: {
        const newIpStack = ipStack.concat(ip + 1);
        this.bindings.ipStack(newIpStack);
        return {
          ...lastState,
          ipStack: newIpStack,
          ip: this.findLabelAddress(payload as string),
        };
      }

      case OpCode.RETURN: {
        const isEmptyReturn = payload !== null;
        const newAddress = ipStack.at(-1);

        if (newAddress === undefined) throw new VMError(instruction.ast, "IP Stack was empty!");

        const newVars = !isEmptyReturn ? variables : variables.leaveScope(store);
        const [_value, newStack] = isEmptyReturn ? stack.pop("any") : [null, stack];
        const newIpStack = ipStack.slice(0, -1);

        this.bindings.ipStack(newIpStack);

        return {
          ...lastState,
          variables: newVars,
          stack: newStack,
          ipStack: newIpStack,
          ip: newAddress,
        };
      }

      case OpCode.ADDRESS:
        return {
          ...lastState,
          stack: stack.push(variables.getBoxIndex(payload as string)),
          ip: ip + 1,
        };

      case OpCode.ARRADDR: {
        const [offset, newStack] = stack.pop("number");
        const headIdx = variables.getBoxIndex(payload as string);
        const arr = store.find(headIdx);

        console.log(arr.children[offset - 1].id);
        return { ...lastState, stack: newStack.push(arr.children[offset - 1].id), ip: ip + 1 };
      }

      case OpCode.GETARR: {
        const [offset, newStack] = stack.pop("number");
        const headIdx = variables.getBoxIndex(payload as string);

        const arr = store.get(headIdx);
        if (!Array.isArray(arr)) throw new VMError(instruction.ast, `${headIdx} was not array.`);

        if (offset - 1 >= arr.length) throw new VMError(instruction.ast, "Out of bounds.");

        return { ...lastState, stack: newStack.push(arr[offset - 1]), ip: ip + 1 };
      }

      case OpCode.SETARR: {
        const [value, newStack] = stack.pop("any");
        const [offset, newStack2] = newStack.pop("number");
        const headIdx = variables.getBoxIndex(payload as string);

        store.setArr(headIdx, [offset - 1], value);

        return { ...lastState, stack: newStack2, ip: ip + 1 };
      }

      case OpCode.VALARR: {
        const length = payload as number;
        const arr = [];
        let curr_stack = stack;

        for (let i = 0; i < length; i++) {
          const [val, stack] = curr_stack.pop("any");
          curr_stack = stack;
          arr.push(val);
        }

        arr.reverse();

        return { ...lastState, stack: curr_stack.push(arr as NestedArray), ip: ip + 1 };
      }
      case OpCode.MKARR:
        return {
          ...lastState,
          stack: stack.push(Array(payload as number).fill(0) as number[]),
          ip: ip + 1,
        };

      case OpCode.MKREF: {
        const [source, newStack] = stack.pop("any");
        if (!(typeof source === "number" || typeof source === "string")) {
          throw new VMError(instruction.ast, "MKREF: Source must be string or number.");
        }

        return {
          ...lastState,
          stack: newStack,
          variables: variables.makeReference(source, payload as string),
          ip: ip + 1,
        };
      }

      case OpCode.GETVAR:
        return {
          ...lastState,
          stack: stack.push(variables.getVariable(store, payload as string)),
          ip: ip + 1,
        };

      case OpCode.SETVAR: {
        const [value, newStack] = stack.pop("any");
        const [newStore, newVars] = variables.setVariable(store, payload as string, value);
        return { ...lastState, variables: newVars, store: newStore, stack: newStack, ip: ip + 1 };
      }
    }

    throw new Error(`Unimplemented opCode: ${opCode}`);
  }

  run(): void {
    while (!this.step());
  }

  fetch(): ByteCode | null {
    const lastState = this.lastState();

    if (lastState.ip > this.tape.length - 1) return null;

    return this.tape[lastState.ip];
  }

  step(): boolean {
    const lastState = this.lastState();
    const instruction = this.fetch();

    if (instruction == null) return true;

    const nextState = this.execute(lastState, instruction);
    this.states.push({ ...nextState, stopped: false, line: instruction.ast.token.line });

    return nextState.stopped;
  }

  lineStep(): boolean {
    const line = this.lastState().line;
    let nextLine = this.lastState().line;

    while (line === nextLine && !this.step()) {
      nextLine = this.lastState().line;
    }

    return this.lastState().stopped;
  }

  stepBack(): void {
    this.states.pop();

    if (this.states.length === 0) {
      this.states.push(this.generateInitialState());
    }
  }

  reset(): void {
    this.states = [this.generateInitialState()];
    this.jumpTable = new Map();
  }
}
