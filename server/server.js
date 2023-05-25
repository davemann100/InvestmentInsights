const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}), express.json(), express.urlencoded({ extended: true }),cookieParser());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set it to `true` if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
    },
  })
);

// Load .env vars
require('dotenv').config()
// access the .env vars
const port = process.env.PORT

// Require / import the file
require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/record.routes')(app);


const userRoutes = require('./routes/user.routes');
const recordRoutes = require('./routes/record.routes');



// Require the routes here to run
app.use('/api/users',  userRoutes); // Requires authentication
app.use('/api/records',  recordRoutes); // Requires authentication

app.listen(port, () =>
  console.log(`Listening on port ${port} for requests to respond to.`)
);
