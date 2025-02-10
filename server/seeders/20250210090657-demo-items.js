"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          item_id: 1,
          item_code: 1,
          item_name: "Item 1",
          measure_type: 1,
          vat_percentage: 18,
          labeled_price: 1500.0,
          buying_price: 1500.0,
          selling_price: 2000.0,
          available_stock: 0,
          reorder_level: 10,
          product_code: "s000001",
          item_category: 1,
          item_type: 1,
          warranty: 1,
          item_status: 1,
          barcode: "1",
          supplier_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          item_id: 2,
          item_code: 2,
          item_name: "Item 2",
          measure_type: 1,
          vat_percentage: 18,
          labeled_price: 1000.0,
          buying_price: 1000.0,
          selling_price: 1800.0,
          available_stock: 0,
          reorder_level: 20,
          product_code: "s000002",
          item_category: 1,
          item_type: 1,
          warranty: 1,
          item_status: 1,
          barcode: "2",
          supplier_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
