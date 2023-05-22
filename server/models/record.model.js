//import mongoose to build the model
const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Name is required."
        ]
    },
});

const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;