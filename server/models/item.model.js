const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Item extends Model {}

  Item.init(
    {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      item_code: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        unique: true,
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      measure_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      vat_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      labeled_price: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
        comment: "Market(labeled) Price",
      },
      buying_price: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
        comment: "Buying Price + VAT Price",
      },
      selling_price: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
        comment: "Selling Price",
      },
      available_stock: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
        defaultValue: 0,
      },
      reorder_level: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
        defaultValue: 0,
      },
      product_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Item Category",
      },
      item_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Item Type(Normal, Service, Serial)",
      },
      warranty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "Warranty Period(1 = No Warranty)",
      },
      item_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "Item Status(1 = Active, 2 = Inactive)",
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Barcode",
        unique: true,
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Supplier",
        // references: {
        //   model: "Suppliers",
        //   key: "supplier_id",
        // },
      },
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "Items",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    }
  );

  return Item;
};
