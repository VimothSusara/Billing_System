"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ItemMeasures", [
      {
        measure_name: "Nos",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        measure_name: "Kg",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        measure_name: "Litre",
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
    await queryInterface.bulkDelete("ItemMeasures", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
