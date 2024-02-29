#!/usr/bin/env bash

set -euo pipefail

# clean
rm -rf dist

# build cjs (common JS) and mjs (esm)
tsc --build --verbose ./tsconfig.cjs.json ./tsconfig.mjs.json

# hack: add mjs file extensions since package is type commonjs
pushd dist/mjs
mv index.js index.mjs
mv index.js.map index.mjs.map
mv index.d.ts index.d.mts
popd
