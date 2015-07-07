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

router.get('/id', function(req, res, next) {
	User.findById(req.params.id)
		.then(function(user) {
			res.status(200).json(user);
		}, function(err) {
			return next(err);
		});
});

// NEW CODE
router.delete('/id', function(req, res, next) {
	res.send({
		message: 'we are inside the delete user method'
	});
	console.log("Req.body:");
	console.log(req.body);
	User.remove({ _id: "ObjectId(" + req.body.id + ")" }, function(err) {
		console.log(err);
		console.log('now inside of the function(err)');
		/*
		res.send({
			message: 'now inside of the function(err)'
		});
		*/
		console.log('this is a test');
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
	console.log('SUCCESS');
});

/*
// OLD CODE
router.delete('/id', function(req, res, next) {
	res.send({
		message: 'we are inside the delete user method'
	});
	User.remove({ _id: req.params.id })
		.then(function() {
			res.status(204).end();
			res.send({
				message: 'the user has been deleted'
			});
		}, function (err) {
			res.send({
				message: 'there was an error'
			});
			if (err) {
				return next(err);
			}
		});
	res.send({
		message: 'we are exiting the delete user method'
	});
});
*/

module.exports = router;
