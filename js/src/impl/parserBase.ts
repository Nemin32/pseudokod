import { IAST, ITokenToASTParser } from "../interfaces/IParser.ts";
import { IToken, ITokenizer, TokenType as TT } from "../interfaces/ITokenizer.ts";
import * as ASTKinds from "../interfaces/astkinds.ts";
import { AtomValue } from "../interfaces/astkinds.ts";
import { Tokenizer } from "./tokenizer.ts";

type ParseResult<T extends ASTKinds.ASTKind> = IAST<T> | null; //{ token: IToken | null; kind: T } | null;

class Parser implements ITokenToASTParser {
  private input: IToken[] = [];
  private index = 0;

  peek(): IToken | null {
    if (this.index >= this.input.length) return null;
    return this.input[this.index];
  }

  eat(): IToken | null {
    if (this.index >= this.input.length) return null;
    return this.input[this.index++];
  }

  matchT(type: TT): IToken | null {
    const token = this.eat();
    if (token?.type !== type) return null;

    return token;
  }
  
  maybe(type: TT): IToken | null {
    const prevIdx = this.index;

    const token = this.matchT(type);
    if (token) return token;

    this.index = prevIdx;
    return null;
  }

  tryParse<T extends ASTKinds.ASTKind>(fn: () => ParseResult<T> | null): ParseResult<T> | null {
    const prevIdx = this.index;
    const value = fn.call(this);

    if (value) return value;

    this.index = prevIdx;
    return null;
  }

  mk<T extends ASTKinds.ASTKind>(token: IToken | null, kind: T): ParseResult<T> {
    return {
      token,
      kind,
    };
  }

  // --- STATEMENTS ---

  statement(): ParseResult<ASTKinds.Statement> {
    const parsers = [this.for, this.return, this.if];

    for (const parser of parsers) {
      const value = this.tryParse(parser as () => ParseResult<ASTKinds.Statement>);
      if (value) return value;
    }

    return null;
  }

  return(): ParseResult<ASTKinds.Return> {
    const tok = this.matchT(TT.VISSZA);
    const expr = this.expression();
    if (!expr) return null;

    return this.mk(tok, {
      tag: "return",
      expr,
    });
  }

  elseIf() {
    if (!this.matchT(TT.KULONBEN) || !this.matchT(TT.HA)) return null;

    const pred = this.expression();
    if (!pred) return null;

    if (!this.matchT(TT.AKKOR)) return null;

    const branch = this.block();
    if (!branch) return null;

    return { pred, branch };
  }

  if(): ParseResult<ASTKinds.If> {
    const ha = this.matchT(TT.HA);
    if (!ha) return null;
    const pred = this.expression();
    if (!this.matchT(TT.AKKOR)) return null;
    const body = this.block();
    

    const elif_path = [];
    while (true) {
      const prevIdx = this.index;
      const elif = this.elseIf();

      if (elif) {
        elif_path.push(elif);
      } else {
        this.index = prevIdx;
        break;
      }
    }

    let false_path = null;
    if (this.maybe(TT.KULONBEN)) {
      false_path = this.block();
    }

    if (!this.matchT(TT.ELAGAZAS)) return null;
    if (!this.matchT(TT.VEGE)) return null;

    if (!pred || !body) return null;

    return this.mk(ha, {
      tag: "if",
      main_path: { pred, branch: body },
      elif_path,
      false_path,
    });
  }

  for(): ParseResult<ASTKinds.For> {
    const ciklus = this.matchT(TT.CIKLUS);
    if (!ciklus) return null;
    const variable = this.variable();
    if (!variable) return null;

    if (!this.matchT(TT.NYIL)) return null;
    const num1 = this.expression();
    if (!num1) return null;
    if (!this.matchT(TT.FORSTART)) return null;

    const num2 = this.expression();
    if (!num2) return null;
    if (!this.matchT(TT.FOREND)) return null;

    const body = this.block();
    if (!body) return null;

    if (!this.matchT(TT.CIKLUS)) return null;
    if (!this.matchT(TT.VEGE)) return null;

    return this.mk(ciklus, {
      tag: "for",
      from: num1,
      to: num2,
      body,
    });
  }

  block(): ParseResult<ASTKinds.Block> {
    const ret = [];

    while (true) {
      const stmt: ParseResult<ASTKinds.Statement> = this.tryParse(this.statement);
      if (stmt) {
        ret.push(stmt);
      } else {
        return this.mk(null, {
          tag: "block",
          statements: ret,
        });
      }
    }
  }

  // --- EXPRESSIONS ---

  expression(): ParseResult<ASTKinds.Expression> {
    const parsers = [this.log_binop, this.atom];

    for (const parser of parsers) {
      const value = this.tryParse(parser as () => ParseResult<ASTKinds.Expression>);
      if (value) return value;
    }

    return null;
  }

  atom(): ParseResult<ASTKinds.Atom> {
    const parseValue = (val: string): AtomValue => {
      if (val === "igaz" || val === "Igaz") return true;
      if (val === "hamis" || val === "Hamis") return false;
      if (val === "0" || !isNaN(Number(val))) return parseInt(val);
      return val;
    };

    const token = this.eat();
    if (!token) return null;

    if ([TT.NUMBER, TT.STRING, TT.BOOLEAN].includes(token.type)) {
      return this.mk(token, {
        tag: "atom",
        value: parseValue(token.lexeme),
      });
    }

    return null;
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
    if (!this.matchT(TT.OPAREN)) return null;
    const expr = this.expression();
    if (!this.matchT(TT.CPAREN)) return null;

    return expr;
  }

  // --- BINOPS ---

  private mk_binop(
    lexemes: string[],
    next: () => ParseResult<ASTKinds.Expression>,
  ): () => ParseResult<ASTKinds.Expression> {
    return () => {
      if (this.peek() === null) return null;

      const fn = next.bind(this);
      const lhs = fn();
      const prevIdx = this.index;
      const op = this.matchT(TT.BINOP);
      const rhs = fn();

      if (!rhs || !op || !lexemes.includes(op.lexeme)) {
        this.index = prevIdx;
        return lhs;
      }

      if (!lhs) return null;
      return this.mk(op, {
        tag: "binop",
        lhs,
        rhs,
      });
    };
  }

  primary() {
    return this.tryParse(this.parenExpr) ?? this.tryParse(this.atom);
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

/*
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
*/
const tokens = tok.tokenize("ha 5+5 akkor vissza 1 különben ha 2+2 akkor vissza 2 különben vissza 3 elágazás vége")
  .filter((t) => t.type !== TT.WHITESPACE);
console.log(tokens.map((t) => ({ name: t.lexeme, type: TT[t.type] })));


const start = performance.now();

for (let i = 0; i < 10_000; i++) {
  parser.input = tokens;
  const parse = parser.if()
}

const end = performance.now();

console.log(end - start);
