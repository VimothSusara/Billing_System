"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Suppliers", [
      {
        supplier_code: "SUP001",
        supplier_name: "Supplier 1",
        supplier_address: "Supplier 1 Address",
        tel_no: "123456789",
        contact_person: "Contact Person 1",
        email_address: "sup1@gmail.com",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supplier_code: "SUP002",
        supplier_name: "Supplier 2",
        supplier_address: "Supplier 2 Address",
        tel_no: "123276789",
        contact_person: "Contact Person 2",
        email_address: "sup2@gmail.com",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supplier_code: "SUP003",
        supplier_name: "Supplier 3",
        supplier_address: "Supplier 3 Address",
        tel_no: "123456289",
        contact_person: "Contact Person 3",
        email_address: "sup3@gmail.com",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supplier_code: "SUP004",
        supplier_name: "Supplier 4",
        supplier_address: "Supplier 4 Address",
        tel_no: "123456789",
        contact_person: "Contact Person 4",
        email_address: "sup4@gmail.com",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
    await queryInterface.bulkDelete("Suppliers", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
