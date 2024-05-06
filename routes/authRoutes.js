const express = require("express");
const { register, login } = require("../controllers/authControllers");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);

module.exports = route;
