// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import PseudoCodeListener from './PseudoCodeListener.js';
import PseudoCodeVisitor from './PseudoCodeVisitor.js';

const serializedATN = [4,1,45,290,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,1,0,4,0,66,8,0,11,0,12,0,67,
1,1,5,1,71,8,1,10,1,12,1,74,9,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
1,2,1,2,1,2,3,2,89,8,2,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,
6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,5,6,116,8,6,10,6,12,6,
119,9,6,1,6,1,6,1,6,3,6,124,8,6,1,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,9,
1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,
11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,13,1,13,1,13,1,14,1,14,1,14,1,14,
1,14,1,14,5,14,168,8,14,10,14,12,14,171,9,14,1,14,1,14,1,14,1,14,1,14,1,
14,1,14,1,14,1,14,1,14,3,14,183,8,14,1,15,3,15,186,8,15,1,15,1,15,1,15,1,
15,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,
1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,3,20,218,8,20,
1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,5,20,232,8,20,
10,20,12,20,235,9,20,1,21,1,21,1,21,1,22,1,22,1,22,1,22,1,22,5,22,245,8,
22,10,22,12,22,248,9,22,1,22,1,22,3,22,252,8,22,1,23,1,23,1,24,1,24,1,24,
3,24,259,8,24,1,25,1,25,1,25,1,25,3,25,265,8,25,1,26,1,26,1,27,1,27,1,28,
1,28,1,29,1,29,1,29,1,29,4,29,277,8,29,11,29,12,29,278,1,29,1,29,1,30,1,
30,1,30,1,30,1,30,1,31,1,31,1,31,0,1,40,32,0,2,4,6,8,10,12,14,16,18,20,22,
24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,0,1,1,0,9,14,
291,0,65,1,0,0,0,2,72,1,0,0,0,4,88,1,0,0,0,6,90,1,0,0,0,8,92,1,0,0,0,10,
95,1,0,0,0,12,123,1,0,0,0,14,125,1,0,0,0,16,131,1,0,0,0,18,134,1,0,0,0,20,
140,1,0,0,0,22,145,1,0,0,0,24,155,1,0,0,0,26,158,1,0,0,0,28,182,1,0,0,0,
30,185,1,0,0,0,32,191,1,0,0,0,34,193,1,0,0,0,36,200,1,0,0,0,38,208,1,0,0,
0,40,217,1,0,0,0,42,236,1,0,0,0,44,251,1,0,0,0,46,253,1,0,0,0,48,258,1,0,
0,0,50,264,1,0,0,0,52,266,1,0,0,0,54,268,1,0,0,0,56,270,1,0,0,0,58,272,1,
0,0,0,60,282,1,0,0,0,62,287,1,0,0,0,64,66,3,4,2,0,65,64,1,0,0,0,66,67,1,
0,0,0,67,65,1,0,0,0,67,68,1,0,0,0,68,1,1,0,0,0,69,71,3,4,2,0,70,69,1,0,0,
0,71,74,1,0,0,0,72,70,1,0,0,0,72,73,1,0,0,0,73,3,1,0,0,0,74,72,1,0,0,0,75,
89,3,10,5,0,76,89,3,26,13,0,77,89,3,12,6,0,78,89,3,18,9,0,79,89,3,20,10,
0,80,89,3,22,11,0,81,89,3,34,17,0,82,89,3,36,18,0,83,89,3,38,19,0,84,89,
3,24,12,0,85,89,3,28,14,0,86,89,3,8,4,0,87,89,3,6,3,0,88,75,1,0,0,0,88,76,
1,0,0,0,88,77,1,0,0,0,88,78,1,0,0,0,88,79,1,0,0,0,88,80,1,0,0,0,88,81,1,
0,0,0,88,82,1,0,0,0,88,83,1,0,0,0,88,84,1,0,0,0,88,85,1,0,0,0,88,86,1,0,
0,0,88,87,1,0,0,0,89,5,1,0,0,0,90,91,5,1,0,0,91,7,1,0,0,0,92,93,5,2,0,0,
93,94,3,40,20,0,94,9,1,0,0,0,95,96,5,3,0,0,96,11,1,0,0,0,97,98,5,24,0,0,
98,99,3,40,20,0,99,100,5,26,0,0,100,101,3,2,1,0,101,102,5,30,0,0,102,124,
1,0,0,0,103,104,5,24,0,0,104,105,3,40,20,0,105,106,5,26,0,0,106,107,3,2,
1,0,107,108,3,16,8,0,108,109,5,30,0,0,109,124,1,0,0,0,110,111,5,24,0,0,111,
112,3,40,20,0,112,113,5,26,0,0,113,117,3,2,1,0,114,116,3,14,7,0,115,114,
1,0,0,0,116,119,1,0,0,0,117,115,1,0,0,0,117,118,1,0,0,0,118,120,1,0,0,0,
119,117,1,0,0,0,120,121,3,16,8,0,121,122,5,30,0,0,122,124,1,0,0,0,123,97,
1,0,0,0,123,103,1,0,0,0,123,110,1,0,0,0,124,13,1,0,0,0,125,126,5,25,0,0,
126,127,5,24,0,0,127,128,3,40,20,0,128,129,5,26,0,0,129,130,3,2,1,0,130,
15,1,0,0,0,131,132,5,25,0,0,132,133,3,2,1,0,133,17,1,0,0,0,134,135,5,23,
0,0,135,136,5,22,0,0,136,137,3,40,20,0,137,138,3,2,1,0,138,139,5,29,0,0,
139,19,1,0,0,0,140,141,5,23,0,0,141,142,3,2,1,0,142,143,5,22,0,0,143,144,
3,40,20,0,144,21,1,0,0,0,145,146,5,23,0,0,146,147,3,62,31,0,147,148,5,33,
0,0,148,149,3,40,20,0,149,150,5,27,0,0,150,151,3,40,20,0,151,152,5,28,0,
0,152,153,3,2,1,0,153,154,5,29,0,0,154,23,1,0,0,0,155,156,5,39,0,0,156,157,
3,40,20,0,157,25,1,0,0,0,158,159,3,46,23,0,159,160,3,44,22,0,160,27,1,0,
0,0,161,162,5,31,0,0,162,163,3,46,23,0,163,164,5,4,0,0,164,169,3,30,15,0,
165,166,5,5,0,0,166,168,3,30,15,0,167,165,1,0,0,0,168,171,1,0,0,0,169,167,
1,0,0,0,169,170,1,0,0,0,170,172,1,0,0,0,171,169,1,0,0,0,172,173,5,6,0,0,
173,174,3,2,1,0,174,175,5,32,0,0,175,183,1,0,0,0,176,177,5,31,0,0,177,178,
3,46,23,0,178,179,5,7,0,0,179,180,3,2,1,0,180,181,5,32,0,0,181,183,1,0,0,
0,182,161,1,0,0,0,182,176,1,0,0,0,183,29,1,0,0,0,184,186,5,21,0,0,185,184,
1,0,0,0,185,186,1,0,0,0,186,187,1,0,0,0,187,188,3,62,31,0,188,189,5,8,0,
0,189,190,3,32,16,0,190,31,1,0,0,0,191,192,7,0,0,0,192,33,1,0,0,0,193,194,
3,62,31,0,194,195,5,15,0,0,195,196,3,40,20,0,196,197,5,16,0,0,197,198,5,
33,0,0,198,199,3,40,20,0,199,35,1,0,0,0,200,201,3,62,31,0,201,202,5,33,0,
0,202,203,5,17,0,0,203,204,3,32,16,0,204,205,5,18,0,0,205,206,3,40,20,0,
206,207,5,6,0,0,207,37,1,0,0,0,208,209,3,62,31,0,209,210,5,33,0,0,210,211,
3,40,20,0,211,39,1,0,0,0,212,213,6,20,-1,0,213,218,3,42,21,0,214,215,5,35,
0,0,215,218,3,40,20,4,216,218,3,48,24,0,217,212,1,0,0,0,217,214,1,0,0,0,
217,216,1,0,0,0,218,233,1,0,0,0,219,220,10,7,0,0,220,221,5,19,0,0,221,232,
3,40,20,8,222,223,10,6,0,0,223,224,5,20,0,0,224,232,3,40,20,7,225,226,10,
3,0,0,226,227,5,41,0,0,227,232,3,40,20,4,228,229,10,2,0,0,229,230,5,42,0,
0,230,232,3,40,20,3,231,219,1,0,0,0,231,222,1,0,0,0,231,225,1,0,0,0,231,
228,1,0,0,0,232,235,1,0,0,0,233,231,1,0,0,0,233,234,1,0,0,0,234,41,1,0,0,
0,235,233,1,0,0,0,236,237,3,46,23,0,237,238,3,44,22,0,238,43,1,0,0,0,239,
252,5,7,0,0,240,241,5,4,0,0,241,246,3,40,20,0,242,243,5,5,0,0,243,245,3,
40,20,0,244,242,1,0,0,0,245,248,1,0,0,0,246,244,1,0,0,0,246,247,1,0,0,0,
247,249,1,0,0,0,248,246,1,0,0,0,249,250,5,6,0,0,250,252,1,0,0,0,251,239,
1,0,0,0,251,240,1,0,0,0,252,45,1,0,0,0,253,254,5,43,0,0,254,47,1,0,0,0,255,
259,3,60,30,0,256,259,3,50,25,0,257,259,3,62,31,0,258,255,1,0,0,0,258,256,
1,0,0,0,258,257,1,0,0,0,259,49,1,0,0,0,260,265,3,54,27,0,261,265,3,56,28,
0,262,265,3,52,26,0,263,265,3,58,29,0,264,260,1,0,0,0,264,261,1,0,0,0,264,
262,1,0,0,0,264,263,1,0,0,0,265,51,1,0,0,0,266,267,5,34,0,0,267,53,1,0,0,
0,268,269,5,36,0,0,269,55,1,0,0,0,270,271,5,37,0,0,271,57,1,0,0,0,272,273,
5,4,0,0,273,276,3,40,20,0,274,275,5,5,0,0,275,277,3,40,20,0,276,274,1,0,
0,0,277,278,1,0,0,0,278,276,1,0,0,0,278,279,1,0,0,0,279,280,1,0,0,0,280,
281,5,6,0,0,281,59,1,0,0,0,282,283,3,62,31,0,283,284,5,15,0,0,284,285,3,
40,20,0,285,286,5,16,0,0,286,61,1,0,0,0,287,288,5,44,0,0,288,63,1,0,0,0,
16,67,72,88,117,123,169,182,185,217,231,233,246,251,258,264,278];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class PseudoCodeParser extends antlr4.Parser {

    static grammarFileName = "java-escape";
    static literalNames = [ null, "'debug'", "'kiir'", "'v\\u00E1ltoz\\u00F3k'", 
                            "'('", "','", "')'", "'()'", "':'", "'eg\\u00E9sz'", 
                            "'logikai'", "'sz\\u00F6veg'", "'eg\\u00E9sz t\\u00F6mb'", 
                            "'logikai t\\u00F6mb'", "'sz\\u00F6veg t\\u00F6mb'", 
                            "'['", "']'", "'L\\u00E9trehoz['", "']('", null, 
                            null, "'c\\u00EDmszerint'", "'am\\u00EDg'", 
                            null, null, "'k\\u00FCl\\u00F6nben'", "'akkor'", 
                            null, "'-ig'", "'ciklus v\\u00E9ge'", "'el\\u00E1gaz\\u00E1s v\\u00E9ge'", 
                            "'f\\u00FCggv\\u00E9ny'", "'f\\u00FCggv\\u00E9ny v\\u00E9ge'", 
                            "'<-'", null, "'~'", null, null, null, "'vissza'", 
                            null, "'/\\'", "'\\/'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, "OPERATOR", "COMPARISON", 
                             "CIMSZERINT", "AMIG", "CIKLUS", "HA", "KULONBEN", 
                             "AKKOR", "CSTART", "CEND", "CVEGE", "ELVEGE", 
                             "FUGGVENY", "FVEGE", "NYIL", "STRING", "NOT", 
                             "NUMBER", "BOOL", "IGAZ", "VISSZA", "HAMIS", 
                             "ES", "VAGY", "FUNCTION", "VARIABLE", "WS" ];
    static ruleNames = [ "program", "body", "statement", "debug", "debugPrintStatement", 
                         "vars", "ifStatement", "elseIfBranch", "elseBranch", 
                         "whileStatement", "doWhileStatement", "forStatement", 
                         "returnStatement", "methodCallStatement", "functionDeclarationStatement", 
                         "parameterWithType", "type", "arrayElementAssignmentStatement", 
                         "arrayAssignmentStatement", "assignmentStatement", 
                         "expression", "functionCall", "parameters", "functionName", 
                         "value", "atom", "string", "number", "bool", "arrayShorthand", 
                         "arrayIndex", "variable" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = PseudoCodeParser.ruleNames;
        this.literalNames = PseudoCodeParser.literalNames;
        this.symbolicNames = PseudoCodeParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 20:
    	    		return this.expression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
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
    };




	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, PseudoCodeParser.RULE_program);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 65; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 64;
	            this.statement();
	            this.state = 67; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 2172649486) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & 49) !== 0));
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 2, PseudoCodeParser.RULE_body);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 72;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & 2172649486) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & 49) !== 0)) {
	            this.state = 69;
	            this.statement();
	            this.state = 74;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 4, PseudoCodeParser.RULE_statement);
	    try {
	        this.state = 88;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 75;
	            this.vars();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 76;
	            this.methodCallStatement();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 77;
	            this.ifStatement();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 78;
	            this.whileStatement();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 79;
	            this.doWhileStatement();
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 80;
	            this.forStatement();
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 81;
	            this.arrayElementAssignmentStatement();
	            break;

	        case 8:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 82;
	            this.arrayAssignmentStatement();
	            break;

	        case 9:
	            this.enterOuterAlt(localctx, 9);
	            this.state = 83;
	            this.assignmentStatement();
	            break;

	        case 10:
	            this.enterOuterAlt(localctx, 10);
	            this.state = 84;
	            this.returnStatement();
	            break;

	        case 11:
	            this.enterOuterAlt(localctx, 11);
	            this.state = 85;
	            this.functionDeclarationStatement();
	            break;

	        case 12:
	            this.enterOuterAlt(localctx, 12);
	            this.state = 86;
	            this.debugPrintStatement();
	            break;

	        case 13:
	            this.enterOuterAlt(localctx, 13);
	            this.state = 87;
	            this.debug();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 6, PseudoCodeParser.RULE_debug);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 90;
	        this.match(PseudoCodeParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 8, PseudoCodeParser.RULE_debugPrintStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 92;
	        this.match(PseudoCodeParser.T__1);
	        this.state = 93;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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



	vars() {
	    let localctx = new VarsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, PseudoCodeParser.RULE_vars);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 95;
	        this.match(PseudoCodeParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 12, PseudoCodeParser.RULE_ifStatement);
	    try {
	        this.state = 123;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new SimpleIfStatementContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 97;
	            this.match(PseudoCodeParser.HA);
	            this.state = 98;
	            this.expression(0);
	            this.state = 99;
	            this.match(PseudoCodeParser.AKKOR);
	            this.state = 100;
	            this.body();
	            this.state = 101;
	            this.match(PseudoCodeParser.ELVEGE);
	            break;

	        case 2:
	            localctx = new IfElseStatementContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 103;
	            this.match(PseudoCodeParser.HA);
	            this.state = 104;
	            this.expression(0);
	            this.state = 105;
	            this.match(PseudoCodeParser.AKKOR);
	            this.state = 106;
	            this.body();
	            this.state = 107;
	            this.elseBranch();
	            this.state = 108;
	            this.match(PseudoCodeParser.ELVEGE);
	            break;

	        case 3:
	            localctx = new IfElseIfStatementContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 110;
	            this.match(PseudoCodeParser.HA);
	            this.state = 111;
	            this.expression(0);
	            this.state = 112;
	            this.match(PseudoCodeParser.AKKOR);
	            this.state = 113;
	            this.body();
	            this.state = 117;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 114;
	                    this.elseIfBranch(); 
	                }
	                this.state = 119;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
	            }

	            this.state = 120;
	            this.elseBranch();
	            this.state = 121;
	            this.match(PseudoCodeParser.ELVEGE);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 14, PseudoCodeParser.RULE_elseIfBranch);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 125;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 126;
	        this.match(PseudoCodeParser.HA);
	        this.state = 127;
	        this.expression(0);
	        this.state = 128;
	        this.match(PseudoCodeParser.AKKOR);
	        this.state = 129;
	        this.body();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 16, PseudoCodeParser.RULE_elseBranch);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 131;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 132;
	        this.body();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 18, PseudoCodeParser.RULE_whileStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 134;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 135;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 136;
	        this.expression(0);
	        this.state = 137;
	        this.body();
	        this.state = 138;
	        this.match(PseudoCodeParser.CVEGE);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 20, PseudoCodeParser.RULE_doWhileStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 140;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 141;
	        this.body();
	        this.state = 142;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 143;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 22, PseudoCodeParser.RULE_forStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 145;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 146;
	        this.variable();
	        this.state = 147;
	        this.match(PseudoCodeParser.NYIL);
	        this.state = 148;
	        this.expression(0);
	        this.state = 149;
	        this.match(PseudoCodeParser.CSTART);
	        this.state = 150;
	        this.expression(0);
	        this.state = 151;
	        this.match(PseudoCodeParser.CEND);
	        this.state = 152;
	        this.body();
	        this.state = 153;
	        this.match(PseudoCodeParser.CVEGE);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 24, PseudoCodeParser.RULE_returnStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 155;
	        this.match(PseudoCodeParser.VISSZA);
	        this.state = 156;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 26, PseudoCodeParser.RULE_methodCallStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 158;
	        this.functionName();
	        this.state = 159;
	        this.parameters();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 28, PseudoCodeParser.RULE_functionDeclarationStatement);
	    var _la = 0; // Token type
	    try {
	        this.state = 182;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new FunctionDeclarationWithParametersContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 161;
	            this.match(PseudoCodeParser.FUGGVENY);
	            this.state = 162;
	            this.functionName();
	            this.state = 163;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 164;
	            this.parameterWithType();
	            this.state = 169;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 165;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 166;
	                this.parameterWithType();
	                this.state = 171;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 172;
	            this.match(PseudoCodeParser.T__5);
	            this.state = 173;
	            this.body();
	            this.state = 174;
	            this.match(PseudoCodeParser.FVEGE);
	            break;

	        case 2:
	            localctx = new FunctionDeclarationWithoutParametersContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 176;
	            this.match(PseudoCodeParser.FUGGVENY);
	            this.state = 177;
	            this.functionName();
	            this.state = 178;
	            this.match(PseudoCodeParser.T__6);
	            this.state = 179;
	            this.body();
	            this.state = 180;
	            this.match(PseudoCodeParser.FVEGE);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 30, PseudoCodeParser.RULE_parameterWithType);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 185;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===21) {
	            this.state = 184;
	            this.match(PseudoCodeParser.CIMSZERINT);
	        }

	        this.state = 187;
	        this.variable();
	        this.state = 188;
	        this.match(PseudoCodeParser.T__7);
	        this.state = 189;
	        this.type();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 32, PseudoCodeParser.RULE_type);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 191;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & 32256) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 34, PseudoCodeParser.RULE_arrayElementAssignmentStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 193;
	        this.variable();
	        this.state = 194;
	        this.match(PseudoCodeParser.T__14);
	        this.state = 195;
	        this.expression(0);
	        this.state = 196;
	        this.match(PseudoCodeParser.T__15);
	        this.state = 197;
	        this.match(PseudoCodeParser.NYIL);
	        this.state = 198;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 36, PseudoCodeParser.RULE_arrayAssignmentStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 200;
	        this.variable();
	        this.state = 201;
	        this.match(PseudoCodeParser.NYIL);
	        this.state = 202;
	        this.match(PseudoCodeParser.T__16);
	        this.state = 203;
	        this.type();
	        this.state = 204;
	        this.match(PseudoCodeParser.T__17);
	        this.state = 205;
	        this.expression(0);
	        this.state = 206;
	        this.match(PseudoCodeParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 38, PseudoCodeParser.RULE_assignmentStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 208;
	        this.variable();
	        this.state = 209;
	        this.match(PseudoCodeParser.NYIL);
	        this.state = 210;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 40;
	    this.enterRecursionRule(localctx, 40, PseudoCodeParser.RULE_expression, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 217;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 43:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 213;
	            this.functionCall();
	            break;
	        case 35:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 214;
	            this.match(PseudoCodeParser.NOT);
	            this.state = 215;
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
	            this.state = 216;
	            this.value();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 233;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,10,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 231;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new CalculationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 219;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 220;
	                    this.match(PseudoCodeParser.OPERATOR);
	                    this.state = 221;
	                    this.expression(8);
	                    break;

	                case 2:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 222;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 223;
	                    this.match(PseudoCodeParser.COMPARISON);
	                    this.state = 224;
	                    this.expression(7);
	                    break;

	                case 3:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 225;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 226;
	                    this.match(PseudoCodeParser.ES);
	                    this.state = 227;
	                    this.expression(4);
	                    break;

	                case 4:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 228;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 229;
	                    this.match(PseudoCodeParser.VAGY);
	                    this.state = 230;
	                    this.expression(3);
	                    break;

	                } 
	            }
	            this.state = 235;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,10,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	functionCall() {
	    let localctx = new FunctionCallContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, PseudoCodeParser.RULE_functionCall);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 236;
	        this.functionName();
	        this.state = 237;
	        this.parameters();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 44, PseudoCodeParser.RULE_parameters);
	    var _la = 0; // Token type
	    try {
	        this.state = 251;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 7:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 239;
	            this.match(PseudoCodeParser.T__6);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 240;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 241;
	            this.expression(0);
	            this.state = 246;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 242;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 243;
	                this.expression(0);
	                this.state = 248;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 249;
	            this.match(PseudoCodeParser.T__5);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 46, PseudoCodeParser.RULE_functionName);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 253;
	        this.match(PseudoCodeParser.FUNCTION);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 48, PseudoCodeParser.RULE_value);
	    try {
	        this.state = 258;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 255;
	            this.arrayIndex();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 256;
	            this.atom();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 257;
	            this.variable();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 50, PseudoCodeParser.RULE_atom);
	    try {
	        this.state = 264;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 36:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 260;
	            this.number();
	            break;
	        case 37:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 261;
	            this.bool();
	            break;
	        case 34:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 262;
	            this.string();
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 263;
	            this.arrayShorthand();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 52, PseudoCodeParser.RULE_string);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 266;
	        this.match(PseudoCodeParser.STRING);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 54, PseudoCodeParser.RULE_number);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 268;
	        this.match(PseudoCodeParser.NUMBER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 56, PseudoCodeParser.RULE_bool);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 270;
	        this.match(PseudoCodeParser.BOOL);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 58, PseudoCodeParser.RULE_arrayShorthand);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 272;
	        this.match(PseudoCodeParser.T__3);
	        this.state = 273;
	        this.expression(0);
	        this.state = 276; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 274;
	            this.match(PseudoCodeParser.T__4);
	            this.state = 275;
	            this.expression(0);
	            this.state = 278; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===5);
	        this.state = 280;
	        this.match(PseudoCodeParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 60, PseudoCodeParser.RULE_arrayIndex);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 282;
	        this.variable();
	        this.state = 283;
	        this.match(PseudoCodeParser.T__14);
	        this.state = 284;
	        this.expression(0);
	        this.state = 285;
	        this.match(PseudoCodeParser.T__15);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    this.enterRule(localctx, 62, PseudoCodeParser.RULE_variable);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 287;
	        this.match(PseudoCodeParser.VARIABLE);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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


}

PseudoCodeParser.EOF = antlr4.Token.EOF;
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
PseudoCodeParser.T__17 = 18;
PseudoCodeParser.OPERATOR = 19;
PseudoCodeParser.COMPARISON = 20;
PseudoCodeParser.CIMSZERINT = 21;
PseudoCodeParser.AMIG = 22;
PseudoCodeParser.CIKLUS = 23;
PseudoCodeParser.HA = 24;
PseudoCodeParser.KULONBEN = 25;
PseudoCodeParser.AKKOR = 26;
PseudoCodeParser.CSTART = 27;
PseudoCodeParser.CEND = 28;
PseudoCodeParser.CVEGE = 29;
PseudoCodeParser.ELVEGE = 30;
PseudoCodeParser.FUGGVENY = 31;
PseudoCodeParser.FVEGE = 32;
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
PseudoCodeParser.WS = 45;

PseudoCodeParser.RULE_program = 0;
PseudoCodeParser.RULE_body = 1;
PseudoCodeParser.RULE_statement = 2;
PseudoCodeParser.RULE_debug = 3;
PseudoCodeParser.RULE_debugPrintStatement = 4;
PseudoCodeParser.RULE_vars = 5;
PseudoCodeParser.RULE_ifStatement = 6;
PseudoCodeParser.RULE_elseIfBranch = 7;
PseudoCodeParser.RULE_elseBranch = 8;
PseudoCodeParser.RULE_whileStatement = 9;
PseudoCodeParser.RULE_doWhileStatement = 10;
PseudoCodeParser.RULE_forStatement = 11;
PseudoCodeParser.RULE_returnStatement = 12;
PseudoCodeParser.RULE_methodCallStatement = 13;
PseudoCodeParser.RULE_functionDeclarationStatement = 14;
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

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_program;
    }

	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitProgram(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitProgram(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_body;
    }

	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterBody(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitBody(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitBody(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_statement;
    }

	vars() {
	    return this.getTypedRuleContext(VarsContext,0);
	};

	methodCallStatement() {
	    return this.getTypedRuleContext(MethodCallStatementContext,0);
	};

	ifStatement() {
	    return this.getTypedRuleContext(IfStatementContext,0);
	};

	whileStatement() {
	    return this.getTypedRuleContext(WhileStatementContext,0);
	};

	doWhileStatement() {
	    return this.getTypedRuleContext(DoWhileStatementContext,0);
	};

	forStatement() {
	    return this.getTypedRuleContext(ForStatementContext,0);
	};

	arrayElementAssignmentStatement() {
	    return this.getTypedRuleContext(ArrayElementAssignmentStatementContext,0);
	};

	arrayAssignmentStatement() {
	    return this.getTypedRuleContext(ArrayAssignmentStatementContext,0);
	};

	assignmentStatement() {
	    return this.getTypedRuleContext(AssignmentStatementContext,0);
	};

	returnStatement() {
	    return this.getTypedRuleContext(ReturnStatementContext,0);
	};

	functionDeclarationStatement() {
	    return this.getTypedRuleContext(FunctionDeclarationStatementContext,0);
	};

	debugPrintStatement() {
	    return this.getTypedRuleContext(DebugPrintStatementContext,0);
	};

	debug() {
	    return this.getTypedRuleContext(DebugContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DebugContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_debug;
    }


	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterDebug(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitDebug(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitDebug(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DebugPrintStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_debugPrintStatement;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterDebugPrintStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitDebugPrintStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitDebugPrintStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class VarsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_vars;
    }


	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterVars(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitVars(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitVars(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class IfStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_ifStatement;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class SimpleIfStatementContext extends IfStatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	HA() {
	    return this.getToken(PseudoCodeParser.HA, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	AKKOR() {
	    return this.getToken(PseudoCodeParser.AKKOR, 0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	ELVEGE() {
	    return this.getToken(PseudoCodeParser.ELVEGE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterSimpleIfStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitSimpleIfStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitSimpleIfStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.SimpleIfStatementContext = SimpleIfStatementContext;

class IfElseStatementContext extends IfStatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	HA() {
	    return this.getToken(PseudoCodeParser.HA, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	AKKOR() {
	    return this.getToken(PseudoCodeParser.AKKOR, 0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	elseBranch() {
	    return this.getTypedRuleContext(ElseBranchContext,0);
	};

	ELVEGE() {
	    return this.getToken(PseudoCodeParser.ELVEGE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterIfElseStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitIfElseStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitIfElseStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.IfElseStatementContext = IfElseStatementContext;

class IfElseIfStatementContext extends IfStatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	HA() {
	    return this.getToken(PseudoCodeParser.HA, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	AKKOR() {
	    return this.getToken(PseudoCodeParser.AKKOR, 0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	elseBranch() {
	    return this.getTypedRuleContext(ElseBranchContext,0);
	};

	ELVEGE() {
	    return this.getToken(PseudoCodeParser.ELVEGE, 0);
	};

	elseIfBranch = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ElseIfBranchContext);
	    } else {
	        return this.getTypedRuleContext(ElseIfBranchContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterIfElseIfStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitIfElseIfStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitIfElseIfStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.IfElseIfStatementContext = IfElseIfStatementContext;

class ElseIfBranchContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_elseIfBranch;
    }

	KULONBEN() {
	    return this.getToken(PseudoCodeParser.KULONBEN, 0);
	};

	HA() {
	    return this.getToken(PseudoCodeParser.HA, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	AKKOR() {
	    return this.getToken(PseudoCodeParser.AKKOR, 0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterElseIfBranch(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitElseIfBranch(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitElseIfBranch(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ElseBranchContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_elseBranch;
    }

	KULONBEN() {
	    return this.getToken(PseudoCodeParser.KULONBEN, 0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterElseBranch(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitElseBranch(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitElseBranch(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class WhileStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_whileStatement;
    }

	CIKLUS() {
	    return this.getToken(PseudoCodeParser.CIKLUS, 0);
	};

	AMIG() {
	    return this.getToken(PseudoCodeParser.AMIG, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	CVEGE() {
	    return this.getToken(PseudoCodeParser.CVEGE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterWhileStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitWhileStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitWhileStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DoWhileStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_doWhileStatement;
    }

	CIKLUS() {
	    return this.getToken(PseudoCodeParser.CIKLUS, 0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	AMIG() {
	    return this.getToken(PseudoCodeParser.AMIG, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterDoWhileStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitDoWhileStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitDoWhileStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ForStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_forStatement;
    }

	CIKLUS() {
	    return this.getToken(PseudoCodeParser.CIKLUS, 0);
	};

	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	NYIL() {
	    return this.getToken(PseudoCodeParser.NYIL, 0);
	};

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	CSTART() {
	    return this.getToken(PseudoCodeParser.CSTART, 0);
	};

	CEND() {
	    return this.getToken(PseudoCodeParser.CEND, 0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	CVEGE() {
	    return this.getToken(PseudoCodeParser.CVEGE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterForStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitForStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitForStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ReturnStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_returnStatement;
    }

	VISSZA() {
	    return this.getToken(PseudoCodeParser.VISSZA, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterReturnStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitReturnStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitReturnStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class MethodCallStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_methodCallStatement;
    }

	functionName() {
	    return this.getTypedRuleContext(FunctionNameContext,0);
	};

	parameters() {
	    return this.getTypedRuleContext(ParametersContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterMethodCallStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitMethodCallStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitMethodCallStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FunctionDeclarationStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_functionDeclarationStatement;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class FunctionDeclarationWithParametersContext extends FunctionDeclarationStatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	FUGGVENY() {
	    return this.getToken(PseudoCodeParser.FUGGVENY, 0);
	};

	functionName() {
	    return this.getTypedRuleContext(FunctionNameContext,0);
	};

	parameterWithType = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ParameterWithTypeContext);
	    } else {
	        return this.getTypedRuleContext(ParameterWithTypeContext,i);
	    }
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	FVEGE() {
	    return this.getToken(PseudoCodeParser.FVEGE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterFunctionDeclarationWithParameters(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitFunctionDeclarationWithParameters(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitFunctionDeclarationWithParameters(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.FunctionDeclarationWithParametersContext = FunctionDeclarationWithParametersContext;

class FunctionDeclarationWithoutParametersContext extends FunctionDeclarationStatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	FUGGVENY() {
	    return this.getToken(PseudoCodeParser.FUGGVENY, 0);
	};

	functionName() {
	    return this.getTypedRuleContext(FunctionNameContext,0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	FVEGE() {
	    return this.getToken(PseudoCodeParser.FVEGE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterFunctionDeclarationWithoutParameters(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitFunctionDeclarationWithoutParameters(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitFunctionDeclarationWithoutParameters(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.FunctionDeclarationWithoutParametersContext = FunctionDeclarationWithoutParametersContext;

class ParameterWithTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_parameterWithType;
    }

	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	type() {
	    return this.getTypedRuleContext(TypeContext,0);
	};

	CIMSZERINT() {
	    return this.getToken(PseudoCodeParser.CIMSZERINT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterParameterWithType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitParameterWithType(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitParameterWithType(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_type;
    }


	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitType(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitType(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArrayElementAssignmentStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_arrayElementAssignmentStatement;
    }

	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	NYIL() {
	    return this.getToken(PseudoCodeParser.NYIL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterArrayElementAssignmentStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitArrayElementAssignmentStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitArrayElementAssignmentStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArrayAssignmentStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_arrayAssignmentStatement;
    }

	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	NYIL() {
	    return this.getToken(PseudoCodeParser.NYIL, 0);
	};

	type() {
	    return this.getTypedRuleContext(TypeContext,0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterArrayAssignmentStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitArrayAssignmentStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitArrayAssignmentStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AssignmentStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_assignmentStatement;
    }

	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	NYIL() {
	    return this.getToken(PseudoCodeParser.NYIL, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterAssignmentStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitAssignmentStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitAssignmentStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_expression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class OrExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	VAGY() {
	    return this.getToken(PseudoCodeParser.VAGY, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterOrExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitOrExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitOrExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.OrExpressionContext = OrExpressionContext;

class ValueExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterValueExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitValueExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitValueExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.ValueExpressionContext = ValueExpressionContext;

class AndExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	ES() {
	    return this.getToken(PseudoCodeParser.ES, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterAndExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitAndExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitAndExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.AndExpressionContext = AndExpressionContext;

class FunctionCallExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	functionCall() {
	    return this.getTypedRuleContext(FunctionCallContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterFunctionCallExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitFunctionCallExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitFunctionCallExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.FunctionCallExpressionContext = FunctionCallExpressionContext;

class NotExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NOT() {
	    return this.getToken(PseudoCodeParser.NOT, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterNotExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitNotExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitNotExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.NotExpressionContext = NotExpressionContext;

class ComparisonExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	COMPARISON() {
	    return this.getToken(PseudoCodeParser.COMPARISON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterComparisonExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitComparisonExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitComparisonExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.ComparisonExpressionContext = ComparisonExpressionContext;

class CalculationExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	OPERATOR() {
	    return this.getToken(PseudoCodeParser.OPERATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterCalculationExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitCalculationExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitCalculationExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

PseudoCodeParser.CalculationExpressionContext = CalculationExpressionContext;

class FunctionCallContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_functionCall;
    }

	functionName() {
	    return this.getTypedRuleContext(FunctionNameContext,0);
	};

	parameters() {
	    return this.getTypedRuleContext(ParametersContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterFunctionCall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitFunctionCall(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitFunctionCall(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ParametersContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_parameters;
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterParameters(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitParameters(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitParameters(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FunctionNameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_functionName;
    }

	FUNCTION() {
	    return this.getToken(PseudoCodeParser.FUNCTION, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterFunctionName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitFunctionName(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitFunctionName(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_value;
    }

	arrayIndex() {
	    return this.getTypedRuleContext(ArrayIndexContext,0);
	};

	atom() {
	    return this.getTypedRuleContext(AtomContext,0);
	};

	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AtomContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_atom;
    }

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	bool() {
	    return this.getTypedRuleContext(BoolContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	arrayShorthand() {
	    return this.getTypedRuleContext(ArrayShorthandContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterAtom(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitAtom(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitAtom(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StringContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_string;
    }

	STRING() {
	    return this.getToken(PseudoCodeParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitString(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitString(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class NumberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_number;
    }

	NUMBER() {
	    return this.getToken(PseudoCodeParser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitNumber(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitNumber(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BoolContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_bool;
    }

	BOOL() {
	    return this.getToken(PseudoCodeParser.BOOL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterBool(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitBool(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitBool(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArrayShorthandContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_arrayShorthand;
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterArrayShorthand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitArrayShorthand(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitArrayShorthand(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArrayIndexContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_arrayIndex;
    }

	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterArrayIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitArrayIndex(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitArrayIndex(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class VariableContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_variable;
    }

	VARIABLE() {
	    return this.getToken(PseudoCodeParser.VARIABLE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterVariable(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitVariable(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitVariable(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




PseudoCodeParser.ProgramContext = ProgramContext; 
PseudoCodeParser.BodyContext = BodyContext; 
PseudoCodeParser.StatementContext = StatementContext; 
PseudoCodeParser.DebugContext = DebugContext; 
PseudoCodeParser.DebugPrintStatementContext = DebugPrintStatementContext; 
PseudoCodeParser.VarsContext = VarsContext; 
PseudoCodeParser.IfStatementContext = IfStatementContext; 
PseudoCodeParser.ElseIfBranchContext = ElseIfBranchContext; 
PseudoCodeParser.ElseBranchContext = ElseBranchContext; 
PseudoCodeParser.WhileStatementContext = WhileStatementContext; 
PseudoCodeParser.DoWhileStatementContext = DoWhileStatementContext; 
PseudoCodeParser.ForStatementContext = ForStatementContext; 
PseudoCodeParser.ReturnStatementContext = ReturnStatementContext; 
PseudoCodeParser.MethodCallStatementContext = MethodCallStatementContext; 
PseudoCodeParser.FunctionDeclarationStatementContext = FunctionDeclarationStatementContext; 
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
