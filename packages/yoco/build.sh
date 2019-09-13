#!/bin/bash
set -e
rm -rf dist
mkdir dist
cp docs/yoco-icon.css dist/
cp -r docs/fonts/. dist/fonts
cp -r svg/. dist/svg