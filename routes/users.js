//'use strict';

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


// NEW CODE
router.post('/', function(req, res) {

	var user = new User({
	    facebookId: req.body.facebookId,
	    googleId: req.body.googleId,
	    twitterId: req.body.twitterId,
	    signupDate: req.body.signupDate,
	    invisible: req.body.invisible
	    
	});

        console.log(user);

	user.save(function(err, resp) {
		if (err){
			console.log(err);
			res.send(
				err //this line is for testing and can easily be changed later
			);
		} else {
			res.send({
				message: 'the user has been saved'
			});
		}
	});
});

/*
//OLD CODE
router.post('/', function(req, res, next) {
	console.log("Info about req.body:");
	console.log(req.body);

	var user = new User({
	    facebookId: req.body.facebookId,
	    googleId: req.body.googleId,
	    twitterId: req.body.twitterId,
	    signupDate: req.body.signupDate,
	    invisible: req.body.invisible
	});	

        console.log(user);

	user.save()
		.then(function() {
			res.status(201).end();
		}, function(err) {
			return next(err);
		});
});
*/


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
