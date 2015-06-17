// AIzaSyBw5bpMFfpdFnXDOa2_iBn-VDt4ySOmUXk

'use strict';

var express = require('express');
var app = express();

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

app.get('/', function(req, res, next) {
	res.status(403).send('You are not allowed to access this resource.');
});

app.use('/location', require('./routes/location'));

var server = app.listen(3001, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});