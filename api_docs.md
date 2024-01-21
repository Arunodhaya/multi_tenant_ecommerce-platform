# API Documentation

## Customer Registration

`POST /customer/auth/register`

### Request Headers

- `store_id: 1`
- `Content-Type: application/json`


### Request Body

```json
{
  "name": "Aruna",
  "phone": "9500918603",
  "email": "aruna1@gmail.com",
  "password": "admin@123"
}
```
### Response Body
Success (200 OK)
```json
{
  "customer": {
    "customer_id": 14,
    "name": "Aruna",
    "phone": "9500918603",
    "email": "aruna1@gmail.com",
    "password": "$2b$10$9kYnQ6CksS63sb.jWjcfWOHt.Qt02MthkBIdU5yYESUSEcyz7p1Ia",
    "store_id": 1,
    "updatedAt": "2024-01-21T19:29:22.520Z",
    "createdAt": "2024-01-21T19:29:22.520Z"
  }
}
```
---
## Customer Login



`POST /customer/auth/login`

### Request Headers

- `store_id: 1`
- `Content-Type: application/json`


### Request Body

```json
{
  "email": "aruna_customer1@gmail.com",
  "password": "admin@123"
}
```
### Response Body
Success (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MTMsImVtYWlsIjoiYXJ1bmFfY3VzdG9tZXIxQGdtYWlsLmNvbSIsImlhdCI6MTcwNTg1NTE0MywiZXhwIjoxNzA1OTQxNTQzfQ.9bF2fBihI6QK9vL123vjjGNB6TKL3_yiboQhvljEZfA"
}

```
---

## Update Customer Information




`PUT /customer/auth/{customer_id}`


### Request Headers

- `store_id: 1`
- `Content-Type: application/json`
- `Authorization: Bearer {JWT_token}`

### Request Body
You can give any field of customer in the body it will get updated
```json
{
  "email": "aruna_customer@gmail.com",
  "password": "admin@123"
}
```

### Request Body
Success (200 OK)
```json
{
  "message": "Customer updated successfully",
  "customer": {
    "customer_id": 12,
    "email": "aruna_customer@gmail.com",
    "store_id": 1,
    "password": "$2b$10$i/phDofIMxZOqw5gaFGTMuk2jcNrnL4yMg49NlTz1K/5IV91uq0GS",
    "createdAt": "2024-01-21T12:19:00.000Z",
    "updatedAt": "2024-01-21T18:57:15.942Z"
  }
}
```
---

## Create Customer Order
An order will be created with DRAFT state




`POST /customer/orders`

### Request Headers

- `store_id: 1`
- `Authorization: Bearer {JWT_token}`

### Request Body

The request body is empty.

### Response

#### Success (201 Created)

```json
{
  "order_id": 8,
  "customer_id": 13,
  "store_id": 1,
  "status": "DRAFT",
  "updatedAt": "2024-01-21T19:45:50.945Z",
  "createdAt": "2024-01-21T19:45:50.945Z"
}
```
---
## Add Item to Customer Order
Adds items to the cart of given order_id.

`POST /customer/orders/{order_id}/items`

### Request Headers

- `store_id: 1`
- `Content-Type: application/json`
- `Authorization: Bearer {JWT_token}`

### Request Body

```json
{
  "product_id": 2,
  "quantity": 3
}
```
### Response

#### Success (201 Created)

```json
{
    "order_item_id": 9,
    "order_id": 8,
    "product_id": 2,
    "quantity": 3,
    "price": 50,
    "createdAt": "2024-01-21T19:52:00.000Z",
    "updatedAt": "2024-01-21T19:52:00.000Z"
}
```
---

## Remove Item from Customer Order
Removes given item from the cart of given order_id.

`DELETE /customer/orders/{order_id}/items/{order_item_id}`

### Request Headers

- `store_id: 1`
- `Authorization: Bearer {JWT_token}`

### Response

#### Success (200 OK)

```json
{
  "message": "Order item removed successfully"
}
```
---
## Get Customer Order Details
Retrieves order and its order items

`GET /customer/orders/{order_id}`


### Request Headers

- `store_id: 1`
- `Authorization: Bearer {JWT_token}`

### Response

#### Success (200 OK)

```json
{
  "order": {
    "order_id": 8,
    "customer_id": 13,
    "store_id": 1,
    "order_date": null,
    "order_total": null,
    "status": "draft",
    "createdAt": "2024-01-21T19:45:50.000Z",
    "updatedAt": "2024-01-21T19:45:50.000Z"
  },
  "order_items": [
    {
      "order_item_id": 9,
      "order_id": 8,
      "product_id": 2,
      "quantity": 3,
      "price": 50,
      "createdAt": "2024-01-21T19:52:00.000Z",
      "updatedAt": "2024-01-21T19:52:00.000Z",
      "ProductModel": {
        "product_id": 2,
        "store_id": 1,
        "product_category_id": 1,
        "name": "Sampoo burger",
        "description": null,
        "price": 50,
        "inventory_quantity": 100,
        "createdBy": 1,
        "createdAt": "2024-01-21T14:21:23.000Z",
        "updatedAt": "2024-01-21T14:21:23.000Z"
      }
    }
  ]
}
```

---
## Get Customer Orders
Retrieves all orders of the logged in customer


`GET /customer/orders`

### Request Headers

- `store_id: 1`
- `Authorization: Bearer {JWT_token}`


### Response

#### Success (200 OK)

```json
[
  {
    "order_id": 1,
    "customer_id": 13,
    "store_id": 1,
    "order_date": "2024-01-21T15:01:27.000Z",
    "order_total": 100,
    "status": "completed",
    "createdAt": "2024-01-21T14:49:59.000Z",
    "updatedAt": "2024-01-21T15:01:27.000Z"
  },
  {
    "order_id": 2,
    "customer_id": 13,
    "store_id": 1,
    "order_date": null,
    "order_total": null,
    "status": "draft",
    "createdAt": "2024-01-21T14:50:11.000Z",
    "updatedAt": "2024-01-21T14:50:11.000Z"
  }
]
```
---

## Place Customer Order
Completes the order and manages inventory

`PUT /customer/orders/{order_id}/place`


### Request Headers

- `store_id: 1`
- `Authorization: Bearer {JWT_token}`

### Response

#### Success (200 OK)

```json
{
  "message": "Order placed successfully",
  "order": {
    "order_id": 8,
    "customer_id": 13,
    "store_id": 1,
    "order_date": "2024-01-21T20:08:04.000Z",
    "order_total": 50,
    "status": "completed",
    "createdAt": "2024-01-21T19:45:50.000Z",
    "updatedAt": "2024-01-21T20:08:04.000Z"
  }
}
```