import PseudoCodeVisitor from "./libs/PseudoCodeVisitor.js";
import { DebugPrompt } from "./DebugPrompt.js";
import { Stack } from "./Stack.js";

export class PseudoVisitor extends PseudoCodeVisitor {
  constructor(outputFunc, varOutput) {
    super();

    this.functions = new Map();
    this.paramNames = new Map();
    this.variableStack = new Stack(this.paramNames);
    this.debugger = new DebugPrompt(this.variableStack, this.paramNames);

    this.outputFunc = outputFunc ?? console.log;
    this.variableOutput = varOutput ?? console.log;
  }

  visitDebug(ctx) {
    this.debugger.prompt();
  }

  visitVars(ctx) {
    this.variableOutput(this.variableStack.head, this.variableStack.previousHeads);
  }

  visitDebugPrintStatement(ctx) {
    this.outputFunc(this.visit(ctx.expression(0)));
  }

  visitStatement(ctx) {
    return this.visit(ctx.getChild(0));
  }

  visitBody(ctx) {
    const statements = ctx.statement();

    if (statements !== null) {
      for (let statement of statements) {
        const value = this.visit(statement);

        if (value !== null && value !== undefined) {
          return value;
        }
      }
    }

    return null;
  }

  visitSimpleIfStatement(ctx) {
    const exp = ctx.expression();
    const predicate = this.visit(exp);

    if (predicate) {
      return this.visit(ctx.body());
    }
  }

  visitIfElseStatement(ctx) {
    const exp = ctx.expression();
    const predicate = this.visit(exp);

    if (predicate) {
      return this.visit(ctx.body());
    }
    else {
      return this.visit(ctx.elseBranch());
    }
  }

  visitIfElseIfStatement(ctx) {
    const exp = ctx.expression();
    const predicate = this.visit(exp);

    if (predicate) {
      return this.visit(ctx.body());
    }
    else {
      const elifBranches = ctx.elseIfBranch();

      for (let elifBranch of elifBranches) {
        const altPred = this.visit(elifBranch.expression());

        if (altPred) {
          return this.visit(elifBranch.body());
        }
      }

      return this.visit(ctx.elseBranch());
    }
  }

  visitElseBranch(ctx) {
    return this.visit(ctx.body());
  }

  visitForStatement(ctx) {
    const varname = ctx.variable().getText();
    const start = this.visit(ctx.expression(0));
    const end = this.visit(ctx.expression(1));
    const body = ctx.body();

    this.variableStack.enterBasicScope();

    this.variableStack.set(varname, start);

    let value = start;
    while (value < end) {
      this.visit(body);
      value = this.variableStack.get(varname);
      this.variableStack.set(varname, value + 1);
    }

    this.variableStack.leaveBasicScope();
  }

  visitWhileStatement(ctx) {
    const exp = ctx.expression();
    const body = ctx.body();

    while (true) {
      if (this.visit(exp) == false) {
        return null;
      }

      this.variableStack.enterBasicScope();
      const value = this.visit(body);
      this.variableStack.leaveBasicScope();

      if (value) {
        return value;
      }
    }
  }

  visitDoWhileStatement(ctx) {
    const exp = ctx.expression();
    const body = ctx.body();

    while (true) {
      this.variableStack.enterBasicScope();
      const value = this.visit(body);
      this.variableStack.leaveBasicScope();

      if (value) {
        return value;
      }

      if (this.visit(exp) == false) {
        return null;
      }
    }
  }

  visitMethodCallStatement(ctx) {
    let _ = this.visitFunctionCall(ctx);
    return null;
  }

  visitFunctionDeclarationWithParameters(ctx) {
    const parameters = ctx.parameterWithType().map(param => this.visit(param));
    const funcName = ctx.functionName().getText();
    const funcBody = ctx.body(0);

    this.functions.set(funcName, funcBody);
    this.paramNames.set(funcName, parameters);
  }

  visitParameterWithType(ctx) {
    return { name: ctx.variable().getText(), reference: ctx.CIMSZERINT() !== null, type: ctx.type().getText() };
  }

  visitFunctionDeclarationWithoutParameters(ctx) {
    const funcName = ctx.functionName().getText();
    const funcBody = ctx.body(0);

    this.functions.set(funcName, funcBody);
  }

  visitFunctionCallExpression(ctx) {
    return this.visitFunctionCall(ctx.functionCall(0));
  }

  visitFunctionCall(ctx) {
    const funcName = ctx.functionName().getText();
    const funcBody = this.functions.get(funcName);

    const parameters = ctx.parameters().expression().map(param => this.visit(param));

    // console.log(parameters)
    if (funcBody) {
      //this.variableStack.newFunctionFrame(funcName, parameters)
      this.variableStack.enterFunctionScope(funcName, parameters);
      const value = this.visitBody(funcBody);
      this.variableStack.leaveFunctionScope();
      //this.variableStack.dropFrame()
      return value;
    } else {
      this.outputFunc("Nincs ilyen fgv: " + funcName);
    }
  }

  visitReturnStatement(ctx) {
    return this.visit(ctx.expression(0));
  }

  visitVariable(ctx) {
    const varname = ctx.getText();
    return this.variableStack.get(varname);
  }

  visitArrayElementAssignmentStatement(ctx) {
    const variable = this.visitVariable(ctx.variable());
    const index = Number(this.visit(ctx.expression(0))) - 1; // Pszeudokód 1-től kezdi.
    const value = this.visit(ctx.expression(1));

    variable[index] = value;
  }

  visitArrayAssignmentStatement(ctx) {
    const varname = ctx.variable().getText();
    const _type = ctx.type().getText();
    const _length = this.visit(ctx.expression())

    this.variableStack.set(varname, [])
  }

  visitAssignmentStatement(ctx) {
    const varname = ctx.variable().getText();
    const value = this.visit(ctx.expression());

    this.variableStack.set(varname, value);
  }

  visitOrExpression(ctx) {
    return this.visit(ctx.expression(0)) || this.visit(ctx.expression(1));
  }

  visitAndExpression(ctx) {
    return this.visit(ctx.expression(0)) && this.visit(ctx.expression(1));
  }

  visitValueExpression(ctx) {
    return this.visitValue(ctx.getChild(0));
  }

  visitArrayIndex(ctx) {
    const variable = this.visit(ctx.variable())
    const index = Number(this.visit(ctx.expression())) - 1

    return variable[index]
  }

  visitValue(ctx) {
    return this.visit(ctx.getChild(0));
  }

  visitAtom(ctx) {
    return this.visit(ctx.getChild(0));
  }

  visitArrayShorthand(ctx) {
    return [...ctx.expression()].map((exp) => this.visit(exp))
  }

  visitBool(ctx) {
    return ctx.getText() == "igaz";
  }

  visitNumber(ctx) {
    return Number(ctx.getText());
  }

  visitString(ctx) {
    return String(ctx.getText().replaceAll("\"", ""));
  }

  visitComparisonExpression(ctx) {
    const comparer = ctx.COMPARISON().getText();

    const exp1 = this.visit(ctx.expression(0));
    const exp2 = this.visit(ctx.expression(1));

    switch (comparer) {
      case "<":
        return exp1 < exp2;
      case ">":
        return exp1 > exp2;
      case "<=":
        return exp1 <= exp2;
      case ">=":
        return exp1 >= exp2;
      case "=":
        return exp1 === exp2;
      case "=/=":
        return exp1 !== exp2;
      default:
        throw new Error("Illegal operator found in comparison.");
    }
  }

  visitCalculationExpression(ctx) {
    const op = ctx.OPERATOR().getText();

    const exp1 = this.visit(ctx.expression(0));
    const exp2 = this.visit(ctx.expression(1));

    switch (op) {
      case "+":
        return exp1 + exp2;
      case "-":
        return exp1 - exp2;
      case "*":
        return exp1 * exp2;
      case "/":
        return exp1 / exp2;
      case "mod":
        return exp1 % exp2;
      default:
        throw new Error("Illegal operator found in calculation.");
    }
  }

  visitTerminal(ctx) {
    if (this.debugger.step)
      this.debugger.prompt();
    return super.visitTerminal(ctx);
  }
}
