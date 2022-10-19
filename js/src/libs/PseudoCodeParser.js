// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import PseudoCodeListener from './PseudoCodeListener.js';
import PseudoCodeVisitor from './PseudoCodeVisitor.js';

const serializedATN = [4,1,47,388,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,1,0,3,0,66,8,0,1,0,4,0,69,8,
0,11,0,12,0,70,1,1,3,1,74,8,1,1,1,1,1,4,1,78,8,1,11,1,12,1,79,1,2,1,2,1,
2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,95,8,2,1,2,1,2,1,3,1,3,1,4,
1,4,1,4,1,4,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,
1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,4,6,134,8,6,11,6,
12,6,135,1,6,1,6,1,6,3,6,141,8,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,
1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,
1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,
11,1,11,1,12,1,12,1,12,1,12,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,
1,14,3,14,200,8,14,1,14,5,14,203,8,14,10,14,12,14,206,9,14,1,14,1,14,1,14,
1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,221,8,14,1,15,1,15,
3,15,225,8,15,1,15,1,15,3,15,229,8,15,1,15,1,15,3,15,233,8,15,1,15,1,15,
1,16,1,16,1,17,1,17,1,17,3,17,242,8,17,1,17,1,17,3,17,246,8,17,1,17,1,17,
1,17,1,17,1,18,1,18,1,18,1,18,3,18,256,8,18,1,18,1,18,3,18,260,8,18,1,18,
1,18,3,18,264,8,18,1,18,1,18,3,18,268,8,18,1,18,1,18,1,19,1,19,1,19,1,19,
1,20,1,20,1,20,1,20,1,20,3,20,281,8,20,1,20,1,20,3,20,285,8,20,1,20,1,20,
3,20,289,8,20,1,20,1,20,1,20,3,20,294,8,20,1,20,1,20,3,20,298,8,20,1,20,
1,20,1,20,3,20,303,8,20,1,20,1,20,3,20,307,8,20,1,20,1,20,1,20,3,20,312,
8,20,1,20,1,20,3,20,316,8,20,1,20,5,20,319,8,20,10,20,12,20,322,9,20,1,21,
1,21,1,21,1,22,1,22,1,22,1,22,1,22,3,22,332,8,22,1,22,5,22,335,8,22,10,22,
12,22,338,9,22,1,22,1,22,3,22,342,8,22,1,23,1,23,1,24,1,24,1,24,3,24,349,
8,24,1,25,1,25,1,25,1,25,3,25,355,8,25,1,26,1,26,1,27,1,27,1,28,1,28,1,29,
1,29,1,29,1,29,3,29,367,8,29,1,29,5,29,370,8,29,10,29,12,29,373,9,29,1,29,
1,29,1,30,1,30,1,30,1,30,1,30,4,30,382,8,30,11,30,12,30,383,1,31,1,31,1,
31,0,1,40,32,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,
44,46,48,50,52,54,56,58,60,62,0,1,1,0,9,14,412,0,65,1,0,0,0,2,73,1,0,0,0,
4,94,1,0,0,0,6,98,1,0,0,0,8,100,1,0,0,0,10,104,1,0,0,0,12,140,1,0,0,0,14,
142,1,0,0,0,16,152,1,0,0,0,18,156,1,0,0,0,20,165,1,0,0,0,22,172,1,0,0,0,
24,185,1,0,0,0,26,189,1,0,0,0,28,220,1,0,0,0,30,224,1,0,0,0,32,236,1,0,0,
0,34,238,1,0,0,0,36,251,1,0,0,0,38,271,1,0,0,0,40,280,1,0,0,0,42,323,1,0,
0,0,44,341,1,0,0,0,46,343,1,0,0,0,48,348,1,0,0,0,50,354,1,0,0,0,52,356,1,
0,0,0,54,358,1,0,0,0,56,360,1,0,0,0,58,362,1,0,0,0,60,376,1,0,0,0,62,385,
1,0,0,0,64,66,5,47,0,0,65,64,1,0,0,0,65,66,1,0,0,0,66,68,1,0,0,0,67,69,3,
4,2,0,68,67,1,0,0,0,69,70,1,0,0,0,70,68,1,0,0,0,70,71,1,0,0,0,71,1,1,0,0,
0,72,74,5,47,0,0,73,72,1,0,0,0,73,74,1,0,0,0,74,77,1,0,0,0,75,78,3,4,2,0,
76,78,5,46,0,0,77,75,1,0,0,0,77,76,1,0,0,0,78,79,1,0,0,0,79,77,1,0,0,0,79,
80,1,0,0,0,80,3,1,0,0,0,81,95,3,10,5,0,82,95,3,26,13,0,83,95,3,12,6,0,84,
95,3,18,9,0,85,95,3,20,10,0,86,95,3,22,11,0,87,95,3,34,17,0,88,95,3,36,18,
0,89,95,3,38,19,0,90,95,3,24,12,0,91,95,3,28,14,0,92,95,3,8,4,0,93,95,3,
6,3,0,94,81,1,0,0,0,94,82,1,0,0,0,94,83,1,0,0,0,94,84,1,0,0,0,94,85,1,0,
0,0,94,86,1,0,0,0,94,87,1,0,0,0,94,88,1,0,0,0,94,89,1,0,0,0,94,90,1,0,0,
0,94,91,1,0,0,0,94,92,1,0,0,0,94,93,1,0,0,0,95,96,1,0,0,0,96,97,5,46,0,0,
97,5,1,0,0,0,98,99,5,1,0,0,99,7,1,0,0,0,100,101,5,2,0,0,101,102,5,47,0,0,
102,103,3,40,20,0,103,9,1,0,0,0,104,105,5,3,0,0,105,11,1,0,0,0,106,107,5,
24,0,0,107,108,5,47,0,0,108,109,3,40,20,0,109,110,5,47,0,0,110,111,5,26,
0,0,111,112,5,46,0,0,112,113,3,2,1,0,113,114,5,30,0,0,114,141,1,0,0,0,115,
116,5,24,0,0,116,117,5,47,0,0,117,118,3,40,20,0,118,119,5,47,0,0,119,120,
5,26,0,0,120,121,5,46,0,0,121,122,3,2,1,0,122,123,3,16,8,0,123,124,5,30,
0,0,124,141,1,0,0,0,125,126,5,24,0,0,126,127,5,47,0,0,127,128,3,40,20,0,
128,129,5,47,0,0,129,130,5,26,0,0,130,131,5,46,0,0,131,133,3,2,1,0,132,134,
3,14,7,0,133,132,1,0,0,0,134,135,1,0,0,0,135,133,1,0,0,0,135,136,1,0,0,0,
136,137,1,0,0,0,137,138,3,16,8,0,138,139,5,30,0,0,139,141,1,0,0,0,140,106,
1,0,0,0,140,115,1,0,0,0,140,125,1,0,0,0,141,13,1,0,0,0,142,143,5,25,0,0,
143,144,5,47,0,0,144,145,5,24,0,0,145,146,5,47,0,0,146,147,3,40,20,0,147,
148,5,47,0,0,148,149,5,26,0,0,149,150,5,46,0,0,150,151,3,2,1,0,151,15,1,
0,0,0,152,153,5,25,0,0,153,154,5,46,0,0,154,155,3,2,1,0,155,17,1,0,0,0,156,
157,5,23,0,0,157,158,5,47,0,0,158,159,5,22,0,0,159,160,5,47,0,0,160,161,
3,40,20,0,161,162,5,46,0,0,162,163,3,2,1,0,163,164,5,29,0,0,164,19,1,0,0,
0,165,166,5,23,0,0,166,167,5,46,0,0,167,168,3,2,1,0,168,169,5,22,0,0,169,
170,5,47,0,0,170,171,3,40,20,0,171,21,1,0,0,0,172,173,5,23,0,0,173,174,5,
47,0,0,174,175,3,62,31,0,175,176,5,33,0,0,176,177,3,40,20,0,177,178,5,27,
0,0,178,179,5,47,0,0,179,180,3,40,20,0,180,181,5,28,0,0,181,182,5,46,0,0,
182,183,3,2,1,0,183,184,5,29,0,0,184,23,1,0,0,0,185,186,5,40,0,0,186,187,
5,47,0,0,187,188,3,40,20,0,188,25,1,0,0,0,189,190,3,46,23,0,190,191,3,44,
22,0,191,27,1,0,0,0,192,193,5,31,0,0,193,194,5,47,0,0,194,195,3,46,23,0,
195,196,5,4,0,0,196,204,3,30,15,0,197,199,5,5,0,0,198,200,5,47,0,0,199,198,
1,0,0,0,199,200,1,0,0,0,200,201,1,0,0,0,201,203,3,30,15,0,202,197,1,0,0,
0,203,206,1,0,0,0,204,202,1,0,0,0,204,205,1,0,0,0,205,207,1,0,0,0,206,204,
1,0,0,0,207,208,5,6,0,0,208,209,5,46,0,0,209,210,3,2,1,0,210,211,5,32,0,
0,211,221,1,0,0,0,212,213,5,31,0,0,213,214,5,47,0,0,214,215,3,46,23,0,215,
216,5,7,0,0,216,217,5,46,0,0,217,218,3,2,1,0,218,219,5,32,0,0,219,221,1,
0,0,0,220,192,1,0,0,0,220,212,1,0,0,0,221,29,1,0,0,0,222,223,5,21,0,0,223,
225,5,47,0,0,224,222,1,0,0,0,224,225,1,0,0,0,225,226,1,0,0,0,226,228,3,62,
31,0,227,229,5,47,0,0,228,227,1,0,0,0,228,229,1,0,0,0,229,230,1,0,0,0,230,
232,5,8,0,0,231,233,5,47,0,0,232,231,1,0,0,0,232,233,1,0,0,0,233,234,1,0,
0,0,234,235,3,32,16,0,235,31,1,0,0,0,236,237,7,0,0,0,237,33,1,0,0,0,238,
239,3,62,31,0,239,241,5,15,0,0,240,242,5,47,0,0,241,240,1,0,0,0,241,242,
1,0,0,0,242,243,1,0,0,0,243,245,3,40,20,0,244,246,5,47,0,0,245,244,1,0,0,
0,245,246,1,0,0,0,246,247,1,0,0,0,247,248,5,16,0,0,248,249,5,33,0,0,249,
250,3,40,20,0,250,35,1,0,0,0,251,252,3,62,31,0,252,253,5,33,0,0,253,255,
5,17,0,0,254,256,5,47,0,0,255,254,1,0,0,0,255,256,1,0,0,0,256,257,1,0,0,
0,257,259,3,32,16,0,258,260,5,47,0,0,259,258,1,0,0,0,259,260,1,0,0,0,260,
261,1,0,0,0,261,263,5,18,0,0,262,264,5,47,0,0,263,262,1,0,0,0,263,264,1,
0,0,0,264,265,1,0,0,0,265,267,3,40,20,0,266,268,5,47,0,0,267,266,1,0,0,0,
267,268,1,0,0,0,268,269,1,0,0,0,269,270,5,6,0,0,270,37,1,0,0,0,271,272,3,
62,31,0,272,273,5,33,0,0,273,274,3,40,20,0,274,39,1,0,0,0,275,276,6,20,-1,
0,276,281,3,42,21,0,277,278,5,36,0,0,278,281,3,40,20,4,279,281,3,48,24,0,
280,275,1,0,0,0,280,277,1,0,0,0,280,279,1,0,0,0,281,320,1,0,0,0,282,284,
10,7,0,0,283,285,5,47,0,0,284,283,1,0,0,0,284,285,1,0,0,0,285,286,1,0,0,
0,286,288,5,19,0,0,287,289,5,47,0,0,288,287,1,0,0,0,288,289,1,0,0,0,289,
290,1,0,0,0,290,319,3,40,20,8,291,293,10,6,0,0,292,294,5,47,0,0,293,292,
1,0,0,0,293,294,1,0,0,0,294,295,1,0,0,0,295,297,5,20,0,0,296,298,5,47,0,
0,297,296,1,0,0,0,297,298,1,0,0,0,298,299,1,0,0,0,299,319,3,40,20,7,300,
302,10,3,0,0,301,303,5,47,0,0,302,301,1,0,0,0,302,303,1,0,0,0,303,304,1,
0,0,0,304,306,5,42,0,0,305,307,5,47,0,0,306,305,1,0,0,0,306,307,1,0,0,0,
307,308,1,0,0,0,308,319,3,40,20,4,309,311,10,2,0,0,310,312,5,47,0,0,311,
310,1,0,0,0,311,312,1,0,0,0,312,313,1,0,0,0,313,315,5,43,0,0,314,316,5,47,
0,0,315,314,1,0,0,0,315,316,1,0,0,0,316,317,1,0,0,0,317,319,3,40,20,3,318,
282,1,0,0,0,318,291,1,0,0,0,318,300,1,0,0,0,318,309,1,0,0,0,319,322,1,0,
0,0,320,318,1,0,0,0,320,321,1,0,0,0,321,41,1,0,0,0,322,320,1,0,0,0,323,324,
3,46,23,0,324,325,3,44,22,0,325,43,1,0,0,0,326,342,5,7,0,0,327,328,5,4,0,
0,328,336,3,40,20,0,329,331,5,5,0,0,330,332,5,47,0,0,331,330,1,0,0,0,331,
332,1,0,0,0,332,333,1,0,0,0,333,335,3,40,20,0,334,329,1,0,0,0,335,338,1,
0,0,0,336,334,1,0,0,0,336,337,1,0,0,0,337,339,1,0,0,0,338,336,1,0,0,0,339,
340,5,6,0,0,340,342,1,0,0,0,341,326,1,0,0,0,341,327,1,0,0,0,342,45,1,0,0,
0,343,344,5,44,0,0,344,47,1,0,0,0,345,349,3,60,30,0,346,349,3,50,25,0,347,
349,3,62,31,0,348,345,1,0,0,0,348,346,1,0,0,0,348,347,1,0,0,0,349,49,1,0,
0,0,350,355,3,54,27,0,351,355,3,56,28,0,352,355,3,52,26,0,353,355,3,58,29,
0,354,350,1,0,0,0,354,351,1,0,0,0,354,352,1,0,0,0,354,353,1,0,0,0,355,51,
1,0,0,0,356,357,5,35,0,0,357,53,1,0,0,0,358,359,5,37,0,0,359,55,1,0,0,0,
360,361,5,38,0,0,361,57,1,0,0,0,362,363,5,4,0,0,363,371,3,40,20,0,364,366,
5,5,0,0,365,367,5,47,0,0,366,365,1,0,0,0,366,367,1,0,0,0,367,368,1,0,0,0,
368,370,3,40,20,0,369,364,1,0,0,0,370,373,1,0,0,0,371,369,1,0,0,0,371,372,
1,0,0,0,372,374,1,0,0,0,373,371,1,0,0,0,374,375,5,6,0,0,375,59,1,0,0,0,376,
381,3,62,31,0,377,378,5,15,0,0,378,379,3,40,20,0,379,380,5,16,0,0,380,382,
1,0,0,0,381,377,1,0,0,0,382,383,1,0,0,0,383,381,1,0,0,0,383,384,1,0,0,0,
384,61,1,0,0,0,385,386,5,45,0,0,386,63,1,0,0,0,39,65,70,73,77,79,94,135,
140,199,204,220,224,228,232,241,245,255,259,263,267,280,284,288,293,297,
302,306,311,315,318,320,331,336,341,348,354,366,371,383];


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
                            null, "'<-'", null, "'~'", null, null, null, 
                            "'vissza'", null, "'/\\'", "'\\/'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, "OPERATOR", "COMPARISON", 
                             "CIMSZERINT", "AMIG", "CIKLUS", "HA", "KULONBEN", 
                             "AKKOR", "CSTART", "CEND", "CVEGE", "ELVEGE", 
                             "FUGGVENY", "FVEGE", "ASSIGN", "NYIL", "STRING", 
                             "NOT", "NUMBER", "BOOL", "IGAZ", "VISSZA", 
                             "HAMIS", "ES", "VAGY", "FUNCTION", "VARIABLE", 
                             "NL", "WS" ];
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
	        if(_la===47) {
	            this.state = 64;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 68; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 67;
	            this.statement();
	            this.state = 70; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 2172649486) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & 49) !== 0));
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
	        this.state = 73;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 72;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 77; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 77;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 1:
	            case 2:
	            case 3:
	            case 23:
	            case 24:
	            case 31:
	            case 40:
	            case 44:
	            case 45:
	                this.state = 75;
	                this.statement();
	                break;
	            case 46:
	                this.state = 76;
	                this.match(PseudoCodeParser.NL);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 79; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 2172649486) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & 113) !== 0));
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
	        this.state = 94;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 81;
	            this.vars();
	            break;

	        case 2:
	            this.state = 82;
	            this.methodCallStatement();
	            break;

	        case 3:
	            this.state = 83;
	            this.ifStatement();
	            break;

	        case 4:
	            this.state = 84;
	            this.whileStatement();
	            break;

	        case 5:
	            this.state = 85;
	            this.doWhileStatement();
	            break;

	        case 6:
	            this.state = 86;
	            this.forStatement();
	            break;

	        case 7:
	            this.state = 87;
	            this.arrayElementAssignmentStatement();
	            break;

	        case 8:
	            this.state = 88;
	            this.arrayAssignmentStatement();
	            break;

	        case 9:
	            this.state = 89;
	            this.assignmentStatement();
	            break;

	        case 10:
	            this.state = 90;
	            this.returnStatement();
	            break;

	        case 11:
	            this.state = 91;
	            this.functionDeclarationStatement();
	            break;

	        case 12:
	            this.state = 92;
	            this.debugPrintStatement();
	            break;

	        case 13:
	            this.state = 93;
	            this.debug();
	            break;

	        }
	        this.state = 96;
	        this.match(PseudoCodeParser.NL);
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
	        this.state = 98;
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
	        this.state = 100;
	        this.match(PseudoCodeParser.T__1);
	        this.state = 101;
	        this.match(PseudoCodeParser.WS);
	        this.state = 102;
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
	        this.state = 104;
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
	        this.state = 140;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new SimpleIfStatementContext(this, localctx);
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
	            this.match(PseudoCodeParser.NL);
	            this.state = 112;
	            this.body();
	            this.state = 113;
	            this.match(PseudoCodeParser.ELVEGE);
	            break;

	        case 2:
	            localctx = new IfElseStatementContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 115;
	            this.match(PseudoCodeParser.HA);
	            this.state = 116;
	            this.match(PseudoCodeParser.WS);
	            this.state = 117;
	            this.expression(0);
	            this.state = 118;
	            this.match(PseudoCodeParser.WS);
	            this.state = 119;
	            this.match(PseudoCodeParser.AKKOR);
	            this.state = 120;
	            this.match(PseudoCodeParser.NL);
	            this.state = 121;
	            this.body();
	            this.state = 122;
	            this.elseBranch();
	            this.state = 123;
	            this.match(PseudoCodeParser.ELVEGE);
	            break;

	        case 3:
	            localctx = new IfElseIfStatementContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 125;
	            this.match(PseudoCodeParser.HA);
	            this.state = 126;
	            this.match(PseudoCodeParser.WS);
	            this.state = 127;
	            this.expression(0);
	            this.state = 128;
	            this.match(PseudoCodeParser.WS);
	            this.state = 129;
	            this.match(PseudoCodeParser.AKKOR);
	            this.state = 130;
	            this.match(PseudoCodeParser.NL);
	            this.state = 131;
	            this.body();
	            this.state = 133; 
	            this._errHandler.sync(this);
	            var _alt = 1;
	            do {
	            	switch (_alt) {
	            	case 1:
	            		this.state = 132;
	            		this.elseIfBranch();
	            		break;
	            	default:
	            		throw new antlr4.error.NoViableAltException(this);
	            	}
	            	this.state = 135; 
	            	this._errHandler.sync(this);
	            	_alt = this._interp.adaptivePredict(this._input,6, this._ctx);
	            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	            this.state = 137;
	            this.elseBranch();
	            this.state = 138;
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
	        this.state = 142;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 143;
	        this.match(PseudoCodeParser.WS);
	        this.state = 144;
	        this.match(PseudoCodeParser.HA);
	        this.state = 145;
	        this.match(PseudoCodeParser.WS);
	        this.state = 146;
	        this.expression(0);
	        this.state = 147;
	        this.match(PseudoCodeParser.WS);
	        this.state = 148;
	        this.match(PseudoCodeParser.AKKOR);
	        this.state = 149;
	        this.match(PseudoCodeParser.NL);
	        this.state = 150;
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
	        this.state = 152;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 153;
	        this.match(PseudoCodeParser.NL);
	        this.state = 154;
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
	        this.state = 156;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 157;
	        this.match(PseudoCodeParser.WS);
	        this.state = 158;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 159;
	        this.match(PseudoCodeParser.WS);
	        this.state = 160;
	        this.expression(0);
	        this.state = 161;
	        this.match(PseudoCodeParser.NL);
	        this.state = 162;
	        this.body();
	        this.state = 163;
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
	        this.state = 165;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 166;
	        this.match(PseudoCodeParser.NL);
	        this.state = 167;
	        this.body();
	        this.state = 168;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 169;
	        this.match(PseudoCodeParser.WS);
	        this.state = 170;
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
	        this.state = 172;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 173;
	        this.match(PseudoCodeParser.WS);
	        this.state = 174;
	        this.variable();
	        this.state = 175;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 176;
	        this.expression(0);
	        this.state = 177;
	        this.match(PseudoCodeParser.CSTART);
	        this.state = 178;
	        this.match(PseudoCodeParser.WS);
	        this.state = 179;
	        this.expression(0);
	        this.state = 180;
	        this.match(PseudoCodeParser.CEND);
	        this.state = 181;
	        this.match(PseudoCodeParser.NL);
	        this.state = 182;
	        this.body();
	        this.state = 183;
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
	        this.state = 185;
	        this.match(PseudoCodeParser.VISSZA);
	        this.state = 186;
	        this.match(PseudoCodeParser.WS);
	        this.state = 187;
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
	        this.state = 189;
	        this.functionName();
	        this.state = 190;
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
	        this.state = 220;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new FunctionDeclarationWithParametersContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 192;
	            this.match(PseudoCodeParser.FUGGVENY);
	            this.state = 193;
	            this.match(PseudoCodeParser.WS);
	            this.state = 194;
	            this.functionName();
	            this.state = 195;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 196;
	            this.parameterWithType();
	            this.state = 204;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 197;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 199;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===47) {
	                    this.state = 198;
	                    this.match(PseudoCodeParser.WS);
	                }

	                this.state = 201;
	                this.parameterWithType();
	                this.state = 206;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 207;
	            this.match(PseudoCodeParser.T__5);
	            this.state = 208;
	            this.match(PseudoCodeParser.NL);
	            this.state = 209;
	            this.body();
	            this.state = 210;
	            this.match(PseudoCodeParser.FVEGE);
	            break;

	        case 2:
	            localctx = new FunctionDeclarationWithoutParametersContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 212;
	            this.match(PseudoCodeParser.FUGGVENY);
	            this.state = 213;
	            this.match(PseudoCodeParser.WS);
	            this.state = 214;
	            this.functionName();
	            this.state = 215;
	            this.match(PseudoCodeParser.T__6);
	            this.state = 216;
	            this.match(PseudoCodeParser.NL);
	            this.state = 217;
	            this.body();
	            this.state = 218;
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
	        this.state = 224;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===21) {
	            this.state = 222;
	            this.match(PseudoCodeParser.CIMSZERINT);
	            this.state = 223;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 226;
	        this.variable();
	        this.state = 228;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 227;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 230;
	        this.match(PseudoCodeParser.T__7);
	        this.state = 232;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 231;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 234;
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
	        this.state = 236;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 238;
	        this.variable();
	        this.state = 239;
	        this.match(PseudoCodeParser.T__14);
	        this.state = 241;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 240;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 243;
	        this.expression(0);
	        this.state = 245;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 244;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 247;
	        this.match(PseudoCodeParser.T__15);
	        this.state = 248;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 249;
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
	        this.state = 251;
	        this.variable();
	        this.state = 252;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 253;
	        this.match(PseudoCodeParser.T__16);
	        this.state = 255;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 254;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 257;
	        this.type();
	        this.state = 259;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 258;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 261;
	        this.match(PseudoCodeParser.T__17);
	        this.state = 263;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 262;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 265;
	        this.expression(0);
	        this.state = 267;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 266;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 269;
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
	        this.state = 271;
	        this.variable();
	        this.state = 272;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 273;
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
	        this.state = 280;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 44:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 276;
	            this.functionCall();
	            break;
	        case 36:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 277;
	            this.match(PseudoCodeParser.NOT);
	            this.state = 278;
	            this.expression(4);
	            break;
	        case 4:
	        case 35:
	        case 37:
	        case 38:
	        case 45:
	            localctx = new ValueExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 279;
	            this.value();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 320;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,30,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 318;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,29,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new CalculationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 282;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 284;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 283;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 286;
	                    this.match(PseudoCodeParser.OPERATOR);
	                    this.state = 288;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 287;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 290;
	                    this.expression(8);
	                    break;

	                case 2:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 291;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 293;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 292;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 295;
	                    this.match(PseudoCodeParser.COMPARISON);
	                    this.state = 297;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 296;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 299;
	                    this.expression(7);
	                    break;

	                case 3:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 300;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 302;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 301;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 304;
	                    this.match(PseudoCodeParser.ES);
	                    this.state = 306;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 305;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 308;
	                    this.expression(4);
	                    break;

	                case 4:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 309;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 311;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 310;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 313;
	                    this.match(PseudoCodeParser.VAGY);
	                    this.state = 315;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 314;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 317;
	                    this.expression(3);
	                    break;

	                } 
	            }
	            this.state = 322;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,30,this._ctx);
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
	        this.state = 323;
	        this.functionName();
	        this.state = 324;
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
	        this.state = 341;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 7:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 326;
	            this.match(PseudoCodeParser.T__6);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 327;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 328;
	            this.expression(0);
	            this.state = 336;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 329;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 331;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===47) {
	                    this.state = 330;
	                    this.match(PseudoCodeParser.WS);
	                }

	                this.state = 333;
	                this.expression(0);
	                this.state = 338;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 339;
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
	        this.state = 343;
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
	        this.state = 348;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,34,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 345;
	            this.arrayIndex();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 346;
	            this.atom();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 347;
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
	        this.state = 354;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 37:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 350;
	            this.number();
	            break;
	        case 38:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 351;
	            this.bool();
	            break;
	        case 35:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 352;
	            this.string();
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 353;
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
	        this.state = 356;
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
	        this.state = 358;
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
	        this.state = 360;
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
	        this.state = 362;
	        this.match(PseudoCodeParser.T__3);
	        this.state = 363;
	        this.expression(0);
	        this.state = 371;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===5) {
	            this.state = 364;
	            this.match(PseudoCodeParser.T__4);
	            this.state = 366;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===47) {
	                this.state = 365;
	                this.match(PseudoCodeParser.WS);
	            }

	            this.state = 368;
	            this.expression(0);
	            this.state = 373;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 374;
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
	        this.state = 376;
	        this.variable();
	        this.state = 381; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 377;
	        		this.match(PseudoCodeParser.T__14);
	        		this.state = 378;
	        		this.expression(0);
	        		this.state = 379;
	        		this.match(PseudoCodeParser.T__15);
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 383; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,38, this._ctx);
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
	        this.state = 385;
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
PseudoCodeParser.ASSIGN = 33;
PseudoCodeParser.NYIL = 34;
PseudoCodeParser.STRING = 35;
PseudoCodeParser.NOT = 36;
PseudoCodeParser.NUMBER = 37;
PseudoCodeParser.BOOL = 38;
PseudoCodeParser.IGAZ = 39;
PseudoCodeParser.VISSZA = 40;
PseudoCodeParser.HAMIS = 41;
PseudoCodeParser.ES = 42;
PseudoCodeParser.VAGY = 43;
PseudoCodeParser.FUNCTION = 44;
PseudoCodeParser.VARIABLE = 45;
PseudoCodeParser.NL = 46;
PseudoCodeParser.WS = 47;

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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
	};

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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
	};

	functionName() {
	    return this.getTypedRuleContext(FunctionNameContext,0);
	};

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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
