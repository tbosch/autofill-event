(function() {
  var _iframe, _markedElements = {};

  // Waiting 10 seconds by default for every test
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  window.manualTest = {
    load: load,
    waitFor: waitFor,
    waitForReload: waitForReload,
    testWin: testWin,
    ask: ask
  };

  function testWin() {
    return _iframe && _iframe.contentWindow;
  }

  function markedElement(cssClass) {
    var el = _markedElements[cssClass];
    if (!el) {
      el = _markedElements[cssClass] = document.querySelector('.'+cssClass);
    }
    if (!el) {
      throw new Error('Could not find an element with class "'+cssClass+'"!');
    }
    return el;
  }

  function iframeContainer() {
    return markedElement('testwin-container');
  }

  function askContainer() {
    return markedElement('ask-container');
  }

  function load(src) {
    var container = iframeContainer();
    container.innerHTML = '<iframe src="'+src+'" width="100%"></iframe>';
    _iframe = container.firstChild;
    return waitFor(isLoaded, 200);
  }

  function isLoaded() {
    var w = testWin(),
      doc = w && w.document;
    return doc && doc.readyState === 'complete';
  }

  function waitForReload(timeout) {
    testWin()._waitForReload = true;
    return waitFor(isLoaded, timeout);

    function condition() {
      var w = testWin();
      return w && !w._waitForReload && isLoaded();
    }
  }

  function waitFor(condition, done, timeout) {
    var deferred = Q.defer();
    var startTime = Date.now();
    check();
    return deferred.promise;

    function check() {
      if (timeout && (Date.now() - startTime > timeout)) {
        deferred.reject(new Error('Timeout while waiting for condition' + condition.name));
      } else if (condition()) {
        deferred.resolve();
      } else {
        window.setTimeout(check, 100);
      }
    }
  }

  function ask(msg) {
    var deferred = Q.defer();
    var container = askContainer();
    container.innerHTML = '<div class="ask"><div class="ask-message">'+msg+'</div><button class="ask-done">Done</button></div>';
    var btn = container.querySelector('.ask-done');
    btn.addEventListener('click', close, false);
    return deferred.promise;

    function close() {
      container.innerHTML = '';
      deferred.resolve();
    }
  }

})();