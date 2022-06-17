const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const PostsSchema = mongoose.Schema({
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

module.exports = mongoose.model("Post", PostsSchema);