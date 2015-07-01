'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/User').User;

router.get('/', function(req, res, next) {
	User.find()
		.then(function(users) {
			res.status(200).json(users);
		}, function(err) {
			return next(err);
		});
});

router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
		.then(function(user) {
			res.status(200).json(user);
		}, function(err) {
			return next(err);
		});
});

router.post('/', function(req, res, next) {
	var user = new User(req.body);
	user.save()
		.then(function() {
			res.status(201).end();
		}, function(err) {
			return next(err);
		});
});

router.delete('/:id', function(req, res, next) {
	User.remove({ _id: req.params.id })
		.then(function() {
			res.status(204).end();
		}, function (err) {
			if (err) {
				return next(err);
			}
		});
});

module.exports = router;
