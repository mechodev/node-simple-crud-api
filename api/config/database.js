const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI);
    console.info("Connecting to Mongoose");
  } catch (error) {
    console.error("dbError: " + error);
    process.exit();
  }
};

module.exports = connectDB;
