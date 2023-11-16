const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, no token provided");
  try {
    const result = jwt.verify(token, config.get("WEB_TOKEN_SECRET"));
    req.admin = result;
    next();
  } catch (error) {
    res.status(400).send("Invalid token!");
  }
};
