const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    avatar: {
      type: Object,
      required: true,
      default: 'https://www.pngall.com/profile-png',
    },
    isAdmin: { type: Boolean, default: false },
  },

  {
    createdAt: {
      type: Date,
      required: Date.now,
    },
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
