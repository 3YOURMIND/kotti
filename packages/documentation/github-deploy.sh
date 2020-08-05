#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run build

# navigate into the build output directory
cd gh-pages/

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:3YOURMIND/kotti.git master:gh-pages

cd -
rm -rf gh-pages
