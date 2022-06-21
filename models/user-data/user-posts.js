const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserPostsSchema = mongoose.Schema({
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    list: {
      type: [ObjectId],
      ref: "post",
      default: []
    }
  });

module.exports = mongoose.model("User-Post", UserPostsSchema);