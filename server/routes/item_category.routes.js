const express = require("express");
const router = express.Router();
const itemCategoryController = require("../controllers/item_category.controller");
const authenticateToken = require("../middleware/auth.middleware");

//get all categories for dropdown 
router.get("/", itemCategoryController.getAllCategories);

module.exports = router;
