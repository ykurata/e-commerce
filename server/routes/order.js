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