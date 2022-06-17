const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const FriendsSchema = mongoose.Schema({
    post: {
      type: ObjectId,
      ref: "post",
      required: true,
    },
    by: {
      type: [ObjectId],
      ref: "user",
      default: []
    }
  });

module.exports = mongoose.model("Friends", FriendsSchema);