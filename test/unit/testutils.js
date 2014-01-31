(function(window) {

  window.testutils = {
    $: window.jQuery || window.angular.element,
    triggerBlurEvent: triggerBlurEvent,
    triggerChangeEvent: triggerChangeEvent
  };

  function triggerBlurEvent(element) {
    triggerEvent('blur', element);
  }

  function triggerChangeEvent(element) {
    triggerEvent('change', element);
  }

  function triggerEvent(name, element) {
    var doc = window.document;
    var event = doc.createEvent("HTMLEvents");
    event.initEvent(name, true, true);
    element.dispatchEvent(event);
  }


})(window);
