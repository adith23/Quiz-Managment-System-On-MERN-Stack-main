const User = require("../models/userModel");
const {
  hashPassword,
  comparePassword,
} = require("../middleware/passwordEncrypt");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if name was entered
    if (!name) {
      return res.json({
        error: "Name is Required",
      });
    }

    // Check if password was good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is Required, Should be at Least 6 Characters Long",
      });
    }

    // Check email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        error: "Email is Already Taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Return the new user object
    return res.json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// Login End Point
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "No User Found",
      });
    }

    // Check password match
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: "Password Does Not Match",
      });
    }

    // Generate Access Token (Short-lived ~15 min)
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Generate Refresh Token (Long-lived ~7 days)
    // Using a separate secret if available, else falling back to JWT_SECRET
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send Refresh Token in a Set-Cookie header
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send accessToken in the JSON body
    res.json({
      user,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// Refresh Token Endpoint
const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid" });
      }

      try {
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const accessToken = jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken, user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
};

// Logout Endpoint
const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  refresh,
  logout,
};
