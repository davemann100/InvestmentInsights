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
      
      // Update the user document to set isRegistered to true
      User.findByIdAndUpdate(user._id, { isRegistered: true }, { new: true })
        .then(updatedUser => {
          req.session.userId = updatedUser._id;
          req.session.isAuthorized = true; // Set isAuthorized to true
          req.session.isRegistered = true; // Set isRegistered to true
          res
            .cookie("usertoken", userToken, {
              httpOnly: true
            })
            .json({ msg: "success", token: userToken });
        })
        .catch(error => {
          console.error('Failed to update user:', error);
          res.json({ error: 'An error occurred during registration' });
        });
    })
    .catch(err => res.json(err));
}
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

    res.json({ isAuthorized: true, isRegistered: true, user });
  } catch (error) {
    console.error('Authorization check failed:', error);
    res.json({ isAuthorized: false, isRegistered: false });
  }
};

module.exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.id })
      .then(result => {
          res.json({ result: result })
      })
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      });}
module.exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedAuthor => {
            res.status(200).json(updatedAuthor)
        })
        .catch((err) => {
            res.status(400).json(err);
        });}
module.exports.readOne = (req, res) => {
    Pirate.findOne({ _id: req.params.id })
        .then(oneSinglePirate => {
            res.json(oneSinglePirate)
        })
        .catch((err) => {
                  res.json({ message: 'Something went wrong', error: err })
              });
      }