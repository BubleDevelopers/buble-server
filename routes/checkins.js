'use strict';

var express = require('express');
var router = express.Router();
var Checkin = require('../models/Checkin').Checkin;

// NOT USING THIS RIGHT NOW:
// UNTESTED
router.get('/near', function(req, res, next) {
	Checkin.find({location: {lat: req.query.lat, long: req.query.long}})
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

// test works
// localhost:3001/checkins/place/2
router.get('/place/:placeId', function(req, res, next) {
	Checkin.find({'location.placeId' : req.params.placeId})
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

// test works
// localhost:3001/checkins/559ee3d5347da39805a40e59
router.get('/:id', function(req, res, next) {
	Checkin.find({_id: req.params.id})
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

// test works
router.get('/', function(req, res, next) {
	Checkin.find()
		.then(function(checkins) {
			res.status(200).json(checkins);
		}, function(err) {
			return next(err);
		});
});

// test works
router.post('/', function(req, res, next) {
	var checkin = new Checkin({
		userId: req.body.userId,
		location: req.body.location
	});

	checkin.save()
		.then(function() {
			res.status(201).end();
		}, function(err) {
			return next(err);
		});
});

// test works
// localhost:3001/checkins/559ee3d5347da39805a40e59
router.delete('/:id', function(req, res, next) {
	Checkin.remove({_id: req.params.id})
		.then(function() {
			res.status(200).end();
		}, function(err) {
			return next(err);
		});
});

module.exports = router;

