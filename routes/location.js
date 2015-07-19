'use strict';

var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/places', function(req, res, next) {
	var lat = req.query.lat;
	var long = req.query.long;

	request('https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
		'?key=AIzaSyBw5bpMFfpdFnXDOa2_iBn-VDt4ySOmUXk' +
		'&rankby=distance' +
		'&type=establishment' +
		'&location=' + lat + ',' + long,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				res.send(body);
			} else {
				next(error);
			}
		});
});

router.get('/address', function(req, res, next) {
	var lat = req.query.lat;
	var long = req.query.long;

	request('https://maps.googleapis.com/maps/api/geocode/json' +
		'?key=AIzaSyBw5bpMFfpdFnXDOa2_iBn-VDt4ySOmUXk' +
		'&latlng=' + lat + ',' + long,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				res.send(body);
			} else {
				next(error);
			}
		});
});

module.exports = router;
