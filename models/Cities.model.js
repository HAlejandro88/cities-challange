const mongoose = require('mongoose');

const CitesModel = new mongoose.Schema({
	id: String,
	name: String,
	ascii: String,
	alt_name: String,
	lat: String,
	long: String,
	feat_class: String,
	feat_code: String,
	country: String,
	cc2: String,
	admin1: String,
	admin2: String,
	admin3: String,
	admin4: String,
	population: String,
	elevation: String,
	dem: String,
	tz: String,
	modified_at: String
},{
	timestamps: true
});


module.exports = mongoose.model('Cities', CitesModel);