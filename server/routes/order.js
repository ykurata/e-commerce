const express = require("express");
const router = express.Router();
const auth = require("./utils/auth");
const isAdmin = require("./utils/isAdmin");
const Order = require("../models/Order");

// Route to get all orders. Only Admin user can access.
router.get("/all", auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
});

// Get my orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user });
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
});

// Get a specific order by order id 
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
  }
});

// Post a new order 
router.post("/", auth, async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const order = await newOrder.save();
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
  }
});