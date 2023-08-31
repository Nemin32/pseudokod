import { IAST, ITokenToASTParser } from "../interfaces/IParser.ts";
import { IToken, ITokenizer, TokenType as TT } from "../interfaces/ITokenizer.ts";
import * as ASTKinds from "../interfaces/astkinds.ts";
import { AtomValue } from "../interfaces/astkinds.ts";
import { Tokenizer } from "./tokenizer.ts";

type ParseResult<T extends ASTKinds.ASTKind> = IAST<T>; //{ token: IToken | null; kind: T } | null;

class EOFError extends Error {
  constructor() {
    super("Ran out of tokens while parsing.");
  }
}

class MatchError extends Error {}

class Parser implements ITokenToASTParser {
  private input: IToken[] = [];
  private index = 0;

  peek(): IToken {
    if (this.index >= this.input.length) throw new EOFError();
    return this.input[this.index];
  }

  eat(): IToken {
    if (this.index >= this.input.length) throw new EOFError();
    return this.input[this.index++];
  }

  matchT(type: TT): IToken {
    const token = this.eat();
    if (token.type !== type)
      throw new MatchError(`${token.lexeme}: Expected ${TT[type]}, got ${TT[token.type]}.`);

    return token;
  }

  maybe(type: TT): IToken | null {
    const prevIdx = this.index;

    try {
      return this.matchT(type);
    } catch (e) {
      this.index = prevIdx;
      return null;
    }
  }

  many<T>(fn: () => T): T[] {
    const bind = fn.bind(this);
    const collection = [];

    while (true) {
      const prevIdx = this.index;

      try {
        collection.push(bind());
      } catch (e) {
        this.index = prevIdx;
        return collection;
      }
    }
  }

  sepBy<T>(fn: () => T, sep: () => unknown): T[] {
    const bindFn = fn.bind(this);
    const bindSep = sep.bind(this);

    const collection = [];

    while (true) {
      let prevIdx = this.index;

      try {
        collection.push(bindFn());

        prevIdx = this.index;
        bindSep();
      } catch (e) {
        this.index = prevIdx;
        return collection;
      }
    }
  }

  tryParse<T extends ASTKinds.ASTKind>(fn: () => ParseResult<T>): ParseResult<T> | null {
    const prevIdx = this.index;

    try {
      return fn.call(this);
    } catch (e) {
      this.index = prevIdx;
      return null;
    }
  }

  mk<T extends ASTKinds.ASTKind>(token: IToken | null, kind: T): ParseResult<T> {
    return {
      token,
      kind,
    };
  }

  // --- STATEMENTS ---

  statement(): ParseResult<ASTKinds.Statement> {
    const parsers = [
      this.print,
      this.assignment,
      this.while,
      this.funcDecl,
      this.for,
      this.return,
      this.if,
    ];

    for (const parser of parsers) {
      const value = this.tryParse(parser as () => ParseResult<ASTKinds.Statement>);
      if (value) return value;
    }

    throw new MatchError();
  }

  return(): ParseResult<ASTKinds.Return> {
    const tok = this.matchT(TT.VISSZA);
    const expr = this.expression();

    return this.mk(tok, {
      tag: "return",
      expr,
    });
  }

  elseIf() {
    this.matchT(TT.KULONBEN);
    this.matchT(TT.HA);
    const pred = this.expression();
    this.matchT(TT.AKKOR);
    const branch = this.block();

    return { pred, branch };
  }

  if(): ParseResult<ASTKinds.If> {
    const ha = this.matchT(TT.HA);
    const pred = this.expression();
    this.matchT(TT.AKKOR);
    const body = this.block();

    const elif_path = [];
    while (true) {
      const prevIdx = this.index;

      try {
        elif_path.push(this.elseIf());
      } catch (e) {
        this.index = prevIdx;
        break;
      }
    }

    let false_path = null;
    if (this.maybe(TT.KULONBEN)) {
      false_path = this.block();
    }

    this.matchT(TT.ELAGAZAS);
    this.matchT(TT.VEGE);

    return this.mk(ha, {
      tag: "if",
      main_path: { pred, branch: body },
      elif_path,
      false_path,
    });
  }

  for(): ParseResult<ASTKinds.For> {
    const ciklus = this.matchT(TT.CIKLUS);
    const variable = this.variable();

    this.matchT(TT.NYIL);
    const num1 = this.expression();
    this.matchT(TT.FORSTART);

    const num2 = this.expression();
    this.matchT(TT.FOREND);

    const body = this.block();

    this.matchT(TT.CIKLUS);
    this.matchT(TT.VEGE);

    return this.mk(ciklus, {
      tag: "for",
      from: num1,
      to: num2,
      variable,
      body,
    });
  }

  while(): ParseResult<ASTKinds.While> {
    const start = this.matchT(TT.CIKLUS);

    const pre = this.maybe(TT.AMIG);
    let predicate: ParseResult<ASTKinds.Expression> = null as any;

    if (pre) {
      predicate = this.expression();
    }

    const body = this.block();

    if (pre) {
      this.matchT(TT.CIKLUS);
      this.matchT(TT.VEGE);
    } else {
      this.matchT(TT.AMIG);
      predicate = this.expression();
    }

    return this.mk(start, {
      tag: "while",
      body,
      predicate,
      postPred: !pre,
    });
  }

  param(): ParseResult<ASTKinds.Parameter> {
    const variable = this.variable();
    this.matchT(TT.COLON);
    const byRef = this.maybe(TT.CIMSZERINT) != null;
    const type = this.matchT(TT.TYPE);

    return this.mk(variable.token, {
      tag: "param",
      byRef,
      name: variable,
      type: type.lexeme,
    });
  }

  funcDecl(): ParseResult<ASTKinds.FunctionDeclaration> {
    const fgv = this.matchT(TT.FUGGVENY);
    const name = this.matchT(TT.FUNCNAME);
    this.matchT(TT.OPAREN);
    const parameters = this.sepBy(this.param, () => this.matchT(TT.COMMA));

    this.matchT(TT.CPAREN);

    const body = this.block();

    this.matchT(TT.FUGGVENY);
    this.matchT(TT.VEGE);

    console.log("eddig");
    return this.mk(fgv, {
      tag: "funcdecl",
      body,
      name: name.lexeme,
      parameters,
    });
  }

  assignment(): ParseResult<ASTKinds.Assignment> {
    const variable = this.tryParse(this.variable) ?? this.arrayIndex();
    this.matchT(TT.NYIL);
    const expr = this.expression();

    return this.mk(variable.token, {
      tag: "assign",
      value: expr,
      variable,
    });
  }

  print(): ParseResult<ASTKinds.Print> {
    const print = this.matchT(TT.KIIR);
    const expr = this.expression();

    return this.mk(print, {
      tag: "print",
      expr,
    });
  }

  block(): ParseResult<ASTKinds.Block> {
    const stmts = this.many(this.statement);
    return this.mk(null, {
      tag: "block",
      statements: stmts,
    });
  }
  // --- EXPRESSIONS ---

  expression(): ParseResult<ASTKinds.Expression> {
    const parsers = [this.log_binop, this.arrayIndex, this.funcCall, this.parenExpr];

    for (const parser of parsers) {
      const value = this.tryParse(parser as () => ParseResult<ASTKinds.Expression>);
      if (value) return value;
    }

    throw new MatchError();
  }

  arrayIndex(): ParseResult<ASTKinds.ArrayIndex> {
    const variable = this.variable();
    this.matchT(TT.OBRACKET);
    const index = this.expression();
    this.matchT(TT.CBRACKET);

    return this.mk(variable.token, {
      tag: "arrindex",
      index,
      variable,
    });
  }

  funcCall(): ParseResult<ASTKinds.FunctionCall> {
    const funcName = this.matchT(TT.FUNCNAME);
    this.matchT(TT.OPAREN);
    const args = this.sepBy(this.expression, () => this.matchT(TT.COMMA));
    this.matchT(TT.CPAREN);

    return this.mk(funcName, {
      tag: "funccall",
      arguments: args,
      name: funcName.lexeme,
    });
  }

  atom(): ParseResult<ASTKinds.Atom> {
    const parseValue = (val: string): AtomValue => {
      if (val === "igaz" || val === "Igaz") return true;
      if (val === "hamis" || val === "Hamis") return false;
      if (val === "0" || !isNaN(Number(val))) return parseInt(val);
      return val;
    };

    const token = this.eat();

    if ([TT.NUMBER, TT.STRING, TT.BOOLEAN].includes(token.type)) {
      return this.mk(token, {
        tag: "atom",
        value: parseValue(token.lexeme),
      });
    }

    throw new MatchError();
  }

  variable(): ParseResult<ASTKinds.Variable> {
    const tok = this.matchT(TT.SYMBOL);
    return (
      tok &&
      this.mk(tok, {
        tag: "variable",
        name: tok.lexeme,
      })
    );
  }

  parenExpr(): ParseResult<ASTKinds.Expression> {
    this.matchT(TT.OPAREN);
    const expr = this.expression();
    this.matchT(TT.CPAREN);

    return expr;
  }

  // --- BINOPS ---

  private mk_binop(
    lexemes: string[],
    next: () => ParseResult<ASTKinds.Expression>,
  ): () => ParseResult<ASTKinds.Expression> {
    return (): ParseResult<ASTKinds.Expression> => {
      const fn = next.bind(this);
      const lhs = fn();
      const prevIdx = this.index;
      const op = this.maybe(TT.BINOP);
      const rhs = this.tryParse(fn);

      if (!rhs || !op || !lexemes.includes(op.lexeme)) {
        this.index = prevIdx;
        return lhs;
      }

      return this.mk(op, {
        tag: "binop",
        lhs,
        rhs,
      });
    };
  }

  primary() {
    const result =
      this.tryParse(this.parenExpr) ??
      this.tryParse(this.variable) ??
      this.tryParse(this.arrayIndex) ??
      this.tryParse(this.atom);

    if (result) return result;

    throw new MatchError();
  }

  add_binop = this.mk_binop(["+", "-"], this.primary);
  mul_binop = this.mk_binop(["*", "/", "mod"], this.add_binop);
  com_binop = this.mk_binop([">", "<", "=", "<=", ">=", "=/="], this.mul_binop);
  log_binop = this.mk_binop(["és", "vagy"], this.com_binop);

  // ---

  parse(input: IToken[]): IAST<ASTKinds.Block> {
    this.input = input;
    this.index = 0;

    return this.block();
  }
}

const tok: ITokenizer = new Tokenizer();
const parser = new Parser();

const tokens = tok
  .tokenize(`
függvény LNKO(m : egész, n : egész)
  r <- m mod n
  
  ciklus amíg r =/= 0
    m <- n
    n <- r
    r <- m mod n  
  ciklus vége

  vissza n
függvény vége

kiír LNKO(15, 33)
`)
//const tokens = tok.tokenize("r <- 5 + 5
.filter((t) => t.type !== TT.WHITESPACE);
console.log(tokens.map((t) => ({ name: t.lexeme, type: TT[t.type] })));

const start = performance.now();
parser.input = tokens;
parser.index = 0;
const parse = parser.funcDecl();
console.log(parse);

const end = performance.now();

console.log(end - start);
