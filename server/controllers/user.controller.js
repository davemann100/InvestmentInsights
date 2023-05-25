const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

// User Registration
module.exports.registerUser = (req, res) => {
  User.create(req.body)
    .then(user => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );
      req.session.userId = user._id; // Fixed: Assign the user ID to req.session.userId
      res
        .cookie("usertoken", userToken, {
          httpOnly: true
        })
        .json({ msg: "success", token: userToken }); // Fixed: Removed exclamation mark from the success message
    })
    .catch(err => res.json(err));
};
// Get All Users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// User Login
module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  try {
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user._id
    const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.cookie('usertoken', userToken, { httpOnly: true }).json({ msg: 'success', token: userToken });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Authentication Middleware
module.exports.logoutUser = (req, res) => {
  res.clearCookie('usertoken');
  req.session.destroy()
  res.sendStatus(200);
}
module.exports.checkAuthorization = async (req, res) => {
  try {
    const userToken = req.cookies.usertoken;

    if (!userToken) {
      return res.json({ isAuthorized: false, isRegistered: false });
    }

    const decodedToken = jwt.verify(userToken, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.id);

    if (!user || !user.isRegistered) {
      return res.json({ isAuthorized: false, isRegistered: false });
    }

    // Add your authorization logic here

    res.json({ isAuthorized: true, isRegistered: true });
  } catch (error) {
    console.error('Authorization check failed:', error);
    res.json({ isAuthorized: false, isRegistered: false });
  }
};