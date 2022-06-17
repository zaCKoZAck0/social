const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: ObjectId,
      ref: "post",
      required: true,
      },
    comment: {
      type: [ObjectId],
      ref: "comment",
      default: [],
    }
  });

module.exports = mongoose.model("Comment", CommentSchema);