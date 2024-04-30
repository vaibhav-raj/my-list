const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const Auth = require('../middleware/auth');

//create instance
const userController = new UserController
const auth = new Auth()

// Middleware to check if user exists
router.use('/:userId', auth.checkUserExists);

// User Routes
router
    .post('', userController.createUser)
    .get('/:userId', auth.checkUserExists, userController.getUserById)
    .put('/:userId', auth.checkUserExists, userController.updateUserById)
    .delete('/:userId', auth.checkUserExists, userController.deleteUserById)
    .put('/:userId/favoriteGenres', auth.checkUserExists, userController.addFavoriteGenres)
    .put('/:userId/dislikedGenres', auth.checkUserExists, userController.addDislikedGenres);

module.exports = router;
