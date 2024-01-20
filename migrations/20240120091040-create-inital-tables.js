"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // // Create Roles Table
    await queryInterface.createTable("roles", {
      role_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role_name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // Create Store Table
    await queryInterface.createTable("stores", {
      store_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store_name: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create User_roles Table
    await queryInterface.createTable("user_roles", {
      user_role_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "role_id",
        },
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "stores",
          key: "store_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create Product_category Table
    await queryInterface.createTable("product_categories", {
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create Products Table
    await queryInterface.createTable("products", {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "stores",
          key: "store_id",
        },
      },
      product_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product_categories",
          key: "category_id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      inventory_quantity: {
        type: Sequelize.INTEGER,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create Orders Table
    await queryInterface.createTable("orders", {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "stores",
          key: "store_id",
        },
      },
      order_date: {
        type: Sequelize.DATE,
      },
      order_total: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.ENUM("draft", "completed", "fulfilled"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create Order_items Table
    await queryInterface.createTable("order_items", {
      order_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "order_id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop Order_items Table
    await queryInterface.dropTable("order_items");

    // Drop Orders Table
    await queryInterface.dropTable("orders");

    // Drop Product_category Table
    await queryInterface.dropTable("product_categories");

    // Drop Products Table
    await queryInterface.dropTable("products");

    // Drop Stores Table
    await queryInterface.dropTable("stores");

    // Drop User_roles Table
    await queryInterface.dropTable("user_roles");

    // Drop Roles Table
    await queryInterface.dropTable("roles");

    // Drop Users Table
    await queryInterface.dropTable("users");
  },
};
