const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { signToken, verifyToken };
