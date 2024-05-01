const express = require("express");
const router = express.Router();
const MyListController = require("../controllers/myListController");
const Auth = require("../middleware/auth");

// Create instance
const myListController = new MyListController();
const auth = new Auth();

// My List Routes
router
    .post(
        "/add-to-list/:userId/:contentId/:contentType",
        auth.checkUserExists,
        myListController.addToMyList
    )
    .delete(
        "/remove-from-list/:userId/:contentId",
        auth.checkUserExists,
        myListController.removeFromMyList
    )
    .get(
        "/list-my-items/:userId",
        auth.checkUserExists,
        myListController.listMyItems
    );

module.exports = router;
