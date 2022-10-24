#!/bin/bash
yarn
antlr4 -Dlanguage=JavaScript -Xexact-output-dir ../PseudoCode.g4 -visitor -o src/libs/
yarn build