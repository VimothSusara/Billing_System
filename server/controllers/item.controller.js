const { where } = require("sequelize");
const db = require("../models");
const Item = db.Item;
const ItemType = db.ItemType;
const ItemMeasure = db.ItemMeasure;
const Warranty = db.Warranty;

//get all items
exports.getAllItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    // const [results, metadata] = await sequelize.query(`
    //     SELECT * FROM Items As i
    //   `);
    const { count, rows } = await Item.findAndCountAll({
      // attributes: [
      //   "item_id",
      //   "item_code",
      //   "item_name",
      //   "buying_price",
      //   "selling_price",
      // ],
      offset: offset,
      limit: limit,
      where: {
        item_status: 1,
      },
    });

    const formattedItems = rows.map((item) => ({
      item_id: item.item_id, // Ensure it's a number
      item_code: item.item_code.toString(), // Convert to string if needed (for consistency)
      item_name: item.item_name, // string
      measure_type: parseInt(item.measure_type), // number
      vat_percentage: parseInt(item.vat_percentage), // number
      labeled_price: parseFloat(item.labeled_price), // Convert to number (float)
      buying_price: parseFloat(item.buying_price), // Convert to number (float)
      selling_price: parseFloat(item.selling_price), // Convert to number (float)
      available_stock: parseFloat(item.available_stock), // Convert to number (float or int)
      reorder_level: parseFloat(item.reorder_level), // Convert to number (float or int)
      product_code: item.product_code.toString(), // Convert to string if needed
      item_category: parseInt(item.item_category), // number
      item_type: parseInt(item.item_type), // number
      warranty: parseInt(item.warranty), // number
      item_status: item.item_status, // number
      barcode: item.barcode.toString(), // string (barcode should be string)
      supplier_id: parseInt(item.supplier_id),
      createdAt: item.createdAt, // ISO 8601 Date string
      updatedAt: item.updatedAt,
    }));

    // console.log("Count: ", count);
    // console.log("Rows: ", rows);
    res.status(200).json({
      items: formattedItems,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
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
    const {
      warranty,
      selling_price,
      barcode,
      buying_price,
      labeled_price,
      reorder_level,
      item_name,
      item_measure,
      item_type,
      category,
      product_code,
      supplier,
      date,
    } = req.body;

    const newItem = await Item.create({
      warranty,
      selling_price,
      barcode,
      buying_price,
      labeled_price,
      reorder_level,
      item_name,
      measure_type: item_measure,
      item_type,
      item_category: category,
      product_code,
      supplier_id: supplier,
      createdAt: date,
      updatedAt: date,
      vat_percentage: 18,
    });

    newItem.item_code = newItem.item_id;
    await newItem.save();

    const formattedItem = {
      item_id: parseInt(newItem.item_id), // Ensure it's a number
      item_code: newItem.item_code.toString(), // Convert to string
      item_name: newItem.item_name, // string
      measure_type: parseInt(newItem.measure_type), // number
      vat_percentage: parseInt(newItem.vat_percentage), // number
      labeled_price: parseFloat(newItem.labeled_price), // Convert to number (float)
      buying_price: parseFloat(newItem.buying_price), // Convert to number (float)
      selling_price: parseFloat(newItem.selling_price), // Convert to number (float)
      available_stock: parseFloat(newItem.available_stock) || 0, // Ensure it's a number (0 if undefined)
      reorder_level: parseFloat(newItem.reorder_level), // Convert to number (float or int)
      product_code: newItem.product_code.toString(), // Convert to string if needed
      item_category: parseInt(newItem.item_category), // number
      item_type: parseInt(newItem.item_type), // number
      warranty: parseInt(newItem.warranty), // number
      item_status: newItem.item_status, // number (assumed to be active by default)
      barcode: newItem.barcode.toString(), // string (barcode should be string)
      supplier_id: parseInt(newItem.supplier_id), // number
      createdAt: newItem.createdAt, // ISO 8601 Date string
      updatedAt: newItem.updatedAt, // ISO 8601 Date string
    };

    res.status(201).json(formattedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(400).json({ error: error.message });
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

//get latest item code
exports.getLatestItemCode = async (req, res) => {
  try {
    const maxItemCode = await Item.max("item_code");
    const nextItemCode = maxItemCode ? maxItemCode + 1 : 1;
    res.status(200).json({ nextItemCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//get item types
exports.getItemTypes = async (req, res) => {
  try {
    const itemTypes = await ItemType.findAll({
      attributes: ["type_id", "type_name"],
      where: {
        status: 1,
      },
    });
    res.status(200).json(itemTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//get item measures
exports.getItemMeasures = async (req, res) => {
  try {
    const itemMeasures = await ItemMeasure.findAll({
      attributes: ["measure_id", "measure_name"],
      where: {
        status: 1,
      },
    });
    res.status(200).json(itemMeasures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//get warranty
exports.getItemWarranty = async (req, res) => {
  try {
    const warranties = await Warranty.findAll({
      attributes: ["warranty_id", "warranty_name"],
      where: {
        status: 1,
      },
    });
    res.status(200).json(warranties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
