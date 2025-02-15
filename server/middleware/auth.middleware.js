const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // console.log("Cookie: ", req.cookies);
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ error: "Not Authorized!" });
  }
  try {
    jwt.verify(accessToken, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Access token has expired" });
    }
    return res.status(403).json({ error: "Invalid Access Token" });
  }
};

module.exports = authenticateToken;
