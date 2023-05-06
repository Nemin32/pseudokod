import { AST, ASTKind, Expression } from "../compiler/pseudo_types.ts";
import { Tokenizer } from "../parser/tokenizer.ts";
import { parseProgram } from "../compiler/pseudo_parser.ts";
import {
  Type,
  Env,
  AndType,
  STRING,
  NUMBER,
  LOGIC,
  BaseType,
  compare,
  OrType,
  NONE,
  strToType,
  simplify,
} from "./typechecker_utils.ts";

const funcEnv: Map<string, { parameters: { name: string; type: Type }[]; returnType: Type }> =
  new Map();

class TypeCheckError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

function _typeCheck(input: AST, env: Map<string, Type>): [Type, Env] {
  if (Array.isArray(input)) {
    let e = env;
    const ts = [];

    for (const ast of input) {
      const [t, nE] = typeCheck(ast, e);
      e = new Map(nE);
      //console.log(ast, t, e, nE)

      if (
        [ASTKind.FOR, ASTKind.RETURN, ASTKind.WHILE, ASTKind.DOWHILE, ASTKind.IF].some(
          (e) => ast.kind === e,
        )
      )
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
      return [
        typeof input.value === "string" ? STRING : typeof input.value === "number" ? NUMBER : LOGIC,
        env,
      ];

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

      t1.ensure(LOGIC);
      t2.ensure(LOGIC);

      return [LOGIC, nEnv2];
    }

    case ASTKind.COMPBINOP: {
      const [t1, nEnv] = typeCheck(input.exp1, env);
      const [t2, nEnv2] = typeCheck(input.exp2, nEnv);

      if ((t1.isBaseType(BaseType.LOGIC) || t1.isBaseType(BaseType.NUMBER)) && compare(t1, t2)) {
        return [LOGIC, nEnv2];
      }

      throw new TypeCheckError("T1 or T2 wasn't LOG.");
    }

    case ASTKind.IF: {
      // ifHead
      const [hPred, hBody] = [input.headBranch.pred, input.headBranch.body];
      typeCheck(hPred, env);
      let returnType = typeCheck(hBody, env)[0];

      // elseIf
      if (input.elIfs.length > 0) {
        input.elIfs.forEach((e) => typeCheck(e.pred, env));
        const elifs = input.elIfs.reduce(
          (acc: Type, e) => new OrType(typeCheck(e.body, env)[0], acc),
          NONE,
        );

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
        [[], env],
      );

      const isHomogenous = ts.every((e) => compare(e, ts[0]));

      return [isHomogenous ? NUMBER : new AndType(ts), nEnvFinal];
    }

    case ASTKind.DEBUG:
      return [NONE, env];

    case ASTKind.FOR: {
      const [fT, nEnv] = typeCheck(input.from, env);
      const [tT, nEnv2] = typeCheck(input.to, nEnv);

      fT.ensure(NUMBER);
      tT.ensure(NUMBER);

      nEnv2.set(input.variable.name, NUMBER);
      const [bT, _] = typeCheck(input.body, nEnv2);

      return [bT, env];
    }

    case ASTKind.NOT: {
      const [valT, nEnv] = typeCheck(input.exp, env);

      valT.ensure(LOGIC);

      return [LOGIC, nEnv];
    }

    case ASTKind.PRINT:
      return [NONE, env];

    case ASTKind.RETURN:
      return typeCheck(input.value, env);

    case ASTKind.DOWHILE:
    case ASTKind.WHILE: {
      const [pT, nEnv] = typeCheck(input.pred, env);

      pT.ensure(LOGIC);

      return typeCheck(input.body, nEnv);
    }

    case ASTKind.ASSIGNMENT: {
      const [t, nEnv] = typeCheck(input.value, env);
      const nEnv2 = new Map(nEnv);

      const prev = nEnv.get(input.variable.name);
      if (prev && !compare(prev, t))
        throw new TypeCheckError(
          `Trying to set ${input.variable.name} (a ${prev.show()} value) to ${t.show()}`,
        );

      nEnv2.set(input.variable.name, t);
      return [NONE, nEnv2];
    }

    case ASTKind.VARIABLE: {
      const t = env.get(input.name);

      if (t) return [t, env];
      throw new TypeCheckError(`Variable ${input.name} was not found.`);
    }

    case ASTKind.ARRELEMASSIGN: {
      const vName = input.arrayIndex.variable.name;
      const vT = env.get(vName);
      const [iT, _] = typeCheck(input.arrayIndex.index, env);
      const [eT, __] = typeCheck(input.value, env);

      if (!vT) throw new TypeCheckError(`Variable ${vName} not found.`);

      iT.ensure(NUMBER);
      eT.ensure(vT);

      return [NONE, env];
    }

    case ASTKind.ARRASSIGN: {
      const vName = input.variable.name;
      const t = strToType(input.type);
      const nEnv = new Map(env);

      const [lT, _] = typeCheck(input.length, env);
      lT.ensure(NUMBER);

      return [NONE, nEnv.set(vName, t)];
    }

    case ASTKind.ARRINDEX: {
      const vName = input.variable.name;
      const [iT, _] = typeCheck(input.index, env);
      const t = env.get(vName);

      if (!t) throw new TypeCheckError(`Variable ${vName} not found.`);

      iT.ensure(NUMBER);

      return [t, env];
    }

    case ASTKind.FUNCCALL: {
      const paramTypes: Type[] = input.parameters.map((p) => typeCheck(p, env)[0]);
      const expectedTypes = funcEnv.get(input.functionName);

      if (!expectedTypes)
        throw new TypeCheckError(`Can't find function named ${input.functionName}.`);

      if (paramTypes.length !== expectedTypes.parameters.length)
        throw new TypeCheckError(
          `Parameter amount mismatch, expected ${expectedTypes.parameters.length}, got ${paramTypes.length}`,
        );

      for (let i = 0; i < paramTypes.length; i++) {
        if (!compare(paramTypes[i], expectedTypes.parameters[i].type))
          throw new TypeCheckError(
            `Mismatch in '${expectedTypes.parameters[i].name}'. Expected ${expectedTypes.parameters[
              i
            ].type.show()}, got ${paramTypes[i].show()}`,
          );
      }

      return [expectedTypes.returnType, env];
    }

    case ASTKind.FUNCDECL: {
      const parameters = input.parameters.map<{ name: string; type: Type }>((p) => {
        console.log(p.type);
        return { name: p.name, type: strToType(p.type) };
      });

      const fEnv = input.parameters.map<[string, Type]>((p) => [p.name, strToType(p.type)]);
      const merged = new Map(Array.from(new Map(env).entries()).concat(fEnv));
      const returnType = typeCheck(input.body, merged)[0];
      funcEnv.set(input.name, { parameters, returnType });

      return [NONE, env];
    }

    case ASTKind.PARAMETER: {
      const t = strToType(input.type);
      const nEnv = new Map(env);
      nEnv.set(input.name, t);

      return [NONE, nEnv];
    }

    default:
      throw new TypeCheckError(`Unexpected input: ${input}`);
  }
}

function typeCheck(input: AST, env: Map<string, Type>): [Type, Env] {
  const [t, nEnv] = _typeCheck(input, env);
  return [simplify(t), nEnv];
}

const tc = (inp: string): [Type, Env] => {
  const tk = new Tokenizer(inp + "\n");
  const tokens = tk.parse();
  const parsed = parseProgram(tokens);

  if (parsed.kind === "capture") {
    const AST = parsed.value;

    return typeCheck(AST, new Map());
  }

  throw new TypeCheckError("AST wasn't good.");
};

console.log(
  tc(`
függvény Teszt(x: egész tömb)
kiír x
függvény vége

Teszt((1, 2, 3))
`)[0].show(),
);
