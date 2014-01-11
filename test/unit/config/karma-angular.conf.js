// Karma configuration
// Generated on Wed Jan 08 2014 11:10:14 GMT-0800 (PST)
var sharedConfig = require('./karma-shared.conf.js');

module.exports = function(config) {
  sharedConfig(config);
  config.set({
    files: [
      'bower_components/angular/angular.js',
      'test/unit/testutils.js',
      'src/**/*.js',
      'test/unit/**/*Spec.js'
    ],
    // web server port
    port: 9870
  });
};
