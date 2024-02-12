#!/usr/bin/env bash

set -euo pipefail

concurrently \
	"yarn --cwd packages/vue-use-tippy run build" \
	"yarn --cwd packages/yoco run build"

concurrently \
	"yarn --cwd packages/kotti-ui run build:vite --mode production" \
	"yarn --cwd packages/kotti-ui run build:vue-tsc"
