const RecordController = require('../controllers/record.controller')

//add routes after creating controllers
module.exports = app => {
    app.get('/api/records', RecordController.findAllRecords);
    app.post('/api/records', RecordController.createNewRecord);
    app.delete('/api/records/:id', RecordController.delete);
}