const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    requied: true,
  },
  email: {
    type: String,
    unique: true,
    requied: true,
    lowercase: true
  },
  password: {
    type: String,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);