[![Build Status](https://travis-ci.org/tbosch/autofill-event.png?branch=master)](https://travis-ci.org/tbosch/autofill-event)
# Autofill event polyfill

This is a polyfill that fires change events when browsers autofill form fields without firing a change event.
The implementation is generic so it works in any application that uses either jQuery and/or Angular.

[Test page with manual tests](http://tbosch.github.io/autofill-event/)

## Install

* `bower install autofill-event`

## Usage

Add the script `autofill-event.js` after jQuery or Angular in your page.

This will do the following:

- after DOMContentLoaded: check all input fields
- a field is left: check all other fields in the same form

API (to manually trigger the check):

- `$el.checkAndTriggerAutoFillEvent()`:
  Execute the check for all DOM elements in the given jQuery / jQLite element.

## How it works

1. Remember all changes to input elements by the user (listening for change events)
and also by JavaScript (by intercepting `$el.val()` for jQuery / jQLite elements).
That changed value is stored on the element in a private property.

2. Checking an element for auto fill:
Compare the current `value` of the element with the remembered value. If it's different,
trigger a change event.


## Dependencies

AngularJS or jQuery (works with either one or both)

## Tests

Unit tests ([Travis CI](https://travis-ci.org/tbosch/autofill-event))

  1. `npm install`
  1. `bower install`
  1. `npm install karma -g`
  1. Run tests with jQuery: `karma start test/unit/config/karma-jquery.conf.js`
  1. Run tests with Angular: `karma start test/unit/config/karma-angular.conf.js`

Manual Tests ([live version](http://tbosch.github.io/autofill-event/))

  1. `npm install`
  1. `bower install`
  1. `scripts/webserver.js`
  1. open the [manual runner](http://localhost:8000/manual-tests.html) and follow instructions

Notes:

  * They need to be run with a webserver and without iframes, otherwise Chrome would not autofill username/password

