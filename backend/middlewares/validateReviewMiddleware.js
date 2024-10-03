import mongoose from "mongoose";
import { UserModel } from "../model/userModel.js";
import { ProductModel } from "../model/productModel.js";
export const validateReview = async (req, res, next) => {
  // validation for userId
  const { userId, comment, rating } = req.body;
  const { productId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid user id" });
    } else {
      // validation for user exist or not
      const isUserExist = await UserModel.exists({ _id: userId });
      if (!isUserExist) {
        return res
          .status(400)
          .send({ success: false, message: "User not found" });
      }

      // validation for rating
      if (isNaN(rating)) {
        return res
          .status(400)
          .send({ success: false, message: "Rating must be a number" });
      }
      if (rating < 1 || rating > 5) {
        return res
          .status(400)
          .send({ success: false, message: "Rating must be between 1 and 5" });
      }

      // validation for comment
      if (typeof comment !== "string") {
        return res.send({
          success: false,
          message: "Comment must be a string",
        });
      }

      // validation for productId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid product id" });
      } else {
        const isProductExist = await ProductModel.exists({ _id: productId });
        // validation for product exist or not
        if (!isProductExist) {
          return res
            .status(400)
            .send({ success: false, message: "Product not found" });
        }
      }
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong In Validate Review Middleware",
    });
  }
};
