import { AST, ASTKind, Block, Parameter } from "../compiler/pseudo_types.js";

type nestedString = Array<string | nestedString>;

export function divMaker(root: nestedString): HTMLDivElement | HTMLSpanElement {
  const div = document.createElement("div");

  const [head, ...rest] = root;

  if (typeof head == "string") {
    const type = document.createElement("span");

    console.log(head)

    type.innerText = head
    div.appendChild(type);
  }

  if (rest.length == 1 && typeof rest[0] == "string") {
    div.appendChild(spanMaker(rest[0]));
  } else {
    const chd = document.createElement("div");
    div.appendChild(chd);
    rest.forEach((c) => chd.appendChild((typeof c == "string") ? spanMaker(c) : divMaker(c)));
  }

  return div;
}

function spanMaker(str: string): HTMLSpanElement {
  const span = document.createElement("span");
  span.innerText = str;
  return span;
}



export function astToDiv(ast: AST): nestedString {
  if (Array.isArray(ast)) {
    return (["block"] as nestedString).concat(ast.map((a) => astToDiv(a)));
  } else {
    return ([ASTKind[ast.kind]] as nestedString).concat((function(): nestedString {switch (ast.kind) {
      case ASTKind.ARRASSIGN:
        return [astToDiv(ast.variable), "<- [", astToDiv(ast.length), "]"];

      case ASTKind.ARRELEMASSIGN:
        return [astToDiv(ast.arrayIndex.variable), "[", astToDiv(ast.arrayIndex.index), "] <- ", astToDiv(ast.value)];

      case ASTKind.ARRINDEX:
        return [astToDiv(ast.variable), "[", astToDiv(ast.index), "]"];

      case ASTKind.ASSIGNMENT:
        return [astToDiv(ast.variable), "<-", astToDiv(ast.value)];

      case ASTKind.ATOM:
        return [String(ast.value)];

      case ASTKind.CALCBINOP: /* falls through */
      case ASTKind.COMPBINOP: /* falls through */
      case ASTKind.LOGICBINOP:
        return [astToDiv(ast.exp1), ast.op, astToDiv(ast.exp2)];

      case ASTKind.COMPREHENSION:
        return [astToDiv(ast.exps)];

      case ASTKind.DEBUG:
        return [];

      case ASTKind.DOWHILE:
        return [astToDiv(ast.pred), "{", astToDiv(ast.body), "}"];

      case ASTKind.FOR:
        return [astToDiv(ast.variable), " <- [", astToDiv(ast.from), ", ", astToDiv(ast.to), "]", "{", astToDiv(ast.body), "}"];

      case ASTKind.FUNCCALL:
        return [ast.functionName, "(", astToDiv(ast.parameters), ")"];

      case ASTKind.FUNCDECL:
        return [ast.name, "(", astToDiv(ast.parameters), ") {", astToDiv(ast.body), "}"];

      case ASTKind.IF:
        {
          const head = [astToDiv(ast.headBranch.pred), "=>", astToDiv(ast.headBranch.body)];
          const elifs = ast.elIfs.map((elif) => ["ELIF", astToDiv(elif.pred), "=>", astToDiv(elif.body)])
          const elseBranch = ast.elseBranch ? ["ELSE", astToDiv(ast.elseBranch)] : []

          return head.concat(elifs, elseBranch)
        }

      case ASTKind.NOT:
        return [astToDiv(ast.exp)];

      case ASTKind.PARAMETER:
        return ast.byReference ? ["címszerint", ast.name] : [ast.name];

      case ASTKind.PRINT:
        return [astToDiv(ast.value)];

      case ASTKind.RETURN:
        return [astToDiv(ast.value)];

      case ASTKind.VARIABLE:
        return [ast.name];

      case ASTKind.WHILE:
        return [astToDiv(ast.pred), "{", astToDiv(ast.body), "}"];
    }})())
  }
}

export function astToString(ast: AST): string {
  if (Array.isArray(ast)) {
    return ast.map(astToString).join("\n");
  } else {
    return (
      "(" +
      ASTKind[ast.kind] +
      " " +
      (function (ast: Exclude<AST, Block | Parameter[]>) {
        switch (ast.kind) {
          case ASTKind.COMPREHENSION:
            return astToString(ast.exps);
          case ASTKind.ARRASSIGN:
            return `${astToString(ast.variable)} <- [${astToString(ast.length)}]`;
          case ASTKind.ARRELEMASSIGN:
            return `${astToString(ast.arrayIndex.variable)}[${astToString(ast.arrayIndex.index)}] = ${astToString(ast.value)}`;
          case ASTKind.ASSIGNMENT:
            return astToString(ast.variable) + " <- " + astToString(ast.value);
          case ASTKind.ATOM:
            return ast.value.toString();
          case ASTKind.CALCBINOP:
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;
          case ASTKind.COMPBINOP:
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;
          case ASTKind.DOWHILE:
            return `${astToString(ast.pred)} ${astToString(ast.body)}`;
          case ASTKind.FUNCCALL:
            return `${ast.functionName}(${astToString(ast.parameters)})`;
          case ASTKind.FUNCDECL:
            return `${ast.name}(${astToString(ast.parameters)}) {${astToString(ast.body)}}`;
          case ASTKind.IF: {
            const head = `(${astToString(ast.headBranch.pred)} => ${astToString(ast.headBranch.body)})`;
            const elifs = ast.elIfs.map((elIf) => `(${astToString(elIf.pred)} => ${astToString(elIf.body)})`).join(" ");
            const elseBranch = ast.elseBranch ? ` (else => ${astToString(ast.elseBranch)}` : "";

            return `${head} ${elifs}${elseBranch}`;
          }
          case ASTKind.LOGICBINOP:
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;
          case ASTKind.NOT:
            return astToString(ast.exp);
          case ASTKind.PARAMETER:
            return `${ast.name} : ${ast.byReference ? "REF" : "VAL"}`;
          case ASTKind.PRINT:
            return astToString(ast.value);
          case ASTKind.RETURN:
            return astToString(ast.value);
          case ASTKind.VARIABLE:
            return ast.name;
          case ASTKind.WHILE:
            return `${astToString(ast.pred)} ${astToString(ast.body)}`;
        }
      })(ast) +
      ")"
    );
  }
}
