require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connects successfully!");
  } catch (error) {
    console.error("MongoDB connects failed!", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
