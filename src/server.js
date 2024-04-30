const app = require('./app')
const mongoose = require('mongoose')
const config = require('../config/config');

console.log(`NODE_ENV=${config.NODE_ENV}`);

// Database connection
mongoose.connect(config.DB_URI, console.log('db connecting'), {
    useNewUrlParser: true,
})

// Start the server
app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}}`);
});