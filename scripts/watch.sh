#!/usr/bin/env bash

set -euo pipefail

SCRIPTS_DIR="$(dirname "${BASH_SOURCE[0]}")"
"$SCRIPTS_DIR/build-kotti.sh"

nodemon \
	--watch packages/vue-use-tippy/source \
	--watch packages/yoco/source \
	-e js,ts,vue,scss,css,json \
	--exec "\\
		concurrently \\
			\"yarn --cwd packages/vue-use-tippy run build\" \\
			\"yarn --cwd packages/yoco run build\" \\
		&& concurrently \\
			\"yarn --cwd packages/documentation run serve\" \\
			\"yarn --cwd packages/kotti-ui run build:vite --watch\" \\
			\"yarn --cwd packages/kotti-ui run build:vue-tsc\" \\
	"
