#!/usr/bin/env sh

# Abort script execution if any errors
set -e

# Build the VueJS app
npm run build

# Go to the directory where the app got generated
cd dist

# Deployment step: Add, commit, and push the changes 
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:HanWenGeng/CSC-642-Assignment.git master:gh-pages

# Return to previous directory
cd -