const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required"]
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"]
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    validate: {
      validator: function (val) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val);
      },
      message: "Please enter a valid email address"
    }
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [8, "Password must be at least 8 characters"]
  }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (val) {
    this._confirmPassword = val;
  });

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports.User = mongoose.model('User', UserSchema);