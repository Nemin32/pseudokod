import {AST, Block, Parameter} from './pseudo_types.ts';

export function astToString(ast: AST): string {
  if (Array.isArray(ast)) {
    return ast.map(astToString).join("\n");
  } else {
    return (
      "(" +
      ast.kind +
      " " +
      (function (ast: Exclude<AST, Block|Parameter[]>) {
        switch (ast.kind) {
          case "assignment":
            return astToString(ast.variable) + " <- " + astToString(ast.value);

          case "atom":
            return ast.value.toString();

          case "binop":
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;

          case "if":
            return `T: ${astToString(ast.truePath)} F: ${astToString(ast.falsePath)}`;

          case "print":
            return astToString(ast.value);

          case "variable":
            return ast.name;

          case "arrAssign":
            return `${astToString(ast.variable)}[${astToString(ast.length)}]`;

          case "arrElemAssign":
            return `${astToString(ast.array)}[${astToString(ast.index)}] = ${astToString(ast.value)}`;

          case "comparison":
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;

          case "doWhile":
            return `${astToString(ast.pred)} ${astToString(ast.body)}`;

          case "functionCall":
            return `${ast.functionName}(${astToString(ast.parameters)})`;

          case "functionDecl":
            return `${ast.name}(${astToString(ast.parameters)}) {${astToString(ast.body)}}`;

          case "logicBinop":
            return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;

          case "not":
            return astToString(ast.exp);

          case "parameter":
            return `${ast.name} : ${ast.byReference ? "REF" : "VAL"}`;

          case "return":
            return astToString(ast.value);

          case "while":
            return `${astToString(ast.pred)} ${astToString(ast.body)}`;
        }
      })(ast) +
      ")"
    );
  }
}
