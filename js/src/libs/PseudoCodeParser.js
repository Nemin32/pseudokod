// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import PseudoCodeListener from './PseudoCodeListener.js';
import PseudoCodeVisitor from './PseudoCodeVisitor.js';

const serializedATN = [4,1,47,438,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,1,0,3,0,68,8,0,1,
0,4,0,71,8,0,11,0,12,0,72,1,0,4,0,76,8,0,11,0,12,0,77,1,1,3,1,81,8,1,1,1,
1,1,4,1,85,8,1,11,1,12,1,86,4,1,89,8,1,11,1,12,1,90,1,2,1,2,1,2,1,2,1,2,
1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,106,8,2,1,2,4,2,109,8,2,11,2,12,2,110,
1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,4,6,127,8,6,11,6,
12,6,128,1,6,1,6,4,6,133,8,6,11,6,12,6,134,1,6,1,6,1,6,3,6,140,8,6,3,6,142,
8,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,4,7,154,8,7,11,7,12,7,155,1,
7,1,7,1,8,1,8,4,8,162,8,8,11,8,12,8,163,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,
4,9,174,8,9,11,9,12,9,175,1,9,1,9,1,9,1,10,1,10,4,10,183,8,10,11,10,12,10,
184,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,
1,11,4,11,202,8,11,11,11,12,11,203,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,
13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,4,14,222,8,14,11,14,12,14,223,
3,14,226,8,14,1,14,1,14,1,14,1,14,4,14,232,8,14,11,14,12,14,233,3,14,236,
8,14,1,14,5,14,239,8,14,10,14,12,14,242,9,14,1,14,1,14,4,14,246,8,14,11,
14,12,14,247,3,14,250,8,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
1,14,4,14,262,8,14,11,14,12,14,263,1,14,1,14,1,14,3,14,269,8,14,1,15,1,15,
3,15,273,8,15,1,15,1,15,3,15,277,8,15,1,15,1,15,3,15,281,8,15,1,15,1,15,
1,16,1,16,1,17,1,17,1,17,3,17,290,8,17,1,17,1,17,3,17,294,8,17,1,17,1,17,
1,17,1,17,1,18,1,18,1,18,1,18,3,18,304,8,18,1,18,1,18,3,18,308,8,18,1,18,
1,18,3,18,312,8,18,1,18,1,18,3,18,316,8,18,1,18,1,18,1,19,1,19,1,19,1,19,
1,20,1,20,1,20,1,20,1,20,3,20,329,8,20,1,20,1,20,3,20,333,8,20,1,20,1,20,
3,20,337,8,20,1,20,1,20,1,20,3,20,342,8,20,1,20,1,20,3,20,346,8,20,1,20,
1,20,1,20,3,20,351,8,20,1,20,1,20,3,20,355,8,20,1,20,1,20,1,20,3,20,360,
8,20,1,20,1,20,3,20,364,8,20,1,20,5,20,367,8,20,10,20,12,20,370,9,20,1,21,
1,21,1,21,1,22,1,22,1,22,1,22,1,22,3,22,380,8,22,1,22,5,22,383,8,22,10,22,
12,22,386,9,22,1,22,1,22,3,22,390,8,22,1,23,1,23,1,24,1,24,1,24,3,24,397,
8,24,1,25,1,25,1,25,1,25,3,25,403,8,25,1,26,1,26,1,27,1,27,1,28,1,28,1,29,
1,29,1,29,1,29,3,29,415,8,29,1,29,5,29,418,8,29,10,29,12,29,421,9,29,1,29,
1,29,1,30,1,30,1,30,1,30,1,30,4,30,430,8,30,11,30,12,30,431,1,31,1,31,1,
32,1,32,1,32,0,1,40,33,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,0,1,1,0,9,14,480,0,67,1,0,0,
0,2,80,1,0,0,0,4,105,1,0,0,0,6,112,1,0,0,0,8,114,1,0,0,0,10,118,1,0,0,0,
12,120,1,0,0,0,14,145,1,0,0,0,16,159,1,0,0,0,18,167,1,0,0,0,20,180,1,0,0,
0,22,191,1,0,0,0,24,208,1,0,0,0,26,212,1,0,0,0,28,268,1,0,0,0,30,272,1,0,
0,0,32,284,1,0,0,0,34,286,1,0,0,0,36,299,1,0,0,0,38,319,1,0,0,0,40,328,1,
0,0,0,42,371,1,0,0,0,44,389,1,0,0,0,46,391,1,0,0,0,48,396,1,0,0,0,50,402,
1,0,0,0,52,404,1,0,0,0,54,406,1,0,0,0,56,408,1,0,0,0,58,410,1,0,0,0,60,424,
1,0,0,0,62,433,1,0,0,0,64,435,1,0,0,0,66,68,5,47,0,0,67,66,1,0,0,0,67,68,
1,0,0,0,68,75,1,0,0,0,69,71,3,64,32,0,70,69,1,0,0,0,71,72,1,0,0,0,72,70,
1,0,0,0,72,73,1,0,0,0,73,76,1,0,0,0,74,76,3,4,2,0,75,70,1,0,0,0,75,74,1,
0,0,0,76,77,1,0,0,0,77,75,1,0,0,0,77,78,1,0,0,0,78,1,1,0,0,0,79,81,5,47,
0,0,80,79,1,0,0,0,80,81,1,0,0,0,81,88,1,0,0,0,82,89,3,4,2,0,83,85,3,64,32,
0,84,83,1,0,0,0,85,86,1,0,0,0,86,84,1,0,0,0,86,87,1,0,0,0,87,89,1,0,0,0,
88,82,1,0,0,0,88,84,1,0,0,0,89,90,1,0,0,0,90,88,1,0,0,0,90,91,1,0,0,0,91,
3,1,0,0,0,92,106,3,10,5,0,93,106,3,26,13,0,94,106,3,12,6,0,95,106,3,18,9,
0,96,106,3,20,10,0,97,106,3,22,11,0,98,106,3,34,17,0,99,106,3,36,18,0,100,
106,3,38,19,0,101,106,3,24,12,0,102,106,3,28,14,0,103,106,3,8,4,0,104,106,
3,6,3,0,105,92,1,0,0,0,105,93,1,0,0,0,105,94,1,0,0,0,105,95,1,0,0,0,105,
96,1,0,0,0,105,97,1,0,0,0,105,98,1,0,0,0,105,99,1,0,0,0,105,100,1,0,0,0,
105,101,1,0,0,0,105,102,1,0,0,0,105,103,1,0,0,0,105,104,1,0,0,0,106,108,
1,0,0,0,107,109,3,64,32,0,108,107,1,0,0,0,109,110,1,0,0,0,110,108,1,0,0,
0,110,111,1,0,0,0,111,5,1,0,0,0,112,113,5,1,0,0,113,7,1,0,0,0,114,115,5,
2,0,0,115,116,5,47,0,0,116,117,3,40,20,0,117,9,1,0,0,0,118,119,5,3,0,0,119,
11,1,0,0,0,120,121,5,24,0,0,121,122,5,47,0,0,122,123,3,40,20,0,123,124,5,
47,0,0,124,126,5,26,0,0,125,127,3,64,32,0,126,125,1,0,0,0,127,128,1,0,0,
0,128,126,1,0,0,0,128,129,1,0,0,0,129,130,1,0,0,0,130,141,3,2,1,0,131,133,
3,14,7,0,132,131,1,0,0,0,133,134,1,0,0,0,134,132,1,0,0,0,134,135,1,0,0,0,
135,136,1,0,0,0,136,137,3,16,8,0,137,142,1,0,0,0,138,140,3,16,8,0,139,138,
1,0,0,0,139,140,1,0,0,0,140,142,1,0,0,0,141,132,1,0,0,0,141,139,1,0,0,0,
142,143,1,0,0,0,143,144,5,30,0,0,144,13,1,0,0,0,145,146,5,25,0,0,146,147,
5,47,0,0,147,148,5,24,0,0,148,149,5,47,0,0,149,150,3,40,20,0,150,151,5,47,
0,0,151,153,5,26,0,0,152,154,3,64,32,0,153,152,1,0,0,0,154,155,1,0,0,0,155,
153,1,0,0,0,155,156,1,0,0,0,156,157,1,0,0,0,157,158,3,2,1,0,158,15,1,0,0,
0,159,161,5,25,0,0,160,162,3,64,32,0,161,160,1,0,0,0,162,163,1,0,0,0,163,
161,1,0,0,0,163,164,1,0,0,0,164,165,1,0,0,0,165,166,3,2,1,0,166,17,1,0,0,
0,167,168,5,23,0,0,168,169,5,47,0,0,169,170,5,22,0,0,170,171,5,47,0,0,171,
173,3,40,20,0,172,174,3,64,32,0,173,172,1,0,0,0,174,175,1,0,0,0,175,173,
1,0,0,0,175,176,1,0,0,0,176,177,1,0,0,0,177,178,3,2,1,0,178,179,5,29,0,0,
179,19,1,0,0,0,180,182,5,23,0,0,181,183,3,64,32,0,182,181,1,0,0,0,183,184,
1,0,0,0,184,182,1,0,0,0,184,185,1,0,0,0,185,186,1,0,0,0,186,187,3,2,1,0,
187,188,5,22,0,0,188,189,5,47,0,0,189,190,3,40,20,0,190,21,1,0,0,0,191,192,
5,23,0,0,192,193,5,47,0,0,193,194,3,62,31,0,194,195,5,33,0,0,195,196,3,40,
20,0,196,197,5,27,0,0,197,198,5,47,0,0,198,199,3,40,20,0,199,201,5,28,0,
0,200,202,3,64,32,0,201,200,1,0,0,0,202,203,1,0,0,0,203,201,1,0,0,0,203,
204,1,0,0,0,204,205,1,0,0,0,205,206,3,2,1,0,206,207,5,29,0,0,207,23,1,0,
0,0,208,209,5,40,0,0,209,210,5,47,0,0,210,211,3,40,20,0,211,25,1,0,0,0,212,
213,3,46,23,0,213,214,3,44,22,0,214,27,1,0,0,0,215,216,5,31,0,0,216,217,
5,47,0,0,217,218,3,46,23,0,218,225,5,4,0,0,219,226,5,47,0,0,220,222,3,64,
32,0,221,220,1,0,0,0,222,223,1,0,0,0,223,221,1,0,0,0,223,224,1,0,0,0,224,
226,1,0,0,0,225,219,1,0,0,0,225,221,1,0,0,0,225,226,1,0,0,0,226,227,1,0,
0,0,227,240,3,30,15,0,228,235,5,5,0,0,229,236,5,47,0,0,230,232,3,64,32,0,
231,230,1,0,0,0,232,233,1,0,0,0,233,231,1,0,0,0,233,234,1,0,0,0,234,236,
1,0,0,0,235,229,1,0,0,0,235,231,1,0,0,0,235,236,1,0,0,0,236,237,1,0,0,0,
237,239,3,30,15,0,238,228,1,0,0,0,239,242,1,0,0,0,240,238,1,0,0,0,240,241,
1,0,0,0,241,249,1,0,0,0,242,240,1,0,0,0,243,250,5,47,0,0,244,246,3,64,32,
0,245,244,1,0,0,0,246,247,1,0,0,0,247,245,1,0,0,0,247,248,1,0,0,0,248,250,
1,0,0,0,249,243,1,0,0,0,249,245,1,0,0,0,249,250,1,0,0,0,250,251,1,0,0,0,
251,252,5,6,0,0,252,253,3,64,32,0,253,254,3,2,1,0,254,255,5,32,0,0,255,269,
1,0,0,0,256,257,5,31,0,0,257,258,5,47,0,0,258,259,3,46,23,0,259,261,5,7,
0,0,260,262,3,64,32,0,261,260,1,0,0,0,262,263,1,0,0,0,263,261,1,0,0,0,263,
264,1,0,0,0,264,265,1,0,0,0,265,266,3,2,1,0,266,267,5,32,0,0,267,269,1,0,
0,0,268,215,1,0,0,0,268,256,1,0,0,0,269,29,1,0,0,0,270,271,5,21,0,0,271,
273,5,47,0,0,272,270,1,0,0,0,272,273,1,0,0,0,273,274,1,0,0,0,274,276,3,62,
31,0,275,277,5,47,0,0,276,275,1,0,0,0,276,277,1,0,0,0,277,278,1,0,0,0,278,
280,5,8,0,0,279,281,5,47,0,0,280,279,1,0,0,0,280,281,1,0,0,0,281,282,1,0,
0,0,282,283,3,32,16,0,283,31,1,0,0,0,284,285,7,0,0,0,285,33,1,0,0,0,286,
287,3,62,31,0,287,289,5,15,0,0,288,290,5,47,0,0,289,288,1,0,0,0,289,290,
1,0,0,0,290,291,1,0,0,0,291,293,3,40,20,0,292,294,5,47,0,0,293,292,1,0,0,
0,293,294,1,0,0,0,294,295,1,0,0,0,295,296,5,16,0,0,296,297,5,33,0,0,297,
298,3,40,20,0,298,35,1,0,0,0,299,300,3,62,31,0,300,301,5,33,0,0,301,303,
5,17,0,0,302,304,5,47,0,0,303,302,1,0,0,0,303,304,1,0,0,0,304,305,1,0,0,
0,305,307,3,32,16,0,306,308,5,47,0,0,307,306,1,0,0,0,307,308,1,0,0,0,308,
309,1,0,0,0,309,311,5,18,0,0,310,312,5,47,0,0,311,310,1,0,0,0,311,312,1,
0,0,0,312,313,1,0,0,0,313,315,3,40,20,0,314,316,5,47,0,0,315,314,1,0,0,0,
315,316,1,0,0,0,316,317,1,0,0,0,317,318,5,6,0,0,318,37,1,0,0,0,319,320,3,
62,31,0,320,321,5,33,0,0,321,322,3,40,20,0,322,39,1,0,0,0,323,324,6,20,-1,
0,324,329,3,42,21,0,325,326,5,36,0,0,326,329,3,40,20,4,327,329,3,48,24,0,
328,323,1,0,0,0,328,325,1,0,0,0,328,327,1,0,0,0,329,368,1,0,0,0,330,332,
10,7,0,0,331,333,5,47,0,0,332,331,1,0,0,0,332,333,1,0,0,0,333,334,1,0,0,
0,334,336,5,19,0,0,335,337,5,47,0,0,336,335,1,0,0,0,336,337,1,0,0,0,337,
338,1,0,0,0,338,367,3,40,20,8,339,341,10,6,0,0,340,342,5,47,0,0,341,340,
1,0,0,0,341,342,1,0,0,0,342,343,1,0,0,0,343,345,5,20,0,0,344,346,5,47,0,
0,345,344,1,0,0,0,345,346,1,0,0,0,346,347,1,0,0,0,347,367,3,40,20,7,348,
350,10,3,0,0,349,351,5,47,0,0,350,349,1,0,0,0,350,351,1,0,0,0,351,352,1,
0,0,0,352,354,5,42,0,0,353,355,5,47,0,0,354,353,1,0,0,0,354,355,1,0,0,0,
355,356,1,0,0,0,356,367,3,40,20,4,357,359,10,2,0,0,358,360,5,47,0,0,359,
358,1,0,0,0,359,360,1,0,0,0,360,361,1,0,0,0,361,363,5,43,0,0,362,364,5,47,
0,0,363,362,1,0,0,0,363,364,1,0,0,0,364,365,1,0,0,0,365,367,3,40,20,3,366,
330,1,0,0,0,366,339,1,0,0,0,366,348,1,0,0,0,366,357,1,0,0,0,367,370,1,0,
0,0,368,366,1,0,0,0,368,369,1,0,0,0,369,41,1,0,0,0,370,368,1,0,0,0,371,372,
3,46,23,0,372,373,3,44,22,0,373,43,1,0,0,0,374,390,5,7,0,0,375,376,5,4,0,
0,376,384,3,40,20,0,377,379,5,5,0,0,378,380,5,47,0,0,379,378,1,0,0,0,379,
380,1,0,0,0,380,381,1,0,0,0,381,383,3,40,20,0,382,377,1,0,0,0,383,386,1,
0,0,0,384,382,1,0,0,0,384,385,1,0,0,0,385,387,1,0,0,0,386,384,1,0,0,0,387,
388,5,6,0,0,388,390,1,0,0,0,389,374,1,0,0,0,389,375,1,0,0,0,390,45,1,0,0,
0,391,392,5,44,0,0,392,47,1,0,0,0,393,397,3,60,30,0,394,397,3,50,25,0,395,
397,3,62,31,0,396,393,1,0,0,0,396,394,1,0,0,0,396,395,1,0,0,0,397,49,1,0,
0,0,398,403,3,54,27,0,399,403,3,56,28,0,400,403,3,52,26,0,401,403,3,58,29,
0,402,398,1,0,0,0,402,399,1,0,0,0,402,400,1,0,0,0,402,401,1,0,0,0,403,51,
1,0,0,0,404,405,5,35,0,0,405,53,1,0,0,0,406,407,5,37,0,0,407,55,1,0,0,0,
408,409,5,38,0,0,409,57,1,0,0,0,410,411,5,4,0,0,411,419,3,40,20,0,412,414,
5,5,0,0,413,415,5,47,0,0,414,413,1,0,0,0,414,415,1,0,0,0,415,416,1,0,0,0,
416,418,3,40,20,0,417,412,1,0,0,0,418,421,1,0,0,0,419,417,1,0,0,0,419,420,
1,0,0,0,420,422,1,0,0,0,421,419,1,0,0,0,422,423,5,6,0,0,423,59,1,0,0,0,424,
429,3,62,31,0,425,426,5,15,0,0,426,427,3,40,20,0,427,428,5,16,0,0,428,430,
1,0,0,0,429,425,1,0,0,0,430,431,1,0,0,0,431,429,1,0,0,0,431,432,1,0,0,0,
432,61,1,0,0,0,433,434,5,45,0,0,434,63,1,0,0,0,435,436,5,46,0,0,436,65,1,
0,0,0,56,67,72,75,77,80,86,88,90,105,110,128,134,139,141,155,163,175,184,
203,223,225,233,235,240,247,249,263,268,272,276,280,289,293,303,307,311,
315,328,332,336,341,345,350,354,359,363,366,368,379,384,389,396,402,414,
419,431];


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
	        if(_la===47) {
	            this.state = 66;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 75; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 75;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 46:
	                this.state = 70; 
	                this._errHandler.sync(this);
	                var _alt = 1;
	                do {
	                	switch (_alt) {
	                	case 1:
	                		this.state = 69;
	                		this.newline();
	                		break;
	                	default:
	                		throw new antlr4.error.NoViableAltException(this);
	                	}
	                	this.state = 72; 
	                	this._errHandler.sync(this);
	                	_alt = this._interp.adaptivePredict(this._input,1, this._ctx);
	                } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	                break;
	            case 1:
	            case 2:
	            case 3:
	            case 23:
	            case 24:
	            case 31:
	            case 40:
	            case 44:
	            case 45:
	                this.state = 74;
	                this.statement();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 77; 
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



	body() {
	    let localctx = new BodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, PseudoCodeParser.RULE_body);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 80;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 79;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 88; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 88;
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
	                this.state = 82;
	                this.statement();
	                break;
	            case 46:
	                this.state = 84; 
	                this._errHandler.sync(this);
	                var _alt = 1;
	                do {
	                	switch (_alt) {
	                	case 1:
	                		this.state = 83;
	                		this.newline();
	                		break;
	                	default:
	                		throw new antlr4.error.NoViableAltException(this);
	                	}
	                	this.state = 86; 
	                	this._errHandler.sync(this);
	                	_alt = this._interp.adaptivePredict(this._input,5, this._ctx);
	                } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 90; 
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
	        this.state = 105;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 92;
	            this.vars();
	            break;

	        case 2:
	            this.state = 93;
	            this.methodCallStatement();
	            break;

	        case 3:
	            this.state = 94;
	            this.ifStatement();
	            break;

	        case 4:
	            this.state = 95;
	            this.whileStatement();
	            break;

	        case 5:
	            this.state = 96;
	            this.doWhileStatement();
	            break;

	        case 6:
	            this.state = 97;
	            this.forStatement();
	            break;

	        case 7:
	            this.state = 98;
	            this.arrayElementAssignmentStatement();
	            break;

	        case 8:
	            this.state = 99;
	            this.arrayAssignmentStatement();
	            break;

	        case 9:
	            this.state = 100;
	            this.assignmentStatement();
	            break;

	        case 10:
	            this.state = 101;
	            this.returnStatement();
	            break;

	        case 11:
	            this.state = 102;
	            this.functionDeclarationStatement();
	            break;

	        case 12:
	            this.state = 103;
	            this.debugPrintStatement();
	            break;

	        case 13:
	            this.state = 104;
	            this.debug();
	            break;

	        }
	        this.state = 108; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 107;
	        		this.newline();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 110; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,9, this._ctx);
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



	debug() {
	    let localctx = new DebugContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, PseudoCodeParser.RULE_debug);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 112;
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
	        this.state = 114;
	        this.match(PseudoCodeParser.T__1);
	        this.state = 115;
	        this.match(PseudoCodeParser.WS);
	        this.state = 116;
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
	        this.state = 118;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 120;
	        this.match(PseudoCodeParser.HA);
	        this.state = 121;
	        this.match(PseudoCodeParser.WS);
	        this.state = 122;
	        this.expression(0);
	        this.state = 123;
	        this.match(PseudoCodeParser.WS);
	        this.state = 124;
	        this.match(PseudoCodeParser.AKKOR);
	        this.state = 126; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 125;
	        		this.newline();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 128; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,10, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	        this.state = 130;
	        this.body();
	        this.state = 141;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 132; 
	            this._errHandler.sync(this);
	            var _alt = 1;
	            do {
	            	switch (_alt) {
	            	case 1:
	            		this.state = 131;
	            		this.elseIfBranch();
	            		break;
	            	default:
	            		throw new antlr4.error.NoViableAltException(this);
	            	}
	            	this.state = 134; 
	            	this._errHandler.sync(this);
	            	_alt = this._interp.adaptivePredict(this._input,11, this._ctx);
	            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	            this.state = 136;
	            this.elseBranch();
	            break;

	        case 2:
	            this.state = 139;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===25) {
	                this.state = 138;
	                this.elseBranch();
	            }

	            break;

	        }
	        this.state = 143;
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
	    this.enterRule(localctx, 14, PseudoCodeParser.RULE_elseIfBranch);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 145;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 146;
	        this.match(PseudoCodeParser.WS);
	        this.state = 147;
	        this.match(PseudoCodeParser.HA);
	        this.state = 148;
	        this.match(PseudoCodeParser.WS);
	        this.state = 149;
	        this.expression(0);
	        this.state = 150;
	        this.match(PseudoCodeParser.WS);
	        this.state = 151;
	        this.match(PseudoCodeParser.AKKOR);
	        this.state = 153; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 152;
	        		this.newline();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 155; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,14, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	        this.state = 157;
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
	        this.state = 159;
	        this.match(PseudoCodeParser.KULONBEN);
	        this.state = 161; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 160;
	        		this.newline();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 163; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,15, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	        this.state = 165;
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
	        this.state = 167;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 168;
	        this.match(PseudoCodeParser.WS);
	        this.state = 169;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 170;
	        this.match(PseudoCodeParser.WS);
	        this.state = 171;
	        this.expression(0);
	        this.state = 173; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 172;
	        		this.newline();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 175; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,16, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	        this.state = 177;
	        this.body();
	        this.state = 178;
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
	        this.state = 180;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 182; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 181;
	        		this.newline();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 184; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,17, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	        this.state = 186;
	        this.body();
	        this.state = 187;
	        this.match(PseudoCodeParser.AMIG);
	        this.state = 188;
	        this.match(PseudoCodeParser.WS);
	        this.state = 189;
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
	        this.state = 191;
	        this.match(PseudoCodeParser.CIKLUS);
	        this.state = 192;
	        this.match(PseudoCodeParser.WS);
	        this.state = 193;
	        this.variable();
	        this.state = 194;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 195;
	        this.expression(0);
	        this.state = 196;
	        this.match(PseudoCodeParser.CSTART);
	        this.state = 197;
	        this.match(PseudoCodeParser.WS);
	        this.state = 198;
	        this.expression(0);
	        this.state = 199;
	        this.match(PseudoCodeParser.CEND);
	        this.state = 201; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 200;
	        		this.newline();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 203; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,18, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	        this.state = 205;
	        this.body();
	        this.state = 206;
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
	        this.state = 208;
	        this.match(PseudoCodeParser.VISSZA);
	        this.state = 209;
	        this.match(PseudoCodeParser.WS);
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



	methodCallStatement() {
	    let localctx = new MethodCallStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, PseudoCodeParser.RULE_methodCallStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 212;
	        this.functionName();
	        this.state = 213;
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
	        this.state = 268;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new FunctionDeclarationWithParametersContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 215;
	            this.match(PseudoCodeParser.FUGGVENY);
	            this.state = 216;
	            this.match(PseudoCodeParser.WS);
	            this.state = 217;
	            this.functionName();
	            this.state = 218;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 225;
	            this._errHandler.sync(this);
	            switch (this._input.LA(1)) {
	            case 47:
	            	this.state = 219;
	            	this.match(PseudoCodeParser.WS);
	            	break;
	            case 46:
	            	this.state = 221; 
	            	this._errHandler.sync(this);
	            	_la = this._input.LA(1);
	            	do {
	            	    this.state = 220;
	            	    this.newline();
	            	    this.state = 223; 
	            	    this._errHandler.sync(this);
	            	    _la = this._input.LA(1);
	            	} while(_la===46);
	            	break;
	            case 21:
	            case 45:
	            	break;
	            default:
	            	break;
	            }
	            this.state = 227;
	            this.parameterWithType();
	            this.state = 240;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 228;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 235;
	                this._errHandler.sync(this);
	                switch (this._input.LA(1)) {
	                case 47:
	                	this.state = 229;
	                	this.match(PseudoCodeParser.WS);
	                	break;
	                case 46:
	                	this.state = 231; 
	                	this._errHandler.sync(this);
	                	_la = this._input.LA(1);
	                	do {
	                	    this.state = 230;
	                	    this.newline();
	                	    this.state = 233; 
	                	    this._errHandler.sync(this);
	                	    _la = this._input.LA(1);
	                	} while(_la===46);
	                	break;
	                case 21:
	                case 45:
	                	break;
	                default:
	                	break;
	                }
	                this.state = 237;
	                this.parameterWithType();
	                this.state = 242;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 249;
	            this._errHandler.sync(this);
	            switch (this._input.LA(1)) {
	            case 47:
	            	this.state = 243;
	            	this.match(PseudoCodeParser.WS);
	            	break;
	            case 46:
	            	this.state = 245; 
	            	this._errHandler.sync(this);
	            	_la = this._input.LA(1);
	            	do {
	            	    this.state = 244;
	            	    this.newline();
	            	    this.state = 247; 
	            	    this._errHandler.sync(this);
	            	    _la = this._input.LA(1);
	            	} while(_la===46);
	            	break;
	            case 6:
	            	break;
	            default:
	            	break;
	            }
	            this.state = 251;
	            this.match(PseudoCodeParser.T__5);
	            this.state = 252;
	            this.newline();
	            this.state = 253;
	            this.body();
	            this.state = 254;
	            this.match(PseudoCodeParser.FVEGE);
	            break;

	        case 2:
	            localctx = new FunctionDeclarationWithoutParametersContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 256;
	            this.match(PseudoCodeParser.FUGGVENY);
	            this.state = 257;
	            this.match(PseudoCodeParser.WS);
	            this.state = 258;
	            this.functionName();
	            this.state = 259;
	            this.match(PseudoCodeParser.T__6);
	            this.state = 261; 
	            this._errHandler.sync(this);
	            var _alt = 1;
	            do {
	            	switch (_alt) {
	            	case 1:
	            		this.state = 260;
	            		this.newline();
	            		break;
	            	default:
	            		throw new antlr4.error.NoViableAltException(this);
	            	}
	            	this.state = 263; 
	            	this._errHandler.sync(this);
	            	_alt = this._interp.adaptivePredict(this._input,26, this._ctx);
	            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	            this.state = 265;
	            this.body();
	            this.state = 266;
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
	        this.state = 272;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===21) {
	            this.state = 270;
	            this.match(PseudoCodeParser.CIMSZERINT);
	            this.state = 271;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 274;
	        this.variable();
	        this.state = 276;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 275;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 278;
	        this.match(PseudoCodeParser.T__7);
	        this.state = 280;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 279;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 282;
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
	        this.state = 284;
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
	        this.state = 286;
	        this.variable();
	        this.state = 287;
	        this.match(PseudoCodeParser.T__14);
	        this.state = 289;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 288;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 291;
	        this.expression(0);
	        this.state = 293;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 292;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 295;
	        this.match(PseudoCodeParser.T__15);
	        this.state = 296;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 297;
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
	        this.state = 299;
	        this.variable();
	        this.state = 300;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 301;
	        this.match(PseudoCodeParser.T__16);
	        this.state = 303;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 302;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 305;
	        this.type();
	        this.state = 307;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 306;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 309;
	        this.match(PseudoCodeParser.T__17);
	        this.state = 311;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 310;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 313;
	        this.expression(0);
	        this.state = 315;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===47) {
	            this.state = 314;
	            this.match(PseudoCodeParser.WS);
	        }

	        this.state = 317;
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
	        this.state = 319;
	        this.variable();
	        this.state = 320;
	        this.match(PseudoCodeParser.ASSIGN);
	        this.state = 321;
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
	        this.state = 328;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 44:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 324;
	            this.functionCall();
	            break;
	        case 36:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 325;
	            this.match(PseudoCodeParser.NOT);
	            this.state = 326;
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
	            this.state = 327;
	            this.value();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 368;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,47,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 366;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,46,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new CalculationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 330;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 332;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 331;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 334;
	                    this.match(PseudoCodeParser.OPERATOR);
	                    this.state = 336;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 335;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 338;
	                    this.expression(8);
	                    break;

	                case 2:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 339;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 341;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 340;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 343;
	                    this.match(PseudoCodeParser.COMPARISON);
	                    this.state = 345;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 344;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 347;
	                    this.expression(7);
	                    break;

	                case 3:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 348;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 350;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 349;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 352;
	                    this.match(PseudoCodeParser.ES);
	                    this.state = 354;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 353;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 356;
	                    this.expression(4);
	                    break;

	                case 4:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, PseudoCodeParser.RULE_expression);
	                    this.state = 357;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 359;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 358;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 361;
	                    this.match(PseudoCodeParser.VAGY);
	                    this.state = 363;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===47) {
	                        this.state = 362;
	                        this.match(PseudoCodeParser.WS);
	                    }

	                    this.state = 365;
	                    this.expression(3);
	                    break;

	                } 
	            }
	            this.state = 370;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,47,this._ctx);
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
	        this.state = 371;
	        this.functionName();
	        this.state = 372;
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
	        this.state = 389;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 7:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 374;
	            this.match(PseudoCodeParser.T__6);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 375;
	            this.match(PseudoCodeParser.T__3);
	            this.state = 376;
	            this.expression(0);
	            this.state = 384;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===5) {
	                this.state = 377;
	                this.match(PseudoCodeParser.T__4);
	                this.state = 379;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===47) {
	                    this.state = 378;
	                    this.match(PseudoCodeParser.WS);
	                }

	                this.state = 381;
	                this.expression(0);
	                this.state = 386;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 387;
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
	        this.state = 391;
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
	        this.state = 396;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,51,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 393;
	            this.arrayIndex();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 394;
	            this.atom();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 395;
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
	        this.state = 402;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 37:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 398;
	            this.number();
	            break;
	        case 38:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 399;
	            this.bool();
	            break;
	        case 35:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 400;
	            this.string();
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 401;
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
	        this.state = 404;
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
	        this.state = 406;
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
	        this.state = 408;
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
	        this.state = 410;
	        this.match(PseudoCodeParser.T__3);
	        this.state = 411;
	        this.expression(0);
	        this.state = 419;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===5) {
	            this.state = 412;
	            this.match(PseudoCodeParser.T__4);
	            this.state = 414;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===47) {
	                this.state = 413;
	                this.match(PseudoCodeParser.WS);
	            }

	            this.state = 416;
	            this.expression(0);
	            this.state = 421;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 422;
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
	        this.state = 424;
	        this.variable();
	        this.state = 429; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 425;
	        		this.match(PseudoCodeParser.T__14);
	        		this.state = 426;
	        		this.expression(0);
	        		this.state = 427;
	        		this.match(PseudoCodeParser.T__15);
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 431; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,55, this._ctx);
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
	        this.state = 433;
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
	        this.state = 435;
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

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	ELVEGE() {
	    return this.getToken(PseudoCodeParser.ELVEGE, 0);
	};

	elseBranch() {
	    return this.getTypedRuleContext(ElseBranchContext,0);
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

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
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

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	CVEGE() {
	    return this.getToken(PseudoCodeParser.CVEGE, 0);
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

	WS() {
	    return this.getToken(PseudoCodeParser.WS, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
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

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	CVEGE() {
	    return this.getToken(PseudoCodeParser.CVEGE, 0);
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

	body() {
	    return this.getTypedRuleContext(BodyContext,0);
	};

	FVEGE() {
	    return this.getToken(PseudoCodeParser.FVEGE, 0);
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

	NL() {
	    return this.getToken(PseudoCodeParser.NL, 0);
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
PseudoCodeParser.NewlineContext = NewlineContext; 
