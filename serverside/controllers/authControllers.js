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

  console.log("Generated Token\n", token);
  // if (req.cookies[`${alreadyUser._id}`]) {
  //   req.cookies[`${alreadyUser._id}`] = "";
  // }

  if (req.cookies[alreadyUser._id]) {
    res.clearCookie(alreadyUser._id);
  }

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

const logout = asyncHandler(async (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    res.status(400);
    throw new Error("Couldnt find token");
  }

  const token = cookie.split("=")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    res.status(403);
    throw new Error("Authentication failed");
  }

  res.clearCookie(decoded.id);
  req.cookies[decoded.id] = "";

  res.status(200).json({ message: "Successfully logout" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "35s" });
};

module.exports = {
  register,
  login,
  getUser,
  generateToken,
  logout,
};
