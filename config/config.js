const dotenv = require('dotenv');
const path = require('path');

// Determine the path based on the NODE_ENV environment variable
const envFileName = process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : '.env';
const envPath = path.join(__dirname, '..', 'environment', envFileName);

dotenv.config({
    path: envPath
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI
}
