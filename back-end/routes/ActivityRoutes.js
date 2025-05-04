// routes/activityRoutes.js
const express = require("express");
const router = express.Router();
const Activity = require("../models/ActivityModel");

router.get("/activities/:userId", async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId });
    res.json({
      activities: activities.map((activity) => activity.description),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/activities/:userId", async (req, res) => {
  try {
    await Activity.deleteMany({ userId: req.params.userId });
    res.json({ message: "All activities deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
