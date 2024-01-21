'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      // { role_name: 'CUSTOMER', createdAt: new Date(), updatedAt: new Date() },
      { role_name: 'ADMIN', createdAt: new Date(), updatedAt: new Date() },
      { role_name: 'STORE_OWNER', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', {
      role_name: ['ADMIN', 'STORE_OWNER'],
    }, {});
  }
};
