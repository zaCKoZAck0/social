const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const ProfilePhotoSchema = mongoose.Schema({
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    url: {
      type: String,
      default: "",
    }
  });

module.exports = mongoose.model("ProfilePhoto", ProfilePhotoSchema);