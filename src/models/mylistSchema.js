const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    itemType: {
        type: String,
        enum: ['movie', 'tvshow'],
        required: true
    }
}, { _id: false, timestamps: false });

const myListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemList: [listItemSchema]
});

const MyListModel = mongoose.model('MyList', myListSchema);

module.exports = MyListModel;
