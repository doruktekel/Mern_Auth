const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the email"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter the email"],
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
