const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (val) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val);
        },
        message: 'Please enter a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual property for confirm password
UserSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Pre-validate hook to check if password matches confirm password
UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
