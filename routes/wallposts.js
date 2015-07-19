'use strict';

var express = require('express');
var router = express.Router();
var WallPost = require('../models/WallPost').WallPost;

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
});

module.exports = router;
