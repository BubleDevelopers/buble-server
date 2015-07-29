'use strict';

var express = require('express');
var router = express.Router();
var handlers = require('../handlers');
var WallPost = require('../models/WallPost').WallPost;

// BASIC REST ROUTES

router.get('/', handlers.basicGetAll(WallPost));
router.get('/:id', handlers.basicGetById(WallPost));
router.post('/', handlers.basicPost(WallPost));
router.delete('/:id', handlers.basicDelete(WallPost));

// CUSTOM ROUTES
// Retrieves all wallposts within a vertain radius of a specified latitude and longitude
// Works as expected
router.get('/near', function(req, res, next) 
{
	Wallpost.find( { "location.lat": { $gt: (lat - rad), $lt: (lat - (rad * -1)) }, "location.long": { $gt: (long - rad), $lt: (long - (rad * -1)) } } )
		.then(function(wallposts) {
			res.status(200).json(wallposts);
		}, function(err) {
			return next(err);
		});
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
}

// untested because of above error
router.get('/place/:placeId', function(req, res, next) {
	return handlers.basicGet(Wallpost, {query: {'location.placeId' : req.params.placeId}})(req, res, next);
});

///////////////////////////////////////
// FORMULA FOR COMBINED SEARCH ROUTE //
///////////////////////////////////////

// find( { "location.lat": { $gt: (lat - rad), $lt: (lat - (rad * -1)) }, "location.long": { $gt: (long - rad), $lt: (long - (rad * -1)) }, $where: function() { return Date.now() - this._id.getTimeStamp() > ( 24 * 60 * 60 * 1000 ) } } )
module.exports = router;
