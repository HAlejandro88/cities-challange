const express = require('express')
const CitiesRoute = require('./cities.route')
const app = express()

app.use('/api/v1/search', CitiesRoute)


module.exports = app;