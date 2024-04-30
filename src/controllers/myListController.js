const myListModel = require("../models/myListSchema");
const tvShowModel = require("../models/tvSerialSchema");
const movieModel = require("../models/movieSchema");
const userModel = require("../models/userSchema");
const USER_DICTIONARY = require("../dictionary/user.dictionary");
const to = require("await-to-js").default;
const Logger = require("../logger/logger");
const asyncHandler = require("../middleware/catchAsyncError");
const MY_LIST_DICTIONARY = require("../dictionary/myList.dictionary");

class MyListController {
    constructor() {
        this.logger = new Logger();
    }

    // add an item to the user's list
    addToMyList = asyncHandler(async (req, res) => {
        this.logger.info(
            `addToMyList start with args : ${JSON.stringify(req.params)}`
        );

        const { userId, contentId, contentType } = req.params;

        // Check if the user exists
        let existingUser = await myListModel.findOne({ user: userId });

        if (!existingUser) {
            // If the user does not exist, create a new record
            existingUser = await myListModel.create({ user: userId, itemList: [] });
        }

        // Define a variable to hold the collection based on contentType
        let contentCollection;

        // Check content existence based on contentType
        if (contentType === "movie") {
            contentCollection = movieModel;
        } else if (contentType === "tvshow") {
            contentCollection = tvShowModel;
        } else {
            return res.status(400).json({ error: "Invalid contentType" });
        }

        // Check if the content exists in the respective collection
        const contentExists = await contentCollection.findOne({ _id: contentId });

        if (!contentExists) {
            return res.status(400).json({ error: "Content does not exist" });
        }

        // Check if the item already exists in the user's list
        const itemExists = existingUser.itemList.some(
            (item) => item.itemId.toString() === contentId.toString()
        );

        if (itemExists) {
            return res.status(400).json({ error: MY_LIST_DICTIONARY.ALREADY_EXISTS });
        }

        // Add the item to the user's list
        existingUser.itemList.push({ itemId: contentId, itemType: contentType });
        const updatedList = await existingUser.save();

        this.logger.info(
            `Item added to the user's list : ${JSON.stringify(updatedList)}`
        );
        return res.status(201).json(updatedList);
    });

    // remove an item from the user's list
    removeFromMyList = asyncHandler(async (req, res) => {
        this.logger.info(
            `removeFromMyList start with args : ${JSON.stringify(req.params)}`
        );

        const { userId, contentId } = req.params;

        // Retrieve user details
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: USER_DICTIONARY.USER_NOT_FOUND });
        }

        // Retrieve user's list
        const userList = await myListModel.findOne({ user: userId });
        if (!userList) {
            return res.status(404).json({ error: MY_LIST_DICTIONARY.NOT_FOUND });
        }

        // Find the user
        const userItemList = await myListModel.findOne({ user: userId });

        if (!userItemList) {
            return res.status(404).json({ error: MY_LIST_DICTIONARY.NOT_FOUND });
        }

        // Check if the itemList is empty
        if (userItemList.itemList.length === 0) {
            return res.status(400).json({ error: "User's list is empty." });
        }

        // Check if the contentId exists in the itemList
        const itemIndex = userItemList.itemList.findIndex(
            (item) => item.itemId.toString() === contentId.toString()
        );

        if (itemIndex === -1) {
            return res.status(404).json({ error: MY_LIST_DICTIONARY.NOT_FOUND });
        }

        // Remove the item from the user's list
        userItemList.itemList.splice(itemIndex, 1);
        const updatedUser = await userItemList.save();

        this.logger.info(`removeFromMyList ended`);

        return res.json({
            message: "Item removed from the user's list successfully.",
        });
    });

    // list all items in the user's list
    listMyItems = asyncHandler(async (req, res) => {
        this.logger.info(
            `listMyItems start with args: ${JSON.stringify(req.params)}`
        );

        const { userId } = req.params;

        // Retrieve user details
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: USER_DICTIONARY.USER_NOT_FOUND });
        }

        // Retrieve user's list
        const userList = await myListModel.findOne({ user: userId });
        if (!userList) {
            return res.status(404).json({ error: MY_LIST_DICTIONARY.NOT_FOUND });
        }

        // Lookup items based on itemType
        const items = [];
        for (const item of userList.itemList) {
            let collection;
            if (item.itemType === "tvshow") {
                collection = tvShowModel;
            } else if (item.itemType === "movie") {
                collection = movieModel;
            }

            if (collection) {
                const foundItem = await collection.findById(item.itemId);
                if (foundItem) {
                    items.push(foundItem);
                }
            }
        }

        this.logger.info(
            `listMyItems ended with response: ${JSON.stringify(items)}`
        );
        return res.json({ user, items });
    });
}

module.exports = MyListController;
