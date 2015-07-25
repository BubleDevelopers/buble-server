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
/*
[phonegap] [console.error] Error: 'coords' getter called on an object that does not implement interface Position.
[phonegap] ha@http://localhost:3000/js/lib/angular.min.js:13:27
[phonegap] ha@http://localhost:3000/js/lib/angular.min.js:13:28
[phonegap] Pe/this.$get</n.prototype.$digest@http://localhost:3000/js/lib/angular.min.js:123:250
[phonegap] Pe/this.$get</n.prototype.$apply@http://localhost:3000/js/lib/angular.min.js:126:291
[phonegap] eg</this.$$debounceViewValueCommit@http://localhost:3000/js/lib/angular.min.js:227:362
[phonegap] eg</this.$setViewValue@http://localhost:3000/js/lib/angular.min.js:227:90
[phonegap] jb/l@http://localhost:3000/js/lib/angular.min.js:153:464
[phonegap] n.event.dispatch@http://localhost:3000/js/lib/jquery.min.js:3:6392
[phonegap] n.event.add/r.handle@http://localhost:3000/js/lib/jquery.min.js:3:3202
*/
// test works
// localhost:3001/wallposts/place/2
router.get('/near', function(req, res, next) 
{
	var lat = req.params.lat;
	var long = req.params.long;
	var rad = req.params.rad;
	if (req.params.lat !== undefined && req.params.long !== undefined && req.params.rad !== undefined)
	{
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

// untested because of above error
router.get('/place/:placeId', function(req, res, next) {
	return handlers.basicGet(Checkin, {query: {'location.placeId' : req.params.placeId}})(req, res, next);
});

module.exports = router;
