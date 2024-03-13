#!/usr/bin/env bash

set -euo pipefail

"$(yarn bin)/concurrently" \
	"yarn --cwd packages/vue-use-tippy run build" \
	"yarn --cwd packages/yoco run build"

"$(yarn bin)/concurrently" \
	"yarn --cwd packages/kotti-ui run build:vite --mode production" \
	"yarn --cwd packages/kotti-ui run build:vue-tsc && cp packages/kotti-ui/dist/index.d.ts packages/kotti-ui/dist/index.d.cts"
