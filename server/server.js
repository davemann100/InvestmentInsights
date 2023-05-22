const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors(), express.json(), express.urlencoded({extended: true}));

// Load .env vars
require('dotenv').config()
// access the .env vars
const port = process.env.PORT

// Require / import the file
require('./config/mongoose.config');

// Require the routes here to run
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port ${port} for REQuests to RESpond to.`));