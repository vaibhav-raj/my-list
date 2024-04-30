const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    id: {
        type: String,

    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true,
        enum: [
            "Action",
            "Comedy",
            "Drama",
            "Fantasy",
            "Horror",
            "Romance",
            "Sci-Fi",
            "Thriller",
            "Crime",
            "Mystery",
            "Adventure"
        ],
    },
    releaseDate: {
        type: Date,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    }
});

const MovieModel = mongoose.model("Movie", movieSchema);

module.exports = MovieModel;
