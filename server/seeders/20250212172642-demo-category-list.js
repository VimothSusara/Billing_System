"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        category_name: "Category Name 1",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Category Name 2",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Category Name 3",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Category Name 4",
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
    await queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
