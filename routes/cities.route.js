const express = require('express');
const apicache = require('apicache');
const { findLocation } = require('../controllers/Cities.controller');

const router = express.Router();

const cache = apicache.middleware;

router.route('/')
	.get(cache('2 minutes'),findLocation);



module.exports = router;