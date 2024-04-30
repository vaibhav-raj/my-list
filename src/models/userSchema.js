const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    preferences: {
        favoriteGenres: [
            {
                type: String,
                enum: [
                    "Action",
                    "Comedy",
                    "Drama",
                    "Fantasy",
                    "Horror",
                    "Romance",
                    "SciFi",
                ],
            },
        ],
        dislikedGenres: [
            {
                type: String,
                enum: [
                    "Action",
                    "Comedy",
                    "Drama",
                    "Fantasy",
                    "Horror",
                    "Romance",
                    "SciFi",
                ],
            },
        ],
    },
    watchHistory: [
        {
            contentId: {
                type: String,
                required: true
            },
            watchedOn: {
                type: Date,
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
        },
    ],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
