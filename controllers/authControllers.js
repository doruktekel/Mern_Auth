const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModels");
const { hashPassword, comparePassword } = require("../helpers/authHelpers");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Pelase fill the all credentials");
  }

  const alreadyUser = await UserModel.findOne({ email });

  if (alreadyUser) {
    res.status(400);
    throw new Error("This email has been already user");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Registeration is successfully" });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const alreadyUser = await UserModel.findOne({ email });

  if (!alreadyUser) {
    res.status(500);
    throw new Error("This email is not registered");
  }

  const checkPassword = await comparePassword(password, alreadyUser.password);

  if (!checkPassword) {
    res.status(500);
    throw new Error("Credintials are wrong");
  }

  res.status(200).json({ message: "Login is succussfully" });
});

module.exports = {
  register,
  login,
};
