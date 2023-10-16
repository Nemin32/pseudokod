// src/interfaces/types.ts
var SimpleType = class {
  constructor(t) {
    this.t = t;
    this.kind = 0 /* SIMPLE */;
  }
};
var NoneType = class {
  constructor() {
    this.kind = 6 /* NONE */;
  }
};
var UnknownType = class {
  constructor() {
    this.kind = 7 /* UNKNOWN */;
  }
};
var GenericType = class {
  constructor(name) {
    this.name = name;
    this.kind = 5 /* GENERIC */;
  }
};
var [NUMBER, LOGIC, STRING, NONE, UNKNOWN] = [
  new SimpleType(0 /* NUMBER */),
  new SimpleType(2 /* LOGIC */),
  new SimpleType(1 /* STRING */),
  new NoneType(),
  new UnknownType()
];

// src/interfaces/astkinds.ts
function stringToBaseType(type) {
  switch (type) {
    case "eg\xE9sz":
      return NUMBER;
    case "sz\xF6veg":
      return STRING;
    case "logikai":
      return LOGIC;
  }
  if (type.length === 1 && type >= "A" && type <= "Z")
    return new GenericType(type);
  throw new Error(`Expected type, got ${type}.`);
}
var BinOpTypeMap = /* @__PURE__ */ new Map([
  ["+", 0 /* ADD */],
  ["-", 1 /* SUB */],
  ["*", 2 /* MUL */],
  ["/", 3 /* DIV */],
  ["mod", 4 /* MOD */],
  ["=", 5 /* EQ */],
  ["=/=", 6 /* NEQ */],
  ["<=", 7 /* LE */],
  [">=", 8 /* GE */],
  ["<", 9 /* LESS */],
  [">", 10 /* GREATER */],
  ["\xE9s", 11 /* AND */],
  ["vagy", 12 /* OR */]
]);

// src/impl/compiler/compiler.ts
var Compiler = class {
  constructor() {
    this.code = [];
    this.counter = 0;
  }
  addOp(op, args) {
    this.code.push({ code: op, ...args });
  }
  setVariable(variable) {
    if (variable.tag === 18 /* VARIABLE */) {
      this.addOp(14 /* SETVAR */, { name: variable.name });
    } else {
      variable.index.forEach((e) => this.visitExpression(e));
      this.addOp(13 /* SETARR */, { name: variable.variable.name, dimensions: variable.index.length });
    }
  }
  visitAtom(ast) {
    this.addOp(6 /* PUSH */, { value: ast.value });
  }
  visitBinop(ast) {
    this.visitExpression(ast.lhs);
    this.visitExpression(ast.rhs);
    this.addOp(7 /* BINOP */, { type: ast.op });
  }
  visitVariable(ast) {
    this.addOp(12 /* GETVAR */, { name: ast.name });
  }
  visitReference(ast) {
    if (ast.inner.tag == 18 /* VARIABLE */) {
      this.addOp(0 /* ADDRESS */, { name: ast.inner.name });
    } else {
      ast.inner.index.forEach((e) => this.visitExpression(e));
      this.addOp(1 /* ARRADDR */, { name: ast.inner.variable.name, dimensions: ast.inner.index.length });
    }
  }
  visitNot(ast) {
    this.visitExpression(ast.expr);
    this.addOp(8 /* NOT */, {});
  }
  visitArrcomp(ast) {
    ast.expressions.forEach((e) => this.visitExpression(e));
    this.addOp(5 /* ARRCMP */, { name: ast.variable.name, length: ast.expressions.length });
  }
  visitArrindex(ast) {
    ast.index.forEach((e) => this.visitExpression(e));
    this.addOp(11 /* GETARR */, { name: ast.variable.name, dimensions: ast.index.length });
  }
  visitFunccall(ast) {
    ast.arguments.forEach((arg) => {
      if ("token" in arg) {
        this.visitExpression(arg);
      } else {
        this.addOp(6 /* PUSH */, { value: arg.lexeme });
      }
    });
    this.addOp(2 /* CALL */, { name: ast.name });
  }
  visitArrnew(ast) {
    ast.dimensions.forEach((e) => this.visitExpression(e));
    this.addOp(20 /* MKARR */, { name: ast.variable.name, numDimensions: ast.dimensions.length });
  }
  visitExpression(ast) {
    switch (ast.tag) {
      case 3 /* ATOM */:
        return this.visitAtom(ast);
      case 4 /* BINOP */:
        return this.visitBinop(ast);
      case 18 /* VARIABLE */:
        return this.visitVariable(ast);
      case 15 /* REFERENCE */:
        return this.visitReference(ast);
      case 12 /* NOT */:
        return this.visitNot(ast);
      case 1 /* ARRINDEX */:
        return this.visitArrindex(ast);
      case 8 /* FUNCCALL */:
        return this.visitFunccall(ast);
    }
  }
  visitBlock(ast) {
    this.addOp(18 /* ESCOPE */, { isFun: false });
    ast.statements.forEach((s) => this.visitStatement(s));
    this.addOp(19 /* LSCOPE */, {});
  }
  visitPrint(ast) {
    this.visitExpression(ast.expr);
    this.addOp(9 /* PRINT */, {});
  }
  visitReturn(ast) {
    if (Array.isArray(ast.expr)) {
      ast.expr.forEach((expr) => this.visitExpression(expr));
      this.addOp(4 /* RETCMP */, { length: ast.expr.length });
    } else {
      this.visitExpression(ast.expr);
      this.addOp(3 /* RETURN */, {});
    }
  }
  visitDebug(ast) {
    this.addOp(22 /* DEBUG */, { msg: ast.msg ?? "DBG" });
  }
  visitIf(ast) {
    let counter = this.counter++;
    let branch_count = 0;
    const endLabel = `if_${counter}_end`;
    const visitBranch = (branch) => {
      const label = `if_${counter}_fail_${branch_count}`;
      this.visitExpression(branch.pred);
      this.addOp(16 /* FJMP */, { label });
      this.visitBlock(branch.branch);
      this.addOp(17 /* JMP */, { label: endLabel });
      this.addOp(15 /* LABEL */, { name: label });
      branch_count++;
    };
    visitBranch(ast.main_path);
    ast.elif_path.forEach((b) => visitBranch(b));
    if (ast.false_path)
      this.visitBlock(ast.false_path);
    this.addOp(15 /* LABEL */, { name: endLabel });
  }
  visitWhile(ast) {
    const counter = this.counter++;
    const predLabel = `while_${counter}_pred`;
    const endLabel = `while_${counter}_end`;
    const bodyLabel = `while_${counter}_body`;
    if (ast.postPred)
      this.addOp(17 /* JMP */, { label: bodyLabel });
    this.addOp(15 /* LABEL */, { name: predLabel });
    this.visitExpression(ast.predicate);
    this.addOp(16 /* FJMP */, { label: endLabel });
    this.addOp(15 /* LABEL */, { name: bodyLabel });
    this.visitBlock(ast.body);
    this.addOp(17 /* JMP */, { label: predLabel });
    this.addOp(15 /* LABEL */, { name: endLabel });
  }
  visitFor(ast) {
    const counter = this.counter++;
    const predLabel = `for_${counter}_pred`;
    const endLabel = `for_${counter}_end`;
    this.addOp(18 /* ESCOPE */, { isFun: false });
    this.visitExpression(ast.from);
    this.addOp(14 /* SETVAR */, { name: ast.variable.name });
    this.addOp(15 /* LABEL */, { name: predLabel });
    this.addOp(12 /* GETVAR */, { name: ast.variable.name });
    this.visitExpression(ast.to);
    this.addOp(7 /* BINOP */, { type: 7 /* LE */ });
    this.addOp(16 /* FJMP */, { label: endLabel });
    this.visitBlock(ast.body);
    this.addOp(12 /* GETVAR */, { name: ast.variable.name });
    this.addOp(6 /* PUSH */, { value: 1 });
    this.addOp(7 /* BINOP */, { type: 0 /* ADD */ });
    this.addOp(14 /* SETVAR */, { name: ast.variable.name });
    this.addOp(17 /* JMP */, { label: predLabel });
    this.addOp(15 /* LABEL */, { name: endLabel });
    this.addOp(19 /* LSCOPE */, {});
  }
  visitAssign(ast) {
    this.visitExpression(ast.value);
    this.setVariable(ast.variable);
  }
  visitFuncdecl(ast) {
    const endLabel = `${ast.name}_end`;
    this.addOp(17 /* JMP */, { label: endLabel });
    this.addOp(15 /* LABEL */, { name: ast.name });
    this.addOp(18 /* ESCOPE */, { isFun: true });
    ast.parameters.forEach((p) => this.visitParam(p));
    this.visitBlock(ast.body);
    this.addOp(6 /* PUSH */, { value: 0 });
    this.addOp(3 /* RETURN */, {});
    this.addOp(19 /* LSCOPE */, {});
    this.addOp(15 /* LABEL */, { name: endLabel });
  }
  visitSwap(ast) {
    this.addOp(18 /* ESCOPE */, { isFun: false });
    this.visitExpression(ast.var1);
    this.addOp(14 /* SETVAR */, { name: "temp" });
    this.visitExpression(ast.var2);
    this.setVariable(ast.var1);
    this.addOp(12 /* GETVAR */, { name: "temp" });
    this.setVariable(ast.var2);
    this.addOp(19 /* LSCOPE */, {});
  }
  visitStatement(ast) {
    switch (ast.tag) {
      case 5 /* BLOCK */:
        return this.visitBlock(ast);
      case 10 /* IF */:
        return this.visitIf(ast);
      case 2 /* ASSIGN */:
        return this.visitAssign(ast);
      case 19 /* WHILE */:
        return this.visitWhile(ast);
      case 7 /* FOR */:
        return this.visitFor(ast);
      case 14 /* PRINT */:
        return this.visitPrint(ast);
      case 16 /* RETURN */:
        return this.visitReturn(ast);
      case 9 /* FUNCDECL */:
        return this.visitFuncdecl(ast);
      case 6 /* DEBUG */:
        return this.visitDebug(ast);
      case 17 /* SWAP */:
        return this.visitSwap(ast);
      case 8 /* FUNCCALL */: {
        this.visitFunccall(ast);
        this.addOp(10 /* VOID */, {});
        return;
      }
      case 11 /* NEWARRAY */:
        return this.visitArrnew(ast);
      case 0 /* ARRAYCOMP */:
        return this.visitArrcomp(ast);
    }
  }
  visitParam(ast) {
    const name = typeof ast.name === "string" ? ast.name : ast.name.name;
    const op = ast.byRef ? 21 /* MKREF */ : 14 /* SETVAR */;
    return this.addOp(op, { name });
  }
  visit(ast) {
    console.log(ast.tag);
    switch (ast.tag) {
      case 3 /* ATOM */:
        return this.visitAtom(ast);
      case 4 /* BINOP */:
        return this.visitBinop(ast);
      case 18 /* VARIABLE */:
        return this.visitVariable(ast);
      case 15 /* REFERENCE */:
        return this.visitReference(ast);
      case 12 /* NOT */:
        return this.visitNot(ast);
      case 0 /* ARRAYCOMP */:
        return this.visitArrcomp(ast);
      case 1 /* ARRINDEX */:
        return this.visitArrindex(ast);
      case 8 /* FUNCCALL */:
        return this.visitFunccall(ast);
      case 11 /* NEWARRAY */:
        return this.visitArrnew(ast);
      case 5 /* BLOCK */:
        return this.visitBlock(ast);
      case 10 /* IF */:
        return this.visitIf(ast);
      case 2 /* ASSIGN */:
        return this.visitAssign(ast);
      case 19 /* WHILE */:
        return this.visitWhile(ast);
      case 7 /* FOR */:
        return this.visitFor(ast);
      case 14 /* PRINT */:
        return this.visitPrint(ast);
      case 16 /* RETURN */:
        return this.visitReturn(ast);
      case 9 /* FUNCDECL */:
        return this.visitFuncdecl(ast);
      case 6 /* DEBUG */:
        return this.visitDebug(ast);
      case 17 /* SWAP */:
        return this.visitSwap(ast);
      case 13 /* PARAMETER */:
        return this.visitParam(ast);
    }
  }
};

// src/interfaces/ITokenizer.ts
var TokenType = /* @__PURE__ */ ((TokenType2) => {
  TokenType2[TokenType2["AKKOR"] = 0] = "AKKOR";
  TokenType2[TokenType2["AMIG"] = 1] = "AMIG";
  TokenType2[TokenType2["CIKLUS"] = 2] = "CIKLUS";
  TokenType2[TokenType2["CIMSZERINT"] = 3] = "CIMSZERINT";
  TokenType2[TokenType2["DEBUG"] = 4] = "DEBUG";
  TokenType2[TokenType2["ELAGAZAS"] = 5] = "ELAGAZAS";
  TokenType2[TokenType2["FUGGVENY"] = 6] = "FUGGVENY";
  TokenType2[TokenType2["HA"] = 7] = "HA";
  TokenType2[TokenType2["KIIR"] = 8] = "KIIR";
  TokenType2[TokenType2["KULONBEN"] = 9] = "KULONBEN";
  TokenType2[TokenType2["LETREHOZ"] = 10] = "LETREHOZ";
  TokenType2[TokenType2["TABLALETREHOZ"] = 11] = "TABLALETREHOZ";
  TokenType2[TokenType2["TOMB"] = 12] = "TOMB";
  TokenType2[TokenType2["VEGE"] = 13] = "VEGE";
  TokenType2[TokenType2["VISSZA"] = 14] = "VISSZA";
  TokenType2[TokenType2["NEGAL"] = 15] = "NEGAL";
  TokenType2[TokenType2["OPAREN"] = 16] = "OPAREN";
  TokenType2[TokenType2["CPAREN"] = 17] = "CPAREN";
  TokenType2[TokenType2["OBRACKET"] = 18] = "OBRACKET";
  TokenType2[TokenType2["CBRACKET"] = 19] = "CBRACKET";
  TokenType2[TokenType2["COLON"] = 20] = "COLON";
  TokenType2[TokenType2["COMMA"] = 21] = "COMMA";
  TokenType2[TokenType2["FORSTART"] = 22] = "FORSTART";
  TokenType2[TokenType2["FOREND"] = 23] = "FOREND";
  TokenType2[TokenType2["NYIL"] = 24] = "NYIL";
  TokenType2[TokenType2["SWAP"] = 25] = "SWAP";
  TokenType2[TokenType2["REFERENCE"] = 26] = "REFERENCE";
  TokenType2[TokenType2["NUMBER"] = 27] = "NUMBER";
  TokenType2[TokenType2["BOOLEAN"] = 28] = "BOOLEAN";
  TokenType2[TokenType2["STRING"] = 29] = "STRING";
  TokenType2[TokenType2["SYMBOL"] = 30] = "SYMBOL";
  TokenType2[TokenType2["FUNCNAME"] = 31] = "FUNCNAME";
  TokenType2[TokenType2["BINOP"] = 32] = "BINOP";
  TokenType2[TokenType2["WHITESPACE"] = 33] = "WHITESPACE";
  TokenType2[TokenType2["TYPE"] = 34] = "TYPE";
  TokenType2[TokenType2["COMMENT"] = 35] = "COMMENT";
  TokenType2[TokenType2["RENDEZETT"] = 36] = "RENDEZETT";
  TokenType2[TokenType2["ERROR"] = 37] = "ERROR";
  return TokenType2;
})(TokenType || {});

// src/impl/parser/tokenizer.ts
var kwToType = /* @__PURE__ */ new Map([
  ["akkor", 0 /* AKKOR */],
  ["am\xEDg", 1 /* AMIG */],
  ["ciklus", 2 /* CIKLUS */],
  ["c\xEDmszerint", 3 /* CIMSZERINT */],
  ["debug", 4 /* DEBUG */],
  ["el\xE1gaz\xE1s", 5 /* ELAGAZAS */],
  ["f\xFCggv\xE9ny", 6 /* FUGGVENY */],
  ["elj\xE1r\xE1s", 6 /* FUGGVENY */],
  ["ha", 7 /* HA */],
  ["ki\xEDr", 8 /* KIIR */],
  ["k\xFCl\xF6nben", 9 /* KULONBEN */],
  ["t\xF6mb", 12 /* TOMB */],
  ["halmaz", 12 /* TOMB */],
  ["t\xE1bla", 12 /* TOMB */],
  ["vissza", 14 /* VISSZA */],
  ["v\xE9ge", 13 /* VEGE */],
  ["L\xE9trehoz", 10 /* LETREHOZ */],
  ["T\xE1blaL\xE9trehoz", 11 /* TABLALETREHOZ */],
  ["rendezett", 36 /* RENDEZETT */],
  ["~", 15 /* NEGAL */],
  ["(", 16 /* OPAREN */],
  [")", 17 /* CPAREN */],
  ["[", 18 /* OBRACKET */],
  ["]", 19 /* CBRACKET */],
  [":", 20 /* COLON */],
  [",", 21 /* COMMA */],
  ["&", 26 /* REFERENCE */],
  ["<-", 24 /* NYIL */],
  ["<->", 25 /* SWAP */],
  ["-t\xF3l", 22 /* FORSTART */],
  ["-t\u0151l", 22 /* FORSTART */],
  ["-ig", 23 /* FOREND */],
  ["//", 35 /* COMMENT */]
]);
var Tokenizer = class {
  constructor() {
    this.input = "";
    this.index = 0;
    this.row = 0;
    this.column = 0;
  }
  peek() {
    if (this.index >= this.input.length)
      return null;
    return this.input[this.index];
  }
  eat() {
    if (this.index >= this.input.length)
      return null;
    this.column++;
    return this.input[this.index++];
  }
  eatWhile(fn) {
    if (this.peek() === null)
      return null;
    let retval = "";
    while (true) {
      const c = this.eat();
      if (c == null)
        return retval;
      if (fn.call(this, c)) {
        retval += c;
      } else {
        this.index--;
        this.column--;
        return retval.length === 0 ? null : retval;
      }
    }
  }
  getKeywordTokenType(kw) {
    if (kw == null)
      return null;
    return kwToType.get(kw) ?? null;
  }
  isWhitespace(char) {
    return [" ", "	", "\n"].includes(char);
  }
  isNum(char) {
    return char >= "0" && char <= "9";
  }
  isLetter(char) {
    return char.toLowerCase() !== char.toUpperCase();
  }
  isLetterOrUnderline(char) {
    return char.toLowerCase() !== char.toUpperCase() || char === "_";
  }
  tryParse(fn) {
    const state = this.saveState();
    const token = fn.call(this);
    if (token !== null)
      return token;
    this.index = state.index;
    this.row = state.row;
    this.column = state.column;
    return null;
  }
  saveState() {
    return {
      index: this.index,
      row: this.row,
      column: this.column
    };
  }
  mkToken(type, tokenFn) {
    const state = this.saveState();
    const value = tokenFn.call(this);
    if (!value)
      return null;
    return {
      lexeme: value,
      position: { row: state.row, column: state.column },
      length: this.index - state.index,
      type
    };
  }
  newLine() {
    return this.mkToken(33 /* WHITESPACE */, () => {
      let len = 0;
      while (this.peek() === "\n") {
        this.eat();
        this.column = 0;
        this.row++;
        len++;
      }
      if (len === 0)
        return null;
      return "\n".repeat(len);
    });
  }
  whitespace() {
    return this.mkToken(33 /* WHITESPACE */, () => {
      return this.eatWhile(this.isWhitespace);
    });
  }
  singleLetterKeyword() {
    const char = this.eat();
    const type = this.getKeywordTokenType(char) ?? null;
    return type == null ? type : this.mkToken(type, () => char);
  }
  keyword() {
    const slkw = this.tryParse(this.singleLetterKeyword);
    if (slkw)
      return slkw;
    const kw = this.eatWhile((c) => !["[", "(", ",", ")", "]"].includes(c) && !this.isWhitespace(c));
    const type = this.getKeywordTokenType(kw);
    if (type === null)
      return null;
    const token = this.mkToken(type, () => kw);
    if (!token)
      return null;
    return token;
  }
  comment() {
    return this.mkToken(35 /* COMMENT */, () => {
      if (this.eat() !== "/" || this.eat() !== "/")
        return null;
      const comment = this.eatWhile((c) => c !== "\n");
      return `//${comment}`;
    });
  }
  number() {
    return this.mkToken(27 /* NUMBER */, () => {
      const num = this.eatWhile(this.isNum);
      return num;
    });
  }
  string() {
    return this.mkToken(29 /* STRING */, () => {
      if (this.eat() !== '"')
        return null;
      const inner = this.eatWhile((c) => c !== '"');
      if (this.eat() !== '"')
        return null;
      return inner;
    });
  }
  bool() {
    return this.mkToken(28 /* BOOLEAN */, () => {
      const word = this.eatWhile(this.isLetter);
      if (!word || !["igaz", "Igaz", "hamis", "Hamis"].includes(word))
        return null;
      return word;
    });
  }
  binop() {
    const validBinops = ["<", ">", "=", "<=", ">=", "=/=", "\xE9s", "vagy", "+", "-", "/", "*", "mod"];
    return this.mkToken(32 /* BINOP */, () => {
      const str = (this.eat() ?? "") + (this.eat() ?? "") + (this.eat() ?? "") + (this.eat() ?? "");
      for (let i = str.length; i > 0; i--) {
        const sub = str.substring(0, i);
        if (validBinops.includes(sub)) {
          this.index -= str.length - i;
          this.column -= str.length - i;
          return sub;
        }
      }
      return null;
    });
  }
  symbol() {
    return this.mkToken(30 /* SYMBOL */, () => {
      return this.eatWhile((c) => this.isLetter(c) || this.isNum(c));
    });
  }
  funcName() {
    return this.mkToken(31 /* FUNCNAME */, () => {
      const c = this.eat();
      if (!c || !this.isLetter(c) || c.toUpperCase() !== c)
        return null;
      const rest = this.eatWhile(this.isLetterOrUnderline);
      if (rest?.length === 0)
        return null;
      return c + (rest ?? "");
    });
  }
  type() {
    return this.mkToken(34 /* TYPE */, () => {
      const val = this.eatWhile(this.isLetter);
      if (!val)
        return null;
      return ["eg\xE9sz", "sz\xF6veg", "logikai"].includes(val) || val.length === 1 && val >= "A" && val <= "Z" ? val : null;
    });
  }
  parse() {
    this.newLine();
    const parsers = [
      this.comment,
      this.keyword,
      this.binop,
      this.bool,
      this.number,
      this.string,
      this.type,
      this.funcName,
      this.symbol,
      this.whitespace
    ];
    for (const parser of parsers) {
      const value = this.tryParse(parser);
      if (value) {
        return value;
      }
    }
    return null;
  }
  parseWhileNotEOF() {
    const retval = [];
    while (true) {
      const token = this.parse();
      if (token) {
        retval.push(token);
      } else {
        break;
      }
    }
    return retval;
  }
  tokenize(input) {
    this.input = input;
    this.index = 0;
    return this.parseWhileNotEOF();
  }
};

// src/impl/parser/monadic_parser_base.ts
var Parser = class {
  constructor(exec) {
    this.exec = exec;
  }
  run(input) {
    return this.exec({ input, index: 0 });
  }
  static item() {
    return new Parser(
      (inp) => inp.index >= inp.input.length ? { type: "error", cause: "EOF", location: inp, extract: () => {
        throw new Error("Trying to extract from error.");
      } } : {
        type: "match",
        value: inp.input[inp.index],
        next: { index: inp.index + 1, input: inp.input },
        extract: () => inp.input[inp.index]
      }
    );
  }
  static result(value) {
    return new Parser((inp) => ({ type: "match", next: inp, value, extract: () => value }));
  }
  static fail(msg) {
    return new Parser((inp) => ({ type: "error", cause: msg, location: inp, extract: () => {
      throw new Error("Trying to extract from error.");
    } }));
  }
  bind(other) {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error")
        return current;
      return other(current.value, inp).exec(current.next);
    });
  }
  catch(error) {
    return new Parser((inp) => {
      const current = this.exec(inp);
      if (current.type === "error")
        return { type: "error", cause: error(current.cause), location: current.location, extract: () => {
          throw new Error("Trying to extract from error.");
        } };
      return current;
    });
  }
  static or(one, other) {
    return new Parser((inp) => {
      const thisValue = one.exec(inp);
      if (thisValue.type === "error") {
        const thatValue = other.exec(inp);
        if (thatValue.type === "match")
          return thatValue;
        return this.fail(thisValue.cause + " OR " + thatValue.cause).exec(inp);
      }
      return thisValue;
    });
  }
  static sat(predicate, failMsg = (val, input) => "Parsing error.") {
    return Parser.item().bind(
      (elem, inp) => predicate(elem) ? Parser.result(elem) : Parser.fail(failMsg(elem, inp))
    );
  }
  static many(p) {
    return Parser.many1(p).or(Parser.result([]));
  }
  static many1(p) {
    return p.bind((first) => Parser.many(p).bind((rest) => Parser.result([first, ...rest]))).catch((p2) => `Multiple(${p2})`);
  }
  static sepBy(parser, separator) {
    return Parser.sepBy1(parser, separator).or(Parser.result([]));
  }
  static sepBy1(parser, separator) {
    return parser.bind(
      (first) => Parser.many(separator.bind((_) => parser.bind((val) => Parser.result(val)))).bind(
        (rest) => this.result([first, ...rest])
      )
    ).catch((prev) => `${prev}, sep. by ${separator}`);
  }
  static chainl(term, op, baseCase) {
    return Parser.chain(term, op).or(baseCase);
  }
  static chain(term, opParser) {
    const rest = (a) => opParser.bind((op) => term.bind((right) => rest({ left: a, op, right }))).or(Parser.result(a));
    return term.bind((left) => rest(left));
  }
  or(other) {
    return Parser.or(this, other);
  }
  many() {
    return Parser.many(this);
  }
  many1() {
    return Parser.many1(this);
  }
  sepBy(separator) {
    return Parser.sepBy(this, separator);
  }
  sepBy1(separator) {
    return Parser.sepBy1(this, separator);
  }
  chainl(op, baseCase) {
    return Parser.chainl(this, op, baseCase);
  }
  static peek(n) {
    return new Parser((inp) => {
      return inp.index + n >= inp.input.length ? { type: "error", cause: "EOF", location: inp, extract: () => {
        throw new Error("Trying to extract from error.");
      } } : {
        type: "match",
        value: inp.input[inp.index + n],
        next: inp,
        extract: () => inp.input[inp.index + n]
      };
    });
  }
  static mapChoice(input, map) {
    return input.bind((elem, _) => {
      const parser = map.get(elem);
      if (!parser)
        return Parser.fail(`No parser for ${elem}!`);
      return parser;
    });
  }
  mapChoice(map) {
    return Parser.mapChoice(this, map);
  }
  static choice(parsers) {
    const [first, ...rest] = parsers;
    return rest.reduce((acc, curr) => acc.or(curr), first);
  }
  map(fn) {
    return this.bind((value) => Parser.result(fn(value)));
  }
  left(other) {
    return this.bind((value) => other.map((_) => value));
  }
  right(other) {
    return this.bind((_) => other.map((oValue) => oValue));
  }
  maybe() {
    return this.or(Parser.result(null));
  }
  static matchT(type) {
    return Parser.sat(
      (elem) => elem.type === type,
      (elem, input) => `${input.index} - ${input.input[input.index].lexeme}: Expected type "${TokenType[type]}", got "${TokenType[elem.type]}".`
    );
  }
  static of(fn) {
    return new Parser((inp) => fn().exec(inp));
  }
  end() {
    return this.left(Parser.matchT(13 /* VEGE */)).catch((prev) => `${prev} V\xC9GE`);
  }
  parens() {
    const oparen = Parser.matchT(16 /* OPAREN */);
    const cparen = Parser.matchT(17 /* CPAREN */);
    return oparen.right(this).left(cparen);
  }
  brackets() {
    const oparen = Parser.matchT(18 /* OBRACKET */);
    const cparen = Parser.matchT(19 /* CBRACKET */);
    return oparen.right(this).left(cparen);
  }
  static do() {
    return new Do([]);
  }
};
var Do = class {
  constructor(bindList) {
    this.bindList = bindList;
  }
  bind(name, parser) {
    return new Do([...this.bindList, { name, parser }]);
  }
  ignore(parser) {
    return new Do([...this.bindList, { name: null, parser }]);
  }
  bindT(name, type) {
    return new Do([...this.bindList, { name, parser: Parser.matchT(type) }]);
  }
  ignoreT(type) {
    return new Do([...this.bindList, { name: null, parser: Parser.matchT(type) }]);
  }
  maybeT(name, type) {
    return new Do([...this.bindList, { name, parser: Parser.matchT(type).maybe() }]);
  }
  finalize(given) {
    function recursion(parsers, obj) {
      if (parsers.length === 0)
        return Parser.result(obj);
      const { name, parser } = parsers[0];
      return parser.bind((value) => {
        const newObj = { ...obj };
        if (name)
          newObj[name] = value;
        return recursion(parsers.slice(1), newObj);
      });
    }
    return recursion(this.bindList, given);
  }
  result(fn) {
    return this.finalize({}).map(fn);
  }
};
var mkToken = (token, tag, rest) => ({
  token,
  tag,
  ...rest
});

// src/impl/parser/ast_parser.ts
var parseBaseType = Parser.matchT(34 /* TYPE */).map((t) => stringToBaseType(t.lexeme));
var parseStatement = Parser.of(
  () => {
    const symbolParser = Parser.choice([
      parseSwap,
      parseAssignment,
      parseNewArray,
      parseComprehension
    ]);
    const statementMap = /* @__PURE__ */ new Map([
      [7 /* HA */, parseIf],
      [14 /* VISSZA */, parseReturn],
      [2 /* CIKLUS */, parseFor.or(parseWhile)],
      [30 /* SYMBOL */, symbolParser],
      [6 /* FUGGVENY */, parseFuncDecl],
      [8 /* KIIR */, parsePrint],
      [4 /* DEBUG */, parseDebug],
      [31 /* FUNCNAME */, parseFuncCall]
    ]);
    return Parser.peek(0).map((t) => t.type).mapChoice(statementMap);
  }
);
var parseExpression = Parser.of(
  () => parseBinOp
);
var parseBlock = parseStatement.many1().map((stmts) => mkToken(null, 5 /* BLOCK */, { statements: stmts }));
var parseVariable = Parser.matchT(30 /* SYMBOL */).map(
  (token) => mkToken(token, 18 /* VARIABLE */, { name: token.lexeme })
);
var parseComprehension = Parser.do().bind("variable", parseVariable).ignoreT(24 /* NYIL */).bind(
  "expressions",
  parseExpression.sepBy(Parser.matchT(21 /* COMMA */)).parens()
).result(({ variable, expressions }) => mkToken(null, 0 /* ARRAYCOMP */, { variable, expressions }));
var parseArrayIndex = Parser.do().bind("variable", parseVariable).bind("index", parseExpression.sepBy1(Parser.matchT(21 /* COMMA */)).brackets()).result(({ variable, index }) => mkToken(variable.token, 1 /* ARRINDEX */, { variable, index }));
var parseNewMultiDimArray = Parser.do().bind("variable", parseVariable).ignoreT(24 /* NYIL */).bindT("token", 11 /* TABLALETREHOZ */).bind("type", parseBaseType.parens()).bind("dimensions", parseExpression.sepBy1(Parser.matchT(21 /* COMMA */)).brackets()).result(
  ({ variable, token, type, dimensions }) => mkToken(token, 11 /* NEWARRAY */, { variable, dimensions, type })
);
var parseNewSingleDimArray = Parser.do().bind("variable", parseVariable).ignoreT(24 /* NYIL */).bindT("token", 10 /* LETREHOZ */).bind("type", parseBaseType.parens()).bind("length", parseExpression.brackets()).result(
  ({ variable, token, type, length }) => mkToken(token, 11 /* NEWARRAY */, { variable, dimensions: [length], type })
);
var parseNewArray = parseNewSingleDimArray.or(parseNewMultiDimArray);
var parseSwap = Parser.do().bind("var1", parseArrayIndex.or(parseVariable)).bindT("token", 25 /* SWAP */).bind("var2", parseArrayIndex.or(parseVariable)).result(({ var1, token, var2 }) => mkToken(token, 17 /* SWAP */, { var1, var2 }));
var number = Parser.matchT(27 /* NUMBER */).map(
  (token) => mkToken(token, 3 /* ATOM */, { type: NUMBER, value: Number(token.lexeme) })
);
var boolean = Parser.matchT(28 /* BOOLEAN */).map(
  (token) => mkToken(token, 3 /* ATOM */, { type: LOGIC, value: ["Igaz", "igaz"].includes(token.lexeme) })
);
var string = Parser.matchT(29 /* STRING */).map(
  (token) => mkToken(token, 3 /* ATOM */, { type: STRING, value: token.lexeme })
);
var parseAtom = Parser.choice([number, boolean, string]);
var parseNot = Parser.matchT(15 /* NEGAL */).bind(
  (token) => parseExpression.map((expr) => mkToken(token, 12 /* NOT */, { expr }))
);
var parseReference = Parser.matchT(26 /* REFERENCE */).bind(
  (token) => parseArrayIndex.or(parseVariable).map((inner) => mkToken(token, 15 /* REFERENCE */, { inner }))
);
var addOp = Parser.sat((tok) => ["+", "-"].includes(tok.lexeme));
var mulOp = Parser.sat((tok) => ["*", "/", "mod"].includes(tok.lexeme));
var compOp = Parser.sat((tok) => [">", "<", "=", "<=", ">=", "=/="].includes(tok.lexeme));
var logicOp = Parser.sat((tok) => ["\xE9s", "vagy"].includes(tok.lexeme));
var parseFuncCall = Parser.do().bindT("name", 31 /* FUNCNAME */).bind("args", parseExpression.or(Parser.matchT(31 /* FUNCNAME */)).sepBy(Parser.matchT(21 /* COMMA */)).parens()).result(({ name, args }) => mkToken(name, 8 /* FUNCCALL */, { name: name.lexeme, arguments: args }));
var primary = Parser.choice([
  parseExpression.parens(),
  parseNot,
  parseReference,
  parseFuncCall,
  parseArrayIndex,
  parseVariable,
  parseAtom
]);
var chainToExpr = (chain) => {
  if (!("left" in chain)) {
    return chain;
  }
  const binop = BinOpTypeMap.get(chain.op.lexeme);
  if (binop === void 0)
    throw new Error(`Unknown binop: "${chain.op.lexeme}".`);
  return mkToken(chain.op, 4 /* BINOP */, {
    lhs: "left" in chain.left ? chainToExpr(chain.left) : chain.left,
    op: binop,
    rhs: chain.right
  });
};
var parseArithmOp = Parser.chain(primary, addOp).map(chainToExpr);
var parseMulOp = Parser.chain(parseArithmOp, mulOp).map(chainToExpr);
var parseCompOp = Parser.chain(parseMulOp, compOp).map(chainToExpr);
var parseBinOp = Parser.chain(parseCompOp, logicOp).map(chainToExpr);
var parseAssignment = Parser.do().bind("variable", parseArrayIndex.or(parseVariable)).bindT("nyil", 24 /* NYIL */).bind("value", parseExpression).result(
  ({ variable, nyil, value }) => mkToken(nyil, 2 /* ASSIGN */, {
    variable,
    value
  })
);
var parseDebug = Parser.matchT(4 /* DEBUG */).map((token) => mkToken(token, 6 /* DEBUG */, {}));
var parseFor = Parser.do().bindT("token", 2 /* CIKLUS */).bind("variable", parseVariable).ignoreT(24 /* NYIL */).bind("from", parseExpression).ignoreT(22 /* FORSTART */).bind("to", parseExpression).ignoreT(23 /* FOREND */).bind("body", parseBlock).ignoreT(2 /* CIKLUS */).ignoreT(13 /* VEGE */).result(
  ({ token, variable, from, to, body }) => mkToken(token, 7 /* FOR */, {
    from,
    to,
    body,
    variable
  })
);
var parseByRef = Parser.matchT(3 /* CIMSZERINT */).map((_) => true).or(Parser.result(false));
var parseParamType = Parser.do().bind("type", parseBaseType).maybeT("isSorted", 36 /* RENDEZETT */).maybeT("isArray", 12 /* TOMB */).finalize({});
var parseParameter = Parser.do().bind("byRef", parseByRef).bind("name", parseVariable.or(Parser.matchT(31 /* FUNCNAME */))).ignoreT(20 /* COLON */).bind("type", parseParamType).result(
  ({ byRef, name, type }) => mkToken("token" in name ? name.token : name, 13 /* PARAMETER */, {
    byRef,
    name: "token" in name ? name : name.lexeme,
    type: type.type,
    isArr: type.isArray !== null
  })
);
var parseFuncDecl = Parser.do().bindT("token", 6 /* FUGGVENY */).bindT("name", 31 /* FUNCNAME */).bind("parameters", parseParameter.sepBy(Parser.matchT(21 /* COMMA */)).parens()).bind("body", parseBlock).ignoreT(6 /* FUGGVENY */).ignoreT(13 /* VEGE */).result(
  ({ token, body, name, parameters }) => mkToken(token, 9 /* FUNCDECL */, { body, name: name.lexeme, parameters })
);
var parseIfHead = Parser.do().bindT("token", 7 /* HA */).bind("pred", parseExpression).ignoreT(0 /* AKKOR */).bind("branch", parseBlock).finalize({});
var parseElse = Parser.matchT(9 /* KULONBEN */).right(parseBlock);
var parseElIf = Parser.matchT(9 /* KULONBEN */).right(parseIfHead);
var parseIf = Parser.do().bind("main_path", parseIfHead).bind("elif_path", parseElIf.many()).bind("false_path", parseElse.maybe()).ignoreT(5 /* ELAGAZAS */).ignoreT(13 /* VEGE */).result(
  ({ main_path, elif_path, false_path }) => mkToken(main_path.token, 10 /* IF */, { main_path, elif_path, false_path })
);
var parsePrint = Parser.matchT(8 /* KIIR */).bind(
  (token) => parseExpression.map((expr) => mkToken(token, 14 /* PRINT */, { expr }))
);
var comp = parseExpression.sepBy(Parser.matchT(21 /* COMMA */)).parens();
var parseReturn = Parser.matchT(14 /* VISSZA */).bind(
  (token) => Parser.or(comp, parseExpression).map((expr) => mkToken(token, 16 /* RETURN */, { expr }))
);
var parseNormalWhile = Parser.do().bindT("token", 2 /* CIKLUS */).ignoreT(1 /* AMIG */).bind("predicate", parseExpression).bind("body", parseBlock).ignoreT(2 /* CIKLUS */).ignoreT(13 /* VEGE */).finalize({ postPred: false });
var parseDoWhile = Parser.do().bindT("token", 2 /* CIKLUS */).bind("body", parseBlock).ignoreT(1 /* AMIG */).bind("predicate", parseExpression).finalize({ postPred: true });
var parseWhile = parseDoWhile.or(parseNormalWhile).map((value) => mkToken(value.token, 19 /* WHILE */, value));

// src/impl/frontend/main.ts
window.addEventListener("load", () => {
  const code = document.getElementById("code");
  const byteCode = document.getElementById("instructions");
  const compButton = document.getElementById("compile");
  compButton.addEventListener("click", () => {
    const tok = new Tokenizer();
    const tokens = tok.tokenize(code.value);
    const block = parseBlock.run(tokens);
    if (block.type === "match") {
      const comp2 = new Compiler();
      comp2.visit(block.value);
      byteCode.innerText = comp2.code.join("\n");
    }
  });
});
