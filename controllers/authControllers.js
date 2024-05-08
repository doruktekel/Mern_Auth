const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModels");
const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill the all credentials");
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

  res.status(201).json({ message: "Registration is successfully" });
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
    throw new Error("Credentials are wrong");
  }

  const token = generateToken(alreadyUser._id);

  res.cookie(alreadyUser._id, token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });

  res
    .status(200)
    .json({ message: "Login was successfully", user: alreadyUser, token });
});

const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const user = await UserModel.findById(userId, "-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "10s" });
};

module.exports = {
  register,
  login,
  getUser,
};
