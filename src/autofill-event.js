(function(window) {
  addInputValueSetterListener(markValue);
  addGlobalChangeEventListener(window.document.documentElement, markAndCheckFormInputs);

  return;

  // ----------

  function markValue(el) {
    el.$$currentValue = el.value;
  }

  function valueMarked(el) {
    var val = el.value,
         $$currentValue = el.$$currentValue;
    if (!val && !$$currentValue) {
      return true;
    }
    return val === $$currentValue;
  }

  function addInputValueSetterListener(listener) {
    var jq = window.jQuery || window.angular.element,
        jqProto = jq.prototype;
    var _val = jqProto.val;
    jqProto.val = function(newValue) {
      var res = _val.apply(this, arguments);
      if (arguments.length > 0) {
        arrForEach(this, function(el) {
          listener(el, newValue);
        });
      }
      return res;
    }
  }

  function addGlobalChangeEventListener(rootElement, listener) {
    // Use a capturing event listener so that
    // we also get the event when it's stopped!
    rootElement.addEventListener('change', onchange, true);

    function onchange(event) {
      var target = event.target;
      listener(target);
    }
  }

  function markAndCheckFormInputs(input) {
    markValue(input);
    window.setTimeout(function() {
      checkAndFireChangeEvent(findInputsInSameForm(input));
    }, 11);
  }

  function findInputsInSameForm(el) {
    while (el) {
      if (el.nodeName === 'FORM') {
        return el.getElementsByTagName('input');
      }
      el = el.parentNode;
    }
    return [];
  }

  function checkAndFireChangeEvent(elements) {
    arrForEach(elements, function(el) {
      if (!valueMarked(el)) {
        markValue(el);
        triggerChangeEvent(el);
      }
    });
  }

  function triggerChangeEvent(element) {
    var doc = window.document;
    var event = doc.createEvent("HTMLEvents");
    event.initEvent("change", true, true);
    element.dispatchEvent(event);
  }

  function arrForEach(arr, listener) {
    if (arr.forEach) {
      return arr.forEach(listener);
    }
    var i;
    for (i=0; i<arr.length; i++) {
      listener(arr[i]);
    }
  }



})(window);