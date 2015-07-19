'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var facebookInit = require('./oauth/loadscript');
var app = express();

mongoose.connect('mongodb://localhost/buble0');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Method', '*');
	next();
});

/*
app.use(function(req, res, next) {
	facebookInit
	next();
}
*/


app.use('/location', require('./routes/location'));
app.use('/users', require('./routes/users'));
app.use('/checkins', require('./routes/checkins'));
app.use('/wallposts', require('./routes/wallposts'));

app.get('/', function(req, res) {
	res.status(403).send('You are not allowed to access this resource.');
});

// Error Handling Middleware
app.use(function(err, req, res) {
	console.error(err.message);
	res.status(500).json(err);
});

var server = app.listen(3001, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
