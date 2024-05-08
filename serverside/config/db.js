const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Database Connected :) ");
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = { dbConnection };
