import { ProductModel } from "../model/productModel.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";
export const addProduct = async (req, res) => {
  try {
    // getting token form frontend

    const product = await ProductModel.create(req.body);
    return res.status(200).json({
      success: true,
      message: "Product created successfully ",
      productTitle: product.title,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const checkRole = async (req, res) => {
  try {
    const user = req.user;
    res.send({ sucess: true, role: user.role });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const showProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
};
