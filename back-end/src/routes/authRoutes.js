const express = require("express");
const router = express.Router();
const cors = require("cors");
const authenticateToken = require("../middleware/authMiddleware");
const {
  registerUser,
  test,
  loginUser,
  refresh,
  logout,
} = require("../controllers/authControllers");
const User = require("../models/userModel");
const FollowedUser = require("../models/followedUserModel");
const Activity = require("../models/activityModel");

// Middleware
const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

router.use(cors(corsOptions));

// Routes
router.get("/", test);

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add these lines in your routes file
router.post("/follow", authenticateToken, async (req, res) => {
  const { followedUserId } = req.body;

  const userId = req.user.id; // Get the userId from the JWT token

  const activity = new Activity({
    userId,
    description: `Followed user with ID ${followedUserId}`,
  });
  await activity.save();

  try {
    let followedUser = await FollowedUser.findOne({ userId });
    if (!followedUser) {
      followedUser = new FollowedUser({
        userId,
        followedUsers: [followedUserId],
      });
    } else {
      // Check if the user is already followed
      if (followedUser.followedUsers.includes(followedUserId)) {
        return res.json({ message: "User is already followed" });
      }

      followedUser.followedUsers.push(followedUserId);
    }
    await followedUser.save();
    res.json(followedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/unfollow", authenticateToken, async (req, res) => {
  const { unfollowedUserId } = req.body;

  const userId = req.user.id; // Get the userId from the JWT token

  const activity = new Activity({
    userId,
    description: `Unfollowed user with ID: ${unfollowedUserId}`,
  });
  await activity.save();

  try {
    const followedUser = await FollowedUser.findOne({ userId });
    if (followedUser) {
      followedUser.followedUsers.pull(unfollowedUserId);
      await followedUser.save();
    }
    res.json(followedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// In your routes file
router.get("/followedUsers", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Get the userId from the JWT token

  try {
    const followedUser = await FollowedUser.findOne({ userId });
    if (!followedUser) {
      return res.json({ followedUsers: [] });
    }
    res.json(followedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
