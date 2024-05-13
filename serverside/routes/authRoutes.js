const express = require("express");
const {
  register,
  login,
  getUser,
  logout,
} = require("../controllers/authControllers");
const { verifyToken, refreshToken } = require("../middlewares/authMiddlewares");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/user", verifyToken, getUser);
route.get("/refresh", refreshToken, verifyToken, getUser);
route.post("/logout", verifyToken, logout);

module.exports = route;
