const fs = require('fs');
const mongoose =  require('mongoose');
const colors= require('colors');
const dotenv = require('dotenv').config();


const CitiesModel = require('../models/Cities.model');

mongoose.connect(process.env.MONGO_URL);

const cities = JSON.parse(fs.readFileSync(`${__dirname}/data/cities-canada-usa.json`, 'utf-8'));


const importData = async() => {
	try {
		await CitiesModel.create(cities);
		console.log('Data imported db'.green.inverse);
		process.exit();
	} catch (e) {
		console.error(error);
	}
};

if(process.argv[2] === '-i') {
	importData();
}