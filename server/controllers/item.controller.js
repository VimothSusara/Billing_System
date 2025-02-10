const { where } = require("sequelize");
const db = require("../models");
const Item = db.Item;

//get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//get item by id
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//create item
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
    next(error);
  }
};

//update item by id
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await Item.update(updates, { where: { item_id: id } });

    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = await Item.findByPk(id);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//delete item by id
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Item.destroy({ where: { item_id: id } });

    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
