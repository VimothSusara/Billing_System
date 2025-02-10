const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");

//get all items
router.get("/", itemController.getAllItems);

//get item by id
router.get("/:id", itemController.getItemById);

//create item
router.post("/", itemController.createItem);

//update item
router.put("/:id", itemController.updateItem);

//delete item
router.delete("/:id", itemController.deleteItem);

module.exports = router;
