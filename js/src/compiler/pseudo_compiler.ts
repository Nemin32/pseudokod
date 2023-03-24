import { ByteCode, OpCode } from "./opcodes.js";
import {
  ArithmeticBinOp,
  ArrayAssignment,
  ArrayComprehension,
  ArrayElementAssignment,
  ArrayIndex,
  Assignment,
  ASTKind,
  Atom,
  Block,
  Comparison,
  Debug,
  DoWhile,
  Expression,
  For,
  FunctionCall,
  FunctionDeclaration,
  If,
  LogicBinOp,
  Not,
  Parameter,
  Print,
  Return,
  Statement,
  Value,
  Variable,
  While,
} from "./pseudo_types.js";

export class ASTCompiler {
  bytecode: Array<ByteCode> = [];
  labelId = 0;

  static compile(block: Block) {
    const comp = new this();
    comp.visitBlock(block);
    return comp.bytecode;
  }

  createOp(op: OpCode, payload: ByteCode["payload"]) {
    this.bytecode.push({ opCode: op, payload });
  }

  visitDebug(_ast: Debug) {
    this.createOp(OpCode.DEBUG, null);
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

  visitArrayComprehension(ast: ArrayComprehension) {
    ast.exps.forEach((e) => this.visitExpression(e));
    this.createOp(OpCode.VALARR, ast.exps.length);
  }

  visitArrayIndex(ast: ArrayIndex) {
    //this.visitVariable(ast.variable);
    this.visitExpression(ast.index);
    this.createOp(ast.variable.isReference ? OpCode.ARRADDR : OpCode.GETARR, ast.variable.name);
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
    this.createOp(ast.isReference ? OpCode.ADDRESS : OpCode.GETVAR, ast.name);
  }

  visitValue(ast: Value) {
    switch (ast.kind) {
      case ASTKind.ATOM:
        return this.visitAtom(ast);
      case ASTKind.VARIABLE:
        return this.visitVariable(ast);
    }
  }

  /* Statements */
  visitArrayAssignment(ast: ArrayAssignment) {
    this.visitExpression(ast.length);
    this.createOp(OpCode.MKARR, ast.variable.name);
    //this.createOp(OpCode.SETVAR, ast.variable.name);
  }

  visitArrayElementAssignment(ast: ArrayElementAssignment) {
    this.visitExpression(ast.value);
    this.visitExpression(ast.arrayIndex.index);
    this.createOp(OpCode.SETARR, ast.arrayIndex.variable.name);
  }

  visitAssignment(ast: Assignment) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.SETVAR, ast.variable.name);
  }

  visitFor(ast: For) {
    const label = ++this.labelId;

    const varName = ast.variable.name;

    this.createOp(OpCode.ESCOPE, null);

    // From...
    this.visitExpression(ast.from);
    this.createOp(OpCode.SETVAR, varName);

    // To...
    this.createOp(OpCode.LABEL, "for_" + label);

    this.createOp(OpCode.GETVAR, varName);
    this.visitExpression(ast.to);
    this.createOp(OpCode.COMP, "<=");

    this.createOp(OpCode.FJMP, "for_end_" + label);

    this.visitBlock(ast.body);

    // var := var + 1
    this.createOp(OpCode.GETVAR, varName);
    this.createOp(OpCode.PUSH, 1);
    this.createOp(OpCode.CALC, "+");
    this.createOp(OpCode.SETVAR, varName);

    this.createOp(OpCode.JMP, "for_" + label);
    this.createOp(OpCode.LABEL, "for_end_" + label);
    this.createOp(OpCode.LSCOPE, null);
  }

  visitDoWhile(ast: DoWhile) {
    const label = ++this.labelId;

    this.createOp(OpCode.LABEL, "do_while_" + label);

    this.visitBlock(ast.body);

    this.visitExpression(ast.pred);

    this.createOp(OpCode.TJMP, "do_while_" + label);
  }

  visitExpression(ast: Expression) {
    switch (ast.kind) {
      case ASTKind.ATOM:
        return this.visitValue(ast);
      case ASTKind.CALCBINOP:
        return this.visitArithmeticBinOp(ast);
      case ASTKind.COMPBINOP:
        return this.visitComparison(ast);
      case ASTKind.FUNCCALL:
        return this.visitFunctionCall(ast);
      case ASTKind.LOGICBINOP:
        return this.visitLogicBinOp(ast);
      case ASTKind.NOT:
        return this.visitNot(ast);
      case ASTKind.VARIABLE:
        return this.visitValue(ast);
      case ASTKind.COMPREHENSION:
        return this.visitArrayComprehension(ast);
      case ASTKind.ARRINDEX:
        return this.visitArrayIndex(ast);

      default:
        break;
    }
  }

  visitParameter(ast: Parameter) {
    if (ast.byReference) {
      this.createOp(OpCode.MKREF, ast.name);
    } else {
      this.createOp(OpCode.SETVAR, ast.name);
    }
  }

  visitFunctionDeclaration(ast: FunctionDeclaration) {
    this.createOp(OpCode.JMP, ast.name + "_end");
    this.createOp(OpCode.LABEL, ast.name);

    this.createOp(OpCode.ESCOPE, "func");

    Array.from(ast.parameters)
      .reverse()
      .forEach((p) => this.visitParameter(p));

    for (const stmt of ast.body) {
      this.visitStatement(stmt);
    }

    this.createOp(OpCode.LSCOPE, null);

    this.createOp(OpCode.RETURN, null);

    this.createOp(OpCode.LABEL, ast.name + "_end");
  }

  visitIf(ast: If) {
    const headId = ++this.labelId;

    // Head
    this.visitExpression(ast.headBranch.pred);
    this.createOp(OpCode.FJMP, "else_" + headId);

    this.visitBlock(ast.headBranch.body);
    this.createOp(OpCode.JMP, "if_end_" + headId);

    // Else If
    this.createOp(OpCode.LABEL, "else_" + headId);
    for (const elIf of ast.elIfs) {
      const label = ++this.labelId;

      this.visitExpression(elIf.pred);
      this.createOp(OpCode.FJMP, "if_else_" + label);

      this.visitBlock(elIf.body);

      this.createOp(OpCode.JMP, "if_end_" + headId);
      this.createOp(OpCode.LABEL, "if_else_" + label);
    }

    // Else
    if (ast.elseBranch) {
      this.visitBlock(ast.elseBranch);
    }

    this.createOp(OpCode.LABEL, "if_end_" + headId);
  }

  visitBlock(ast: Block) {
    this.createOp(OpCode.ESCOPE, null);

    for (const stmt of ast) {
      this.visitStatement(stmt);
    }

    this.createOp(OpCode.LSCOPE, null);
  }

  visitStatement(ast: Statement) {
    switch (ast.kind) {
      case ASTKind.ARRASSIGN:
        return this.visitArrayAssignment(ast);
      case ASTKind.ARRELEMASSIGN:
        return this.visitArrayElementAssignment(ast);
      case ASTKind.ASSIGNMENT:
        return this.visitAssignment(ast);
      case ASTKind.ATOM:
        return this.visitAtom(ast);
      case ASTKind.CALCBINOP:
        return this.visitArithmeticBinOp(ast);
      case ASTKind.COMPBINOP:
        return this.visitComparison(ast);
      case ASTKind.DEBUG:
        return this.visitDebug(ast);
      case ASTKind.DOWHILE:
        return this.visitDoWhile(ast);
      case ASTKind.FOR:
        return this.visitFor(ast);
      case ASTKind.FUNCCALL: {
        this.visitFunctionCall(ast);
        return this.createOp(OpCode.VOID, null);
      }
      case ASTKind.FUNCDECL:
        return this.visitFunctionDeclaration(ast);
      case ASTKind.IF:
        return this.visitIf(ast);
      case ASTKind.LOGICBINOP:
        return this.visitLogicBinOp(ast);
      case ASTKind.NOT:
        return this.visitNot(ast);
      case ASTKind.PRINT:
        return this.visitPrint(ast);
      case ASTKind.RETURN:
        return this.visitReturn(ast);
      case ASTKind.VARIABLE:
        return this.visitVariable(ast);
      case ASTKind.WHILE:
        return this.visitWhile(ast);
      case ASTKind.COMPREHENSION:
        return this.visitArrayComprehension(ast);
      default:
        throw new Error("Unhandled kind: " + ASTKind[ast.kind]);
    }
  }

  visitPrint(ast: Print) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.PRINT, null);
  }

  visitReturn(ast: Return) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.RETURN, "exp");
  }

  visitWhile(ast: While) {
    const label = ++this.labelId;

    this.createOp(OpCode.LABEL, "wpred_" + label);

    this.visitExpression(ast.pred);

    this.createOp(OpCode.FJMP, "wend_" + label);

    this.visitBlock(ast.body);

    this.createOp(OpCode.JMP, "wpred_" + label);

    this.createOp(OpCode.LABEL, "wend_" + label);
  }
}
