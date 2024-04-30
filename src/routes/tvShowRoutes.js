const express = require('express');
const router = express.Router();
const TvShowController = require('../controllers/tvShowController');
const Auth = require('../middleware/auth');

//create instance
const tvShowController = new TvShowController
const auth = new Auth();

// Middleware to check if user exists
// router.use(auth.checkUserExists);

router
    .post('', tvShowController.createTVShow)
    .get('', tvShowController.getAllTVShows)
    .get('/:tvShowId', tvShowController.getTVShowById)
    .put('/:tvShowId', tvShowController.updateTVShowById)
    .delete('/:tvShowId', tvShowController.deleteTVShowById);

module.exports = router;
