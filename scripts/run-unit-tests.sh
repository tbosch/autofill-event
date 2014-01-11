#!/bin/sh

set -e

BROWSERS=$1
if [[ ! $BROWSERS ]]; then
  BROWSERS="Chrome"
fi

cd $(dirname $0)/..

./node_modules/.bin/karma start test/unit/config/karma-angular.conf.js --single-run=true --browsers $BROWSERS
./node_modules/.bin/karma start test/unit/config/karma-jquery.conf.js --single-run=true --browsers $BROWSERS
