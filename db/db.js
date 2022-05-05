const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

mongoose.Promise = Promise
let mongoServer = null

const getInstance = async () => {
    mongoServer = await MongoMemoryServer.create()

    return mongoServer
}

//const mongoServer = new MongoMemoryServer()

module.exports.getUri = async () => {
    await getInstance()
    if (process.env.NODE_ENV === 'test') {
        return await mongoServer.getUri()
    }

    return process.env.MONGO_URL
}

module.exports.connect = async ({ uri }) => {

    await mongoose.connect(uri)
    console.log(`MongoDB Connected`.cyan.underline.bold)
    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${uri}`)
    })
}

module.exports.closeDb = async () => {
    await getInstance()
    await mongoose.disconnect()
    //await mongoServer.stop()

    if (process.env.NODE_ENV === 'test') {
        return await mongoServer.stop()
    }
}




/*const conectDataBase = async () => {
    try {
        const conectionDB = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conectionDB.connection.host}`.cyan.underline.bold)
        return `MongoDB Connected: ${conectionDB.connection.host}`.cyan.underline.bold
    } catch (error) {
        return 'Error en la conexion de la base de datos'.red
    }
}

module.exports = conectDataBase*/