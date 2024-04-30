const userModel = require("../models/userSchema");
const { to } = require("await-to-js");
const UserError = require("../errors/userError");
const { USER_DICTIONARY } = require("../dictionary/user.dictionary");
const Logger = require("../logger/logger");

class UserController {

    constructor() {
        this.logger = new Logger();
    }

    //create a new user
    createUser = async (req, res) => {
        this.logger.info(
            `createUser start with args : ${JSON.stringify(req.body)}`
        );

        const { id, username, preferences, watchHistory } = req.body;

        const user = new userModel({ id, username, preferences, watchHistory });
        const [err, savedUser] = await to(user.save());

        if (err) {
            this.logger.error(err);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_CREATE_USER });
        }

        this.logger.info(
            `createUser ended with response : ${JSON.stringify(savedUser)}`
        );
        res.status(201).json(savedUser);
    }

    //retrieve a user by ID
    getUserById = async (req, res) => {
        this.logger.info(
            `getUserById start with args : ${JSON.stringify(req.params)}`
        );

        const [err, user] = await to(userModel.findById(req.params.userId));
        if (err) {
            this.logger.error("retrieving user", err);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_RETRIEVE_USER });
        }
        if (!user) {
            return res.status(404).json({ error: USER_DICTIONARY.USER_NOT_FOUND });
        }

        this.logger.info(
            `getUserById ended with response : ${JSON.stringify(user)}`
        );
        res.json(user);
    }

    //update a user by ID
    updateUserById = async (req, res) => {
        this.logger.info(
            `updateUserById start with args : ${JSON.stringify(req.params)}`
        );

        const [err, user] = await to(
            userModel.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        );
        if (err) {
            this.logger.error("updating user:", err);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_UPDATE_USER });
        }
        if (!user) {
            return res.status(404).json({ error: USER_DICTIONARY.USER_NOT_FOUND });
        }

        this.logger.info(
            `updateUserById ended with response : ${JSON.stringify(user)}`
        );
        res.json(user);
    }

    //delete a user by ID
    deleteUserById = async (req, res) => {
        this.logger.info(
            `deleteUserById start with args : ${JSON.stringify(req.params)}`
        );

        const [err, user] = await to(
            userModel.findByIdAndDelete(req.params.userId)
        );
        if (err) {
            this.logger.error("deleting user:", err);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_DELETE_USER });
        }
        if (!user) {
            return res.status(404).json({ error: USER_DICTIONARY.USER_NOT_FOUND });
        }

        this.logger.info(`deleteUserById ended`);
        res.json({ message: USER_DICTIONARY.DELETED_SUCCESSFULLY });
    }

    addFavoriteGenres = async (req, res) => {
        this.logger.info(
            `addFavoriteGenres start with args : ${JSON.stringify(req.params)}`
        );

        const { userId } = req.params;
        const { favoriteGenres } = req.body;

        let user;
        let error;

        [error, user] = await to(userModel.findById(userId));
        if (error) {
            this.logger.error(" finding user:", error);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_FIND_USER });
        }
        if (!user) {
            return res.status(404).json({ error: USER_DICTIONARY.USER_NOT_FOUND });
        }

        // Remove added genres from dislikedGenres
        user.preferences.dislikedGenres = user.preferences.dislikedGenres.filter(
            (genre) => !favoriteGenres.includes(genre)
        );

        // Add new favorite genres to the user's preferences
        user.preferences.favoriteGenres.push(...favoriteGenres);

        // Ensure uniqueness in favoriteGenres
        user.preferences.favoriteGenres = [
            ...new Set(user.preferences.favoriteGenres),
        ];

        [error, user] = await to(user.save());
        if (error) {
            this.logger.error(" updating user", error);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_UPDATE_USER });
        }

        this.logger.info(
            `addFavoriteGenres ended with response : ${JSON.stringify(user)}`
        );
        res.json(user);
    }

    addDislikedGenres = async (req, res) => {
        this.logger.info(
            `addDislikedGenres start with args : ${JSON.stringify(req.params)}`
        );

        const { userId } = req.params;
        const { dislikedGenres } = req.body;

        // Find the user by ID
        const [findError, user] = await to(userModel.findById(userId));
        if (findError) {
            this.logger.error(" finding user", findError);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_RETRIEVE_USER });
        }
        if (!user) {
            return res.status(404).json({ error: USER_DICTIONARY.USER_NOT_FOUND });
        }

        // Remove any genres from favorite genres that are also in disliked genres
        user.preferences.favoriteGenres = user.preferences.favoriteGenres.filter(
            (genre) => !dislikedGenres.includes(genre)
        );

        // Add new disliked genres to the user's preferences
        user.preferences.dislikedGenres.push(...dislikedGenres);

        // Save the updated user
        const [updateError, updatedUser] = await to(user.save());
        if (updateError) {
            this.logger.error("updating user", updateError);
            return res
                .status(500)
                .json({ error: USER_DICTIONARY.FAILED_TO_UPDATE_USER });
        }

        this.logger.info(
            `addDislikedGenres ended with response : ${JSON.stringify(updatedUser)}`
        );
        res.json(updatedUser);
    }

}

module.exports = UserController;
