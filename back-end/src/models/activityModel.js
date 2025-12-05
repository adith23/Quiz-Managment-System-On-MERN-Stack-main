// models/ActivityModel.js
const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ActivityModel = mongoose.model("Activity", ActivitySchema);

module.exports = ActivityModel;
