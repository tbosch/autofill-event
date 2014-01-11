describe('check other inputs when one input fires a change event', function() {
  var container, onchangeSpy;
  beforeEach(function() {
    jasmine.Clock.useMock();
    container = testutils.$('<div></div>');
    document.body.appendChild(container[0]);
    container.on('change', function(event) {
      event.target.eventCount = event.target.eventCount || 0;
      event.target.eventCount++;
    });
  });

  afterEach(function() {
    container.remove()
  });

  var userChangedField, autoFilledField;

  function setup(html) {
    container.append(html);
    var inputs = container.find('input');
    userChangedField = inputs.eq(0);
    autoFilledField = inputs.eq(1);
  }

  function setupSameForm() {
    setup('<form><input type="text"><input type="text"></form>');
  }

  function userChangedInput(waitMs) {
    testutils.triggerChangeEvent(userChangedField[0]);
    jasmine.Clock.tick(waitMs || 100);
  }

  it('should not fire an extra change event on the changed element', function() {
    setupSameForm();

    userChangedInput();

    expect(userChangedField[0].eventCount).toBe(1);
  });

  it('should not fire a change event when js code changes the element', function() {
    setupSameForm();

    autoFilledField.val('someValue');

    userChangedInput();

    expect(autoFilledField[0].eventCount).toBeUndefined();
  });


  it('should not check inputs in other forms', function() {
    setup('<form><input type="text"></form><form><input type="text"></form>');

    autoFilledField[0].value = 'someValue';

    userChangedInput();

    expect(autoFilledField[0].eventCount).toBeUndefined();
  });

  it('should not fire an extra change event if the browser fires the change events correctly within 10ms', function() {
    setupSameForm();

    autoFilledField[0].value = 'someValue';

    testutils.triggerChangeEvent(userChangedField[0]);
    jasmine.Clock.tick(9);
    testutils.triggerChangeEvent(autoFilledField[0]);
    jasmine.Clock.tick(20);

    expect(userChangedField[0].eventCount).toBe(1);
    expect(autoFilledField[0].eventCount).toBe(1);
  });


  it('should detect changed inputs in the same form', function() {
    setupSameForm();

    // no change, no new change event

    userChangedInput();
    expect(autoFilledField[0].eventCount).toBeUndefined();

    autoFilledField[0].value = 'someValue';

    userChangedInput();
    expect(autoFilledField[0].eventCount).toBe(1);

    autoFilledField[0].value = 'someNewValue';

    userChangedInput();
    expect(autoFilledField[0].eventCount).toBe(2);

    // no change, no new change event

    userChangedInput();
    expect(autoFilledField[0].eventCount).toBe(2);
  });

  // This is important as the autofill happens AFTER the change event
  // from one element!
  it('should check for changes not before 10ms after the change event', function() {
    setupSameForm();

    userChangedInput(10);
    expect(autoFilledField[0].eventCount).toBeUndefined();

    autoFilledField[0].value = 'someNewValue';

    jasmine.Clock.tick(1000);
    expect(autoFilledField[0].eventCount).toBe(1);
  });

  it('should check for changes even with stopPropagation', function() {
    setupSameForm();

    userChangedField.on('change', function(event) {
      event.stopPropagation()
    });

    autoFilledField[0].value = 'someNewValue';

    userChangedInput();
    expect(autoFilledField[0].eventCount).toBe(1);
  });
});