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

// Create One
module.exports.createNewRecord = (req, res) => {
    Record.create(req.body)
        .then(newlyCreatedRecord => {
            res.json({ record: newlyCreatedRecord })
        })
        .catch((errorObj) => {
            res.json({ message: 'Something went wrong', errorObj })
            // errorObj => response.status(400).json(errorObj)
        });
}

// Delete One
module.exports.delete = (req, res) => {
    Record.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}