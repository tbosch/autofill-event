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

  it('should check input elements in the same form and not in other forms after 20ms when an element is blurred', function() {
    jasmine.Clock.useMock();

    var spy = spyOn(testutils.$.prototype, 'checkAndTriggerAutoFillEvent');

    container.append('<form><input type="text" id="id1"><input type="text" id="id2"></form><form><input type="text" id="id3"></form>');
    var inputs = container.find('input');

    testutils.triggerBlurEvent(inputs[0]);
    expect(spy).not.toHaveBeenCalled();

    jasmine.Clock.tick(20);

    expect(spy).toHaveBeenCalled();
    expect(spy.calls[0].object.length).toBe(2);
    expect(spy.calls[0].object[0]).toBe(inputs[0]);
    expect(spy.calls[0].object[1]).toBe(inputs[1]);
  });

  it('should check select elements in the same form and not in other forms after 20ms when an element is blurred', function() {
    jasmine.Clock.useMock();

    var spy = spyOn(testutils.$.prototype, 'checkAndTriggerAutoFillEvent');

    container.append("<form>" +
      "<select id='sel1'><option value='1'>1</option><option value='2'>2</option></select>" +
      "<select id='sel2'><option value='3'>3</option><option value='4'>4</option></select>" +
      "</form><form>" +
      "<select id='sel3'><option value='5'>5</option></select>" +
      "</form>");
    var selects = container.find('select');

    testutils.triggerBlurEvent(selects[0]);
    expect(spy).not.toHaveBeenCalled();

    jasmine.Clock.tick(20);

    expect(spy).toHaveBeenCalled();
    expect(spy.calls[1].object.length).toBe(2);
    expect(spy.calls[1].object[0]).toBe(selects[0]);
    expect(spy.calls[1].object[1]).toBe(selects[1]);
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

    describe('misc', function() {
      it('should not fire for untouched inputs with empty value', function() {
        input.checkAndTriggerAutoFillEvent();
        expect(input[0].changeEventCount).toBeUndefined();
      });

      it('should not fire if inputs are added with predefined value', function() {
        container.append('<input type="text" value="test">');
        var newInput = container.children().eq(1);
        newInput.checkAndTriggerAutoFillEvent();
        expect(newInput[0].changeEventCount).toBeUndefined();
      });

    });

    it('should fire a change event if the value was changed by another way', function() {
      // Don't use .val as we intercept this!
      input[0].value = 'someValue';

      input.checkAndTriggerAutoFillEvent();

      expect(input[0].changeEventCount).toBe(1);
    });

  });


  describe('checkAndTriggerAutoFillEvent with selects', function() {
    var select;

    beforeEach(function() {
      container.append('<select><option></option><option value="someValue">test value</option></select>');
      select = container.children().eq(0);
    });


    describe('changes by user via change event', function() {
      it('should not fire an extra change event when there was a change event for the element', function() {
        // Don't use .val as we intercept this!
        select[0].value = 'someValue';

        testutils.triggerChangeEvent(select[0]);
        expect(select[0].changeEventCount).toBe(1);

        select.checkAndTriggerAutoFillEvent();

        expect(select[0].changeEventCount).toBe(1);
      });

      it('should not fire an extra change event when the value did not change', function() {
        // Don't use .val as we intercept this!
        select[0].value = 'someValue';

        testutils.triggerChangeEvent(select[0]);
        select.checkAndTriggerAutoFillEvent();

        testutils.triggerChangeEvent(select[0]);
        select.checkAndTriggerAutoFillEvent();

        expect(select[0].changeEventCount).toBe(2);
      });
    });

    describe('changes by js code via $.fn.val', function() {
      it('should not fire a change event when js code changes the element', function() {
        select.val('someValue');
        expect(select[0].changeEventCount).toBeUndefined();

        select.checkAndTriggerAutoFillEvent();

        expect(select[0].changeEventCount).toBeUndefined();
      });

      it('should not fire an extra change event when the value did not change', function() {
        select.val('someValue');
        select.checkAndTriggerAutoFillEvent();

        select.val('someValue');
        select.checkAndTriggerAutoFillEvent();

        expect(select[0].changeEventCount).toBeUndefined();
      });
    });

    describe('misc', function() {
      it('should not fire for untouched select with empty value', function() {
        select.checkAndTriggerAutoFillEvent();
        expect(select[0].changeEventCount).toBeUndefined();
      });

      it('should not fire if select boxes are added with predefined value', function() {
        container.append('<select><option value="someValue" selected="selected">test value</option></select>');
        var newSelect = container.children().eq(1);
        newSelect.checkAndTriggerAutoFillEvent();
        expect(newSelect[0].changeEventCount).toBeUndefined();
      });
    });

    it('should fire a change event if the value was changed by another way', function() {
      // Don't use .val as we intercept this!
      select[0].value = 'someValue';

      select.checkAndTriggerAutoFillEvent();

      expect(select[0].changeEventCount).toBe(1);
    });

  });


});
