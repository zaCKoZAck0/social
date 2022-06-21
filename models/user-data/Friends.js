const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const FriendsSchema = mongoose.Schema({
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    list: {
      type: [ObjectId],
      ref: "user",
      default: []
    }
});

module.exports = mongoose.model("Friends", FriendsSchema);