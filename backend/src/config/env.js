require("dotenv").config();

if (!process.env.MONGO_URI) {
  console.warn("⚠️  Warning: MONGO_URI is missing in .env file");
}

if (!process.env.JWT_SECRET) {
  console.warn("⚠️  Warning: JWT_SECRET is missing in .env file");
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

