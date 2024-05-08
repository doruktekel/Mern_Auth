const express = require("express");
const { register, login, getUser } = require("../controllers/authControllers");
const verifyToken = require("../middlewares/authMiddlewares");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/user", verifyToken, getUser);

module.exports = route;
