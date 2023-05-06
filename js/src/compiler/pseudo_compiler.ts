import { ByteCode, OpCode } from "./opcodes.ts";
import {
  ArithmeticBinOp,
  ArrayAssignment,
  ArrayComprehension,
  ArrayElementAssignment,
  ArrayIndex,
  Assignment,
  AST,
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
} from "./pseudo_types.ts";

export class ASTCompiler {
  bytecode: Array<ByteCode> = [];
  labelId = 0;

  static compile(block: Block) {
    const comp = new this();
    comp.visitBlock(block);
    return comp.bytecode;
  }

  createOp(op: OpCode, payload: ByteCode["payload"], ast: Exclude<AST, Block | Parameter[]>) {
    this.bytecode.push({ opCode: op, payload, ast });
  }

  visitDebug(ast: Debug) {
    this.createOp(OpCode.DEBUG, null, ast);
  }

  /* Expressions */
  visitArithmeticBinOp(ast: ArithmeticBinOp) {
    this.visitExpression(ast.exp1);
    this.visitExpression(ast.exp2);

    this.createOp(OpCode.CALC, ast.op, ast);
  }

  visitComparison(ast: Comparison) {
    this.visitExpression(ast.exp1);
    this.visitExpression(ast.exp2);

    this.createOp(OpCode.COMP, ast.op, ast);
  }

  visitLogicBinOp(ast: LogicBinOp) {
    this.visitExpression(ast.exp1);
    this.visitExpression(ast.exp2);

    this.createOp(OpCode.LOGIC, ast.op, ast);
  }

  visitArrayComprehension(ast: ArrayComprehension) {
    ast.exps.forEach((e) => this.visitExpression(e));
    this.createOp(OpCode.VALARR, ast.exps.length, ast);
  }

  visitArrayIndex(ast: ArrayIndex) {
    //this.visitVariable(ast.variable);
    this.visitExpression(ast.index);
    this.createOp(
      ast.variable.isReference ? OpCode.ARRADDR : OpCode.GETARR,
      ast.variable.name,
      ast,
    );
  }

  visitFunctionCall(ast: FunctionCall) {
    ast.parameters.forEach((e) => this.visitExpression(e));
    this.createOp(OpCode.CALL, ast.functionName, ast);
  }

  visitNot(ast: Not) {
    this.visitExpression(ast.exp);
    this.createOp(OpCode.NOT, null, ast);
  }

  visitAtom(ast: Atom) {
    this.createOp(OpCode.PUSH, ast.value, ast);
  }

  visitVariable(ast: Variable) {
    this.createOp(ast.isReference ? OpCode.ADDRESS : OpCode.GETVAR, ast.name, ast);
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
    this.createOp(OpCode.MKARR, ast.variable.name, ast);
    //this.createOp(OpCode.SETVAR, ast.variable.name, ast);
  }

  visitArrayElementAssignment(ast: ArrayElementAssignment) {
    this.visitExpression(ast.value);
    this.visitExpression(ast.arrayIndex.index);
    this.createOp(OpCode.SETARR, ast.arrayIndex.variable.name, ast);
  }

  visitAssignment(ast: Assignment) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.SETVAR, ast.variable.name, ast);
  }

  visitFor(ast: For) {
    const label = ++this.labelId;

    const varName = ast.variable.name;

    this.createOp(OpCode.ESCOPE, null, ast);

    // From...
    this.visitExpression(ast.from);
    this.createOp(OpCode.SETVAR, varName, ast);

    // To...
    this.createOp(OpCode.LABEL, `for_${label}`, ast);

    this.createOp(OpCode.GETVAR, varName, ast);
    this.visitExpression(ast.to);
    this.createOp(OpCode.COMP, "<=", ast);

    this.createOp(OpCode.FJMP, `for_end_${label}`, ast);

    this.visitBlock(ast.body);

    // var := var + 1
    this.createOp(OpCode.GETVAR, varName, ast);
    this.createOp(OpCode.PUSH, 1, ast);
    this.createOp(OpCode.CALC, "+", ast);
    this.createOp(OpCode.SETVAR, varName, ast);

    this.createOp(OpCode.JMP, `for_${label}`, ast);
    this.createOp(OpCode.LABEL, `for_end_${label}`, ast);
    this.createOp(OpCode.LSCOPE, null, ast);
  }

  visitDoWhile(ast: DoWhile) {
    const label = ++this.labelId;

    this.createOp(OpCode.LABEL, `do_while_${label}`, ast);

    this.visitBlock(ast.body);

    this.visitExpression(ast.pred);

    this.createOp(OpCode.TJMP, `do_while_${label}`, ast);
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
      this.createOp(OpCode.MKREF, ast.name, ast);
    } else {
      this.createOp(OpCode.SETVAR, ast.name, ast);
    }
  }

  visitFunctionDeclaration(ast: FunctionDeclaration) {
    this.createOp(OpCode.JMP, `${ast.name}_end`, ast);
    this.createOp(OpCode.LABEL, ast.name, ast);

    this.createOp(OpCode.ESCOPE, "func", ast);

    Array.from(ast.parameters)
      .reverse()
      .forEach((p) => this.visitParameter(p));

    for (const stmt of ast.body) {
      this.visitStatement(stmt);
    }

    this.createOp(OpCode.LSCOPE, null, ast);

    this.createOp(OpCode.RETURN, null, ast);

    this.createOp(OpCode.LABEL, `${ast.name}_end`, ast);
  }

  visitIf(ast: If) {
    const headId = ++this.labelId;

    // Head
    this.visitExpression(ast.headBranch.pred);
    this.createOp(OpCode.FJMP, `else_${headId}`, ast);

    this.visitBlock(ast.headBranch.body);
    this.createOp(OpCode.JMP, `if_end_${headId}`, ast);

    // Else If
    this.createOp(OpCode.LABEL, `else_${headId}`, ast);
    for (const elIf of ast.elIfs) {
      const label = ++this.labelId;

      this.visitExpression(elIf.pred);
      this.createOp(OpCode.FJMP, `if_else_${label}`, ast);

      this.visitBlock(elIf.body);

      this.createOp(OpCode.JMP, `if_end_${headId}`, ast);
      this.createOp(OpCode.LABEL, `if_else_${label}`, ast);
    }

    // Else
    if (ast.elseBranch) {
      this.visitBlock(ast.elseBranch);
    }

    this.createOp(OpCode.LABEL, `if_end_${headId}`, ast);
  }

  visitBlock(ast: Block) {
    this.createOp(OpCode.ESCOPE, null, ast[0]);

    for (const stmt of ast) {
      this.visitStatement(stmt);
    }

    this.createOp(OpCode.LSCOPE, null, ast[ast.length - 1]);
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
        return this.createOp(OpCode.VOID, null, ast);
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
        throw new Error(`Unhandled kind: ${ASTKind[ast.kind]}`);
    }
  }

  visitPrint(ast: Print) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.PRINT, null, ast);
  }

  visitReturn(ast: Return) {
    this.visitExpression(ast.value);
    this.createOp(OpCode.RETURN, "exp", ast);
  }

  visitWhile(ast: While) {
    const label = ++this.labelId;

    this.createOp(OpCode.LABEL, `wpred_${label}`, ast);

    this.visitExpression(ast.pred);

    this.createOp(OpCode.FJMP, `wend_${label}`, ast);

    this.visitBlock(ast.body);

    this.createOp(OpCode.JMP, `wpred_${label}`, ast);

    this.createOp(OpCode.LABEL, `wend_${label}`, ast);
  }
}
