describe('check other inputs when one input fires a blur event', function() {
  var container;

  beforeEach(function() {
    container = testutils.$('<div></div>');
    document.body.appendChild(container[0]);
    container.on('change', function(event) {
      event.target.changeEventCount = event.target.changeEventCount || 0;
      event.target.changeEventCount++;
    });
  });

  afterEach(function() {
    container.remove()
  });

  it('should check elements in the same form and not in other forms after 20ms when an element is blurred', function() {
    jasmine.Clock.useMock();

    var spy = spyOn(testutils.$.prototype, 'checkAndTriggerAutoFillEvent');

    container.append('<form><input type="text" id="id1"><input type="text" id="id2"></form><form><input type="text" id="id3"></form>');
    var inputs = container.find('input');

    testutils.triggerBlurEvent(inputs[0]);
    expect(spy).not.toHaveBeenCalled();

    jasmine.Clock.tick(20);

    expect(spy).toHaveBeenCalled();
    expect(spy.mostRecentCall.object.length).toBe(2);
    expect(spy.mostRecentCall.object[0]).toBe(inputs[0]);
    expect(spy.mostRecentCall.object[1]).toBe(inputs[1]);
  });

  describe('checkAndTriggerAutoFillEvent', function() {
    var input;

    beforeEach(function() {
      container.append('<input type="text">');
      input = container.children().eq(0);
    });


    describe('changes by user via change event', function() {

      it('should not fire an extra change event when there was a change event for the element', function() {
        // Don't use .val as we intercept this!
        input[0].value = 'someValue';

        testutils.triggerChangeEvent(input[0]);
        expect(input[0].changeEventCount).toBe(1);

        input.checkAndTriggerAutoFillEvent();

        expect(input[0].changeEventCount).toBe(1);
      });

      it('should not fire an extra change event when the value did not change', function() {
        // Don't use .val as we intercept this!
        input[0].value = 'someValue';

        testutils.triggerChangeEvent(input[0]);
        input.checkAndTriggerAutoFillEvent();

        testutils.triggerChangeEvent(input[0]);
        input.checkAndTriggerAutoFillEvent();

        expect(input[0].changeEventCount).toBe(2);
      });

    });

    describe('changes by js code via $.fn.val', function() {

      it('should not fire a change event when js code changes the element', function() {
        input.val('someValue');
        expect(input[0].changeEventCount).toBeUndefined();

        input.checkAndTriggerAutoFillEvent();

        expect(input[0].changeEventCount).toBeUndefined();
      });

      it('should not fire an extra change event when the value did not change', function() {
        input.val('someValue');
        input.checkAndTriggerAutoFillEvent();

        input.val('someValue');
        input.checkAndTriggerAutoFillEvent();

        expect(input[0].changeEventCount).toBeUndefined();
      });


    });

    it('should fire a change event if the value was changed by another way', function() {
      // Don't use .val as we intercept this!
      input[0].value = 'someValue';

      input.checkAndTriggerAutoFillEvent();

      expect(input[0].changeEventCount).toBe(1);
    });

  });

});
