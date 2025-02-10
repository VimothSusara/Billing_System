"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      item_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      item_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      measure_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      vat_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      labeled_price: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
        comment: "Market(labeled) Price",
      },
      buying_price: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
        comment: "Buying Price + VAT Price",
      },
      selling_price: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
        comment: "Selling Price",
      },
      available_stock: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
        defaultValue: 0,
      },
      reorder_level: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
        defaultValue: 0,
      },
      product_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      item_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Item Category",
      },
      item_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Item Type(Normal, Service, Serial)",
      },
      warranty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "Warranty Period(1 = No Warranty)",
      },
      item_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "Item Status(1 = Active, 2 = Inactive)",
      },
      barcode: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Barcode",
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items");
  },
};
