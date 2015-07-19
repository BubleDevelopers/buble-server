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

// test works
// localhost:3001/wallposts/place/2
router.get('/place/:placeId', function(req, res, next) {
	return handlers.basicGet(WallPost, {query:{'location.placeId': req.params.placeId}});
});

module.exports = router;
