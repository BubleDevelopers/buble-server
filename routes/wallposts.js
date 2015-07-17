'use strict';

var express = require('express');
var router = express.Router();
var WallPost = require('../models/WallPost').WallPost;

// test works
// localhost:3001/wallposts/place/:placeId?placeId=2
router.get('/place/:placeId', function(req, res, next) {
	WallPost.find({ location : req.params.placeId })		
	.then(function(wallPosts) {
			res.status(200).json(wallPosts);
		}, function(err) {
			return next(err);
		});
});

// test works
// localhost:3001/wallposts/:id?_id=559ee3d5347da39805a40e59
router.get('/:id', function(req, res, next) {
	console.log(req);
		WallPost.find({ _id: req.params._id })
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
	
	var wallPost = new WallPost({
		content: req.body.content,
		rating: req.body.rating,
	        location: req.body.location,
	        timeOfPost: req.body.timeOfPost
	});
	
	wallPost.save(function(err, resp) {
		if (err){
			console.log(err);
			res.send(
				err //this line is for testing and can easily be changed later
			);
		} else {
			res.send({
				message: 'the wallpost has been saved'
			});
		}
	});
});

// tested successfully
// 
router.delete('/:id', function(req, res, next) {
	WallPost.remove({ _id: req.body._id }, function(err) {
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
			console.log('the wallpost has been deleted');
			/*
			res.send({
				message: 'the user has been deleted'
			});
			*/
		}

	});
});

module.exports = router;


