const { where, Op } = require("sequelize");
const db = require("../models");
const Supplier = db.Supplier;

//supplier search
exports.searchSuppliers = async (req, res) => {
  try {
    const { q } = req.query;
    // console.log("supplier query", req.query);
    const suppliers = await Supplier.findAll({
      attributes: ["supplier_id", "supplier_code", "supplier_name"],
      where: {
        [Op.or]: [
          { supplier_code: { [Op.like]: `%${q}%` } },
          { supplier_name: { [Op.like]: `%${q}%` } },
        ],
      },
    });
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
