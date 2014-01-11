#!/usr/bin/env node
var connect = require('connect'),
    http = require('http');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.directory(__dirname + '/..'))
  .use(connect.static(__dirname + '/..'));

http.createServer(app).listen(8000,"0.0.0.0");
