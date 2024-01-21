'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'customer_id')
    await queryInterface.addColumn('orders', 'customer_id', {
      type: Sequelize.INTEGER,
      references: {
        model: "customers",
        key: "customer_id"
      }
    });
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('orders', 'customer_id')
  }
};
