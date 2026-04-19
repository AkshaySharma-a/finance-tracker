const mongoose = require("mongoose");
const config = require("./env");

const connectDB = async () => {
  const URI = config.MONGO_URI;

  if (!URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  try {
    await mongoose.connect(URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
