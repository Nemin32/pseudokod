import PseudoCodeVisitor from "./libs/PseudoCodeVisitor.js";
import { DebugPrompt } from "./DebugPrompt.js";
import { TYPES, Value, Stack } from "./Stack.js";

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
    this.variableOutput(this.variableStack.variables, this.variableStack.scopeBounds);
  }

  visitDebugPrintStatement(ctx) {
    let exp = this.visit(ctx.expression());

    if (exp === null) {
      this.outputFunc("[üres]")
    } else if (exp.type !== TYPES.array) {
      this.outputFunc(exp.value);
    } else {
      this.outputFunc(exp.value.map((val) => val.value))
    }
  }

  visitStatement(ctx) {
    return this.visit(ctx.getChild(0));
  }

  visitBody(ctx) {
    const statements = ctx.statement();

    if (statements !== null) {
      this.variableStack.enterBasicScope()

      for (let statement of statements) {
        const value = this.visit(statement);

        if (value !== null && value !== undefined) {
          this.variableStack.leaveBasicScope()
          return value;
        }
      }

      this.variableStack.leaveBasicScope()
    }

    return null;
  }

  visitSimpleIfStatement(ctx) {
    const exp = ctx.expression();
    const predicate = this.visit(exp);

    if (predicate.type !== TYPES.boolean) {
      throw new Error("Nem boolean if-ben!");
    }

    if (predicate.value) {
      return this.visit(ctx.body());
    }
  }

  visitIfElseStatement(ctx) {
    const exp = ctx.expression();
    const predicate = this.visit(exp);

    if (predicate.type !== TYPES.boolean) {
      throw new Error("Nem boolean if-ben!");
    }

    if (predicate.value) {
      return this.visit(ctx.body());
    }
    else {
      return this.visit(ctx.elseBranch());
    }
  }

  visitIfElseIfStatement(ctx) {
    const exp = ctx.expression();
    const predicate = this.visit(exp);

    if (predicate.type !== TYPES.boolean) {
      throw new Error("Nem boolean if-ben!");
    }

    if (predicate.value) {
      return this.visit(ctx.body());
    }
    else {
      const elifBranches = ctx.elseIfBranch();

      for (let elifBranch of elifBranches) {
        const altPred = this.visit(elifBranch.expression());

        if (altPred.type !== TYPES.boolean) {
          throw new Error("Nem boolean elif ágban!");
        }

        if (altPred.value) {
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
    const body = ctx.body()
    const varname = ctx.variable().getText();
    const start = this.visit(ctx.expression(0)).safe_get(TYPES.number);
    const end = this.visit(ctx.expression(1)).safe_get(TYPES.number);

    this.variableStack.enterBasicScope()

    this.variableStack.set(varname, new Value(start, TYPES.number));

    while (true) {
      const iterator = this.variableStack.get(varname);

      if (iterator.value > end) {
        break;
      }

      const value = this.visitBody(body);

      if (value) {
        this.variableStack.leaveBasicScope()
        return value;
      }

      iterator.set(iterator.value + 1, iterator.type);
    }

    this.variableStack.leaveBasicScope()
  }

  visitWhileStatement(ctx) {
    const exp = ctx.expression();
    const body = ctx.body();

    while (true) {
      const pred = this.visit(exp).safe_get(TYPES.boolean)

      if (pred == false) {
        return null;
      }

      const value = this.visit(body);

      if (value) {
        return value;
      }
    }
  }

  visitDoWhileStatement(ctx) {
    const exp = ctx.expression();
    const body = ctx.body();

    while (true) {
      const value = this.visit(body);

      if (value) {
        return value;
      }

      const predicate = this.visit(exp).safe_get(TYPES.boolean)
      if (predicate == false) {
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

    if (funcBody) {
      this.variableStack.enterFunctionScope(funcName, parameters);
      const value = this.visitBody(funcBody);
      this.variableStack.leaveFunctionScope();
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
    const variable = this.visit(ctx.variable()).safe_get(TYPES.array)
    const index = this.visit(ctx.expression()).safe_get(TYPES.number) - 1

    return variable[index]
  }

  visitValue(ctx) {
    return this.visit(ctx.getChild(0));
  }

  visitAtom(ctx) {
    return this.visit(ctx.getChild(0));
  }

  visitArrayShorthand(ctx) {
    return new Value([...ctx.expression()].map((exp) => this.visit(exp)), TYPES.array)
  }

  visitBool(ctx) {
    return new Value(ctx.getText().toLowerCase() == "igaz", TYPES.boolean);
  }

  visitNumber(ctx) {
    return new Value(Number(ctx.getText()), TYPES.number);
  }

  visitString(ctx) {
    return new Value(String(ctx.getText().replaceAll("\"", "")), TYPES.string);
  }

  visitComparisonExpression(ctx) {
    const comparer = ctx.COMPARISON().getText();

    const exp1_raw = this.visit(ctx.expression(0));
    const exp2_raw = this.visit(ctx.expression(1));

    if (exp1_raw.type !== TYPES.number) {
      throw new Error("1. változó típusa nem szám!");
    }

    if (exp2_raw.type !== TYPES.number) {
      throw new Error("2. változó típusa nem szám!");
    }

    const exp1 = exp1_raw.value;
    const exp2 = exp2_raw.value;

    const value = (() => {
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
    })()

    return new Value(value, TYPES.boolean);
  }

  visitCalculationExpression(ctx) {
    const op = ctx.OPERATOR().getText();

    const exp1_raw = this.visit(ctx.expression(0));
    const exp2_raw = this.visit(ctx.expression(1));

    if (exp1_raw.type !== TYPES.number || exp2_raw.type !== TYPES.number) {
      throw new Error("A változó típusa nem szám!");
    }

    const exp1 = exp1_raw.value;
    const exp2 = exp2_raw.value;

    const result = (() => {
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
    })()

    return new Value(result, TYPES.number);
  }

  visitTerminal(ctx) {
    if (this.debugger.step)
      this.debugger.prompt();
    return super.visitTerminal(ctx);
  }
}
