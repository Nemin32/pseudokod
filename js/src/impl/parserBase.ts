import { IAST, ITokenToASTParser } from "../interfaces/IParser.ts";
import { IToken, ITokenizer, TokenType as TT } from "../interfaces/ITokenizer.ts";
import * as ASTKinds from "../interfaces/astkinds.ts";
import { AtomValue } from "../interfaces/astkinds.ts";
import { Tokenizer } from "./tokenizer.ts";

type ParseResult<T extends ASTKinds.ASTKind> = { token: IToken; kind: T } | null;

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

  tryParse<T extends ASTKinds.ASTKind>(fn: () => ParseResult<T> | null): ParseResult<T> | null {
    const prevIdx = this.index;
    const value = fn.call(this);

    if (value) return value;

    this.index = prevIdx;
    return null;
  }

  mk<T extends ASTKinds.ASTKind>(token: IToken, kind: T): ParseResult<T> {
    return {
      token,
      kind,
    };
  }

  // --- STATEMENTS ---

  return(): ParseResult<ASTKinds.Return> {
    const tok = this.matchT(TT.VISSZA);
    const expr = this.expression();
    if (!tok || !expr) return null;

    return this.mk(tok, {
      tag: "return",
      expr,
    });
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

    return this.log_binop() as any as IAST<ASTKinds.Block>;
  }
}

const tok: ITokenizer = new Tokenizer();
const parser = new Parser();

const tokens = tok.tokenize("5+5<10");
console.log(tokens);

parser.input = tokens;
console.log(parser.log_binop());
