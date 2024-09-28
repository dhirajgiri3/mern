const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

// Register new user (signup)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new user with the hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer", // default role is 'customer'
    });

    // Save the user
    await user.save();

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    if (!accessToken || !refreshToken) {
      throw new Error("Failed to generate tokens");
    }

    res.status(201).json({
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// User login
// Updated loginUser in authController.js
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and explicitly select the password field
    const user = await User.findOne({ email }).select("+password");

    // If user does not exist, return error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Input password:", password);
    console.log("Stored hashed password:", user.password);

    // Compare the hashed password with the user's input password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    console.log("Password match result:", isPasswordMatch);

    // If password doesn't match, return error
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password 3" });
    }

    // If passwords match, send success response (Generate token logic here if needed)
    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Refresh access token
const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const accessToken = generateAccessToken(decoded);

    // Return the new access token
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = { registerUser, loginUser, refreshToken };
