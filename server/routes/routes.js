const RecordController = require('../controllers/record.controller')

//add routes after creating controllers
module.exports = app => {
    app.get('/api/records', RecordController.findAllRecords);
}