require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      message: "You are not authorised to view this page.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_PHRASE);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(500).json({
      message: "Invalid token",
    });
  }
}
