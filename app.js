// AIzaSyBw5bpMFfpdFnXDOa2_iBn-VDt4ySOmUXk

'use strict';

var express = require('express');
var request = require('request');
var app = express();

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

app.get('/', function(req, res, next) {
	res.status(403).send('You are not allowed to access this resource.');
});

app.get('/locations', function(req, res, next) {
	var lat = req.query.lat;
	var long = req.query.long;

	request('https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
		'?key=AIzaSyBw5bpMFfpdFnXDOa2_iBn-VDt4ySOmUXk' +
		'&rankby=distance' + 
		'&type=establishment' +
		'&location=' + lat + ',' + long, 
		function(error, response, body) { 
			if(!error && response.statusCode === 200) {
				res.send(body);
			}
		});
});

app.get('/address', function(req, res, next) {
	var lat = req.query.lat;
	var long = req.query.long;

	request('https://maps.googleapis.com/maps/api/geocode/json' +
		'?key=AIzaSyBw5bpMFfpdFnXDOa2_iBn-VDt4ySOmUXk' +
		'&latlng=' + lat + ',' + long, 
		function(error, response, body) { 
			if(!error && response.statusCode === 200) {
				res.send(body);
			}
		});
});

var server = app.listen(3001, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
