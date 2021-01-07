const express = require("express");
const router = express.Router();
const { getToken } = require('../utils');
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const products = await Product.find({});
  return res.send(products);
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res.status(200).send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: 'Error in Creating Product' });
});

module.exports = router;