const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
const authenticateToken = require("../middleware/auth.middleware");

//get item warranties
router.get("/warranties", authenticateToken, itemController.getItemWarranty);

//get item categories
router.get("/measures", authenticateToken, itemController.getItemMeasures);

//get item types
router.get("/types", authenticateToken, itemController.getItemTypes);

//next item code
router.get("/next", authenticateToken, itemController.getLatestItemCode);

//get all items
router.get("/", authenticateToken, itemController.getAllItems);

//get item by id
router.get("/:id", authenticateToken, itemController.getItemById);

//create item
router.post("/", authenticateToken, itemController.createItem);

//update item
router.put("/:id", authenticateToken, itemController.updateItem);

//delete item
router.delete("/:id", authenticateToken, itemController.deleteItem);

module.exports = router;
