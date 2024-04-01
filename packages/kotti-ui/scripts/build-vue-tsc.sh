#!/usr/bin/env bash

set -euo pipefail

# this directory is assumed to exist, so create it
mkdir -p dist

# delete all output files of vue-tsc in dist folder:
## - *.d.ts
find ./dist -type f -name "*.d.ts" -delete
## - *.cts
find ./dist -type f -name "*.cts" -delete
## - empty directories that previously contained the above files
find ./dist -type d -empty -delete

# generate types
vue-tsc --declaration --emitDeclarationOnly

# HACK: duplicate index.d.ts in order to calm down publint
cp ./dist/index.d.ts ./dist/index.d.cts
