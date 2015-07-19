'use strict';

var express = require('express');
var router = express.Router();
var handlers = require('../handlers');
var User = require('../models/User').User;

// BASIC REST ROUTES

router.get('/', handlers.basicGetAll(User));
router.get('/:id', handlers.basicGetById(User));
router.post('/', handlers.basicPost(User));
router.delete('/:id', handlers.basicDelete(User));

// CUSTOM ROUTES

module.exports = router;
