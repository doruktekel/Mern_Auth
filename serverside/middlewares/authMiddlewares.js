const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../controllers/authControllers");

const verifyToken = asyncHandler(async (req, res, next) => {
  const cookie = req.headers.cookie;
  if (cookie) {
    try {
      const token = cookie.split("=")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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

const refreshToken = asyncHandler(async (req, res, next) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    const prevToken = cookie.split("=")[1];

    if (!prevToken) {
      res.status(400);
      throw new Error("Have not token");
    }

    const decoded = jwt.verify(prevToken, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      res.status(401);
      throw new Error("Authenticated failure");
    }

    res.clearCookie(decoded.id);
    req.cookies[decoded.id] = "";

    const token = generateToken(decoded.id);

    console.log("Regenerated Token\n", token);

    res.cookie(decoded.id, token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = decoded.id;

    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { verifyToken, refreshToken };
