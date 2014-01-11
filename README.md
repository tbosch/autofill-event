TODO:
- test manual test cases on Chrome, Firefox and Safari
- add unit testcase when the browser starts:
  * expose helper function that just checks all fields!
- add unit test case:
  * 3 fields -> should not fire change event for last one twice!
  * need a local semaphore for this so that we don't check while we
      are triggering change events manually!

- gh pages with the manual test cases
  * link to test/manual/index.html for manual test cases
- publish to bower
- add Travis CI

# Run manual tests:

  1. run scripts/webserver.js
  2. visit http://localhost:8000/test/manual/runner.html and follow instructions