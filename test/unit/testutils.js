(function(window) {

  window.testutils = {
    $: window.jQuery || window.angular.element,
    triggerBlurEvent: triggerBlurEvent,
    triggerChangeEvent: triggerChangeEvent,
    triggerInputEvent: triggerInputEvent
  };

  function triggerBlurEvent(element) {
    triggerEvent('blur', element);
  }

  function triggerChangeEvent(element) {
    triggerEvent('change', element);
  }

  function triggerInputEvent(element) {
    triggerEvent('input',element);
  }

  function triggerEvent(name, element) {
    var doc = window.document;
    var event = doc.createEvent("HTMLEvents");
    event.initEvent(name, true, true);
    element.dispatchEvent(event);
  }


})(window);
