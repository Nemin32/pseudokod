import {AST, ASTKind, Block, Parameter} from './pseudo_types';

export function astToString(ast: AST): string {
  if (Array.isArray(ast)) {
    return ast.map(astToString).join("\n");
  } else {
    return (
      "(" +
      ASTKind[ast.kind] +
      " " +
      (function (ast: Exclude<AST, Block|Parameter[]>) {
        switch (ast.kind) {
          case ASTKind.ARRASSIGN:     return `${astToString(ast.variable)}[${astToString(ast.length)}]`;
          case ASTKind.ARRELEMASSIGN: return `${astToString(ast.array)}[${astToString(ast.index)}] = ${astToString(ast.value)}`;
          case ASTKind.ASSIGNMENT:    return astToString(ast.variable) + " <- " + astToString(ast.value);
          case ASTKind.ATOM:          return ast.value.toString();
          case ASTKind.CALCBINOP:     return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;
          case ASTKind.COMPBINOP:     return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;
          case ASTKind.DOWHILE:       return `${astToString(ast.pred)} ${astToString(ast.body)}`;
          case ASTKind.FUNCCALL:      return `${ast.functionName}(${astToString(ast.parameters)})`;
          case ASTKind.FUNCDECL:      return `${ast.name}(${astToString(ast.parameters)}) {${astToString(ast.body)}}`;
          case ASTKind.IF:            return `T: ${astToString(ast.truePath)} F: ${astToString(ast.falsePath)}`;
          case ASTKind.LOGICBINOP:    return `${astToString(ast.exp1)} ${ast.op} ${astToString(ast.exp2)}`;
          case ASTKind.NOT:           return astToString(ast.exp);
          case ASTKind.PARAMETER:     return `${ast.name} : ${ast.byReference ? "REF" : "VAL"}`;
          case ASTKind.PRINT:         return astToString(ast.value);
          case ASTKind.RETURN:        return astToString(ast.value);
          case ASTKind.VARIABLE:      return ast.name;
          case ASTKind.WHILE:         return `${astToString(ast.pred)} ${astToString(ast.body)}`; }
      })(ast) +
      ")"
    );
  }
}
