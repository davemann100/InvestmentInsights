//import mongoose to build the model
const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [
            true,
            "Name is required."
        ]
    },
    b_s: {
        type: String,
        required: [
            true,
            "Buy/Sell is required."
        ]
    },
    ticker: {
        type: String,
        required: [
            true,
            "Ticker is required."
        ]
    },
    numShares: {
        type: Number,
        required: [
            true,
            "Number of shares is required."
        ]
    },
    purchasePrice: {
        type: Number,
        required: [
            true,
            "Purchase price is required."
        ]
    },
    sellPrice: {
        type: Number,
        required: [
            true,
            "Sell price is required."
        ]
    },
    stopLoss: {
        type: Number,
        required: [
            true,
            "Number of shares is required."
        ]
    },
});

const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;