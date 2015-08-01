'use strict';

var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var passport = require('passport');
var app = express();

mongoose.connect('mongodb://localhost/buble0');

// app.use(cookieParser('buble rules'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(session({
	secret: 'buble rules',
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24}
}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
	console.log('\n=================\nVERIFYING USER IS LOGGED IN\n=================');
	console.log('Session: ', req.session);
	console.log('Session ID: ', req.session.id);
	console.log('isAuthenticated result: ', req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

app.use('/auth', require('./routes/auth'));
app.use('/location', isLoggedIn, require('./routes/location'));
app.use('/users', isLoggedIn, require('./routes/users'));
app.use('/checkins', isLoggedIn, require('./routes/checkins'));
app.use('/wallposts', isLoggedIn, require('./routes/wallposts'));

app.get('/', function(req, res) {
	if (req.isAuthenticated()) {
		res.status(200).send('You are logged in! :D');
	} else {
		res.status(403).send('You are not allowed to access this resource. Please <a href="/auth/facebook">log in</a>.');
	}
});

// Error Handling Middleware
// app.use(function(err, req, res) {
// 	console.error(err.message);
// 	res.status(500).json(err);
// });

var server = app.listen(3001, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
