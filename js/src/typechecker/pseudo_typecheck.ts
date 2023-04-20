import { AST, ASTKind, Expression } from "../compiler/pseudo_types.ts";
import { Tokenizer } from "../parser/tokenizer.ts";
import { parseProgram } from "../compiler/pseudo_parser.ts";
import { Type, Env, AndType, STRING, NUMBER, LOGIC, BaseType, compare, OrType, NONE, strToType, UNKNOWN, simplify } from "./typechecker_utils.ts";

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

      fT.ensure(NUMBER);
      tT.ensure(NUMBER);

      nEnv2.set(input.variable.name, NUMBER);

      return typeCheck(input.body, nEnv2);
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
      break;

    case ASTKind.PARAMETER: {
      const t = strToType(input.type);
      const nEnv = new Map(env);
      nEnv.set(input.name, t);

      return [NONE, nEnv];
    }

    default:
      console.log(input);
      return [UNKNOWN, env];
  }

  console.log(input);
  return [UNKNOWN, env];
}

function typeCheck(input: AST, env: Map<string, Type>): [Type, Env] {
  const [t, nEnv] = _typeCheck(input, env);
  return [simplify(t), nEnv];
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
