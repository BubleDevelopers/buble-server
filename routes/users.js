'use strict';

var express  = 	require('express');
var router   = 	express.Router();
var handlers = 	require('../handlers');
var User     =	require('../models/User').User;

// BASIC REST ROUTES
/*
router.get		('/', 		handlers.basicGetAll(User));
router.get		('/:id', 	handlers.basicGetById(User));
router.post		('/', 		handlers.basicPost(User));
router.delete	('/:id', 	handlers.basicDelete(User));
*/
// test works
router.get('/', function(req, res, next) {
	User.find()
		.then(function(users) {
			res.status(200).json(users);
		}, function(err) {
			return next(err);
		});
});
 
// test works
router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
		.then(function(user) {
			res.status(200).json(user);
		}, function(err) {
			return next(err);
		});
});

 
// test works
router.post('/', function(req, res, next) {
	var user = new User(req.body);

	user.save()
		.then(function() {
			res.status(201).end();
		}, function(err) {
			return next(err);
		});
});

// test works
router.delete('/:id', function(req, res, next) {
	User.remove({_id: req.params.id})
		.then(function() {
			res.status(200).end();
		}, function(err) {
			return next(err);
		});
});

// CUSTOM ROUTES

router.get('/me', function(req, res, next) {
	// REMOVE THIS LINE AND RESTORE REST OF METHOD BODY WHEN DONE TESTING
	res.status(200);
	/*
	console.log(req.session);
	if (req.session.passport.user) {
		User.findById(req.session.passport.user)
			.then(function(user) {
				res.status(200).json(user);
			}, function(err) {
				next(err);
			});
	} else {
		res.status(403).json({message: 'You are not authenticated'});
	}
	*/
});

module.exports = router;
