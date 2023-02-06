import { ByteCode, OpCode } from "./opcodes";
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
  Block,
  Statement,
  ASTKind,
  Parameter,
} from "./pseudo_types";

export class ASTCompiler {
  bytecode: Array<ByteCode> = [];
  labelId = 0;

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

  visitFunctionCall(ast: FunctionCall) {
    ast.parameters.forEach((e) => this.visitExpression(e));
    this.createOp(OpCode.CALL, ast.functionName);
  }

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
      case ASTKind.ATOM:     return this.visitAtom(ast);
      case ASTKind.VARIABLE: return this.visitVariable(ast);
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
      case ASTKind.ATOM:       return this.visitValue(ast);
      case ASTKind.CALCBINOP:  return this.visitArithmeticBinOp(ast);
      case ASTKind.COMPBINOP:  break;
      case ASTKind.FUNCCALL:   return this.visitFunctionCall(ast);
      case ASTKind.LOGICBINOP: break;
      case ASTKind.NOT:        return this.visitNot(ast);
      case ASTKind.VARIABLE:   return this.visitValue(ast);

      default: break;
    }
  }

  visitParameter(ast: Parameter) {
    this.createOp(OpCode.SETVAR, ast.name);
  }

  visitFunctionDeclaration(ast: FunctionDeclaration) {
    this.createOp(OpCode.JMP, ast.name + "_end");
    this.createOp(OpCode.LABEL, ast.name);

    Array.from(ast.parameters)
      .reverse()
      .forEach((p) => this.visitParameter(p));

    this.visitBlock(ast.body);

    this.createOp(OpCode.RETURN, null);

    this.createOp(OpCode.LABEL, ast.name + "_end");
  }

  visitIf(ast: If) {
    this.labelId++;

    this.visitExpression(ast.pred);

    this.createOp(OpCode.FJMP, "if_" + this.labelId);

    this.visitBlock(ast.truePath);

    this.createOp(OpCode.LABEL, "if_" + this.labelId);

    this.visitBlock(ast.falsePath);
  }

  visitBlock(ast: Block) {
    for (const stmt of ast) {
      this.visitStatement(stmt);
    }
  }

  visitStatement(ast: Statement) {
    switch (ast.kind) {
      case ASTKind.ARRASSIGN:     this.visitArrayAssignment(ast); break;
      case ASTKind.ARRELEMASSIGN: this.visitArrayElementAssignment(ast); break;
      case ASTKind.ASSIGNMENT:    this.visitAssignment(ast); break;
      case ASTKind.ATOM:          this.visitAtom(ast); break;
      case ASTKind.CALCBINOP:     this.visitArithmeticBinOp(ast); break;
      case ASTKind.COMPBINOP:     this.visitComparison(ast); break;
      case ASTKind.DOWHILE:       this.visitDoWhile(ast); break;
      case ASTKind.FUNCCALL:      this.visitFunctionCall(ast); break;
      case ASTKind.FUNCDECL:      this.visitFunctionDeclaration(ast); break;
      case ASTKind.IF:            this.visitIf(ast); break;
      case ASTKind.LOGICBINOP:    this.visitLogicBinOp(ast); break;
      case ASTKind.NOT:           this.visitNot(ast); break;
      case ASTKind.PRINT:         this.visitPrint(ast); break;
      case ASTKind.RETURN:        this.visitReturn(ast); break;
      case ASTKind.VARIABLE:      this.visitVariable(ast); break;
      case ASTKind.WHILE:         this.visitWhile(ast); break;
      default: break;
    }
  }

  visitPrint(ast: Print) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.PRINT, null);
  }

  visitReturn(ast: Return) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.RETURN, null);
  }

  visitWhile(ast: While) {
    this.labelId++;

    this.createOp(OpCode.LABEL, "wpred_" + this.labelId);

    this.visitExpression(ast.pred);

    this.createOp(OpCode.FJMP, "wend_" + this.labelId);

    this.visitBlock(ast.body);

    this.createOp(OpCode.JMP, "wpred_" + this.labelId);

    this.createOp(OpCode.LABEL, "wend_" + this.labelId);
  }
}
