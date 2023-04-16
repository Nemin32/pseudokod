import { AST, ASTKind } from "./pseudo_types.ts";
import { ASTCompiler } from "./pseudo_compiler.ts";
import { Tokenizer } from "../parser/tokenizer.ts";
import { parseProgram } from "./pseudo_parser.ts";

enum BaseType {
  NUMBER,
  STRING,
  LOGIC,
  UNKNOWN,
  NONE,
}

interface Type {
  show(): string;
  isBaseType(type: BaseType): boolean;

  isSimple(): this is SimpleType;
  isOr(): this is OrType;
  isAnd(): this is AndType;
}

class SimpleType implements Type {
  constructor(readonly t: BaseType) {}
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
        return "NONE"
    }
  }

  isBaseType(type: BaseType): boolean {
    return this.t == type;
  }
  isSimple(): this is SimpleType {
    return true;
  }
  isOr(): boolean {
    return false;
  }
  isAnd(): boolean {
    return false;
  }
}

class OrType implements Type {
  constructor(readonly t1: Type, readonly t2: Type) {}
  show(): string {
    return `${this.t1.show()} | ${this.t2.show()}`;
  }

  isBaseType(type: BaseType): boolean {
    return this.t1.isBaseType(type) && this.t2.isBaseType(type);
  }
  isSimple(): this is SimpleType {
    return false;
  }
  isOr(): boolean {
    return true;
  }
  isAnd(): boolean {
    return false;
  }
}

class AndType implements Type {
  constructor(readonly ts: Type[]) {}
  show(): string {
    return "[" + this.ts.map((t) => t.show()).join(", ") + "]";
  }

  isBaseType(type: BaseType): boolean {
    return false;
  }
  isSimple(): this is SimpleType {
    return false;
  }
  isOr(): boolean {
    return false;
  }
  isAnd(): boolean {
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

    return new OrType(st1, st2);
  }

  if (input instanceof AndType) {
    const sts = [...new Set(input.ts.map(simplify))];
    if (sts.length == 1) return sts[0];

    return new AndType(sts);
  }

  throw new Error("Should never happen.");
}

type Env = Map<string, Type>;

function typeCheck(input: AST, env: Map<string, Type>): [Type, Env] {
  const [t, nEnv] = _typeCheck(input, env)
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

    return [new AndType(ts), e]
    // return new AndType(input.map(a => typeCheck(a, env)));
  }

  switch (input.kind) {
    case ASTKind.ATOM:
      return [new SimpleType(typeof input.value == "string" ? BaseType.STRING : typeof input.value == "number" ? BaseType.NUMBER : BaseType.LOGIC), env]

    case ASTKind.CALCBINOP: {
      const [t1, nEnv] = typeCheck(input.exp1, env);
      const [t2, nEnv2] = typeCheck(input.exp2, nEnv);

      if (t1.isBaseType(BaseType.NUMBER) && t2.isBaseType(BaseType.NUMBER)) {
        return [new SimpleType(BaseType.NUMBER), nEnv2];
      }

      throw new Error("T1 or T2 wasn't NUM.");
    }

    case ASTKind.LOGICBINOP: {
      const [t1, nEnv] = typeCheck(input.exp1, env);
      const [t2, nEnv2] = typeCheck(input.exp2, nEnv);


      if (t1.isBaseType(BaseType.LOGIC) && t2.isBaseType(BaseType.LOGIC)) {
        return [new SimpleType(BaseType.LOGIC), nEnv2];
      }

      throw new Error("T1 or T2 wasn't LOG.");
    }

    case ASTKind.COMPBINOP: {
      const [t1, nEnv] = typeCheck(input.exp1, env);
      const [t2, nEnv2] = typeCheck(input.exp2, nEnv);

      if ((t1.isBaseType(BaseType.LOGIC) || t1.isBaseType(BaseType.NUMBER)) && compare(t1, t2)) {
        return [new SimpleType(BaseType.LOGIC), nEnv2];
      }

      throw new Error("T1 or T2 wasn't LOG.");
    }

    
    /*
    case ASTKind.IF: {
      const [head, elif, elseb] = [input.headBranch, input.elIfs, input.elseBranch];

      const [predT, nEnv] = typeCheck(head.pred, env)
      if (!predT.isBaseType(BaseType.LOGIC)) throw new Error("Head wasn't LOG");

      const elifPreds = elif.map((elif) => typeCheck(elif.pred, env).isBaseType(BaseType.LOGIC)).every((e) => e);
      if (!elifPreds) throw new Error("Elif wasn't LOG");

      let ifT = typeCheck(head.body, env);

      if (elseb) {
        const elseT = typeCheck(elseb, env);
        ifT = new OrType(ifT, elseT);
      }

      if (elif.length > 0) {
        const elifTs = elif.map((elif) => typeCheck(elif.body, env)).reduce((or, curr) => new OrType(or, curr));
        ifT = new OrType(ifT, elifTs);
      }

      return ifT;
    }
    */

    case ASTKind.ASSIGNMENT: {
      const [t, nEnv] = typeCheck(input.value, env);
      const nEnv2 = new Map(nEnv);
      nEnv2.set(input.variable.name, t)
      return [new SimpleType(BaseType.NONE), nEnv2];
    }

    case ASTKind.VARIABLE: {
      const t = env.get(input.name);

      if (t) return [t, env];
      throw new Error(`Variable ${input.name} was not found.`);
    }

    default:
      console.log(input);
      return [new SimpleType(BaseType.UNKNOWN), env];
  }
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
