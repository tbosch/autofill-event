#!/bin/sh

set -xe

cd $(dirname $0)/..

bower install

rm -fr dist/*
cp -r src test third_party bower_components dist/
cp index.html dist/index.html

cd dist
git add .
git commit -m "Update gh-pages"
git push origin gh-pages

