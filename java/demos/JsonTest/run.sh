#!/bin/bash
# Generates Swift classes from FOAM models.

cd $(dirname $0) || exit 1

# Generate the FOAM classes.
mkdir -p Generated
rm Generated/*

CLASS_PATH=./js

node --harmony ../../../tools/foam.js \
     --classpath "$CLASS_PATH" \
     --flags debug,java,compiletime \
      foam.tools.GenJava \
      outfolder="Generated" \
      names=" \
        test.TestModel \
      "

rm -r Classes
mkdir -p Classes
javac -d Classes/ \
  Generated/* \
  ../../foam/core2/* \
  ../../foam/lib/json/* \
  ../../foam/lib/parse/*
java -cp Classes test.TestModel
