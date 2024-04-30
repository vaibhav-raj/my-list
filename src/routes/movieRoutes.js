const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');
const Auth = require('../middleware/Auth');

// Create instance 
const movieController = new MovieController()
const auth = new Auth()

// Middleware to check if user exists
// router.use(auth.checkUserExists);

// Movie Routes
router
    .post('', movieController.createMovie)
    .get('', movieController.getAllMovies)
    .get('/:movieId', movieController.getMovieById)
    .put('/:movieId', movieController.updateMovieById)
    .delete('/:movieId', movieController.deleteMovieById);

module.exports = router;
