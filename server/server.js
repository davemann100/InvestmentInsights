// this is the only file running
const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT;

//middleware
app.use(cors())
app.use(express.json(), express.urlencoded({ extended: true }));

require('./config/mongoose.config')
require('./routes/record.routes')(app);
app.listen(port, () => console.log(`Listening on port: ${port} for requests....`));