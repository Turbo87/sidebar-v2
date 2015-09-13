#!/bin/bash

set -e

eval "$(ssh-agent -s)"

openssl aes-256-cbc -K $encrypted_7b39fbac058d_key -iv $encrypted_7b39fbac058d_iv -in .travis/deploy_key.pem.enc -out .travis/deploy_key.pem -d
chmod 600 .travis/deploy_key.pem
ssh-add .travis/deploy_key.pem

mkdir gh-pages
cd gh-pages
cp -R ../examples ../css ../js .

git init
git config user.name "Travis"
git config user.email "noreply@travis-ci.org"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet git@github.com:Turbo87/sidebar-v2.git master:gh-pages > /dev/null 2>&1
