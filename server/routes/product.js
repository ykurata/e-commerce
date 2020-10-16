const express = require("express");
const router = express.Router();
const auth = require("./utils/auth");
const isAdmin = require("./utils/isAdmin");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const products = await Product.find({});
  if (products) {
    return res.status(200).json(products);
  }
  return res.status(404).json({ error: "Product not found" });
});

router.post("/", auth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res.status(200).json(newProduct);
  }
  return res.status(500).json({ error: "Error in creating a product" });
});

module.exports = router;