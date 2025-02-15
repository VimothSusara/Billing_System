const { where, Op } = require("sequelize");
const db = require("../models");
const Category = db.Category;

//get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["category_id", "category_name"],
      where: {
        status: 1,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
