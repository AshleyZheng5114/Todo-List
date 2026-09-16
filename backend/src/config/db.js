const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todoapp");
    console.log("MongoDB connects successfully!");
  } catch (error) {
    console.error("MongoDB connects failed!", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
