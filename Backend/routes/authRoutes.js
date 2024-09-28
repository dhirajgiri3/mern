const express = require("express");
const { registerUser, loginUser, refreshToken } = require("../controller/authController");
const loginLimiter = require("../middleware/rateLimit");

const router = express.Router();

// Public route: User registration (signup)
router.post("/register", registerUser);

// Public route: User login
router.post("/login", loginLimiter, loginUser);

// Public route: Refresh token
router.post("/refresh", refreshToken);

module.exports = router;
