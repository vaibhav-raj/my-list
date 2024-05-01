const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../src/middleware/errorHandler');
const Auth = require('./middleware/auth');
const app = express();

// Middleware
app.use(bodyParser.json());


const auth = new Auth()


// Import route files
const user = require('./routes/userRoutes');
const movie = require('./routes/movieRoutes');
const tvShow = require('./routes/tvShowRoutes');
const myList = require('./routes/myListRoutes');

// Add routes to the app
app.use('/api/users', user);
app.use('/api/movies', movie);
app.use('/api/tv-shows', tvShow);
app.use('/api', myList);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
