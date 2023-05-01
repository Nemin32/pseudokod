import { AST, ASTKind } from "../compiler/pseudo_types.ts";
import { PseudoToken } from "../parser/tokenizer.ts";

enum TypeVariants {
  SIMPLE,
  ARRAY,
  REFERENCE,
  HETEROGENOUS,

  NONE,
  UNKNOWN,
}

enum BaseType {
  NUMBER,
  STRING,
  LOGIC,
}

export class TypeCheckError extends Error {
  constructor(message: string, readonly token: PseudoToken) {super(message)}
}

class SimpleType {
  readonly kind = TypeVariants.SIMPLE;
  constructor(readonly t: BaseType) {}
}

class ArrayType {
  readonly kind = TypeVariants.ARRAY;
  constructor(readonly t: Type) {}
}

class ReferenceType {
  readonly kind = TypeVariants.REFERENCE;
  constructor(readonly t: Type) {}
}

class HeterogenousArrayType {
  readonly kind = TypeVariants.HETEROGENOUS;
  constructor(readonly ts: Type[]) {}
}

class NoneType {
  readonly kind = TypeVariants.NONE;
  constructor() {}
}

class UnknownType {
  readonly kind = TypeVariants.UNKNOWN;
  constructor() {}
}

function compare(t1: Type, t2: Type): boolean {
  if (t1 instanceof NoneType && t2 instanceof NoneType) return true;
  if (t1 instanceof UnknownType && t2 instanceof UnknownType) return true;

  if (t1 instanceof SimpleType && t2 instanceof SimpleType) return t1.t == t2.t;
  if (t1 instanceof ArrayType && t2 instanceof ArrayType) return compare(t1.t, t2.t);
  if (t1 instanceof ReferenceType && t2 instanceof ReferenceType) return compare(t1.t, t2.t);

  if (t1 instanceof HeterogenousArrayType && t2 instanceof HeterogenousArrayType) {
    const ts1 = t1.ts.toSorted();
    const ts2 = t2.ts.toSorted();

    return ts1.every((t, idx) => compare(t, ts2[idx]));
  }

  return false;
}

function show(t: Type): string {
  if (t instanceof SimpleType) {
    switch (t.t) {
      case BaseType.NUMBER:
        return "NUMBER";
      case BaseType.STRING:
        return "STRING";
      case BaseType.LOGIC:
        return "LOGIC";
    }
  }

  if (t instanceof ArrayType) {
    return show(t.t) + " ARRAY";
  }

  if (t instanceof ReferenceType) {
    return show(t.t) + " REFERENCE";
  }

  if (t instanceof NoneType) return "NONE";
  if (t instanceof UnknownType) return "UNKNOWN";

  if (t instanceof HeterogenousArrayType) return "[" + t.ts.map((type) => show(type)) + "]";

  throw new Error("Show: Should not happen.");
}

//type EmbeddableType = SimpleType | ArrayType | ReferenceType | HeterogenousArrayType;
//type NonEmbeddableType = NoneType | UnknownType;
type Type = SimpleType | ArrayType | ReferenceType | HeterogenousArrayType | NoneType | UnknownType;

/* ------------------ */

type FunctionType = { return: Type; parameters: { name: string; type: Type }[] };
type FunctionTypeMap = Map<string, FunctionType>;

type VariableTypeMap = Map<string, Type>;

export type TypeCheckResult = { type: Type; fMap: FunctionTypeMap; vMap: VariableTypeMap };

const [LOGIC, NUMBER, STRING, NONE] = [new SimpleType(BaseType.LOGIC), new SimpleType(BaseType.NUMBER), new SimpleType(BaseType.STRING), new NoneType()];

export function typeCheck(ast: AST, fMap: FunctionTypeMap, vMap: VariableTypeMap): TypeCheckResult {
  function ensure(ast: AST & {token: PseudoToken}, expected: Type): Type {
    const actual = typeCheck(ast, fMap, vMap).type;
    if (!compare(actual, expected)) throw new TypeCheckError(`Expected ${show(expected)}, got ${show(actual)}`, ast.token);

    return actual;
  }

  if (Array.isArray(ast)) {
    const types: Array<Type> = [];

    let cfMap = fMap;
    let cvMap = vMap;

    for (const inst of ast) {
      const { type, fMap: nfMap, vMap: nvMap } = typeCheck(inst, cfMap, cvMap);

      cfMap = nfMap;
      cvMap = nvMap;

      if ([ASTKind.FOR, ASTKind.RETURN, ASTKind.WHILE, ASTKind.DOWHILE, ASTKind.IF].some((e) => inst.kind == e)) types.push(type);
    }

    if (types.length == 0) return {type: NONE, fMap, vMap}
    if (types.length == 1) return {type: types[0], fMap, vMap}

    return { type: new HeterogenousArrayType(types), fMap: cfMap, vMap: cvMap };
  }

  switch (ast.kind) {
    case ASTKind.ATOM:
      return {
        type: new SimpleType(typeof ast.value == "number" ? BaseType.NUMBER : typeof ast.value == "string" ? BaseType.STRING : BaseType.LOGIC),
        fMap,
        vMap,
      };

    case ASTKind.PRINT:
    case ASTKind.DEBUG:
      return {
        type: new NoneType(),
        fMap,
        vMap,
      };

    case ASTKind.NOT: {
      ensure(ast.exp, LOGIC)
      return { type: LOGIC, fMap, vMap };
    }

    case ASTKind.VARIABLE: {
      const vType = vMap.get(ast.name);

      if (!vType) throw new TypeCheckError(`Variable ${ast.name} not found.`, ast.token);

      if (ast.isReference) {
        return { type: new ReferenceType(vType), fMap, vMap };
      } else {
        return { type: vType, fMap, vMap };
      }
    }

    case ASTKind.ASSIGNMENT: {
      const { type: eType, fMap: _, vMap: __ } = typeCheck(ast.value, fMap, vMap);
      const vType = vMap.get(ast.variable.name);

      if (vType && !compare(vType, eType)) throw new TypeCheckError(`Variable ${ast.variable.name}: Expected ${show(vType)}, but got ${show(eType)}.`, ast.token);

      const newVMap = new Map(vMap);
      newVMap.set(ast.variable.name, eType);
      return { type: NONE, fMap, vMap: newVMap };
    }

    case ASTKind.CALCBINOP: {
      const { type: t1, ..._rest1 } = typeCheck(ast.exp1, fMap, vMap);
      const { type: t2, ..._rest2 } = typeCheck(ast.exp2, fMap, vMap);

      if (!compare(t1, NUMBER)) throw new TypeCheckError(`exp1: Expected NUMBER, got ${show(t1)}`,ast.exp1.token);
      if (!compare(t2, NUMBER)) throw new TypeCheckError(`exp2: Expected NUMBER, got ${show(t2)}`,ast.exp2.token);

      return { type: NUMBER, fMap, vMap };
    }

    case ASTKind.LOGICBINOP: {
      //if (!compare(t1, LOGIC)) throw new TypeCheckError(`exp1: Expected LOGIC, got ${show(t1)}`);
      //if (!compare(t2, LOGIC)) throw new TypeCheckError(`exp2: Expected LOGIC, got ${show(t2)}`);

      console.log(ast.exp1, ast.exp2)
      ensure(ast.exp1, LOGIC);
      ensure(ast.exp2, LOGIC);

      return { type: LOGIC, fMap, vMap };
    }

    case ASTKind.COMPBINOP: {
      const {type: t1, ..._rest1} = typeCheck(ast.exp1, fMap, vMap);
      const {type: t2, ..._rest2} = typeCheck(ast.exp2, fMap, vMap);

      if (!compare(t1,t2)) throw new TypeCheckError(`${show(t1)} and ${show(t2)} differ!`, ast.exp1.token);

      return {type: LOGIC, fMap, vMap};
    }

    case ASTKind.COMPREHENSION: {
      const types = ast.exps.map((a) => typeCheck(a, fMap, vMap).type);
      const isHomogenous = types.every((t) => compare(t, types[0]));

      return { type: isHomogenous ? new ArrayType(types[0]) : new HeterogenousArrayType(types), fMap, vMap };
    }

    case ASTKind.RETURN: {
      return typeCheck(ast.value, fMap, vMap);
    }

    case ASTKind.DOWHILE:
    case ASTKind.WHILE: {
      ensure(ast.pred, LOGIC);
      return typeCheck(ast.body, fMap, vMap);
    }

    case ASTKind.FOR: {
      ensure(ast.from, NUMBER);
      ensure(ast.to, NUMBER);
      return typeCheck(ast.body, fMap, vMap);
    }

    case ASTKind.ARRINDEX: {
      ensure(ast.index, NUMBER);

      const vType = vMap.get(ast.variable.name);

      if (!vType) throw new TypeCheckError(`Variable ${ast.variable.name} not found.`, ast.token);

      return { type: vType, fMap, vMap };
    }

    case ASTKind.ARRASSIGN: {
      ensure(ast.length, NUMBER);
      return { type: new ArrayType(ast.type == "egész" ? NUMBER : ast.type == "szöveg" ? STRING : LOGIC), fMap, vMap };
    }

    case ASTKind.ARRELEMASSIGN: {
      ensure(ast.arrayIndex.index, NUMBER);

      const aType = vMap.get(ast.arrayIndex.variable.name);

      if (!aType) throw new TypeCheckError(`Variable ${ast.arrayIndex.variable.name} not found.`, ast.token);

      if (!(aType instanceof ArrayType)) {
        throw new TypeCheckError(`Variable ${ast.arrayIndex.variable.name} expected to be ARRAY, but was ${show(aType)}`, ast.token);
      }

      ensure(ast.value, aType.t);

      return { type: NONE, fMap, vMap };
    }

    case ASTKind.FUNCCALL: {
      const fMapEntry = fMap.get(ast.functionName);

      if (!fMapEntry) throw new TypeCheckError("Unknown function " + ast.functionName + ".", ast.token);

      ast.parameters.forEach((param, idx) => {
        ensure(param, fMapEntry.parameters[idx].type)
      });

      return { type: fMapEntry.return, fMap, vMap };
    }

    case ASTKind.FUNCDECL: {
      const types = ast.parameters.map((param) => ({name: param.name, type: typeCheck(param, fMap, vMap).type}))

      const nvMap = new Map([...vMap.entries(), ...types.map<[string, Type]>(({name, type}) => [name, type instanceof ReferenceType ? type.t : type])]);
      const {type: returnType, ..._rest} = typeCheck(ast.body, fMap, nvMap)

      const nfMap = new Map(fMap);
      nfMap.set(ast.name, {return: returnType, parameters: types})

      return {type: NONE, fMap: nfMap, vMap}
    }

    case ASTKind.PARAMETER: {
      const [rType, isArr] = ast.type.split(" ")

      const baseType = rType == "egész" ? NUMBER : rType == "szöveg" ? STRING : LOGIC;
      const type = isArr ? new ArrayType(baseType) : baseType;

      return {type: ast.byReference ? new ReferenceType(type) : type, fMap, vMap};
    }

    case ASTKind.IF: {
      ensure(ast.headBranch.pred, LOGIC)
      ast.elIfs.forEach(elif => ensure(elif.pred, LOGIC));

      return typeCheck(ast.headBranch.body, fMap, vMap);
    }
  }

  throw new Error("Unhandled case in typeCheck.");
}

/*
const tc = (inp: string): TypeCheckResult => {
  const tk = new Tokenizer(inp + "\n");
  const tokens = tk.parse();
  const parsed = parseProgram(tokens);

  if (parsed.kind == "capture") {
    const AST = parsed.value;

    return typeCheck(AST, new Map(), new Map());
  }

  throw new TypeCheckError("AST wasn't good.");
};

function stc(inp: string): string {
  return show(tc(inp).type);
}
*/