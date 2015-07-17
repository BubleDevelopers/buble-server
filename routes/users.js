'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/User').User;


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
router.post('/', function(req, res) {

	var user = new User({
	    first_name: req.body.first_name,
	    last_name: req.body.last_name,
	    email: req.body.email,
	    pictureURL: req.body.pictureURL,
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

// test works
router.get('/:id', function(req, res, next) {
		User.findById(req.params._id)
		.then(function(user) {
			res.status(200).json(user);
		}, function(err) {
			return next(err);
		});
});

// test works
router.delete('/:id', function(req, res, next) {
	res.send({
		message: 'we are inside the delete user method'
	});
	console.log("Req.body:");
	console.log(req.body);
	User.remove({ _id : req.body._id }, function(err) {
		console.log(err);
		console.log('now inside of the function(err)');
		/*
		res.send({
			message: 'now inside of the function(err)'
		});
		*/
		if (err)
		{
			console.log('there was an error');
			/*
			res.send({
				message: 'there was an error'
			});
			*/
		}
		else
		{
			console.log('the user has been deleted');
			/*
			res.send({
				message: 'the user has been deleted'
			});
			*/
		}

	});
});

module.exports = router;
