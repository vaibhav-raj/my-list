const movieModel = require("../models/movieSchema");
const to = require("await-to-js").default; // Import the to function from await-to-js
const Logger = require("../logger/logger");
const asyncHandler = require("../middleware/catchAsyncError");
const MOVIE_DICTIONARY = require("../dictionary/myList.dictionary");

class MovieController {
    constructor() {
        this.logger = new Logger();
    }

    createMovie = asyncHandler(async (req, res) => {
        this.logger.info(
            `createMovie start with args : ${JSON.stringify(req.body)}`
        );

        const { title, description, genres, releaseDate, director, actors } =
            req.body;

        const movie = new movieModel({
            title,
            description,
            genres,
            releaseDate,
            director,
            actors,
        });

        const [err, savedMovie] = await to(movie.save());
        if (err) {
            this.logger.error("creating movie: ", err);
            return res
                .status(500)
                .json({ error: MOVIE_DICTIONARY.FAILED_TO_CREATE_MOVIE });
        }

        this.logger.info(
            `createMovie ended with response : ${JSON.stringify(savedMovie)}`
        );
        res.status(201).json(savedMovie);
    });

    getAllMovies = asyncHandler(async (req, res) => {
        this.logger.info(
            `getAllMovies start with args : ${JSON.stringify(req.query)}`
        );

        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        let totalMovies;
        let movies;
        let error;

        [error, totalMovies] = await to(movieModel.countDocuments());

        if (error) {
            this.logger.error("counting total movie: ", error);
            return res
                .status(500)
                .json({ error: MOVIE_DICTIONARY.FAILED_TO_RETRIEVE_MOVIE });
        }

        [error, movies] = await to(
            movieModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
        );

        if (error) {
            this.logger.error("fetching movie: ", error);
            return res
                .status(500)
                .json({ error: MOVIE_DICTIONARY.FAILED_TO_RETRIEVE_MOVIE });
        }

        const totalPages = Math.ceil(totalMovies / limit);

        this.logger.info(
            `getAllMovies ended with response : ${JSON.stringify({
                total: totalMovies,
                page,
                limit,
                totalPages,
                data: movies,
            })}`
        );

        res.json({
            total: totalMovies,
            page,
            limit,
            totalPages,
            data: movies,
        });
    });

    getMovieById = asyncHandler(async (req, res) => {
        this.logger.info(
            `getMovieById start with args : ${JSON.stringify(req.params)}`
        );

        const [err, movie] = await to(movieModel.findById(req.params.movieId));

        if (err) {
            this.logger.error("retrieving movie: ", err);
            return res
                .status(500)
                .json({ error: MOVIE_DICTIONARY.FAILED_TO_RETRIEVE_MOVIE });
        }
        if (!movie) {
            return res.status(404).json({ error: MOVIE_DICTIONARY.MOVIE_NOT_FOUND });
        }

        this.logger.info(
            `getMovieById ended with response : ${JSON.stringify(movie)}`
        );
        res.json(movie);
    });

    updateMovieById = asyncHandler(async (req, res) => {
        this.logger.info(
            `updateMovieById started with args : ${JSON.stringify(req.params)}`
        );

        const [err, movie] = await to(
            movieModel.findByIdAndUpdate(req.params.movieId, req.body, { new: true })
        );

        if (err) {
            this.logger.error("updating movie: ", err);
            return res
                .status(500)
                .json({ error: MOVIE_DICTIONARY.FAILED_TO_UPDATE_MOVIE });
        }
        if (!movie) {
            return res.status(404).json({ error: MOVIE_DICTIONARY.MOVIE_NOT_FOUND });
        }

        this.logger.info(
            `updateMovieById ended with response : ${JSON.stringify(movie)}`
        );
        res.json(movie);
    });

    deleteMovieById = asyncHandler(async (req, res) => {
        this.logger.info(
            `deleteMovieById started with args : ${JSON.stringify(req.params)}`
        );

        const [err, movie] = await to(
            movieModel.findByIdAndDelete(req.params.movieId)
        );

        if (err) {
            this.logger.error("deleting movie: ", err);
            return res
                .status(500)
                .json({ error: MOVIE_DICTIONARY.FAILED_TO_DELETE_MOVIE });
        }
        if (!movie) {
            return res.status(404).json({ error: MOVIE_DICTIONARY.MOVIE_NOT_FOUND });
        }

        this.logger.info(`deleteMovieById ended`);
        res.json({ message: MOVIE_DICTIONARY.DELETED_SUCCESSFULLY });
    });
}

module.exports = MovieController;
