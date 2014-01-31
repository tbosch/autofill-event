(function() {
  var _markedElements = {};

  window.manualTest = {
    askForInput: askForInput,
    askToBlur: askToBlur
  };

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

  function askContainer() {
    return markedElement('ask-container');
  }

  function ask(msg) {
    var container = askContainer();
    container.innerHTML = '<div class="ask">'+msg+'</div>';
  }

  function clearAsk() {
    var container = askContainer();
    container.innerHTML = '';
  }

  function askForInput(input, value, desc) {
    desc = desc || '';
    runs(function() {
      var msg;
      if (value) {
        msg = 'Please enter "'+value+'" into '+desc;
      } else {
        msg = 'Please clear '+desc;
      }
      ask(msg);
    });
    waitsFor(function() {
      return input.value === value;
    }, 10000);
    runs(function() {
      clearAsk();
    });
  }

  function askToBlur(input, desc) {
    desc = desc || '';
    runs(function() {
      ask('Please leave ' + desc);
    }, 5000);
    waitsFor(function() {
      return document.activeElement !== input;
    });
    runs(function() {
      clearAsk();
    });
  }


  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  window.addEventListener('load', function() {
    document.querySelector('.prepare-done').addEventListener('click', start, false);
  }, false);


  function start() {

    document.querySelector('.prepare').style.display = 'none';
    jasmineEnv.execute();

  }

})();
