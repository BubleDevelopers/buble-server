'use strict';

var express = require('express');
var router = express.Router();
var handlers = require('../handlers');
var User = require('../models/User').User;

// CUSTOM ROUTES

router.get('/me', function(req, res, next) {
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
});

// BASIC REST ROUTES

router.get('/', handlers.basicGetAll(User));
router.get('/:id', handlers.basicGetById(User));
router.post('/', handlers.basicPost(User));
router.delete('/:id', handlers.basicDelete(User));

module.exports = router;
