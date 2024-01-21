'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('product_categories', 'store_id', {
      type: Sequelize.INTEGER,
      references: {
        model: "stores",
        key: "store_id"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('product_categories', 'store_id')
  }
};
