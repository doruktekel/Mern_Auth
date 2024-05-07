const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  const headers = req.headers.authorization;
  if (headers && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.id = decoded.id;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = verifyToken;
