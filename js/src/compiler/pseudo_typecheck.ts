import { AST, ASTKind, Expression, Parameter, Statement } from "./pseudo_types.ts";
import { Tokenizer } from "../parser/tokenizer.ts";
import { parseProgram } from "./pseudo_parser.ts";

enum BaseType {
  NUMBER,
  STRING,
  LOGIC,
  UNKNOWN,
  NONE,
}

abstract class Type {
  abstract show(): string;
  abstract isBaseType(type: BaseType): boolean;

  abstract isSimple(): this is SimpleType;
  abstract isOr(): this is OrType;
  abstract isAnd(): this is AndType;

  ensure(type: Type, message?: string): this is typeof type {
    if (!compare(this, type)) throw new Error(message ?? "Expected type '" + type.show() + "', got '" + this.show() + "'.");
    return true;
  }
}

class SimpleType extends Type {
  constructor(readonly t: BaseType) {
    super();
  }

  show(): string {
    switch (this.t) {
      case BaseType.NUMBER:
        return "NUMBER";
      case BaseType.STRING:
        return "STRING";
      case BaseType.LOGIC:
        return "LOGIC";
      case BaseType.UNKNOWN:
        return "UNKNOWN";
      case BaseType.NONE:
        return "NONE";
    }
  }

  isBaseType(type: BaseType): boolean {
    return this.t == type;
  }
  isSimple(): this is SimpleType {
    return true;
  }
  isOr(): this is OrType {
    return false;
  }
  isAnd(): this is AndType {
    return false;
  }
}

const [NUMBER, STRING, LOGIC, UNKNOWN, NONE] = [
  new SimpleType(BaseType.NUMBER),
  new SimpleType(BaseType.STRING),
  new SimpleType(BaseType.LOGIC),
  new SimpleType(BaseType.UNKNOWN),
  new SimpleType(BaseType.NONE),
];

class OrType extends Type {
  constructor(readonly t1: Type, readonly t2: Type) {
    super();
  }
  show(): string {
    return `${this.t1.show()} | ${this.t2.show()}`;
  }

  isBaseType(type: BaseType): boolean {
    return this.t1.isBaseType(type) && this.t2.isBaseType(type);
  }
  isSimple(): this is SimpleType {
    return false;
  }
  isOr(): this is OrType {
    return true;
  }
  isAnd(): this is AndType {
    return false;
  }
}

class AndType extends Type {
  constructor(readonly ts: Type[]) {
    super();
  }
  show(): string {
    return "[" + this.ts.map((t) => t.show()).join(", ") + "]";
  }

  isBaseType(_type: BaseType): boolean {
    return false;
  }
  isSimple(): this is SimpleType {
    return false;
  }
  isOr(): this is OrType {
    return false;
  }
  isAnd(): this is AndType {
    return true;
  }
}

function compare(t1: Type, t2: Type): boolean {
  if (t1.isSimple() && t2.isSimple()) return t1.t == t2.t;

  if (t1.isOr() && t2.isOr()) return (compare(t1.t1, t2.t1) && compare(t1.t2, t2.t2)) || (compare(t1.t1, t2.t2) && compare(t1.t2, t2.t1));

  if (t1.isAnd() && t2.isAnd() && t1.ts.length == t2.ts.length) {
    const st1s = t1.ts.toSorted();
    const st2s = t2.ts.toSorted();

    return st1s.every((ts1, idx) => compare(ts1, st2s[idx]));
  }

  return false;
}

function simplify(input: Type): Type {
  if (input instanceof SimpleType) return input;

  if (input instanceof OrType) {
    const st1 = simplify(input.t1);
    const st2 = simplify(input.t2);

    if (compare(st1, st2)) {
      return st1;
    }

    // if (compare(st1, NONE)) return st2;
    // if (compare(st2, NONE)) return st1;

    return new OrType(st1, st2);
  }

  if (input instanceof AndType) {
    const sts = [...new Set(input.ts.map(simplify))] // .filter(t => !compare(t, NONE));
    if (sts.length == 1) return sts[0];
    if (sts.length == 0) return NONE;

    return new AndType(sts);
  }

  throw new Error("Should never happen.");
}

type Env = Map<string, Type>;

function typeCheck(input: AST, env: Map<string, Type>): [Type, Env] {
  const [t, nEnv] = _typeCheck(input, env);
  return [simplify(t), nEnv];
}

function _typeCheck(input: AST, env: Map<string, Type>): [Type, Env] {
  if (Array.isArray(input)) {
    let e = env;
    const ts = [];

    for (const ast of input) {
      const [t, nE] = typeCheck(ast, e);
      e = new Map(nE);
      //console.log(ast, t, e, nE)
      ts.push(t);
    }

   /*const [ts, e] = input.reduce<[ts: Type[], env: Env]>(
      (acc: [Type[], Env], val: Statement | Parameter) => {
        const [t, nEnv] = typeCheck(val, acc[1]);
        return [acc[0].concat(t), nEnv];
      },
      [[], env]
    );*/

    return [new AndType(ts), e];
  }

  switch (input.kind) {
    case ASTKind.ATOM:
      return [typeof input.value == "string" ? STRING : typeof input.value == "number" ? NUMBER : LOGIC, env];

    case ASTKind.CALCBINOP: {
      const [t1, nEnv] = typeCheck(input.exp1, env);
      const [t2, nEnv2] = typeCheck(input.exp2, nEnv);

      t1.ensure(NUMBER);
      t2.ensure(NUMBER);

      return [NUMBER, nEnv2];
    }

    case ASTKind.LOGICBINOP: {
      const [t1, nEnv] = typeCheck(input.exp1, env);
      const [t2, nEnv2] = typeCheck(input.exp2, nEnv);

      if (t1.isBaseType(BaseType.LOGIC) && t2.isBaseType(BaseType.LOGIC)) {
        return [LOGIC, nEnv2];
      }

      throw new Error("T1 or T2 wasn't LOG.");
    }

    case ASTKind.COMPBINOP: {
      const [t1, nEnv] = typeCheck(input.exp1, env);
      const [t2, nEnv2] = typeCheck(input.exp2, nEnv);

      if ((t1.isBaseType(BaseType.LOGIC) || t1.isBaseType(BaseType.NUMBER)) && compare(t1, t2)) {
        return [LOGIC, nEnv2];
      }

      throw new Error("T1 or T2 wasn't LOG.");
    }

    case ASTKind.IF: {
      // ifHead
      const [hPred, hBody] = [input.headBranch.pred, input.headBranch.body];
      typeCheck(hPred, env);
      let returnType = typeCheck(hBody, env)[0];

      // elseIf
      if (input.elIfs.length > 0) {
        input.elIfs.forEach((e) => typeCheck(e.pred, env));
        const elifs = input.elIfs.reduce((acc: Type, e) => new OrType(typeCheck(e.body, env)[0], acc), NONE);

        returnType = new OrType(returnType, elifs);
      }

      // else
      if (input.elseBranch) {
        returnType = new OrType(returnType, typeCheck(input.elseBranch, env)[0]);
      }

      return [returnType, env];
    }

    case ASTKind.COMPREHENSION: {
      const [ts, nEnvFinal] = input.exps.reduce<[Type[], Env]>(
        (acc: [Type[], Env], val: Expression) => {
          const [t, nEnv] = typeCheck(val, acc[1]);
          return [acc[0].concat(t), nEnv];
        },
        [[], env]
      );

      return [new AndType(ts), nEnvFinal];
    }

    case ASTKind.DEBUG:
      return [NONE, env];

    case ASTKind.FOR: {
      const [fT, nEnv] = typeCheck(input.from, env);
      const [tT, nEnv2] = typeCheck(input.to, nEnv);

      fT.ensure(NUMBER)
      tT.ensure(NUMBER)

      nEnv2.set(input.variable.name, NUMBER);

      return typeCheck(input.body, nEnv2);
    }

    case ASTKind.NOT: {
      const [valT, nEnv] = typeCheck(input.exp, env);

      valT.ensure(LOGIC)

      return [LOGIC, nEnv];
    }

    case ASTKind.PRINT:
      return [NONE, env];

    case ASTKind.RETURN:
      return typeCheck(input.value, env);

    case ASTKind.WHILE: {
      const [pT, nEnv] = typeCheck(input.pred, env);

      pT.ensure(LOGIC);

      return typeCheck(input.body, nEnv);
    }

    case ASTKind.ASSIGNMENT: {
      const [t, nEnv] = typeCheck(input.value, env);
      const nEnv2 = new Map(nEnv);

      const prev = nEnv.get(input.variable.name);
      if (prev && !compare(prev, t)) throw new Error(`Trying to set ${input.variable.name} (a ${prev.show()} value) to ${t.show()}`);

      nEnv2.set(input.variable.name, t);
      return [NONE, nEnv2];
    }

    case ASTKind.VARIABLE: {
      const t = env.get(input.name);

      if (t) return [t, env];
      throw new Error(`Variable ${input.name} was not found.`);
    }

    case ASTKind.ARRASSIGN:
    case ASTKind.ARRELEMASSIGN:
    case ASTKind.ARRINDEX:
    case ASTKind.DOWHILE:
    case ASTKind.FUNCCALL:
    case ASTKind.FUNCDECL:
    case ASTKind.PARAMETER:
      break;

    default:
      console.log(input);
      return [UNKNOWN, env];
  }

  console.log(input);
  return [UNKNOWN, env];
}

const tc = (inp: string): [Type, Env] => {
  const tk = new Tokenizer(inp + "\n");
  const tokens = tk.parse();
  const parsed = parseProgram(tokens);

  if (parsed.kind == "capture") {
    const AST = parsed.value;

    return typeCheck(AST, new Map());
  }

  throw new Error("AST wasn't good.");
};
