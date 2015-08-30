'use strict';

var express  = 	require('express');
var router   = 	express.Router();
var handlers = 	require('../handlers');
var WallPost = 	require('../models/WallPost').WallPost;

// BASIC REST ROUTES
/*
router.get		('/', 		handlers.basicGetAll(WallPost));
router.get		('/:id', 	handlers.basicGetById(WallPost));
router.post		('/', 		handlers.basicPost(WallPost));
router.delete	('/:id', 	handlers.basicDelete(WallPost));
*/
// test works

// localhost:3001/wallposts/place/2
router.get('/place/:placeId', function(req, res, next) {
	WallPost.find({location : req.params.placeId})
		.then(function(wallPosts) {
			res.status(200).json(wallPosts);
		}, function(err) {
			return next(err);
		});
});
 
// test works
// localhost:3001/wallposts/559ee3d5347da39805a40e59
router.get('/:id', function(req, res, next) {
	WallPost.findById(req.params.id)
		.then(function(wallPosts) {
			res.status(200).json(wallPosts);
		}, function(err) {
			return next(err);
		});
});
 
// tested successfully
router.get('/', function(req, res, next) {
	WallPost.find()
		.then(function(wallPosts) {
			res.status(200).json(wallPosts);
		}, function(err) {
			return next(err);
		});
});
 
// tested successfully
router.post('/', function(req, res, next) {
	var wallPost = new WallPost(req.body);

	wallPost.save()
		.then(function() {
			res.status(201).end();
		}, function(err) {
			return next(err);
		});
});

// tested successfully
router.delete('/:id', function(req, res, next) {
	WallPost.remove({_id: req.params.id})
		.then(function() {
			res.status(200).end();
		}, function(err) {
			return next(err);
		});

// CUSTOM ROUTES
router.get('/near', function(req, res, next)
{
	var lat  = req.params.lat;
	var long = req.params.long;
	var rad  = req.params.rad;
	if (req.params.lat !== null && req.params.long !== null && req.params.rad !== null)
	{
		// for some reason the plus sign was concatenating the numbers but the subtraction sign was behaving normally so instead of adding the radius I subtracted the radius multiplied by -1
		Checkin.find( { "location.lat": { $gt: (lat - rad), $lt: (lat - (rad * -1)) }, "location.long": { $gt: (long - rad), $lt: (long - (rad * -1)) } } )
			.then(function(wallposts) {
				res.status(200).json(wallposts);
			}, function(err) {
				return next(err);
			});
	}
	else
	{
			res.status(400);
	}
});

// Retrieves all wallposts created within the last three hours
// UNTESTED
router.get('/three', function(req, res, next) 
{
	Wallpost.find( { $where: function() { return Date.now() - this._id.getTimestamp() < ( 3 * 60 * 60 * 1000 ) } } )
		.then(function(wallposts) {
			res.status(200).json(wallposts);
		}, function(err) {
			return next(err);
		});
});

// Retrieves all wallposts created within the last twenty-four hours
// UNTESTED
router.get('/day', function(req, res, next) 
{
	Wallpost.find( { $where: function() { return Date.now() - this._id.getTimeStamp() < ( 24 * 60 * 60 * 1000 ) } } )
		.then(function(wallposts) {
			res.status(200).json(wallposts);
		}, function(err) {
			return next(err);
		});
});

// Retrieves all wallposts created within the last twenty-four hours
// WON'T WORK
router.delete('/day', function(req, res, next) 
{
	Wallpost.remove( { $where: function() { return Date.now() - this._id.getTimeStamp() > ( 24 * 60 * 60 * 1000 ) } } )
		.then(function(wallposts) {
			res.status(200);
		}, function(err) {
			return next(err);
		});
});

// untested because of above error
// localhost:3001/wallposts/avg?loc="2"
router.get('/avg', function(req, res, next) {
	Wallpost.aggregate( [ { $match: { "location": req.params.loc } }, { $group: { _id: "$location", avgRating: { $avg: "$rating" } } } ] )
		.then(function(wallposts) {
			res.status(200).json(wallposts);
		}, function(err) {
			return next(err);
		});
});

// untested because of above error
router.get('/place/:placeId', function(req, res, next) {
	return handlers.basicGet(Wallpost, {query: {'location.placeId' : req.params.placeId}})(req, res, next);
});

///////////////////////////////////////
// FORMULA FOR COMBINED SEARCH ROUTE //
///////////////////////////////////////

//find( { "location.lat": { $gt: (lat - rad), $lt: (lat - (rad * -1)) }, "location.long": { $gt: (long - rad), $lt: (long - (rad * -1)) }, $where: function() { return Date.now() - this._id.getTimeStamp() > ( 24 * 60 * 60 * 1000 ) } } ) 

// Retrieves all wallposts created within the last three hours
// UNTESTED
// if this does work we will no longer need three or twentyfour or near

router.get('/search', function(req, res, next)
{
	var lat   =	0;	
	var long  =	0;
	var rad   =	0;
	var hours =	0;

	if (req.params.lat !== null && req.params.long !== null && req.params.rad !== null && req.params.hours !== null)
	{
		lat   =	req.params.lat;
		long  =	req.params.long;
		rad   =	req.params.rad;
		hours = req.params.hours;

		Checkin.find({ "location.lat": { $gt: (lat - rad), $lt: (lat - (rad * -1)) }, "location.long": { $gt: (long - rad), $lt: (long - (rad * -1)) }, $where: function() { return Date.now() - this._id.getTimeStamp() > ( hours * 60 * 60 * 1000 ) } } ) 
			.then(function(wallposts) {
				res.status(200).json(wallposts);
			}, function(err) {
				return next(err);
			});
	}
	else if (req.params.lat !== null && req.params.long !== null && req.params.rad !== null)
	{
		lat   = req.params.lat;
		long  = req.params.long;
		rad   = req.params.rad;
		// for some reason the plus sign was concatenating the numbers but the subtraction sign was behaving normally so instead of adding the radius I subtracted the radius multiplied by -1
		Checkin.find( { "location.lat": { $gt: (lat - rad), $lt: (lat - (rad * -1)) }, "location.long": { $gt: (long - rad), $lt: (long - (rad * -1)) } } )
			.then(function(wallposts) {
				res.status(200).json(wallposts);
			}, function(err) {
				return next(err);
			});
	}
	else if (req.params.hours !== null)
	{
		hours = req.params.hours;
		Wallpost.find( { $where: function() { return Date.now() - this._id.getTimestamp() < ( hours * 60 * 60 * 1000 ) } } )
			.then(function(wallposts) {
				res.status(200).json(wallposts);
			}, function(err) {
				return next(err);
			});
	}
	else
	{
			res.status(400);
	}
});

module.exports = router;
