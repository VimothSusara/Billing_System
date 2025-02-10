const jwt = require("jsonwebtoken");

//Generate access token (Short term)
const generateAccessToken = (user) => {
  return jwt.sign({ id: user }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
};

//Generate refresh token (Long term)
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

//Verify access token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

//Verify refresh token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
