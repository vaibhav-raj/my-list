const tvShowModel = require("../models/tvSerialSchema");
const { to } = require("await-to-js");
const { TV_SHOW_DICTIONARY } = require("../dictionary/tvShow.dictionary");
const Logger = require("../logger/logger");
const asyncHandler = require("../middleware/catchAsyncError");

class TvShowController {
    constructor() {
        this.logger = new Logger();
    }

    //  create a new TV show
    createTVShow = asyncHandler(async (req, res) => {
        this.logger.info(
            `createTVShow start with args : ${JSON.stringify(req.body)}`
        );

        const { id, title, description, genres, episodes } = req.body;

        const tvShow = new tvShowModel({
            id,
            title,
            description,
            genres,
            episodes,
        });

        const [err, savedTVShow] = await to(tvShow.save());
        if (err) {
            this.logger.error(" creating TV show:", err);
            return res
                .status(500)
                .json({ error: TV_SHOW_DICTIONARY.FAILED_TO_CREATE_TV_SHOW });
        }

        this.logger.info(
            `createTVShow ended with response : ${JSON.stringify(savedTVShow)}`
        );
        res.status(201).json(savedTVShow);
    });

    // retrieve all TV shows
    getAllTVShows = asyncHandler(async (req, res) => {
        this.logger.info(
            `getAllTVShows start with args : ${JSON.stringify(req.query)}`
        );

        const { page = 1, limit = 10, skip = 0 } = req.query;

        // Convert page and limit to integers and calculate the skip value
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skipValue = (pageNumber - 1) * limitNumber || skip;

        let error, totalTVShows, tvShows;

        // Get total number of TV shows
        [error, totalTVShows] = await to(tvShowModel.countDocuments());

        if (error) {
            this.logger.error(" getting total number of TV shows:", error);
            return res
                .status(500)
                .json({ error: TV_SHOW_DICTIONARY.FAILED_TO_RETRIEVE_TV_SHOW });
        }

        // Get TV shows with pagination
        [error, tvShows] = await to(
            tvShowModel.find().skip(skipValue).limit(limitNumber)
        );

        if (error) {
            this.logger.error(" getting TV shows:", error);
            return res
                .status(500)
                .json({ error: TV_SHOW_DICTIONARY.FAILED_TO_RETRIEVE_TV_SHOW });
        }

        this.logger.info(
            `getAllTVShows ended with response : ${JSON.stringify({
                total: totalTVShows,
                page: pageNumber,
                limit: limitNumber,
                data: tvShows,
            })}`
        );

        res.json({
            total: totalTVShows,
            page: pageNumber,
            limit: limitNumber,
            data: tvShows,
        });
    });

    // retrieve a TV show by ID
    getTVShowById = asyncHandler(async (req, res) => {
        this.logger.info(
            `getTVShowById start with args : ${JSON.stringify(req.params)}`
        );

        const [err, tvShow] = await to(tvShowModel.findById(req.params.tvShowId));

        if (err) {
            this.logger.error(" retrieving TV show:", err);
            return res
                .status(500)
                .json({ error: TV_SHOW_DICTIONARY.FAILED_TO_RETRIEVE_TV_SHOW });
        }
        if (!tvShow) {
            return res
                .status(404)
                .json({ error: TV_SHOW_DICTIONARY.TV_SHOW_NOT_FOUND });
        }

        this.logger.info(
            `getTVShowById ended with response : ${JSON.stringify(tvShow)}`
        );
        res.json(tvShow);
    });

    //  update a TV show by ID
    updateTVShowById = asyncHandler(async (req, res) => {
        this.logger.info(
            `updateTVShowById start with args : ${JSON.stringify(req.params)}`
        );

        const [err, tvShow] = await to(
            tvShowModel.findByIdAndUpdate(req.params.tvShowId, req.body, {
                new: true,
            })
        );

        if (err) {
            this.logger.error(" updating TV show:", err);
            return res
                .status(500)
                .json({ error: TV_SHOW_DICTIONARY.FAILED_TO_UPDATE_TV_SHOW });
        }
        if (!tvShow) {
            return res
                .status(404)
                .json({ error: TV_SHOW_DICTIONARY.TV_SHOW_NOT_FOUND });
        }

        this.logger.info(
            `updateTVShowById ended with response : ${JSON.stringify(tvShow)}`
        );
        res.json(tvShow);
    });

    //  delete a TV show by ID
    deleteTVShowById = asyncHandler(async (req, res) => {
        this.logger.info(
            `deleteTVShowById start with args : ${JSON.stringify(req.params)}`
        );

        const [err, tvShow] = await to(
            tvShowModel.findByIdAndDelete(req.params.tvShowId)
        );

        if (err) {
            this.logger.error(" deleting TV show:", err);
            return res
                .status(500)
                .json({ error: TV_SHOW_DICTIONARY.FAILED_TO_DELETE_TV_SHOW });
        }
        if (!tvShow) {
            return res.status(404).json({ error: "TV show not found." });
        }

        this.logger.info(`deleteTVShowById ended`);
        res.json({ message: "TV show deleted successfully." });
    });
}

module.exports = TvShowController;
