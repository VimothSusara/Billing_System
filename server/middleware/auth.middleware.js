const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(403).json({ error: "Access token is required" });
  }
  try {
    jwt.verify(accessToken, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Access token has expired" });
    }
    return res.status(403).json({ error: "Invalid access token" });
  }
};
