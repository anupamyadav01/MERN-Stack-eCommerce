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

    // Check if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Find the product by its ID
    const product = await ProductModel.findById(productId);

    // If no product is found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return the product details if found
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
    // sort by price
    if (req.query.sortbyprice) {
      const { min, max } = req.query.sortbyprice;
      const minPrice = parseInt(min, 10);
      const maxPrice = parseInt(max, 10);
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    // sort by rating
    if (req.query.sortbyrating) {
      const rating = parseInt(req.query.sortbyrating, 10);
      query.rating = { $gte: rating };
    }

    // sort by brands
    if (req.query.brands) {
      const brands = Array.isArray(req.query.brands)
        ? req.query.brands
        : [req.query.brands];
      query.brand = { $in: brands };
    }

    // sort by types
    if (req.query.types) {
      const types = Array.isArray(req.query.types)
        ? req.query.types
        : [req.query.types];
      query.category = { $in: types };
    }

    // sort by discount
    if (req.query.discount) {
      const discountNum = parseInt(req.query.discount, 10);
      query.discountPercentage = { $gte: discountNum };
    }

    // search by title
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: "i" };
    }

    const products = await ProductModel.find(query).sort(sortArgs);
    return res.status(200).json({ products });
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

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req?.user?._id;

  try {
    const updatedProductId = new mongoose.Types.ObjectId(productId);

    // Step 1: Check if productId is valid or not
    const isProductIdValid = await ProductModel.findById(updatedProductId);
    if (!isProductIdValid) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Step 2: Check if user already has the product in cart

    const user = await UserModel.findOne({ _id: userId });
    const productInCart = user?.cartItem?.some(
      (item) => item.productId.toString() === productId
    );

    if (productInCart) {
      return res
        .status(200)
        .json({ message: "Product already exists in cart" });
    }

    // Step 3: Product does not exist in cart, add it
    user.cartItem.push({ productId: updatedProductId, quantity: 1 });
    await user.save();

    // Respond with success
    res.status(200).json({
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.error("ERROR FROM ADDTOCART", error);
    res.status(500).json({ error: "An error occurred while adding to cart" });
  }
};
