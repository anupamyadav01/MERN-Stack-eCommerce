import mongoose from "mongoose";
import { UserModel } from "../model/userModel.js";
import { ProductModel } from "../model/productModel.js";

export const getAllCartItems = async (req, res) => {
  const userId = req?.user?._id;
  try {
    const user = await UserModel.findById(userId).populate(
      "cartItem.productId"
    );
    return res.send(user?.cartItem);
  } catch (error) {
    console.log("ERROR FROM GETALLCARTITEMS", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting cart items" });
  }
};
export const removeItem = async (req, res) => {
  const productId = req.body.itemId;
  try {
    const userId = req?.user?._id;
    const updatedProductId = new mongoose.Types.ObjectId(productId);
    const validateProduct = await ProductModel.find({ _id: updatedProductId });

    if (!validateProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedData = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          cartItem: { productId: updatedProductId },
        },
      },
      { new: true }
    ).populate("cartItem.productId");

    res.status(200).json({
      updatedData,
    });
  } catch (error) {
    console.log("ERROR FROM remove item", error);

    return res.status(500).json({
      message: "Something went wrong, please try again.",
    });
  }
};

export const resetCart = async (req, res) => {
  const userId = req?.user?._id;
  try {
    const updatedData = await UserModel.findByIdAndUpdate(
      userId,
      {
        cartItem: [],
      },
      { new: true }
    ).populate("cartItem.productId");

    res.status(200).json({
      updatedData,
    });
  } catch (error) {
    console.log("ERROR FROM resetCart", error);
  }
};
