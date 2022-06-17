const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  byUser: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Post", PostSchema);