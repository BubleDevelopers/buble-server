'use strict';

var express  = 	require('express');
var router   = 	express.Router();
var handlers = 	require('../handlers');
var Checkin  = 	require('../models/Checkin').Checkin;

// BASIC REST ROUTES

router.get		('/', 		handlers.basicGetAll(Checkin));
router.get		('/:id', 	handlers.basicGetById(Checkin));
router.post		('/', 		handlers.basicPost(Checkin));
router.delete	('/:id', 	handlers.basicDelete(Checkin));

// CUSTOM ROUTES

// localhost:3001/checkins/near?lat=5&long=5&rad=2
router.get('/near', function(req, res, next) 
{
	var lat = req.params.lat;
	var long = req.params.long;
	var rad = req.params.rad;
	if (req.params.lat !== null && req.params.long !== null && req.params.rad !== null)
	{
		// for some reason the plus sign was concatenating the numbers but the subtraction sign was behaving normally so instead of adding the radius I subtracted the radius multiplied by -1
		Checkin.find( { "location.lat": { $gt: (lat - rad), $lt: (lat - (rad * -1)) }, "location.long": { $gt: (long - rad), $lt: (long - (rad * -1)) } } )
			.then(function(checkins) {
				res.status(200).json(checkins);
			}, function(err) {
				return next(err);
			});
	}
	else 
	{
		res.status(400);
	}
});

// test works
// localhost:3001/checkins/place/2
router.get('/place/:placeId', function(req, res, next) {
	return handlers.basicGet(Checkin, {query: {'location.placeId' : req.params.placeId}})(req, res, next);
});

module.exports = router;
