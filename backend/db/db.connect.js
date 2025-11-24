const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);

    if (connection) {
      console.log("Database connected successfully.");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { initializeDatabase };
