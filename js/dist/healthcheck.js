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

// src/parser/tokenizer.ts
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
      return this.eatWhile((c) => c === " " || c === "	");
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
      let negative = false;
      if (this.peek() === "-") {
        negative = true;
        this.eat();
      }
      const num = this.eatWhile(this.isNum);
      if (!num)
        return null;
      return (negative ? "-" : "") + num;
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
    const parsers = [
      this.newLine,
      this.whitespace,
      this.comment,
      this.number,
      this.keyword,
      this.binop,
      this.bool,
      this.string,
      this.type,
      this.funcName,
      this.symbol
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
    if (!(this.peek() === null)) {
      const errTok = this.mkToken(37 /* ERROR */, () => this.eatWhile((_) => true));
      if (errTok)
        retval.push(errTok);
    }
    return retval;
  }
  tokenize(input) {
    this.input = input;
    this.index = 0;
    return this.parseWhileNotEOF();
  }
};

// src/frontend/token.ts
var tokenTypeToClass = (tt) => {
  switch (tt) {
    case 0 /* AKKOR */:
    case 1 /* AMIG */:
    case 2 /* CIKLUS */:
    case 5 /* ELAGAZAS */:
    case 6 /* FUGGVENY */:
    case 7 /* HA */:
    case 9 /* KULONBEN */:
    case 10 /* LETREHOZ */:
    case 11 /* TABLALETREHOZ */:
    case 13 /* VEGE */:
      return "keyword";
    case 8 /* KIIR */:
    case 14 /* VISSZA */:
      return "statement";
    case 4 /* DEBUG */:
      return "debug";
    case 3 /* CIMSZERINT */:
    case 36 /* RENDEZETT */:
    case 12 /* TOMB */:
    case 34 /* TYPE */:
      return "type";
    case 15 /* NEGAL */:
    case 16 /* OPAREN */:
    case 17 /* CPAREN */:
    case 18 /* OBRACKET */:
    case 19 /* CBRACKET */:
    case 20 /* COLON */:
    case 21 /* COMMA */:
    case 22 /* FORSTART */:
    case 23 /* FOREND */:
    case 24 /* NYIL */:
    case 25 /* SWAP */:
    case 26 /* REFERENCE */:
      return "nyil";
    case 27 /* NUMBER */:
      return "number";
    case 28 /* BOOLEAN */:
      return "bool";
    case 29 /* STRING */:
      return "string";
    case 31 /* FUNCNAME */:
      return "funcname";
    case 35 /* COMMENT */:
      return "comment";
    case 37 /* ERROR */:
      return "error";
    case 30 /* SYMBOL */:
    case 32 /* BINOP */:
    case 33 /* WHITESPACE */:
      return "normal";
  }
};
var tokenToHTML = (tok) => {
  const c = document.createElement("span");
  c.innerText = tok.lexeme;
  c.dataset.row = String(tok.position.row);
  c.dataset.column = String(tok.position.column);
  c.classList.add(tokenTypeToClass(tok.type));
  if (tok.lexeme.includes("\n"))
    c.dataset.isWS = "true";
  return c;
};
var tokenize = (input) => {
  const tok = new Tokenizer();
  const tokensRaw = tok.tokenize(input);
  const tokens = tokensRaw.filter((t) => t.type !== 33 /* WHITESPACE */);
  const spans = tokensRaw.map(tokenToHTML);
  return [spans, tokens];
};

// src/interfaces/types.ts
var TypeCheckError = class extends Error {
  constructor(message, token) {
    super(message);
    this.token = token;
  }
};
var SimpleType = class {
  constructor(t) {
    this.t = t;
    this.kind = 0 /* SIMPLE */;
  }
};
var ArrayType = class {
  constructor(t) {
    this.t = t;
    this.kind = 1 /* ARRAY */;
  }
};
var ReferenceType = class {
  constructor(t) {
    this.t = t;
    this.kind = 2 /* REFERENCE */;
  }
};
var HeterogenousArrayType = class {
  constructor(ts) {
    this.kind = 3 /* HETEROGENOUS */;
    this.ts = ts.sort();
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
var FunctionType = class {
  constructor(rType, argTypes, decl) {
    this.rType = rType;
    this.argTypes = argTypes;
    this.decl = decl;
    this.kind = 4 /* FUNCTION */;
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
  [">", 10 /* MORE */],
  ["\xE9s", 11 /* AND */],
  ["vagy", 12 /* OR */]
]);

// src/compiler/typecheck.ts
function compare(t1, t2) {
  if (t1 instanceof NoneType && t2 instanceof NoneType)
    return true;
  if (t1 instanceof UnknownType && t2 instanceof UnknownType)
    return true;
  if (t1 instanceof SimpleType && t2 instanceof SimpleType)
    return t1.t === t2.t;
  if (t1 instanceof ArrayType && t2 instanceof ArrayType)
    return compare(t1.t, t2.t);
  if (t1 instanceof ReferenceType && t2 instanceof ReferenceType)
    return compare(t1.t, t2.t);
  if (t1 instanceof HeterogenousArrayType && t2 instanceof HeterogenousArrayType) {
    return t1.ts.every((t, idx) => compare(t, t2.ts[idx]));
  }
  if (t1 instanceof FunctionType && t2 instanceof FunctionType) {
    const rTypeMatches = compare(t1.rType, t2.rType);
    const bothNull = t1.argTypes === null && t2.argTypes === null;
    if (bothNull) {
      return rTypeMatches;
    } else {
      if (t1.argTypes === null || t2.argTypes === null)
        return false;
      return t1.argTypes.every((t, idx) => compare(t, t2.argTypes[idx]));
    }
  }
  if (t1 instanceof GenericType && t2 instanceof GenericType) {
    return t1.name === t2.name;
  }
  return false;
}
function show(t) {
  if (t instanceof SimpleType) {
    switch (t.t) {
      case 0 /* NUMBER */:
        return "NUMBER";
      case 1 /* STRING */:
        return "STRING";
      case 2 /* LOGIC */:
        return "LOGIC";
    }
  }
  if (t instanceof ArrayType) {
    return `${show(t.t)} ARRAY`;
  }
  if (t instanceof ReferenceType) {
    return `${show(t.t)} REFERENCE`;
  }
  if (t instanceof NoneType)
    return "NONE";
  if (t instanceof UnknownType)
    return "UNKNOWN";
  if (t instanceof HeterogenousArrayType)
    return `[${t.ts.map((type) => show(type))}]`;
  if (t instanceof FunctionType)
    return t.argTypes ? `FN(${t.argTypes.map((t2) => show(t2))}) => ${show(t.rType)}` : `FN(?) => ${show(t.rType)}`;
  if (t instanceof GenericType)
    return t.name;
  throw new Error(`Show: Should not happen.`);
}
function typeCheck(ast, env) {
  function ensure(ast2, expected) {
    const actual = typeCheck(ast2, env)[0];
    if (actual instanceof GenericType)
      return actual;
    if (!compare(actual, expected))
      throw new TypeCheckError(`Expected ${show(expected)}, got ${show(actual)}`, ast2.token);
    return actual;
  }
  switch (ast.tag) {
    case 1 /* ARRINDEX */: {
      ast.index.forEach((e) => ensure(e, NUMBER));
      const variable = env.get(ast.variable.name);
      if (variable.kind === 1 /* ARRAY */) {
        return [variable.t, env];
      } else if (variable.kind === 3 /* HETEROGENOUS */) {
        return [new UnknownType(), env];
      }
      throw new Error(`Expected ${ast.variable.name} to be T ARRAY, got ${show(variable)}.`);
    }
    case 3 /* ATOM */: {
      if (typeof ast.value === "number")
        return [NUMBER, env];
      if (typeof ast.value === "boolean")
        return [LOGIC, env];
      if (typeof ast.value === "string")
        return [STRING, env];
      throw new Error(`Expected number|string|boolean, got ${typeof ast.value}`);
    }
    case 4 /* BINOP */: {
      let eqOrThrow2 = function(a1, a2) {
        const t1 = typeCheck(a1, env)[0];
        const t2 = typeCheck(a2, env)[0];
        if (!compare(t1, t2)) {
          throw new Error(`Expected both sides to be ${show(t1)}, but right side was ${show(t2)}`);
        }
      };
      var eqOrThrow = eqOrThrow2;
      const { lhs, rhs } = ast;
      switch (ast.op) {
        case 0 /* ADD */:
        case 1 /* SUB */:
        case 2 /* MUL */:
        case 3 /* DIV */:
        case 4 /* MOD */:
          ensure(lhs, NUMBER) && ensure(rhs, NUMBER);
          return [NUMBER, env];
        case 5 /* EQ */:
        case 8 /* GE */:
        case 7 /* LE */:
        case 6 /* NEQ */:
        case 10 /* MORE */:
        case 9 /* LESS */:
          eqOrThrow2(lhs, rhs);
          return [LOGIC, env];
        case 11 /* AND */:
        case 12 /* OR */:
          ensure(lhs, LOGIC) && ensure(rhs, LOGIC);
          return [LOGIC, env];
      }
    }
    case 12 /* NOT */: {
      ensure(ast.expr, LOGIC);
      return [LOGIC, env];
    }
    case 15 /* REFERENCE */: {
      return [new ReferenceType(typeCheck(ast.inner, env)[0]), env];
    }
    case 18 /* VARIABLE */: {
      return [env.get(ast.name), env];
    }
    case 0 /* ARRAYCOMP */: {
      const types = ast.expressions.map((e) => typeCheck(e, env)[0]);
      const same = types.every((t) => compare(t, types[0]));
      if (same) {
        return [NONE, env.with(ast.variable.name, new ArrayType(types[0]))];
      } else {
        return [NONE, env.with(ast.variable.name, new HeterogenousArrayType(types))];
      }
    }
    case 2 /* ASSIGN */: {
      const valueType = typeCheck(ast.value, env)[0];
      if (ast.variable.tag === 1 /* ARRINDEX */) {
        const variable = env.get(ast.variable.variable.name);
        if (variable.kind === 1 /* ARRAY */) {
          if (!compare(variable.t, valueType)) {
            throw new Error(`Expected ${show(valueType)} ARRAY, got ${show(variable)}`);
          }
          ast.variable.index.forEach((e) => ensure(e, NUMBER));
          return [NONE, env];
        } else if (variable.kind === 3 /* HETEROGENOUS */) {
          ast.variable.index.forEach((e) => ensure(e, NUMBER));
          return [NONE, env];
        } else {
          throw new Error(`Expected ${show(valueType)} ARRAY, got ${show(variable)}`);
        }
      } else {
        return [NONE, env.with(ast.variable.name, typeCheck(ast.value, env)[0])];
      }
    }
    case 5 /* BLOCK */: {
      const wantToPush = (ast2) => [10 /* IF */, 7 /* FOR */, 16 /* RETURN */, 19 /* WHILE */].some((t) => ast2.tag === t);
      const state = ast.statements.reduce(
        (state2, statement) => {
          const step = typeCheck(statement, state2.env);
          return { types: wantToPush(statement) ? state2.types.concat(step[0]) : state2.types, env: step[1] };
        },
        { types: [], env }
      );
      const types = state.types.filter((t) => !compare(t, NONE));
      if (types.length === 0)
        return [NONE, state.env];
      if (types.length === 1)
        return [types[0], state.env];
      return [new HeterogenousArrayType(types), state.env];
    }
    case 6 /* DEBUG */: {
      return [NONE, env];
    }
    case 7 /* FOR */: {
      ensure(ast.from, NUMBER);
      ensure(ast.to, NUMBER);
      return typeCheck(ast.body, env.with(ast.variable.name, NUMBER));
    }
    case 9 /* FUNCDECL */: {
      const types = ast.parameters.map((t) => typeCheck(t, env)[0]);
      const nEnv = types.reduce((state, t, idx) => {
        const arg = ast.parameters[idx].name;
        const name = typeof arg === "string" ? arg : arg.name;
        const inner = t instanceof ReferenceType ? t.t : t;
        return state.with(name, inner);
      }, env).with(ast.name, new FunctionType(NUMBER, null, null));
      const type = typeCheck(ast.body, nEnv)[0];
      return [NONE, env.with(ast.name, new FunctionType(type, types, ast))];
    }
    case 8 /* FUNCCALL */: {
      const func = env.get(ast.name);
      if (!(func instanceof FunctionType))
        throw new Error("nonfunc");
      const at = func.argTypes;
      if (at === null) {
        return [func.rType, env];
      }
      if (func.decl === null) {
        throw new Error("Nodef");
      }
      if (at.length != ast.arguments.length)
        throw new Error("len");
      const nEnv = [...ast.arguments].reverse().reduce((state, arg, idx) => {
        const type = "lexeme" in arg ? env.get(arg.lexeme) : typeCheck(arg, env)[0];
        const name = "lexeme" in arg ? arg.lexeme : arg.token.lexeme;
        const expected = at[idx];
        if (expected instanceof GenericType) {
          return state.substitute(expected.name, type).with(name, type);
        } else {
          if (!compare(type, expected))
            throw new Error(`Expected ${show(expected)}, got ${show(type)}.`);
          return state.with(name, type);
        }
      }, env);
      typeCheck(func.decl, nEnv);
      return [func.rType, env];
    }
    case 13 /* PARAMETER */: {
      const isFunc = typeof ast.name === "string";
      let type = ast.type;
      if (ast.isArr)
        type = new ArrayType(type);
      if (ast.byRef)
        type = new ReferenceType(type);
      if (isFunc)
        type = new FunctionType(type, null, null);
      return [type, env];
    }
    case 10 /* IF */: {
      ensure(ast.main_path.pred, LOGIC);
      const mainType = typeCheck(ast.main_path.branch, env)[0];
      const elseType = ast.false_path ? typeCheck(ast.false_path, env)[0] : null;
      const elifTypes = ast.elif_path.map((p) => (ensure(p.pred, LOGIC), typeCheck(p.branch, env)[0]));
      if (elseType && !compare(mainType, elseType)) {
        throw new Error(`If has type ${show(mainType)}, but else has ${show(elseType)}.`);
      }
      elifTypes.forEach((t, idx) => {
        if (!compare(mainType, t)) {
          throw new Error(`If has type ${show(mainType)}, but the ${idx + 1}th else if has ${show(t)}.`);
        }
      });
      return [mainType, env];
    }
    case 11 /* NEWARRAY */: {
      ast.dimensions.forEach((e) => ensure(e, NUMBER));
      return [NONE, env.with(ast.variable.name, new ArrayType(ast.type))];
    }
    case 14 /* PRINT */: {
      typeCheck(ast.expr, env);
      return [NONE, env];
    }
    case 16 /* RETURN */: {
      if (Array.isArray(ast.expr)) {
        return [new HeterogenousArrayType(ast.expr.map((e) => typeCheck(e, env)[0])), env];
      } else {
        return typeCheck(ast.expr, env);
      }
    }
    case 17 /* SWAP */: {
      const t2 = typeCheck(ast.var2, env)[0];
      ensure(ast.var1, t2);
      return [NONE, env];
    }
    case 19 /* WHILE */: {
      ensure(ast.predicate, LOGIC);
      return typeCheck(ast.body, env);
    }
  }
}

// src/parser/monadic_parser_base.ts
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

// src/parser/ast_parser.ts
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
var parseFuncCall = Parser.do().bindT("name", 31 /* FUNCNAME */).bind("args", parseExpression.or(Parser.matchT(31 /* FUNCNAME */)).sepBy(Parser.matchT(21 /* COMMA */)).parens()).result(({ name, args }) => mkToken(name, 8 /* FUNCCALL */, { name: name.lexeme, arguments: args.reverse() }));
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

// src/compiler/typemap.ts
var TypeMap = class {
  constructor(types, substitutions) {
    this.types = types;
    this.substitutions = substitutions;
  }
  with(name, type) {
    return new TypeMap([...this.types, { name, type }], this.substitutions);
  }
  substitute(name, type) {
    return new TypeMap(this.types, [...this.substitutions, { name, type }]);
  }
  find(name) {
    const first = this.types.find((t) => t.name === name);
    if (!first)
      return void 0;
    if (first.type instanceof GenericType) {
      return this.substitutions.find((t) => t.name === first.type.name) ?? first;
    }
    return first;
  }
  exists(name) {
    return this.find(name) !== void 0;
  }
  get(name) {
    const val = this.find(name);
    if (!val)
      throw new Error(`${name} has no binding.`);
    return val.type;
  }
  getSubst(gt) {
    const type = this.substitutions.find((t) => t.name === gt.name)?.type;
    return type ?? gt;
  }
};

// src/frontend/healthcheck.ts
window.addEventListener("load", () => {
  const tbody = document.getElementById("algorithms");
  const counter = document.getElementById("counter");
  fetch("./jegyzet.json").then((r) => r.json()).then((json) => {
    const result = [];
    for (const elem in json) {
      const collection = json[elem];
      result.push({
        type: "chapter",
        number: Number(elem)
      });
      for (let idx = 0; idx < collection.length; idx++) {
        const entry = collection[idx];
        const tokens = tokenize(entry.code.join("\n"))[1];
        const index = Number(elem) * 100 + idx;
        const name = entry.name;
        if (tokens.at(-1)?.type == 37 /* ERROR */) {
          result.push({
            type: "entry",
            name,
            error: "Tokenizer failed",
            tokenizes: false,
            ast: false,
            typechecks: false
          });
          continue;
        }
        const match = parseBlock.run(tokens);
        if (match.type == "error") {
          result.push({
            type: "entry",
            name,
            error: match.cause,
            tokenizes: true,
            ast: false,
            typechecks: false
          });
          continue;
        }
        try {
          typeCheck(match.value, new TypeMap([], []));
          result.push({
            type: "entry",
            name,
            error: null,
            tokenizes: true,
            ast: true,
            typechecks: true
          });
        } catch (e) {
          if (!(e instanceof Error))
            throw e;
          result.push({
            type: "entry",
            name,
            error: e.message,
            tokenizes: true,
            ast: true,
            typechecks: false
          });
        }
      }
    }
    return result;
  }).then((results) => {
    const rowToHTML = (row) => {
      if (row.type === "entry") {
        return `<tr>
                    <td class="name">${row.name}</td>
                    <td>${row.tokenizes ? "\u2705" : "\u274C"}</td>
                    <td>${row.ast ? "\u2705" : "\u274C"}</td>
                    <td>${row.typechecks ? "\u2705" : "\u274C"}</td>
                    <td>${row.error ? row.error : ""}</td>
                </tr>`;
      } else {
        return `<tr><td colspan=5>${row.number}. Chapter</td></tr>`;
      }
    };
    tbody.innerHTML = results.map(rowToHTML).join("\n");
    counter.innerHTML = `${results.filter((r) => r.type === "entry" && r.tokenizes && r.typechecks).length}/${results.filter((r) => r.type === "entry").length} pass.`;
  });
});
//# sourceMappingURL=healthcheck.js.map
