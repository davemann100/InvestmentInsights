<<<<<<< HEAD
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

app.listen(port, () =>
  console.log(`Listening on port ${port} for requests to respond to.`)
);
=======
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
require('./routes/routes')(app);
app.listen(port, () => console.log(`Listening on port: ${port} for requests....`));
>>>>>>> 0a985b57d235bb775664e712486d1fa853f12afa
