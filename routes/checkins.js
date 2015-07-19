'use strict';

var express = require('express');
var router = express.Router();
var handlers = require('../handlers');
var Checkin = require('../models/Checkin').Checkin;

// BASIC REST ROUTES

router.get('/', handlers.basicGetAll(Checkin));
router.get('/:id', handlers.basicGetById(Checkin));
router.post('/', handlers.basicPost(Checkin));
router.delete('/:id', handlers.basicDelete(Checkin));

// CUSTOM ROUTES

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
	return handlers.basicGet(Checkin, {query: {'location.placeId' : req.params.placeId}})(req, res, next);
});

module.exports = router;

