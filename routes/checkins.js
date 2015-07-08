'use strict';

var express = require('express');
var router = express.Router();
var Checkin = require('../models/Checkin').Checkin;



router.get('/near', function(req, res, next) {
        Checkin.find({ location: { lat: req.querry.lat, long: req.querry.long } })
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

router.get('/place/placeId', function(req, res, next) {
	Checkin.find({ "location.placeId": req.params.placeId })
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

router.get('/id', function(req, res, next) {
	Checkin.find({ _id: req.params.id })
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

router.get('/', function(req, res, next) {
	Checkin.find()
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

// NEW CODE
router.post('/', function(req, res, next) {
	
	var checkin = new Checkin({
		userId: req.body.userId,
		location: req.body.location
	});
	
	checkin.save(function(err, resp) {
		if (err){
			console.log(err);
			res.send(
				err //this line is for testing and can easily be changed later
			);
		} else {
			res.send({
				message: 'the checkin has been saved'
			});
		}
	});
});


/*
// OLD CODE
router.post('/', function(req, res, next) {
	var checkin = new Checkin(req.body);
	checkin.save()
		.then(function() {
			//res.status(201).end();
			res.status(201).json(checkin);
		}, function(err) {
			return next(err);
		});
});
*/

router.delete('/id', function(req, res, next) {
	Checkin.remove({ _id: req.body._id }, function(err) {
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
			console.log('the checkin has been deleted');
			/*
			res.send({
				message: 'the user has been deleted'
			});
			*/
		}

	});
});

module.exports = router;

