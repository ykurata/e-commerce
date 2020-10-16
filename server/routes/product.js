const express = require("express");
const router = express.Router();
const auth = require("./utils/auth");
const isAdmin = require("./utils/isAdmin");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", auth, isAdmin, async (req, res) => {
  try {
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
    return res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;