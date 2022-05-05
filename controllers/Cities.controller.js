const CitiesModel = require('../models/Cities.model')


exports.getAllCities = async (req,res,next) => {
    try {
        const cities = await CitiesModel.find();
        return res.status(200).json({
            success: true,
            count: cities.length,
            data: cities
        })
    } catch (error) {
        return  res.status(500).json({
            success: false,
            message: 'The serve has error, it is not possible to bring the data',
            error
        })
    }
}

exports.findLocation = async (req,res,next) => {
    try {
        const {q, latitude, longitude} = req.query;

        let name = new RegExp(q, 'i') || new RegExp('.', 'i');
        let latitud = new RegExp(latitude, 'i') || new RegExp('.', 'i');
        let longitud =  new RegExp(longitude, 'i') || new RegExp('.', 'i');

        const cities = await CitiesModel.find({name, latitude: latitud, longitude: longitud})

        if (cities.length > 0) {
            return res.status(200).json({
                success: true,
                count: cities.length,
                data: cities
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Nothing was found with that search',
            data: cities
        })


    } catch (error) {
        return  res.status(500).json({
            success: false,
            message: 'The serve has error, it is not possible to bring the data',
            error
        })
    }
}