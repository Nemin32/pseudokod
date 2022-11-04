// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import PseudoCodeListener from './PseudoCodeListener.js';
import PseudoCodeVisitor from './PseudoCodeVisitor.js';

const serializedATN = [4,1,46,379,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,1,0,3,0,68,8,0,1,
0,1,0,4,0,72,8,0,11,0,12,0,73,1,1,3,1,77,8,1,1,1,1,1,4,1,81,8,1,11,1,12,
1,82,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,97,8,2,1,2,1,2,
1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,4,5,115,8,5,11,5,
12,5,116,1,5,1,5,1,5,3,5,122,8,5,3,5,124,8,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,
1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,
1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,
1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,13,1,13,1,13,1,
13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,3,14,192,8,14,1,14,
5,14,195,8,14,10,14,12,14,198,9,14,1,14,1,14,3,14,202,8,14,1,15,3,15,205,
8,15,1,15,1,15,3,15,209,8,15,1,15,1,15,3,15,213,8,15,1,15,1,15,3,15,217,
8,15,1,15,1,15,3,15,221,8,15,1,16,1,16,1,17,1,17,1,17,3,17,228,8,17,1,17,
1,17,3,17,232,8,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,3,18,242,8,18,
1,18,1,18,3,18,246,8,18,1,18,1,18,3,18,250,8,18,1,18,1,18,3,18,254,8,18,
1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,3,20,267,8,20,1,20,
1,20,3,20,271,8,20,1,20,1,20,3,20,275,8,20,1,20,1,20,1,20,3,20,280,8,20,
1,20,1,20,3,20,284,8,20,1,20,1,20,1,20,3,20,289,8,20,1,20,1,20,3,20,293,
8,20,1,20,1,20,1,20,3,20,298,8,20,1,20,1,20,3,20,302,8,20,1,20,5,20,305,
8,20,10,20,12,20,308,9,20,1,21,1,21,1,21,1,22,1,22,1,22,1,22,1,22,3,22,318,
8,22,1,22,5,22,321,8,22,10,22,12,22,324,9,22,1,22,1,22,3,22,328,8,22,1,23,
1,23,1,24,1,24,1,24,3,24,335,8,24,1,25,1,25,1,25,1,25,3,25,341,8,25,1,26,
1,26,1,27,1,27,1,28,1,28,1,29,1,29,1,29,1,29,3,29,353,8,29,1,29,5,29,356,
8,29,10,29,12,29,359,9,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,4,30,368,8,
30,11,30,12,30,369,1,31,1,31,1,32,4,32,375,8,32,11,32,12,32,376,1,32,0,1,
40,33,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
48,50,52,54,56,58,60,62,64,0,1,1,0,8,13,406,0,67,1,0,0,0,2,76,1,0,0,0,4,
96,1,0,0,0,6,100,1,0,0,0,8,102,1,0,0,0,10,106,1,0,0,0,12,127,1,0,0,0,14,
137,1,0,0,0,16,141,1,0,0,0,18,150,1,0,0,0,20,157,1,0,0,0,22,170,1,0,0,0,
24,174,1,0,0,0,26,177,1,0,0,0,28,201,1,0,0,0,30,204,1,0,0,0,32,222,1,0,0,
0,34,224,1,0,0,0,36,237,1,0,0,0,38,257,1,0,0,0,40,266,1,0,0,0,42,309,1,0,
0,0,44,327,1,0,0,0,46,329,1,0,0,0,48,334,1,0,0,0,50,340,1,0,0,0,52,342,1,
0,0,0,54,344,1,0,0,0,56,346,1,0,0,0,58,348,1,0,0,0,60,362,1,0,0,0,62,371,
1,0,0,0,64,374,1,0,0,0,66,68,5,46,0,0,67,66,1,0,0,0,67,68,1,0,0,0,68,71,
1,0,0,0,69,72,3,64,32,0,70,72,3,4,2,0,71,69,1,0,0,0,71,70,1,0,0,0,72,73,
1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,0,74,1,1,0,0,0,75,77,5,46,0,0,76,75,1,
0,0,0,76,77,1,0,0,0,77,80,1,0,0,0,78,81,3,4,2,0,79,81,3,64,32,0,80,78,1,
0,0,0,80,79,1,0,0,0,81,82,1,0,0,0,82,80,1,0,0,0,82,83,1,0,0,0,83,3,1,0,0,
0,84,97,3,24,12,0,85,97,3,10,5,0,86,97,3,16,8,0,87,97,3,18,9,0,88,97,3,20,
10,0,89,97,3,34,17,0,90,97,3,36,18,0,91,97,3,38,19,0,92,97,3,22,11,0,93,
97,3,26,13,0,94,97,3,8,4,0,95,97,3,6,3,0,96,84,1,0,0,0,96,85,1,0,0,0,96,
86,1,0,0,0,96,87,1,0,0,0,96,88,1,0,0,0,96,89,1,0,0,0,96,90,1,0,0,0,96,91,
1,0,0,0,96,92,1,0,0,0,96,93,1,0,0,0,96,94,1,0,0,0,96,95,1,0,0,0,97,98,1,
0,0,0,98,99,3,64,32,0,99,5,1,0,0,0,100,101,5,1,0,0,101,7,1,0,0,0,102,103,
5,2,0,0,103,104,5,46,0,0,104,105,3,40,20,0,105,9,1,0,0,0,106,107,5,23,0,
0,107,108,5,46,0,0,108,109,3,40,20,0,109,110,5,46,0,0,110,111,5,25,0,0,111,
112,3,64,32,0,112,123,3,2,1,0,113,115,3,12,6,0,114,113,1,0,0,0,115,116,1,
0,0,0,116,114,1,0,0,0,116,117,1,0,0,0,117,118,1,0,0,0,118,119,3,14,7,0,119,
124,1,0,0,0,120,122,3,14,7,0,121,120,1,0,0,0,121,122,1,0,0,0,122,124,1,0,
0,0,123,114,1,0,0,0,123,121,1,0,0,0,124,125,1,0,0,0,125,126,5,29,0,0,126,
11,1,0,0,0,127,128,5,24,0,0,128,129,5,46,0,0,129,130,5,23,0,0,130,131,5,
46,0,0,131,132,3,40,20,0,132,133,5,46,0,0,133,134,5,25,0,0,134,135,3,64,
32,0,135,136,3,2,1,0,136,13,1,0,0,0,137,138,5,24,0,0,138,139,3,64,32,0,139,
140,3,2,1,0,140,15,1,0,0,0,141,142,5,22,0,0,142,143,5,46,0,0,143,144,5,21,
0,0,144,145,5,46,0,0,145,146,3,40,20,0,146,147,3,64,32,0,147,148,3,2,1,0,
148,149,5,28,0,0,149,17,1,0,0,0,150,151,5,22,0,0,151,152,3,64,32,0,152,153,
3,2,1,0,153,154,5,21,0,0,154,155,5,46,0,0,155,156,3,40,20,0,156,19,1,0,0,
0,157,158,5,22,0,0,158,159,5,46,0,0,159,160,3,62,31,0,160,161,5,32,0,0,161,
162,3,40,20,0,162,163,5,26,0,0,163,164,5,46,0,0,164,165,3,40,20,0,165,166,
5,27,0,0,166,167,3,64,32,0,167,168,3,2,1,0,168,169,5,28,0,0,169,21,1,0,0,
0,170,171,5,39,0,0,171,172,5,46,0,0,172,173,3,40,20,0,173,23,1,0,0,0,174,
175,3,46,23,0,175,176,3,44,22,0,176,25,1,0,0,0,177,178,5,30,0,0,178,179,
5,46,0,0,179,180,3,46,23,0,180,181,3,28,14,0,181,182,3,64,32,0,182,183,3,
2,1,0,183,184,5,31,0,0,184,27,1,0,0,0,185,202,1,0,0,0,186,202,5,3,0,0,187,
188,5,4,0,0,188,196,3,30,15,0,189,191,5,5,0,0,190,192,5,46,0,0,191,190,1,
0,0,0,191,192,1,0,0,0,192,193,1,0,0,0,193,195,3,30,15,0,194,189,1,0,0,0,
195,198,1,0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,199,1,0,0,0,198,196,
1,0,0,0,199,200,5,6,0,0,200,202,1,0,0,0,201,185,1,0,0,0,201,186,1,0,0,0,
201,187,1,0,0,0,202,29,1,0,0,0,203,205,3,64,32,0,204,203,1,0,0,0,204,205,
1,0,0,0,205,208,1,0,0,0,206,207,5,20,0,0,207,209,5,46,0,0,208,206,1,0,0,
0,208,209,1,0,0,0,209,210,1,0,0,0,210,212,3,62,31,0,211,213,5,46,0,0,212,
211,1,0,0,0,212,213,1,0,0,0,213,214,1,0,0,0,214,216,5,7,0,0,215,217,5,46,
0,0,216,215,1,0,0,0,216,217,1,0,0,0,217,218,1,0,0,0,218,220,3,32,16,0,219,
221,3,64,32,0,220,219,1,0,0,0,220,221,1,0,0,0,221,31,1,0,0,0,222,223,7,0,
0,0,223,33,1,0,0,0,224,225,3,62,31,0,225,227,5,14,0,0,226,228,5,46,0,0,227,
226,1,0,0,0,227,228,1,0,0,0,228,229,1,0,0,0,229,231,3,40,20,0,230,232,5,
46,0,0,231,230,1,0,0,0,231,232,1,0,0,0,232,233,1,0,0,0,233,234,5,15,0,0,
234,235,5,32,0,0,235,236,3,40,20,0,236,35,1,0,0,0,237,238,3,62,31,0,238,
239,5,32,0,0,239,241,5,16,0,0,240,242,5,46,0,0,241,240,1,0,0,0,241,242,1,
0,0,0,242,243,1,0,0,0,243,245,3,32,16,0,244,246,5,46,0,0,245,244,1,0,0,0,
245,246,1,0,0,0,246,247,1,0,0,0,247,249,5,17,0,0,248,250,5,46,0,0,249,248,
1,0,0,0,249,250,1,0,0,0,250,251,1,0,0,0,251,253,3,40,20,0,252,254,5,46,0,
0,253,252,1,0,0,0,253,254,1,0,0,0,254,255,1,0,0,0,255,256,5,6,0,0,256,37,
1,0,0,0,257,258,3,62,31,0,258,259,5,32,0,0,259,260,3,40,20,0,260,39,1,0,
0,0,261,262,6,20,-1,0,262,267,3,42,21,0,263,264,5,35,0,0,264,267,3,40,20,
4,265,267,3,48,24,0,266,261,1,0,0,0,266,263,1,0,0,0,266,265,1,0,0,0,267,
306,1,0,0,0,268,270,10,7,0,0,269,271,5,46,0,0,270,269,1,0,0,0,270,271,1,
0,0,0,271,272,1,0,0,0,272,274,5,18,0,0,273,275,5,46,0,0,274,273,1,0,0,0,
274,275,1,0,0,0,275,276,1,0,0,0,276,305,3,40,20,8,277,279,10,6,0,0,278,280,
5,46,0,0,279,278,1,0,0,0,279,280,1,0,0,0,280,281,1,0,0,0,281,283,5,19,0,
0,282,284,5,46,0,0,283,282,1,0,0,0,283,284,1,0,0,0,284,285,1,0,0,0,285,305,
3,40,20,7,286,288,10,3,0,0,287,289,5,46,0,0,288,287,1,0,0,0,288,289,1,0,
0,0,289,290,1,0,0,0,290,292,5,41,0,0,291,293,5,46,0,0,292,291,1,0,0,0,292,
293,1,0,0,0,293,294,1,0,0,0,294,305,3,40,20,4,295,297,10,2,0,0,296,298,5,
46,0,0,297,296,1,0,0,0,297,298,1,0,0,0,298,299,1,0,0,0,299,301,5,42,0,0,
300,302,5,46,0,0,301,300,1,0,0,0,301,302,1,0,0,0,302,303,1,0,0,0,303,305,
3,40,20,3,304,268,1,0,0,0,304,277,1,0,0,0,304,286,1,0,0,0,304,295,1,0,0,
0,305,308,1,0,0,0,306,304,1,0,0,0,306,307,1,0,0,0,307,41,1,0,0,0,308,306,
1,0,0,0,309,310,3,46,23,0,310,311,3,44,22,0,311,43,1,0,0,0,312,328,5,3,0,
0,313,314,5,4,0,0,314,322,3,40,20,0,315,317,5,5,0,0,316,318,5,46,0,0,317,
316,1,0,0,0,317,318,1,0,0,0,318,319,1,0,0,0,319,321,3,40,20,0,320,315,1,
0,0,0,321,324,1,0,0,0,322,320,1,0,0,0,322,323,1,0,0,0,323,325,1,0,0,0,324,
322,1,0,0,0,325,326,5,6,0,0,326,328,1,0,0,0,327,312,1,0,0,0,327,313,1,0,
0,0,328,45,1,0,0,0,329,330,5,43,0,0,330,47,1,0,0,0,331,335,3,60,30,0,332,
335,3,50,25,0,333,335,3,62,31,0,334,331,1,0,0,0,334,332,1,0,0,0,334,333,
1,0,0,0,335,49,1,0,0,0,336,341,3,54,27,0,337,341,3,56,28,0,338,341,3,52,
26,0,339,341,3,58,29,0,340,336,1,0,0,0,340,337,1,0,0,0,340,338,1,0,0,0,340,
339,1,0,0,0,341,51,1,0,0,0,342,343,5,34,0,0,343,53,1,0,0,0,344,345,5,36,
0,0,345,55,1,0,0,0,346,347,5,37,0,0,347,57,1,0,0,0,348,349,5,4,0,0,349,357,
3,40,20,0,350,352,5,5,0,0,351,353,5,46,0,0,352,351,1,0,0,0,352,353,1,0,0,
0,353,354,1,0,0,0,354,356,3,40,20,0,355,350,1,0,0,0,356,359,1,0,0,0,357,
355,1,0,0,0,357,358,1,0,0,0,358,360,1,0,0,0,359,357,1,0,0,0,360,361,5,6,
0,0,361,59,1,0,0,0,362,367,3,62,31,0,363,364,5,14,0,0,364,365,3,40,20,0,
365,366,5,15,0,0,366,368,1,0,0,0,367,363,1,0,0,0,368,369,1,0,0,0,369,367,
1,0,0,0,369,370,1,0,0,0,370,61,1,0,0,0,371,372,5,44,0,0,372,63,1,0,0,0,373,
375,5,45,0,0,374,373,1,0,0,0,375,376,1,0,0,0,376,374,1,0,0,0,376,377,1,0,
0,0,377,65,1,0,0,0,44,67,71,73,76,80,82,96,116,121,123,191,196,201,204,208,
212,216,220,227,231,241,245,249,253,266,270,274,279,283,288,292,297,301,
304,306,317,322,327,334,340,352,357,369,376];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class PseudoCodeParser extends antlr4.Parser {

    static grammarFileName = "java-escape";
    static literalNames = [ null, "'debug'", "'kiir'", "'()'", "'('", "','", 
                            "')'", "':'", "'eg\\u00E9sz'", "'logikai'", 
                            "'sz\\u00F6veg'", "'eg\\u00E9sz t\\u00F6mb'", 
                            "'logikai t\\u00F6mb'", "'sz\\u00F6veg t\\u00F6mb'", 
                            "'['", "']'", "'L\\u00E9trehoz['", "']('", null, 
                            null, "'c\\u00EDmszerint'", "'am\\u00EDg'", 
                            null, null, "'k\\u00FCl\\u00F6nben'", "'akkor'", 
                            null, "'-ig'", "'ciklus v\\u00E9ge'", "'el\\u00E1gaz\\u00E1s v\\u00E9ge'", 
                            "'f\\u00FCggv\\u00E9ny'", "'f\\u00FCggv\\u00E9ny v\\u00E9ge'", 
                            null, "'<-'", null, "'~'", null, null, null, 
                            "'vissza'", null, "'/\\'", "'\\/'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, "OPERATOR", "COMPARISON", "CIMSZERINT", 
                             "AMIG", "CIKLUS", "HA", "KULONBEN", "AKKOR", 
                             "CSTART", "CEND", "CVEGE", "ELVEGE", "FUGGVENY", 
                             "FVEGE", "ASSIGN", "NYIL", "STRING", "NOT", 
                             "NUMBER", "BOOL", "IGAZ", "VISSZA", "HAMIS", 
                             "ES", "VAGY", "FUNCTION", "VARIABLE", "NL", 
                             "WS" ];
    static ruleNames = [ "program", "body", "statement", "debug", "debugPrintStatement", 
                         "ifStatement", "elseIfBranch", "elseBranch", "whileStatement", 
                         "doWhileStatement", "forStatement", "returnStatement", 
                         "methodCallStatement", "functionDeclarationStatement", 
                         "parameterList", "parameterWithType", "type", "arrayElementAssignmentStatement", 
                         "arrayAssignmentStatement", "assignmentStatement", 
                         "expression", "functionCall", "parameters", "functionName", 
                         "value", "atom", "string", "number", "bool", "arrayShorthand", 
                         "arrayIndex", "variable", "newline" ];

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
	        this.state = 67;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 66;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 71; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 71;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
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
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 73; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 1086324742) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & 113) !== 0));
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
	        this.state = 76;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 75;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 80; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 80;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
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
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 82; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 1086324742) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & 113) !== 0));
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
	        this.enterOuterAlt(localctx, 1);
	        this.state = 96;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
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
	        this.state = 100;
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
	        this.state = 102;
	        this.match(PseudoCodeParser.T__1);
	        this.state = 103;
	        this.match(PseudoCodeParser.WS);
	        this.state = 104;
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



	ifStatement() {
	    let localctx = new IfStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, PseudoCodeParser.RULE_ifStatement);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 106;
	        this.match(PseudoCodeParser.HA);
	        this.state = 107;
	        this.match(PseudoCodeParser.WS);
	        this.state = 108;
	        this.expression(0);
	        this.state = 109;
	        this.match(PseudoCodeParser.WS);
	        this.state = 110;
	        this.match(PseudoCodeParser.AKKOR);
	        this.state = 111;
	        this.newline();
	        this.state = 112;
	        this.body();
	        this.state = 123;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
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
	            		throw new antlr4.error.NoViableAltException(this);
	            	}
	            	this.state = 116; 
	            	this._errHandler.sync(this);
	            	_alt = this._interp.adaptivePredict(this._input,7, this._ctx);
	            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	            this.state = 118;
	            this.elseBranch();
	            break;

	        case 2:
	            this.state = 121;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===24) {
	                this.state = 120;
	                this.elseBranch();
	            }

	            break;

	        }
	        this.state = 125;
	        this.match(PseudoCodeParser.ELVEGE);
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
	    this.enterRule(localctx, 12, PseudoCodeParser.RULE_elseIfBranch);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 127;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 128;
	        this.match(PseudoCodeParser.WS);
	        this.state = 129;
	        this.match(PseudoCodeParser.HA);
	        this.state = 130;
	        this.match(PseudoCodeParser.WS);
	        this.state = 131;
	        this.expression(0);
	        this.state = 132;
	        this.match(PseudoCodeParser.WS);
	        this.state = 133;
	        this.match(PseudoCodeParser.AKKOR);
	        this.state = 134;
	        this.newline();
	        this.state = 135;
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
	    this.enterRule(localctx, 14, PseudoCodeParser.RULE_elseBranch);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 137;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 138;
	        this.newline();
	        this.state = 139;
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
	    this.enterRule(localctx, 16, PseudoCodeParser.RULE_whileStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 141;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 142;
	        this.match(PseudoCodeParser.WS);
	        this.state = 143;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 144;
	        this.match(PseudoCodeParser.WS);
	        this.state = 145;
	        this.expression(0);
	        this.state = 146;
	        this.newline();
	        this.state = 147;
	        this.body();
	        this.state = 148;
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
	    this.enterRule(localctx, 18, PseudoCodeParser.RULE_doWhileStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 150;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 151;
	        this.newline();
	        this.state = 152;
	        this.body();
	        this.state = 153;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 154;
	        this.match(PseudoCodeParser.WS);
	        this.state = 155;
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
	    this.enterRule(localctx, 20, PseudoCodeParser.RULE_forStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 158;
	        this.match(PseudoCodeParser.WS);
	        this.state = 159;
	        this.variable();
	        this.state = 160;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 161;
	        this.expression(0);
	        this.state = 162;
	        this.match(PseudoCodeParser.CSTART);
	        this.state = 163;
	        this.match(PseudoCodeParser.WS);
	        this.state = 164;
	        this.expression(0);
	        this.state = 165;
	        this.match(PseudoCodeParser.CEND);
	        this.state = 166;
	        this.newline();
	        this.state = 167;
	        this.body();
	        this.state = 168;
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
	    this.enterRule(localctx, 22, PseudoCodeParser.RULE_returnStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 170;
	        this.match(PseudoCodeParser.VISSZA);
	        this.state = 171;
	        this.match(PseudoCodeParser.WS);
	        this.state = 172;
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
	    this.enterRule(localctx, 24, PseudoCodeParser.RULE_methodCallStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 174;
	        this.functionName();
	        this.state = 175;
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
	    this.enterRule(localctx, 26, PseudoCodeParser.RULE_functionDeclarationStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 177;
	        this.match(PseudoCodeParser.FUGGVENY);
	        this.state = 178;
	        this.match(PseudoCodeParser.WS);
	        this.state = 179;
	        this.functionName();
	        this.state = 180;
	        this.parameterList();
	        this.state = 181;
	        this.newline();
	        this.state = 182;
	        this.body();
	        this.state = 183;
	        this.match(PseudoCodeParser.FVEGE);
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



	parameterList() {
	    let localctx = new ParameterListContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, PseudoCodeParser.RULE_parameterList);
	    var _la = 0; // Token type
	    try {
	        this.state = 201;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 45:
	            this.enterOuterAlt(localctx, 1);

	            break;
	        case 3:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 186;
	            this.match(PseudoCodeParser.T__2);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 187;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 188;
	            this.parameterWithType();
	            this.state = 196;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 189;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 191;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===46) {
	                    this.state = 190;
	                    this.match(PseudoCodeParser.WS);
	                }

	                this.state = 193;
	                this.parameterWithType();
	                this.state = 198;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 199;
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



	parameterWithType() {
	    let localctx = new ParameterWithTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, PseudoCodeParser.RULE_parameterWithType);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 204;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===45) {
	            this.state = 203;
	            this.newline();
	        }

	        this.state = 208;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===20) {
	            this.state = 206;
	            this.match(PseudoCodeParser.CIMSZERINT);
	            this.state = 207;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 210;
	        this.variable();
	        this.state = 212;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 211;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 214;
	        this.match(PseudoCodeParser.T__6);
	        this.state = 216;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 215;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 218;
	        this.type();
	        this.state = 220;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===45) {
	            this.state = 219;
	            this.newline();
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



	type() {
	    let localctx = new TypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, PseudoCodeParser.RULE_type);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 222;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & 16128) !== 0))) {
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 224;
	        this.variable();
	        this.state = 225;
	        this.match(PseudoCodeParser.T__13);
	        this.state = 227;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 226;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 229;
	        this.expression(0);
	        this.state = 231;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 230;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 233;
	        this.match(PseudoCodeParser.T__14);
	        this.state = 234;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 235;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 237;
	        this.variable();
	        this.state = 238;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 239;
	        this.match(PseudoCodeParser.T__15);
	        this.state = 241;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 240;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 243;
	        this.type();
	        this.state = 245;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 244;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 247;
	        this.match(PseudoCodeParser.T__16);
	        this.state = 249;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 248;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 251;
	        this.expression(0);
	        this.state = 253;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===46) {
	            this.state = 252;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 255;
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
	        this.state = 257;
	        this.variable();
	        this.state = 258;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 259;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 266;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
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
	            this.match(PseudoCodeParser.NOT);
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
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 306;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,34,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 304;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,33,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new CalculationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 268;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 270;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 269;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 272;
	                    this.match(PseudoCodeParser.OPERATOR);
	                    this.state = 274;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 273;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 276;
	                    this.expression(8);
	                    break;

	                case 2:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 277;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 279;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 278;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 281;
	                    this.match(PseudoCodeParser.COMPARISON);
	                    this.state = 283;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 282;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 285;
	                    this.expression(7);
	                    break;

	                case 3:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 286;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 288;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 287;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 290;
	                    this.match(PseudoCodeParser.ES);
	                    this.state = 292;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 291;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 294;
	                    this.expression(4);
	                    break;

	                case 4:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 295;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 297;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 296;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 299;
	                    this.match(PseudoCodeParser.VAGY);
	                    this.state = 301;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===46) {
	                        this.state = 300;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 303;
	                    this.expression(3);
	                    break;

	                } 
	            }
	            this.state = 308;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,34,this._ctx);
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
	        this.state = 309;
	        this.functionName();
	        this.state = 310;
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
	        this.state = 327;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 3:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 312;
	            this.match(PseudoCodeParser.T__2);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 313;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 314;
	            this.expression(0);
	            this.state = 322;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 315;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 317;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===46) {
	                    this.state = 316;
	                    this.match(PseudoCodeParser.WS);
	                }

	                this.state = 319;
	                this.expression(0);
	                this.state = 324;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 325;
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
	        this.state = 329;
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
	        this.state = 334;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,38,this._ctx);
	        switch(la_) {
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
	        this.state = 340;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
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
	        this.state = 342;
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
	        this.state = 344;
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
	        this.state = 346;
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
	        this.state = 348;
	        this.match(PseudoCodeParser.T__3);
	        this.state = 349;
	        this.expression(0);
	        this.state = 357;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===5) {
	            this.state = 350;
	            this.match(PseudoCodeParser.T__4);
	            this.state = 352;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===46) {
	                this.state = 351;
	                this.match(PseudoCodeParser.WS);
	            }

	            this.state = 354;
	            this.expression(0);
	            this.state = 359;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 360;
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
	        this.state = 362;
	        this.variable();
	        this.state = 367; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 363;
	        		this.match(PseudoCodeParser.T__13);
	        		this.state = 364;
	        		this.expression(0);
	        		this.state = 365;
	        		this.match(PseudoCodeParser.T__14);
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 369; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,42, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
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
	        this.state = 371;
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



	newline() {
	    let localctx = new NewlineContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 64, PseudoCodeParser.RULE_newline);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 374; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 373;
	        		this.match(PseudoCodeParser.NL);
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 376; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,43, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
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

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
	};

	newline = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NewlineContext);
	    } else {
	        return this.getTypedRuleContext(NewlineContext,i);
	    }
	};

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

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
	};

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

	newline = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NewlineContext);
	    } else {
	        return this.getTypedRuleContext(NewlineContext,i);
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

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
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

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
	};

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

	HA() {
	    return this.getToken(PseudoCodeParser.HA, 0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
	};


	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	AKKOR() {
	    return this.getToken(PseudoCodeParser.AKKOR, 0);
	};

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	ELVEGE() {
	    return this.getToken(PseudoCodeParser.ELVEGE, 0);
	};

	elseBranch() {
	    return this.getTypedRuleContext(ElseBranchContext,0);
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
	        listener.enterIfStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitIfStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitIfStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
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

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
	};


	AMIG() {
	    return this.getToken(PseudoCodeParser.AMIG, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
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

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	AMIG() {
	    return this.getToken(PseudoCodeParser.AMIG, 0);
	};

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
	};


	variable() {
	    return this.getTypedRuleContext(VariableContext,0);
	};

	ASSIGN() {
	    return this.getToken(PseudoCodeParser.ASSIGN, 0);
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

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
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

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
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

	FUGGVENY() {
	    return this.getToken(PseudoCodeParser.FUGGVENY, 0);
	};

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
	};

	functionName() {
	    return this.getTypedRuleContext(FunctionNameContext,0);
	};

	parameterList() {
	    return this.getTypedRuleContext(ParameterListContext,0);
	};

	newline() {
	    return this.getTypedRuleContext(NewlineContext,0);
	};

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	FVEGE() {
	    return this.getToken(PseudoCodeParser.FVEGE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterFunctionDeclarationStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitFunctionDeclarationStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitFunctionDeclarationStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ParameterListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_parameterList;
    }

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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterParameterList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitParameterList(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitParameterList(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



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

	newline = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NewlineContext);
	    } else {
	        return this.getTypedRuleContext(NewlineContext,i);
	    }
	};

	CIMSZERINT() {
	    return this.getToken(PseudoCodeParser.CIMSZERINT, 0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	ASSIGN() {
	    return this.getToken(PseudoCodeParser.ASSIGN, 0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	ASSIGN() {
	    return this.getToken(PseudoCodeParser.ASSIGN, 0);
	};

	type() {
	    return this.getTypedRuleContext(TypeContext,0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	ASSIGN() {
	    return this.getToken(PseudoCodeParser.ASSIGN, 0);
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
	    }
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
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

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.WS);
	    } else {
	        return this.getToken(PseudoCodeParser.WS, i);
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



class NewlineContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PseudoCodeParser.RULE_newline;
    }

	NL = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PseudoCodeParser.NL);
	    } else {
	        return this.getToken(PseudoCodeParser.NL, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.enterNewline(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PseudoCodeListener ) {
	        listener.exitNewline(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof PseudoCodeVisitor ) {
	        return visitor.visitNewline(this);
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
