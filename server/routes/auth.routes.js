const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

//register user
router.post("/register", authController.register);

//login user
router.post("/login", authController.login);

//refresh token
router.post("/refresh", authController.refreshToken);

//logout user
router.post("/logout", authController.logout);

//check user
router.get("/check", authController.checkAuth);

module.exports = router;
