const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI).then(() => {
      console.log("MongoDB connected");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();