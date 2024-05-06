const UserModel = require("../models/userModels");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const comparePassword = async (password, alreadyUserPassword) => {
  return await bcrypt.compare(password, alreadyUserPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
