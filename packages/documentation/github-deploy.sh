#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run build:gh-pages

# navigate into the build output directory
cd gh-pages/

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:3YOURMIND/kotti.git master:gh-pages

cd -
