"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Warranties", [
      {
        warranty_name: "No Warranty",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "3 months",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "6 months",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "12 months",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "18 months",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "24 months",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "36 months",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "48 months",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warranty_name: "60 months",
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
    await queryInterface.bulkDelete("Warranties", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
