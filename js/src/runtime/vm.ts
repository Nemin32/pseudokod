import { ByteCode, OpCode } from "../compiler/opcodes.js";
import { Atom, AtomValue } from "../compiler/pseudo_types.js";
import { ImmutableStack, Stack } from "./stack.js";
import { ImmutableEnvironment } from "./environment.js";
import { ImmutableStore } from "./store.js";
import { Box } from "./box.js";

type NoArrValue = Atom["value"];
type Value = NoArrValue;

function handleCalc(exp1: number, exp2: number, op: string): number
{
  switch (op as string) {
    case "+": return (exp1 + exp2);
    case "-": return (exp1 - exp2);
    case "*": return (exp1 * exp2);
    case "/": return (exp1 / exp2);
    case "mod": return (exp1 % exp2);
    default: throw new Error("CALC: Payload was " + op);
  }
}

function handleComp(exp1: number|boolean, exp2: number|boolean, op: string): boolean
{
  switch (op) {
    case "=": return (exp1 == exp2);
    case "=/=": return (exp1 != exp2);
    case "<=": return (exp1 <= exp2);
    case ">=": return (exp1 >= exp2);
    case "<": return (exp1 < exp2);
    case ">": return (exp1 > exp2);
    default: throw new Error("COMP: Payload was " + op);
  }
}

function handleLogic(exp1: boolean, exp2: boolean, op: string): boolean
{
  switch (op as string) {
    case "és": return (exp1 && exp2);
    case "vagy": return (exp1 || exp2);
    default: throw new Error("LOGIC: Payload was " + op);
  }
}

export interface IBindings {
  out: (value: Value) => void;
  stack: (stack: Value[]) => void;
}

type State = Readonly<{
  stack: ImmutableStack;
  store: ImmutableStore;
  variables: ImmutableEnvironment;
  ipStack: Array<number>;
  ip: number;
  stopped: boolean;
}>;

interface IVM {
  run(): void;
  fetch(): ByteCode;
  execute(lastState: State, instruction: ByteCode): State;
  step(): boolean;
  reset(): void;
}

export class VM implements IVM {
  jumpTable = new Map<string, number>();
  private constructor(private tape: Array<ByteCode>, private states: Array<State>, private bindings: IBindings) {}

  static generateInitialState(): State {
    return {
      stack: ImmutableStack.init(),
      store: ImmutableStore.init(),
      variables: ImmutableEnvironment.init(),
      ipStack: [],
      ip: 0,
      stopped: false,
    };
  }

  static init(tape: ByteCode[], bindings: IBindings): IVM {
    return new VM(tape, [this.generateInitialState()], bindings);
  }

  findLabelAddress(label: string): number {
    const addr = this.jumpTable.get(label);
    if (addr !== undefined) return addr;

    const newAddr = this.tape.findIndex((bc) => bc.opCode == OpCode.LABEL && bc.payload == label);
    if (newAddr == -1) throw new Error("No such label: " + label);

    this.jumpTable.set(label, newAddr);
    return newAddr;
  }

  execute(lastState: State, instruction: ByteCode): State {
    const { stack, store, variables, ipStack, ip, stopped } = lastState;
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
        const [value, newStack] = stack.pop("boolean");
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

        return {...lastState, stack: newStack2.push(handleCalc(exp1, exp2, payload as string)), ip: ip+1};
      }

      case OpCode.COMP: {
        const [exp1, newStack] = stack.pop("any"); 
        const [exp2, newStack2] = newStack.pop("any"); 

        if (!(typeof exp1 == "boolean" || typeof exp1 == "number") || !(typeof exp2 == "boolean" || typeof exp2 == "number")) {
          throw new Error("COMP: Exp1 or Exp2 isn't num|bool.");
        }

        return {...lastState, stack: newStack2.push(handleComp(exp1, exp2, payload as string)), ip: ip+1};
      }

      case OpCode.LOGIC: {
        const [exp1, newStack] = stack.pop("boolean"); 
        const [exp2, newStack2] = newStack.pop("boolean"); 

        return {...lastState, stack: newStack2.push(handleLogic(exp1, exp2, payload as string)), ip: ip+1};
      }


      case OpCode.ESCOPE:
        return { ...lastState, variables: variables.enterScope(payload == "func"), ip: ip + 1 };
      case OpCode.LSCOPE:
        return { ...lastState, variables: variables.leaveScope(), ip: ip + 1 };

      case OpCode.CALL:
        return { ...lastState, ipStack: ipStack.concat(ip), ip: this.findLabelAddress(payload as string) };

      case OpCode.RETURN: {
        const newAddress = ipStack.at(-1);

        if (newAddress === undefined) throw new Error("IP Stack was empty!");

        return { ...lastState, stack: payload != null ? stack.pop("any")[1] : stack, ipStack: ipStack.slice(0, -1), ip: newAddress };
      }

      case OpCode.ADDRESS:
        return { ...lastState, stack: stack.push(variables.getBoxIndex(payload as string)), ip: ip + 1 };

      case OpCode.ARRADDR: {
          const [offset, newStack] = stack.pop("number");
          const headIdx = variables.getBoxIndex(payload as string);

          return {...lastState, stack: newStack.push(store.getArrayElementBoxIndex(headIdx, offset)), ip: ip + 1};
      }

      case OpCode.GETARR: {
          const [offset, newStack] = stack.pop("number");
          const headIdx = variables.getBoxIndex(payload as string);

          return {...lastState, stack: newStack.push(store.getArrayElement(headIdx, offset - 1) as any), ip: ip+1};
      }

      case OpCode.SETARR: {
        const [offset, newStack] = stack.pop("number");
        const [value, newStack2] = newStack.pop("any");
        const headIdx = variables.getBoxIndex(payload as string);
        const arrayIndex = store.getArrayElementBoxIndex(headIdx, offset - 1);

        return { ...lastState, stack: newStack2, store: store.set(arrayIndex, value), ip: ip + 1 };
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

        return { ...lastState, stack: curr_stack.push(arr as any), ip: ip + 1 };
      }
      case OpCode.MKARR:
        return { ...lastState, stack: stack.push(Array(payload as number).fill(0) as any), ip: ip + 1 };

      case OpCode.MKREF: {
        const [source, newStack] = stack.pop("any");
        if (!(typeof source == "number" || typeof source == "string")) {
          throw new Error("MKREF: Source must be string or number.");
        }

        return { ...lastState, stack: newStack, variables: variables.makeReference(source, payload as string), ip: ip + 1 };
      }

      case OpCode.GETVAR:
        return { ...lastState, stack: stack.push(variables.getVariable(store, payload as string) as any), ip: ip + 1 };
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
    this.states.push(nextState);

    return nextState.stopped;
  }

  reset(): void {
    this.states = [VM.generateInitialState()];
    this.jumpTable = new Map();
  }
}

export class oldVM {
  ip = 0;
  private stack: Stack<Value>;
  private ipStack: Array<number> = [];
  private store: Store = new Store();
  private vars: IEnvironment<Value> = new Environment(this.store);
  private code: Array<ByteCode> = [];

  constructor(private bindings: IBindings) {
    this.stack = new Stack(bindings.stack);
  }

  setup(code: ByteCode[]) {
    this.ip = 0;
    this.ipStack = [];
    this.vars.reset();
    this.stack.reset();
    this.store.reset();

    this.code = code;
  }

  dump() {
    for (const line of this.code) {
      this.bindings.out(`${OpCode[line.opCode]} ${line.payload ?? ""}`);
    }
  }

  jmpLabel(label: string) {
    this.ip = 0;

    while (this.ip < this.code.length) {
      const row = this.code[this.ip];

      if (row.opCode == OpCode.LABEL && row.payload == label) {
        return;
      }

      this.ip++;
    }
  }

  fetch(): ByteCode {
    if (this.ip < this.code.length) {
      return this.code[this.ip];
    }

    throw new Error("IP ran out of tape.");
  }

  execute({ opCode, payload }: ByteCode): boolean {
    switch (opCode) {
      /* Misc. */
      case OpCode.DEBUG:
        return true;

      case OpCode.LABEL:
        break;

      case OpCode.VOID:
        this.stack.pop("any");
        break;

      case OpCode.PRINT:
        this.bindings.out(this.stack.pop("any"));
        break;

      /* Variables */
      case OpCode.SETVAR:
        this.vars.setVar(payload as string, this.stack.pop("any"));
        break;

      case OpCode.GETVAR:
        this.stack.push(this.vars.getVar(payload as string));
        break;

      case OpCode.SETARR:
        {
          const offset = this.stack.pop("number") - 1;
          const value = this.stack.pop("any");
          const headIdx = this.vars.getBoxIndex(payload as string);
          const arrayIndex = this.store.getArrayElementBoxIndex(headIdx, offset);

          this.store.set(arrayIndex, value);
        }
        break;

      case OpCode.GETARR:
        {
          const offset = this.stack.pop("number") - 1;
          const headIdx = this.vars.getBoxIndex(payload as string);

          this.stack.push(this.store.getArrayElement(headIdx, offset));
        }
        break;

      case OpCode.ESCOPE:
        this.vars.enterScope(payload == "func");
        break;

      case OpCode.LSCOPE:
        this.vars.leaveScope();
        break;

      /* References */
      case OpCode.ADDRESS:
        this.stack.push(this.vars.getBoxIndex(payload as string));
        break;

      case OpCode.ARRADDR:
        {
          const offset = this.stack.pop("number") - 1;
          const headIdx = this.vars.getBoxIndex(payload as string);

          this.stack.push(this.store.getArrayElementBoxIndex(headIdx, offset));
        }
        break;

      case OpCode.MKREF:
        {
          const source = this.stack.pop("any");
          if (!(typeof source == "number" || typeof source == "string")) {
            throw new Error("MKREF: Source must be string or number.");
          }

          this.vars.makeReference(source, payload as string);
        }
        break;

      /* Stack */
      case OpCode.CALC:
        {
          const exp2 = this.stack.pop("number");
          const exp1 = this.stack.pop("number");

          switch (payload as string) {
            case "+":
              this.stack.push(exp1 + exp2);
              break;
            case "-":
              this.stack.push(exp1 - exp2);
              break;
            case "*":
              this.stack.push(exp1 * exp2);
              break;
            case "/":
              this.stack.push(exp1 / exp2);
              break;
            case "mod":
              this.stack.push(exp1 % exp2);
              break;

            default:
              throw new Error("CALC: Payload was " + payload);
          }
        }
        break;

      case OpCode.COMP:
        {
          const exp2 = this.stack.pop("number");
          const exp1 = this.stack.pop("number");

          switch (payload) {
            case "=":
              this.stack.push(exp1 == exp2);
              break;
            case "=/=":
              this.stack.push(exp1 != exp2);
              break;
            case "<=":
              this.stack.push(exp1 <= exp2);
              break;
            case ">=":
              this.stack.push(exp1 >= exp2);
              break;
            case "<":
              this.stack.push(exp1 < exp2);
              break;
            case ">":
              this.stack.push(exp1 > exp2);
              break;

            default:
              throw new Error("COMP: Payload was " + payload);
          }
        }
        break;

      case OpCode.LOGIC:
        {
          const exp2 = this.stack.pop("boolean");
          const exp1 = this.stack.pop("boolean");

          switch (payload as string) {
            case "és":
              this.stack.push(exp1 && exp2);
              break;
            case "vagy":
              this.stack.push(exp1 || exp2);
              break;

            default:
              throw new Error("LOGIC: Payload was " + payload);
          }
        }
        break;

      case OpCode.NOT:
        this.stack.push(!this.stack.pop("boolean"));
        break;

      case OpCode.PUSH:
        this.stack.push(payload as Exclude<typeof payload, null>);
        break;

      /* Functions */
      case OpCode.TJMP:
        if (this.stack.pop("boolean") == true) this.jmpLabel(payload as string);
        break;

      case OpCode.FJMP:
        if (this.stack.pop("boolean") == false) this.jmpLabel(payload as string);
        break;

      case OpCode.JMP:
        this.jmpLabel(payload as string);
        break;

      case OpCode.RETURN:
        {
          if (payload != null) {
            this.stack.push("any");
          }

          const newIp = this.ipStack.pop();

          if (newIp === undefined) {
            throw new Error("Ip stack is empty.");
          }

          this.ip = newIp;
        }
        break;

      case OpCode.CALL:
        this.ipStack.push(this.ip + 1);
        this.jmpLabel(payload as string);
        break;

      /* Arrays */
      case OpCode.MKARR:
        this.stack.push(Array(payload as number).fill(0) as any);
        break;

      case OpCode.VALARR:
        {
          let arr: Value[] = [];
          for (let i = 0; i < (payload as number); i++) {
            arr.push(this.stack.pop("any"));
          }

          arr.reverse();

          this.stack.push(arr as any);
        }
        break;
    }

    return false;
  }

  step(): boolean {
    const val = this.execute(this.fetch());
    this.ip++;

    return val;
  }

  run() {
    while (this.ip < this.code.length) {
      if (this.step()) return;
    }

    console.log(this.ip);
  }
}
