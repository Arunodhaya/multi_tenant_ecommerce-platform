# Multi-Tenant E-commerce Nodejs Application


## Description

This is a Node.js application that provides multi-tenant e-commerce platform that serves multiple independent online stores. Each store owner can able to manage their products, orders, and customers independently

### Technologies Used

    Node.js
    Express.js
    Sequelize (MySQL)
    JSON Web Tokens (JWT) for authentication

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Arunodhaya/multi_tenant_ecommerce-platform

2. **Install dependencies:**

   ```bash
    npm install or yarn install

3. **Set up the database:** Copy .env.sample and create .env files with required values

    ```bash
    npx sequelize-cli db:migrate  #Executes all migration
    npx sequelize-cli migration:generate --name <replace-name-of-your-migration> #Creates migration

4. **Start the server:**
   ```bash
    yarn start

## Database Schema
1. Users Table:
   - user_id (Primary Key)
   - name
   - phone
   - email
   - password
   - createdAt
   - updatedAt

2. Roles Table:
   - role_id (Primary Key)
   - role_name (store_owner, store_admin)
   - createdAt
   - updatedAt

3. User_roles Table:
   - user_role_id (Primary Key)
   - user_id (Foreign Key referencing Users)
   - role_id (Foreign Key referencing Roles)
   - store_id
   - createdAt
   - updatedAt

4. Store Table:
   - store_id (Primary Key)
   - store_name
   - createdBy
   - createdAt
   - updatedAt

5. Products Table:
   - product_id (Primary Key)
   - store_id (Foreign Key referencing Store)
   - product_category_id (Foreign Key referencing Product_category)
   - name
   - description
   - price
   - inventory_quantity
   - createdBy
   - createdAt
   - updatedAt

6. Product_category Table:
   - category_id (Primary Key)
   - category_name
   - description
   - store_id (Foreign Key referencing Store)
   - createdBy
   - createdAt
   - updatedAt

7. Orders Table:
   - order_id (Primary Key)
   - customer_id (Foreign Key referencing Customers)
   - store_id (Foreign Key referencing Store)
   - order_date
   - order_total
   - status (enum - draft, completed, fulfilled)
   - createdAt
   - updatedAt

8. Order_Items Table:
   - order_item_id (Primary Key)
   - order_id (Foreign Key referencing Orders)
   - product_id (Foreign Key referencing Products)
   - quantity
   - price
   - createdAt
   - updatedAt

9. Customers Table:
   - customer_id (Primary Key)
   - name
   - phone
   - email
   - password
   - store_id (Foreign Key referencing Store)
   - createdAt
   - updatedAt

## API Documentation

Please refer to the [API documentation](https://github.com/Arunodhaya/multi_tenant_ecommerce-platform/blob/master/api_docs.md) for detailed information on the available endpoints and their usage.

## Postman Dump

To quickly verify and test the endpoints, you can import the Postman dump available in the [Postman Dump directory](https://github.com/Arunodhaya/multi_tenant_ecommerce-platform/tree/master/postman_dump).