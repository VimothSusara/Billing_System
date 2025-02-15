const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier.controller");
const authenticateToken = require("../middleware/auth.middleware");

//search for suppliers
router.get("/search", authenticateToken, supplierController.searchSuppliers);

module.exports = router;
