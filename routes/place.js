'use strict';

var express  =	require('express');
var router   = 	express.Router();
var handlers = 	require('../handlers');
var Place    = 	require('../models/Place').Place;

// BASIC REST ROUTES

router.get		('/', 		handlers.basicGetAll(Place);
router.get		('/:id', 	handlers.basicGetById(Place);
router.post		('/', 		handlers.basicPost(Place);
router.delete		('/:id', 	handlers.basicDelete(Place);

module.exports = router;
