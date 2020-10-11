const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: true }
  }
);

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  countInStock: {
    type: Number,
    default: 0,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema]
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;