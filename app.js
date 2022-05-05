const express =  require('express');
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {conectDb} = require('./db/conetct')




const Routes = require('./routes/index')


if(process.env.NODE_ENV === 'development') {
    conectDb()
}
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())

app.use(Routes)

const PORT = process.env.PORT || 3000;

if (require.main === module ) {
    const server = app.listen(PORT, (error) => {
        if(error) {
            console.log(`The server is not runnig, ${error}`)
            process.exit(1)
        }
        console.log(`Server is running in port: ${PORT}`)
    })

    process.on('unhandledRejection', (err, promise) => {
        console.log(`Error: ${err.message}`);
        // Close server & exit process
        server.close(() => process.exit(1));
    })
}


module.exports = {app}