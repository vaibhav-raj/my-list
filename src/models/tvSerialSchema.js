const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
    episodeNumber: {
        type: Number,
        required: true
    },
    seasonNumber: {
        type: Number,
        required: true
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
}, { _id: false, timestamps: true });


const tvShowSchema = new mongoose.Schema({
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
    genres: [
        {
            type: String,
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
                "Mystery"
            ],
            required: true
        },
    ],
    episodes: {
        type: [episodeSchema],
        required: true
    }
});

const TVShowModel = mongoose.model("TVShow", tvShowSchema);

module.exports = TVShowModel;
