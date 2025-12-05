const mongoose = require("mongoose");

const FollowedUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  followedUsers: [
    {
      type: String,
      ref: "User",
    },
  ],
});

const FollowedUserModel = mongoose.model("FollowedUser", FollowedUserSchema);

module.exports = FollowedUserModel;
