const express =  require('express');
const cors = require('cors');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const dotenv = require('dotenv').config();
const {conectDb} = require('./db/conetct');




const Routes = require('./routes/index');


if(process.env.NODE_ENV === 'development') {
	conectDb();
}
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS scripting  attacks
app.use(xss());

// Rate Limit
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 min
	max: 10
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable cors
app.use(cors());

// Routes
app.use(Routes);

const PORT = process.env.PORT || 3000;

if (require.main === module ) {
	const server = app.listen(PORT, (error) => {
		if(error) {
			console.log(`The server is not runnig, ${error}`);
			process.exit(1);
		}
		console.log(`Server is running in port: ${PORT}`);
	});

	process.on('unhandledRejection', (err, promise) => {
		console.log(`Error: ${err.message}`);
		// Close server & exit process
		server.close(() => process.exit(1));
	});
}


module.exports = {app};