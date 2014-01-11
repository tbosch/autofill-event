describe('login form', function () {
  var user, pass, ngUser, ngPass,
    mt = window.manualTest;
  
  var userValue = 'someUser',
      passValue = 'somePass';
  
  beforeEach(function () {
    user = document.querySelector('.user');
    pass = document.querySelector('.pass');
    ngUser = document.querySelector('.ng-user');
    ngPass = document.querySelector('.ng-pass');

    waitForAutoFill();
  });

  it('auto fills username and password on load', function () {
    if (window.parent !== window) {
      throw new Error("This test can't be run in an iframe as Chrome then does not do the autofill on load");
    }
    if (!user.value) {
      throw new Error('browser does not support auto filling username/password on load');
    }
    expect(user.value).toBe(userValue);
    expect(pass.value).toBe(passValue);
    expect(ngUser.textContent).toBe(userValue);
    expect(ngPass.textContent).toBe(passValue);
  });

  it('auto fills password if the username is filled later on', function () {
    mt.askForInput(user, '', 'user field');
    mt.askForInput(pass, '', 'password field');
    mt.askToBlur(user, 'user field');
    mt.askToBlur(pass, 'password field');

    askForInputAndBlur(user, userValue, 'user field', 'using the dropdown');

    runs(function() {
      if (!pass.value) {
        throw new Error('browser does not support auto filling passwords later on');
      }

      expect(user.value).toBe(userValue);
      expect(pass.value).toBe(passValue);
      expect(ngUser.textContent).toBe(userValue);
      expect(ngPass.textContent).toBe(passValue);
    });
  });

  it('auto clears password if the username is cleared', function () {
    askForInputAndBlur(user, userValue, 'user field', 'using the dropdown');

    askForInputAndBlur(user, '', 'user field', '');
    runs(function() {
      if (pass.value) {
        throw new Error('browser does not support auto clearing of passwords');
      }

      expect(user.value).toBe('');
      expect(pass.value).toBe('');
      expect(ngUser.textContent).toBe('');
      expect(ngPass.textContent).toBe('');
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
