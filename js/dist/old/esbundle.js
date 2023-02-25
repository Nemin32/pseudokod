var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// (disabled):fs
var require_fs = __commonJS({
  "(disabled):fs"() {
  }
});

// node_modules/antlr4/src/antlr4/utils/stringHashCode.js
String.prototype.seed = String.prototype.seed || Math.round(Math.random() * Math.pow(2, 32));
String.prototype.hashCode = function() {
  const key = this.toString();
  let h1b, k1;
  const remainder = key.length & 3;
  const bytes = key.length - remainder;
  let h1 = String.prototype.seed;
  const c1 = 3432918353;
  const c2 = 461845907;
  let i = 0;
  while (i < bytes) {
    k1 = key.charCodeAt(i) & 255 | (key.charCodeAt(++i) & 255) << 8 | (key.charCodeAt(++i) & 255) << 16 | (key.charCodeAt(++i) & 255) << 24;
    ++i;
    k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1b = (h1 & 65535) * 5 + (((h1 >>> 16) * 5 & 65535) << 16) & 4294967295;
    h1 = (h1b & 65535) + 27492 + (((h1b >>> 16) + 58964 & 65535) << 16);
  }
  k1 = 0;
  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 255) << 16;
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 255) << 8;
    case 1:
      k1 ^= key.charCodeAt(i) & 255;
      k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
      k1 = k1 << 15 | k1 >>> 17;
      k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
      h1 ^= k1;
  }
  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = (h1 & 65535) * 2246822507 + (((h1 >>> 16) * 2246822507 & 65535) << 16) & 4294967295;
  h1 ^= h1 >>> 13;
  h1 = (h1 & 65535) * 3266489909 + (((h1 >>> 16) * 3266489909 & 65535) << 16) & 4294967295;
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
};

// node_modules/antlr4/src/antlr4/polyfills/codepointat.js
if (!String.prototype.codePointAt) {
  (function() {
    "use strict";
    var defineProperty = function() {
      let result;
      try {
        const object = {};
        const $defineProperty = Object.defineProperty;
        result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) {
      }
      return result;
    }();
    const codePointAt = function(position) {
      if (this == null) {
        throw TypeError();
      }
      const string = String(this);
      const size = string.length;
      let index = position ? Number(position) : 0;
      if (index !== index) {
        index = 0;
      }
      if (index < 0 || index >= size) {
        return void 0;
      }
      const first = string.charCodeAt(index);
      let second;
      if (first >= 55296 && first <= 56319 && size > index + 1) {
        second = string.charCodeAt(index + 1);
        if (second >= 56320 && second <= 57343) {
          return (first - 55296) * 1024 + second - 56320 + 65536;
        }
      }
      return first;
    };
    if (defineProperty) {
      defineProperty(String.prototype, "codePointAt", {
        "value": codePointAt,
        "configurable": true,
        "writable": true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  })();
}

// node_modules/antlr4/src/antlr4/polyfills/fromcodepoint.js
if (!String.fromCodePoint) {
  (function() {
    const defineProperty = function() {
      let result;
      try {
        const object = {};
        const $defineProperty = Object.defineProperty;
        result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) {
      }
      return result;
    }();
    const stringFromCharCode = String.fromCharCode;
    const floor = Math.floor;
    const fromCodePoint = function(_) {
      const MAX_SIZE = 16384;
      const codeUnits = [];
      let highSurrogate;
      let lowSurrogate;
      let index = -1;
      const length = arguments.length;
      if (!length) {
        return "";
      }
      let result = "";
      while (++index < length) {
        let codePoint = Number(arguments[index]);
        if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) !== codePoint) {
          throw RangeError("Invalid code point: " + codePoint);
        }
        if (codePoint <= 65535) {
          codeUnits.push(codePoint);
        } else {
          codePoint -= 65536;
          highSurrogate = (codePoint >> 10) + 55296;
          lowSurrogate = codePoint % 1024 + 56320;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 === length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    if (defineProperty) {
      defineProperty(String, "fromCodePoint", {
        "value": fromCodePoint,
        "configurable": true,
        "writable": true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  })();
}

// node_modules/antlr4/src/antlr4/Token.js
var Token = class {
  constructor() {
    this.source = null;
    this.type = null;
    this.channel = null;
    this.start = null;
    this.stop = null;
    this.tokenIndex = null;
    this.line = null;
    this.column = null;
    this._text = null;
  }
  getTokenSource() {
    return this.source[0];
  }
  getInputStream() {
    return this.source[1];
  }
  get text() {
    return this._text;
  }
  set text(text) {
    this._text = text;
  }
};
Token.INVALID_TYPE = 0;
Token.EPSILON = -2;
Token.MIN_USER_TOKEN_TYPE = 1;
Token.EOF = -1;
Token.DEFAULT_CHANNEL = 0;
Token.HIDDEN_CHANNEL = 1;

// node_modules/antlr4/src/antlr4/utils/equalArrays.js
function equalArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b))
    return false;
  if (a === b)
    return true;
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i])
      continue;
    if (!a[i].equals || !a[i].equals(b[i]))
      return false;
  }
  return true;
}

// node_modules/antlr4/src/antlr4/misc/HashCode.js
var HashCode = class {
  constructor() {
    this.count = 0;
    this.hash = 0;
  }
  update() {
    for (let i = 0; i < arguments.length; i++) {
      const value = arguments[i];
      if (value == null)
        continue;
      if (Array.isArray(value))
        this.update.apply(this, value);
      else {
        let k = 0;
        switch (typeof value) {
          case "undefined":
          case "function":
            continue;
          case "number":
          case "boolean":
            k = value;
            break;
          case "string":
            k = value.hashCode();
            break;
          default:
            if (value.updateHashCode)
              value.updateHashCode(this);
            else
              console.log("No updateHashCode for " + value.toString());
            continue;
        }
        k = k * 3432918353;
        k = k << 15 | k >>> 32 - 15;
        k = k * 461845907;
        this.count = this.count + 1;
        let hash = this.hash ^ k;
        hash = hash << 13 | hash >>> 32 - 13;
        hash = hash * 5 + 3864292196;
        this.hash = hash;
      }
    }
  }
  finish() {
    let hash = this.hash ^ this.count * 4;
    hash = hash ^ hash >>> 16;
    hash = hash * 2246822507;
    hash = hash ^ hash >>> 13;
    hash = hash * 3266489909;
    hash = hash ^ hash >>> 16;
    return hash;
  }
  static hashStuff() {
    const hash = new HashCode();
    hash.update.apply(hash, arguments);
    return hash.finish();
  }
};

// node_modules/antlr4/src/antlr4/utils/standardHashCodeFunction.js
function standardHashCodeFunction(a) {
  return a ? a.hashCode() : -1;
}

// node_modules/antlr4/src/antlr4/utils/standardEqualsFunction.js
function standardEqualsFunction(a, b) {
  return a ? a.equals(b) : a === b;
}

// node_modules/antlr4/src/antlr4/utils/valueToString.js
function valueToString(v) {
  return v === null ? "null" : v;
}

// node_modules/antlr4/src/antlr4/utils/arrayToString.js
function arrayToString(a) {
  return Array.isArray(a) ? "[" + a.map(valueToString).join(", ") + "]" : "null";
}

// node_modules/antlr4/src/antlr4/misc/HashSet.js
var HASH_KEY_PREFIX = "h-";
var HashSet = class {
  constructor(hashFunction, equalsFunction) {
    this.data = {};
    this.hashFunction = hashFunction || standardHashCodeFunction;
    this.equalsFunction = equalsFunction || standardEqualsFunction;
  }
  add(value) {
    const key = HASH_KEY_PREFIX + this.hashFunction(value);
    if (key in this.data) {
      const values = this.data[key];
      for (let i = 0; i < values.length; i++) {
        if (this.equalsFunction(value, values[i])) {
          return values[i];
        }
      }
      values.push(value);
      return value;
    } else {
      this.data[key] = [value];
      return value;
    }
  }
  has(value) {
    return this.get(value) != null;
  }
  get(value) {
    const key = HASH_KEY_PREFIX + this.hashFunction(value);
    if (key in this.data) {
      const values = this.data[key];
      for (let i = 0; i < values.length; i++) {
        if (this.equalsFunction(value, values[i])) {
          return values[i];
        }
      }
    }
    return null;
  }
  values() {
    return Object.keys(this.data).filter((key) => key.startsWith(HASH_KEY_PREFIX)).flatMap((key) => this.data[key], this);
  }
  toString() {
    return arrayToString(this.values());
  }
  get length() {
    return Object.keys(this.data).filter((key) => key.startsWith(HASH_KEY_PREFIX)).map((key) => this.data[key].length, this).reduce((accum, item) => accum + item, 0);
  }
};

// node_modules/antlr4/src/antlr4/atn/SemanticContext.js
var SemanticContext = class {
  hashCode() {
    const hash = new HashCode();
    this.updateHashCode(hash);
    return hash.finish();
  }
  evaluate(parser, outerContext) {
  }
  evalPrecedence(parser, outerContext) {
    return this;
  }
  static andContext(a, b) {
    if (a === null || a === SemanticContext.NONE) {
      return b;
    }
    if (b === null || b === SemanticContext.NONE) {
      return a;
    }
    const result = new AND(a, b);
    if (result.opnds.length === 1) {
      return result.opnds[0];
    } else {
      return result;
    }
  }
  static orContext(a, b) {
    if (a === null) {
      return b;
    }
    if (b === null) {
      return a;
    }
    if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
      return SemanticContext.NONE;
    }
    const result = new OR(a, b);
    if (result.opnds.length === 1) {
      return result.opnds[0];
    } else {
      return result;
    }
  }
};
var AND = class extends SemanticContext {
  constructor(a, b) {
    super();
    const operands = new HashSet();
    if (a instanceof AND) {
      a.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(a);
    }
    if (b instanceof AND) {
      b.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(b);
    }
    const precedencePredicates = filterPrecedencePredicates(operands);
    if (precedencePredicates.length > 0) {
      let reduced = null;
      precedencePredicates.map(function(p) {
        if (reduced === null || p.precedence < reduced.precedence) {
          reduced = p;
        }
      });
      operands.add(reduced);
    }
    this.opnds = Array.from(operands.values());
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof AND)) {
      return false;
    } else {
      return equalArrays(this.opnds, other.opnds);
    }
  }
  updateHashCode(hash) {
    hash.update(this.opnds, "AND");
  }
  evaluate(parser, outerContext) {
    for (let i = 0; i < this.opnds.length; i++) {
      if (!this.opnds[i].evaluate(parser, outerContext)) {
        return false;
      }
    }
    return true;
  }
  evalPrecedence(parser, outerContext) {
    let differs = false;
    const operands = [];
    for (let i = 0; i < this.opnds.length; i++) {
      const context = this.opnds[i];
      const evaluated = context.evalPrecedence(parser, outerContext);
      differs |= evaluated !== context;
      if (evaluated === null) {
        return null;
      } else if (evaluated !== SemanticContext.NONE) {
        operands.push(evaluated);
      }
    }
    if (!differs) {
      return this;
    }
    if (operands.length === 0) {
      return SemanticContext.NONE;
    }
    let result = null;
    operands.map(function(o) {
      result = result === null ? o : SemanticContext.andContext(result, o);
    });
    return result;
  }
  toString() {
    const s = this.opnds.map((o) => o.toString());
    return (s.length > 3 ? s.slice(3) : s).join("&&");
  }
};
var OR = class extends SemanticContext {
  constructor(a, b) {
    super();
    const operands = new HashSet();
    if (a instanceof OR) {
      a.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(a);
    }
    if (b instanceof OR) {
      b.opnds.map(function(o) {
        operands.add(o);
      });
    } else {
      operands.add(b);
    }
    const precedencePredicates = filterPrecedencePredicates(operands);
    if (precedencePredicates.length > 0) {
      const s = precedencePredicates.sort(function(a2, b2) {
        return a2.compareTo(b2);
      });
      const reduced = s[s.length - 1];
      operands.add(reduced);
    }
    this.opnds = Array.from(operands.values());
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof OR)) {
      return false;
    } else {
      return equalArrays(this.opnds, other.opnds);
    }
  }
  updateHashCode(hash) {
    hash.update(this.opnds, "OR");
  }
  evaluate(parser, outerContext) {
    for (let i = 0; i < this.opnds.length; i++) {
      if (this.opnds[i].evaluate(parser, outerContext)) {
        return true;
      }
    }
    return false;
  }
  evalPrecedence(parser, outerContext) {
    let differs = false;
    const operands = [];
    for (let i = 0; i < this.opnds.length; i++) {
      const context = this.opnds[i];
      const evaluated = context.evalPrecedence(parser, outerContext);
      differs |= evaluated !== context;
      if (evaluated === SemanticContext.NONE) {
        return SemanticContext.NONE;
      } else if (evaluated !== null) {
        operands.push(evaluated);
      }
    }
    if (!differs) {
      return this;
    }
    if (operands.length === 0) {
      return null;
    }
    const result = null;
    operands.map(function(o) {
      return result === null ? o : SemanticContext.orContext(result, o);
    });
    return result;
  }
  toString() {
    const s = this.opnds.map((o) => o.toString());
    return (s.length > 3 ? s.slice(3) : s).join("||");
  }
};
function filterPrecedencePredicates(set) {
  const result = [];
  set.values().map(function(context) {
    if (context instanceof SemanticContext.PrecedencePredicate) {
      result.push(context);
    }
  });
  return result;
}

// node_modules/antlr4/src/antlr4/atn/ATNConfig.js
function checkParams(params, isCfg) {
  if (params === null) {
    const result = { state: null, alt: null, context: null, semanticContext: null };
    if (isCfg) {
      result.reachesIntoOuterContext = 0;
    }
    return result;
  } else {
    const props = {};
    props.state = params.state || null;
    props.alt = params.alt === void 0 ? null : params.alt;
    props.context = params.context || null;
    props.semanticContext = params.semanticContext || null;
    if (isCfg) {
      props.reachesIntoOuterContext = params.reachesIntoOuterContext || 0;
      props.precedenceFilterSuppressed = params.precedenceFilterSuppressed || false;
    }
    return props;
  }
}
var ATNConfig = class {
  constructor(params, config) {
    this.checkContext(params, config);
    params = checkParams(params);
    config = checkParams(config, true);
    this.state = params.state !== null ? params.state : config.state;
    this.alt = params.alt !== null ? params.alt : config.alt;
    this.context = params.context !== null ? params.context : config.context;
    this.semanticContext = params.semanticContext !== null ? params.semanticContext : config.semanticContext !== null ? config.semanticContext : SemanticContext.NONE;
    this.reachesIntoOuterContext = config.reachesIntoOuterContext;
    this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
  }
  checkContext(params, config) {
    if ((params.context === null || params.context === void 0) && (config === null || config.context === null || config.context === void 0)) {
      this.context = null;
    }
  }
  hashCode() {
    const hash = new HashCode();
    this.updateHashCode(hash);
    return hash.finish();
  }
  updateHashCode(hash) {
    hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof ATNConfig)) {
      return false;
    } else {
      return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && (this.context === null ? other.context === null : this.context.equals(other.context)) && this.semanticContext.equals(other.semanticContext) && this.precedenceFilterSuppressed === other.precedenceFilterSuppressed;
    }
  }
  hashCodeForConfigSet() {
    const hash = new HashCode();
    hash.update(this.state.stateNumber, this.alt, this.semanticContext);
    return hash.finish();
  }
  equalsForConfigSet(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof ATNConfig)) {
      return false;
    } else {
      return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && this.semanticContext.equals(other.semanticContext);
    }
  }
  toString() {
    return "(" + this.state + "," + this.alt + (this.context !== null ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== SemanticContext.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext > 0 ? ",up=" + this.reachesIntoOuterContext : "") + ")";
  }
};

// node_modules/antlr4/src/antlr4/misc/Interval.js
var Interval = class {
  constructor(start, stop) {
    this.start = start;
    this.stop = stop;
  }
  clone() {
    return new Interval(this.start, this.stop);
  }
  contains(item) {
    return item >= this.start && item < this.stop;
  }
  toString() {
    if (this.start === this.stop - 1) {
      return this.start.toString();
    } else {
      return this.start.toString() + ".." + (this.stop - 1).toString();
    }
  }
  get length() {
    return this.stop - this.start;
  }
};
Interval.INVALID_INTERVAL = new Interval(-1, -2);

// node_modules/antlr4/src/antlr4/misc/IntervalSet.js
var IntervalSet = class {
  constructor() {
    this.intervals = null;
    this.readOnly = false;
  }
  first(v) {
    if (this.intervals === null || this.intervals.length === 0) {
      return Token.INVALID_TYPE;
    } else {
      return this.intervals[0].start;
    }
  }
  addOne(v) {
    this.addInterval(new Interval(v, v + 1));
  }
  addRange(l, h) {
    this.addInterval(new Interval(l, h + 1));
  }
  addInterval(toAdd) {
    if (this.intervals === null) {
      this.intervals = [];
      this.intervals.push(toAdd.clone());
    } else {
      for (let pos = 0; pos < this.intervals.length; pos++) {
        const existing = this.intervals[pos];
        if (toAdd.stop < existing.start) {
          this.intervals.splice(pos, 0, toAdd);
          return;
        } else if (toAdd.stop === existing.start) {
          this.intervals[pos] = new Interval(toAdd.start, existing.stop);
          return;
        } else if (toAdd.start <= existing.stop) {
          this.intervals[pos] = new Interval(Math.min(existing.start, toAdd.start), Math.max(existing.stop, toAdd.stop));
          this.reduce(pos);
          return;
        }
      }
      this.intervals.push(toAdd.clone());
    }
  }
  addSet(other) {
    if (other.intervals !== null) {
      other.intervals.forEach((toAdd) => this.addInterval(toAdd), this);
    }
    return this;
  }
  reduce(pos) {
    if (pos < this.intervals.length - 1) {
      const current = this.intervals[pos];
      const next = this.intervals[pos + 1];
      if (current.stop >= next.stop) {
        this.intervals.splice(pos + 1, 1);
        this.reduce(pos);
      } else if (current.stop >= next.start) {
        this.intervals[pos] = new Interval(current.start, next.stop);
        this.intervals.splice(pos + 1, 1);
      }
    }
  }
  complement(start, stop) {
    const result = new IntervalSet();
    result.addInterval(new Interval(start, stop + 1));
    if (this.intervals !== null)
      this.intervals.forEach((toRemove) => result.removeRange(toRemove));
    return result;
  }
  contains(item) {
    if (this.intervals === null) {
      return false;
    } else {
      for (let k = 0; k < this.intervals.length; k++) {
        if (this.intervals[k].contains(item)) {
          return true;
        }
      }
      return false;
    }
  }
  removeRange(toRemove) {
    if (toRemove.start === toRemove.stop - 1) {
      this.removeOne(toRemove.start);
    } else if (this.intervals !== null) {
      let pos = 0;
      for (let n = 0; n < this.intervals.length; n++) {
        const existing = this.intervals[pos];
        if (toRemove.stop <= existing.start) {
          return;
        } else if (toRemove.start > existing.start && toRemove.stop < existing.stop) {
          this.intervals[pos] = new Interval(existing.start, toRemove.start);
          const x = new Interval(toRemove.stop, existing.stop);
          this.intervals.splice(pos, 0, x);
          return;
        } else if (toRemove.start <= existing.start && toRemove.stop >= existing.stop) {
          this.intervals.splice(pos, 1);
          pos = pos - 1;
        } else if (toRemove.start < existing.stop) {
          this.intervals[pos] = new Interval(existing.start, toRemove.start);
        } else if (toRemove.stop < existing.stop) {
          this.intervals[pos] = new Interval(toRemove.stop, existing.stop);
        }
        pos += 1;
      }
    }
  }
  removeOne(value) {
    if (this.intervals !== null) {
      for (let i = 0; i < this.intervals.length; i++) {
        const existing = this.intervals[i];
        if (value < existing.start) {
          return;
        } else if (value === existing.start && value === existing.stop - 1) {
          this.intervals.splice(i, 1);
          return;
        } else if (value === existing.start) {
          this.intervals[i] = new Interval(existing.start + 1, existing.stop);
          return;
        } else if (value === existing.stop - 1) {
          this.intervals[i] = new Interval(existing.start, existing.stop - 1);
          return;
        } else if (value < existing.stop - 1) {
          const replace = new Interval(existing.start, value);
          existing.start = value + 1;
          this.intervals.splice(i, 0, replace);
          return;
        }
      }
    }
  }
  toString(literalNames, symbolicNames, elemsAreChar) {
    literalNames = literalNames || null;
    symbolicNames = symbolicNames || null;
    elemsAreChar = elemsAreChar || false;
    if (this.intervals === null) {
      return "{}";
    } else if (literalNames !== null || symbolicNames !== null) {
      return this.toTokenString(literalNames, symbolicNames);
    } else if (elemsAreChar) {
      return this.toCharString();
    } else {
      return this.toIndexString();
    }
  }
  toCharString() {
    const names = [];
    for (let i = 0; i < this.intervals.length; i++) {
      const existing = this.intervals[i];
      if (existing.stop === existing.start + 1) {
        if (existing.start === Token.EOF) {
          names.push("<EOF>");
        } else {
          names.push("'" + String.fromCharCode(existing.start) + "'");
        }
      } else {
        names.push("'" + String.fromCharCode(existing.start) + "'..'" + String.fromCharCode(existing.stop - 1) + "'");
      }
    }
    if (names.length > 1) {
      return "{" + names.join(", ") + "}";
    } else {
      return names[0];
    }
  }
  toIndexString() {
    const names = [];
    for (let i = 0; i < this.intervals.length; i++) {
      const existing = this.intervals[i];
      if (existing.stop === existing.start + 1) {
        if (existing.start === Token.EOF) {
          names.push("<EOF>");
        } else {
          names.push(existing.start.toString());
        }
      } else {
        names.push(existing.start.toString() + ".." + (existing.stop - 1).toString());
      }
    }
    if (names.length > 1) {
      return "{" + names.join(", ") + "}";
    } else {
      return names[0];
    }
  }
  toTokenString(literalNames, symbolicNames) {
    const names = [];
    for (let i = 0; i < this.intervals.length; i++) {
      const existing = this.intervals[i];
      for (let j = existing.start; j < existing.stop; j++) {
        names.push(this.elementName(literalNames, symbolicNames, j));
      }
    }
    if (names.length > 1) {
      return "{" + names.join(", ") + "}";
    } else {
      return names[0];
    }
  }
  elementName(literalNames, symbolicNames, token) {
    if (token === Token.EOF) {
      return "<EOF>";
    } else if (token === Token.EPSILON) {
      return "<EPSILON>";
    } else {
      return literalNames[token] || symbolicNames[token];
    }
  }
  get length() {
    return this.intervals.map((interval) => interval.length).reduce((acc, val) => acc + val);
  }
};

// node_modules/antlr4/src/antlr4/state/ATNState.js
var ATNState = class {
  constructor() {
    this.atn = null;
    this.stateNumber = ATNState.INVALID_STATE_NUMBER;
    this.stateType = null;
    this.ruleIndex = 0;
    this.epsilonOnlyTransitions = false;
    this.transitions = [];
    this.nextTokenWithinRule = null;
  }
  toString() {
    return this.stateNumber;
  }
  equals(other) {
    if (other instanceof ATNState) {
      return this.stateNumber === other.stateNumber;
    } else {
      return false;
    }
  }
  isNonGreedyExitState() {
    return false;
  }
  addTransition(trans, index) {
    if (index === void 0) {
      index = -1;
    }
    if (this.transitions.length === 0) {
      this.epsilonOnlyTransitions = trans.isEpsilon;
    } else if (this.epsilonOnlyTransitions !== trans.isEpsilon) {
      this.epsilonOnlyTransitions = false;
    }
    if (index === -1) {
      this.transitions.push(trans);
    } else {
      this.transitions.splice(index, 1, trans);
    }
  }
};
ATNState.INVALID_TYPE = 0;
ATNState.BASIC = 1;
ATNState.RULE_START = 2;
ATNState.BLOCK_START = 3;
ATNState.PLUS_BLOCK_START = 4;
ATNState.STAR_BLOCK_START = 5;
ATNState.TOKEN_START = 6;
ATNState.RULE_STOP = 7;
ATNState.BLOCK_END = 8;
ATNState.STAR_LOOP_BACK = 9;
ATNState.STAR_LOOP_ENTRY = 10;
ATNState.PLUS_LOOP_BACK = 11;
ATNState.LOOP_END = 12;
ATNState.serializationNames = [
  "INVALID",
  "BASIC",
  "RULE_START",
  "BLOCK_START",
  "PLUS_BLOCK_START",
  "STAR_BLOCK_START",
  "TOKEN_START",
  "RULE_STOP",
  "BLOCK_END",
  "STAR_LOOP_BACK",
  "STAR_LOOP_ENTRY",
  "PLUS_LOOP_BACK",
  "LOOP_END"
];
ATNState.INVALID_STATE_NUMBER = -1;

// node_modules/antlr4/src/antlr4/state/RuleStopState.js
var RuleStopState = class extends ATNState {
  constructor() {
    super();
    this.stateType = ATNState.RULE_STOP;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/transition/Transition.js
var Transition = class {
  constructor(target) {
    if (target === void 0 || target === null) {
      throw "target cannot be null.";
    }
    this.target = target;
    this.isEpsilon = false;
    this.label = null;
  }
};
Transition.EPSILON = 1;
Transition.RANGE = 2;
Transition.RULE = 3;
Transition.PREDICATE = 4;
Transition.ATOM = 5;
Transition.ACTION = 6;
Transition.SET = 7;
Transition.NOT_SET = 8;
Transition.WILDCARD = 9;
Transition.PRECEDENCE = 10;
Transition.serializationNames = [
  "INVALID",
  "EPSILON",
  "RANGE",
  "RULE",
  "PREDICATE",
  "ATOM",
  "ACTION",
  "SET",
  "NOT_SET",
  "WILDCARD",
  "PRECEDENCE"
];
Transition.serializationTypes = {
  EpsilonTransition: Transition.EPSILON,
  RangeTransition: Transition.RANGE,
  RuleTransition: Transition.RULE,
  PredicateTransition: Transition.PREDICATE,
  AtomTransition: Transition.ATOM,
  ActionTransition: Transition.ACTION,
  SetTransition: Transition.SET,
  NotSetTransition: Transition.NOT_SET,
  WildcardTransition: Transition.WILDCARD,
  PrecedencePredicateTransition: Transition.PRECEDENCE
};

// node_modules/antlr4/src/antlr4/transition/RuleTransition.js
var RuleTransition = class extends Transition {
  constructor(ruleStart, ruleIndex, precedence, followState) {
    super(ruleStart);
    this.ruleIndex = ruleIndex;
    this.precedence = precedence;
    this.followState = followState;
    this.serializationType = Transition.RULE;
    this.isEpsilon = true;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  }
};

// node_modules/antlr4/src/antlr4/transition/SetTransition.js
var SetTransition = class extends Transition {
  constructor(target, set) {
    super(target);
    this.serializationType = Transition.SET;
    if (set !== void 0 && set !== null) {
      this.label = set;
    } else {
      this.label = new IntervalSet();
      this.label.addOne(Token.INVALID_TYPE);
    }
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return this.label.contains(symbol);
  }
  toString() {
    return this.label.toString();
  }
};

// node_modules/antlr4/src/antlr4/transition/NotSetTransition.js
var NotSetTransition = class extends SetTransition {
  constructor(target, set) {
    super(target, set);
    this.serializationType = Transition.NOT_SET;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !super.matches(symbol, minVocabSymbol, maxVocabSymbol);
  }
  toString() {
    return "~" + super.toString();
  }
};

// node_modules/antlr4/src/antlr4/transition/WildcardTransition.js
var WildcardTransition = class extends Transition {
  constructor(target) {
    super(target);
    this.serializationType = Transition.WILDCARD;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
  }
  toString() {
    return ".";
  }
};

// node_modules/antlr4/src/antlr4/atn/AbstractPredicateTransition.js
var AbstractPredicateTransition = class extends Transition {
  constructor(target) {
    super(target);
  }
};

// node_modules/antlr4/src/antlr4/tree/Tree.js
var Tree = class {
};

// node_modules/antlr4/src/antlr4/tree/SyntaxTree.js
var SyntaxTree = class extends Tree {
};

// node_modules/antlr4/src/antlr4/tree/ParseTree.js
var ParseTree = class extends SyntaxTree {
};

// node_modules/antlr4/src/antlr4/tree/RuleNode.js
var RuleNode = class extends ParseTree {
  getRuleContext() {
    throw new Error("missing interface implementation");
  }
};

// node_modules/antlr4/src/antlr4/tree/TerminalNode.js
var TerminalNode = class extends ParseTree {
};

// node_modules/antlr4/src/antlr4/tree/ErrorNode.js
var ErrorNode = class extends TerminalNode {
};

// node_modules/antlr4/src/antlr4/utils/escapeWhitespace.js
function escapeWhitespace(s, escapeSpaces) {
  s = s.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  if (escapeSpaces) {
    s = s.replace(/ /g, "\xB7");
  }
  return s;
}

// node_modules/antlr4/src/antlr4/tree/Trees.js
var Trees = {
  toStringTree: function(tree, ruleNames, recog) {
    ruleNames = ruleNames || null;
    recog = recog || null;
    if (recog !== null) {
      ruleNames = recog.ruleNames;
    }
    let s = Trees.getNodeText(tree, ruleNames);
    s = escapeWhitespace(s, false);
    const c = tree.getChildCount();
    if (c === 0) {
      return s;
    }
    let res = "(" + s + " ";
    if (c > 0) {
      s = Trees.toStringTree(tree.getChild(0), ruleNames);
      res = res.concat(s);
    }
    for (let i = 1; i < c; i++) {
      s = Trees.toStringTree(tree.getChild(i), ruleNames);
      res = res.concat(" " + s);
    }
    res = res.concat(")");
    return res;
  },
  getNodeText: function(t, ruleNames, recog) {
    ruleNames = ruleNames || null;
    recog = recog || null;
    if (recog !== null) {
      ruleNames = recog.ruleNames;
    }
    if (ruleNames !== null) {
      if (t instanceof RuleNode) {
        const context = t.getRuleContext();
        const altNumber = context.getAltNumber();
        if (altNumber != 0) {
          return ruleNames[t.ruleIndex] + ":" + altNumber;
        }
        return ruleNames[t.ruleIndex];
      } else if (t instanceof ErrorNode) {
        return t.toString();
      } else if (t instanceof TerminalNode) {
        if (t.symbol !== null) {
          return t.symbol.text;
        }
      }
    }
    const payload = t.getPayload();
    if (payload instanceof Token) {
      return payload.text;
    }
    return t.getPayload().toString();
  },
  getChildren: function(t) {
    const list = [];
    for (let i = 0; i < t.getChildCount(); i++) {
      list.push(t.getChild(i));
    }
    return list;
  },
  getAncestors: function(t) {
    let ancestors = [];
    t = t.getParent();
    while (t !== null) {
      ancestors = [t].concat(ancestors);
      t = t.getParent();
    }
    return ancestors;
  },
  findAllTokenNodes: function(t, ttype) {
    return Trees.findAllNodes(t, ttype, true);
  },
  findAllRuleNodes: function(t, ruleIndex) {
    return Trees.findAllNodes(t, ruleIndex, false);
  },
  findAllNodes: function(t, index, findTokens) {
    const nodes = [];
    Trees._findAllNodes(t, index, findTokens, nodes);
    return nodes;
  },
  _findAllNodes: function(t, index, findTokens, nodes) {
    if (findTokens && t instanceof TerminalNode) {
      if (t.symbol.type === index) {
        nodes.push(t);
      }
    } else if (!findTokens && t instanceof RuleNode) {
      if (t.ruleIndex === index) {
        nodes.push(t);
      }
    }
    for (let i = 0; i < t.getChildCount(); i++) {
      Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
    }
  },
  descendants: function(t) {
    let nodes = [t];
    for (let i = 0; i < t.getChildCount(); i++) {
      nodes = nodes.concat(Trees.descendants(t.getChild(i)));
    }
    return nodes;
  }
};
var Trees_default = Trees;

// node_modules/antlr4/src/antlr4/context/RuleContext.js
var RuleContext = class extends RuleNode {
  constructor(parent, invokingState) {
    super();
    this.parentCtx = parent || null;
    this.invokingState = invokingState || -1;
  }
  depth() {
    let n = 0;
    let p = this;
    while (p !== null) {
      p = p.parentCtx;
      n += 1;
    }
    return n;
  }
  isEmpty() {
    return this.invokingState === -1;
  }
  getSourceInterval() {
    return Interval.INVALID_INTERVAL;
  }
  getRuleContext() {
    return this;
  }
  getPayload() {
    return this;
  }
  getText() {
    if (this.getChildCount() === 0) {
      return "";
    } else {
      return this.children.map(function(child) {
        return child.getText();
      }).join("");
    }
  }
  getAltNumber() {
    return 0;
  }
  setAltNumber(altNumber) {
  }
  getChild(i) {
    return null;
  }
  getChildCount() {
    return 0;
  }
  accept(visitor) {
    return visitor.visitChildren(this);
  }
  toStringTree(ruleNames, recog) {
    return Trees_default.toStringTree(this, ruleNames, recog);
  }
  toString(ruleNames, stop) {
    ruleNames = ruleNames || null;
    stop = stop || null;
    let p = this;
    let s = "[";
    while (p !== null && p !== stop) {
      if (ruleNames === null) {
        if (!p.isEmpty()) {
          s += p.invokingState;
        }
      } else {
        const ri = p.ruleIndex;
        const ruleName = ri >= 0 && ri < ruleNames.length ? ruleNames[ri] : "" + ri;
        s += ruleName;
      }
      if (p.parentCtx !== null && (ruleNames !== null || !p.parentCtx.isEmpty())) {
        s += " ";
      }
      p = p.parentCtx;
    }
    s += "]";
    return s;
  }
};

// node_modules/antlr4/src/antlr4/context/PredictionContext.js
var PredictionContext = class {
  constructor(cachedHashCode) {
    this.cachedHashCode = cachedHashCode;
  }
  isEmpty() {
    return this === PredictionContext.EMPTY;
  }
  hasEmptyPath() {
    return this.getReturnState(this.length - 1) === PredictionContext.EMPTY_RETURN_STATE;
  }
  hashCode() {
    return this.cachedHashCode;
  }
  updateHashCode(hash) {
    hash.update(this.cachedHashCode);
  }
};
PredictionContext.EMPTY = null;
PredictionContext.EMPTY_RETURN_STATE = 2147483647;
PredictionContext.globalNodeCount = 1;
PredictionContext.id = PredictionContext.globalNodeCount;

// node_modules/antlr4/src/antlr4/context/ArrayPredictionContext.js
var ArrayPredictionContext = class extends PredictionContext {
  constructor(parents, returnStates) {
    const h = new HashCode();
    h.update(parents, returnStates);
    const hashCode = h.finish();
    super(hashCode);
    this.parents = parents;
    this.returnStates = returnStates;
    return this;
  }
  isEmpty() {
    return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
  }
  getParent(index) {
    return this.parents[index];
  }
  getReturnState(index) {
    return this.returnStates[index];
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof ArrayPredictionContext)) {
      return false;
    } else if (this.hashCode() !== other.hashCode()) {
      return false;
    } else {
      return equalArrays(this.returnStates, other.returnStates) && equalArrays(this.parents, other.parents);
    }
  }
  toString() {
    if (this.isEmpty()) {
      return "[]";
    } else {
      let s = "[";
      for (let i = 0; i < this.returnStates.length; i++) {
        if (i > 0) {
          s = s + ", ";
        }
        if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
          s = s + "$";
          continue;
        }
        s = s + this.returnStates[i];
        if (this.parents[i] !== null) {
          s = s + " " + this.parents[i];
        } else {
          s = s + "null";
        }
      }
      return s + "]";
    }
  }
  get length() {
    return this.returnStates.length;
  }
};

// node_modules/antlr4/src/antlr4/context/SingletonPredictionContext.js
var SingletonPredictionContext = class extends PredictionContext {
  constructor(parent, returnState) {
    let hashCode = 0;
    const hash = new HashCode();
    if (parent !== null) {
      hash.update(parent, returnState);
    } else {
      hash.update(1);
    }
    hashCode = hash.finish();
    super(hashCode);
    this.parentCtx = parent;
    this.returnState = returnState;
  }
  getParent(index) {
    return this.parentCtx;
  }
  getReturnState(index) {
    return this.returnState;
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof SingletonPredictionContext)) {
      return false;
    } else if (this.hashCode() !== other.hashCode()) {
      return false;
    } else {
      if (this.returnState !== other.returnState)
        return false;
      else if (this.parentCtx == null)
        return other.parentCtx == null;
      else
        return this.parentCtx.equals(other.parentCtx);
    }
  }
  toString() {
    const up = this.parentCtx === null ? "" : this.parentCtx.toString();
    if (up.length === 0) {
      if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) {
        return "$";
      } else {
        return "" + this.returnState;
      }
    } else {
      return "" + this.returnState + " " + up;
    }
  }
  get length() {
    return 1;
  }
  static create(parent, returnState) {
    if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) {
      return PredictionContext.EMPTY;
    } else {
      return new SingletonPredictionContext(parent, returnState);
    }
  }
};

// node_modules/antlr4/src/antlr4/context/EmptyPredictionContext.js
var EmptyPredictionContext = class extends SingletonPredictionContext {
  constructor() {
    super(null, PredictionContext.EMPTY_RETURN_STATE);
  }
  isEmpty() {
    return true;
  }
  getParent(index) {
    return null;
  }
  getReturnState(index) {
    return this.returnState;
  }
  equals(other) {
    return this === other;
  }
  toString() {
    return "$";
  }
};
PredictionContext.EMPTY = new EmptyPredictionContext();

// node_modules/antlr4/src/antlr4/misc/HashMap.js
var HASH_KEY_PREFIX2 = "h-";
var HashMap = class {
  constructor(hashFunction, equalsFunction) {
    this.data = {};
    this.hashFunction = hashFunction || standardHashCodeFunction;
    this.equalsFunction = equalsFunction || standardEqualsFunction;
  }
  set(key, value) {
    const hashKey = HASH_KEY_PREFIX2 + this.hashFunction(key);
    if (hashKey in this.data) {
      const entries = this.data[hashKey];
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (this.equalsFunction(key, entry.key)) {
          const oldValue = entry.value;
          entry.value = value;
          return oldValue;
        }
      }
      entries.push({ key, value });
      return value;
    } else {
      this.data[hashKey] = [{ key, value }];
      return value;
    }
  }
  containsKey(key) {
    const hashKey = HASH_KEY_PREFIX2 + this.hashFunction(key);
    if (hashKey in this.data) {
      const entries = this.data[hashKey];
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (this.equalsFunction(key, entry.key))
          return true;
      }
    }
    return false;
  }
  get(key) {
    const hashKey = HASH_KEY_PREFIX2 + this.hashFunction(key);
    if (hashKey in this.data) {
      const entries = this.data[hashKey];
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (this.equalsFunction(key, entry.key))
          return entry.value;
      }
    }
    return null;
  }
  entries() {
    return Object.keys(this.data).filter((key) => key.startsWith(HASH_KEY_PREFIX2)).flatMap((key) => this.data[key], this);
  }
  getKeys() {
    return this.entries().map((e) => e.key);
  }
  getValues() {
    return this.entries().map((e) => e.value);
  }
  toString() {
    const ss = this.entries().map((e) => "{" + e.key + ":" + e.value + "}");
    return "[" + ss.join(", ") + "]";
  }
  get length() {
    return Object.keys(this.data).filter((key) => key.startsWith(HASH_KEY_PREFIX2)).map((key) => this.data[key].length, this).reduce((accum, item) => accum + item, 0);
  }
};

// node_modules/antlr4/src/antlr4/context/PredictionContextUtils.js
function predictionContextFromRuleContext(atn3, outerContext) {
  if (outerContext === void 0 || outerContext === null) {
    outerContext = RuleContext.EMPTY;
  }
  if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
    return PredictionContext.EMPTY;
  }
  const parent = predictionContextFromRuleContext(atn3, outerContext.parentCtx);
  const state = atn3.states[outerContext.invokingState];
  const transition = state.transitions[0];
  return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
}
function getCachedPredictionContext(context, contextCache, visited) {
  if (context.isEmpty()) {
    return context;
  }
  let existing = visited.get(context) || null;
  if (existing !== null) {
    return existing;
  }
  existing = contextCache.get(context);
  if (existing !== null) {
    visited.set(context, existing);
    return existing;
  }
  let changed = false;
  let parents = [];
  for (let i = 0; i < parents.length; i++) {
    const parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);
    if (changed || parent !== context.getParent(i)) {
      if (!changed) {
        parents = [];
        for (let j = 0; j < context.length; j++) {
          parents[j] = context.getParent(j);
        }
        changed = true;
      }
      parents[i] = parent;
    }
  }
  if (!changed) {
    contextCache.add(context);
    visited.set(context, context);
    return context;
  }
  let updated = null;
  if (parents.length === 0) {
    updated = PredictionContext.EMPTY;
  } else if (parents.length === 1) {
    updated = SingletonPredictionContext.create(parents[0], context.getReturnState(0));
  } else {
    updated = new ArrayPredictionContext(parents, context.returnStates);
  }
  contextCache.add(updated);
  visited.set(updated, updated);
  visited.set(context, updated);
  return updated;
}
function merge(a, b, rootIsWildcard, mergeCache) {
  if (a === b) {
    return a;
  }
  if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) {
    return mergeSingletons(a, b, rootIsWildcard, mergeCache);
  }
  if (rootIsWildcard) {
    if (a instanceof EmptyPredictionContext) {
      return a;
    }
    if (b instanceof EmptyPredictionContext) {
      return b;
    }
  }
  if (a instanceof SingletonPredictionContext) {
    a = new ArrayPredictionContext([a.getParent()], [a.returnState]);
  }
  if (b instanceof SingletonPredictionContext) {
    b = new ArrayPredictionContext([b.getParent()], [b.returnState]);
  }
  return mergeArrays(a, b, rootIsWildcard, mergeCache);
}
function mergeArrays(a, b, rootIsWildcard, mergeCache) {
  if (mergeCache !== null) {
    let previous = mergeCache.get(a, b);
    if (previous !== null) {
      return previous;
    }
    previous = mergeCache.get(b, a);
    if (previous !== null) {
      return previous;
    }
  }
  let i = 0;
  let j = 0;
  let k = 0;
  let mergedReturnStates = [];
  let mergedParents = [];
  while (i < a.returnStates.length && j < b.returnStates.length) {
    const a_parent = a.parents[i];
    const b_parent = b.parents[j];
    if (a.returnStates[i] === b.returnStates[j]) {
      const payload = a.returnStates[i];
      const bothDollars = payload === PredictionContext.EMPTY_RETURN_STATE && a_parent === null && b_parent === null;
      const ax_ax = a_parent !== null && b_parent !== null && a_parent === b_parent;
      if (bothDollars || ax_ax) {
        mergedParents[k] = a_parent;
        mergedReturnStates[k] = payload;
      } else {
        mergedParents[k] = merge(a_parent, b_parent, rootIsWildcard, mergeCache);
        mergedReturnStates[k] = payload;
      }
      i += 1;
      j += 1;
    } else if (a.returnStates[i] < b.returnStates[j]) {
      mergedParents[k] = a_parent;
      mergedReturnStates[k] = a.returnStates[i];
      i += 1;
    } else {
      mergedParents[k] = b_parent;
      mergedReturnStates[k] = b.returnStates[j];
      j += 1;
    }
    k += 1;
  }
  if (i < a.returnStates.length) {
    for (let p = i; p < a.returnStates.length; p++) {
      mergedParents[k] = a.parents[p];
      mergedReturnStates[k] = a.returnStates[p];
      k += 1;
    }
  } else {
    for (let p = j; p < b.returnStates.length; p++) {
      mergedParents[k] = b.parents[p];
      mergedReturnStates[k] = b.returnStates[p];
      k += 1;
    }
  }
  if (k < mergedParents.length) {
    if (k === 1) {
      const a_ = SingletonPredictionContext.create(
        mergedParents[0],
        mergedReturnStates[0]
      );
      if (mergeCache !== null) {
        mergeCache.set(a, b, a_);
      }
      return a_;
    }
    mergedParents = mergedParents.slice(0, k);
    mergedReturnStates = mergedReturnStates.slice(0, k);
  }
  const M = new ArrayPredictionContext(mergedParents, mergedReturnStates);
  if (M === a) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, a);
    }
    return a;
  }
  if (M === b) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, b);
    }
    return b;
  }
  combineCommonParents(mergedParents);
  if (mergeCache !== null) {
    mergeCache.set(a, b, M);
  }
  return M;
}
function combineCommonParents(parents) {
  const uniqueParents = new HashMap();
  for (let p = 0; p < parents.length; p++) {
    const parent = parents[p];
    if (!uniqueParents.containsKey(parent)) {
      uniqueParents.set(parent, parent);
    }
  }
  for (let q = 0; q < parents.length; q++) {
    parents[q] = uniqueParents.get(parents[q]);
  }
}
function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
  if (mergeCache !== null) {
    let previous = mergeCache.get(a, b);
    if (previous !== null) {
      return previous;
    }
    previous = mergeCache.get(b, a);
    if (previous !== null) {
      return previous;
    }
  }
  const rootMerge = mergeRoot(a, b, rootIsWildcard);
  if (rootMerge !== null) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, rootMerge);
    }
    return rootMerge;
  }
  if (a.returnState === b.returnState) {
    const parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache);
    if (parent === a.parentCtx) {
      return a;
    }
    if (parent === b.parentCtx) {
      return b;
    }
    const spc = SingletonPredictionContext.create(parent, a.returnState);
    if (mergeCache !== null) {
      mergeCache.set(a, b, spc);
    }
    return spc;
  } else {
    let singleParent = null;
    if (a === b || a.parentCtx !== null && a.parentCtx === b.parentCtx) {
      singleParent = a.parentCtx;
    }
    if (singleParent !== null) {
      const payloads2 = [a.returnState, b.returnState];
      if (a.returnState > b.returnState) {
        payloads2[0] = b.returnState;
        payloads2[1] = a.returnState;
      }
      const parents2 = [singleParent, singleParent];
      const apc = new ArrayPredictionContext(parents2, payloads2);
      if (mergeCache !== null) {
        mergeCache.set(a, b, apc);
      }
      return apc;
    }
    const payloads = [a.returnState, b.returnState];
    let parents = [a.parentCtx, b.parentCtx];
    if (a.returnState > b.returnState) {
      payloads[0] = b.returnState;
      payloads[1] = a.returnState;
      parents = [b.parentCtx, a.parentCtx];
    }
    const a_ = new ArrayPredictionContext(parents, payloads);
    if (mergeCache !== null) {
      mergeCache.set(a, b, a_);
    }
    return a_;
  }
}
function mergeRoot(a, b, rootIsWildcard) {
  if (rootIsWildcard) {
    if (a === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY;
    }
    if (b === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY;
    }
  } else {
    if (a === PredictionContext.EMPTY && b === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY;
    } else if (a === PredictionContext.EMPTY) {
      const payloads = [
        b.returnState,
        PredictionContext.EMPTY_RETURN_STATE
      ];
      const parents = [b.parentCtx, null];
      return new ArrayPredictionContext(parents, payloads);
    } else if (b === PredictionContext.EMPTY) {
      const payloads = [a.returnState, PredictionContext.EMPTY_RETURN_STATE];
      const parents = [a.parentCtx, null];
      return new ArrayPredictionContext(parents, payloads);
    }
  }
  return null;
}

// node_modules/antlr4/src/antlr4/misc/BitSet.js
var BitSet = class {
  constructor() {
    this.data = [];
  }
  add(value) {
    this.data[value] = true;
  }
  or(set) {
    Object.keys(set.data).map((alt) => this.add(alt), this);
  }
  remove(value) {
    delete this.data[value];
  }
  has(value) {
    return this.data[value] === true;
  }
  values() {
    return Object.keys(this.data);
  }
  minValue() {
    return Math.min.apply(null, this.values());
  }
  hashCode() {
    return HashCode.hashStuff(this.values());
  }
  equals(other) {
    return other instanceof BitSet && equalArrays(this.data, other.data);
  }
  toString() {
    return "{" + this.values().join(", ") + "}";
  }
  get length() {
    return this.values().length;
  }
};

// node_modules/antlr4/src/antlr4/atn/LL1Analyzer.js
var LL1Analyzer = class {
  constructor(atn3) {
    this.atn = atn3;
  }
  getDecisionLookahead(s) {
    if (s === null) {
      return null;
    }
    const count = s.transitions.length;
    const look = [];
    for (let alt = 0; alt < count; alt++) {
      look[alt] = new IntervalSet();
      const lookBusy = new HashSet();
      const seeThruPreds = false;
      this._LOOK(
        s.transition(alt).target,
        null,
        PredictionContext.EMPTY,
        look[alt],
        lookBusy,
        new BitSet(),
        seeThruPreds,
        false
      );
      if (look[alt].length === 0 || look[alt].contains(LL1Analyzer.HIT_PRED)) {
        look[alt] = null;
      }
    }
    return look;
  }
  LOOK(s, stopState, ctx) {
    const r = new IntervalSet();
    const seeThruPreds = true;
    ctx = ctx || null;
    const lookContext = ctx !== null ? predictionContextFromRuleContext(s.atn, ctx) : null;
    this._LOOK(s, stopState, lookContext, r, new HashSet(), new BitSet(), seeThruPreds, true);
    return r;
  }
  _LOOK(s, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
    const c = new ATNConfig({ state: s, alt: 0, context: ctx }, null);
    if (lookBusy.has(c)) {
      return;
    }
    lookBusy.add(c);
    if (s === stopState) {
      if (ctx === null) {
        look.addOne(Token.EPSILON);
        return;
      } else if (ctx.isEmpty() && addEOF) {
        look.addOne(Token.EOF);
        return;
      }
    }
    if (s instanceof RuleStopState) {
      if (ctx === null) {
        look.addOne(Token.EPSILON);
        return;
      } else if (ctx.isEmpty() && addEOF) {
        look.addOne(Token.EOF);
        return;
      }
      if (ctx !== PredictionContext.EMPTY) {
        const removed = calledRuleStack.has(s.ruleIndex);
        try {
          calledRuleStack.remove(s.ruleIndex);
          for (let i = 0; i < ctx.length; i++) {
            const returnState = this.atn.states[ctx.getReturnState(i)];
            this._LOOK(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
          }
        } finally {
          if (removed) {
            calledRuleStack.add(s.ruleIndex);
          }
        }
        return;
      }
    }
    for (let j = 0; j < s.transitions.length; j++) {
      const t = s.transitions[j];
      if (t.constructor === RuleTransition) {
        if (calledRuleStack.has(t.target.ruleIndex)) {
          continue;
        }
        const newContext = SingletonPredictionContext.create(ctx, t.followState.stateNumber);
        try {
          calledRuleStack.add(t.target.ruleIndex);
          this._LOOK(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
        } finally {
          calledRuleStack.remove(t.target.ruleIndex);
        }
      } else if (t instanceof AbstractPredicateTransition) {
        if (seeThruPreds) {
          this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
        } else {
          look.addOne(LL1Analyzer.HIT_PRED);
        }
      } else if (t.isEpsilon) {
        this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
      } else if (t.constructor === WildcardTransition) {
        look.addRange(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
      } else {
        let set = t.label;
        if (set !== null) {
          if (t instanceof NotSetTransition) {
            set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
          }
          look.addSet(set);
        }
      }
    }
  }
};
LL1Analyzer.HIT_PRED = Token.INVALID_TYPE;

// node_modules/antlr4/src/antlr4/atn/ATN.js
var ATN = class {
  constructor(grammarType, maxTokenType) {
    this.grammarType = grammarType;
    this.maxTokenType = maxTokenType;
    this.states = [];
    this.decisionToState = [];
    this.ruleToStartState = [];
    this.ruleToStopState = null;
    this.modeNameToStartState = {};
    this.ruleToTokenType = null;
    this.lexerActions = null;
    this.modeToStartState = [];
  }
  nextTokensInContext(s, ctx) {
    const anal = new LL1Analyzer(this);
    return anal.LOOK(s, null, ctx);
  }
  nextTokensNoContext(s) {
    if (s.nextTokenWithinRule !== null) {
      return s.nextTokenWithinRule;
    }
    s.nextTokenWithinRule = this.nextTokensInContext(s, null);
    s.nextTokenWithinRule.readOnly = true;
    return s.nextTokenWithinRule;
  }
  nextTokens(s, ctx) {
    if (ctx === void 0) {
      return this.nextTokensNoContext(s);
    } else {
      return this.nextTokensInContext(s, ctx);
    }
  }
  addState(state) {
    if (state !== null) {
      state.atn = this;
      state.stateNumber = this.states.length;
    }
    this.states.push(state);
  }
  removeState(state) {
    this.states[state.stateNumber] = null;
  }
  defineDecisionState(s) {
    this.decisionToState.push(s);
    s.decision = this.decisionToState.length - 1;
    return s.decision;
  }
  getDecisionState(decision) {
    if (this.decisionToState.length === 0) {
      return null;
    } else {
      return this.decisionToState[decision];
    }
  }
  getExpectedTokens(stateNumber, ctx) {
    if (stateNumber < 0 || stateNumber >= this.states.length) {
      throw "Invalid state number.";
    }
    const s = this.states[stateNumber];
    let following = this.nextTokens(s);
    if (!following.contains(Token.EPSILON)) {
      return following;
    }
    const expected = new IntervalSet();
    expected.addSet(following);
    expected.removeOne(Token.EPSILON);
    while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
      const invokingState = this.states[ctx.invokingState];
      const rt = invokingState.transitions[0];
      following = this.nextTokens(rt.followState);
      expected.addSet(following);
      expected.removeOne(Token.EPSILON);
      ctx = ctx.parentCtx;
    }
    if (following.contains(Token.EPSILON)) {
      expected.addOne(Token.EOF);
    }
    return expected;
  }
};
ATN.INVALID_ALT_NUMBER = 0;

// node_modules/antlr4/src/antlr4/atn/ATNType.js
var ATNType_default = {
  LEXER: 0,
  PARSER: 1
};

// node_modules/antlr4/src/antlr4/state/BasicState.js
var BasicState = class extends ATNState {
  constructor() {
    super();
    this.stateType = ATNState.BASIC;
  }
};

// node_modules/antlr4/src/antlr4/state/DecisionState.js
var DecisionState = class extends ATNState {
  constructor() {
    super();
    this.decision = -1;
    this.nonGreedy = false;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/BlockStartState.js
var BlockStartState = class extends DecisionState {
  constructor() {
    super();
    this.endState = null;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/BlockEndState.js
var BlockEndState = class extends ATNState {
  constructor() {
    super();
    this.stateType = ATNState.BLOCK_END;
    this.startState = null;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/LoopEndState.js
var LoopEndState = class extends ATNState {
  constructor() {
    super();
    this.stateType = ATNState.LOOP_END;
    this.loopBackState = null;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/RuleStartState.js
var RuleStartState = class extends ATNState {
  constructor() {
    super();
    this.stateType = ATNState.RULE_START;
    this.stopState = null;
    this.isPrecedenceRule = false;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/TokensStartState.js
var TokensStartState = class extends DecisionState {
  constructor() {
    super();
    this.stateType = ATNState.TOKEN_START;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/PlusLoopbackState.js
var PlusLoopbackState = class extends DecisionState {
  constructor() {
    super();
    this.stateType = ATNState.PLUS_LOOP_BACK;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/StarLoopbackState.js
var StarLoopbackState = class extends ATNState {
  constructor() {
    super();
    this.stateType = ATNState.STAR_LOOP_BACK;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/StarLoopEntryState.js
var StarLoopEntryState = class extends DecisionState {
  constructor() {
    super();
    this.stateType = ATNState.STAR_LOOP_ENTRY;
    this.loopBackState = null;
    this.isPrecedenceDecision = null;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/PlusBlockStartState.js
var PlusBlockStartState = class extends BlockStartState {
  constructor() {
    super();
    this.stateType = ATNState.PLUS_BLOCK_START;
    this.loopBackState = null;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/StarBlockStartState.js
var StarBlockStartState = class extends BlockStartState {
  constructor() {
    super();
    this.stateType = ATNState.STAR_BLOCK_START;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/state/BasicBlockStartState.js
var BasicBlockStartState = class extends BlockStartState {
  constructor() {
    super();
    this.stateType = ATNState.BLOCK_START;
    return this;
  }
};

// node_modules/antlr4/src/antlr4/transition/AtomTransition.js
var AtomTransition = class extends Transition {
  constructor(target, label) {
    super(target);
    this.label_ = label;
    this.label = this.makeLabel();
    this.serializationType = Transition.ATOM;
  }
  makeLabel() {
    const s = new IntervalSet();
    s.addOne(this.label_);
    return s;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return this.label_ === symbol;
  }
  toString() {
    return this.label_;
  }
};

// node_modules/antlr4/src/antlr4/transition/RangeTransition.js
var RangeTransition = class extends Transition {
  constructor(target, start, stop) {
    super(target);
    this.serializationType = Transition.RANGE;
    this.start = start;
    this.stop = stop;
    this.label = this.makeLabel();
  }
  makeLabel() {
    const s = new IntervalSet();
    s.addRange(this.start, this.stop);
    return s;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return symbol >= this.start && symbol <= this.stop;
  }
  toString() {
    return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
  }
};

// node_modules/antlr4/src/antlr4/transition/ActionTransition.js
var ActionTransition = class extends Transition {
  constructor(target, ruleIndex, actionIndex, isCtxDependent) {
    super(target);
    this.serializationType = Transition.ACTION;
    this.ruleIndex = ruleIndex;
    this.actionIndex = actionIndex === void 0 ? -1 : actionIndex;
    this.isCtxDependent = isCtxDependent === void 0 ? false : isCtxDependent;
    this.isEpsilon = true;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  }
  toString() {
    return "action_" + this.ruleIndex + ":" + this.actionIndex;
  }
};

// node_modules/antlr4/src/antlr4/transition/EpsilonTransition.js
var EpsilonTransition = class extends Transition {
  constructor(target, outermostPrecedenceReturn) {
    super(target);
    this.serializationType = Transition.EPSILON;
    this.isEpsilon = true;
    this.outermostPrecedenceReturn = outermostPrecedenceReturn;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  }
  toString() {
    return "epsilon";
  }
};

// node_modules/antlr4/src/antlr4/atn/Predicate.js
var Predicate = class extends SemanticContext {
  constructor(ruleIndex, predIndex, isCtxDependent) {
    super();
    this.ruleIndex = ruleIndex === void 0 ? -1 : ruleIndex;
    this.predIndex = predIndex === void 0 ? -1 : predIndex;
    this.isCtxDependent = isCtxDependent === void 0 ? false : isCtxDependent;
  }
  evaluate(parser, outerContext) {
    const localctx = this.isCtxDependent ? outerContext : null;
    return parser.sempred(localctx, this.ruleIndex, this.predIndex);
  }
  updateHashCode(hash) {
    hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof Predicate)) {
      return false;
    } else {
      return this.ruleIndex === other.ruleIndex && this.predIndex === other.predIndex && this.isCtxDependent === other.isCtxDependent;
    }
  }
  toString() {
    return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
  }
};
SemanticContext.NONE = new Predicate();

// node_modules/antlr4/src/antlr4/transition/PredicateTransition.js
var PredicateTransition = class extends AbstractPredicateTransition {
  constructor(target, ruleIndex, predIndex, isCtxDependent) {
    super(target);
    this.serializationType = Transition.PREDICATE;
    this.ruleIndex = ruleIndex;
    this.predIndex = predIndex;
    this.isCtxDependent = isCtxDependent;
    this.isEpsilon = true;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  }
  getPredicate() {
    return new Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
  }
  toString() {
    return "pred_" + this.ruleIndex + ":" + this.predIndex;
  }
};

// node_modules/antlr4/src/antlr4/atn/PrecedencePredicate.js
var PrecedencePredicate = class extends SemanticContext {
  constructor(precedence) {
    super();
    this.precedence = precedence === void 0 ? 0 : precedence;
  }
  evaluate(parser, outerContext) {
    return parser.precpred(outerContext, this.precedence);
  }
  evalPrecedence(parser, outerContext) {
    if (parser.precpred(outerContext, this.precedence)) {
      return SemanticContext.NONE;
    } else {
      return null;
    }
  }
  compareTo(other) {
    return this.precedence - other.precedence;
  }
  updateHashCode(hash) {
    hash.update(this.precedence);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof PrecedencePredicate)) {
      return false;
    } else {
      return this.precedence === other.precedence;
    }
  }
  toString() {
    return "{" + this.precedence + ">=prec}?";
  }
};
SemanticContext.PrecedencePredicate = PrecedencePredicate;

// node_modules/antlr4/src/antlr4/transition/PrecedencePredicateTransition.js
var PrecedencePredicateTransition = class extends AbstractPredicateTransition {
  constructor(target, precedence) {
    super(target);
    this.serializationType = Transition.PRECEDENCE;
    this.precedence = precedence;
    this.isEpsilon = true;
  }
  matches(symbol, minVocabSymbol, maxVocabSymbol) {
    return false;
  }
  getPredicate() {
    return new PrecedencePredicate(this.precedence);
  }
  toString() {
    return this.precedence + " >= _p";
  }
};

// node_modules/antlr4/src/antlr4/atn/ATNDeserializationOptions.js
var ATNDeserializationOptions = class {
  constructor(copyFrom) {
    if (copyFrom === void 0) {
      copyFrom = null;
    }
    this.readOnly = false;
    this.verifyATN = copyFrom === null ? true : copyFrom.verifyATN;
    this.generateRuleBypassTransitions = copyFrom === null ? false : copyFrom.generateRuleBypassTransitions;
  }
};
ATNDeserializationOptions.defaultOptions = new ATNDeserializationOptions();
ATNDeserializationOptions.defaultOptions.readOnly = true;

// node_modules/antlr4/src/antlr4/atn/LexerActionType.js
var LexerActionType_default = {
  CHANNEL: 0,
  CUSTOM: 1,
  MODE: 2,
  MORE: 3,
  POP_MODE: 4,
  PUSH_MODE: 5,
  SKIP: 6,
  TYPE: 7
};

// node_modules/antlr4/src/antlr4/action/LexerAction.js
var LexerAction = class {
  constructor(action) {
    this.actionType = action;
    this.isPositionDependent = false;
  }
  hashCode() {
    const hash = new HashCode();
    this.updateHashCode(hash);
    return hash.finish();
  }
  updateHashCode(hash) {
    hash.update(this.actionType);
  }
  equals(other) {
    return this === other;
  }
};

// node_modules/antlr4/src/antlr4/action/LexerSkipAction.js
var LexerSkipAction = class extends LexerAction {
  constructor() {
    super(LexerActionType_default.SKIP);
  }
  execute(lexer) {
    lexer.skip();
  }
  toString() {
    return "skip";
  }
};
LexerSkipAction.INSTANCE = new LexerSkipAction();

// node_modules/antlr4/src/antlr4/action/LexerChannelAction.js
var LexerChannelAction = class extends LexerAction {
  constructor(channel) {
    super(LexerActionType_default.CHANNEL);
    this.channel = channel;
  }
  execute(lexer) {
    lexer._channel = this.channel;
  }
  updateHashCode(hash) {
    hash.update(this.actionType, this.channel);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerChannelAction)) {
      return false;
    } else {
      return this.channel === other.channel;
    }
  }
  toString() {
    return "channel(" + this.channel + ")";
  }
};

// node_modules/antlr4/src/antlr4/action/LexerCustomAction.js
var LexerCustomAction = class extends LexerAction {
  constructor(ruleIndex, actionIndex) {
    super(LexerActionType_default.CUSTOM);
    this.ruleIndex = ruleIndex;
    this.actionIndex = actionIndex;
    this.isPositionDependent = true;
  }
  execute(lexer) {
    lexer.action(null, this.ruleIndex, this.actionIndex);
  }
  updateHashCode(hash) {
    hash.update(this.actionType, this.ruleIndex, this.actionIndex);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerCustomAction)) {
      return false;
    } else {
      return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
    }
  }
};

// node_modules/antlr4/src/antlr4/action/LexerMoreAction.js
var LexerMoreAction = class extends LexerAction {
  constructor() {
    super(LexerActionType_default.MORE);
  }
  execute(lexer) {
    lexer.more();
  }
  toString() {
    return "more";
  }
};
LexerMoreAction.INSTANCE = new LexerMoreAction();

// node_modules/antlr4/src/antlr4/action/LexerTypeAction.js
var LexerTypeAction = class extends LexerAction {
  constructor(type) {
    super(LexerActionType_default.TYPE);
    this.type = type;
  }
  execute(lexer) {
    lexer.type = this.type;
  }
  updateHashCode(hash) {
    hash.update(this.actionType, this.type);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerTypeAction)) {
      return false;
    } else {
      return this.type === other.type;
    }
  }
  toString() {
    return "type(" + this.type + ")";
  }
};

// node_modules/antlr4/src/antlr4/action/LexerPushModeAction.js
var LexerPushModeAction = class extends LexerAction {
  constructor(mode) {
    super(LexerActionType_default.PUSH_MODE);
    this.mode = mode;
  }
  execute(lexer) {
    lexer.pushMode(this.mode);
  }
  updateHashCode(hash) {
    hash.update(this.actionType, this.mode);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerPushModeAction)) {
      return false;
    } else {
      return this.mode === other.mode;
    }
  }
  toString() {
    return "pushMode(" + this.mode + ")";
  }
};

// node_modules/antlr4/src/antlr4/action/LexerPopModeAction.js
var LexerPopModeAction = class extends LexerAction {
  constructor() {
    super(LexerActionType_default.POP_MODE);
  }
  execute(lexer) {
    lexer.popMode();
  }
  toString() {
    return "popMode";
  }
};
LexerPopModeAction.INSTANCE = new LexerPopModeAction();

// node_modules/antlr4/src/antlr4/action/LexerModeAction.js
var LexerModeAction = class extends LexerAction {
  constructor(mode) {
    super(LexerActionType_default.MODE);
    this.mode = mode;
  }
  execute(lexer) {
    lexer.mode(this.mode);
  }
  updateHashCode(hash) {
    hash.update(this.actionType, this.mode);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerModeAction)) {
      return false;
    } else {
      return this.mode === other.mode;
    }
  }
  toString() {
    return "mode(" + this.mode + ")";
  }
};

// node_modules/antlr4/src/antlr4/atn/ATNDeserializer.js
var SERIALIZED_VERSION = 4;
function initArray(length, value) {
  const tmp = [];
  tmp[length - 1] = value;
  return tmp.map(function(i) {
    return value;
  });
}
var ATNDeserializer = class {
  constructor(options) {
    if (options === void 0 || options === null) {
      options = ATNDeserializationOptions.defaultOptions;
    }
    this.deserializationOptions = options;
    this.stateFactories = null;
    this.actionFactories = null;
  }
  deserialize(data) {
    const legacy = this.reset(data);
    this.checkVersion(legacy);
    if (legacy)
      this.skipUUID();
    const atn3 = this.readATN();
    this.readStates(atn3, legacy);
    this.readRules(atn3, legacy);
    this.readModes(atn3);
    const sets = [];
    this.readSets(atn3, sets, this.readInt.bind(this));
    if (legacy)
      this.readSets(atn3, sets, this.readInt32.bind(this));
    this.readEdges(atn3, sets);
    this.readDecisions(atn3);
    this.readLexerActions(atn3, legacy);
    this.markPrecedenceDecisions(atn3);
    this.verifyATN(atn3);
    if (this.deserializationOptions.generateRuleBypassTransitions && atn3.grammarType === ATNType_default.PARSER) {
      this.generateRuleBypassTransitions(atn3);
      this.verifyATN(atn3);
    }
    return atn3;
  }
  reset(data) {
    const version = data.charCodeAt ? data.charCodeAt(0) : data[0];
    if (version === SERIALIZED_VERSION - 1) {
      const adjust = function(c) {
        const v = c.charCodeAt(0);
        return v > 1 ? v - 2 : v + 65534;
      };
      const temp = data.split("").map(adjust);
      temp[0] = data.charCodeAt(0);
      this.data = temp;
      this.pos = 0;
      return true;
    } else {
      this.data = data;
      this.pos = 0;
      return false;
    }
  }
  skipUUID() {
    let count = 0;
    while (count++ < 8)
      this.readInt();
  }
  checkVersion(legacy) {
    const version = this.readInt();
    if (!legacy && version !== SERIALIZED_VERSION) {
      throw "Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").";
    }
  }
  readATN() {
    const grammarType = this.readInt();
    const maxTokenType = this.readInt();
    return new ATN(grammarType, maxTokenType);
  }
  readStates(atn3, legacy) {
    let j, pair, stateNumber;
    const loopBackStateNumbers = [];
    const endStateNumbers = [];
    const nstates = this.readInt();
    for (let i = 0; i < nstates; i++) {
      const stype = this.readInt();
      if (stype === ATNState.INVALID_TYPE) {
        atn3.addState(null);
        continue;
      }
      let ruleIndex = this.readInt();
      if (legacy && ruleIndex === 65535) {
        ruleIndex = -1;
      }
      const s = this.stateFactory(stype, ruleIndex);
      if (stype === ATNState.LOOP_END) {
        const loopBackStateNumber = this.readInt();
        loopBackStateNumbers.push([s, loopBackStateNumber]);
      } else if (s instanceof BlockStartState) {
        const endStateNumber = this.readInt();
        endStateNumbers.push([s, endStateNumber]);
      }
      atn3.addState(s);
    }
    for (j = 0; j < loopBackStateNumbers.length; j++) {
      pair = loopBackStateNumbers[j];
      pair[0].loopBackState = atn3.states[pair[1]];
    }
    for (j = 0; j < endStateNumbers.length; j++) {
      pair = endStateNumbers[j];
      pair[0].endState = atn3.states[pair[1]];
    }
    let numNonGreedyStates = this.readInt();
    for (j = 0; j < numNonGreedyStates; j++) {
      stateNumber = this.readInt();
      atn3.states[stateNumber].nonGreedy = true;
    }
    let numPrecedenceStates = this.readInt();
    for (j = 0; j < numPrecedenceStates; j++) {
      stateNumber = this.readInt();
      atn3.states[stateNumber].isPrecedenceRule = true;
    }
  }
  readRules(atn3, legacy) {
    let i;
    const nrules = this.readInt();
    if (atn3.grammarType === ATNType_default.LEXER) {
      atn3.ruleToTokenType = initArray(nrules, 0);
    }
    atn3.ruleToStartState = initArray(nrules, 0);
    for (i = 0; i < nrules; i++) {
      const s = this.readInt();
      atn3.ruleToStartState[i] = atn3.states[s];
      if (atn3.grammarType === ATNType_default.LEXER) {
        let tokenType = this.readInt();
        if (legacy && tokenType === 65535) {
          tokenType = Token.EOF;
        }
        atn3.ruleToTokenType[i] = tokenType;
      }
    }
    atn3.ruleToStopState = initArray(nrules, 0);
    for (i = 0; i < atn3.states.length; i++) {
      const state = atn3.states[i];
      if (!(state instanceof RuleStopState)) {
        continue;
      }
      atn3.ruleToStopState[state.ruleIndex] = state;
      atn3.ruleToStartState[state.ruleIndex].stopState = state;
    }
  }
  readModes(atn3) {
    const nmodes = this.readInt();
    for (let i = 0; i < nmodes; i++) {
      let s = this.readInt();
      atn3.modeToStartState.push(atn3.states[s]);
    }
  }
  readSets(atn3, sets, reader) {
    const m = this.readInt();
    for (let i = 0; i < m; i++) {
      const iset = new IntervalSet();
      sets.push(iset);
      const n = this.readInt();
      const containsEof = this.readInt();
      if (containsEof !== 0) {
        iset.addOne(-1);
      }
      for (let j = 0; j < n; j++) {
        const i1 = reader();
        const i2 = reader();
        iset.addRange(i1, i2);
      }
    }
  }
  readEdges(atn3, sets) {
    let i, j, state, trans, target;
    const nedges = this.readInt();
    for (i = 0; i < nedges; i++) {
      const src = this.readInt();
      const trg = this.readInt();
      const ttype = this.readInt();
      const arg1 = this.readInt();
      const arg2 = this.readInt();
      const arg3 = this.readInt();
      trans = this.edgeFactory(atn3, ttype, src, trg, arg1, arg2, arg3, sets);
      const srcState = atn3.states[src];
      srcState.addTransition(trans);
    }
    for (i = 0; i < atn3.states.length; i++) {
      state = atn3.states[i];
      for (j = 0; j < state.transitions.length; j++) {
        const t = state.transitions[j];
        if (!(t instanceof RuleTransition)) {
          continue;
        }
        let outermostPrecedenceReturn = -1;
        if (atn3.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
          if (t.precedence === 0) {
            outermostPrecedenceReturn = t.target.ruleIndex;
          }
        }
        trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
        atn3.ruleToStopState[t.target.ruleIndex].addTransition(trans);
      }
    }
    for (i = 0; i < atn3.states.length; i++) {
      state = atn3.states[i];
      if (state instanceof BlockStartState) {
        if (state.endState === null) {
          throw "IllegalState";
        }
        if (state.endState.startState !== null) {
          throw "IllegalState";
        }
        state.endState.startState = state;
      }
      if (state instanceof PlusLoopbackState) {
        for (j = 0; j < state.transitions.length; j++) {
          target = state.transitions[j].target;
          if (target instanceof PlusBlockStartState) {
            target.loopBackState = state;
          }
        }
      } else if (state instanceof StarLoopbackState) {
        for (j = 0; j < state.transitions.length; j++) {
          target = state.transitions[j].target;
          if (target instanceof StarLoopEntryState) {
            target.loopBackState = state;
          }
        }
      }
    }
  }
  readDecisions(atn3) {
    const ndecisions = this.readInt();
    for (let i = 0; i < ndecisions; i++) {
      const s = this.readInt();
      const decState = atn3.states[s];
      atn3.decisionToState.push(decState);
      decState.decision = i;
    }
  }
  readLexerActions(atn3, legacy) {
    if (atn3.grammarType === ATNType_default.LEXER) {
      const count = this.readInt();
      atn3.lexerActions = initArray(count, null);
      for (let i = 0; i < count; i++) {
        const actionType = this.readInt();
        let data1 = this.readInt();
        if (legacy && data1 === 65535) {
          data1 = -1;
        }
        let data2 = this.readInt();
        if (legacy && data2 === 65535) {
          data2 = -1;
        }
        atn3.lexerActions[i] = this.lexerActionFactory(actionType, data1, data2);
      }
    }
  }
  generateRuleBypassTransitions(atn3) {
    let i;
    const count = atn3.ruleToStartState.length;
    for (i = 0; i < count; i++) {
      atn3.ruleToTokenType[i] = atn3.maxTokenType + i + 1;
    }
    for (i = 0; i < count; i++) {
      this.generateRuleBypassTransition(atn3, i);
    }
  }
  generateRuleBypassTransition(atn3, idx) {
    let i, state;
    const bypassStart = new BasicBlockStartState();
    bypassStart.ruleIndex = idx;
    atn3.addState(bypassStart);
    const bypassStop = new BlockEndState();
    bypassStop.ruleIndex = idx;
    atn3.addState(bypassStop);
    bypassStart.endState = bypassStop;
    atn3.defineDecisionState(bypassStart);
    bypassStop.startState = bypassStart;
    let excludeTransition = null;
    let endState = null;
    if (atn3.ruleToStartState[idx].isPrecedenceRule) {
      endState = null;
      for (i = 0; i < atn3.states.length; i++) {
        state = atn3.states[i];
        if (this.stateIsEndStateFor(state, idx)) {
          endState = state;
          excludeTransition = state.loopBackState.transitions[0];
          break;
        }
      }
      if (excludeTransition === null) {
        throw "Couldn't identify final state of the precedence rule prefix section.";
      }
    } else {
      endState = atn3.ruleToStopState[idx];
    }
    for (i = 0; i < atn3.states.length; i++) {
      state = atn3.states[i];
      for (let j = 0; j < state.transitions.length; j++) {
        const transition = state.transitions[j];
        if (transition === excludeTransition) {
          continue;
        }
        if (transition.target === endState) {
          transition.target = bypassStop;
        }
      }
    }
    const ruleToStartState = atn3.ruleToStartState[idx];
    const count = ruleToStartState.transitions.length;
    while (count > 0) {
      bypassStart.addTransition(ruleToStartState.transitions[count - 1]);
      ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
    }
    atn3.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
    bypassStop.addTransition(new EpsilonTransition(endState));
    const matchState = new BasicState();
    atn3.addState(matchState);
    matchState.addTransition(new AtomTransition(bypassStop, atn3.ruleToTokenType[idx]));
    bypassStart.addTransition(new EpsilonTransition(matchState));
  }
  stateIsEndStateFor(state, idx) {
    if (state.ruleIndex !== idx) {
      return null;
    }
    if (!(state instanceof StarLoopEntryState)) {
      return null;
    }
    const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
    if (!(maybeLoopEndState instanceof LoopEndState)) {
      return null;
    }
    if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
      return state;
    } else {
      return null;
    }
  }
  markPrecedenceDecisions(atn3) {
    for (let i = 0; i < atn3.states.length; i++) {
      const state = atn3.states[i];
      if (!(state instanceof StarLoopEntryState)) {
        continue;
      }
      if (atn3.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
        const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
        if (maybeLoopEndState instanceof LoopEndState) {
          if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
            state.isPrecedenceDecision = true;
          }
        }
      }
    }
  }
  verifyATN(atn3) {
    if (!this.deserializationOptions.verifyATN) {
      return;
    }
    for (let i = 0; i < atn3.states.length; i++) {
      const state = atn3.states[i];
      if (state === null) {
        continue;
      }
      this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);
      if (state instanceof PlusBlockStartState) {
        this.checkCondition(state.loopBackState !== null);
      } else if (state instanceof StarLoopEntryState) {
        this.checkCondition(state.loopBackState !== null);
        this.checkCondition(state.transitions.length === 2);
        if (state.transitions[0].target instanceof StarBlockStartState) {
          this.checkCondition(state.transitions[1].target instanceof LoopEndState);
          this.checkCondition(!state.nonGreedy);
        } else if (state.transitions[0].target instanceof LoopEndState) {
          this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
          this.checkCondition(state.nonGreedy);
        } else {
          throw "IllegalState";
        }
      } else if (state instanceof StarLoopbackState) {
        this.checkCondition(state.transitions.length === 1);
        this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
      } else if (state instanceof LoopEndState) {
        this.checkCondition(state.loopBackState !== null);
      } else if (state instanceof RuleStartState) {
        this.checkCondition(state.stopState !== null);
      } else if (state instanceof BlockStartState) {
        this.checkCondition(state.endState !== null);
      } else if (state instanceof BlockEndState) {
        this.checkCondition(state.startState !== null);
      } else if (state instanceof DecisionState) {
        this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
      } else {
        this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState);
      }
    }
  }
  checkCondition(condition, message) {
    if (!condition) {
      if (message === void 0 || message === null) {
        message = "IllegalState";
      }
      throw message;
    }
  }
  readInt() {
    return this.data[this.pos++];
  }
  readInt32() {
    const low = this.readInt();
    const high = this.readInt();
    return low | high << 16;
  }
  edgeFactory(atn3, type, src, trg, arg1, arg2, arg3, sets) {
    const target = atn3.states[trg];
    switch (type) {
      case Transition.EPSILON:
        return new EpsilonTransition(target);
      case Transition.RANGE:
        return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);
      case Transition.RULE:
        return new RuleTransition(atn3.states[arg1], arg2, arg3, target);
      case Transition.PREDICATE:
        return new PredicateTransition(target, arg1, arg2, arg3 !== 0);
      case Transition.PRECEDENCE:
        return new PrecedencePredicateTransition(target, arg1);
      case Transition.ATOM:
        return arg3 !== 0 ? new AtomTransition(target, Token.EOF) : new AtomTransition(target, arg1);
      case Transition.ACTION:
        return new ActionTransition(target, arg1, arg2, arg3 !== 0);
      case Transition.SET:
        return new SetTransition(target, sets[arg1]);
      case Transition.NOT_SET:
        return new NotSetTransition(target, sets[arg1]);
      case Transition.WILDCARD:
        return new WildcardTransition(target);
      default:
        throw "The specified transition type: " + type + " is not valid.";
    }
  }
  stateFactory(type, ruleIndex) {
    if (this.stateFactories === null) {
      const sf = [];
      sf[ATNState.INVALID_TYPE] = null;
      sf[ATNState.BASIC] = () => new BasicState();
      sf[ATNState.RULE_START] = () => new RuleStartState();
      sf[ATNState.BLOCK_START] = () => new BasicBlockStartState();
      sf[ATNState.PLUS_BLOCK_START] = () => new PlusBlockStartState();
      sf[ATNState.STAR_BLOCK_START] = () => new StarBlockStartState();
      sf[ATNState.TOKEN_START] = () => new TokensStartState();
      sf[ATNState.RULE_STOP] = () => new RuleStopState();
      sf[ATNState.BLOCK_END] = () => new BlockEndState();
      sf[ATNState.STAR_LOOP_BACK] = () => new StarLoopbackState();
      sf[ATNState.STAR_LOOP_ENTRY] = () => new StarLoopEntryState();
      sf[ATNState.PLUS_LOOP_BACK] = () => new PlusLoopbackState();
      sf[ATNState.LOOP_END] = () => new LoopEndState();
      this.stateFactories = sf;
    }
    if (type > this.stateFactories.length || this.stateFactories[type] === null) {
      throw "The specified state type " + type + " is not valid.";
    } else {
      const s = this.stateFactories[type]();
      if (s !== null) {
        s.ruleIndex = ruleIndex;
        return s;
      }
    }
  }
  lexerActionFactory(type, data1, data2) {
    if (this.actionFactories === null) {
      const af = [];
      af[LexerActionType_default.CHANNEL] = (data12, data22) => new LexerChannelAction(data12);
      af[LexerActionType_default.CUSTOM] = (data12, data22) => new LexerCustomAction(data12, data22);
      af[LexerActionType_default.MODE] = (data12, data22) => new LexerModeAction(data12);
      af[LexerActionType_default.MORE] = (data12, data22) => LexerMoreAction.INSTANCE;
      af[LexerActionType_default.POP_MODE] = (data12, data22) => LexerPopModeAction.INSTANCE;
      af[LexerActionType_default.PUSH_MODE] = (data12, data22) => new LexerPushModeAction(data12);
      af[LexerActionType_default.SKIP] = (data12, data22) => LexerSkipAction.INSTANCE;
      af[LexerActionType_default.TYPE] = (data12, data22) => new LexerTypeAction(data12);
      this.actionFactories = af;
    }
    if (type > this.actionFactories.length || this.actionFactories[type] === null) {
      throw "The specified lexer action type " + type + " is not valid.";
    } else {
      return this.actionFactories[type](data1, data2);
    }
  }
};

// node_modules/antlr4/src/antlr4/error/ErrorListener.js
var ErrorListener = class {
  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
  }
  reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
  }
  reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
  }
  reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
  }
};

// node_modules/antlr4/src/antlr4/error/ConsoleErrorListener.js
var ConsoleErrorListener = class extends ErrorListener {
  constructor() {
    super();
  }
  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    console.error("line " + line + ":" + column + " " + msg);
  }
};
ConsoleErrorListener.INSTANCE = new ConsoleErrorListener();

// node_modules/antlr4/src/antlr4/error/ProxyErrorListener.js
var ProxyErrorListener = class extends ErrorListener {
  constructor(delegates) {
    super();
    if (delegates === null) {
      throw "delegates";
    }
    this.delegates = delegates;
    return this;
  }
  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    this.delegates.map((d) => d.syntaxError(recognizer, offendingSymbol, line, column, msg, e));
  }
  reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
    this.delegates.map((d) => d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs));
  }
  reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
    this.delegates.map((d) => d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs));
  }
  reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
    this.delegates.map((d) => d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs));
  }
};

// node_modules/antlr4/src/antlr4/Recognizer.js
var Recognizer = class {
  constructor() {
    this._listeners = [ConsoleErrorListener.INSTANCE];
    this._interp = null;
    this._stateNumber = -1;
  }
  checkVersion(toolVersion) {
    const runtimeVersion = "4.11.0";
    if (runtimeVersion !== toolVersion) {
      console.log("ANTLR runtime and generated code versions disagree: " + runtimeVersion + "!=" + toolVersion);
    }
  }
  addErrorListener(listener) {
    this._listeners.push(listener);
  }
  removeErrorListeners() {
    this._listeners = [];
  }
  getLiteralNames() {
    return Object.getPrototypeOf(this).constructor.literalNames || [];
  }
  getSymbolicNames() {
    return Object.getPrototypeOf(this).constructor.symbolicNames || [];
  }
  getTokenNames() {
    if (!this.tokenNames) {
      const literalNames = this.getLiteralNames();
      const symbolicNames = this.getSymbolicNames();
      const length = literalNames.length > symbolicNames.length ? literalNames.length : symbolicNames.length;
      this.tokenNames = [];
      for (let i = 0; i < length; i++) {
        this.tokenNames[i] = literalNames[i] || symbolicNames[i] || "<INVALID";
      }
    }
    return this.tokenNames;
  }
  getTokenTypeMap() {
    const tokenNames = this.getTokenNames();
    if (tokenNames === null) {
      throw "The current recognizer does not provide a list of token names.";
    }
    let result = this.tokenTypeMapCache[tokenNames];
    if (result === void 0) {
      result = tokenNames.reduce(function(o, k, i) {
        o[k] = i;
      });
      result.EOF = Token.EOF;
      this.tokenTypeMapCache[tokenNames] = result;
    }
    return result;
  }
  getRuleIndexMap() {
    const ruleNames = this.ruleNames;
    if (ruleNames === null) {
      throw "The current recognizer does not provide a list of rule names.";
    }
    let result = this.ruleIndexMapCache[ruleNames];
    if (result === void 0) {
      result = ruleNames.reduce(function(o, k, i) {
        o[k] = i;
      });
      this.ruleIndexMapCache[ruleNames] = result;
    }
    return result;
  }
  getTokenType(tokenName) {
    const ttype = this.getTokenTypeMap()[tokenName];
    if (ttype !== void 0) {
      return ttype;
    } else {
      return Token.INVALID_TYPE;
    }
  }
  getErrorHeader(e) {
    const line = e.getOffendingToken().line;
    const column = e.getOffendingToken().column;
    return "line " + line + ":" + column;
  }
  getTokenErrorDisplay(t) {
    if (t === null) {
      return "<no token>";
    }
    let s = t.text;
    if (s === null) {
      if (t.type === Token.EOF) {
        s = "<EOF>";
      } else {
        s = "<" + t.type + ">";
      }
    }
    s = s.replace("\n", "\\n").replace("\r", "\\r").replace("	", "\\t");
    return "'" + s + "'";
  }
  getErrorListenerDispatch() {
    return new ProxyErrorListener(this._listeners);
  }
  sempred(localctx, ruleIndex, actionIndex) {
    return true;
  }
  precpred(localctx, precedence) {
    return true;
  }
  get state() {
    return this._stateNumber;
  }
  set state(state) {
    this._stateNumber = state;
  }
};
Recognizer.tokenTypeMapCache = {};
Recognizer.ruleIndexMapCache = {};

// node_modules/antlr4/src/antlr4/CommonToken.js
var CommonToken = class extends Token {
  constructor(source, type, channel, start, stop) {
    super();
    this.source = source !== void 0 ? source : CommonToken.EMPTY_SOURCE;
    this.type = type !== void 0 ? type : null;
    this.channel = channel !== void 0 ? channel : Token.DEFAULT_CHANNEL;
    this.start = start !== void 0 ? start : -1;
    this.stop = stop !== void 0 ? stop : -1;
    this.tokenIndex = -1;
    if (this.source[0] !== null) {
      this.line = source[0].line;
      this.column = source[0].column;
    } else {
      this.column = -1;
    }
  }
  clone() {
    const t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
    t.tokenIndex = this.tokenIndex;
    t.line = this.line;
    t.column = this.column;
    t.text = this.text;
    return t;
  }
  toString() {
    let txt = this.text;
    if (txt !== null) {
      txt = txt.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    } else {
      txt = "<no text>";
    }
    return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + this.type + ">" + (this.channel > 0 ? ",channel=" + this.channel : "") + "," + this.line + ":" + this.column + "]";
  }
  get text() {
    if (this._text !== null) {
      return this._text;
    }
    const input = this.getInputStream();
    if (input === null) {
      return null;
    }
    const n = input.size;
    if (this.start < n && this.stop < n) {
      return input.getText(this.start, this.stop);
    } else {
      return "<EOF>";
    }
  }
  set text(text) {
    this._text = text;
  }
};
CommonToken.EMPTY_SOURCE = [null, null];

// node_modules/antlr4/src/antlr4/CommonTokenFactory.js
var TokenFactory = class {
};
var CommonTokenFactory = class extends TokenFactory {
  constructor(copyText) {
    super();
    this.copyText = copyText === void 0 ? false : copyText;
  }
  create(source, type, text, channel, start, stop, line, column) {
    const t = new CommonToken(source, type, channel, start, stop);
    t.line = line;
    t.column = column;
    if (text !== null) {
      t.text = text;
    } else if (this.copyText && source[1] !== null) {
      t.text = source[1].getText(start, stop);
    }
    return t;
  }
  createThin(type, text) {
    const t = new CommonToken(null, type);
    t.text = text;
    return t;
  }
};
CommonTokenFactory.DEFAULT = new CommonTokenFactory();

// node_modules/antlr4/src/antlr4/error/RecognitionException.js
var RecognitionException = class extends Error {
  constructor(params) {
    super(params.message);
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, RecognitionException);
    this.message = params.message;
    this.recognizer = params.recognizer;
    this.input = params.input;
    this.ctx = params.ctx;
    this.offendingToken = null;
    this.offendingState = -1;
    if (this.recognizer !== null) {
      this.offendingState = this.recognizer.state;
    }
  }
  getExpectedTokens() {
    if (this.recognizer !== null) {
      return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
    } else {
      return null;
    }
  }
  toString() {
    return this.message;
  }
};

// node_modules/antlr4/src/antlr4/error/LexerNoViableAltException.js
var LexerNoViableAltException = class extends RecognitionException {
  constructor(lexer, input, startIndex, deadEndConfigs) {
    super({ message: "", recognizer: lexer, input, ctx: null });
    this.startIndex = startIndex;
    this.deadEndConfigs = deadEndConfigs;
  }
  toString() {
    let symbol = "";
    if (this.startIndex >= 0 && this.startIndex < this.input.size) {
      symbol = this.input.getText(new Interval(this.startIndex, this.startIndex));
    }
    return "LexerNoViableAltException" + symbol;
  }
};

// node_modules/antlr4/src/antlr4/Lexer.js
var Lexer = class extends Recognizer {
  constructor(input) {
    super();
    this._input = input;
    this._factory = CommonTokenFactory.DEFAULT;
    this._tokenFactorySourcePair = [this, input];
    this._interp = null;
    this._token = null;
    this._tokenStartCharIndex = -1;
    this._tokenStartLine = -1;
    this._tokenStartColumn = -1;
    this._hitEOF = false;
    this._channel = Token.DEFAULT_CHANNEL;
    this._type = Token.INVALID_TYPE;
    this._modeStack = [];
    this._mode = Lexer.DEFAULT_MODE;
    this._text = null;
  }
  reset() {
    if (this._input !== null) {
      this._input.seek(0);
    }
    this._token = null;
    this._type = Token.INVALID_TYPE;
    this._channel = Token.DEFAULT_CHANNEL;
    this._tokenStartCharIndex = -1;
    this._tokenStartColumn = -1;
    this._tokenStartLine = -1;
    this._text = null;
    this._hitEOF = false;
    this._mode = Lexer.DEFAULT_MODE;
    this._modeStack = [];
    this._interp.reset();
  }
  nextToken() {
    if (this._input === null) {
      throw "nextToken requires a non-null input stream.";
    }
    const tokenStartMarker = this._input.mark();
    try {
      for (; ; ) {
        if (this._hitEOF) {
          this.emitEOF();
          return this._token;
        }
        this._token = null;
        this._channel = Token.DEFAULT_CHANNEL;
        this._tokenStartCharIndex = this._input.index;
        this._tokenStartColumn = this._interp.column;
        this._tokenStartLine = this._interp.line;
        this._text = null;
        let continueOuter = false;
        for (; ; ) {
          this._type = Token.INVALID_TYPE;
          let ttype = Lexer.SKIP;
          try {
            ttype = this._interp.match(this._input, this._mode);
          } catch (e) {
            if (e instanceof RecognitionException) {
              this.notifyListeners(e);
              this.recover(e);
            } else {
              console.log(e.stack);
              throw e;
            }
          }
          if (this._input.LA(1) === Token.EOF) {
            this._hitEOF = true;
          }
          if (this._type === Token.INVALID_TYPE) {
            this._type = ttype;
          }
          if (this._type === Lexer.SKIP) {
            continueOuter = true;
            break;
          }
          if (this._type !== Lexer.MORE) {
            break;
          }
        }
        if (continueOuter) {
          continue;
        }
        if (this._token === null) {
          this.emit();
        }
        return this._token;
      }
    } finally {
      this._input.release(tokenStartMarker);
    }
  }
  skip() {
    this._type = Lexer.SKIP;
  }
  more() {
    this._type = Lexer.MORE;
  }
  mode(m) {
    this._mode = m;
  }
  pushMode(m) {
    if (this._interp.debug) {
      console.log("pushMode " + m);
    }
    this._modeStack.push(this._mode);
    this.mode(m);
  }
  popMode() {
    if (this._modeStack.length === 0) {
      throw "Empty Stack";
    }
    if (this._interp.debug) {
      console.log("popMode back to " + this._modeStack.slice(0, -1));
    }
    this.mode(this._modeStack.pop());
    return this._mode;
  }
  emitToken(token) {
    this._token = token;
  }
  emit() {
    const t = this._factory.create(
      this._tokenFactorySourcePair,
      this._type,
      this._text,
      this._channel,
      this._tokenStartCharIndex,
      this.getCharIndex() - 1,
      this._tokenStartLine,
      this._tokenStartColumn
    );
    this.emitToken(t);
    return t;
  }
  emitEOF() {
    const cpos = this.column;
    const lpos = this.line;
    const eof = this._factory.create(
      this._tokenFactorySourcePair,
      Token.EOF,
      null,
      Token.DEFAULT_CHANNEL,
      this._input.index,
      this._input.index - 1,
      lpos,
      cpos
    );
    this.emitToken(eof);
    return eof;
  }
  getCharIndex() {
    return this._input.index;
  }
  getAllTokens() {
    const tokens = [];
    let t = this.nextToken();
    while (t.type !== Token.EOF) {
      tokens.push(t);
      t = this.nextToken();
    }
    return tokens;
  }
  notifyListeners(e) {
    const start = this._tokenStartCharIndex;
    const stop = this._input.index;
    const text = this._input.getText(start, stop);
    const msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
    const listener = this.getErrorListenerDispatch();
    listener.syntaxError(
      this,
      null,
      this._tokenStartLine,
      this._tokenStartColumn,
      msg,
      e
    );
  }
  getErrorDisplay(s) {
    const d = [];
    for (let i = 0; i < s.length; i++) {
      d.push(s[i]);
    }
    return d.join("");
  }
  getErrorDisplayForChar(c) {
    if (c.charCodeAt(0) === Token.EOF) {
      return "<EOF>";
    } else if (c === "\n") {
      return "\\n";
    } else if (c === "	") {
      return "\\t";
    } else if (c === "\r") {
      return "\\r";
    } else {
      return c;
    }
  }
  getCharErrorDisplay(c) {
    return "'" + this.getErrorDisplayForChar(c) + "'";
  }
  recover(re) {
    if (this._input.LA(1) !== Token.EOF) {
      if (re instanceof LexerNoViableAltException) {
        this._interp.consume(this._input);
      } else {
        this._input.consume();
      }
    }
  }
  get inputStream() {
    return this._input;
  }
  set inputStream(input) {
    this._input = null;
    this._tokenFactorySourcePair = [this, this._input];
    this.reset();
    this._input = input;
    this._tokenFactorySourcePair = [this, this._input];
  }
  get sourceName() {
    return this._input.sourceName;
  }
  get type() {
    return this._type;
  }
  set type(type) {
    this._type = type;
  }
  get line() {
    return this._interp.line;
  }
  set line(line) {
    this._interp.line = line;
  }
  get column() {
    return this._interp.column;
  }
  set column(column) {
    this._interp.column = column;
  }
  get text() {
    if (this._text !== null) {
      return this._text;
    } else {
      return this._interp.getText(this._input);
    }
  }
  set text(text) {
    this._text = text;
  }
};
Lexer.DEFAULT_MODE = 0;
Lexer.MORE = -2;
Lexer.SKIP = -3;
Lexer.DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
Lexer.HIDDEN = Token.HIDDEN_CHANNEL;
Lexer.MIN_CHAR_VALUE = 0;
Lexer.MAX_CHAR_VALUE = 1114111;

// node_modules/antlr4/src/antlr4/atn/ATNConfigSet.js
function hashATNConfig(c) {
  return c.hashCodeForConfigSet();
}
function equalATNConfigs(a, b) {
  if (a === b) {
    return true;
  } else if (a === null || b === null) {
    return false;
  } else
    return a.equalsForConfigSet(b);
}
var ATNConfigSet = class {
  constructor(fullCtx) {
    this.configLookup = new HashSet(hashATNConfig, equalATNConfigs);
    this.fullCtx = fullCtx === void 0 ? true : fullCtx;
    this.readOnly = false;
    this.configs = [];
    this.uniqueAlt = 0;
    this.conflictingAlts = null;
    this.hasSemanticContext = false;
    this.dipsIntoOuterContext = false;
    this.cachedHashCode = -1;
  }
  add(config, mergeCache) {
    if (mergeCache === void 0) {
      mergeCache = null;
    }
    if (this.readOnly) {
      throw "This set is readonly";
    }
    if (config.semanticContext !== SemanticContext.NONE) {
      this.hasSemanticContext = true;
    }
    if (config.reachesIntoOuterContext > 0) {
      this.dipsIntoOuterContext = true;
    }
    const existing = this.configLookup.add(config);
    if (existing === config) {
      this.cachedHashCode = -1;
      this.configs.push(config);
      return true;
    }
    const rootIsWildcard = !this.fullCtx;
    const merged = merge(existing.context, config.context, rootIsWildcard, mergeCache);
    existing.reachesIntoOuterContext = Math.max(existing.reachesIntoOuterContext, config.reachesIntoOuterContext);
    if (config.precedenceFilterSuppressed) {
      existing.precedenceFilterSuppressed = true;
    }
    existing.context = merged;
    return true;
  }
  getStates() {
    const states = new HashSet();
    for (let i = 0; i < this.configs.length; i++) {
      states.add(this.configs[i].state);
    }
    return states;
  }
  getPredicates() {
    const preds = [];
    for (let i = 0; i < this.configs.length; i++) {
      const c = this.configs[i].semanticContext;
      if (c !== SemanticContext.NONE) {
        preds.push(c.semanticContext);
      }
    }
    return preds;
  }
  optimizeConfigs(interpreter) {
    if (this.readOnly) {
      throw "This set is readonly";
    }
    if (this.configLookup.length === 0) {
      return;
    }
    for (let i = 0; i < this.configs.length; i++) {
      const config = this.configs[i];
      config.context = interpreter.getCachedContext(config.context);
    }
  }
  addAll(coll) {
    for (let i = 0; i < coll.length; i++) {
      this.add(coll[i]);
    }
    return false;
  }
  equals(other) {
    return this === other || other instanceof ATNConfigSet && equalArrays(this.configs, other.configs) && this.fullCtx === other.fullCtx && this.uniqueAlt === other.uniqueAlt && this.conflictingAlts === other.conflictingAlts && this.hasSemanticContext === other.hasSemanticContext && this.dipsIntoOuterContext === other.dipsIntoOuterContext;
  }
  hashCode() {
    const hash = new HashCode();
    hash.update(this.configs);
    return hash.finish();
  }
  updateHashCode(hash) {
    if (this.readOnly) {
      if (this.cachedHashCode === -1) {
        this.cachedHashCode = this.hashCode();
      }
      hash.update(this.cachedHashCode);
    } else {
      hash.update(this.hashCode());
    }
  }
  isEmpty() {
    return this.configs.length === 0;
  }
  contains(item) {
    if (this.configLookup === null) {
      throw "This method is not implemented for readonly sets.";
    }
    return this.configLookup.contains(item);
  }
  containsFast(item) {
    if (this.configLookup === null) {
      throw "This method is not implemented for readonly sets.";
    }
    return this.configLookup.containsFast(item);
  }
  clear() {
    if (this.readOnly) {
      throw "This set is readonly";
    }
    this.configs = [];
    this.cachedHashCode = -1;
    this.configLookup = new HashSet();
  }
  setReadonly(readOnly) {
    this.readOnly = readOnly;
    if (readOnly) {
      this.configLookup = null;
    }
  }
  toString() {
    return arrayToString(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
  }
  get items() {
    return this.configs;
  }
  get length() {
    return this.configs.length;
  }
};

// node_modules/antlr4/src/antlr4/dfa/DFAState.js
var DFAState = class {
  constructor(stateNumber, configs) {
    if (stateNumber === null) {
      stateNumber = -1;
    }
    if (configs === null) {
      configs = new ATNConfigSet();
    }
    this.stateNumber = stateNumber;
    this.configs = configs;
    this.edges = null;
    this.isAcceptState = false;
    this.prediction = 0;
    this.lexerActionExecutor = null;
    this.requiresFullContext = false;
    this.predicates = null;
    return this;
  }
  getAltSet() {
    const alts = new HashSet();
    if (this.configs !== null) {
      for (let i = 0; i < this.configs.length; i++) {
        const c = this.configs[i];
        alts.add(c.alt);
      }
    }
    if (alts.length === 0) {
      return null;
    } else {
      return alts;
    }
  }
  equals(other) {
    return this === other || other instanceof DFAState && this.configs.equals(other.configs);
  }
  toString() {
    let s = "" + this.stateNumber + ":" + this.configs;
    if (this.isAcceptState) {
      s = s + "=>";
      if (this.predicates !== null)
        s = s + this.predicates;
      else
        s = s + this.prediction;
    }
    return s;
  }
  hashCode() {
    const hash = new HashCode();
    hash.update(this.configs);
    return hash.finish();
  }
};

// node_modules/antlr4/src/antlr4/atn/ATNSimulator.js
var ATNSimulator = class {
  constructor(atn3, sharedContextCache2) {
    this.atn = atn3;
    this.sharedContextCache = sharedContextCache2;
    return this;
  }
  getCachedContext(context) {
    if (this.sharedContextCache === null) {
      return context;
    }
    const visited = new HashMap();
    return getCachedPredictionContext(context, this.sharedContextCache, visited);
  }
};
ATNSimulator.ERROR = new DFAState(2147483647, new ATNConfigSet());

// node_modules/antlr4/src/antlr4/atn/OrderedATNConfigSet.js
var OrderedATNConfigSet = class extends ATNConfigSet {
  constructor() {
    super();
    this.configLookup = new HashSet();
  }
};

// node_modules/antlr4/src/antlr4/atn/LexerATNConfig.js
var LexerATNConfig = class extends ATNConfig {
  constructor(params, config) {
    super(params, config);
    const lexerActionExecutor = params.lexerActionExecutor || null;
    this.lexerActionExecutor = lexerActionExecutor || (config !== null ? config.lexerActionExecutor : null);
    this.passedThroughNonGreedyDecision = config !== null ? this.checkNonGreedyDecision(config, this.state) : false;
    this.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;
    this.equalsForConfigSet = LexerATNConfig.prototype.equals;
    return this;
  }
  updateHashCode(hash) {
    hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
  }
  equals(other) {
    return this === other || other instanceof LexerATNConfig && this.passedThroughNonGreedyDecision === other.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && super.equals(other);
  }
  checkNonGreedyDecision(source, target) {
    return source.passedThroughNonGreedyDecision || target instanceof DecisionState && target.nonGreedy;
  }
};

// node_modules/antlr4/src/antlr4/action/LexerIndexedCustomAction.js
var LexerIndexedCustomAction = class extends LexerAction {
  constructor(offset, action) {
    super(action.actionType);
    this.offset = offset;
    this.action = action;
    this.isPositionDependent = true;
  }
  execute(lexer) {
    this.action.execute(lexer);
  }
  updateHashCode(hash) {
    hash.update(this.actionType, this.offset, this.action);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerIndexedCustomAction)) {
      return false;
    } else {
      return this.offset === other.offset && this.action === other.action;
    }
  }
};

// node_modules/antlr4/src/antlr4/atn/LexerActionExecutor.js
var LexerActionExecutor = class {
  constructor(lexerActions) {
    this.lexerActions = lexerActions === null ? [] : lexerActions;
    this.cachedHashCode = HashCode.hashStuff(lexerActions);
    return this;
  }
  fixOffsetBeforeMatch(offset) {
    let updatedLexerActions = null;
    for (let i = 0; i < this.lexerActions.length; i++) {
      if (this.lexerActions[i].isPositionDependent && !(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
        if (updatedLexerActions === null) {
          updatedLexerActions = this.lexerActions.concat([]);
        }
        updatedLexerActions[i] = new LexerIndexedCustomAction(
          offset,
          this.lexerActions[i]
        );
      }
    }
    if (updatedLexerActions === null) {
      return this;
    } else {
      return new LexerActionExecutor(updatedLexerActions);
    }
  }
  execute(lexer, input, startIndex) {
    let requiresSeek = false;
    const stopIndex = input.index;
    try {
      for (let i = 0; i < this.lexerActions.length; i++) {
        let lexerAction = this.lexerActions[i];
        if (lexerAction instanceof LexerIndexedCustomAction) {
          const offset = lexerAction.offset;
          input.seek(startIndex + offset);
          lexerAction = lexerAction.action;
          requiresSeek = startIndex + offset !== stopIndex;
        } else if (lexerAction.isPositionDependent) {
          input.seek(stopIndex);
          requiresSeek = false;
        }
        lexerAction.execute(lexer);
      }
    } finally {
      if (requiresSeek) {
        input.seek(stopIndex);
      }
    }
  }
  hashCode() {
    return this.cachedHashCode;
  }
  updateHashCode(hash) {
    hash.update(this.cachedHashCode);
  }
  equals(other) {
    if (this === other) {
      return true;
    } else if (!(other instanceof LexerActionExecutor)) {
      return false;
    } else if (this.cachedHashCode != other.cachedHashCode) {
      return false;
    } else if (this.lexerActions.length != other.lexerActions.length) {
      return false;
    } else {
      const numActions = this.lexerActions.length;
      for (let idx = 0; idx < numActions; ++idx) {
        if (!this.lexerActions[idx].equals(other.lexerActions[idx])) {
          return false;
        }
      }
      return true;
    }
  }
  static append(lexerActionExecutor, lexerAction) {
    if (lexerActionExecutor === null) {
      return new LexerActionExecutor([lexerAction]);
    }
    const lexerActions = lexerActionExecutor.lexerActions.concat([lexerAction]);
    return new LexerActionExecutor(lexerActions);
  }
};

// node_modules/antlr4/src/antlr4/atn/LexerATNSimulator.js
function resetSimState(sim) {
  sim.index = -1;
  sim.line = 0;
  sim.column = -1;
  sim.dfaState = null;
}
var SimState = class {
  constructor() {
    resetSimState(this);
  }
  reset() {
    resetSimState(this);
  }
};
var LexerATNSimulator = class extends ATNSimulator {
  constructor(recog, atn3, decisionToDFA, sharedContextCache2) {
    super(atn3, sharedContextCache2);
    this.decisionToDFA = decisionToDFA;
    this.recog = recog;
    this.startIndex = -1;
    this.line = 1;
    this.column = 0;
    this.mode = Lexer.DEFAULT_MODE;
    this.prevAccept = new SimState();
  }
  copyState(simulator) {
    this.column = simulator.column;
    this.line = simulator.line;
    this.mode = simulator.mode;
    this.startIndex = simulator.startIndex;
  }
  match(input, mode) {
    this.mode = mode;
    const mark = input.mark();
    try {
      this.startIndex = input.index;
      this.prevAccept.reset();
      const dfa = this.decisionToDFA[mode];
      if (dfa.s0 === null) {
        return this.matchATN(input);
      } else {
        return this.execATN(input, dfa.s0);
      }
    } finally {
      input.release(mark);
    }
  }
  reset() {
    this.prevAccept.reset();
    this.startIndex = -1;
    this.line = 1;
    this.column = 0;
    this.mode = Lexer.DEFAULT_MODE;
  }
  matchATN(input) {
    const startState = this.atn.modeToStartState[this.mode];
    if (LexerATNSimulator.debug) {
      console.log("matchATN mode " + this.mode + " start: " + startState);
    }
    const old_mode = this.mode;
    const s0_closure = this.computeStartState(input, startState);
    const suppressEdge = s0_closure.hasSemanticContext;
    s0_closure.hasSemanticContext = false;
    const next = this.addDFAState(s0_closure);
    if (!suppressEdge) {
      this.decisionToDFA[this.mode].s0 = next;
    }
    const predict = this.execATN(input, next);
    if (LexerATNSimulator.debug) {
      console.log("DFA after matchATN: " + this.decisionToDFA[old_mode].toLexerString());
    }
    return predict;
  }
  execATN(input, ds0) {
    if (LexerATNSimulator.debug) {
      console.log("start state closure=" + ds0.configs);
    }
    if (ds0.isAcceptState) {
      this.captureSimState(this.prevAccept, input, ds0);
    }
    let t = input.LA(1);
    let s = ds0;
    for (; ; ) {
      if (LexerATNSimulator.debug) {
        console.log("execATN loop starting closure: " + s.configs);
      }
      let target = this.getExistingTargetState(s, t);
      if (target === null) {
        target = this.computeTargetState(input, s, t);
      }
      if (target === ATNSimulator.ERROR) {
        break;
      }
      if (t !== Token.EOF) {
        this.consume(input);
      }
      if (target.isAcceptState) {
        this.captureSimState(this.prevAccept, input, target);
        if (t === Token.EOF) {
          break;
        }
      }
      t = input.LA(1);
      s = target;
    }
    return this.failOrAccept(this.prevAccept, input, s.configs, t);
  }
  getExistingTargetState(s, t) {
    if (s.edges === null || t < LexerATNSimulator.MIN_DFA_EDGE || t > LexerATNSimulator.MAX_DFA_EDGE) {
      return null;
    }
    let target = s.edges[t - LexerATNSimulator.MIN_DFA_EDGE];
    if (target === void 0) {
      target = null;
    }
    if (LexerATNSimulator.debug && target !== null) {
      console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
    }
    return target;
  }
  computeTargetState(input, s, t) {
    const reach = new OrderedATNConfigSet();
    this.getReachableConfigSet(input, s.configs, reach, t);
    if (reach.items.length === 0) {
      if (!reach.hasSemanticContext) {
        this.addDFAEdge(s, t, ATNSimulator.ERROR);
      }
      return ATNSimulator.ERROR;
    }
    return this.addDFAEdge(s, t, null, reach);
  }
  failOrAccept(prevAccept, input, reach, t) {
    if (this.prevAccept.dfaState !== null) {
      const lexerActionExecutor = prevAccept.dfaState.lexerActionExecutor;
      this.accept(
        input,
        lexerActionExecutor,
        this.startIndex,
        prevAccept.index,
        prevAccept.line,
        prevAccept.column
      );
      return prevAccept.dfaState.prediction;
    } else {
      if (t === Token.EOF && input.index === this.startIndex) {
        return Token.EOF;
      }
      throw new LexerNoViableAltException(this.recog, input, this.startIndex, reach);
    }
  }
  getReachableConfigSet(input, closure, reach, t) {
    let skipAlt = ATN.INVALID_ALT_NUMBER;
    for (let i = 0; i < closure.items.length; i++) {
      const cfg = closure.items[i];
      const currentAltReachedAcceptState = cfg.alt === skipAlt;
      if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) {
        continue;
      }
      if (LexerATNSimulator.debug) {
        console.log("testing %s at %s\n", this.getTokenName(t), cfg.toString(this.recog, true));
      }
      for (let j = 0; j < cfg.state.transitions.length; j++) {
        const trans = cfg.state.transitions[j];
        const target = this.getReachableTarget(trans, t);
        if (target !== null) {
          let lexerActionExecutor = cfg.lexerActionExecutor;
          if (lexerActionExecutor !== null) {
            lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
          }
          const treatEofAsEpsilon = t === Token.EOF;
          const config = new LexerATNConfig({ state: target, lexerActionExecutor }, cfg);
          if (this.closure(
            input,
            config,
            reach,
            currentAltReachedAcceptState,
            true,
            treatEofAsEpsilon
          )) {
            skipAlt = cfg.alt;
          }
        }
      }
    }
  }
  accept(input, lexerActionExecutor, startIndex, index, line, charPos) {
    if (LexerATNSimulator.debug) {
      console.log("ACTION %s\n", lexerActionExecutor);
    }
    input.seek(index);
    this.line = line;
    this.column = charPos;
    if (lexerActionExecutor !== null && this.recog !== null) {
      lexerActionExecutor.execute(this.recog, input, startIndex);
    }
  }
  getReachableTarget(trans, t) {
    if (trans.matches(t, 0, Lexer.MAX_CHAR_VALUE)) {
      return trans.target;
    } else {
      return null;
    }
  }
  computeStartState(input, p) {
    const initialContext = PredictionContext.EMPTY;
    const configs = new OrderedATNConfigSet();
    for (let i = 0; i < p.transitions.length; i++) {
      const target = p.transitions[i].target;
      const cfg = new LexerATNConfig({ state: target, alt: i + 1, context: initialContext }, null);
      this.closure(input, cfg, configs, false, false, false);
    }
    return configs;
  }
  closure(input, config, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
    let cfg = null;
    if (LexerATNSimulator.debug) {
      console.log("closure(" + config.toString(this.recog, true) + ")");
    }
    if (config.state instanceof RuleStopState) {
      if (LexerATNSimulator.debug) {
        if (this.recog !== null) {
          console.log("closure at %s rule stop %s\n", this.recog.ruleNames[config.state.ruleIndex], config);
        } else {
          console.log("closure at rule stop %s\n", config);
        }
      }
      if (config.context === null || config.context.hasEmptyPath()) {
        if (config.context === null || config.context.isEmpty()) {
          configs.add(config);
          return true;
        } else {
          configs.add(new LexerATNConfig({ state: config.state, context: PredictionContext.EMPTY }, config));
          currentAltReachedAcceptState = true;
        }
      }
      if (config.context !== null && !config.context.isEmpty()) {
        for (let i = 0; i < config.context.length; i++) {
          if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
            const newContext = config.context.getParent(i);
            const returnState = this.atn.states[config.context.getReturnState(i)];
            cfg = new LexerATNConfig({ state: returnState, context: newContext }, config);
            currentAltReachedAcceptState = this.closure(
              input,
              cfg,
              configs,
              currentAltReachedAcceptState,
              speculative,
              treatEofAsEpsilon
            );
          }
        }
      }
      return currentAltReachedAcceptState;
    }
    if (!config.state.epsilonOnlyTransitions) {
      if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) {
        configs.add(config);
      }
    }
    for (let j = 0; j < config.state.transitions.length; j++) {
      const trans = config.state.transitions[j];
      cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);
      if (cfg !== null) {
        currentAltReachedAcceptState = this.closure(
          input,
          cfg,
          configs,
          currentAltReachedAcceptState,
          speculative,
          treatEofAsEpsilon
        );
      }
    }
    return currentAltReachedAcceptState;
  }
  getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon) {
    let cfg = null;
    if (trans.serializationType === Transition.RULE) {
      const newContext = SingletonPredictionContext.create(config.context, trans.followState.stateNumber);
      cfg = new LexerATNConfig({ state: trans.target, context: newContext }, config);
    } else if (trans.serializationType === Transition.PRECEDENCE) {
      throw "Precedence predicates are not supported in lexers.";
    } else if (trans.serializationType === Transition.PREDICATE) {
      if (LexerATNSimulator.debug) {
        console.log("EVAL rule " + trans.ruleIndex + ":" + trans.predIndex);
      }
      configs.hasSemanticContext = true;
      if (this.evaluatePredicate(input, trans.ruleIndex, trans.predIndex, speculative)) {
        cfg = new LexerATNConfig({ state: trans.target }, config);
      }
    } else if (trans.serializationType === Transition.ACTION) {
      if (config.context === null || config.context.hasEmptyPath()) {
        const lexerActionExecutor = LexerActionExecutor.append(
          config.lexerActionExecutor,
          this.atn.lexerActions[trans.actionIndex]
        );
        cfg = new LexerATNConfig({ state: trans.target, lexerActionExecutor }, config);
      } else {
        cfg = new LexerATNConfig({ state: trans.target }, config);
      }
    } else if (trans.serializationType === Transition.EPSILON) {
      cfg = new LexerATNConfig({ state: trans.target }, config);
    } else if (trans.serializationType === Transition.ATOM || trans.serializationType === Transition.RANGE || trans.serializationType === Transition.SET) {
      if (treatEofAsEpsilon) {
        if (trans.matches(Token.EOF, 0, Lexer.MAX_CHAR_VALUE)) {
          cfg = new LexerATNConfig({ state: trans.target }, config);
        }
      }
    }
    return cfg;
  }
  evaluatePredicate(input, ruleIndex, predIndex, speculative) {
    if (this.recog === null) {
      return true;
    }
    if (!speculative) {
      return this.recog.sempred(null, ruleIndex, predIndex);
    }
    const savedcolumn = this.column;
    const savedLine = this.line;
    const index = input.index;
    const marker = input.mark();
    try {
      this.consume(input);
      return this.recog.sempred(null, ruleIndex, predIndex);
    } finally {
      this.column = savedcolumn;
      this.line = savedLine;
      input.seek(index);
      input.release(marker);
    }
  }
  captureSimState(settings, input, dfaState) {
    settings.index = input.index;
    settings.line = this.line;
    settings.column = this.column;
    settings.dfaState = dfaState;
  }
  addDFAEdge(from_, tk, to, cfgs) {
    if (to === void 0) {
      to = null;
    }
    if (cfgs === void 0) {
      cfgs = null;
    }
    if (to === null && cfgs !== null) {
      const suppressEdge = cfgs.hasSemanticContext;
      cfgs.hasSemanticContext = false;
      to = this.addDFAState(cfgs);
      if (suppressEdge) {
        return to;
      }
    }
    if (tk < LexerATNSimulator.MIN_DFA_EDGE || tk > LexerATNSimulator.MAX_DFA_EDGE) {
      return to;
    }
    if (LexerATNSimulator.debug) {
      console.log("EDGE " + from_ + " -> " + to + " upon " + tk);
    }
    if (from_.edges === null) {
      from_.edges = [];
    }
    from_.edges[tk - LexerATNSimulator.MIN_DFA_EDGE] = to;
    return to;
  }
  addDFAState(configs) {
    const proposed = new DFAState(null, configs);
    let firstConfigWithRuleStopState = null;
    for (let i = 0; i < configs.items.length; i++) {
      const cfg = configs.items[i];
      if (cfg.state instanceof RuleStopState) {
        firstConfigWithRuleStopState = cfg;
        break;
      }
    }
    if (firstConfigWithRuleStopState !== null) {
      proposed.isAcceptState = true;
      proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
      proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
    }
    const dfa = this.decisionToDFA[this.mode];
    const existing = dfa.states.get(proposed);
    if (existing !== null) {
      return existing;
    }
    const newState = proposed;
    newState.stateNumber = dfa.states.length;
    configs.setReadonly(true);
    newState.configs = configs;
    dfa.states.add(newState);
    return newState;
  }
  getDFA(mode) {
    return this.decisionToDFA[mode];
  }
  getText(input) {
    return input.getText(this.startIndex, input.index - 1);
  }
  consume(input) {
    const curChar = input.LA(1);
    if (curChar === "\n".charCodeAt(0)) {
      this.line += 1;
      this.column = 0;
    } else {
      this.column += 1;
    }
    input.consume();
  }
  getTokenName(tt) {
    if (tt === -1) {
      return "EOF";
    } else {
      return "'" + String.fromCharCode(tt) + "'";
    }
  }
};
LexerATNSimulator.debug = false;
LexerATNSimulator.dfa_debug = false;
LexerATNSimulator.MIN_DFA_EDGE = 0;
LexerATNSimulator.MAX_DFA_EDGE = 127;

// node_modules/antlr4/src/antlr4/dfa/PredPrediction.js
var PredPrediction = class {
  constructor(pred, alt) {
    this.alt = alt;
    this.pred = pred;
  }
  toString() {
    return "(" + this.pred + ", " + this.alt + ")";
  }
};

// node_modules/antlr4/src/antlr4/misc/AltDict.js
var AltDict = class {
  constructor() {
    this.data = {};
  }
  get(key) {
    return this.data["k-" + key] || null;
  }
  set(key, value) {
    this.data["k-" + key] = value;
  }
  values() {
    return Object.keys(this.data).filter((key) => key.startsWith("k-")).map((key) => this.data[key], this);
  }
};

// node_modules/antlr4/src/antlr4/atn/PredictionMode.js
var PredictionMode = {
  SLL: 0,
  LL: 1,
  LL_EXACT_AMBIG_DETECTION: 2,
  hasSLLConflictTerminatingPrediction: function(mode, configs) {
    if (PredictionMode.allConfigsInRuleStopStates(configs)) {
      return true;
    }
    if (mode === PredictionMode.SLL) {
      if (configs.hasSemanticContext) {
        const dup = new ATNConfigSet();
        for (let i = 0; i < configs.items.length; i++) {
          let c = configs.items[i];
          c = new ATNConfig({ semanticContext: SemanticContext.NONE }, c);
          dup.add(c);
        }
        configs = dup;
      }
    }
    const altsets = PredictionMode.getConflictingAltSubsets(configs);
    return PredictionMode.hasConflictingAltSet(altsets) && !PredictionMode.hasStateAssociatedWithOneAlt(configs);
  },
  hasConfigInRuleStopState: function(configs) {
    for (let i = 0; i < configs.items.length; i++) {
      const c = configs.items[i];
      if (c.state instanceof RuleStopState) {
        return true;
      }
    }
    return false;
  },
  allConfigsInRuleStopStates: function(configs) {
    for (let i = 0; i < configs.items.length; i++) {
      const c = configs.items[i];
      if (!(c.state instanceof RuleStopState)) {
        return false;
      }
    }
    return true;
  },
  resolvesToJustOneViableAlt: function(altsets) {
    return PredictionMode.getSingleViableAlt(altsets);
  },
  allSubsetsConflict: function(altsets) {
    return !PredictionMode.hasNonConflictingAltSet(altsets);
  },
  hasNonConflictingAltSet: function(altsets) {
    for (let i = 0; i < altsets.length; i++) {
      const alts = altsets[i];
      if (alts.length === 1) {
        return true;
      }
    }
    return false;
  },
  hasConflictingAltSet: function(altsets) {
    for (let i = 0; i < altsets.length; i++) {
      const alts = altsets[i];
      if (alts.length > 1) {
        return true;
      }
    }
    return false;
  },
  allSubsetsEqual: function(altsets) {
    let first = null;
    for (let i = 0; i < altsets.length; i++) {
      const alts = altsets[i];
      if (first === null) {
        first = alts;
      } else if (alts !== first) {
        return false;
      }
    }
    return true;
  },
  getUniqueAlt: function(altsets) {
    const all = PredictionMode.getAlts(altsets);
    if (all.length === 1) {
      return all.minValue();
    } else {
      return ATN.INVALID_ALT_NUMBER;
    }
  },
  getAlts: function(altsets) {
    const all = new BitSet();
    altsets.map(function(alts) {
      all.or(alts);
    });
    return all;
  },
  getConflictingAltSubsets: function(configs) {
    const configToAlts = new HashMap();
    configToAlts.hashFunction = function(cfg) {
      HashCode.hashStuff(cfg.state.stateNumber, cfg.context);
    };
    configToAlts.equalsFunction = function(c1, c2) {
      return c1.state.stateNumber === c2.state.stateNumber && c1.context.equals(c2.context);
    };
    configs.items.map(function(cfg) {
      let alts = configToAlts.get(cfg);
      if (alts === null) {
        alts = new BitSet();
        configToAlts.set(cfg, alts);
      }
      alts.add(cfg.alt);
    });
    return configToAlts.getValues();
  },
  getStateToAltMap: function(configs) {
    const m = new AltDict();
    configs.items.map(function(c) {
      let alts = m.get(c.state);
      if (alts === null) {
        alts = new BitSet();
        m.set(c.state, alts);
      }
      alts.add(c.alt);
    });
    return m;
  },
  hasStateAssociatedWithOneAlt: function(configs) {
    const values = PredictionMode.getStateToAltMap(configs).values();
    for (let i = 0; i < values.length; i++) {
      if (values[i].length === 1) {
        return true;
      }
    }
    return false;
  },
  getSingleViableAlt: function(altsets) {
    let result = null;
    for (let i = 0; i < altsets.length; i++) {
      const alts = altsets[i];
      const minAlt = alts.minValue();
      if (result === null) {
        result = minAlt;
      } else if (result !== minAlt) {
        return ATN.INVALID_ALT_NUMBER;
      }
    }
    return result;
  }
};
var PredictionMode_default = PredictionMode;

// node_modules/antlr4/src/antlr4/error/NoViableAltException.js
var NoViableAltException = class extends RecognitionException {
  constructor(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
    ctx = ctx || recognizer._ctx;
    offendingToken = offendingToken || recognizer.getCurrentToken();
    startToken = startToken || recognizer.getCurrentToken();
    input = input || recognizer.getInputStream();
    super({ message: "", recognizer, input, ctx });
    this.deadEndConfigs = deadEndConfigs;
    this.startToken = startToken;
    this.offendingToken = offendingToken;
  }
};

// node_modules/antlr4/src/antlr4/utils/DoubleDict.js
var DoubleDict = class {
  constructor(defaultMapCtor) {
    this.defaultMapCtor = defaultMapCtor || HashMap;
    this.cacheMap = new this.defaultMapCtor();
  }
  get(a, b) {
    const d = this.cacheMap.get(a) || null;
    return d === null ? null : d.get(b) || null;
  }
  set(a, b, o) {
    let d = this.cacheMap.get(a) || null;
    if (d === null) {
      d = new this.defaultMapCtor();
      this.cacheMap.set(a, d);
    }
    d.set(b, o);
  }
};

// node_modules/antlr4/src/antlr4/atn/ParserATNSimulator.js
var ParserATNSimulator = class extends ATNSimulator {
  constructor(parser, atn3, decisionToDFA, sharedContextCache2) {
    super(atn3, sharedContextCache2);
    this.parser = parser;
    this.decisionToDFA = decisionToDFA;
    this.predictionMode = PredictionMode_default.LL;
    this._input = null;
    this._startIndex = 0;
    this._outerContext = null;
    this._dfa = null;
    this.mergeCache = null;
    this.debug = false;
    this.debug_closure = false;
    this.debug_add = false;
    this.debug_list_atn_decisions = false;
    this.dfa_debug = false;
    this.retry_debug = false;
  }
  reset() {
  }
  adaptivePredict(input, decision, outerContext) {
    if (this.debug || this.debug_list_atn_decisions) {
      console.log("adaptivePredict decision " + decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
    }
    this._input = input;
    this._startIndex = input.index;
    this._outerContext = outerContext;
    const dfa = this.decisionToDFA[decision];
    this._dfa = dfa;
    const m = input.mark();
    const index = input.index;
    try {
      let s0;
      if (dfa.precedenceDfa) {
        s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
      } else {
        s0 = dfa.s0;
      }
      if (s0 === null) {
        if (outerContext === null) {
          outerContext = RuleContext.EMPTY;
        }
        if (this.debug || this.debug_list_atn_decisions) {
          console.log("predictATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + ", outerContext=" + outerContext.toString(this.parser.ruleNames));
        }
        const fullCtx = false;
        let s0_closure = this.computeStartState(dfa.atnStartState, RuleContext.EMPTY, fullCtx);
        if (dfa.precedenceDfa) {
          dfa.s0.configs = s0_closure;
          s0_closure = this.applyPrecedenceFilter(s0_closure);
          s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
          dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
        } else {
          s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
          dfa.s0 = s0;
        }
      }
      const alt = this.execATN(dfa, s0, input, index, outerContext);
      if (this.debug) {
        console.log("DFA after predictATN: " + dfa.toString(this.parser.literalNames, this.parser.symbolicNames));
      }
      return alt;
    } finally {
      this._dfa = null;
      this.mergeCache = null;
      input.seek(index);
      input.release(m);
    }
  }
  execATN(dfa, s0, input, startIndex, outerContext) {
    if (this.debug || this.debug_list_atn_decisions) {
      console.log("execATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
    }
    let alt;
    let previousD = s0;
    if (this.debug) {
      console.log("s0 = " + s0);
    }
    let t = input.LA(1);
    for (; ; ) {
      let D = this.getExistingTargetState(previousD, t);
      if (D === null) {
        D = this.computeTargetState(dfa, previousD, t);
      }
      if (D === ATNSimulator.ERROR) {
        const e = this.noViableAlt(input, outerContext, previousD.configs, startIndex);
        input.seek(startIndex);
        alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousD.configs, outerContext);
        if (alt !== ATN.INVALID_ALT_NUMBER) {
          return alt;
        } else {
          throw e;
        }
      }
      if (D.requiresFullContext && this.predictionMode !== PredictionMode_default.SLL) {
        let conflictingAlts = null;
        if (D.predicates !== null) {
          if (this.debug) {
            console.log("DFA state has preds in DFA sim LL failover");
          }
          const conflictIndex = input.index;
          if (conflictIndex !== startIndex) {
            input.seek(startIndex);
          }
          conflictingAlts = this.evalSemanticContext(D.predicates, outerContext, true);
          if (conflictingAlts.length === 1) {
            if (this.debug) {
              console.log("Full LL avoided");
            }
            return conflictingAlts.minValue();
          }
          if (conflictIndex !== startIndex) {
            input.seek(conflictIndex);
          }
        }
        if (this.dfa_debug) {
          console.log("ctx sensitive state " + outerContext + " in " + D);
        }
        const fullCtx = true;
        const s0_closure = this.computeStartState(dfa.atnStartState, outerContext, fullCtx);
        this.reportAttemptingFullContext(dfa, conflictingAlts, D.configs, startIndex, input.index);
        alt = this.execATNWithFullContext(dfa, D, s0_closure, input, startIndex, outerContext);
        return alt;
      }
      if (D.isAcceptState) {
        if (D.predicates === null) {
          return D.prediction;
        }
        const stopIndex = input.index;
        input.seek(startIndex);
        const alts = this.evalSemanticContext(D.predicates, outerContext, true);
        if (alts.length === 0) {
          throw this.noViableAlt(input, outerContext, D.configs, startIndex);
        } else if (alts.length === 1) {
          return alts.minValue();
        } else {
          this.reportAmbiguity(dfa, D, startIndex, stopIndex, false, alts, D.configs);
          return alts.minValue();
        }
      }
      previousD = D;
      if (t !== Token.EOF) {
        input.consume();
        t = input.LA(1);
      }
    }
  }
  getExistingTargetState(previousD, t) {
    const edges = previousD.edges;
    if (edges === null) {
      return null;
    } else {
      return edges[t + 1] || null;
    }
  }
  computeTargetState(dfa, previousD, t) {
    const reach = this.computeReachSet(previousD.configs, t, false);
    if (reach === null) {
      this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
      return ATNSimulator.ERROR;
    }
    let D = new DFAState(null, reach);
    const predictedAlt = this.getUniqueAlt(reach);
    if (this.debug) {
      const altSubSets = PredictionMode_default.getConflictingAltSubsets(reach);
      console.log("SLL altSubSets=" + arrayToString(altSubSets) + ", configs=" + reach + ", predict=" + predictedAlt + ", allSubsetsConflict=" + PredictionMode_default.allSubsetsConflict(altSubSets) + ", conflictingAlts=" + this.getConflictingAlts(reach));
    }
    if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
      D.isAcceptState = true;
      D.configs.uniqueAlt = predictedAlt;
      D.prediction = predictedAlt;
    } else if (PredictionMode_default.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
      D.configs.conflictingAlts = this.getConflictingAlts(reach);
      D.requiresFullContext = true;
      D.isAcceptState = true;
      D.prediction = D.configs.conflictingAlts.minValue();
    }
    if (D.isAcceptState && D.configs.hasSemanticContext) {
      this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));
      if (D.predicates !== null) {
        D.prediction = ATN.INVALID_ALT_NUMBER;
      }
    }
    D = this.addDFAEdge(dfa, previousD, t, D);
    return D;
  }
  predicateDFAState(dfaState, decisionState) {
    const nalts = decisionState.transitions.length;
    const altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
    const altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, nalts);
    if (altToPred !== null) {
      dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
      dfaState.prediction = ATN.INVALID_ALT_NUMBER;
    } else {
      dfaState.prediction = altsToCollectPredsFrom.minValue();
    }
  }
  execATNWithFullContext(dfa, D, s0, input, startIndex, outerContext) {
    if (this.debug || this.debug_list_atn_decisions) {
      console.log("execATNWithFullContext " + s0);
    }
    const fullCtx = true;
    let foundExactAmbig = false;
    let reach;
    let previous = s0;
    input.seek(startIndex);
    let t = input.LA(1);
    let predictedAlt = -1;
    for (; ; ) {
      reach = this.computeReachSet(previous, t, fullCtx);
      if (reach === null) {
        const e = this.noViableAlt(input, outerContext, previous, startIndex);
        input.seek(startIndex);
        const alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);
        if (alt !== ATN.INVALID_ALT_NUMBER) {
          return alt;
        } else {
          throw e;
        }
      }
      const altSubSets = PredictionMode_default.getConflictingAltSubsets(reach);
      if (this.debug) {
        console.log("LL altSubSets=" + altSubSets + ", predict=" + PredictionMode_default.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" + PredictionMode_default.resolvesToJustOneViableAlt(altSubSets));
      }
      reach.uniqueAlt = this.getUniqueAlt(reach);
      if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
        predictedAlt = reach.uniqueAlt;
        break;
      } else if (this.predictionMode !== PredictionMode_default.LL_EXACT_AMBIG_DETECTION) {
        predictedAlt = PredictionMode_default.resolvesToJustOneViableAlt(altSubSets);
        if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
          break;
        }
      } else {
        if (PredictionMode_default.allSubsetsConflict(altSubSets) && PredictionMode_default.allSubsetsEqual(altSubSets)) {
          foundExactAmbig = true;
          predictedAlt = PredictionMode_default.getSingleViableAlt(altSubSets);
          break;
        }
      }
      previous = reach;
      if (t !== Token.EOF) {
        input.consume();
        t = input.LA(1);
      }
    }
    if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
      this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
      return predictedAlt;
    }
    this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, null, reach);
    return predictedAlt;
  }
  computeReachSet(closure, t, fullCtx) {
    if (this.debug) {
      console.log("in computeReachSet, starting closure: " + closure);
    }
    if (this.mergeCache === null) {
      this.mergeCache = new DoubleDict();
    }
    const intermediate = new ATNConfigSet(fullCtx);
    let skippedStopStates = null;
    for (let i = 0; i < closure.items.length; i++) {
      const c = closure.items[i];
      if (this.debug) {
        console.log("testing " + this.getTokenName(t) + " at " + c);
      }
      if (c.state instanceof RuleStopState) {
        if (fullCtx || t === Token.EOF) {
          if (skippedStopStates === null) {
            skippedStopStates = [];
          }
          skippedStopStates.push(c);
          if (this.debug_add) {
            console.log("added " + c + " to skippedStopStates");
          }
        }
        continue;
      }
      for (let j = 0; j < c.state.transitions.length; j++) {
        const trans = c.state.transitions[j];
        const target = this.getReachableTarget(trans, t);
        if (target !== null) {
          const cfg = new ATNConfig({ state: target }, c);
          intermediate.add(cfg, this.mergeCache);
          if (this.debug_add) {
            console.log("added " + cfg + " to intermediate");
          }
        }
      }
    }
    let reach = null;
    if (skippedStopStates === null && t !== Token.EOF) {
      if (intermediate.items.length === 1) {
        reach = intermediate;
      } else if (this.getUniqueAlt(intermediate) !== ATN.INVALID_ALT_NUMBER) {
        reach = intermediate;
      }
    }
    if (reach === null) {
      reach = new ATNConfigSet(fullCtx);
      const closureBusy = new HashSet();
      const treatEofAsEpsilon = t === Token.EOF;
      for (let k = 0; k < intermediate.items.length; k++) {
        this.closure(intermediate.items[k], reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
      }
    }
    if (t === Token.EOF) {
      reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
    }
    if (skippedStopStates !== null && (!fullCtx || !PredictionMode_default.hasConfigInRuleStopState(reach))) {
      for (let l = 0; l < skippedStopStates.length; l++) {
        reach.add(skippedStopStates[l], this.mergeCache);
      }
    }
    if (reach.items.length === 0) {
      return null;
    } else {
      return reach;
    }
  }
  removeAllConfigsNotInRuleStopState(configs, lookToEndOfRule) {
    if (PredictionMode_default.allConfigsInRuleStopStates(configs)) {
      return configs;
    }
    const result = new ATNConfigSet(configs.fullCtx);
    for (let i = 0; i < configs.items.length; i++) {
      const config = configs.items[i];
      if (config.state instanceof RuleStopState) {
        result.add(config, this.mergeCache);
        continue;
      }
      if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
        const nextTokens = this.atn.nextTokens(config.state);
        if (nextTokens.contains(Token.EPSILON)) {
          const endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
          result.add(new ATNConfig({ state: endOfRuleState }, config), this.mergeCache);
        }
      }
    }
    return result;
  }
  computeStartState(p, ctx, fullCtx) {
    const initialContext = predictionContextFromRuleContext(this.atn, ctx);
    const configs = new ATNConfigSet(fullCtx);
    for (let i = 0; i < p.transitions.length; i++) {
      const target = p.transitions[i].target;
      const c = new ATNConfig({ state: target, alt: i + 1, context: initialContext }, null);
      const closureBusy = new HashSet();
      this.closure(c, configs, closureBusy, true, fullCtx, false);
    }
    return configs;
  }
  applyPrecedenceFilter(configs) {
    let config;
    const statesFromAlt1 = [];
    const configSet = new ATNConfigSet(configs.fullCtx);
    for (let i = 0; i < configs.items.length; i++) {
      config = configs.items[i];
      if (config.alt !== 1) {
        continue;
      }
      const updatedContext = config.semanticContext.evalPrecedence(this.parser, this._outerContext);
      if (updatedContext === null) {
        continue;
      }
      statesFromAlt1[config.state.stateNumber] = config.context;
      if (updatedContext !== config.semanticContext) {
        configSet.add(new ATNConfig({ semanticContext: updatedContext }, config), this.mergeCache);
      } else {
        configSet.add(config, this.mergeCache);
      }
    }
    for (let i = 0; i < configs.items.length; i++) {
      config = configs.items[i];
      if (config.alt === 1) {
        continue;
      }
      if (!config.precedenceFilterSuppressed) {
        const context = statesFromAlt1[config.state.stateNumber] || null;
        if (context !== null && context.equals(config.context)) {
          continue;
        }
      }
      configSet.add(config, this.mergeCache);
    }
    return configSet;
  }
  getReachableTarget(trans, ttype) {
    if (trans.matches(ttype, 0, this.atn.maxTokenType)) {
      return trans.target;
    } else {
      return null;
    }
  }
  getPredsForAmbigAlts(ambigAlts, configs, nalts) {
    let altToPred = [];
    for (let i = 0; i < configs.items.length; i++) {
      const c = configs.items[i];
      if (ambigAlts.has(c.alt)) {
        altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] || null, c.semanticContext);
      }
    }
    let nPredAlts = 0;
    for (let i = 1; i < nalts + 1; i++) {
      const pred = altToPred[i] || null;
      if (pred === null) {
        altToPred[i] = SemanticContext.NONE;
      } else if (pred !== SemanticContext.NONE) {
        nPredAlts += 1;
      }
    }
    if (nPredAlts === 0) {
      altToPred = null;
    }
    if (this.debug) {
      console.log("getPredsForAmbigAlts result " + arrayToString(altToPred));
    }
    return altToPred;
  }
  getPredicatePredictions(ambigAlts, altToPred) {
    const pairs = [];
    let containsPredicate = false;
    for (let i = 1; i < altToPred.length; i++) {
      const pred = altToPred[i];
      if (ambigAlts !== null && ambigAlts.has(i)) {
        pairs.push(new PredPrediction(pred, i));
      }
      if (pred !== SemanticContext.NONE) {
        containsPredicate = true;
      }
    }
    if (!containsPredicate) {
      return null;
    }
    return pairs;
  }
  getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(configs, outerContext) {
    const cfgs = this.splitAccordingToSemanticValidity(configs, outerContext);
    const semValidConfigs = cfgs[0];
    const semInvalidConfigs = cfgs[1];
    let alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);
    if (alt !== ATN.INVALID_ALT_NUMBER) {
      return alt;
    }
    if (semInvalidConfigs.items.length > 0) {
      alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);
      if (alt !== ATN.INVALID_ALT_NUMBER) {
        return alt;
      }
    }
    return ATN.INVALID_ALT_NUMBER;
  }
  getAltThatFinishedDecisionEntryRule(configs) {
    const alts = [];
    for (let i = 0; i < configs.items.length; i++) {
      const c = configs.items[i];
      if (c.reachesIntoOuterContext > 0 || c.state instanceof RuleStopState && c.context.hasEmptyPath()) {
        if (alts.indexOf(c.alt) < 0) {
          alts.push(c.alt);
        }
      }
    }
    if (alts.length === 0) {
      return ATN.INVALID_ALT_NUMBER;
    } else {
      return Math.min.apply(null, alts);
    }
  }
  splitAccordingToSemanticValidity(configs, outerContext) {
    const succeeded = new ATNConfigSet(configs.fullCtx);
    const failed = new ATNConfigSet(configs.fullCtx);
    for (let i = 0; i < configs.items.length; i++) {
      const c = configs.items[i];
      if (c.semanticContext !== SemanticContext.NONE) {
        const predicateEvaluationResult = c.semanticContext.evaluate(this.parser, outerContext);
        if (predicateEvaluationResult) {
          succeeded.add(c);
        } else {
          failed.add(c);
        }
      } else {
        succeeded.add(c);
      }
    }
    return [succeeded, failed];
  }
  evalSemanticContext(predPredictions, outerContext, complete) {
    const predictions = new BitSet();
    for (let i = 0; i < predPredictions.length; i++) {
      const pair = predPredictions[i];
      if (pair.pred === SemanticContext.NONE) {
        predictions.add(pair.alt);
        if (!complete) {
          break;
        }
        continue;
      }
      const predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);
      if (this.debug || this.dfa_debug) {
        console.log("eval pred " + pair + "=" + predicateEvaluationResult);
      }
      if (predicateEvaluationResult) {
        if (this.debug || this.dfa_debug) {
          console.log("PREDICT " + pair.alt);
        }
        predictions.add(pair.alt);
        if (!complete) {
          break;
        }
      }
    }
    return predictions;
  }
  closure(config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
    const initialDepth = 0;
    this.closureCheckingStopState(
      config,
      configs,
      closureBusy,
      collectPredicates,
      fullCtx,
      initialDepth,
      treatEofAsEpsilon
    );
  }
  closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
    if (this.debug || this.debug_closure) {
      console.log("closure(" + config.toString(this.parser, true) + ")");
      if (config.reachesIntoOuterContext > 50) {
        throw "problem";
      }
    }
    if (config.state instanceof RuleStopState) {
      if (!config.context.isEmpty()) {
        for (let i = 0; i < config.context.length; i++) {
          if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
            if (fullCtx) {
              configs.add(new ATNConfig({ state: config.state, context: PredictionContext.EMPTY }, config), this.mergeCache);
              continue;
            } else {
              if (this.debug) {
                console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
              }
              this.closure_(
                config,
                configs,
                closureBusy,
                collectPredicates,
                fullCtx,
                depth,
                treatEofAsEpsilon
              );
            }
            continue;
          }
          const returnState = this.atn.states[config.context.getReturnState(i)];
          const newContext = config.context.getParent(i);
          const parms = { state: returnState, alt: config.alt, context: newContext, semanticContext: config.semanticContext };
          const c = new ATNConfig(parms, null);
          c.reachesIntoOuterContext = config.reachesIntoOuterContext;
          this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
        }
        return;
      } else if (fullCtx) {
        configs.add(config, this.mergeCache);
        return;
      } else {
        if (this.debug) {
          console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
        }
      }
    }
    this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
  }
  closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
    const p = config.state;
    if (!p.epsilonOnlyTransitions) {
      configs.add(config, this.mergeCache);
    }
    for (let i = 0; i < p.transitions.length; i++) {
      if (i === 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config))
        continue;
      const t = p.transitions[i];
      const continueCollecting = collectPredicates && !(t instanceof ActionTransition);
      const c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);
      if (c !== null) {
        let newDepth = depth;
        if (config.state instanceof RuleStopState) {
          if (this._dfa !== null && this._dfa.precedenceDfa) {
            if (t.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex) {
              c.precedenceFilterSuppressed = true;
            }
          }
          c.reachesIntoOuterContext += 1;
          if (closureBusy.add(c) !== c) {
            continue;
          }
          configs.dipsIntoOuterContext = true;
          newDepth -= 1;
          if (this.debug) {
            console.log("dips into outer ctx: " + c);
          }
        } else {
          if (!t.isEpsilon && closureBusy.add(c) !== c) {
            continue;
          }
          if (t instanceof RuleTransition) {
            if (newDepth >= 0) {
              newDepth += 1;
            }
          }
        }
        this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
      }
    }
  }
  canDropLoopEntryEdgeInLeftRecursiveRule(config) {
    const p = config.state;
    if (p.stateType !== ATNState.STAR_LOOP_ENTRY)
      return false;
    if (p.stateType !== ATNState.STAR_LOOP_ENTRY || !p.isPrecedenceDecision || config.context.isEmpty() || config.context.hasEmptyPath())
      return false;
    const numCtxs = config.context.length;
    for (let i = 0; i < numCtxs; i++) {
      const returnState = this.atn.states[config.context.getReturnState(i)];
      if (returnState.ruleIndex !== p.ruleIndex)
        return false;
    }
    const decisionStartState = p.transitions[0].target;
    const blockEndStateNum = decisionStartState.endState.stateNumber;
    const blockEndState = this.atn.states[blockEndStateNum];
    for (let i = 0; i < numCtxs; i++) {
      const returnStateNumber = config.context.getReturnState(i);
      const returnState = this.atn.states[returnStateNumber];
      if (returnState.transitions.length !== 1 || !returnState.transitions[0].isEpsilon)
        return false;
      const returnStateTarget = returnState.transitions[0].target;
      if (returnState.stateType === ATNState.BLOCK_END && returnStateTarget === p)
        continue;
      if (returnState === blockEndState)
        continue;
      if (returnStateTarget === blockEndState)
        continue;
      if (returnStateTarget.stateType === ATNState.BLOCK_END && returnStateTarget.transitions.length === 1 && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target === p)
        continue;
      return false;
    }
    return true;
  }
  getRuleName(index) {
    if (this.parser !== null && index >= 0) {
      return this.parser.ruleNames[index];
    } else {
      return "<rule " + index + ">";
    }
  }
  getEpsilonTarget(config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
    switch (t.serializationType) {
      case Transition.RULE:
        return this.ruleTransition(config, t);
      case Transition.PRECEDENCE:
        return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);
      case Transition.PREDICATE:
        return this.predTransition(config, t, collectPredicates, inContext, fullCtx);
      case Transition.ACTION:
        return this.actionTransition(config, t);
      case Transition.EPSILON:
        return new ATNConfig({ state: t.target }, config);
      case Transition.ATOM:
      case Transition.RANGE:
      case Transition.SET:
        if (treatEofAsEpsilon) {
          if (t.matches(Token.EOF, 0, 1)) {
            return new ATNConfig({ state: t.target }, config);
          }
        }
        return null;
      default:
        return null;
    }
  }
  actionTransition(config, t) {
    if (this.debug) {
      const index = t.actionIndex === -1 ? 65535 : t.actionIndex;
      console.log("ACTION edge " + t.ruleIndex + ":" + index);
    }
    return new ATNConfig({ state: t.target }, config);
  }
  precedenceTransition(config, pt, collectPredicates, inContext, fullCtx) {
    if (this.debug) {
      console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.precedence + ">=_p, ctx dependent=true");
      if (this.parser !== null) {
        console.log("context surrounding pred is " + arrayToString(this.parser.getRuleInvocationStack()));
      }
    }
    let c = null;
    if (collectPredicates && inContext) {
      if (fullCtx) {
        const currentPosition = this._input.index;
        this._input.seek(this._startIndex);
        const predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
        this._input.seek(currentPosition);
        if (predSucceeds) {
          c = new ATNConfig({ state: pt.target }, config);
        }
      } else {
        const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
        c = new ATNConfig({ state: pt.target, semanticContext: newSemCtx }, config);
      }
    } else {
      c = new ATNConfig({ state: pt.target }, config);
    }
    if (this.debug) {
      console.log("config from pred transition=" + c);
    }
    return c;
  }
  predTransition(config, pt, collectPredicates, inContext, fullCtx) {
    if (this.debug) {
      console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex + ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);
      if (this.parser !== null) {
        console.log("context surrounding pred is " + arrayToString(this.parser.getRuleInvocationStack()));
      }
    }
    let c = null;
    if (collectPredicates && (pt.isCtxDependent && inContext || !pt.isCtxDependent)) {
      if (fullCtx) {
        const currentPosition = this._input.index;
        this._input.seek(this._startIndex);
        const predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
        this._input.seek(currentPosition);
        if (predSucceeds) {
          c = new ATNConfig({ state: pt.target }, config);
        }
      } else {
        const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
        c = new ATNConfig({ state: pt.target, semanticContext: newSemCtx }, config);
      }
    } else {
      c = new ATNConfig({ state: pt.target }, config);
    }
    if (this.debug) {
      console.log("config from pred transition=" + c);
    }
    return c;
  }
  ruleTransition(config, t) {
    if (this.debug) {
      console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
    }
    const returnState = t.followState;
    const newContext = SingletonPredictionContext.create(config.context, returnState.stateNumber);
    return new ATNConfig({ state: t.target, context: newContext }, config);
  }
  getConflictingAlts(configs) {
    const altsets = PredictionMode_default.getConflictingAltSubsets(configs);
    return PredictionMode_default.getAlts(altsets);
  }
  getConflictingAltsOrUniqueAlt(configs) {
    let conflictingAlts = null;
    if (configs.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
      conflictingAlts = new BitSet();
      conflictingAlts.add(configs.uniqueAlt);
    } else {
      conflictingAlts = configs.conflictingAlts;
    }
    return conflictingAlts;
  }
  getTokenName(t) {
    if (t === Token.EOF) {
      return "EOF";
    }
    if (this.parser !== null && this.parser.literalNames !== null) {
      if (t >= this.parser.literalNames.length && t >= this.parser.symbolicNames.length) {
        console.log("" + t + " ttype out of range: " + this.parser.literalNames);
        console.log("" + this.parser.getInputStream().getTokens());
      } else {
        const name = this.parser.literalNames[t] || this.parser.symbolicNames[t];
        return name + "<" + t + ">";
      }
    }
    return "" + t;
  }
  getLookaheadName(input) {
    return this.getTokenName(input.LA(1));
  }
  dumpDeadEndConfigs(nvae) {
    console.log("dead end configs: ");
    const decs = nvae.getDeadEndConfigs();
    for (let i = 0; i < decs.length; i++) {
      const c = decs[i];
      let trans = "no edges";
      if (c.state.transitions.length > 0) {
        const t = c.state.transitions[0];
        if (t instanceof AtomTransition) {
          trans = "Atom " + this.getTokenName(t.label);
        } else if (t instanceof SetTransition) {
          const neg = t instanceof NotSetTransition;
          trans = (neg ? "~" : "") + "Set " + t.set;
        }
      }
      console.error(c.toString(this.parser, true) + ":" + trans);
    }
  }
  noViableAlt(input, outerContext, configs, startIndex) {
    return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
  }
  getUniqueAlt(configs) {
    let alt = ATN.INVALID_ALT_NUMBER;
    for (let i = 0; i < configs.items.length; i++) {
      const c = configs.items[i];
      if (alt === ATN.INVALID_ALT_NUMBER) {
        alt = c.alt;
      } else if (c.alt !== alt) {
        return ATN.INVALID_ALT_NUMBER;
      }
    }
    return alt;
  }
  addDFAEdge(dfa, from_, t, to) {
    if (this.debug) {
      console.log("EDGE " + from_ + " -> " + to + " upon " + this.getTokenName(t));
    }
    if (to === null) {
      return null;
    }
    to = this.addDFAState(dfa, to);
    if (from_ === null || t < -1 || t > this.atn.maxTokenType) {
      return to;
    }
    if (from_.edges === null) {
      from_.edges = [];
    }
    from_.edges[t + 1] = to;
    if (this.debug) {
      const literalNames = this.parser === null ? null : this.parser.literalNames;
      const symbolicNames = this.parser === null ? null : this.parser.symbolicNames;
      console.log("DFA=\n" + dfa.toString(literalNames, symbolicNames));
    }
    return to;
  }
  addDFAState(dfa, D) {
    if (D === ATNSimulator.ERROR) {
      return D;
    }
    const existing = dfa.states.get(D);
    if (existing !== null) {
      return existing;
    }
    D.stateNumber = dfa.states.length;
    if (!D.configs.readOnly) {
      D.configs.optimizeConfigs(this);
      D.configs.setReadonly(true);
    }
    dfa.states.add(D);
    if (this.debug) {
      console.log("adding new DFA state: " + D);
    }
    return D;
  }
  reportAttemptingFullContext(dfa, conflictingAlts, configs, startIndex, stopIndex) {
    if (this.debug || this.retry_debug) {
      const interval = new Interval(startIndex, stopIndex + 1);
      console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
    }
    if (this.parser !== null) {
      this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
    }
  }
  reportContextSensitivity(dfa, prediction, configs, startIndex, stopIndex) {
    if (this.debug || this.retry_debug) {
      const interval = new Interval(startIndex, stopIndex + 1);
      console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
    }
    if (this.parser !== null) {
      this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
    }
  }
  reportAmbiguity(dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
    if (this.debug || this.retry_debug) {
      const interval = new Interval(startIndex, stopIndex + 1);
      console.log("reportAmbiguity " + ambigAlts + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
    }
    if (this.parser !== null) {
      this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
    }
  }
};

// node_modules/antlr4/src/antlr4/atn/index.js
var atn_default = { ATN, ATNDeserializer, LexerATNSimulator, ParserATNSimulator, PredictionMode: PredictionMode_default };

// node_modules/antlr4/src/antlr4/dfa/DFASerializer.js
var DFASerializer = class {
  constructor(dfa, literalNames, symbolicNames) {
    this.dfa = dfa;
    this.literalNames = literalNames || [];
    this.symbolicNames = symbolicNames || [];
  }
  toString() {
    if (this.dfa.s0 === null) {
      return null;
    }
    let buf = "";
    const states = this.dfa.sortedStates();
    for (let i = 0; i < states.length; i++) {
      const s = states[i];
      if (s.edges !== null) {
        const n = s.edges.length;
        for (let j = 0; j < n; j++) {
          const t = s.edges[j] || null;
          if (t !== null && t.stateNumber !== 2147483647) {
            buf = buf.concat(this.getStateString(s));
            buf = buf.concat("-");
            buf = buf.concat(this.getEdgeLabel(j));
            buf = buf.concat("->");
            buf = buf.concat(this.getStateString(t));
            buf = buf.concat("\n");
          }
        }
      }
    }
    return buf.length === 0 ? null : buf;
  }
  getEdgeLabel(i) {
    if (i === 0) {
      return "EOF";
    } else if (this.literalNames !== null || this.symbolicNames !== null) {
      return this.literalNames[i - 1] || this.symbolicNames[i - 1];
    } else {
      return String.fromCharCode(i - 1);
    }
  }
  getStateString(s) {
    const baseStateStr = (s.isAcceptState ? ":" : "") + "s" + s.stateNumber + (s.requiresFullContext ? "^" : "");
    if (s.isAcceptState) {
      if (s.predicates !== null) {
        return baseStateStr + "=>" + arrayToString(s.predicates);
      } else {
        return baseStateStr + "=>" + s.prediction.toString();
      }
    } else {
      return baseStateStr;
    }
  }
};

// node_modules/antlr4/src/antlr4/dfa/LexerDFASerializer.js
var LexerDFASerializer = class extends DFASerializer {
  constructor(dfa) {
    super(dfa, null);
  }
  getEdgeLabel(i) {
    return "'" + String.fromCharCode(i) + "'";
  }
};

// node_modules/antlr4/src/antlr4/dfa/DFA.js
var DFA = class {
  constructor(atnStartState, decision) {
    if (decision === void 0) {
      decision = 0;
    }
    this.atnStartState = atnStartState;
    this.decision = decision;
    this._states = new HashSet();
    this.s0 = null;
    this.precedenceDfa = false;
    if (atnStartState instanceof StarLoopEntryState) {
      if (atnStartState.isPrecedenceDecision) {
        this.precedenceDfa = true;
        const precedenceState = new DFAState(null, new ATNConfigSet());
        precedenceState.edges = [];
        precedenceState.isAcceptState = false;
        precedenceState.requiresFullContext = false;
        this.s0 = precedenceState;
      }
    }
  }
  getPrecedenceStartState(precedence) {
    if (!this.precedenceDfa) {
      throw "Only precedence DFAs may contain a precedence start state.";
    }
    if (precedence < 0 || precedence >= this.s0.edges.length) {
      return null;
    }
    return this.s0.edges[precedence] || null;
  }
  setPrecedenceStartState(precedence, startState) {
    if (!this.precedenceDfa) {
      throw "Only precedence DFAs may contain a precedence start state.";
    }
    if (precedence < 0) {
      return;
    }
    this.s0.edges[precedence] = startState;
  }
  setPrecedenceDfa(precedenceDfa) {
    if (this.precedenceDfa !== precedenceDfa) {
      this._states = new HashSet();
      if (precedenceDfa) {
        const precedenceState = new DFAState(null, new ATNConfigSet());
        precedenceState.edges = [];
        precedenceState.isAcceptState = false;
        precedenceState.requiresFullContext = false;
        this.s0 = precedenceState;
      } else {
        this.s0 = null;
      }
      this.precedenceDfa = precedenceDfa;
    }
  }
  sortedStates() {
    const list = this._states.values();
    return list.sort(function(a, b) {
      return a.stateNumber - b.stateNumber;
    });
  }
  toString(literalNames, symbolicNames) {
    literalNames = literalNames || null;
    symbolicNames = symbolicNames || null;
    if (this.s0 === null) {
      return "";
    }
    const serializer = new DFASerializer(this, literalNames, symbolicNames);
    return serializer.toString();
  }
  toLexerString() {
    if (this.s0 === null) {
      return "";
    }
    const serializer = new LexerDFASerializer(this);
    return serializer.toString();
  }
  get states() {
    return this._states;
  }
};

// node_modules/antlr4/src/antlr4/dfa/index.js
var dfa_default = { DFA, DFASerializer, LexerDFASerializer, PredPrediction };

// node_modules/antlr4/src/antlr4/tree/ParseTreeListener.js
var ParseTreeListener = class {
  visitTerminal(node) {
  }
  visitErrorNode(node) {
  }
  enterEveryRule(node) {
  }
  exitEveryRule(node) {
  }
};

// node_modules/antlr4/src/antlr4/tree/ParseTreeVisitor.js
var ParseTreeVisitor = class {
  visit(ctx) {
    if (Array.isArray(ctx)) {
      return ctx.map(function(child) {
        return child.accept(this);
      }, this);
    } else {
      return ctx.accept(this);
    }
  }
  visitChildren(ctx) {
    if (ctx.children) {
      return this.visit(ctx.children);
    } else {
      return null;
    }
  }
  visitTerminal(node) {
  }
  visitErrorNode(node) {
  }
};

// node_modules/antlr4/src/antlr4/tree/ParseTreeWalker.js
var ParseTreeWalker = class {
  walk(listener, t) {
    const errorNode = t instanceof ErrorNode || t.isErrorNode !== void 0 && t.isErrorNode();
    if (errorNode) {
      listener.visitErrorNode(t);
    } else if (t instanceof TerminalNode) {
      listener.visitTerminal(t);
    } else {
      this.enterRule(listener, t);
      for (let i = 0; i < t.getChildCount(); i++) {
        const child = t.getChild(i);
        this.walk(listener, child);
      }
      this.exitRule(listener, t);
    }
  }
  enterRule(listener, r) {
    const ctx = r.getRuleContext();
    listener.enterEveryRule(ctx);
    ctx.enterRule(listener);
  }
  exitRule(listener, r) {
    const ctx = r.getRuleContext();
    ctx.exitRule(listener);
    listener.exitEveryRule(ctx);
  }
};
ParseTreeWalker.DEFAULT = new ParseTreeWalker();

// node_modules/antlr4/src/antlr4/tree/index.js
var tree_default = { Trees: Trees_default, RuleNode, ErrorNode, TerminalNode, ParseTreeListener, ParseTreeVisitor, ParseTreeWalker };

// node_modules/antlr4/src/antlr4/error/InputMismatchException.js
var InputMismatchException = class extends RecognitionException {
  constructor(recognizer) {
    super({ message: "", recognizer, input: recognizer.getInputStream(), ctx: recognizer._ctx });
    this.offendingToken = recognizer.getCurrentToken();
  }
};

// node_modules/antlr4/src/antlr4/error/FailedPredicateException.js
var FailedPredicateException = class extends RecognitionException {
  constructor(recognizer, predicate, message) {
    super({
      message: formatMessage(predicate, message || null),
      recognizer,
      input: recognizer.getInputStream(),
      ctx: recognizer._ctx
    });
    const s = recognizer._interp.atn.states[recognizer.state];
    const trans = s.transitions[0];
    if (trans instanceof PredicateTransition) {
      this.ruleIndex = trans.ruleIndex;
      this.predicateIndex = trans.predIndex;
    } else {
      this.ruleIndex = 0;
      this.predicateIndex = 0;
    }
    this.predicate = predicate;
    this.offendingToken = recognizer.getCurrentToken();
  }
};
function formatMessage(predicate, message) {
  if (message !== null) {
    return message;
  } else {
    return "failed predicate: {" + predicate + "}?";
  }
}

// node_modules/antlr4/src/antlr4/error/DiagnosticErrorListener.js
var DiagnosticErrorListener = class extends ErrorListener {
  constructor(exactOnly) {
    super();
    exactOnly = exactOnly || true;
    this.exactOnly = exactOnly;
  }
  reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
    if (this.exactOnly && !exact) {
      return;
    }
    const msg = "reportAmbiguity d=" + this.getDecisionDescription(recognizer, dfa) + ": ambigAlts=" + this.getConflictingAlts(ambigAlts, configs) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
    recognizer.notifyErrorListeners(msg);
  }
  reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
    const msg = "reportAttemptingFullContext d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
    recognizer.notifyErrorListeners(msg);
  }
  reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
    const msg = "reportContextSensitivity d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
    recognizer.notifyErrorListeners(msg);
  }
  getDecisionDescription(recognizer, dfa) {
    const decision = dfa.decision;
    const ruleIndex = dfa.atnStartState.ruleIndex;
    const ruleNames = recognizer.ruleNames;
    if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
      return "" + decision;
    }
    const ruleName = ruleNames[ruleIndex] || null;
    if (ruleName === null || ruleName.length === 0) {
      return "" + decision;
    }
    return `${decision} (${ruleName})`;
  }
  getConflictingAlts(reportedAlts, configs) {
    if (reportedAlts !== null) {
      return reportedAlts;
    }
    const result = new BitSet();
    for (let i = 0; i < configs.items.length; i++) {
      result.add(configs.items[i].alt);
    }
    return `{${result.values().join(", ")}}`;
  }
};

// node_modules/antlr4/src/antlr4/error/ParseCancellationException.js
var ParseCancellationException = class extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, ParseCancellationException);
  }
};

// node_modules/antlr4/src/antlr4/error/ErrorStrategy.js
var ErrorStrategy = class {
  reset(recognizer) {
  }
  recoverInline(recognizer) {
  }
  recover(recognizer, e) {
  }
  sync(recognizer) {
  }
  inErrorRecoveryMode(recognizer) {
  }
  reportError(recognizer) {
  }
};

// node_modules/antlr4/src/antlr4/error/DefaultErrorStrategy.js
var DefaultErrorStrategy = class extends ErrorStrategy {
  constructor() {
    super();
    this.errorRecoveryMode = false;
    this.lastErrorIndex = -1;
    this.lastErrorStates = null;
    this.nextTokensContext = null;
    this.nextTokenState = 0;
  }
  reset(recognizer) {
    this.endErrorCondition(recognizer);
  }
  beginErrorCondition(recognizer) {
    this.errorRecoveryMode = true;
  }
  inErrorRecoveryMode(recognizer) {
    return this.errorRecoveryMode;
  }
  endErrorCondition(recognizer) {
    this.errorRecoveryMode = false;
    this.lastErrorStates = null;
    this.lastErrorIndex = -1;
  }
  reportMatch(recognizer) {
    this.endErrorCondition(recognizer);
  }
  reportError(recognizer, e) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    this.beginErrorCondition(recognizer);
    if (e instanceof NoViableAltException) {
      this.reportNoViableAlternative(recognizer, e);
    } else if (e instanceof InputMismatchException) {
      this.reportInputMismatch(recognizer, e);
    } else if (e instanceof FailedPredicateException) {
      this.reportFailedPredicate(recognizer, e);
    } else {
      console.log("unknown recognition error type: " + e.constructor.name);
      console.log(e.stack);
      recognizer.notifyErrorListeners(e.getOffendingToken(), e.getMessage(), e);
    }
  }
  recover(recognizer, e) {
    if (this.lastErrorIndex === recognizer.getInputStream().index && this.lastErrorStates !== null && this.lastErrorStates.indexOf(recognizer.state) >= 0) {
      recognizer.consume();
    }
    this.lastErrorIndex = recognizer._input.index;
    if (this.lastErrorStates === null) {
      this.lastErrorStates = [];
    }
    this.lastErrorStates.push(recognizer.state);
    const followSet = this.getErrorRecoverySet(recognizer);
    this.consumeUntil(recognizer, followSet);
  }
  sync(recognizer) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    const s = recognizer._interp.atn.states[recognizer.state];
    const la = recognizer.getTokenStream().LA(1);
    const nextTokens = recognizer.atn.nextTokens(s);
    if (nextTokens.contains(la)) {
      this.nextTokensContext = null;
      this.nextTokenState = ATNState.INVALID_STATE_NUMBER;
      return;
    } else if (nextTokens.contains(Token.EPSILON)) {
      if (this.nextTokensContext === null) {
        this.nextTokensContext = recognizer._ctx;
        this.nextTokensState = recognizer._stateNumber;
      }
      return;
    }
    switch (s.stateType) {
      case ATNState.BLOCK_START:
      case ATNState.STAR_BLOCK_START:
      case ATNState.PLUS_BLOCK_START:
      case ATNState.STAR_LOOP_ENTRY:
        if (this.singleTokenDeletion(recognizer) !== null) {
          return;
        } else {
          throw new InputMismatchException(recognizer);
        }
      case ATNState.PLUS_LOOP_BACK:
      case ATNState.STAR_LOOP_BACK:
        {
          this.reportUnwantedToken(recognizer);
          const expecting = new IntervalSet();
          expecting.addSet(recognizer.getExpectedTokens());
          const whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer));
          this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
        }
        break;
      default:
    }
  }
  reportNoViableAlternative(recognizer, e) {
    const tokens = recognizer.getTokenStream();
    let input;
    if (tokens !== null) {
      if (e.startToken.type === Token.EOF) {
        input = "<EOF>";
      } else {
        input = tokens.getText(new Interval(e.startToken.tokenIndex, e.offendingToken.tokenIndex));
      }
    } else {
      input = "<unknown input>";
    }
    const msg = "no viable alternative at input " + this.escapeWSAndQuote(input);
    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
  }
  reportInputMismatch(recognizer, e) {
    const msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) + " expecting " + e.getExpectedTokens().toString(recognizer.literalNames, recognizer.symbolicNames);
    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
  }
  reportFailedPredicate(recognizer, e) {
    const ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex];
    const msg = "rule " + ruleName + " " + e.message;
    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
  }
  reportUnwantedToken(recognizer) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    this.beginErrorCondition(recognizer);
    const t = recognizer.getCurrentToken();
    const tokenName = this.getTokenErrorDisplay(t);
    const expecting = this.getExpectedTokens(recognizer);
    const msg = "extraneous input " + tokenName + " expecting " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames);
    recognizer.notifyErrorListeners(msg, t, null);
  }
  reportMissingToken(recognizer) {
    if (this.inErrorRecoveryMode(recognizer)) {
      return;
    }
    this.beginErrorCondition(recognizer);
    const t = recognizer.getCurrentToken();
    const expecting = this.getExpectedTokens(recognizer);
    const msg = "missing " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames) + " at " + this.getTokenErrorDisplay(t);
    recognizer.notifyErrorListeners(msg, t, null);
  }
  recoverInline(recognizer) {
    const matchedSymbol = this.singleTokenDeletion(recognizer);
    if (matchedSymbol !== null) {
      recognizer.consume();
      return matchedSymbol;
    }
    if (this.singleTokenInsertion(recognizer)) {
      return this.getMissingSymbol(recognizer);
    }
    throw new InputMismatchException(recognizer);
  }
  singleTokenInsertion(recognizer) {
    const currentSymbolType = recognizer.getTokenStream().LA(1);
    const atn3 = recognizer._interp.atn;
    const currentState = atn3.states[recognizer.state];
    const next = currentState.transitions[0].target;
    const expectingAtLL2 = atn3.nextTokens(next, recognizer._ctx);
    if (expectingAtLL2.contains(currentSymbolType)) {
      this.reportMissingToken(recognizer);
      return true;
    } else {
      return false;
    }
  }
  singleTokenDeletion(recognizer) {
    const nextTokenType = recognizer.getTokenStream().LA(2);
    const expecting = this.getExpectedTokens(recognizer);
    if (expecting.contains(nextTokenType)) {
      this.reportUnwantedToken(recognizer);
      recognizer.consume();
      const matchedSymbol = recognizer.getCurrentToken();
      this.reportMatch(recognizer);
      return matchedSymbol;
    } else {
      return null;
    }
  }
  getMissingSymbol(recognizer) {
    const currentSymbol = recognizer.getCurrentToken();
    const expecting = this.getExpectedTokens(recognizer);
    const expectedTokenType = expecting.first();
    let tokenText;
    if (expectedTokenType === Token.EOF) {
      tokenText = "<missing EOF>";
    } else {
      tokenText = "<missing " + recognizer.literalNames[expectedTokenType] + ">";
    }
    let current = currentSymbol;
    const lookback = recognizer.getTokenStream().LT(-1);
    if (current.type === Token.EOF && lookback !== null) {
      current = lookback;
    }
    return recognizer.getTokenFactory().create(
      current.source,
      expectedTokenType,
      tokenText,
      Token.DEFAULT_CHANNEL,
      -1,
      -1,
      current.line,
      current.column
    );
  }
  getExpectedTokens(recognizer) {
    return recognizer.getExpectedTokens();
  }
  getTokenErrorDisplay(t) {
    if (t === null) {
      return "<no token>";
    }
    let s = t.text;
    if (s === null) {
      if (t.type === Token.EOF) {
        s = "<EOF>";
      } else {
        s = "<" + t.type + ">";
      }
    }
    return this.escapeWSAndQuote(s);
  }
  escapeWSAndQuote(s) {
    s = s.replace(/\n/g, "\\n");
    s = s.replace(/\r/g, "\\r");
    s = s.replace(/\t/g, "\\t");
    return "'" + s + "'";
  }
  getErrorRecoverySet(recognizer) {
    const atn3 = recognizer._interp.atn;
    let ctx = recognizer._ctx;
    const recoverSet = new IntervalSet();
    while (ctx !== null && ctx.invokingState >= 0) {
      const invokingState = atn3.states[ctx.invokingState];
      const rt = invokingState.transitions[0];
      const follow = atn3.nextTokens(rt.followState);
      recoverSet.addSet(follow);
      ctx = ctx.parentCtx;
    }
    recoverSet.removeOne(Token.EPSILON);
    return recoverSet;
  }
  consumeUntil(recognizer, set) {
    let ttype = recognizer.getTokenStream().LA(1);
    while (ttype !== Token.EOF && !set.contains(ttype)) {
      recognizer.consume();
      ttype = recognizer.getTokenStream().LA(1);
    }
  }
};

// node_modules/antlr4/src/antlr4/error/BailErrorStrategy.js
var BailErrorStrategy = class extends DefaultErrorStrategy {
  constructor() {
    super();
  }
  recover(recognizer, e) {
    let context = recognizer._ctx;
    while (context !== null) {
      context.exception = e;
      context = context.parentCtx;
    }
    throw new ParseCancellationException(e);
  }
  recoverInline(recognizer) {
    this.recover(recognizer, new InputMismatchException(recognizer));
  }
  sync(recognizer) {
  }
};

// node_modules/antlr4/src/antlr4/error/index.js
var error_default = {
  RecognitionException,
  NoViableAltException,
  LexerNoViableAltException,
  InputMismatchException,
  FailedPredicateException,
  DiagnosticErrorListener,
  BailErrorStrategy,
  DefaultErrorStrategy,
  ErrorListener
};

// node_modules/antlr4/src/antlr4/InputStream.js
var InputStream = class {
  constructor(data, decodeToUnicodeCodePoints) {
    this.name = "<empty>";
    this.strdata = data;
    this.decodeToUnicodeCodePoints = decodeToUnicodeCodePoints || false;
    this._index = 0;
    this.data = [];
    if (this.decodeToUnicodeCodePoints) {
      for (let i = 0; i < this.strdata.length; ) {
        const codePoint = this.strdata.codePointAt(i);
        this.data.push(codePoint);
        i += codePoint <= 65535 ? 1 : 2;
      }
    } else {
      this.data = new Array(this.strdata.length);
      for (let i = 0; i < this.strdata.length; i++) {
        const codeUnit = this.strdata.charCodeAt(i);
        this.data[i] = codeUnit;
      }
    }
    this._size = this.data.length;
  }
  reset() {
    this._index = 0;
  }
  consume() {
    if (this._index >= this._size) {
      throw "cannot consume EOF";
    }
    this._index += 1;
  }
  LA(offset) {
    if (offset === 0) {
      return 0;
    }
    if (offset < 0) {
      offset += 1;
    }
    const pos = this._index + offset - 1;
    if (pos < 0 || pos >= this._size) {
      return Token.EOF;
    }
    return this.data[pos];
  }
  LT(offset) {
    return this.LA(offset);
  }
  mark() {
    return -1;
  }
  release(marker) {
  }
  seek(_index) {
    if (_index <= this._index) {
      this._index = _index;
      return;
    }
    this._index = Math.min(_index, this._size);
  }
  getText(start, stop) {
    if (stop >= this._size) {
      stop = this._size - 1;
    }
    if (start >= this._size) {
      return "";
    } else {
      if (this.decodeToUnicodeCodePoints) {
        let result = "";
        for (let i = start; i <= stop; i++) {
          result += String.fromCodePoint(this.data[i]);
        }
        return result;
      } else {
        return this.strdata.slice(start, stop + 1);
      }
    }
  }
  toString() {
    return this.strdata;
  }
  get index() {
    return this._index;
  }
  get size() {
    return this._size;
  }
};

// node_modules/antlr4/src/antlr4/CharStreams.js
var import_fs = __toESM(require_fs(), 1);
var CharStreams_default = {
  fromString: function(str) {
    return new InputStream(str, true);
  },
  fromBlob: function(blob, encoding, onLoad, onError) {
    const reader = new window.FileReader();
    reader.onload = function(e) {
      const is = new InputStream(e.target.result, true);
      onLoad(is);
    };
    reader.onerror = onError;
    reader.readAsText(blob, encoding);
  },
  fromBuffer: function(buffer, encoding) {
    return new InputStream(buffer.toString(encoding), true);
  },
  fromPath: function(path, encoding, callback) {
    import_fs.default.readFile(path, encoding, function(err, data) {
      let is = null;
      if (data !== null) {
        is = new InputStream(data, true);
      }
      callback(err, is);
    });
  },
  fromPathSync: function(path, encoding) {
    const data = import_fs.default.readFileSync(path, encoding);
    return new InputStream(data, true);
  }
};

// node_modules/antlr4/src/antlr4/FileStream.js
var import_fs2 = __toESM(require_fs(), 1);
var FileStream = class extends InputStream {
  constructor(fileName, decodeToUnicodeCodePoints) {
    const data = import_fs2.default.readFileSync(fileName, "utf8");
    super(data, decodeToUnicodeCodePoints);
    this.fileName = fileName;
  }
};

// node_modules/antlr4/src/antlr4/TokenStream.js
var TokenStream = class {
};

// node_modules/antlr4/src/antlr4/BufferedTokenStream.js
var BufferedTokenStream = class extends TokenStream {
  constructor(tokenSource) {
    super();
    this.tokenSource = tokenSource;
    this.tokens = [];
    this.index = -1;
    this.fetchedEOF = false;
  }
  mark() {
    return 0;
  }
  release(marker) {
  }
  reset() {
    this.seek(0);
  }
  seek(index) {
    this.lazyInit();
    this.index = this.adjustSeekIndex(index);
  }
  get(index) {
    this.lazyInit();
    return this.tokens[index];
  }
  consume() {
    let skipEofCheck = false;
    if (this.index >= 0) {
      if (this.fetchedEOF) {
        skipEofCheck = this.index < this.tokens.length - 1;
      } else {
        skipEofCheck = this.index < this.tokens.length;
      }
    } else {
      skipEofCheck = false;
    }
    if (!skipEofCheck && this.LA(1) === Token.EOF) {
      throw "cannot consume EOF";
    }
    if (this.sync(this.index + 1)) {
      this.index = this.adjustSeekIndex(this.index + 1);
    }
  }
  sync(i) {
    const n = i - this.tokens.length + 1;
    if (n > 0) {
      const fetched = this.fetch(n);
      return fetched >= n;
    }
    return true;
  }
  fetch(n) {
    if (this.fetchedEOF) {
      return 0;
    }
    for (let i = 0; i < n; i++) {
      const t = this.tokenSource.nextToken();
      t.tokenIndex = this.tokens.length;
      this.tokens.push(t);
      if (t.type === Token.EOF) {
        this.fetchedEOF = true;
        return i + 1;
      }
    }
    return n;
  }
  getTokens(start, stop, types) {
    if (types === void 0) {
      types = null;
    }
    if (start < 0 || stop < 0) {
      return null;
    }
    this.lazyInit();
    const subset = [];
    if (stop >= this.tokens.length) {
      stop = this.tokens.length - 1;
    }
    for (let i = start; i < stop; i++) {
      const t = this.tokens[i];
      if (t.type === Token.EOF) {
        break;
      }
      if (types === null || types.contains(t.type)) {
        subset.push(t);
      }
    }
    return subset;
  }
  LA(i) {
    return this.LT(i).type;
  }
  LB(k) {
    if (this.index - k < 0) {
      return null;
    }
    return this.tokens[this.index - k];
  }
  LT(k) {
    this.lazyInit();
    if (k === 0) {
      return null;
    }
    if (k < 0) {
      return this.LB(-k);
    }
    const i = this.index + k - 1;
    this.sync(i);
    if (i >= this.tokens.length) {
      return this.tokens[this.tokens.length - 1];
    }
    return this.tokens[i];
  }
  adjustSeekIndex(i) {
    return i;
  }
  lazyInit() {
    if (this.index === -1) {
      this.setup();
    }
  }
  setup() {
    this.sync(0);
    this.index = this.adjustSeekIndex(0);
  }
  setTokenSource(tokenSource) {
    this.tokenSource = tokenSource;
    this.tokens = [];
    this.index = -1;
    this.fetchedEOF = false;
  }
  nextTokenOnChannel(i, channel) {
    this.sync(i);
    if (i >= this.tokens.length) {
      return -1;
    }
    let token = this.tokens[i];
    while (token.channel !== this.channel) {
      if (token.type === Token.EOF) {
        return -1;
      }
      i += 1;
      this.sync(i);
      token = this.tokens[i];
    }
    return i;
  }
  previousTokenOnChannel(i, channel) {
    while (i >= 0 && this.tokens[i].channel !== channel) {
      i -= 1;
    }
    return i;
  }
  getHiddenTokensToRight(tokenIndex, channel) {
    if (channel === void 0) {
      channel = -1;
    }
    this.lazyInit();
    if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
      throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
    }
    const nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
    const from_ = tokenIndex + 1;
    const to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
    return this.filterForChannel(from_, to, channel);
  }
  getHiddenTokensToLeft(tokenIndex, channel) {
    if (channel === void 0) {
      channel = -1;
    }
    this.lazyInit();
    if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
      throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
    }
    const prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);
    if (prevOnChannel === tokenIndex - 1) {
      return null;
    }
    const from_ = prevOnChannel + 1;
    const to = tokenIndex - 1;
    return this.filterForChannel(from_, to, channel);
  }
  filterForChannel(left, right, channel) {
    const hidden = [];
    for (let i = left; i < right + 1; i++) {
      const t = this.tokens[i];
      if (channel === -1) {
        if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) {
          hidden.push(t);
        }
      } else if (t.channel === channel) {
        hidden.push(t);
      }
    }
    if (hidden.length === 0) {
      return null;
    }
    return hidden;
  }
  getSourceName() {
    return this.tokenSource.getSourceName();
  }
  getText(interval) {
    this.lazyInit();
    this.fill();
    if (interval === void 0 || interval === null) {
      interval = new Interval(0, this.tokens.length - 1);
    }
    let start = interval.start;
    if (start instanceof Token) {
      start = start.tokenIndex;
    }
    let stop = interval.stop;
    if (stop instanceof Token) {
      stop = stop.tokenIndex;
    }
    if (start === null || stop === null || start < 0 || stop < 0) {
      return "";
    }
    if (stop >= this.tokens.length) {
      stop = this.tokens.length - 1;
    }
    let s = "";
    for (let i = start; i < stop + 1; i++) {
      const t = this.tokens[i];
      if (t.type === Token.EOF) {
        break;
      }
      s = s + t.text;
    }
    return s;
  }
  fill() {
    this.lazyInit();
    while (this.fetch(1e3) === 1e3) {
      continue;
    }
  }
};

// node_modules/antlr4/src/antlr4/CommonTokenStream.js
var CommonTokenStream = class extends BufferedTokenStream {
  constructor(lexer, channel) {
    super(lexer);
    this.channel = channel === void 0 ? Token.DEFAULT_CHANNEL : channel;
  }
  adjustSeekIndex(i) {
    return this.nextTokenOnChannel(i, this.channel);
  }
  LB(k) {
    if (k === 0 || this.index - k < 0) {
      return null;
    }
    let i = this.index;
    let n = 1;
    while (n <= k) {
      i = this.previousTokenOnChannel(i - 1, this.channel);
      n += 1;
    }
    if (i < 0) {
      return null;
    }
    return this.tokens[i];
  }
  LT(k) {
    this.lazyInit();
    if (k === 0) {
      return null;
    }
    if (k < 0) {
      return this.LB(-k);
    }
    let i = this.index;
    let n = 1;
    while (n < k) {
      if (this.sync(i + 1)) {
        i = this.nextTokenOnChannel(i + 1, this.channel);
      }
      n += 1;
    }
    return this.tokens[i];
  }
  getNumberOfOnChannelTokens() {
    let n = 0;
    this.fill();
    for (let i = 0; i < this.tokens.length; i++) {
      const t = this.tokens[i];
      if (t.channel === this.channel) {
        n += 1;
      }
      if (t.type === Token.EOF) {
        break;
      }
    }
    return n;
  }
};

// node_modules/antlr4/src/antlr4/TraceListener.js
var TraceListener = class extends ParseTreeListener {
  constructor(parser) {
    super();
    this.parser = parser;
  }
  enterEveryRule(ctx) {
    console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
  }
  visitTerminal(node) {
    console.log("consume " + node.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
  }
  exitEveryRule(ctx) {
    console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
  }
};

// node_modules/antlr4/src/antlr4/Parser.js
var Parser = class extends Recognizer {
  constructor(input) {
    super();
    this._input = null;
    this._errHandler = new DefaultErrorStrategy();
    this._precedenceStack = [];
    this._precedenceStack.push(0);
    this._ctx = null;
    this.buildParseTrees = true;
    this._tracer = null;
    this._parseListeners = null;
    this._syntaxErrors = 0;
    this.setInputStream(input);
  }
  reset() {
    if (this._input !== null) {
      this._input.seek(0);
    }
    this._errHandler.reset(this);
    this._ctx = null;
    this._syntaxErrors = 0;
    this.setTrace(false);
    this._precedenceStack = [];
    this._precedenceStack.push(0);
    if (this._interp !== null) {
      this._interp.reset();
    }
  }
  match(ttype) {
    let t = this.getCurrentToken();
    if (t.type === ttype) {
      this._errHandler.reportMatch(this);
      this.consume();
    } else {
      t = this._errHandler.recoverInline(this);
      if (this.buildParseTrees && t.tokenIndex === -1) {
        this._ctx.addErrorNode(t);
      }
    }
    return t;
  }
  matchWildcard() {
    let t = this.getCurrentToken();
    if (t.type > 0) {
      this._errHandler.reportMatch(this);
      this.consume();
    } else {
      t = this._errHandler.recoverInline(this);
      if (this._buildParseTrees && t.tokenIndex === -1) {
        this._ctx.addErrorNode(t);
      }
    }
    return t;
  }
  getParseListeners() {
    return this._parseListeners || [];
  }
  addParseListener(listener) {
    if (listener === null) {
      throw "listener";
    }
    if (this._parseListeners === null) {
      this._parseListeners = [];
    }
    this._parseListeners.push(listener);
  }
  removeParseListener(listener) {
    if (this._parseListeners !== null) {
      const idx = this._parseListeners.indexOf(listener);
      if (idx >= 0) {
        this._parseListeners.splice(idx, 1);
      }
      if (this._parseListeners.length === 0) {
        this._parseListeners = null;
      }
    }
  }
  removeParseListeners() {
    this._parseListeners = null;
  }
  triggerEnterRuleEvent() {
    if (this._parseListeners !== null) {
      const ctx = this._ctx;
      this._parseListeners.forEach(function(listener) {
        listener.enterEveryRule(ctx);
        ctx.enterRule(listener);
      });
    }
  }
  triggerExitRuleEvent() {
    if (this._parseListeners !== null) {
      const ctx = this._ctx;
      this._parseListeners.slice(0).reverse().forEach(function(listener) {
        ctx.exitRule(listener);
        listener.exitEveryRule(ctx);
      });
    }
  }
  getTokenFactory() {
    return this._input.tokenSource._factory;
  }
  setTokenFactory(factory) {
    this._input.tokenSource._factory = factory;
  }
  getATNWithBypassAlts() {
    const serializedAtn = this.getSerializedATN();
    if (serializedAtn === null) {
      throw "The current parser does not support an ATN with bypass alternatives.";
    }
    let result = this.bypassAltsAtnCache[serializedAtn];
    if (result === null) {
      const deserializationOptions = new ATNDeserializationOptions();
      deserializationOptions.generateRuleBypassTransitions = true;
      result = new ATNDeserializer(deserializationOptions).deserialize(serializedAtn);
      this.bypassAltsAtnCache[serializedAtn] = result;
    }
    return result;
  }
  getInputStream() {
    return this.getTokenStream();
  }
  setInputStream(input) {
    this.setTokenStream(input);
  }
  getTokenStream() {
    return this._input;
  }
  setTokenStream(input) {
    this._input = null;
    this.reset();
    this._input = input;
  }
  getCurrentToken() {
    return this._input.LT(1);
  }
  notifyErrorListeners(msg, offendingToken, err) {
    offendingToken = offendingToken || null;
    err = err || null;
    if (offendingToken === null) {
      offendingToken = this.getCurrentToken();
    }
    this._syntaxErrors += 1;
    const line = offendingToken.line;
    const column = offendingToken.column;
    const listener = this.getErrorListenerDispatch();
    listener.syntaxError(this, offendingToken, line, column, msg, err);
  }
  consume() {
    const o = this.getCurrentToken();
    if (o.type !== Token.EOF) {
      this.getInputStream().consume();
    }
    const hasListener = this._parseListeners !== null && this._parseListeners.length > 0;
    if (this.buildParseTrees || hasListener) {
      let node;
      if (this._errHandler.inErrorRecoveryMode(this)) {
        node = this._ctx.addErrorNode(o);
      } else {
        node = this._ctx.addTokenNode(o);
      }
      node.invokingState = this.state;
      if (hasListener) {
        this._parseListeners.forEach(function(listener) {
          if (node instanceof ErrorNode || node.isErrorNode !== void 0 && node.isErrorNode()) {
            listener.visitErrorNode(node);
          } else if (node instanceof TerminalNode) {
            listener.visitTerminal(node);
          }
        });
      }
    }
    return o;
  }
  addContextToParseTree() {
    if (this._ctx.parentCtx !== null) {
      this._ctx.parentCtx.addChild(this._ctx);
    }
  }
  enterRule(localctx, state, ruleIndex) {
    this.state = state;
    this._ctx = localctx;
    this._ctx.start = this._input.LT(1);
    if (this.buildParseTrees) {
      this.addContextToParseTree();
    }
    this.triggerEnterRuleEvent();
  }
  exitRule() {
    this._ctx.stop = this._input.LT(-1);
    this.triggerExitRuleEvent();
    this.state = this._ctx.invokingState;
    this._ctx = this._ctx.parentCtx;
  }
  enterOuterAlt(localctx, altNum) {
    localctx.setAltNumber(altNum);
    if (this.buildParseTrees && this._ctx !== localctx) {
      if (this._ctx.parentCtx !== null) {
        this._ctx.parentCtx.removeLastChild();
        this._ctx.parentCtx.addChild(localctx);
      }
    }
    this._ctx = localctx;
  }
  getPrecedence() {
    if (this._precedenceStack.length === 0) {
      return -1;
    } else {
      return this._precedenceStack[this._precedenceStack.length - 1];
    }
  }
  enterRecursionRule(localctx, state, ruleIndex, precedence) {
    this.state = state;
    this._precedenceStack.push(precedence);
    this._ctx = localctx;
    this._ctx.start = this._input.LT(1);
    this.triggerEnterRuleEvent();
  }
  pushNewRecursionContext(localctx, state, ruleIndex) {
    const previous = this._ctx;
    previous.parentCtx = localctx;
    previous.invokingState = state;
    previous.stop = this._input.LT(-1);
    this._ctx = localctx;
    this._ctx.start = previous.start;
    if (this.buildParseTrees) {
      this._ctx.addChild(previous);
    }
    this.triggerEnterRuleEvent();
  }
  unrollRecursionContexts(parentCtx) {
    this._precedenceStack.pop();
    this._ctx.stop = this._input.LT(-1);
    const retCtx = this._ctx;
    const parseListeners = this.getParseListeners();
    if (parseListeners !== null && parseListeners.length > 0) {
      while (this._ctx !== parentCtx) {
        this.triggerExitRuleEvent();
        this._ctx = this._ctx.parentCtx;
      }
    } else {
      this._ctx = parentCtx;
    }
    retCtx.parentCtx = parentCtx;
    if (this.buildParseTrees && parentCtx !== null) {
      parentCtx.addChild(retCtx);
    }
  }
  getInvokingContext(ruleIndex) {
    let ctx = this._ctx;
    while (ctx !== null) {
      if (ctx.ruleIndex === ruleIndex) {
        return ctx;
      }
      ctx = ctx.parentCtx;
    }
    return null;
  }
  precpred(localctx, precedence) {
    return precedence >= this._precedenceStack[this._precedenceStack.length - 1];
  }
  inContext(context) {
    return false;
  }
  isExpectedToken(symbol) {
    const atn3 = this._interp.atn;
    let ctx = this._ctx;
    const s = atn3.states[this.state];
    let following = atn3.nextTokens(s);
    if (following.contains(symbol)) {
      return true;
    }
    if (!following.contains(Token.EPSILON)) {
      return false;
    }
    while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
      const invokingState = atn3.states[ctx.invokingState];
      const rt = invokingState.transitions[0];
      following = atn3.nextTokens(rt.followState);
      if (following.contains(symbol)) {
        return true;
      }
      ctx = ctx.parentCtx;
    }
    if (following.contains(Token.EPSILON) && symbol === Token.EOF) {
      return true;
    } else {
      return false;
    }
  }
  getExpectedTokens() {
    return this._interp.atn.getExpectedTokens(this.state, this._ctx);
  }
  getExpectedTokensWithinCurrentRule() {
    const atn3 = this._interp.atn;
    const s = atn3.states[this.state];
    return atn3.nextTokens(s);
  }
  getRuleIndex(ruleName) {
    const ruleIndex = this.getRuleIndexMap()[ruleName];
    if (ruleIndex !== null) {
      return ruleIndex;
    } else {
      return -1;
    }
  }
  getRuleInvocationStack(p) {
    p = p || null;
    if (p === null) {
      p = this._ctx;
    }
    const stack = [];
    while (p !== null) {
      const ruleIndex = p.ruleIndex;
      if (ruleIndex < 0) {
        stack.push("n/a");
      } else {
        stack.push(this.ruleNames[ruleIndex]);
      }
      p = p.parentCtx;
    }
    return stack;
  }
  getDFAStrings() {
    return this._interp.decisionToDFA.toString();
  }
  dumpDFA() {
    let seenOne = false;
    for (let i = 0; i < this._interp.decisionToDFA.length; i++) {
      const dfa = this._interp.decisionToDFA[i];
      if (dfa.states.length > 0) {
        if (seenOne) {
          console.log();
        }
        this.printer.println("Decision " + dfa.decision + ":");
        this.printer.print(dfa.toString(this.literalNames, this.symbolicNames));
        seenOne = true;
      }
    }
  }
  getSourceName() {
    return this._input.sourceName;
  }
  setTrace(trace) {
    if (!trace) {
      this.removeParseListener(this._tracer);
      this._tracer = null;
    } else {
      if (this._tracer !== null) {
        this.removeParseListener(this._tracer);
      }
      this._tracer = new TraceListener(this);
      this.addParseListener(this._tracer);
    }
  }
};
Parser.bypassAltsAtnCache = {};

// node_modules/antlr4/src/antlr4/atn/PredictionContextCache.js
var PredictionContextCache = class {
  constructor() {
    this.cache = new HashMap();
  }
  add(ctx) {
    if (ctx === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY;
    }
    const existing = this.cache.get(ctx) || null;
    if (existing !== null) {
      return existing;
    }
    this.cache.set(ctx, ctx);
    return ctx;
  }
  get(ctx) {
    return this.cache.get(ctx) || null;
  }
  get length() {
    return this.cache.length;
  }
};

// node_modules/antlr4/src/antlr4/tree/TerminalNodeImpl.js
var TerminalNodeImpl = class extends TerminalNode {
  constructor(symbol) {
    super();
    this.parentCtx = null;
    this.symbol = symbol;
  }
  getChild(i) {
    return null;
  }
  getSymbol() {
    return this.symbol;
  }
  getParent() {
    return this.parentCtx;
  }
  getPayload() {
    return this.symbol;
  }
  getSourceInterval() {
    if (this.symbol === null) {
      return Interval.INVALID_INTERVAL;
    }
    const tokenIndex = this.symbol.tokenIndex;
    return new Interval(tokenIndex, tokenIndex);
  }
  getChildCount() {
    return 0;
  }
  accept(visitor) {
    return visitor.visitTerminal(this);
  }
  getText() {
    return this.symbol.text;
  }
  toString() {
    if (this.symbol.type === Token.EOF) {
      return "<EOF>";
    } else {
      return this.symbol.text;
    }
  }
};

// node_modules/antlr4/src/antlr4/tree/ErrorNodeImpl.js
var ErrorNodeImpl = class extends TerminalNodeImpl {
  constructor(token) {
    super(token);
  }
  isErrorNode() {
    return true;
  }
  accept(visitor) {
    return visitor.visitErrorNode(this);
  }
};

// node_modules/antlr4/src/antlr4/context/ParserRuleContext.js
var ParserRuleContext = class extends RuleContext {
  constructor(parent, invokingStateNumber) {
    parent = parent || null;
    invokingStateNumber = invokingStateNumber || null;
    super(parent, invokingStateNumber);
    this.ruleIndex = -1;
    this.children = null;
    this.start = null;
    this.stop = null;
    this.exception = null;
  }
  copyFrom(ctx) {
    this.parentCtx = ctx.parentCtx;
    this.invokingState = ctx.invokingState;
    this.children = null;
    this.start = ctx.start;
    this.stop = ctx.stop;
    if (ctx.children) {
      this.children = [];
      ctx.children.map(function(child) {
        if (child instanceof ErrorNodeImpl) {
          this.children.push(child);
          child.parentCtx = this;
        }
      }, this);
    }
  }
  enterRule(listener) {
  }
  exitRule(listener) {
  }
  addChild(child) {
    if (this.children === null) {
      this.children = [];
    }
    this.children.push(child);
    return child;
  }
  removeLastChild() {
    if (this.children !== null) {
      this.children.pop();
    }
  }
  addTokenNode(token) {
    const node = new TerminalNodeImpl(token);
    this.addChild(node);
    node.parentCtx = this;
    return node;
  }
  addErrorNode(badToken) {
    const node = new ErrorNodeImpl(badToken);
    this.addChild(node);
    node.parentCtx = this;
    return node;
  }
  getChild(i, type) {
    type = type || null;
    if (this.children === null || i < 0 || i >= this.children.length) {
      return null;
    }
    if (type === null) {
      return this.children[i];
    } else {
      for (let j = 0; j < this.children.length; j++) {
        const child = this.children[j];
        if (child instanceof type) {
          if (i === 0) {
            return child;
          } else {
            i -= 1;
          }
        }
      }
      return null;
    }
  }
  getToken(ttype, i) {
    if (this.children === null || i < 0 || i >= this.children.length) {
      return null;
    }
    for (let j = 0; j < this.children.length; j++) {
      const child = this.children[j];
      if (child instanceof TerminalNode) {
        if (child.symbol.type === ttype) {
          if (i === 0) {
            return child;
          } else {
            i -= 1;
          }
        }
      }
    }
    return null;
  }
  getTokens(ttype) {
    if (this.children === null) {
      return [];
    } else {
      const tokens = [];
      for (let j = 0; j < this.children.length; j++) {
        const child = this.children[j];
        if (child instanceof TerminalNode) {
          if (child.symbol.type === ttype) {
            tokens.push(child);
          }
        }
      }
      return tokens;
    }
  }
  getTypedRuleContext(ctxType, i) {
    return this.getChild(i, ctxType);
  }
  getTypedRuleContexts(ctxType) {
    if (this.children === null) {
      return [];
    } else {
      const contexts = [];
      for (let j = 0; j < this.children.length; j++) {
        const child = this.children[j];
        if (child instanceof ctxType) {
          contexts.push(child);
        }
      }
      return contexts;
    }
  }
  getChildCount() {
    if (this.children === null) {
      return 0;
    } else {
      return this.children.length;
    }
  }
  getSourceInterval() {
    if (this.start === null || this.stop === null) {
      return Interval.INVALID_INTERVAL;
    } else {
      return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
    }
  }
};
RuleContext.EMPTY = new ParserRuleContext();

// node_modules/antlr4/src/antlr4/utils/index.js
var utils_default = { arrayToString };

// node_modules/antlr4/src/antlr4/index.js
var antlr4 = {
  atn: atn_default,
  dfa: dfa_default,
  tree: tree_default,
  error: error_default,
  Token,
  CommonToken,
  CharStreams: CharStreams_default,
  InputStream,
  FileStream,
  CommonTokenStream,
  Lexer,
  Parser,
  PredictionContextCache,
  ParserRuleContext,
  Interval,
  IntervalSet,
  LL1Analyzer,
  Utils: utils_default
};
var antlr4_default = antlr4;

// src/libs/PseudoCodeLexer.js
var serializedATN = [
  4,
  0,
  46,
  415,
  6,
  -1,
  2,
  0,
  7,
  0,
  2,
  1,
  7,
  1,
  2,
  2,
  7,
  2,
  2,
  3,
  7,
  3,
  2,
  4,
  7,
  4,
  2,
  5,
  7,
  5,
  2,
  6,
  7,
  6,
  2,
  7,
  7,
  7,
  2,
  8,
  7,
  8,
  2,
  9,
  7,
  9,
  2,
  10,
  7,
  10,
  2,
  11,
  7,
  11,
  2,
  12,
  7,
  12,
  2,
  13,
  7,
  13,
  2,
  14,
  7,
  14,
  2,
  15,
  7,
  15,
  2,
  16,
  7,
  16,
  2,
  17,
  7,
  17,
  2,
  18,
  7,
  18,
  2,
  19,
  7,
  19,
  2,
  20,
  7,
  20,
  2,
  21,
  7,
  21,
  2,
  22,
  7,
  22,
  2,
  23,
  7,
  23,
  2,
  24,
  7,
  24,
  2,
  25,
  7,
  25,
  2,
  26,
  7,
  26,
  2,
  27,
  7,
  27,
  2,
  28,
  7,
  28,
  2,
  29,
  7,
  29,
  2,
  30,
  7,
  30,
  2,
  31,
  7,
  31,
  2,
  32,
  7,
  32,
  2,
  33,
  7,
  33,
  2,
  34,
  7,
  34,
  2,
  35,
  7,
  35,
  2,
  36,
  7,
  36,
  2,
  37,
  7,
  37,
  2,
  38,
  7,
  38,
  2,
  39,
  7,
  39,
  2,
  40,
  7,
  40,
  2,
  41,
  7,
  41,
  2,
  42,
  7,
  42,
  2,
  43,
  7,
  43,
  2,
  44,
  7,
  44,
  2,
  45,
  7,
  45,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  3,
  1,
  3,
  1,
  4,
  1,
  4,
  1,
  5,
  1,
  5,
  1,
  6,
  1,
  6,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  13,
  1,
  13,
  1,
  14,
  1,
  14,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  16,
  1,
  16,
  1,
  16,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  3,
  17,
  194,
  8,
  17,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  3,
  18,
  204,
  8,
  18,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  3,
  21,
  234,
  8,
  21,
  1,
  22,
  1,
  22,
  1,
  22,
  1,
  22,
  3,
  22,
  240,
  8,
  22,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  25,
  3,
  25,
  265,
  8,
  25,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  31,
  3,
  31,
  321,
  8,
  31,
  1,
  31,
  1,
  31,
  3,
  31,
  325,
  8,
  31,
  1,
  32,
  1,
  32,
  1,
  32,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  33,
  5,
  33,
  334,
  8,
  33,
  10,
  33,
  12,
  33,
  337,
  9,
  33,
  1,
  33,
  1,
  33,
  1,
  34,
  1,
  34,
  1,
  35,
  1,
  35,
  1,
  35,
  5,
  35,
  346,
  8,
  35,
  10,
  35,
  12,
  35,
  349,
  9,
  35,
  3,
  35,
  351,
  8,
  35,
  1,
  36,
  1,
  36,
  3,
  36,
  355,
  8,
  36,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  3,
  37,
  365,
  8,
  37,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  3,
  39,
  384,
  8,
  39,
  1,
  40,
  1,
  40,
  1,
  40,
  1,
  41,
  1,
  41,
  1,
  41,
  1,
  42,
  1,
  42,
  5,
  42,
  394,
  8,
  42,
  10,
  42,
  12,
  42,
  397,
  9,
  42,
  1,
  43,
  4,
  43,
  400,
  8,
  43,
  11,
  43,
  12,
  43,
  401,
  1,
  44,
  3,
  44,
  405,
  8,
  44,
  1,
  44,
  1,
  44,
  3,
  44,
  409,
  8,
  44,
  1,
  45,
  4,
  45,
  412,
  8,
  45,
  11,
  45,
  12,
  45,
  413,
  0,
  0,
  46,
  1,
  1,
  3,
  2,
  5,
  3,
  7,
  4,
  9,
  5,
  11,
  6,
  13,
  7,
  15,
  8,
  17,
  9,
  19,
  10,
  21,
  11,
  23,
  12,
  25,
  13,
  27,
  14,
  29,
  15,
  31,
  16,
  33,
  17,
  35,
  18,
  37,
  19,
  39,
  20,
  41,
  21,
  43,
  22,
  45,
  23,
  47,
  24,
  49,
  25,
  51,
  26,
  53,
  27,
  55,
  28,
  57,
  29,
  59,
  30,
  61,
  31,
  63,
  32,
  65,
  33,
  67,
  34,
  69,
  35,
  71,
  36,
  73,
  37,
  75,
  38,
  77,
  39,
  79,
  40,
  81,
  41,
  83,
  42,
  85,
  43,
  87,
  44,
  89,
  45,
  91,
  46,
  1,
  0,
  7,
  3,
  0,
  42,
  43,
  45,
  45,
  47,
  47,
  2,
  0,
  34,
  34,
  92,
  92,
  4,
  0,
  10,
  10,
  13,
  13,
  34,
  34,
  92,
  92,
  1,
  0,
  65,
  90,
  2,
  0,
  65,
  90,
  97,
  122,
  2,
  0,
  10,
  10,
  13,
  13,
  2,
  0,
  9,
  9,
  32,
  32,
  435,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  3,
  1,
  0,
  0,
  0,
  0,
  5,
  1,
  0,
  0,
  0,
  0,
  7,
  1,
  0,
  0,
  0,
  0,
  9,
  1,
  0,
  0,
  0,
  0,
  11,
  1,
  0,
  0,
  0,
  0,
  13,
  1,
  0,
  0,
  0,
  0,
  15,
  1,
  0,
  0,
  0,
  0,
  17,
  1,
  0,
  0,
  0,
  0,
  19,
  1,
  0,
  0,
  0,
  0,
  21,
  1,
  0,
  0,
  0,
  0,
  23,
  1,
  0,
  0,
  0,
  0,
  25,
  1,
  0,
  0,
  0,
  0,
  27,
  1,
  0,
  0,
  0,
  0,
  29,
  1,
  0,
  0,
  0,
  0,
  31,
  1,
  0,
  0,
  0,
  0,
  33,
  1,
  0,
  0,
  0,
  0,
  35,
  1,
  0,
  0,
  0,
  0,
  37,
  1,
  0,
  0,
  0,
  0,
  39,
  1,
  0,
  0,
  0,
  0,
  41,
  1,
  0,
  0,
  0,
  0,
  43,
  1,
  0,
  0,
  0,
  0,
  45,
  1,
  0,
  0,
  0,
  0,
  47,
  1,
  0,
  0,
  0,
  0,
  49,
  1,
  0,
  0,
  0,
  0,
  51,
  1,
  0,
  0,
  0,
  0,
  53,
  1,
  0,
  0,
  0,
  0,
  55,
  1,
  0,
  0,
  0,
  0,
  57,
  1,
  0,
  0,
  0,
  0,
  59,
  1,
  0,
  0,
  0,
  0,
  61,
  1,
  0,
  0,
  0,
  0,
  63,
  1,
  0,
  0,
  0,
  0,
  65,
  1,
  0,
  0,
  0,
  0,
  67,
  1,
  0,
  0,
  0,
  0,
  69,
  1,
  0,
  0,
  0,
  0,
  71,
  1,
  0,
  0,
  0,
  0,
  73,
  1,
  0,
  0,
  0,
  0,
  75,
  1,
  0,
  0,
  0,
  0,
  77,
  1,
  0,
  0,
  0,
  0,
  79,
  1,
  0,
  0,
  0,
  0,
  81,
  1,
  0,
  0,
  0,
  0,
  83,
  1,
  0,
  0,
  0,
  0,
  85,
  1,
  0,
  0,
  0,
  0,
  87,
  1,
  0,
  0,
  0,
  0,
  89,
  1,
  0,
  0,
  0,
  0,
  91,
  1,
  0,
  0,
  0,
  1,
  93,
  1,
  0,
  0,
  0,
  3,
  99,
  1,
  0,
  0,
  0,
  5,
  104,
  1,
  0,
  0,
  0,
  7,
  107,
  1,
  0,
  0,
  0,
  9,
  109,
  1,
  0,
  0,
  0,
  11,
  111,
  1,
  0,
  0,
  0,
  13,
  113,
  1,
  0,
  0,
  0,
  15,
  115,
  1,
  0,
  0,
  0,
  17,
  121,
  1,
  0,
  0,
  0,
  19,
  129,
  1,
  0,
  0,
  0,
  21,
  136,
  1,
  0,
  0,
  0,
  23,
  147,
  1,
  0,
  0,
  0,
  25,
  160,
  1,
  0,
  0,
  0,
  27,
  172,
  1,
  0,
  0,
  0,
  29,
  174,
  1,
  0,
  0,
  0,
  31,
  176,
  1,
  0,
  0,
  0,
  33,
  186,
  1,
  0,
  0,
  0,
  35,
  193,
  1,
  0,
  0,
  0,
  37,
  203,
  1,
  0,
  0,
  0,
  39,
  205,
  1,
  0,
  0,
  0,
  41,
  216,
  1,
  0,
  0,
  0,
  43,
  233,
  1,
  0,
  0,
  0,
  45,
  239,
  1,
  0,
  0,
  0,
  47,
  241,
  1,
  0,
  0,
  0,
  49,
  250,
  1,
  0,
  0,
  0,
  51,
  264,
  1,
  0,
  0,
  0,
  53,
  266,
  1,
  0,
  0,
  0,
  55,
  270,
  1,
  0,
  0,
  0,
  57,
  282,
  1,
  0,
  0,
  0,
  59,
  296,
  1,
  0,
  0,
  0,
  61,
  305,
  1,
  0,
  0,
  0,
  63,
  320,
  1,
  0,
  0,
  0,
  65,
  326,
  1,
  0,
  0,
  0,
  67,
  329,
  1,
  0,
  0,
  0,
  69,
  340,
  1,
  0,
  0,
  0,
  71,
  350,
  1,
  0,
  0,
  0,
  73,
  354,
  1,
  0,
  0,
  0,
  75,
  364,
  1,
  0,
  0,
  0,
  77,
  366,
  1,
  0,
  0,
  0,
  79,
  383,
  1,
  0,
  0,
  0,
  81,
  385,
  1,
  0,
  0,
  0,
  83,
  388,
  1,
  0,
  0,
  0,
  85,
  391,
  1,
  0,
  0,
  0,
  87,
  399,
  1,
  0,
  0,
  0,
  89,
  404,
  1,
  0,
  0,
  0,
  91,
  411,
  1,
  0,
  0,
  0,
  93,
  94,
  5,
  100,
  0,
  0,
  94,
  95,
  5,
  101,
  0,
  0,
  95,
  96,
  5,
  98,
  0,
  0,
  96,
  97,
  5,
  117,
  0,
  0,
  97,
  98,
  5,
  103,
  0,
  0,
  98,
  2,
  1,
  0,
  0,
  0,
  99,
  100,
  5,
  107,
  0,
  0,
  100,
  101,
  5,
  105,
  0,
  0,
  101,
  102,
  5,
  105,
  0,
  0,
  102,
  103,
  5,
  114,
  0,
  0,
  103,
  4,
  1,
  0,
  0,
  0,
  104,
  105,
  5,
  40,
  0,
  0,
  105,
  106,
  5,
  41,
  0,
  0,
  106,
  6,
  1,
  0,
  0,
  0,
  107,
  108,
  5,
  40,
  0,
  0,
  108,
  8,
  1,
  0,
  0,
  0,
  109,
  110,
  5,
  44,
  0,
  0,
  110,
  10,
  1,
  0,
  0,
  0,
  111,
  112,
  5,
  41,
  0,
  0,
  112,
  12,
  1,
  0,
  0,
  0,
  113,
  114,
  5,
  58,
  0,
  0,
  114,
  14,
  1,
  0,
  0,
  0,
  115,
  116,
  5,
  101,
  0,
  0,
  116,
  117,
  5,
  103,
  0,
  0,
  117,
  118,
  5,
  233,
  0,
  0,
  118,
  119,
  5,
  115,
  0,
  0,
  119,
  120,
  5,
  122,
  0,
  0,
  120,
  16,
  1,
  0,
  0,
  0,
  121,
  122,
  5,
  108,
  0,
  0,
  122,
  123,
  5,
  111,
  0,
  0,
  123,
  124,
  5,
  103,
  0,
  0,
  124,
  125,
  5,
  105,
  0,
  0,
  125,
  126,
  5,
  107,
  0,
  0,
  126,
  127,
  5,
  97,
  0,
  0,
  127,
  128,
  5,
  105,
  0,
  0,
  128,
  18,
  1,
  0,
  0,
  0,
  129,
  130,
  5,
  115,
  0,
  0,
  130,
  131,
  5,
  122,
  0,
  0,
  131,
  132,
  5,
  246,
  0,
  0,
  132,
  133,
  5,
  118,
  0,
  0,
  133,
  134,
  5,
  101,
  0,
  0,
  134,
  135,
  5,
  103,
  0,
  0,
  135,
  20,
  1,
  0,
  0,
  0,
  136,
  137,
  5,
  101,
  0,
  0,
  137,
  138,
  5,
  103,
  0,
  0,
  138,
  139,
  5,
  233,
  0,
  0,
  139,
  140,
  5,
  115,
  0,
  0,
  140,
  141,
  5,
  122,
  0,
  0,
  141,
  142,
  5,
  32,
  0,
  0,
  142,
  143,
  5,
  116,
  0,
  0,
  143,
  144,
  5,
  246,
  0,
  0,
  144,
  145,
  5,
  109,
  0,
  0,
  145,
  146,
  5,
  98,
  0,
  0,
  146,
  22,
  1,
  0,
  0,
  0,
  147,
  148,
  5,
  108,
  0,
  0,
  148,
  149,
  5,
  111,
  0,
  0,
  149,
  150,
  5,
  103,
  0,
  0,
  150,
  151,
  5,
  105,
  0,
  0,
  151,
  152,
  5,
  107,
  0,
  0,
  152,
  153,
  5,
  97,
  0,
  0,
  153,
  154,
  5,
  105,
  0,
  0,
  154,
  155,
  5,
  32,
  0,
  0,
  155,
  156,
  5,
  116,
  0,
  0,
  156,
  157,
  5,
  246,
  0,
  0,
  157,
  158,
  5,
  109,
  0,
  0,
  158,
  159,
  5,
  98,
  0,
  0,
  159,
  24,
  1,
  0,
  0,
  0,
  160,
  161,
  5,
  115,
  0,
  0,
  161,
  162,
  5,
  122,
  0,
  0,
  162,
  163,
  5,
  246,
  0,
  0,
  163,
  164,
  5,
  118,
  0,
  0,
  164,
  165,
  5,
  101,
  0,
  0,
  165,
  166,
  5,
  103,
  0,
  0,
  166,
  167,
  5,
  32,
  0,
  0,
  167,
  168,
  5,
  116,
  0,
  0,
  168,
  169,
  5,
  246,
  0,
  0,
  169,
  170,
  5,
  109,
  0,
  0,
  170,
  171,
  5,
  98,
  0,
  0,
  171,
  26,
  1,
  0,
  0,
  0,
  172,
  173,
  5,
  91,
  0,
  0,
  173,
  28,
  1,
  0,
  0,
  0,
  174,
  175,
  5,
  93,
  0,
  0,
  175,
  30,
  1,
  0,
  0,
  0,
  176,
  177,
  5,
  76,
  0,
  0,
  177,
  178,
  5,
  233,
  0,
  0,
  178,
  179,
  5,
  116,
  0,
  0,
  179,
  180,
  5,
  114,
  0,
  0,
  180,
  181,
  5,
  101,
  0,
  0,
  181,
  182,
  5,
  104,
  0,
  0,
  182,
  183,
  5,
  111,
  0,
  0,
  183,
  184,
  5,
  122,
  0,
  0,
  184,
  185,
  5,
  91,
  0,
  0,
  185,
  32,
  1,
  0,
  0,
  0,
  186,
  187,
  5,
  93,
  0,
  0,
  187,
  188,
  5,
  40,
  0,
  0,
  188,
  34,
  1,
  0,
  0,
  0,
  189,
  194,
  7,
  0,
  0,
  0,
  190,
  191,
  5,
  109,
  0,
  0,
  191,
  192,
  5,
  111,
  0,
  0,
  192,
  194,
  5,
  100,
  0,
  0,
  193,
  189,
  1,
  0,
  0,
  0,
  193,
  190,
  1,
  0,
  0,
  0,
  194,
  36,
  1,
  0,
  0,
  0,
  195,
  204,
  2,
  60,
  62,
  0,
  196,
  197,
  5,
  61,
  0,
  0,
  197,
  198,
  5,
  47,
  0,
  0,
  198,
  204,
  5,
  61,
  0,
  0,
  199,
  200,
  5,
  60,
  0,
  0,
  200,
  204,
  5,
  61,
  0,
  0,
  201,
  202,
  5,
  62,
  0,
  0,
  202,
  204,
  5,
  61,
  0,
  0,
  203,
  195,
  1,
  0,
  0,
  0,
  203,
  196,
  1,
  0,
  0,
  0,
  203,
  199,
  1,
  0,
  0,
  0,
  203,
  201,
  1,
  0,
  0,
  0,
  204,
  38,
  1,
  0,
  0,
  0,
  205,
  206,
  5,
  99,
  0,
  0,
  206,
  207,
  5,
  237,
  0,
  0,
  207,
  208,
  5,
  109,
  0,
  0,
  208,
  209,
  5,
  115,
  0,
  0,
  209,
  210,
  5,
  122,
  0,
  0,
  210,
  211,
  5,
  101,
  0,
  0,
  211,
  212,
  5,
  114,
  0,
  0,
  212,
  213,
  5,
  105,
  0,
  0,
  213,
  214,
  5,
  110,
  0,
  0,
  214,
  215,
  5,
  116,
  0,
  0,
  215,
  40,
  1,
  0,
  0,
  0,
  216,
  217,
  5,
  97,
  0,
  0,
  217,
  218,
  5,
  109,
  0,
  0,
  218,
  219,
  5,
  237,
  0,
  0,
  219,
  220,
  5,
  103,
  0,
  0,
  220,
  42,
  1,
  0,
  0,
  0,
  221,
  222,
  5,
  99,
  0,
  0,
  222,
  223,
  5,
  105,
  0,
  0,
  223,
  224,
  5,
  107,
  0,
  0,
  224,
  225,
  5,
  108,
  0,
  0,
  225,
  226,
  5,
  117,
  0,
  0,
  226,
  234,
  5,
  115,
  0,
  0,
  227,
  228,
  5,
  67,
  0,
  0,
  228,
  229,
  5,
  105,
  0,
  0,
  229,
  230,
  5,
  107,
  0,
  0,
  230,
  231,
  5,
  108,
  0,
  0,
  231,
  232,
  5,
  117,
  0,
  0,
  232,
  234,
  5,
  115,
  0,
  0,
  233,
  221,
  1,
  0,
  0,
  0,
  233,
  227,
  1,
  0,
  0,
  0,
  234,
  44,
  1,
  0,
  0,
  0,
  235,
  236,
  5,
  104,
  0,
  0,
  236,
  240,
  5,
  97,
  0,
  0,
  237,
  238,
  5,
  72,
  0,
  0,
  238,
  240,
  5,
  97,
  0,
  0,
  239,
  235,
  1,
  0,
  0,
  0,
  239,
  237,
  1,
  0,
  0,
  0,
  240,
  46,
  1,
  0,
  0,
  0,
  241,
  242,
  5,
  107,
  0,
  0,
  242,
  243,
  5,
  252,
  0,
  0,
  243,
  244,
  5,
  108,
  0,
  0,
  244,
  245,
  5,
  246,
  0,
  0,
  245,
  246,
  5,
  110,
  0,
  0,
  246,
  247,
  5,
  98,
  0,
  0,
  247,
  248,
  5,
  101,
  0,
  0,
  248,
  249,
  5,
  110,
  0,
  0,
  249,
  48,
  1,
  0,
  0,
  0,
  250,
  251,
  5,
  97,
  0,
  0,
  251,
  252,
  5,
  107,
  0,
  0,
  252,
  253,
  5,
  107,
  0,
  0,
  253,
  254,
  5,
  111,
  0,
  0,
  254,
  255,
  5,
  114,
  0,
  0,
  255,
  50,
  1,
  0,
  0,
  0,
  256,
  257,
  5,
  45,
  0,
  0,
  257,
  258,
  5,
  116,
  0,
  0,
  258,
  259,
  5,
  243,
  0,
  0,
  259,
  265,
  5,
  108,
  0,
  0,
  260,
  261,
  5,
  45,
  0,
  0,
  261,
  262,
  5,
  116,
  0,
  0,
  262,
  263,
  5,
  337,
  0,
  0,
  263,
  265,
  5,
  108,
  0,
  0,
  264,
  256,
  1,
  0,
  0,
  0,
  264,
  260,
  1,
  0,
  0,
  0,
  265,
  52,
  1,
  0,
  0,
  0,
  266,
  267,
  5,
  45,
  0,
  0,
  267,
  268,
  5,
  105,
  0,
  0,
  268,
  269,
  5,
  103,
  0,
  0,
  269,
  54,
  1,
  0,
  0,
  0,
  270,
  271,
  5,
  99,
  0,
  0,
  271,
  272,
  5,
  105,
  0,
  0,
  272,
  273,
  5,
  107,
  0,
  0,
  273,
  274,
  5,
  108,
  0,
  0,
  274,
  275,
  5,
  117,
  0,
  0,
  275,
  276,
  5,
  115,
  0,
  0,
  276,
  277,
  5,
  32,
  0,
  0,
  277,
  278,
  5,
  118,
  0,
  0,
  278,
  279,
  5,
  233,
  0,
  0,
  279,
  280,
  5,
  103,
  0,
  0,
  280,
  281,
  5,
  101,
  0,
  0,
  281,
  56,
  1,
  0,
  0,
  0,
  282,
  283,
  5,
  101,
  0,
  0,
  283,
  284,
  5,
  108,
  0,
  0,
  284,
  285,
  5,
  225,
  0,
  0,
  285,
  286,
  5,
  103,
  0,
  0,
  286,
  287,
  5,
  97,
  0,
  0,
  287,
  288,
  5,
  122,
  0,
  0,
  288,
  289,
  5,
  225,
  0,
  0,
  289,
  290,
  5,
  115,
  0,
  0,
  290,
  291,
  5,
  32,
  0,
  0,
  291,
  292,
  5,
  118,
  0,
  0,
  292,
  293,
  5,
  233,
  0,
  0,
  293,
  294,
  5,
  103,
  0,
  0,
  294,
  295,
  5,
  101,
  0,
  0,
  295,
  58,
  1,
  0,
  0,
  0,
  296,
  297,
  5,
  102,
  0,
  0,
  297,
  298,
  5,
  252,
  0,
  0,
  298,
  299,
  5,
  103,
  0,
  0,
  299,
  300,
  5,
  103,
  0,
  0,
  300,
  301,
  5,
  118,
  0,
  0,
  301,
  302,
  5,
  233,
  0,
  0,
  302,
  303,
  5,
  110,
  0,
  0,
  303,
  304,
  5,
  121,
  0,
  0,
  304,
  60,
  1,
  0,
  0,
  0,
  305,
  306,
  5,
  102,
  0,
  0,
  306,
  307,
  5,
  252,
  0,
  0,
  307,
  308,
  5,
  103,
  0,
  0,
  308,
  309,
  5,
  103,
  0,
  0,
  309,
  310,
  5,
  118,
  0,
  0,
  310,
  311,
  5,
  233,
  0,
  0,
  311,
  312,
  5,
  110,
  0,
  0,
  312,
  313,
  5,
  121,
  0,
  0,
  313,
  314,
  5,
  32,
  0,
  0,
  314,
  315,
  5,
  118,
  0,
  0,
  315,
  316,
  5,
  233,
  0,
  0,
  316,
  317,
  5,
  103,
  0,
  0,
  317,
  318,
  5,
  101,
  0,
  0,
  318,
  62,
  1,
  0,
  0,
  0,
  319,
  321,
  3,
  91,
  45,
  0,
  320,
  319,
  1,
  0,
  0,
  0,
  320,
  321,
  1,
  0,
  0,
  0,
  321,
  322,
  1,
  0,
  0,
  0,
  322,
  324,
  3,
  65,
  32,
  0,
  323,
  325,
  3,
  91,
  45,
  0,
  324,
  323,
  1,
  0,
  0,
  0,
  324,
  325,
  1,
  0,
  0,
  0,
  325,
  64,
  1,
  0,
  0,
  0,
  326,
  327,
  5,
  60,
  0,
  0,
  327,
  328,
  5,
  45,
  0,
  0,
  328,
  66,
  1,
  0,
  0,
  0,
  329,
  335,
  5,
  34,
  0,
  0,
  330,
  331,
  5,
  92,
  0,
  0,
  331,
  334,
  7,
  1,
  0,
  0,
  332,
  334,
  8,
  2,
  0,
  0,
  333,
  330,
  1,
  0,
  0,
  0,
  333,
  332,
  1,
  0,
  0,
  0,
  334,
  337,
  1,
  0,
  0,
  0,
  335,
  333,
  1,
  0,
  0,
  0,
  335,
  336,
  1,
  0,
  0,
  0,
  336,
  338,
  1,
  0,
  0,
  0,
  337,
  335,
  1,
  0,
  0,
  0,
  338,
  339,
  5,
  34,
  0,
  0,
  339,
  68,
  1,
  0,
  0,
  0,
  340,
  341,
  5,
  126,
  0,
  0,
  341,
  70,
  1,
  0,
  0,
  0,
  342,
  351,
  5,
  48,
  0,
  0,
  343,
  347,
  2,
  49,
  57,
  0,
  344,
  346,
  2,
  48,
  57,
  0,
  345,
  344,
  1,
  0,
  0,
  0,
  346,
  349,
  1,
  0,
  0,
  0,
  347,
  345,
  1,
  0,
  0,
  0,
  347,
  348,
  1,
  0,
  0,
  0,
  348,
  351,
  1,
  0,
  0,
  0,
  349,
  347,
  1,
  0,
  0,
  0,
  350,
  342,
  1,
  0,
  0,
  0,
  350,
  343,
  1,
  0,
  0,
  0,
  351,
  72,
  1,
  0,
  0,
  0,
  352,
  355,
  3,
  75,
  37,
  0,
  353,
  355,
  3,
  79,
  39,
  0,
  354,
  352,
  1,
  0,
  0,
  0,
  354,
  353,
  1,
  0,
  0,
  0,
  355,
  74,
  1,
  0,
  0,
  0,
  356,
  357,
  5,
  105,
  0,
  0,
  357,
  358,
  5,
  103,
  0,
  0,
  358,
  359,
  5,
  97,
  0,
  0,
  359,
  365,
  5,
  122,
  0,
  0,
  360,
  361,
  5,
  73,
  0,
  0,
  361,
  362,
  5,
  103,
  0,
  0,
  362,
  363,
  5,
  97,
  0,
  0,
  363,
  365,
  5,
  122,
  0,
  0,
  364,
  356,
  1,
  0,
  0,
  0,
  364,
  360,
  1,
  0,
  0,
  0,
  365,
  76,
  1,
  0,
  0,
  0,
  366,
  367,
  5,
  118,
  0,
  0,
  367,
  368,
  5,
  105,
  0,
  0,
  368,
  369,
  5,
  115,
  0,
  0,
  369,
  370,
  5,
  115,
  0,
  0,
  370,
  371,
  5,
  122,
  0,
  0,
  371,
  372,
  5,
  97,
  0,
  0,
  372,
  78,
  1,
  0,
  0,
  0,
  373,
  374,
  5,
  104,
  0,
  0,
  374,
  375,
  5,
  97,
  0,
  0,
  375,
  376,
  5,
  109,
  0,
  0,
  376,
  377,
  5,
  105,
  0,
  0,
  377,
  384,
  5,
  115,
  0,
  0,
  378,
  379,
  5,
  72,
  0,
  0,
  379,
  380,
  5,
  97,
  0,
  0,
  380,
  381,
  5,
  109,
  0,
  0,
  381,
  382,
  5,
  105,
  0,
  0,
  382,
  384,
  5,
  115,
  0,
  0,
  383,
  373,
  1,
  0,
  0,
  0,
  383,
  378,
  1,
  0,
  0,
  0,
  384,
  80,
  1,
  0,
  0,
  0,
  385,
  386,
  5,
  47,
  0,
  0,
  386,
  387,
  5,
  92,
  0,
  0,
  387,
  82,
  1,
  0,
  0,
  0,
  388,
  389,
  5,
  92,
  0,
  0,
  389,
  390,
  5,
  47,
  0,
  0,
  390,
  84,
  1,
  0,
  0,
  0,
  391,
  395,
  7,
  3,
  0,
  0,
  392,
  394,
  7,
  4,
  0,
  0,
  393,
  392,
  1,
  0,
  0,
  0,
  394,
  397,
  1,
  0,
  0,
  0,
  395,
  393,
  1,
  0,
  0,
  0,
  395,
  396,
  1,
  0,
  0,
  0,
  396,
  86,
  1,
  0,
  0,
  0,
  397,
  395,
  1,
  0,
  0,
  0,
  398,
  400,
  2,
  97,
  122,
  0,
  399,
  398,
  1,
  0,
  0,
  0,
  400,
  401,
  1,
  0,
  0,
  0,
  401,
  399,
  1,
  0,
  0,
  0,
  401,
  402,
  1,
  0,
  0,
  0,
  402,
  88,
  1,
  0,
  0,
  0,
  403,
  405,
  3,
  91,
  45,
  0,
  404,
  403,
  1,
  0,
  0,
  0,
  404,
  405,
  1,
  0,
  0,
  0,
  405,
  406,
  1,
  0,
  0,
  0,
  406,
  408,
  7,
  5,
  0,
  0,
  407,
  409,
  3,
  91,
  45,
  0,
  408,
  407,
  1,
  0,
  0,
  0,
  408,
  409,
  1,
  0,
  0,
  0,
  409,
  90,
  1,
  0,
  0,
  0,
  410,
  412,
  7,
  6,
  0,
  0,
  411,
  410,
  1,
  0,
  0,
  0,
  412,
  413,
  1,
  0,
  0,
  0,
  413,
  411,
  1,
  0,
  0,
  0,
  413,
  414,
  1,
  0,
  0,
  0,
  414,
  92,
  1,
  0,
  0,
  0,
  21,
  0,
  193,
  203,
  233,
  239,
  264,
  320,
  324,
  333,
  335,
  347,
  350,
  354,
  364,
  383,
  393,
  395,
  401,
  404,
  408,
  413,
  0
];
var atn = new antlr4_default.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4_default.dfa.DFA(ds, index));
var PseudoCodeLexer = class extends antlr4_default.Lexer {
  constructor(input) {
    super(input);
    this._interp = new antlr4_default.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4_default.PredictionContextCache());
  }
  get atn() {
    return atn;
  }
};
__publicField(PseudoCodeLexer, "grammarFileName", "PseudoCode.g4");
__publicField(PseudoCodeLexer, "channelNames", ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"]);
__publicField(PseudoCodeLexer, "modeNames", ["DEFAULT_MODE"]);
__publicField(PseudoCodeLexer, "literalNames", [
  null,
  "'debug'",
  "'kiir'",
  "'()'",
  "'('",
  "','",
  "')'",
  "':'",
  "'eg\\u00E9sz'",
  "'logikai'",
  "'sz\\u00F6veg'",
  "'eg\\u00E9sz t\\u00F6mb'",
  "'logikai t\\u00F6mb'",
  "'sz\\u00F6veg t\\u00F6mb'",
  "'['",
  "']'",
  "'L\\u00E9trehoz['",
  "']('",
  null,
  null,
  "'c\\u00EDmszerint'",
  "'am\\u00EDg'",
  null,
  null,
  "'k\\u00FCl\\u00F6nben'",
  "'akkor'",
  null,
  "'-ig'",
  "'ciklus v\\u00E9ge'",
  "'el\\u00E1gaz\\u00E1s v\\u00E9ge'",
  "'f\\u00FCggv\\u00E9ny'",
  "'f\\u00FCggv\\u00E9ny v\\u00E9ge'",
  null,
  "'<-'",
  null,
  "'~'",
  null,
  null,
  null,
  "'vissza'",
  null,
  "'/\\'",
  "'\\/'"
]);
__publicField(PseudoCodeLexer, "symbolicNames", [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "OPERATOR",
  "COMPARISON",
  "CIMSZERINT",
  "AMIG",
  "CIKLUS",
  "HA",
  "KULONBEN",
  "AKKOR",
  "CSTART",
  "CEND",
  "CVEGE",
  "ELVEGE",
  "FUGGVENY",
  "FVEGE",
  "ASSIGN",
  "NYIL",
  "STRING",
  "NOT",
  "NUMBER",
  "BOOL",
  "IGAZ",
  "VISSZA",
  "HAMIS",
  "ES",
  "VAGY",
  "FUNCTION",
  "VARIABLE",
  "NL",
  "WS"
]);
__publicField(PseudoCodeLexer, "ruleNames", [
  "T__0",
  "T__1",
  "T__2",
  "T__3",
  "T__4",
  "T__5",
  "T__6",
  "T__7",
  "T__8",
  "T__9",
  "T__10",
  "T__11",
  "T__12",
  "T__13",
  "T__14",
  "T__15",
  "T__16",
  "OPERATOR",
  "COMPARISON",
  "CIMSZERINT",
  "AMIG",
  "CIKLUS",
  "HA",
  "KULONBEN",
  "AKKOR",
  "CSTART",
  "CEND",
  "CVEGE",
  "ELVEGE",
  "FUGGVENY",
  "FVEGE",
  "ASSIGN",
  "NYIL",
  "STRING",
  "NOT",
  "NUMBER",
  "BOOL",
  "IGAZ",
  "VISSZA",
  "HAMIS",
  "ES",
  "VAGY",
  "FUNCTION",
  "VARIABLE",
  "NL",
  "WS"
]);
PseudoCodeLexer.EOF = antlr4_default.Token.EOF;
PseudoCodeLexer.T__0 = 1;
PseudoCodeLexer.T__1 = 2;
PseudoCodeLexer.T__2 = 3;
PseudoCodeLexer.T__3 = 4;
PseudoCodeLexer.T__4 = 5;
PseudoCodeLexer.T__5 = 6;
PseudoCodeLexer.T__6 = 7;
PseudoCodeLexer.T__7 = 8;
PseudoCodeLexer.T__8 = 9;
PseudoCodeLexer.T__9 = 10;
PseudoCodeLexer.T__10 = 11;
PseudoCodeLexer.T__11 = 12;
PseudoCodeLexer.T__12 = 13;
PseudoCodeLexer.T__13 = 14;
PseudoCodeLexer.T__14 = 15;
PseudoCodeLexer.T__15 = 16;
PseudoCodeLexer.T__16 = 17;
PseudoCodeLexer.OPERATOR = 18;
PseudoCodeLexer.COMPARISON = 19;
PseudoCodeLexer.CIMSZERINT = 20;
PseudoCodeLexer.AMIG = 21;
PseudoCodeLexer.CIKLUS = 22;
PseudoCodeLexer.HA = 23;
PseudoCodeLexer.KULONBEN = 24;
PseudoCodeLexer.AKKOR = 25;
PseudoCodeLexer.CSTART = 26;
PseudoCodeLexer.CEND = 27;
PseudoCodeLexer.CVEGE = 28;
PseudoCodeLexer.ELVEGE = 29;
PseudoCodeLexer.FUGGVENY = 30;
PseudoCodeLexer.FVEGE = 31;
PseudoCodeLexer.ASSIGN = 32;
PseudoCodeLexer.NYIL = 33;
PseudoCodeLexer.STRING = 34;
PseudoCodeLexer.NOT = 35;
PseudoCodeLexer.NUMBER = 36;
PseudoCodeLexer.BOOL = 37;
PseudoCodeLexer.IGAZ = 38;
PseudoCodeLexer.VISSZA = 39;
PseudoCodeLexer.HAMIS = 40;
PseudoCodeLexer.ES = 41;
PseudoCodeLexer.VAGY = 42;
PseudoCodeLexer.FUNCTION = 43;
PseudoCodeLexer.VARIABLE = 44;
PseudoCodeLexer.NL = 45;
PseudoCodeLexer.WS = 46;

// src/libs/PseudoCodeListener.js
var PseudoCodeListener = class extends antlr4_default.tree.ParseTreeListener {
  enterProgram(ctx) {
  }
  exitProgram(ctx) {
  }
  enterBody(ctx) {
  }
  exitBody(ctx) {
  }
  enterStatement(ctx) {
  }
  exitStatement(ctx) {
  }
  enterDebug(ctx) {
  }
  exitDebug(ctx) {
  }
  enterDebugPrintStatement(ctx) {
  }
  exitDebugPrintStatement(ctx) {
  }
  enterIfStatement(ctx) {
  }
  exitIfStatement(ctx) {
  }
  enterElseIfBranch(ctx) {
  }
  exitElseIfBranch(ctx) {
  }
  enterElseBranch(ctx) {
  }
  exitElseBranch(ctx) {
  }
  enterWhileStatement(ctx) {
  }
  exitWhileStatement(ctx) {
  }
  enterDoWhileStatement(ctx) {
  }
  exitDoWhileStatement(ctx) {
  }
  enterForStatement(ctx) {
  }
  exitForStatement(ctx) {
  }
  enterReturnStatement(ctx) {
  }
  exitReturnStatement(ctx) {
  }
  enterMethodCallStatement(ctx) {
  }
  exitMethodCallStatement(ctx) {
  }
  enterFunctionDeclarationStatement(ctx) {
  }
  exitFunctionDeclarationStatement(ctx) {
  }
  enterParameterList(ctx) {
  }
  exitParameterList(ctx) {
  }
  enterParameterWithType(ctx) {
  }
  exitParameterWithType(ctx) {
  }
  enterType(ctx) {
  }
  exitType(ctx) {
  }
  enterArrayElementAssignmentStatement(ctx) {
  }
  exitArrayElementAssignmentStatement(ctx) {
  }
  enterArrayAssignmentStatement(ctx) {
  }
  exitArrayAssignmentStatement(ctx) {
  }
  enterAssignmentStatement(ctx) {
  }
  exitAssignmentStatement(ctx) {
  }
  enterOrExpression(ctx) {
  }
  exitOrExpression(ctx) {
  }
  enterValueExpression(ctx) {
  }
  exitValueExpression(ctx) {
  }
  enterAndExpression(ctx) {
  }
  exitAndExpression(ctx) {
  }
  enterFunctionCallExpression(ctx) {
  }
  exitFunctionCallExpression(ctx) {
  }
  enterNotExpression(ctx) {
  }
  exitNotExpression(ctx) {
  }
  enterComparisonExpression(ctx) {
  }
  exitComparisonExpression(ctx) {
  }
  enterCalculationExpression(ctx) {
  }
  exitCalculationExpression(ctx) {
  }
  enterFunctionCall(ctx) {
  }
  exitFunctionCall(ctx) {
  }
  enterParameters(ctx) {
  }
  exitParameters(ctx) {
  }
  enterFunctionName(ctx) {
  }
  exitFunctionName(ctx) {
  }
  enterValue(ctx) {
  }
  exitValue(ctx) {
  }
  enterAtom(ctx) {
  }
  exitAtom(ctx) {
  }
  enterString(ctx) {
  }
  exitString(ctx) {
  }
  enterNumber(ctx) {
  }
  exitNumber(ctx) {
  }
  enterBool(ctx) {
  }
  exitBool(ctx) {
  }
  enterArrayShorthand(ctx) {
  }
  exitArrayShorthand(ctx) {
  }
  enterArrayIndex(ctx) {
  }
  exitArrayIndex(ctx) {
  }
  enterVariable(ctx) {
  }
  exitVariable(ctx) {
  }
  enterNewline(ctx) {
  }
  exitNewline(ctx) {
  }
};

// src/libs/PseudoCodeVisitor.js
var PseudoCodeVisitor = class extends antlr4_default.tree.ParseTreeVisitor {
  visitProgram(ctx) {
    return this.visitChildren(ctx);
  }
  visitBody(ctx) {
    return this.visitChildren(ctx);
  }
  visitStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitDebug(ctx) {
    return this.visitChildren(ctx);
  }
  visitDebugPrintStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitIfStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitElseIfBranch(ctx) {
    return this.visitChildren(ctx);
  }
  visitElseBranch(ctx) {
    return this.visitChildren(ctx);
  }
  visitWhileStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitDoWhileStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitForStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitReturnStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitMethodCallStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitFunctionDeclarationStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitParameterList(ctx) {
    return this.visitChildren(ctx);
  }
  visitParameterWithType(ctx) {
    return this.visitChildren(ctx);
  }
  visitType(ctx) {
    return this.visitChildren(ctx);
  }
  visitArrayElementAssignmentStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitArrayAssignmentStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitAssignmentStatement(ctx) {
    return this.visitChildren(ctx);
  }
  visitOrExpression(ctx) {
    return this.visitChildren(ctx);
  }
  visitValueExpression(ctx) {
    return this.visitChildren(ctx);
  }
  visitAndExpression(ctx) {
    return this.visitChildren(ctx);
  }
  visitFunctionCallExpression(ctx) {
    return this.visitChildren(ctx);
  }
  visitNotExpression(ctx) {
    return this.visitChildren(ctx);
  }
  visitComparisonExpression(ctx) {
    return this.visitChildren(ctx);
  }
  visitCalculationExpression(ctx) {
    return this.visitChildren(ctx);
  }
  visitFunctionCall(ctx) {
    return this.visitChildren(ctx);
  }
  visitParameters(ctx) {
    return this.visitChildren(ctx);
  }
  visitFunctionName(ctx) {
    return this.visitChildren(ctx);
  }
  visitValue(ctx) {
    return this.visitChildren(ctx);
  }
  visitAtom(ctx) {
    return this.visitChildren(ctx);
  }
  visitString(ctx) {
    return this.visitChildren(ctx);
  }
  visitNumber(ctx) {
    return this.visitChildren(ctx);
  }
  visitBool(ctx) {
    return this.visitChildren(ctx);
  }
  visitArrayShorthand(ctx) {
    return this.visitChildren(ctx);
  }
  visitArrayIndex(ctx) {
    return this.visitChildren(ctx);
  }
  visitVariable(ctx) {
    return this.visitChildren(ctx);
  }
  visitNewline(ctx) {
    return this.visitChildren(ctx);
  }
};

// src/libs/PseudoCodeParser.js
var serializedATN2 = [
  4,
  1,
  46,
  385,
  2,
  0,
  7,
  0,
  2,
  1,
  7,
  1,
  2,
  2,
  7,
  2,
  2,
  3,
  7,
  3,
  2,
  4,
  7,
  4,
  2,
  5,
  7,
  5,
  2,
  6,
  7,
  6,
  2,
  7,
  7,
  7,
  2,
  8,
  7,
  8,
  2,
  9,
  7,
  9,
  2,
  10,
  7,
  10,
  2,
  11,
  7,
  11,
  2,
  12,
  7,
  12,
  2,
  13,
  7,
  13,
  2,
  14,
  7,
  14,
  2,
  15,
  7,
  15,
  2,
  16,
  7,
  16,
  2,
  17,
  7,
  17,
  2,
  18,
  7,
  18,
  2,
  19,
  7,
  19,
  2,
  20,
  7,
  20,
  2,
  21,
  7,
  21,
  2,
  22,
  7,
  22,
  2,
  23,
  7,
  23,
  2,
  24,
  7,
  24,
  2,
  25,
  7,
  25,
  2,
  26,
  7,
  26,
  2,
  27,
  7,
  27,
  2,
  28,
  7,
  28,
  2,
  29,
  7,
  29,
  2,
  30,
  7,
  30,
  2,
  31,
  7,
  31,
  2,
  32,
  7,
  32,
  1,
  0,
  3,
  0,
  68,
  8,
  0,
  1,
  0,
  1,
  0,
  4,
  0,
  72,
  8,
  0,
  11,
  0,
  12,
  0,
  73,
  1,
  1,
  3,
  1,
  77,
  8,
  1,
  1,
  1,
  1,
  1,
  4,
  1,
  81,
  8,
  1,
  11,
  1,
  12,
  1,
  82,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  3,
  2,
  97,
  8,
  2,
  1,
  2,
  1,
  2,
  1,
  3,
  1,
  3,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  4,
  5,
  115,
  8,
  5,
  11,
  5,
  12,
  5,
  116,
  1,
  5,
  1,
  5,
  1,
  5,
  3,
  5,
  122,
  8,
  5,
  3,
  5,
  124,
  8,
  5,
  1,
  5,
  1,
  5,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  14,
  1,
  14,
  1,
  14,
  1,
  14,
  1,
  14,
  1,
  14,
  3,
  14,
  192,
  8,
  14,
  1,
  14,
  5,
  14,
  195,
  8,
  14,
  10,
  14,
  12,
  14,
  198,
  9,
  14,
  1,
  14,
  1,
  14,
  3,
  14,
  202,
  8,
  14,
  1,
  15,
  3,
  15,
  205,
  8,
  15,
  1,
  15,
  1,
  15,
  3,
  15,
  209,
  8,
  15,
  1,
  15,
  1,
  15,
  3,
  15,
  213,
  8,
  15,
  1,
  15,
  1,
  15,
  3,
  15,
  217,
  8,
  15,
  1,
  15,
  1,
  15,
  3,
  15,
  221,
  8,
  15,
  1,
  16,
  1,
  16,
  1,
  17,
  1,
  17,
  1,
  17,
  3,
  17,
  228,
  8,
  17,
  1,
  17,
  1,
  17,
  3,
  17,
  232,
  8,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  3,
  18,
  242,
  8,
  18,
  1,
  18,
  1,
  18,
  3,
  18,
  246,
  8,
  18,
  1,
  18,
  1,
  18,
  3,
  18,
  250,
  8,
  18,
  1,
  18,
  1,
  18,
  3,
  18,
  254,
  8,
  18,
  1,
  18,
  1,
  18,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  267,
  8,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  271,
  8,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  275,
  8,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  280,
  8,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  284,
  8,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  289,
  8,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  293,
  8,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  298,
  8,
  20,
  1,
  20,
  1,
  20,
  3,
  20,
  302,
  8,
  20,
  1,
  20,
  5,
  20,
  305,
  8,
  20,
  10,
  20,
  12,
  20,
  308,
  9,
  20,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  22,
  1,
  22,
  1,
  22,
  1,
  22,
  1,
  22,
  3,
  22,
  318,
  8,
  22,
  1,
  22,
  5,
  22,
  321,
  8,
  22,
  10,
  22,
  12,
  22,
  324,
  9,
  22,
  1,
  22,
  1,
  22,
  3,
  22,
  328,
  8,
  22,
  1,
  23,
  1,
  23,
  1,
  24,
  1,
  24,
  1,
  24,
  3,
  24,
  335,
  8,
  24,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  25,
  3,
  25,
  341,
  8,
  25,
  1,
  26,
  1,
  26,
  1,
  27,
  1,
  27,
  1,
  28,
  1,
  28,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  3,
  29,
  353,
  8,
  29,
  1,
  29,
  5,
  29,
  356,
  8,
  29,
  10,
  29,
  12,
  29,
  359,
  9,
  29,
  1,
  29,
  1,
  29,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  3,
  30,
  368,
  8,
  30,
  1,
  30,
  5,
  30,
  371,
  8,
  30,
  10,
  30,
  12,
  30,
  374,
  9,
  30,
  1,
  30,
  1,
  30,
  1,
  31,
  1,
  31,
  1,
  32,
  4,
  32,
  381,
  8,
  32,
  11,
  32,
  12,
  32,
  382,
  1,
  32,
  0,
  1,
  40,
  33,
  0,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
  32,
  34,
  36,
  38,
  40,
  42,
  44,
  46,
  48,
  50,
  52,
  54,
  56,
  58,
  60,
  62,
  64,
  0,
  1,
  1,
  0,
  8,
  13,
  413,
  0,
  67,
  1,
  0,
  0,
  0,
  2,
  76,
  1,
  0,
  0,
  0,
  4,
  96,
  1,
  0,
  0,
  0,
  6,
  100,
  1,
  0,
  0,
  0,
  8,
  102,
  1,
  0,
  0,
  0,
  10,
  106,
  1,
  0,
  0,
  0,
  12,
  127,
  1,
  0,
  0,
  0,
  14,
  137,
  1,
  0,
  0,
  0,
  16,
  141,
  1,
  0,
  0,
  0,
  18,
  150,
  1,
  0,
  0,
  0,
  20,
  157,
  1,
  0,
  0,
  0,
  22,
  170,
  1,
  0,
  0,
  0,
  24,
  174,
  1,
  0,
  0,
  0,
  26,
  177,
  1,
  0,
  0,
  0,
  28,
  201,
  1,
  0,
  0,
  0,
  30,
  204,
  1,
  0,
  0,
  0,
  32,
  222,
  1,
  0,
  0,
  0,
  34,
  224,
  1,
  0,
  0,
  0,
  36,
  237,
  1,
  0,
  0,
  0,
  38,
  257,
  1,
  0,
  0,
  0,
  40,
  266,
  1,
  0,
  0,
  0,
  42,
  309,
  1,
  0,
  0,
  0,
  44,
  327,
  1,
  0,
  0,
  0,
  46,
  329,
  1,
  0,
  0,
  0,
  48,
  334,
  1,
  0,
  0,
  0,
  50,
  340,
  1,
  0,
  0,
  0,
  52,
  342,
  1,
  0,
  0,
  0,
  54,
  344,
  1,
  0,
  0,
  0,
  56,
  346,
  1,
  0,
  0,
  0,
  58,
  348,
  1,
  0,
  0,
  0,
  60,
  362,
  1,
  0,
  0,
  0,
  62,
  377,
  1,
  0,
  0,
  0,
  64,
  380,
  1,
  0,
  0,
  0,
  66,
  68,
  5,
  46,
  0,
  0,
  67,
  66,
  1,
  0,
  0,
  0,
  67,
  68,
  1,
  0,
  0,
  0,
  68,
  71,
  1,
  0,
  0,
  0,
  69,
  72,
  3,
  64,
  32,
  0,
  70,
  72,
  3,
  4,
  2,
  0,
  71,
  69,
  1,
  0,
  0,
  0,
  71,
  70,
  1,
  0,
  0,
  0,
  72,
  73,
  1,
  0,
  0,
  0,
  73,
  71,
  1,
  0,
  0,
  0,
  73,
  74,
  1,
  0,
  0,
  0,
  74,
  1,
  1,
  0,
  0,
  0,
  75,
  77,
  5,
  46,
  0,
  0,
  76,
  75,
  1,
  0,
  0,
  0,
  76,
  77,
  1,
  0,
  0,
  0,
  77,
  80,
  1,
  0,
  0,
  0,
  78,
  81,
  3,
  4,
  2,
  0,
  79,
  81,
  3,
  64,
  32,
  0,
  80,
  78,
  1,
  0,
  0,
  0,
  80,
  79,
  1,
  0,
  0,
  0,
  81,
  82,
  1,
  0,
  0,
  0,
  82,
  80,
  1,
  0,
  0,
  0,
  82,
  83,
  1,
  0,
  0,
  0,
  83,
  3,
  1,
  0,
  0,
  0,
  84,
  97,
  3,
  24,
  12,
  0,
  85,
  97,
  3,
  10,
  5,
  0,
  86,
  97,
  3,
  16,
  8,
  0,
  87,
  97,
  3,
  18,
  9,
  0,
  88,
  97,
  3,
  20,
  10,
  0,
  89,
  97,
  3,
  34,
  17,
  0,
  90,
  97,
  3,
  36,
  18,
  0,
  91,
  97,
  3,
  38,
  19,
  0,
  92,
  97,
  3,
  22,
  11,
  0,
  93,
  97,
  3,
  26,
  13,
  0,
  94,
  97,
  3,
  8,
  4,
  0,
  95,
  97,
  3,
  6,
  3,
  0,
  96,
  84,
  1,
  0,
  0,
  0,
  96,
  85,
  1,
  0,
  0,
  0,
  96,
  86,
  1,
  0,
  0,
  0,
  96,
  87,
  1,
  0,
  0,
  0,
  96,
  88,
  1,
  0,
  0,
  0,
  96,
  89,
  1,
  0,
  0,
  0,
  96,
  90,
  1,
  0,
  0,
  0,
  96,
  91,
  1,
  0,
  0,
  0,
  96,
  92,
  1,
  0,
  0,
  0,
  96,
  93,
  1,
  0,
  0,
  0,
  96,
  94,
  1,
  0,
  0,
  0,
  96,
  95,
  1,
  0,
  0,
  0,
  97,
  98,
  1,
  0,
  0,
  0,
  98,
  99,
  3,
  64,
  32,
  0,
  99,
  5,
  1,
  0,
  0,
  0,
  100,
  101,
  5,
  1,
  0,
  0,
  101,
  7,
  1,
  0,
  0,
  0,
  102,
  103,
  5,
  2,
  0,
  0,
  103,
  104,
  5,
  46,
  0,
  0,
  104,
  105,
  3,
  40,
  20,
  0,
  105,
  9,
  1,
  0,
  0,
  0,
  106,
  107,
  5,
  23,
  0,
  0,
  107,
  108,
  5,
  46,
  0,
  0,
  108,
  109,
  3,
  40,
  20,
  0,
  109,
  110,
  5,
  46,
  0,
  0,
  110,
  111,
  5,
  25,
  0,
  0,
  111,
  112,
  3,
  64,
  32,
  0,
  112,
  123,
  3,
  2,
  1,
  0,
  113,
  115,
  3,
  12,
  6,
  0,
  114,
  113,
  1,
  0,
  0,
  0,
  115,
  116,
  1,
  0,
  0,
  0,
  116,
  114,
  1,
  0,
  0,
  0,
  116,
  117,
  1,
  0,
  0,
  0,
  117,
  118,
  1,
  0,
  0,
  0,
  118,
  119,
  3,
  14,
  7,
  0,
  119,
  124,
  1,
  0,
  0,
  0,
  120,
  122,
  3,
  14,
  7,
  0,
  121,
  120,
  1,
  0,
  0,
  0,
  121,
  122,
  1,
  0,
  0,
  0,
  122,
  124,
  1,
  0,
  0,
  0,
  123,
  114,
  1,
  0,
  0,
  0,
  123,
  121,
  1,
  0,
  0,
  0,
  124,
  125,
  1,
  0,
  0,
  0,
  125,
  126,
  5,
  29,
  0,
  0,
  126,
  11,
  1,
  0,
  0,
  0,
  127,
  128,
  5,
  24,
  0,
  0,
  128,
  129,
  5,
  46,
  0,
  0,
  129,
  130,
  5,
  23,
  0,
  0,
  130,
  131,
  5,
  46,
  0,
  0,
  131,
  132,
  3,
  40,
  20,
  0,
  132,
  133,
  5,
  46,
  0,
  0,
  133,
  134,
  5,
  25,
  0,
  0,
  134,
  135,
  3,
  64,
  32,
  0,
  135,
  136,
  3,
  2,
  1,
  0,
  136,
  13,
  1,
  0,
  0,
  0,
  137,
  138,
  5,
  24,
  0,
  0,
  138,
  139,
  3,
  64,
  32,
  0,
  139,
  140,
  3,
  2,
  1,
  0,
  140,
  15,
  1,
  0,
  0,
  0,
  141,
  142,
  5,
  22,
  0,
  0,
  142,
  143,
  5,
  46,
  0,
  0,
  143,
  144,
  5,
  21,
  0,
  0,
  144,
  145,
  5,
  46,
  0,
  0,
  145,
  146,
  3,
  40,
  20,
  0,
  146,
  147,
  3,
  64,
  32,
  0,
  147,
  148,
  3,
  2,
  1,
  0,
  148,
  149,
  5,
  28,
  0,
  0,
  149,
  17,
  1,
  0,
  0,
  0,
  150,
  151,
  5,
  22,
  0,
  0,
  151,
  152,
  3,
  64,
  32,
  0,
  152,
  153,
  3,
  2,
  1,
  0,
  153,
  154,
  5,
  21,
  0,
  0,
  154,
  155,
  5,
  46,
  0,
  0,
  155,
  156,
  3,
  40,
  20,
  0,
  156,
  19,
  1,
  0,
  0,
  0,
  157,
  158,
  5,
  22,
  0,
  0,
  158,
  159,
  5,
  46,
  0,
  0,
  159,
  160,
  3,
  62,
  31,
  0,
  160,
  161,
  5,
  32,
  0,
  0,
  161,
  162,
  3,
  40,
  20,
  0,
  162,
  163,
  5,
  26,
  0,
  0,
  163,
  164,
  5,
  46,
  0,
  0,
  164,
  165,
  3,
  40,
  20,
  0,
  165,
  166,
  5,
  27,
  0,
  0,
  166,
  167,
  3,
  64,
  32,
  0,
  167,
  168,
  3,
  2,
  1,
  0,
  168,
  169,
  5,
  28,
  0,
  0,
  169,
  21,
  1,
  0,
  0,
  0,
  170,
  171,
  5,
  39,
  0,
  0,
  171,
  172,
  5,
  46,
  0,
  0,
  172,
  173,
  3,
  40,
  20,
  0,
  173,
  23,
  1,
  0,
  0,
  0,
  174,
  175,
  3,
  46,
  23,
  0,
  175,
  176,
  3,
  44,
  22,
  0,
  176,
  25,
  1,
  0,
  0,
  0,
  177,
  178,
  5,
  30,
  0,
  0,
  178,
  179,
  5,
  46,
  0,
  0,
  179,
  180,
  3,
  46,
  23,
  0,
  180,
  181,
  3,
  28,
  14,
  0,
  181,
  182,
  3,
  64,
  32,
  0,
  182,
  183,
  3,
  2,
  1,
  0,
  183,
  184,
  5,
  31,
  0,
  0,
  184,
  27,
  1,
  0,
  0,
  0,
  185,
  202,
  1,
  0,
  0,
  0,
  186,
  202,
  5,
  3,
  0,
  0,
  187,
  188,
  5,
  4,
  0,
  0,
  188,
  196,
  3,
  30,
  15,
  0,
  189,
  191,
  5,
  5,
  0,
  0,
  190,
  192,
  5,
  46,
  0,
  0,
  191,
  190,
  1,
  0,
  0,
  0,
  191,
  192,
  1,
  0,
  0,
  0,
  192,
  193,
  1,
  0,
  0,
  0,
  193,
  195,
  3,
  30,
  15,
  0,
  194,
  189,
  1,
  0,
  0,
  0,
  195,
  198,
  1,
  0,
  0,
  0,
  196,
  194,
  1,
  0,
  0,
  0,
  196,
  197,
  1,
  0,
  0,
  0,
  197,
  199,
  1,
  0,
  0,
  0,
  198,
  196,
  1,
  0,
  0,
  0,
  199,
  200,
  5,
  6,
  0,
  0,
  200,
  202,
  1,
  0,
  0,
  0,
  201,
  185,
  1,
  0,
  0,
  0,
  201,
  186,
  1,
  0,
  0,
  0,
  201,
  187,
  1,
  0,
  0,
  0,
  202,
  29,
  1,
  0,
  0,
  0,
  203,
  205,
  3,
  64,
  32,
  0,
  204,
  203,
  1,
  0,
  0,
  0,
  204,
  205,
  1,
  0,
  0,
  0,
  205,
  208,
  1,
  0,
  0,
  0,
  206,
  207,
  5,
  20,
  0,
  0,
  207,
  209,
  5,
  46,
  0,
  0,
  208,
  206,
  1,
  0,
  0,
  0,
  208,
  209,
  1,
  0,
  0,
  0,
  209,
  210,
  1,
  0,
  0,
  0,
  210,
  212,
  3,
  62,
  31,
  0,
  211,
  213,
  5,
  46,
  0,
  0,
  212,
  211,
  1,
  0,
  0,
  0,
  212,
  213,
  1,
  0,
  0,
  0,
  213,
  214,
  1,
  0,
  0,
  0,
  214,
  216,
  5,
  7,
  0,
  0,
  215,
  217,
  5,
  46,
  0,
  0,
  216,
  215,
  1,
  0,
  0,
  0,
  216,
  217,
  1,
  0,
  0,
  0,
  217,
  218,
  1,
  0,
  0,
  0,
  218,
  220,
  3,
  32,
  16,
  0,
  219,
  221,
  3,
  64,
  32,
  0,
  220,
  219,
  1,
  0,
  0,
  0,
  220,
  221,
  1,
  0,
  0,
  0,
  221,
  31,
  1,
  0,
  0,
  0,
  222,
  223,
  7,
  0,
  0,
  0,
  223,
  33,
  1,
  0,
  0,
  0,
  224,
  225,
  3,
  62,
  31,
  0,
  225,
  227,
  5,
  14,
  0,
  0,
  226,
  228,
  5,
  46,
  0,
  0,
  227,
  226,
  1,
  0,
  0,
  0,
  227,
  228,
  1,
  0,
  0,
  0,
  228,
  229,
  1,
  0,
  0,
  0,
  229,
  231,
  3,
  40,
  20,
  0,
  230,
  232,
  5,
  46,
  0,
  0,
  231,
  230,
  1,
  0,
  0,
  0,
  231,
  232,
  1,
  0,
  0,
  0,
  232,
  233,
  1,
  0,
  0,
  0,
  233,
  234,
  5,
  15,
  0,
  0,
  234,
  235,
  5,
  32,
  0,
  0,
  235,
  236,
  3,
  40,
  20,
  0,
  236,
  35,
  1,
  0,
  0,
  0,
  237,
  238,
  3,
  62,
  31,
  0,
  238,
  239,
  5,
  32,
  0,
  0,
  239,
  241,
  5,
  16,
  0,
  0,
  240,
  242,
  5,
  46,
  0,
  0,
  241,
  240,
  1,
  0,
  0,
  0,
  241,
  242,
  1,
  0,
  0,
  0,
  242,
  243,
  1,
  0,
  0,
  0,
  243,
  245,
  3,
  32,
  16,
  0,
  244,
  246,
  5,
  46,
  0,
  0,
  245,
  244,
  1,
  0,
  0,
  0,
  245,
  246,
  1,
  0,
  0,
  0,
  246,
  247,
  1,
  0,
  0,
  0,
  247,
  249,
  5,
  17,
  0,
  0,
  248,
  250,
  5,
  46,
  0,
  0,
  249,
  248,
  1,
  0,
  0,
  0,
  249,
  250,
  1,
  0,
  0,
  0,
  250,
  251,
  1,
  0,
  0,
  0,
  251,
  253,
  3,
  40,
  20,
  0,
  252,
  254,
  5,
  46,
  0,
  0,
  253,
  252,
  1,
  0,
  0,
  0,
  253,
  254,
  1,
  0,
  0,
  0,
  254,
  255,
  1,
  0,
  0,
  0,
  255,
  256,
  5,
  6,
  0,
  0,
  256,
  37,
  1,
  0,
  0,
  0,
  257,
  258,
  3,
  62,
  31,
  0,
  258,
  259,
  5,
  32,
  0,
  0,
  259,
  260,
  3,
  40,
  20,
  0,
  260,
  39,
  1,
  0,
  0,
  0,
  261,
  262,
  6,
  20,
  -1,
  0,
  262,
  267,
  3,
  42,
  21,
  0,
  263,
  264,
  5,
  35,
  0,
  0,
  264,
  267,
  3,
  40,
  20,
  4,
  265,
  267,
  3,
  48,
  24,
  0,
  266,
  261,
  1,
  0,
  0,
  0,
  266,
  263,
  1,
  0,
  0,
  0,
  266,
  265,
  1,
  0,
  0,
  0,
  267,
  306,
  1,
  0,
  0,
  0,
  268,
  270,
  10,
  7,
  0,
  0,
  269,
  271,
  5,
  46,
  0,
  0,
  270,
  269,
  1,
  0,
  0,
  0,
  270,
  271,
  1,
  0,
  0,
  0,
  271,
  272,
  1,
  0,
  0,
  0,
  272,
  274,
  5,
  18,
  0,
  0,
  273,
  275,
  5,
  46,
  0,
  0,
  274,
  273,
  1,
  0,
  0,
  0,
  274,
  275,
  1,
  0,
  0,
  0,
  275,
  276,
  1,
  0,
  0,
  0,
  276,
  305,
  3,
  40,
  20,
  8,
  277,
  279,
  10,
  6,
  0,
  0,
  278,
  280,
  5,
  46,
  0,
  0,
  279,
  278,
  1,
  0,
  0,
  0,
  279,
  280,
  1,
  0,
  0,
  0,
  280,
  281,
  1,
  0,
  0,
  0,
  281,
  283,
  5,
  19,
  0,
  0,
  282,
  284,
  5,
  46,
  0,
  0,
  283,
  282,
  1,
  0,
  0,
  0,
  283,
  284,
  1,
  0,
  0,
  0,
  284,
  285,
  1,
  0,
  0,
  0,
  285,
  305,
  3,
  40,
  20,
  7,
  286,
  288,
  10,
  3,
  0,
  0,
  287,
  289,
  5,
  46,
  0,
  0,
  288,
  287,
  1,
  0,
  0,
  0,
  288,
  289,
  1,
  0,
  0,
  0,
  289,
  290,
  1,
  0,
  0,
  0,
  290,
  292,
  5,
  41,
  0,
  0,
  291,
  293,
  5,
  46,
  0,
  0,
  292,
  291,
  1,
  0,
  0,
  0,
  292,
  293,
  1,
  0,
  0,
  0,
  293,
  294,
  1,
  0,
  0,
  0,
  294,
  305,
  3,
  40,
  20,
  4,
  295,
  297,
  10,
  2,
  0,
  0,
  296,
  298,
  5,
  46,
  0,
  0,
  297,
  296,
  1,
  0,
  0,
  0,
  297,
  298,
  1,
  0,
  0,
  0,
  298,
  299,
  1,
  0,
  0,
  0,
  299,
  301,
  5,
  42,
  0,
  0,
  300,
  302,
  5,
  46,
  0,
  0,
  301,
  300,
  1,
  0,
  0,
  0,
  301,
  302,
  1,
  0,
  0,
  0,
  302,
  303,
  1,
  0,
  0,
  0,
  303,
  305,
  3,
  40,
  20,
  3,
  304,
  268,
  1,
  0,
  0,
  0,
  304,
  277,
  1,
  0,
  0,
  0,
  304,
  286,
  1,
  0,
  0,
  0,
  304,
  295,
  1,
  0,
  0,
  0,
  305,
  308,
  1,
  0,
  0,
  0,
  306,
  304,
  1,
  0,
  0,
  0,
  306,
  307,
  1,
  0,
  0,
  0,
  307,
  41,
  1,
  0,
  0,
  0,
  308,
  306,
  1,
  0,
  0,
  0,
  309,
  310,
  3,
  46,
  23,
  0,
  310,
  311,
  3,
  44,
  22,
  0,
  311,
  43,
  1,
  0,
  0,
  0,
  312,
  328,
  5,
  3,
  0,
  0,
  313,
  314,
  5,
  4,
  0,
  0,
  314,
  322,
  3,
  40,
  20,
  0,
  315,
  317,
  5,
  5,
  0,
  0,
  316,
  318,
  5,
  46,
  0,
  0,
  317,
  316,
  1,
  0,
  0,
  0,
  317,
  318,
  1,
  0,
  0,
  0,
  318,
  319,
  1,
  0,
  0,
  0,
  319,
  321,
  3,
  40,
  20,
  0,
  320,
  315,
  1,
  0,
  0,
  0,
  321,
  324,
  1,
  0,
  0,
  0,
  322,
  320,
  1,
  0,
  0,
  0,
  322,
  323,
  1,
  0,
  0,
  0,
  323,
  325,
  1,
  0,
  0,
  0,
  324,
  322,
  1,
  0,
  0,
  0,
  325,
  326,
  5,
  6,
  0,
  0,
  326,
  328,
  1,
  0,
  0,
  0,
  327,
  312,
  1,
  0,
  0,
  0,
  327,
  313,
  1,
  0,
  0,
  0,
  328,
  45,
  1,
  0,
  0,
  0,
  329,
  330,
  5,
  43,
  0,
  0,
  330,
  47,
  1,
  0,
  0,
  0,
  331,
  335,
  3,
  60,
  30,
  0,
  332,
  335,
  3,
  50,
  25,
  0,
  333,
  335,
  3,
  62,
  31,
  0,
  334,
  331,
  1,
  0,
  0,
  0,
  334,
  332,
  1,
  0,
  0,
  0,
  334,
  333,
  1,
  0,
  0,
  0,
  335,
  49,
  1,
  0,
  0,
  0,
  336,
  341,
  3,
  54,
  27,
  0,
  337,
  341,
  3,
  56,
  28,
  0,
  338,
  341,
  3,
  52,
  26,
  0,
  339,
  341,
  3,
  58,
  29,
  0,
  340,
  336,
  1,
  0,
  0,
  0,
  340,
  337,
  1,
  0,
  0,
  0,
  340,
  338,
  1,
  0,
  0,
  0,
  340,
  339,
  1,
  0,
  0,
  0,
  341,
  51,
  1,
  0,
  0,
  0,
  342,
  343,
  5,
  34,
  0,
  0,
  343,
  53,
  1,
  0,
  0,
  0,
  344,
  345,
  5,
  36,
  0,
  0,
  345,
  55,
  1,
  0,
  0,
  0,
  346,
  347,
  5,
  37,
  0,
  0,
  347,
  57,
  1,
  0,
  0,
  0,
  348,
  349,
  5,
  4,
  0,
  0,
  349,
  357,
  3,
  40,
  20,
  0,
  350,
  352,
  5,
  5,
  0,
  0,
  351,
  353,
  5,
  46,
  0,
  0,
  352,
  351,
  1,
  0,
  0,
  0,
  352,
  353,
  1,
  0,
  0,
  0,
  353,
  354,
  1,
  0,
  0,
  0,
  354,
  356,
  3,
  40,
  20,
  0,
  355,
  350,
  1,
  0,
  0,
  0,
  356,
  359,
  1,
  0,
  0,
  0,
  357,
  355,
  1,
  0,
  0,
  0,
  357,
  358,
  1,
  0,
  0,
  0,
  358,
  360,
  1,
  0,
  0,
  0,
  359,
  357,
  1,
  0,
  0,
  0,
  360,
  361,
  5,
  6,
  0,
  0,
  361,
  59,
  1,
  0,
  0,
  0,
  362,
  363,
  3,
  62,
  31,
  0,
  363,
  364,
  5,
  14,
  0,
  0,
  364,
  372,
  3,
  40,
  20,
  0,
  365,
  367,
  5,
  5,
  0,
  0,
  366,
  368,
  5,
  46,
  0,
  0,
  367,
  366,
  1,
  0,
  0,
  0,
  367,
  368,
  1,
  0,
  0,
  0,
  368,
  369,
  1,
  0,
  0,
  0,
  369,
  371,
  3,
  40,
  20,
  0,
  370,
  365,
  1,
  0,
  0,
  0,
  371,
  374,
  1,
  0,
  0,
  0,
  372,
  370,
  1,
  0,
  0,
  0,
  372,
  373,
  1,
  0,
  0,
  0,
  373,
  375,
  1,
  0,
  0,
  0,
  374,
  372,
  1,
  0,
  0,
  0,
  375,
  376,
  5,
  15,
  0,
  0,
  376,
  61,
  1,
  0,
  0,
  0,
  377,
  378,
  5,
  44,
  0,
  0,
  378,
  63,
  1,
  0,
  0,
  0,
  379,
  381,
  5,
  45,
  0,
  0,
  380,
  379,
  1,
  0,
  0,
  0,
  381,
  382,
  1,
  0,
  0,
  0,
  382,
  380,
  1,
  0,
  0,
  0,
  382,
  383,
  1,
  0,
  0,
  0,
  383,
  65,
  1,
  0,
  0,
  0,
  45,
  67,
  71,
  73,
  76,
  80,
  82,
  96,
  116,
  121,
  123,
  191,
  196,
  201,
  204,
  208,
  212,
  216,
  220,
  227,
  231,
  241,
  245,
  249,
  253,
  266,
  270,
  274,
  279,
  283,
  288,
  292,
  297,
  301,
  304,
  306,
  317,
  322,
  327,
  334,
  340,
  352,
  357,
  367,
  372,
  382
];
var atn2 = new antlr4_default.atn.ATNDeserializer().deserialize(serializedATN2);
var decisionsToDFA2 = atn2.decisionToState.map((ds, index) => new antlr4_default.dfa.DFA(ds, index));
var sharedContextCache = new antlr4_default.PredictionContextCache();
var _PseudoCodeParser = class extends antlr4_default.Parser {
  constructor(input) {
    super(input);
    this._interp = new antlr4_default.atn.ParserATNSimulator(this, atn2, decisionsToDFA2, sharedContextCache);
    this.ruleNames = _PseudoCodeParser.ruleNames;
    this.literalNames = _PseudoCodeParser.literalNames;
    this.symbolicNames = _PseudoCodeParser.symbolicNames;
  }
  get atn() {
    return atn2;
  }
  sempred(localctx, ruleIndex, predIndex) {
    switch (ruleIndex) {
      case 20:
        return this.expression_sempred(localctx, predIndex);
      default:
        throw "No predicate with index:" + ruleIndex;
    }
  }
  expression_sempred(localctx, predIndex) {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 7);
      case 1:
        return this.precpred(this._ctx, 6);
      case 2:
        return this.precpred(this._ctx, 3);
      case 3:
        return this.precpred(this._ctx, 2);
      default:
        throw "No predicate with index:" + predIndex;
    }
  }
  program() {
    let localctx = new ProgramContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, _PseudoCodeParser.RULE_program);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 67;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 66;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 71;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        this.state = 71;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 45:
            this.state = 69;
            this.newline();
            break;
          case 1:
          case 2:
          case 22:
          case 23:
          case 30:
          case 39:
          case 43:
          case 44:
            this.state = 70;
            this.statement();
            break;
          default:
            throw new antlr4_default.error.NoViableAltException(this);
        }
        this.state = 73;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while ((_la & ~31) == 0 && (1 << _la & 1086324742) !== 0 || (_la - 39 & ~31) == 0 && (1 << _la - 39 & 113) !== 0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  body() {
    let localctx = new BodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, _PseudoCodeParser.RULE_body);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 76;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 75;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 80;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        this.state = 80;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 1:
          case 2:
          case 22:
          case 23:
          case 30:
          case 39:
          case 43:
          case 44:
            this.state = 78;
            this.statement();
            break;
          case 45:
            this.state = 79;
            this.newline();
            break;
          default:
            throw new antlr4_default.error.NoViableAltException(this);
        }
        this.state = 82;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while ((_la & ~31) == 0 && (1 << _la & 1086324742) !== 0 || (_la - 39 & ~31) == 0 && (1 << _la - 39 & 113) !== 0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  statement() {
    let localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, _PseudoCodeParser.RULE_statement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 96;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);
      switch (la_) {
        case 1:
          this.state = 84;
          this.methodCallStatement();
          break;
        case 2:
          this.state = 85;
          this.ifStatement();
          break;
        case 3:
          this.state = 86;
          this.whileStatement();
          break;
        case 4:
          this.state = 87;
          this.doWhileStatement();
          break;
        case 5:
          this.state = 88;
          this.forStatement();
          break;
        case 6:
          this.state = 89;
          this.arrayElementAssignmentStatement();
          break;
        case 7:
          this.state = 90;
          this.arrayAssignmentStatement();
          break;
        case 8:
          this.state = 91;
          this.assignmentStatement();
          break;
        case 9:
          this.state = 92;
          this.returnStatement();
          break;
        case 10:
          this.state = 93;
          this.functionDeclarationStatement();
          break;
        case 11:
          this.state = 94;
          this.debugPrintStatement();
          break;
        case 12:
          this.state = 95;
          this.debug();
          break;
      }
      this.state = 98;
      this.newline();
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  debug() {
    let localctx = new DebugContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, _PseudoCodeParser.RULE_debug);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 100;
      this.match(_PseudoCodeParser.T__0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  debugPrintStatement() {
    let localctx = new DebugPrintStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, _PseudoCodeParser.RULE_debugPrintStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 102;
      this.match(_PseudoCodeParser.T__1);
      this.state = 103;
      this.match(_PseudoCodeParser.WS);
      this.state = 104;
      this.expression(0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  ifStatement() {
    let localctx = new IfStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, _PseudoCodeParser.RULE_ifStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 106;
      this.match(_PseudoCodeParser.HA);
      this.state = 107;
      this.match(_PseudoCodeParser.WS);
      this.state = 108;
      this.expression(0);
      this.state = 109;
      this.match(_PseudoCodeParser.WS);
      this.state = 110;
      this.match(_PseudoCodeParser.AKKOR);
      this.state = 111;
      this.newline();
      this.state = 112;
      this.body();
      this.state = 123;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 9, this._ctx);
      switch (la_) {
        case 1:
          this.state = 114;
          this._errHandler.sync(this);
          var _alt = 1;
          do {
            switch (_alt) {
              case 1:
                this.state = 113;
                this.elseIfBranch();
                break;
              default:
                throw new antlr4_default.error.NoViableAltException(this);
            }
            this.state = 116;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
          } while (_alt != 2 && _alt != antlr4_default.atn.ATN.INVALID_ALT_NUMBER);
          this.state = 118;
          this.elseBranch();
          break;
        case 2:
          this.state = 121;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          if (_la === 24) {
            this.state = 120;
            this.elseBranch();
          }
          break;
      }
      this.state = 125;
      this.match(_PseudoCodeParser.ELVEGE);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  elseIfBranch() {
    let localctx = new ElseIfBranchContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, _PseudoCodeParser.RULE_elseIfBranch);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 127;
      this.match(_PseudoCodeParser.KULONBEN);
      this.state = 128;
      this.match(_PseudoCodeParser.WS);
      this.state = 129;
      this.match(_PseudoCodeParser.HA);
      this.state = 130;
      this.match(_PseudoCodeParser.WS);
      this.state = 131;
      this.expression(0);
      this.state = 132;
      this.match(_PseudoCodeParser.WS);
      this.state = 133;
      this.match(_PseudoCodeParser.AKKOR);
      this.state = 134;
      this.newline();
      this.state = 135;
      this.body();
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  elseBranch() {
    let localctx = new ElseBranchContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, _PseudoCodeParser.RULE_elseBranch);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 137;
      this.match(_PseudoCodeParser.KULONBEN);
      this.state = 138;
      this.newline();
      this.state = 139;
      this.body();
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  whileStatement() {
    let localctx = new WhileStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, _PseudoCodeParser.RULE_whileStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 141;
      this.match(_PseudoCodeParser.CIKLUS);
      this.state = 142;
      this.match(_PseudoCodeParser.WS);
      this.state = 143;
      this.match(_PseudoCodeParser.AMIG);
      this.state = 144;
      this.match(_PseudoCodeParser.WS);
      this.state = 145;
      this.expression(0);
      this.state = 146;
      this.newline();
      this.state = 147;
      this.body();
      this.state = 148;
      this.match(_PseudoCodeParser.CVEGE);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  doWhileStatement() {
    let localctx = new DoWhileStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, _PseudoCodeParser.RULE_doWhileStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 150;
      this.match(_PseudoCodeParser.CIKLUS);
      this.state = 151;
      this.newline();
      this.state = 152;
      this.body();
      this.state = 153;
      this.match(_PseudoCodeParser.AMIG);
      this.state = 154;
      this.match(_PseudoCodeParser.WS);
      this.state = 155;
      this.expression(0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  forStatement() {
    let localctx = new ForStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, _PseudoCodeParser.RULE_forStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 157;
      this.match(_PseudoCodeParser.CIKLUS);
      this.state = 158;
      this.match(_PseudoCodeParser.WS);
      this.state = 159;
      this.variable();
      this.state = 160;
      this.match(_PseudoCodeParser.ASSIGN);
      this.state = 161;
      this.expression(0);
      this.state = 162;
      this.match(_PseudoCodeParser.CSTART);
      this.state = 163;
      this.match(_PseudoCodeParser.WS);
      this.state = 164;
      this.expression(0);
      this.state = 165;
      this.match(_PseudoCodeParser.CEND);
      this.state = 166;
      this.newline();
      this.state = 167;
      this.body();
      this.state = 168;
      this.match(_PseudoCodeParser.CVEGE);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  returnStatement() {
    let localctx = new ReturnStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, _PseudoCodeParser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 170;
      this.match(_PseudoCodeParser.VISSZA);
      this.state = 171;
      this.match(_PseudoCodeParser.WS);
      this.state = 172;
      this.expression(0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  methodCallStatement() {
    let localctx = new MethodCallStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, _PseudoCodeParser.RULE_methodCallStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 174;
      this.functionName();
      this.state = 175;
      this.parameters();
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  functionDeclarationStatement() {
    let localctx = new FunctionDeclarationStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, _PseudoCodeParser.RULE_functionDeclarationStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 177;
      this.match(_PseudoCodeParser.FUGGVENY);
      this.state = 178;
      this.match(_PseudoCodeParser.WS);
      this.state = 179;
      this.functionName();
      this.state = 180;
      this.parameterList();
      this.state = 181;
      this.newline();
      this.state = 182;
      this.body();
      this.state = 183;
      this.match(_PseudoCodeParser.FVEGE);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  parameterList() {
    let localctx = new ParameterListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, _PseudoCodeParser.RULE_parameterList);
    var _la = 0;
    try {
      this.state = 201;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 45:
          this.enterOuterAlt(localctx, 1);
          break;
        case 3:
          this.enterOuterAlt(localctx, 2);
          this.state = 186;
          this.match(_PseudoCodeParser.T__2);
          break;
        case 4:
          this.enterOuterAlt(localctx, 3);
          this.state = 187;
          this.match(_PseudoCodeParser.T__3);
          this.state = 188;
          this.parameterWithType();
          this.state = 196;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === 5) {
            this.state = 189;
            this.match(_PseudoCodeParser.T__4);
            this.state = 191;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 46) {
              this.state = 190;
              this.match(_PseudoCodeParser.WS);
            }
            this.state = 193;
            this.parameterWithType();
            this.state = 198;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          this.state = 199;
          this.match(_PseudoCodeParser.T__5);
          break;
        default:
          throw new antlr4_default.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  parameterWithType() {
    let localctx = new ParameterWithTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, _PseudoCodeParser.RULE_parameterWithType);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 204;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 45) {
        this.state = 203;
        this.newline();
      }
      this.state = 208;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 20) {
        this.state = 206;
        this.match(_PseudoCodeParser.CIMSZERINT);
        this.state = 207;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 210;
      this.variable();
      this.state = 212;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 211;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 214;
      this.match(_PseudoCodeParser.T__6);
      this.state = 216;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 215;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 218;
      this.type();
      this.state = 220;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 45) {
        this.state = 219;
        this.newline();
      }
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  type() {
    let localctx = new TypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, _PseudoCodeParser.RULE_type);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 222;
      _la = this._input.LA(1);
      if (!((_la & ~31) == 0 && (1 << _la & 16128) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  arrayElementAssignmentStatement() {
    let localctx = new ArrayElementAssignmentStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, _PseudoCodeParser.RULE_arrayElementAssignmentStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 224;
      this.variable();
      this.state = 225;
      this.match(_PseudoCodeParser.T__13);
      this.state = 227;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 226;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 229;
      this.expression(0);
      this.state = 231;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 230;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 233;
      this.match(_PseudoCodeParser.T__14);
      this.state = 234;
      this.match(_PseudoCodeParser.ASSIGN);
      this.state = 235;
      this.expression(0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  arrayAssignmentStatement() {
    let localctx = new ArrayAssignmentStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, _PseudoCodeParser.RULE_arrayAssignmentStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 237;
      this.variable();
      this.state = 238;
      this.match(_PseudoCodeParser.ASSIGN);
      this.state = 239;
      this.match(_PseudoCodeParser.T__15);
      this.state = 241;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 240;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 243;
      this.type();
      this.state = 245;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 244;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 247;
      this.match(_PseudoCodeParser.T__16);
      this.state = 249;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 248;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 251;
      this.expression(0);
      this.state = 253;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 252;
        this.match(_PseudoCodeParser.WS);
      }
      this.state = 255;
      this.match(_PseudoCodeParser.T__5);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  assignmentStatement() {
    let localctx = new AssignmentStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, _PseudoCodeParser.RULE_assignmentStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 257;
      this.variable();
      this.state = 258;
      this.match(_PseudoCodeParser.ASSIGN);
      this.state = 259;
      this.expression(0);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  expression(_p) {
    if (_p === void 0) {
      _p = 0;
    }
    const _parentctx = this._ctx;
    const _parentState = this.state;
    let localctx = new ExpressionContext(this, this._ctx, _parentState);
    let _prevctx = localctx;
    const _startState = 40;
    this.enterRecursionRule(localctx, 40, _PseudoCodeParser.RULE_expression, _p);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 266;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 43:
          localctx = new FunctionCallExpressionContext(this, localctx);
          this._ctx = localctx;
          _prevctx = localctx;
          this.state = 262;
          this.functionCall();
          break;
        case 35:
          localctx = new NotExpressionContext(this, localctx);
          this._ctx = localctx;
          _prevctx = localctx;
          this.state = 263;
          this.match(_PseudoCodeParser.NOT);
          this.state = 264;
          this.expression(4);
          break;
        case 4:
        case 34:
        case 36:
        case 37:
        case 44:
          localctx = new ValueExpressionContext(this, localctx);
          this._ctx = localctx;
          _prevctx = localctx;
          this.state = 265;
          this.value();
          break;
        default:
          throw new antlr4_default.error.NoViableAltException(this);
      }
      this._ctx.stop = this._input.LT(-1);
      this.state = 306;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
      while (_alt != 2 && _alt != antlr4_default.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          if (this._parseListeners !== null) {
            this.triggerExitRuleEvent();
          }
          _prevctx = localctx;
          this.state = 304;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 33, this._ctx);
          switch (la_) {
            case 1:
              localctx = new CalculationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
              this.pushNewRecursionContext(localctx, _startState, _PseudoCodeParser.RULE_expression);
              this.state = 268;
              if (!this.precpred(this._ctx, 7)) {
                throw new antlr4_default.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
              }
              this.state = 270;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 269;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 272;
              this.match(_PseudoCodeParser.OPERATOR);
              this.state = 274;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 273;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 276;
              this.expression(8);
              break;
            case 2:
              localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
              this.pushNewRecursionContext(localctx, _startState, _PseudoCodeParser.RULE_expression);
              this.state = 277;
              if (!this.precpred(this._ctx, 6)) {
                throw new antlr4_default.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
              }
              this.state = 279;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 278;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 281;
              this.match(_PseudoCodeParser.COMPARISON);
              this.state = 283;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 282;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 285;
              this.expression(7);
              break;
            case 3:
              localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
              this.pushNewRecursionContext(localctx, _startState, _PseudoCodeParser.RULE_expression);
              this.state = 286;
              if (!this.precpred(this._ctx, 3)) {
                throw new antlr4_default.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
              }
              this.state = 288;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 287;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 290;
              this.match(_PseudoCodeParser.ES);
              this.state = 292;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 291;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 294;
              this.expression(4);
              break;
            case 4:
              localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
              this.pushNewRecursionContext(localctx, _startState, _PseudoCodeParser.RULE_expression);
              this.state = 295;
              if (!this.precpred(this._ctx, 2)) {
                throw new antlr4_default.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
              }
              this.state = 297;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 296;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 299;
              this.match(_PseudoCodeParser.VAGY);
              this.state = 301;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 46) {
                this.state = 300;
                this.match(_PseudoCodeParser.WS);
              }
              this.state = 303;
              this.expression(3);
              break;
          }
        }
        this.state = 308;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
      }
    } catch (error) {
      if (error instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = error;
        this._errHandler.reportError(this, error);
        this._errHandler.recover(this, error);
      } else {
        throw error;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return localctx;
  }
  functionCall() {
    let localctx = new FunctionCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, _PseudoCodeParser.RULE_functionCall);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 309;
      this.functionName();
      this.state = 310;
      this.parameters();
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  parameters() {
    let localctx = new ParametersContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, _PseudoCodeParser.RULE_parameters);
    var _la = 0;
    try {
      this.state = 327;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 3:
          this.enterOuterAlt(localctx, 1);
          this.state = 312;
          this.match(_PseudoCodeParser.T__2);
          break;
        case 4:
          this.enterOuterAlt(localctx, 2);
          this.state = 313;
          this.match(_PseudoCodeParser.T__3);
          this.state = 314;
          this.expression(0);
          this.state = 322;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === 5) {
            this.state = 315;
            this.match(_PseudoCodeParser.T__4);
            this.state = 317;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 46) {
              this.state = 316;
              this.match(_PseudoCodeParser.WS);
            }
            this.state = 319;
            this.expression(0);
            this.state = 324;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          this.state = 325;
          this.match(_PseudoCodeParser.T__5);
          break;
        default:
          throw new antlr4_default.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  functionName() {
    let localctx = new FunctionNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, _PseudoCodeParser.RULE_functionName);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 329;
      this.match(_PseudoCodeParser.FUNCTION);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  value() {
    let localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, _PseudoCodeParser.RULE_value);
    try {
      this.state = 334;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 38, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 331;
          this.arrayIndex();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 332;
          this.atom();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 333;
          this.variable();
          break;
      }
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  atom() {
    let localctx = new AtomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, _PseudoCodeParser.RULE_atom);
    try {
      this.state = 340;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 36:
          this.enterOuterAlt(localctx, 1);
          this.state = 336;
          this.number();
          break;
        case 37:
          this.enterOuterAlt(localctx, 2);
          this.state = 337;
          this.bool();
          break;
        case 34:
          this.enterOuterAlt(localctx, 3);
          this.state = 338;
          this.string();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 339;
          this.arrayShorthand();
          break;
        default:
          throw new antlr4_default.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  string() {
    let localctx = new StringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, _PseudoCodeParser.RULE_string);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 342;
      this.match(_PseudoCodeParser.STRING);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  number() {
    let localctx = new NumberContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, _PseudoCodeParser.RULE_number);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 344;
      this.match(_PseudoCodeParser.NUMBER);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  bool() {
    let localctx = new BoolContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, _PseudoCodeParser.RULE_bool);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 346;
      this.match(_PseudoCodeParser.BOOL);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  arrayShorthand() {
    let localctx = new ArrayShorthandContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, _PseudoCodeParser.RULE_arrayShorthand);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 348;
      this.match(_PseudoCodeParser.T__3);
      this.state = 349;
      this.expression(0);
      this.state = 357;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 5) {
        this.state = 350;
        this.match(_PseudoCodeParser.T__4);
        this.state = 352;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 46) {
          this.state = 351;
          this.match(_PseudoCodeParser.WS);
        }
        this.state = 354;
        this.expression(0);
        this.state = 359;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 360;
      this.match(_PseudoCodeParser.T__5);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  arrayIndex() {
    let localctx = new ArrayIndexContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, _PseudoCodeParser.RULE_arrayIndex);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 362;
      this.variable();
      this.state = 363;
      this.match(_PseudoCodeParser.T__13);
      this.state = 364;
      this.expression(0);
      this.state = 372;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 5) {
        this.state = 365;
        this.match(_PseudoCodeParser.T__4);
        this.state = 367;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 46) {
          this.state = 366;
          this.match(_PseudoCodeParser.WS);
        }
        this.state = 369;
        this.expression(0);
        this.state = 374;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 375;
      this.match(_PseudoCodeParser.T__14);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  variable() {
    let localctx = new VariableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 62, _PseudoCodeParser.RULE_variable);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 377;
      this.match(_PseudoCodeParser.VARIABLE);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  newline() {
    let localctx = new NewlineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 64, _PseudoCodeParser.RULE_newline);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 380;
      this._errHandler.sync(this);
      var _alt = 1;
      do {
        switch (_alt) {
          case 1:
            this.state = 379;
            this.match(_PseudoCodeParser.NL);
            break;
          default:
            throw new antlr4_default.error.NoViableAltException(this);
        }
        this.state = 382;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 44, this._ctx);
      } while (_alt != 2 && _alt != antlr4_default.atn.ATN.INVALID_ALT_NUMBER);
    } catch (re) {
      if (re instanceof antlr4_default.error.RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
};
var PseudoCodeParser = _PseudoCodeParser;
__publicField(PseudoCodeParser, "grammarFileName", "java-escape");
__publicField(PseudoCodeParser, "literalNames", [
  null,
  "'debug'",
  "'kiir'",
  "'()'",
  "'('",
  "','",
  "')'",
  "':'",
  "'eg\\u00E9sz'",
  "'logikai'",
  "'sz\\u00F6veg'",
  "'eg\\u00E9sz t\\u00F6mb'",
  "'logikai t\\u00F6mb'",
  "'sz\\u00F6veg t\\u00F6mb'",
  "'['",
  "']'",
  "'L\\u00E9trehoz['",
  "']('",
  null,
  null,
  "'c\\u00EDmszerint'",
  "'am\\u00EDg'",
  null,
  null,
  "'k\\u00FCl\\u00F6nben'",
  "'akkor'",
  null,
  "'-ig'",
  "'ciklus v\\u00E9ge'",
  "'el\\u00E1gaz\\u00E1s v\\u00E9ge'",
  "'f\\u00FCggv\\u00E9ny'",
  "'f\\u00FCggv\\u00E9ny v\\u00E9ge'",
  null,
  "'<-'",
  null,
  "'~'",
  null,
  null,
  null,
  "'vissza'",
  null,
  "'/\\'",
  "'\\/'"
]);
__publicField(PseudoCodeParser, "symbolicNames", [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "OPERATOR",
  "COMPARISON",
  "CIMSZERINT",
  "AMIG",
  "CIKLUS",
  "HA",
  "KULONBEN",
  "AKKOR",
  "CSTART",
  "CEND",
  "CVEGE",
  "ELVEGE",
  "FUGGVENY",
  "FVEGE",
  "ASSIGN",
  "NYIL",
  "STRING",
  "NOT",
  "NUMBER",
  "BOOL",
  "IGAZ",
  "VISSZA",
  "HAMIS",
  "ES",
  "VAGY",
  "FUNCTION",
  "VARIABLE",
  "NL",
  "WS"
]);
__publicField(PseudoCodeParser, "ruleNames", [
  "program",
  "body",
  "statement",
  "debug",
  "debugPrintStatement",
  "ifStatement",
  "elseIfBranch",
  "elseBranch",
  "whileStatement",
  "doWhileStatement",
  "forStatement",
  "returnStatement",
  "methodCallStatement",
  "functionDeclarationStatement",
  "parameterList",
  "parameterWithType",
  "type",
  "arrayElementAssignmentStatement",
  "arrayAssignmentStatement",
  "assignmentStatement",
  "expression",
  "functionCall",
  "parameters",
  "functionName",
  "value",
  "atom",
  "string",
  "number",
  "bool",
  "arrayShorthand",
  "arrayIndex",
  "variable",
  "newline"
]);
PseudoCodeParser.EOF = antlr4_default.Token.EOF;
PseudoCodeParser.T__0 = 1;
PseudoCodeParser.T__1 = 2;
PseudoCodeParser.T__2 = 3;
PseudoCodeParser.T__3 = 4;
PseudoCodeParser.T__4 = 5;
PseudoCodeParser.T__5 = 6;
PseudoCodeParser.T__6 = 7;
PseudoCodeParser.T__7 = 8;
PseudoCodeParser.T__8 = 9;
PseudoCodeParser.T__9 = 10;
PseudoCodeParser.T__10 = 11;
PseudoCodeParser.T__11 = 12;
PseudoCodeParser.T__12 = 13;
PseudoCodeParser.T__13 = 14;
PseudoCodeParser.T__14 = 15;
PseudoCodeParser.T__15 = 16;
PseudoCodeParser.T__16 = 17;
PseudoCodeParser.OPERATOR = 18;
PseudoCodeParser.COMPARISON = 19;
PseudoCodeParser.CIMSZERINT = 20;
PseudoCodeParser.AMIG = 21;
PseudoCodeParser.CIKLUS = 22;
PseudoCodeParser.HA = 23;
PseudoCodeParser.KULONBEN = 24;
PseudoCodeParser.AKKOR = 25;
PseudoCodeParser.CSTART = 26;
PseudoCodeParser.CEND = 27;
PseudoCodeParser.CVEGE = 28;
PseudoCodeParser.ELVEGE = 29;
PseudoCodeParser.FUGGVENY = 30;
PseudoCodeParser.FVEGE = 31;
PseudoCodeParser.ASSIGN = 32;
PseudoCodeParser.NYIL = 33;
PseudoCodeParser.STRING = 34;
PseudoCodeParser.NOT = 35;
PseudoCodeParser.NUMBER = 36;
PseudoCodeParser.BOOL = 37;
PseudoCodeParser.IGAZ = 38;
PseudoCodeParser.VISSZA = 39;
PseudoCodeParser.HAMIS = 40;
PseudoCodeParser.ES = 41;
PseudoCodeParser.VAGY = 42;
PseudoCodeParser.FUNCTION = 43;
PseudoCodeParser.VARIABLE = 44;
PseudoCodeParser.NL = 45;
PseudoCodeParser.WS = 46;
PseudoCodeParser.RULE_program = 0;
PseudoCodeParser.RULE_body = 1;
PseudoCodeParser.RULE_statement = 2;
PseudoCodeParser.RULE_debug = 3;
PseudoCodeParser.RULE_debugPrintStatement = 4;
PseudoCodeParser.RULE_ifStatement = 5;
PseudoCodeParser.RULE_elseIfBranch = 6;
PseudoCodeParser.RULE_elseBranch = 7;
PseudoCodeParser.RULE_whileStatement = 8;
PseudoCodeParser.RULE_doWhileStatement = 9;
PseudoCodeParser.RULE_forStatement = 10;
PseudoCodeParser.RULE_returnStatement = 11;
PseudoCodeParser.RULE_methodCallStatement = 12;
PseudoCodeParser.RULE_functionDeclarationStatement = 13;
PseudoCodeParser.RULE_parameterList = 14;
PseudoCodeParser.RULE_parameterWithType = 15;
PseudoCodeParser.RULE_type = 16;
PseudoCodeParser.RULE_arrayElementAssignmentStatement = 17;
PseudoCodeParser.RULE_arrayAssignmentStatement = 18;
PseudoCodeParser.RULE_assignmentStatement = 19;
PseudoCodeParser.RULE_expression = 20;
PseudoCodeParser.RULE_functionCall = 21;
PseudoCodeParser.RULE_parameters = 22;
PseudoCodeParser.RULE_functionName = 23;
PseudoCodeParser.RULE_value = 24;
PseudoCodeParser.RULE_atom = 25;
PseudoCodeParser.RULE_string = 26;
PseudoCodeParser.RULE_number = 27;
PseudoCodeParser.RULE_bool = 28;
PseudoCodeParser.RULE_arrayShorthand = 29;
PseudoCodeParser.RULE_arrayIndex = 30;
PseudoCodeParser.RULE_variable = 31;
PseudoCodeParser.RULE_newline = 32;
var ProgramContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_program;
  }
  WS() {
    return this.getToken(PseudoCodeParser.WS, 0);
  }
  newline = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(NewlineContext);
    } else {
      return this.getTypedRuleContext(NewlineContext, i);
    }
  };
  statement = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(StatementContext);
    } else {
      return this.getTypedRuleContext(StatementContext, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterProgram(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitProgram(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitProgram(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var BodyContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_body;
  }
  WS() {
    return this.getToken(PseudoCodeParser.WS, 0);
  }
  statement = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(StatementContext);
    } else {
      return this.getTypedRuleContext(StatementContext, i);
    }
  };
  newline = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(NewlineContext);
    } else {
      return this.getTypedRuleContext(NewlineContext, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterBody(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitBody(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitBody(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var StatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_statement;
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  methodCallStatement() {
    return this.getTypedRuleContext(MethodCallStatementContext, 0);
  }
  ifStatement() {
    return this.getTypedRuleContext(IfStatementContext, 0);
  }
  whileStatement() {
    return this.getTypedRuleContext(WhileStatementContext, 0);
  }
  doWhileStatement() {
    return this.getTypedRuleContext(DoWhileStatementContext, 0);
  }
  forStatement() {
    return this.getTypedRuleContext(ForStatementContext, 0);
  }
  arrayElementAssignmentStatement() {
    return this.getTypedRuleContext(ArrayElementAssignmentStatementContext, 0);
  }
  arrayAssignmentStatement() {
    return this.getTypedRuleContext(ArrayAssignmentStatementContext, 0);
  }
  assignmentStatement() {
    return this.getTypedRuleContext(AssignmentStatementContext, 0);
  }
  returnStatement() {
    return this.getTypedRuleContext(ReturnStatementContext, 0);
  }
  functionDeclarationStatement() {
    return this.getTypedRuleContext(FunctionDeclarationStatementContext, 0);
  }
  debugPrintStatement() {
    return this.getTypedRuleContext(DebugPrintStatementContext, 0);
  }
  debug() {
    return this.getTypedRuleContext(DebugContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var DebugContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_debug;
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterDebug(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitDebug(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitDebug(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var DebugPrintStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_debugPrintStatement;
  }
  WS() {
    return this.getToken(PseudoCodeParser.WS, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterDebugPrintStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitDebugPrintStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitDebugPrintStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IfStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_ifStatement;
  }
  HA() {
    return this.getToken(PseudoCodeParser.HA, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  AKKOR() {
    return this.getToken(PseudoCodeParser.AKKOR, 0);
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  body() {
    return this.getTypedRuleContext(BodyContext, 0);
  }
  ELVEGE() {
    return this.getToken(PseudoCodeParser.ELVEGE, 0);
  }
  elseBranch() {
    return this.getTypedRuleContext(ElseBranchContext, 0);
  }
  elseIfBranch = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ElseIfBranchContext);
    } else {
      return this.getTypedRuleContext(ElseIfBranchContext, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterIfStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitIfStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitIfStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ElseIfBranchContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_elseIfBranch;
  }
  KULONBEN() {
    return this.getToken(PseudoCodeParser.KULONBEN, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  HA() {
    return this.getToken(PseudoCodeParser.HA, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  AKKOR() {
    return this.getToken(PseudoCodeParser.AKKOR, 0);
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  body() {
    return this.getTypedRuleContext(BodyContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterElseIfBranch(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitElseIfBranch(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitElseIfBranch(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ElseBranchContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_elseBranch;
  }
  KULONBEN() {
    return this.getToken(PseudoCodeParser.KULONBEN, 0);
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  body() {
    return this.getTypedRuleContext(BodyContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterElseBranch(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitElseBranch(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitElseBranch(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var WhileStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_whileStatement;
  }
  CIKLUS() {
    return this.getToken(PseudoCodeParser.CIKLUS, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  AMIG() {
    return this.getToken(PseudoCodeParser.AMIG, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  body() {
    return this.getTypedRuleContext(BodyContext, 0);
  }
  CVEGE() {
    return this.getToken(PseudoCodeParser.CVEGE, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterWhileStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitWhileStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitWhileStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var DoWhileStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_doWhileStatement;
  }
  CIKLUS() {
    return this.getToken(PseudoCodeParser.CIKLUS, 0);
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  body() {
    return this.getTypedRuleContext(BodyContext, 0);
  }
  AMIG() {
    return this.getToken(PseudoCodeParser.AMIG, 0);
  }
  WS() {
    return this.getToken(PseudoCodeParser.WS, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterDoWhileStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitDoWhileStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitDoWhileStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ForStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_forStatement;
  }
  CIKLUS() {
    return this.getToken(PseudoCodeParser.CIKLUS, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  variable() {
    return this.getTypedRuleContext(VariableContext, 0);
  }
  ASSIGN() {
    return this.getToken(PseudoCodeParser.ASSIGN, 0);
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  CSTART() {
    return this.getToken(PseudoCodeParser.CSTART, 0);
  }
  CEND() {
    return this.getToken(PseudoCodeParser.CEND, 0);
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  body() {
    return this.getTypedRuleContext(BodyContext, 0);
  }
  CVEGE() {
    return this.getToken(PseudoCodeParser.CVEGE, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterForStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitForStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitForStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ReturnStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_returnStatement;
  }
  VISSZA() {
    return this.getToken(PseudoCodeParser.VISSZA, 0);
  }
  WS() {
    return this.getToken(PseudoCodeParser.WS, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterReturnStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitReturnStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitReturnStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var MethodCallStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_methodCallStatement;
  }
  functionName() {
    return this.getTypedRuleContext(FunctionNameContext, 0);
  }
  parameters() {
    return this.getTypedRuleContext(ParametersContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterMethodCallStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitMethodCallStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitMethodCallStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionDeclarationStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_functionDeclarationStatement;
  }
  FUGGVENY() {
    return this.getToken(PseudoCodeParser.FUGGVENY, 0);
  }
  WS() {
    return this.getToken(PseudoCodeParser.WS, 0);
  }
  functionName() {
    return this.getTypedRuleContext(FunctionNameContext, 0);
  }
  parameterList() {
    return this.getTypedRuleContext(ParameterListContext, 0);
  }
  newline() {
    return this.getTypedRuleContext(NewlineContext, 0);
  }
  body() {
    return this.getTypedRuleContext(BodyContext, 0);
  }
  FVEGE() {
    return this.getToken(PseudoCodeParser.FVEGE, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterFunctionDeclarationStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitFunctionDeclarationStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitFunctionDeclarationStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ParameterListContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_parameterList;
  }
  parameterWithType = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ParameterWithTypeContext);
    } else {
      return this.getTypedRuleContext(ParameterWithTypeContext, i);
    }
  };
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterParameterList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitParameterList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitParameterList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ParameterWithTypeContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_parameterWithType;
  }
  variable() {
    return this.getTypedRuleContext(VariableContext, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  newline = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(NewlineContext);
    } else {
      return this.getTypedRuleContext(NewlineContext, i);
    }
  };
  CIMSZERINT() {
    return this.getToken(PseudoCodeParser.CIMSZERINT, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterParameterWithType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitParameterWithType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitParameterWithType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TypeContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_type;
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArrayElementAssignmentStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_arrayElementAssignmentStatement;
  }
  variable() {
    return this.getTypedRuleContext(VariableContext, 0);
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  ASSIGN() {
    return this.getToken(PseudoCodeParser.ASSIGN, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterArrayElementAssignmentStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitArrayElementAssignmentStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitArrayElementAssignmentStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArrayAssignmentStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_arrayAssignmentStatement;
  }
  variable() {
    return this.getTypedRuleContext(VariableContext, 0);
  }
  ASSIGN() {
    return this.getToken(PseudoCodeParser.ASSIGN, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterArrayAssignmentStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitArrayAssignmentStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitArrayAssignmentStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AssignmentStatementContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_assignmentStatement;
  }
  variable() {
    return this.getTypedRuleContext(VariableContext, 0);
  }
  ASSIGN() {
    return this.getToken(PseudoCodeParser.ASSIGN, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterAssignmentStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitAssignmentStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitAssignmentStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ExpressionContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_expression;
  }
  copyFrom(ctx) {
    super.copyFrom(ctx);
  }
};
var OrExpressionContext = class extends ExpressionContext {
  constructor(parser, ctx) {
    super(parser);
    super.copyFrom(ctx);
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  VAGY() {
    return this.getToken(PseudoCodeParser.VAGY, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterOrExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitOrExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitOrExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.OrExpressionContext = OrExpressionContext;
var ValueExpressionContext = class extends ExpressionContext {
  constructor(parser, ctx) {
    super(parser);
    super.copyFrom(ctx);
  }
  value() {
    return this.getTypedRuleContext(ValueContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterValueExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitValueExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitValueExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.ValueExpressionContext = ValueExpressionContext;
var AndExpressionContext = class extends ExpressionContext {
  constructor(parser, ctx) {
    super(parser);
    super.copyFrom(ctx);
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  ES() {
    return this.getToken(PseudoCodeParser.ES, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterAndExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitAndExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitAndExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.AndExpressionContext = AndExpressionContext;
var FunctionCallExpressionContext = class extends ExpressionContext {
  constructor(parser, ctx) {
    super(parser);
    super.copyFrom(ctx);
  }
  functionCall() {
    return this.getTypedRuleContext(FunctionCallContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterFunctionCallExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitFunctionCallExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitFunctionCallExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.FunctionCallExpressionContext = FunctionCallExpressionContext;
var NotExpressionContext = class extends ExpressionContext {
  constructor(parser, ctx) {
    super(parser);
    super.copyFrom(ctx);
  }
  NOT() {
    return this.getToken(PseudoCodeParser.NOT, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterNotExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitNotExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitNotExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.NotExpressionContext = NotExpressionContext;
var ComparisonExpressionContext = class extends ExpressionContext {
  constructor(parser, ctx) {
    super(parser);
    super.copyFrom(ctx);
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  COMPARISON() {
    return this.getToken(PseudoCodeParser.COMPARISON, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterComparisonExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitComparisonExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitComparisonExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.ComparisonExpressionContext = ComparisonExpressionContext;
var CalculationExpressionContext = class extends ExpressionContext {
  constructor(parser, ctx) {
    super(parser);
    super.copyFrom(ctx);
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  OPERATOR() {
    return this.getToken(PseudoCodeParser.OPERATOR, 0);
  }
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterCalculationExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitCalculationExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitCalculationExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.CalculationExpressionContext = CalculationExpressionContext;
var FunctionCallContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_functionCall;
  }
  functionName() {
    return this.getTypedRuleContext(FunctionNameContext, 0);
  }
  parameters() {
    return this.getTypedRuleContext(ParametersContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterFunctionCall(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitFunctionCall(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitFunctionCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ParametersContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_parameters;
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterParameters(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitParameters(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitParameters(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionNameContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_functionName;
  }
  FUNCTION() {
    return this.getToken(PseudoCodeParser.FUNCTION, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterFunctionName(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitFunctionName(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitFunctionName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ValueContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_value;
  }
  arrayIndex() {
    return this.getTypedRuleContext(ArrayIndexContext, 0);
  }
  atom() {
    return this.getTypedRuleContext(AtomContext, 0);
  }
  variable() {
    return this.getTypedRuleContext(VariableContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AtomContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_atom;
  }
  number() {
    return this.getTypedRuleContext(NumberContext, 0);
  }
  bool() {
    return this.getTypedRuleContext(BoolContext, 0);
  }
  string() {
    return this.getTypedRuleContext(StringContext, 0);
  }
  arrayShorthand() {
    return this.getTypedRuleContext(ArrayShorthandContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterAtom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitAtom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitAtom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var StringContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_string;
  }
  STRING() {
    return this.getToken(PseudoCodeParser.STRING, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterString(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitString(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitString(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var NumberContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_number;
  }
  NUMBER() {
    return this.getToken(PseudoCodeParser.NUMBER, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterNumber(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitNumber(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitNumber(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var BoolContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_bool;
  }
  BOOL() {
    return this.getToken(PseudoCodeParser.BOOL, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterBool(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitBool(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitBool(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArrayShorthandContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_arrayShorthand;
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterArrayShorthand(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitArrayShorthand(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitArrayShorthand(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArrayIndexContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_arrayIndex;
  }
  variable() {
    return this.getTypedRuleContext(VariableContext, 0);
  }
  expression = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };
  WS = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.WS);
    } else {
      return this.getToken(PseudoCodeParser.WS, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterArrayIndex(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitArrayIndex(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitArrayIndex(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var VariableContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_variable;
  }
  VARIABLE() {
    return this.getToken(PseudoCodeParser.VARIABLE, 0);
  }
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterVariable(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitVariable(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitVariable(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var NewlineContext = class extends antlr4_default.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PseudoCodeParser.RULE_newline;
  }
  NL = function(i) {
    if (i === void 0) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(PseudoCodeParser.NL);
    } else {
      return this.getToken(PseudoCodeParser.NL, i);
    }
  };
  enterRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.enterNewline(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof PseudoCodeListener) {
      listener.exitNewline(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof PseudoCodeVisitor) {
      return visitor.visitNewline(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
PseudoCodeParser.ProgramContext = ProgramContext;
PseudoCodeParser.BodyContext = BodyContext;
PseudoCodeParser.StatementContext = StatementContext;
PseudoCodeParser.DebugContext = DebugContext;
PseudoCodeParser.DebugPrintStatementContext = DebugPrintStatementContext;
PseudoCodeParser.IfStatementContext = IfStatementContext;
PseudoCodeParser.ElseIfBranchContext = ElseIfBranchContext;
PseudoCodeParser.ElseBranchContext = ElseBranchContext;
PseudoCodeParser.WhileStatementContext = WhileStatementContext;
PseudoCodeParser.DoWhileStatementContext = DoWhileStatementContext;
PseudoCodeParser.ForStatementContext = ForStatementContext;
PseudoCodeParser.ReturnStatementContext = ReturnStatementContext;
PseudoCodeParser.MethodCallStatementContext = MethodCallStatementContext;
PseudoCodeParser.FunctionDeclarationStatementContext = FunctionDeclarationStatementContext;
PseudoCodeParser.ParameterListContext = ParameterListContext;
PseudoCodeParser.ParameterWithTypeContext = ParameterWithTypeContext;
PseudoCodeParser.TypeContext = TypeContext;
PseudoCodeParser.ArrayElementAssignmentStatementContext = ArrayElementAssignmentStatementContext;
PseudoCodeParser.ArrayAssignmentStatementContext = ArrayAssignmentStatementContext;
PseudoCodeParser.AssignmentStatementContext = AssignmentStatementContext;
PseudoCodeParser.ExpressionContext = ExpressionContext;
PseudoCodeParser.FunctionCallContext = FunctionCallContext;
PseudoCodeParser.ParametersContext = ParametersContext;
PseudoCodeParser.FunctionNameContext = FunctionNameContext;
PseudoCodeParser.ValueContext = ValueContext;
PseudoCodeParser.AtomContext = AtomContext;
PseudoCodeParser.StringContext = StringContext;
PseudoCodeParser.NumberContext = NumberContext;
PseudoCodeParser.BoolContext = BoolContext;
PseudoCodeParser.ArrayShorthandContext = ArrayShorthandContext;
PseudoCodeParser.ArrayIndexContext = ArrayIndexContext;
PseudoCodeParser.VariableContext = VariableContext;
PseudoCodeParser.NewlineContext = NewlineContext;

// src/Stack.js
var TYPES = Object.freeze({
  number: "sz\xE1m",
  string: "sz\xF6veg",
  boolean: "logikai",
  array: "t\xF6mb",
  reference: "referencia"
});
var Value = class {
  #_value = null;
  #_type = null;
  constructor(v, t) {
    this.#_value = v;
    this.#_type = t;
  }
  set(value, type = null) {
    if (this.#_type === TYPES.reference) {
      this.#_value.set(value, type);
    } else {
      this.#_value = value;
      this.#_type = type !== null ? type : this.#_type;
    }
  }
  get value() {
    if (this.#_type === TYPES.reference) {
      return this.#_value.value;
    } else {
      return this.#_value;
    }
  }
  get type() {
    return this.#_type;
  }
  clone() {
    return new Value(this.#_value, this.#_type);
  }
  safe_get(expected_type) {
    if (this.#_type !== expected_type && this.#_type !== null) {
      throw new Error(
        `'${expected_type}' t\xEDpust v\xE1rtunk, de a v\xE1ltoz\xF3 '${this.#_type}' t\xEDpus\xFA volt!`
      );
    }
    return this.value;
  }
  convertToJSValue(val = this) {
    if (val.type == TYPES.array) {
      return val.value.map((innerVal) => this.convertToJSValue(innerVal));
    } else {
      return val.value;
    }
  }
  toString() {
    return JSON.stringify(this.convertToJSValue(this)).replaceAll("[", "(").replaceAll("]", ")").replaceAll("true", "Igaz").replaceAll("false", "Hamis");
  }
};
var Stack = class {
  #scopeBounds = [];
  get scopeBounds() {
    return this.#scopeBounds;
  }
  variables = [];
  parameterTypes = null;
  callbacks = null;
  constructor(parameterTypes, callbacks = null) {
    this.parameterTypes = parameterTypes;
    this.callbacks = callbacks;
  }
  get(key) {
    for (let i = this.variables.length - 1; i >= 0; i--) {
      if (this.#scopeBounds.findLast(
        (bound) => bound.isFunctionScope && bound.length == i + 1
      )) {
        return null;
      }
      if (this.variables[i].key == key) {
        return this.variables[i].value;
      }
    }
    return null;
  }
  set(key, value) {
    const existing_var = this.get(key);
    if (existing_var) {
      existing_var.set(value.value, value.type);
      this.callbacks?.variableSet?.(this.variables);
    } else {
      const newVar = {
        key,
        value
      };
      this.variables.push(newVar);
      this.callbacks?.variableSet?.(this.variables);
    }
  }
  create_reference(key, variable) {
    this.set(key, variable, TYPES.reference);
  }
  enterBasicScope(isFunc = false) {
    this.#scopeBounds.push({
      length: this.variables.length,
      isFunctionScope: isFunc
    });
  }
  leaveBasicScope(isFunc = false) {
    let current_bound = this.#scopeBounds.pop();
    while (isFunc && !current_bound.isFunctionScope) {
      current_bound = this.#scopeBounds.pop();
    }
    const length_diff = this.variables.length - current_bound.length;
    this.variables.splice(this.variables.length - length_diff, length_diff);
    this.callbacks?.scopeLeave?.(this.variables);
  }
  enterFunctionScope(functionName, parameters) {
    this.enterBasicScope(true);
    const parameterTypes = this.parameterTypes.get(functionName);
    parameters.forEach((parameter, index) => {
      const current_type = parameterTypes[index];
      if (current_type.reference) {
        this.create_reference(current_type.name, parameter);
      } else {
        this.set(current_type.name, parameter, current_type.type);
      }
    });
  }
  leaveFunctionScope() {
    this.leaveBasicScope();
  }
};

// src/LinearGenerator.js
var LinearGenerator = class extends PseudoCodeVisitor {
  output = {
    code: [],
    parameterTypes: /* @__PURE__ */ new Map()
  };
  contextID = 0;
  lineNum = 1;
  createOp(opcode, payload = null) {
    this.output.code.push({
      opcode,
      payload,
      lineNum: this.lineNum
    });
  }
  _assemble(ctx, ops) {
    ops.forEach(([opcode, payload, maybe_arg]) => {
      switch (opcode) {
        case "VISIT":
          let arg = Number.isNaN(Number(maybe_arg)) ? void 0 : Number(maybe_arg);
          if (ctx && ctx[payload]) {
            const newCtx = ctx[payload](arg);
            if (newCtx) {
              this.visit(newCtx);
            }
          }
          break;
        case "NL":
        case "NEWLINE":
          this.visitNewline(ctx.newline());
          break;
        default:
          this.createOp(opcode, payload);
          break;
      }
    });
  }
  assemble(ctx, input) {
    const ops = input.split(/\n|;/).map((line) => line.trim().split(" ")).filter((x) => x[0] != "");
    this._assemble(ctx, ops);
  }
  visitNewline(ctx) {
    const nls = ctx.NL().length;
    this.lineNum += nls;
  }
  visitDebug(ctx) {
    this.createOp("debug");
  }
  visitMethodCallStatement(ctx) {
    this.visitFunctionCall(ctx);
  }
  visitReturnStatement(ctx) {
    this.assemble(
      ctx,
      `
            VISIT expression;
            ret
        `
    );
  }
  visitFunctionCall(ctx) {
    const fName = ctx.functionName().getText();
    this.assemble(
      ctx,
      `
            VISIT parameters; 
            functionCall ${fName}
        `
    );
  }
  visitParameterWithType(ctx) {
    this.assemble(
      ctx,
      `
            VISIT newline 0
            VISIT newline 1
        `
    );
    return {
      name: ctx.variable().getText(),
      reference: ctx.CIMSZERINT() !== null,
      type: ctx.type().getText()
    };
  }
  visitParameterList(ctx) {
    const params = ctx.parameterWithType()?.map((p) => this.visitParameterWithType(p));
    if (params) {
      const fName = ctx.parentCtx.functionName().getText();
      this.output.parameterTypes.set(fName, params);
    }
  }
  visitFunctionDeclarationStatement(ctx) {
    const fName = ctx.functionName().getText();
    this.assemble(
      ctx,
      `
            functionDef ${fName}; 
            VISIT parameterList
            NL
            VISIT body; 
            functionEnd ${fName}
        `
    );
  }
  visitDebugPrintStatement(ctx) {
    this.assemble(
      ctx,
      `
            VISIT expression
            print
        `
    );
  }
  visitIfStatement(ctx) {
    this.contextID++;
    this.assemble(
      ctx,
      `
            enterScope
            VISIT expression
            if ${this.contextID}
            NL
            VISIT body
            jmp ${this.contextID}
            VISIT elseIfBranch
            VISIT elseBranch
            endIf ${this.contextID}
            exitScope
        `
    );
    this.contextID--;
  }
  visitElseBranch(ctx) {
    this.assemble(
      ctx,
      `
            else ${this.contextID}
            NL
            VISIT body
        `
    );
  }
  visitElseIfBranch(ctx) {
    this.assemble(
      ctx,
      `
            VISIT expression
            elIf ${this.contextID}
            NL
            VISIT body
            jmp ${this.contextID}
        `
    );
  }
  visitWhileStatement(ctx) {
    this.contextID++;
    this.assemble(
      ctx,
      `
            enterScope
            whilePrep ${this.contextID}
            VISIT expression
            while ${this.contextID}
            NL
            VISIT body
            loop ${this.contextID}
            exitScope
        `
    );
    this.contextID--;
  }
  visitForStatement(ctx) {
    const varname = ctx.variable().getText();
    this.contextID++;
    this.assemble(
      ctx,
      `
            enterScope
            VISIT expression 0
            assign ${varname}

            whilePrep ${this.contextID}

            pushVar ${varname}
            VISIT expression 1
            compare <=

            while ${this.contextID}
            NL
            VISIT body
        `
    );
    this.createOp("push", 1);
    this.assemble(
      ctx,
      `
            pushVar ${varname}
            calculate +
            assign ${varname}

            loop ${this.contextID}

            exitScope
        `
    );
    this.contextID--;
  }
  visitNotExpression(ctx) {
    this.assemble(
      ctx,
      `
        VISIT expression
        not
      `
    );
  }
  visitComparisonExpression(ctx) {
    const comparer = ctx.COMPARISON().getText();
    this.assemble(
      ctx,
      `
            VISIT expression 0
            VISIT expression 1
            compare ${comparer}
        `
    );
  }
  visitCalculationExpression(ctx) {
    const operator = ctx.OPERATOR().getText();
    this.assemble(
      ctx,
      `
            VISIT expression 0
            VISIT expression 1
            calculate ${operator}
        `
    );
  }
  visitArrayElementAssignmentStatement(ctx) {
    const varname = ctx.variable().getText();
    this.assemble(
      ctx,
      `
            pushVar ${varname}
            VISIT expression 0
            VISIT expression 1
            setElement ${varname}
        `
    );
  }
  visitArrayAssignmentStatement(ctx) {
    const varname = ctx.variable().getText();
    const typeName = ctx.type().getText();
    this.visit(ctx.expression());
    this.createOp("create_array", typeName);
    this.createOp("assign", varname);
  }
  visitArrayIndex(ctx) {
    const varname = ctx.variable().getText();
    this.assemble(
      ctx,
      `
            VISIT expression
            pushVar ${varname}
            index ${ctx.expression().length}
        `
    );
  }
  visitArrayShorthand(ctx) {
    this.assemble(
      ctx,
      `
            VISIT expression
            array ${ctx.expression().length}
        `
    );
  }
  visitAssignmentStatement(ctx) {
    const varname = ctx.variable().getText();
    this.assemble(
      ctx,
      `
            VISIT expression
            assign ${varname}
        `
    );
  }
  visitVariable(ctx) {
    const varname = ctx.getText();
    this.createOp("pushVar", varname);
  }
  visitNumber(ctx) {
    const num = Number(ctx.getText());
    this.createOp("push", num);
  }
  visitBool(ctx) {
    const bool = ctx.getText().toLowerCase() == "igaz";
    this.createOp("push", bool);
  }
  visitString(ctx) {
    const str = String(ctx.getText().replaceAll('"', ""));
    this.createOp("push", str);
  }
};
var LinearExecutor = class {
  ip = 0;
  ipStack = [];
  instructions = [];
  stack = [];
  variables = null;
  parameterTypes = null;
  constructor(environment, callbacks) {
    this.instructions = environment.code;
    this.parameterTypes = environment.parameterTypes;
    this.callbacks = callbacks;
    this.variables = new Stack(this.parameterTypes, callbacks);
    callbacks?.boot?.(this.instructions);
  }
  currentOpcode() {
    return this.instructions[this.ip].opcode;
  }
  currentPayload() {
    return this.instructions[this.ip].payload;
  }
  #skip(opcodes, payload, direction, full = false) {
    if (full) {
      this.ip = 0;
    }
    const checkPayload = () => payload == null ? false : this.currentPayload() != payload;
    const checkOpcode = Array.isArray(opcodes) ? () => !opcodes.includes(this.currentOpcode()) : () => this.currentOpcode() != opcodes;
    while (checkOpcode() || checkPayload()) {
      this.ip += direction;
    }
  }
  fullSeek(opcode, payload) {
    this.#skip(opcode, payload, 1, true);
  }
  skipTo(opcodes, payload) {
    this.#skip(opcodes, payload, 1);
  }
  skipBack(opcodes, payload) {
    this.#skip(opcodes, payload, -1);
  }
  popStack() {
    if (this.stack.length > 0) {
      this.callbacks.popStack?.();
      return this.stack.pop();
    }
  }
  pushStack(value) {
    this.callbacks.pushStack?.(value);
    this.stack.push(value);
  }
  execute(instruction) {
    const { opcode, payload } = instruction;
    switch (opcode) {
      case "debug":
        return true;
      case "print":
        this.callbacks.output?.(this.popStack());
        break;
      case "push":
        this.pushStack(new Value(payload, null));
        break;
      case "create_array":
        {
          const defaultValue = (() => {
            switch (payload) {
              case "eg\xE9sz":
                return [Number(), TYPES.number];
              case "sz\xF6veg":
                return [String(), TYPES.string];
              case "logikai":
                return [Boolean(), TYPES.boolean];
            }
          })();
          const length = this.popStack().safe_get(TYPES.number);
          const values = Array.from(
            Array(length),
            () => new Value(...defaultValue)
          );
          this.pushStack(new Value(values, TYPES.array));
        }
        break;
      case "not":
        const value = this.popStack().safe_get(TYPES.boolean);
        this.pushStack(new Value(!value, TYPES.boolean));
        break;
      case "compare":
        {
          const exp2 = this.popStack().safe_get(TYPES.number);
          const exp1 = this.popStack().safe_get(TYPES.number);
          this.pushStack(
            new Value(
              (() => {
                switch (payload) {
                  case "=":
                    return exp1 === exp2;
                  case "=/=":
                    return exp1 !== exp2;
                  case ">":
                    return exp1 > exp2;
                  case "<":
                    return exp1 < exp2;
                  case ">=":
                    return exp1 >= exp2;
                  case "<=":
                    return exp1 <= exp2;
                  default:
                    return false;
                }
              })(),
              TYPES.boolean
            )
          );
        }
        break;
      case "calculate":
        {
          const exp2 = this.popStack().safe_get(TYPES.number);
          const exp1 = this.popStack().safe_get(TYPES.number);
          this.pushStack(
            new Value(
              (() => {
                switch (payload) {
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
                    return 0;
                }
              })(),
              TYPES.number
            )
          );
        }
        break;
      case "setElement":
        {
          const value2 = this.popStack();
          const index = this.popStack().safe_get(TYPES.number) - 1;
          const array = this.popStack().safe_get(TYPES.array);
          array[index] = value2.clone();
          this.variables.set(payload, new Value(array, TYPES.array));
        }
        break;
      case "index":
        {
          let array = this.popStack();
          let indices = [];
          for (let i = 0; i < payload; i++) {
            indices.push(this.popStack().safe_get(TYPES.number) - 1);
          }
          indices.reverse();
          let val2 = indices.reduce((prev, index) => {
            return prev.safe_get(TYPES.array)[index];
          }, array);
          this.pushStack(val2);
        }
        break;
      case "array":
        let arr = [];
        for (let i = 0; i < payload; i++) {
          arr.push(this.popStack());
        }
        arr.reverse();
        this.pushStack(new Value(arr, TYPES.array));
        break;
      case "elIf":
      case "if":
        const predicate = this.popStack().safe_get(TYPES.boolean);
        if (!predicate) {
          this.skipTo(["jmp", "else"], payload);
          if (this.instructions[this.ip + 1].opcode == "else")
            this.ip++;
        }
        break;
      case "jmp":
      case "else":
        this.skipTo("endIf", payload);
        this.ip--;
        break;
      case "while":
        const should = this.popStack().safe_get(TYPES.boolean);
        if (!should) {
          this.skipTo("loop", payload);
        }
        break;
      case "loop":
        this.skipBack("whilePrep", payload);
        break;
      case "enterScope":
        this.variables.enterBasicScope();
        break;
      case "exitScope":
        this.variables.leaveBasicScope();
        break;
      case "functionDef":
        this.skipTo("functionEnd", payload);
        break;
      case "ret":
      case "functionEnd":
        this.ip = this.ipStack.pop();
        this.variables.leaveBasicScope(true);
        this?.callbacks?.funcEnd?.();
        break;
      case "functionCall":
        this.ipStack.push(this.ip);
        this.variables.enterBasicScope(true);
        const parameters = this.parameterTypes.get(payload);
        if (parameters) {
          for (let i = parameters.length - 1; i >= 0; i--) {
            let paramType = parameters[i];
            if (paramType.reference) {
              this.variables.create_reference(paramType.name, this.popStack());
            } else {
              this.variables.set(paramType.name, this.popStack());
            }
          }
        }
        this?.callbacks?.funcCall(payload, this.ip);
        this.fullSeek("functionDef", payload);
        break;
      case "assign":
        const val = this.popStack();
        this.variables.set(payload, val.clone());
        break;
      case "pushVar":
        this.pushStack(this.variables.get(payload));
        break;
    }
    return false;
  }
  step() {
    if (this.ip < this.instructions.length) {
      const current_instruction = this.instructions[this.ip];
      const retval = this.execute(current_instruction);
      this.ip++;
      this?.callbacks?.step?.(this.ip);
      return retval;
    }
    return true;
  }
  stepLine() {
    const current_line = this.instructions[this.ip].lineNum;
    while (this.ip < this.instructions.length && this.instructions[this.ip].lineNum == current_line) {
      if (this.step())
        return;
    }
  }
  run() {
    while (this.ip < this.instructions.length) {
      if (this.step())
        return;
    }
  }
  reset() {
    this.variables = new Stack(this.parameterTypes, this.callbacks);
    this.stack = [];
    this.ip = 0;
  }
};

// src/index.js
function generateAST(input) {
  const chars = new antlr4_default.InputStream(input + "\n");
  const lexer = new PseudoCodeLexer(chars);
  const tokens = new antlr4_default.CommonTokenStream(lexer);
  const parser = new PseudoCodeParser(tokens);
  const tree = parser.program();
  return tree;
}
function generateLinearEnvironment(input) {
  const tree = generateAST(input);
  const generator = new LinearGenerator();
  generator.visit(tree);
  return generator.output;
}
function runLinear(input, outputFunc) {
  const env = generateLinearEnvironment(input);
  const executor = new LinearExecutor(env, outputFunc);
  executor.run();
}
export {
  LinearExecutor,
  generateLinearEnvironment,
  runLinear
};
/*! https://mths.be/codepointat v0.2.0 by @mathias */
/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
//# sourceMappingURL=esbundle.js.map