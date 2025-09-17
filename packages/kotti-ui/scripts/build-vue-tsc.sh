#!/usr/bin/env bash

set -euo pipefail

# this directory is assumed to exist, so create it
mkdir -p dist/types

# delete all output files of vue-tsc in dist folder:
## - *.d.ts
find ./dist/types -type f -name "*.d.ts" -delete
## - *.cts
find ./dist/types -type f -name "*.cts" -delete
## - *.tsbuildinfo
find ./dist/types -type f -name "*.tsbuildinfo" -delete
## - empty directories that previously contained the above files
find ./dist/types -type d -empty -delete


# generate types
vue-tsc --declaration --emitDeclarationOnly

# HACK: duplicate index.d.ts in order to calm down publint
cp ./dist/types/index.d.ts ./dist/types/index.d.cts
