const Record = require('../models/record.model')

// Read All
module.exports.findAllRecords = (req, res) => {
    Record.find()
        .then((allDaRecords) => {
            res.json({ Record: allDaRecords })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}