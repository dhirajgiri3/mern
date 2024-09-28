const jwt = require("jsonwebtoken");

// Generate short-lived access token
const generateAccessToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE || "15m"; // Default to 15 minutes

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn });
};

// Generate long-lived refresh token
const generateRefreshToken = (user) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRE || "7d"; // Default to 7 days

  if (!refreshSecret) {
    throw new Error(
      "JWT_REFRESH_SECRET is not defined in environment variables"
    );
  }

  return jwt.sign({ id: user._id, role: user.role }, refreshSecret, {
    expiresIn: refreshExpiresIn,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
