import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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
    productImage: {
      type: String,
      default: "",
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Types.ObjectId, ref: "user" },
      },
    ],
    averageRating: {
      type: Number,
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = new mongoose.model("product", productSchema);
