const express = require('express');
const { findLocation } = require('../controllers/Cities.controller')

const router = express.Router()


router.route('/')
    .get(findLocation)



module.exports = router