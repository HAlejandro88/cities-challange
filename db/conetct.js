const {getUri, connect} = require('./db');

module.exports.conectDb = async() =>{
	try {
		let uri =  await getUri();
		const con = await connect({uri});
	} catch (error) {
		return 'ERROR IN CONTECT TO DATABASE' + error;
	}


};