import express from "express";
import { OrderModel } from "../model/OrderModel";
import { validateCustomer } from "../middleware";
import { OrderItemModel } from "../model/OrderItemModel";
import { ProductModel } from "../model/ProductModel";

const app = express.Router();

app.use(validateCustomer);

//
app.post("/", async (req, res) => {
  const { store_id } = res.locals.store;
  const { customer_id } = res.locals.customer;
  const order = await OrderModel.create({
    customer_id,
    store_id,
    status: "DRAFT",
  });

  res.json(order);
});

app.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { store_id } = res.locals.store;
  const { customer_id } = res.locals.customer;

  const order = await OrderModel.findOne({
    where: { order_id: orderId, store_id, customer_id },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  let order_items = await OrderItemModel.findAll({
    where: {
      order_id: orderId,
    },
    include: [ProductModel],
  });

  res.json({ order, order_items });
});

app.put("/:orderId/place", async (req, res) => {
  const { orderId } = req.params;
  const { store_id } = res.locals.store;
  const { customer_id } = res.locals.customer;

  let status = "COMPLETED";

  let order_total = 0;

  let order_items = await OrderItemModel.findAll({
    where: {
      order_id: orderId,
    },
    include: [ProductModel],
  });

  for (let order_item of order_items) {
    let product_model = (order_item as any).ProductModel;
    order_total += product_model.price;
    // checking available stock
    if (product_model.inventory_quantity < order_item.quantity) {
      return res.json({
        message: "No stock available for " + product_model.name,
      });
    }
  }

  await OrderModel.update(
    { status, order_date: new Date(), order_total },
    { where: { order_id: orderId, store_id, customer_id } }
  );

  for (let order_item of order_items) {
    let product_model = (order_item as any).ProductModel;
    let new_inventory_quantity =
      product_model.inventory_quantity - order_item.quantity;
    // console.log(o);
    // order_total += (order_item as any).ProductModel.price;
    await ProductModel.update(
      {
        inventory_quantity: new_inventory_quantity,
      },
      {
        where: {
          product_id: product_model.product_id,
        },
      }
    );
  }

  const order = await OrderModel.findOne({
    where: { order_id: orderId, store_id, customer_id },
  });

  res.json({ message: "Order placed successfully", order });
});

// Endpoint to add items to an order
app.post("/:orderId/items", async (req, res) => {
  const { orderId } = req.params;
  const { product_id, quantity } = req.body;
  const { store_id } = res.locals.store;
  const { customer_id } = res.locals.customer;

  // Check if the order exists
  const order = await OrderModel.findOne({
    where: { order_id: orderId, store_id, customer_id },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (order.status != "draft")
    return res
      .status(404)
      .json({ error: "You cannot update order after placed" });

  let product = await ProductModel.findOne({
    where: {
      product_id,
      store_id,
    },
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const existingOrderItem = await OrderItemModel.findOne({
    where: {
      order_id: orderId,
      product_id,
    },
  });

  if (existingOrderItem) {
    // quantity =
    await existingOrderItem.update({
      quantity: quantity + existingOrderItem.quantity,
      price: product.price,
    });
  } else {
    // Add items to the order
    await OrderItemModel.create({
      order_id: orderId,
      product_id,
      quantity,
      price: product.price,
    });
  }

  const orderItem = await OrderItemModel.findOne({
    where: {
      order_id: orderId,
      product_id,
    },
  });

  res.json(orderItem);
});

// Endpoint to remove items from an order
app.delete("/:orderId/items/:itemId", async (req, res) => {
  const { orderId, itemId } = req.params;
  const { store_id } = res.locals.store;
  const { customer_id } = res.locals.customer;

  // Check if the order and item exist
  const order = await OrderModel.findOne({
    where: { order_id: orderId, store_id, customer_id },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  if (order.status != "draft")
    return res
      .status(404)
      .json({ error: "You cannot update order after placed" });

  const orderItem = await OrderItemModel.findOne({
    where: { order_item_id: itemId, order_id: orderId },
  });

  if (!orderItem) {
    return res.status(404).json({ error: "Order item not found" });
  }

  // Remove item from the order
  await orderItem.destroy();

  res.json({ message: "Order item removed successfully" });
});

export default app;
