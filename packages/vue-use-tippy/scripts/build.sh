#!/usr/bin/env bash

set -euo pipefail

# clean
rm -rf dist

# build cjs (common JS) and mjs (esm)
tsc --build --verbose ./tsconfig.cjs.json ./tsconfig.mjs.json

# hack: add cjs file extensions since package is type module
pushd dist/cjs
mv index.js index.cjs
mv index.js.map index.cjs.map
mv index.d.ts index.d.cts
popd
