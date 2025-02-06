const { User } = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.util");

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      role_id: req.body.role_id,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: { username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user.user_id);
    const refreshToken = generateRefreshToken(user.user_id);

    //Set token to HttpOnly cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // Secure should be true for production
      sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "Refresh token is required" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(403).json({ error: "User not found" });
      }

      const accessToken = generateAccessToken(user.user_id);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
      });

      res.status(200).json({ message: "Access token refreshed successfully" });
    }
  );
};

exports.checkAuth = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ error: "Not Authenticated!" });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    res.json({
      message: "Authenticated successfully",
      user: { username: user.username },
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: error.message });
  }
};
