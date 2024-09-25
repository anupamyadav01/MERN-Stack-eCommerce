import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    // required: true,
    default: "",
  },
  price: {
    type: Number,
    // required: true,
    default: 0,
  },
  discountPercentage: {
    type: Number,
    // required: true,
    default: 0,
  },
  rating: {
    type: Number,
    // required: true,
    default: 0,
  },
  stock: {
    type: Number,
    // required: true,
    default: 0,
  },
  brand: {
    type: String,
    // required: true,
    default: "",
  },
  category: {
    type: String,
    // required: true,
    default: "",
  },
  thumbnail: {
    type: String,
    // required: true,
    default: "",
  },
  images: {
    type: [String],
    default: [],
  },
});

export const ProductModel = mongoose.model("products", productSchema);
