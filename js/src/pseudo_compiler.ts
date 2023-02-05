import { ByteCode, OpCode } from "./opcodes.ts";
import {
  ArithmeticBinOp,
  Comparison,
  FunctionCall,
  LogicBinOp,
  Not,
  Value,
  ArrayAssignment,
  ArrayElementAssignment,
  Assignment,
  DoWhile,
  Expression,
  FunctionDeclaration,
  If,
  Print,
  Return,
  While,
  Variable,
  Atom,
} from "./pseudo_types.ts";

export class ASTCompiler {
  bytecode: Array<ByteCode> = [];

  createOp(op: OpCode, payload: any) {
    this.bytecode.push({ opCode: op, payload });
  }

  /* Expressions */
  visitArithmeticBinOp(ast: ArithmeticBinOp) {
    this.visitExpression(ast.exp1);
    this.visitExpression(ast.exp2);

    this.createOp(OpCode.CALC, ast.op);
  }

  visitComparison(ast: Comparison) {
    this.visitExpression(ast.exp1);
    this.visitExpression(ast.exp2);

    this.createOp(OpCode.COMP, ast.op);
  }

  visitLogicBinOp(ast: LogicBinOp) {
    this.visitExpression(ast.exp1);
    this.visitExpression(ast.exp2);

    this.createOp(OpCode.LOGIC, ast.op);
  }

  visitFunctionCall(ast: FunctionCall) {}

  visitNot(ast: Not) {
    this.visitExpression(ast.exp);
    this.createOp(OpCode.NOT, null);
  }

  visitAtom(ast: Atom) {
    this.createOp(OpCode.PUSH, ast.value);
  }

  visitVariable(ast: Variable) {
    this.createOp(OpCode.GETVAR, ast.name);
  }

  visitValue(ast: Value) {
    switch (ast.kind) {
      case "atom":
        return this.visitAtom(ast);
      case "variable":
        return this.visitVariable(ast);
    }
  }

  /* Statements */
  visitArrayAssignment(ast: ArrayAssignment) {}
  visitArrayElementAssignment(ast: ArrayElementAssignment) {}

  visitAssignment(ast: Assignment) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.SETVAR, ast.variable.name);
  }

  visitDoWhile(ast: DoWhile) {}

  visitExpression(ast: Expression) {
    switch (ast.kind) {
      case "binop":
        return this.visitArithmeticBinOp(ast);
      case "atom":
        return this.visitValue(ast);
      case "not":
        return this.visitNot(ast);
    }
  }

  visitFunctionDeclaration(ast: FunctionDeclaration) {}
  visitIf(ast: If) {}

  visitPrint(ast: Print) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.PRINT, null);
  }

  visitReturn(ast: Return) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.RETURN, null);
  }

  visitWhile(ast: While) {}
}
