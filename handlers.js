'use strict';

var _ = require('lodash');

var basicGet = function(req, res, next, model, opts) {
	var promise = null;
	// If no query is provided, assume we are getting a single
	// object by ID.
	if (!opts.query) {
		promise = model.findById(opts.id);
	} else {
		promise = model.find(opts.query);
	}

	return promise
		.then(function(data) {
			res.status(200).json(data);
		}, function(err) {
			return next(err);
		});
};

var basicGetById = function(req, res, next, model) {
	return basicGet(req, res, next, model, {id: req.params.id});
};

var basicGetAll = function(req, res, next, model) {
	return basicGet(req, res, next, model, {query: {}});
};

var basicPost = function(req, res, next, model, opts) {
	opts = opts || {};

	var object = new model(opts.object || req.body);

	return object.save()
		.then(function() {
			res.status(201).end();
		}, function(err) {
			return next(err);
		});
};

var basicDelete = function(req, res, next, model, opts) {
	opts = opts || {};

	return model.remove({_id: opts.id || req.params.id})
		.then(function() {
			res.status(200).end();
		}, function(err) {
			return next(err);
		});
};

// We transmute the handlers into partially applied function generators so that
// routers can inject req, res, and next into them.
// So these exported functions, when fully applied, would be called as
// basicGet(model, opts)(req, res, next);
module.exports = {
	basicGet: _.partial(_.partialRight, basicGet),
	basicGetById: _.partial(_.partialRight, basicGetById),
	basicGetAll: _.partial(_.partialRight, basicGetAll),
	basicPost: _.partial(_.partialRight, basicPost),
	basicDelete: _.partial(_.partialRight, basicDelete)
};
