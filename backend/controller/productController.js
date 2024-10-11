import mongoose from "mongoose";
import { ProductModel } from "../model/productModel.js";
import { UserModel } from "../model/userModel.js";
export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      productImage,
      addedBy,
    } = req.body;
    const product = await ProductModel.create({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      productImage: req.secure_url,
      addedBy: req.user._id,
    });
    console.log("Product add Executed");
    return res.status(200).json({
      success: true,
      message: "Product created successfully ",
      productTitle: product,
    });
  } catch (error) {
    console.log("Error in Add Product", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductDetailsById = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.send({
        message: "not valid getproduct detaisl",
      });
    }
    const newProductId = await mongoose.Types.ObjectId(productId);
    const product = await ProductModel.findById(newProductId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Error in getProductDetailsById", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const findProductInDB = await ProductModel.findByIdAndDelete(productId);
    if (!findProductInDB) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteProduct", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const checkRole = async (req, res) => {
  try {
    const user = req.user;
    res.send({ sucess: true, role: user.role });
  } catch (error) {
    console.log("Error in checkRole", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const showProducts = async (req, res) => {
  console.log(req.query);

  try {
    let query = {};
    let sortArgs = {};
    if (req.query.sortbyprice) {
      const { min, max } = req.query.sortbyprice;
      const minPrice = parseInt(min, 10);
      const maxPrice = parseInt(max, 10);
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (req.query.sortbyrating) {
      const rating = parseInt(req.query.sortbyrating, 10);
      query.rating = { $gte: rating };
    }
    if (req.query.brands) {
      const brands = Array.isArray(req.query.brands)
        ? req.query.brands
        : [req.query.brands];
      query.brand = { $in: brands };
    }
    if (req.query.types) {
      const types = Array.isArray(req.query.types)
        ? req.query.types
        : [req.query.types];
      query.category = { $in: types };
    }
    if (req.query.discount) {
      const discountNum = parseInt(req.query.discount, 10);
      query.discountPercentage = { $gte: discountNum };
    }

    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: "i" }; // here i stands for case insensitive means it will ignore the case of the letters
    }
    console.log(query);

    const products = await ProductModel.find(query).sort(sortArgs);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.log("Something went wrong in showProducts", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
};

export const addToWishlist = async (req, res) => {
  let updatedUser;
  try {
    const { productId } = req.params;
    const user = req.user;
    console.log("user data from database", user);
    const existingProduct = user.wishlist.find((ids) => ids.equals(productId));

    if (!existingProduct) {
      updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
    } else {
      updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
    }
    return res.send({
      success: true,
      message: existingProduct
        ? "Product Removed from Wishlist"
        : "Product added to wishlist",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.log("Error Occured in Add to wishlist", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
};

export const rating = async (req, res) => {
  const productId = req.params.productId;
  const { ratingNumber, comment } = req.body;
  const userId = req.user._id;
  console.log(productId, ratingNumber, comment, userId);

  try {
    // find product by id
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // check wheater user has already rated or not

    const existingRating = product?.ratings?.find((ratingObj) => {
      return ratingObj.postedBy.toString() === userId.toString();
    });
    console.log(existingRating);

    let updatedProduct;
    if (existingRating) {
      updatedProduct = await ProductModel.findOneAndUpdate(
        {
          _id: productId,
          "ratings.postedBy": userId,
        },
        {
          $set: {
            "ratings.$.comment": comment,
            "ratings.$.star": ratingNumber,
          },
        },
        {
          new: true,
        }
      ).populate("ratings.postedBy");
    } else {
      console.log("else");

      updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: ratingNumber,
              comment: comment,
              postedBy: userId,
            },
          },
        },
        {
          new: true,
        }
      ).populate("ratings.postedBy");
    }
    res.send(updatedProduct);
  } catch (error) {
    console.log("Error occurred in rating: " + error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again. {Rating Controller}",
    });
  }
};
