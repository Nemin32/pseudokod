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
      throw new Error("CALC: Payload was " + op);
  }
}

function handleComp(exp1: number | boolean, exp2: number | boolean, op: string): boolean {
  switch (op) {
    case "=":
      return exp1 == exp2;
    case "=/=":
      return exp1 != exp2;
    case "<=":
      return exp1 <= exp2;
    case ">=":
      return exp1 >= exp2;
    case "<":
      return exp1 < exp2;
    case ">":
      return exp1 > exp2;
    default:
      throw new Error("COMP: Payload was " + op);
  }
}

function handleLogic(exp1: boolean, exp2: boolean, op: string): boolean {
  switch (op as string) {
    case "és":
      return exp1 && exp2;
    case "vagy":
      return exp1 || exp2;
    default:
      throw new Error("LOGIC: Payload was " + op);
  }
}

class VMError extends Error {
  token: PseudoToken;

  constructor(ast: Exclude<AST, Block | Parameter[]>, message: string) {
    super(message);
    this.token = ast.token;
  }
}

export class VM implements IVM {
  jumpTable = new Map<string, number>();
  private constructor(private tape: Array<ByteCode>, private states: Array<State>, private bindings: IBindings) {}

  static generateInitialState(): State {
    return {
      stack: Stack.init(),
      store: new MemAllocator(), // ImmutableStore.init(),
      variables: VariableStore.init(),
      ipStack: [],
      ip: 0,
      stopped: false,
    };
  }

  static init(tape: ByteCode[], bindings: IBindings): IVM {
    return new VM(tape, [this.generateInitialState()], bindings);
  }

  lastState(): State {
    return this.states.at(-1)!;
  }

  findLabelAddress(label: string): number {
    const addr = this.jumpTable.get(label);
    if (addr !== undefined) return addr;

    const newAddr = this.tape.findIndex((bc) => bc.opCode == OpCode.LABEL && bc.payload == label);
    if (newAddr == -1) throw new Error("No such label: " + label);

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

      case OpCode.PUSH:
        return { ...lastState, stack: stack.push(payload!), ip: ip + 1 };

      case OpCode.NOT: {
        const [value, newStack] = stack.pop("boolean");
        return { ...lastState, stack: newStack.push(!value), ip: ip + 1 };
      }

      case OpCode.VOID:
        return { ...lastState, stack: stack.pop("any")[1], ip: ip + 1 };

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
        return { ...lastState, stack: newStack, ip: value ? this.findLabelAddress(payload as string) : ip + 1 };
      }

      case OpCode.FJMP: {
        const [value, newStack] = stack.pop("boolean");
        return { ...lastState, stack: newStack, ip: !value ? this.findLabelAddress(payload as string) : ip + 1 };
      }

      case OpCode.CALC: {
        const [exp1, newStack] = stack.pop("number");
        const [exp2, newStack2] = newStack.pop("number");

        return { ...lastState, stack: newStack2.push(handleCalc(exp1, exp2, payload as string)), ip: ip + 1 };
      }

      case OpCode.COMP: {
        const [exp1, newStack] = stack.pop("any");
        const [exp2, newStack2] = newStack.pop("any");

        if (!(typeof exp1 == "boolean" || typeof exp1 == "number") || !(typeof exp2 == "boolean" || typeof exp2 == "number")) {
          throw new Error("COMP: Exp1 or Exp2 isn't num|bool.");
        }

        return { ...lastState, stack: newStack2.push(handleComp(exp1, exp2, payload as string)), ip: ip + 1 };
      }

      case OpCode.LOGIC: {
        const [exp1, newStack] = stack.pop("boolean");
        const [exp2, newStack2] = newStack.pop("boolean");

        return { ...lastState, stack: newStack2.push(handleLogic(exp1, exp2, payload as string)), ip: ip + 1 };
      }

      case OpCode.ESCOPE:
        return { ...lastState, variables: variables.enterScope(payload == "func"), ip: ip + 1 };
      case OpCode.LSCOPE:
        return { ...lastState, variables: variables.leaveScope(), ip: ip + 1 };

      case OpCode.CALL:
        return { ...lastState, ipStack: ipStack.concat(ip + 1), ip: this.findLabelAddress(payload as string) };

      case OpCode.RETURN: {
        const newAddress = ipStack.at(-1);

        if (newAddress === undefined) throw new Error("IP Stack was empty!");

        const newVars = variables.leaveScope();

        if (payload == null) {
          const [_value, newStack] = stack.pop("any");
          return { ...lastState, variables: newVars, stack: newStack, ipStack: ipStack.slice(0, -1), ip: newAddress };
        } else {
          return { ...lastState, variables: newVars, ipStack: ipStack.slice(0, -1), ip: newAddress };
        }
      }

      case OpCode.ADDRESS:
        return { ...lastState, stack: stack.push(variables.getBoxIndex(payload as string)), ip: ip + 1 };

      case OpCode.ARRADDR: {
        console.log(stack);
        const [offset, newStack] = stack.pop("number");
        const headIdx = variables.getBoxIndex(payload as string);

        console.log(headIdx, offset);

        //return { ...lastState, stack: newStack.push(store.get(headIdx + offset, false)!.content), ip: ip + 1 };

        const arr = store.find(headIdx);
        console.log(arr.children[offset - 1].id);
        return { ...lastState, stack: newStack.push(arr.children[offset - 1].id), ip: ip + 1 };
      }

      case OpCode.GETARR: {
        const [offset, newStack] = stack.pop("number");
        const headIdx = variables.getBoxIndex(payload as string);

        const arr = store.get(headIdx);
        if (!Array.isArray(arr)) throw new Error(`${headIdx} was not array.`);

        if (offset - 1 >= arr.length) throw new Error("Out of bounds.");

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
        return { ...lastState, stack: stack.push(Array(payload as number).fill(0) as number[]), ip: ip + 1 };

      case OpCode.MKREF: {
        const [source, newStack] = stack.pop("any");
        if (!(typeof source == "number" || typeof source == "string")) {
          throw new Error("MKREF: Source must be string or number.");
        }

        return { ...lastState, stack: newStack, variables: variables.makeReference(source, payload as string), ip: ip + 1 };
      }

      case OpCode.GETVAR:
        return { ...lastState, stack: stack.push(variables.getVariable(store, payload as string)), ip: ip + 1 };

      case OpCode.SETVAR: {
        const [value, newStack] = stack.pop("any");
        const [newStore, newVars] = variables.setVariable(store, payload as string, value);
        return { ...lastState, variables: newVars, store: newStore, stack: newStack, ip: ip + 1 };
      }
    }

    throw new Error("Unimplemented opCode: " + opCode);
  }

  run(): void {
    while (!this.step());
  }

  fetch(): ByteCode {
    const lastState = this.states.at(-1)!;
    return this.tape[lastState.ip];
  }

  step(): boolean {
    const lastState = this.states.at(-1)!;

    if (lastState.ip >= this.tape.length) return true;

    const instruction = this.fetch();
    const nextState = this.execute(lastState, instruction);
    this.states.push({ ...nextState, stopped: false });

    return nextState.stopped;
  }

  reset(): void {
    this.states = [VM.generateInitialState()];
    this.jumpTable = new Map();
  }
}
