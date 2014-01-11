(function(window) {

  window.testutils = {
    $: window.jQuery || window.angular.element,
    triggerChangeEvent: triggerChangeEvent
  };

  function triggerChangeEvent(element) {
    var doc = window.document;
    var event = doc.createEvent("HTMLEvents");
    event.initEvent("change", true, true);
    element.dispatchEvent(event);
  }


})(window);