describe('normal forms', function() {
  var name, address, city, state, ngName, ngAddress, ngCity, ngState,
    mt = window.manualTest;

  var nameValue = 'Some User',
    addressValue = '1234 Some Street',
    cityValue = 'Some City',
    stateValue = 'Oblivion';

  beforeEach(function () {
    name = document.querySelector('.name');
    address = document.querySelector('.address');
    city = document.querySelector('.city');
    state = document.querySelector('.state');

    ngName = document.querySelector('.ng-name');
    ngAddress = document.querySelector('.ng-address');
    ngCity = document.querySelector('.ng-city');
    ngState = document.querySelector('.ng-state');
  });

  beforeEach(function() {
    mt.askForInput(name, '', 'user field');
    mt.askForInput(address, '', 'address field');
    mt.askForInput(city, '', 'city field');
    mt.askForInput(state, '', 'state field');
    mt.askToBlur(name, 'name field');
    mt.askToBlur(address, 'address field');
    mt.askToBlur(city, 'city field');
    mt.askToBlur(state, 'state field');
    waitForAutoFill();
  });

  it('completes a user field with history values for the same field', function() {
    askForInputAndBlur(name, nameValue, 'user field', 'using the dropdown');

    runs(function() {
      if (!name.value) {
        throw new Error('browser does not support auto filling values');
      }
      expect(name.value).toBe(nameValue);
      expect(ngName.textContent).toBe(nameValue);
    });
  });

  it('completes other address fields when one is filled', function() {
    askForInputAndBlur(name, nameValue, 'user field', 'using the dropdown');

    runs(function() {
      if (!name.value) {
        throw new Error('browser does not support auto filling values');
      }
      if (!address.value) {
        throw new Error('browser does not support auto filling other address fields when one is filled');
      }
      expect(name.value).toBe(nameValue);
      expect(address.value).toBe(addressValue);
      expect(city.value).toBe(cityValue);
      expect(state.value).toBe(stateValue);

      expect(ngName.textContent).toBe(nameValue);
      expect(ngAddress.textContent).toBe(addressValue);
      expect(ngCity.textContent).toBe(cityValue);
      expect(ngState.textContent).toBe(stateValue);
    });
  });

  function askForInputAndBlur(input, value, fieldName, desc) {
    desc = desc && desc + ' ';
    mt.askForInput(input, value, fieldName + desc + ' and leave it');
    mt.askToBlur(input, fieldName);
    waitForAutoFill();
  }

  function waitForAutoFill() {
    waits(500);
  }


});
