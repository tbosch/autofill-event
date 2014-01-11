describe('login form', function(){
  var mt = window.manualTest;
  it('should prepare the browser', function(done) {
    mt.ask('Turn on the setting to save passwords<br>' +
      'Chrome: go to chrome://settings/ and show advanced options')
    .then(function() {
        return mt.load('login.html');
    }).
    then(function() {
        mt.ask('Enter username "user1" and password "pass1" and hit submit');
        return mt.waitForReload();
    }).
    then(function() {
        return mt.ask('There should be a popup that asks whether you want to store the password, say yes');
        // TODO: Allow yes/no popup
    });

  });

  it('auto fills username and password on load', function() {
    throw new Error('not implemented');
  });;

  it('auto clears password if the username is changed to an unknown user', function() {
    throw new Error('not implemented');
  });

  it('auto fills password if the username is changed ot a known user', function() {
    throw new Error('not implemented');
  });


});