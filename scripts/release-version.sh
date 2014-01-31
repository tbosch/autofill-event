#!/bin/sh
set -e
cd $(dirname $0)/..

VERSION=$1

if [[ ! $VERSION ]]; then
  echo "Usage: $0 <version>"
  exit 1;
fi

# replaceJsonProp(jsonFile, propertyRegex, valueRegex, replacePattern)
# - note: propertyRegex will be automatically placed into a
#   capturing group! -> all other groups start at index 2!
function replaceJsonProp {
  replaceInFile $1 '"('$2')"[ ]*:[ ]*"'$3'"' '"\1": "'$4'"'
}

# replaceInFile(file, findPattern, replacePattern)
function replaceInFile {
  sed -i .tmp -E "s/$2/$3/" $1
  rm $1.tmp
}

replaceJsonProp "package.json" "version" ".*" $VERSION
replaceJsonProp "bower.json" "version" ".*" $VERSION
replaceInFile "src/autofill-event.js" "##version:[^#]*" "##version:$VERSION"

git add .
git commit -m "release v$VERSION"
git tag "v$VERSION"