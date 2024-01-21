'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Store Owner',
      phone: '9876543210',
      email: 'admin@admin.com',
      password: '$2b$10$i/phDofIMxZOqw5gaFGTMuk2jcNrnL4yMg49NlTz1K/5IV91uq0GS', 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('stores', [{
      store_name: 'Pets Shop',
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('user_roles', [{
      user_id: 1,
      role_id: 2,
      store_id:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', { user_id:1,role_id: 2,store_id:1, }, {});
    await queryInterface.bulkDelete('store', { createdBy:1,store_id:1, }, {});
    await queryInterface.bulkDelete('users', { email: 'admin@admin.com' }, {});

  }
};
