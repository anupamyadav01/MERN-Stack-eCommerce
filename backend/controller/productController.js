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
    let query = {};
    let sortArgs = {};
    if (req.query.brand) {
      query.brand = req.query.brand;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.sortBy && req.query.sortOrder) {
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder.toLowerCase() === "dec" ? -1 : 1;

      sortArgs[sortBy] = sortOrder;
    }
    const operators = {
      "=": "$eq",
      "<": "$lt",
      ">": "$gt",
      "<=": "$lte",
      ">=": "$gte",
    };

    const operatorsArray = Object.keys(operators);
    operatorsArray.forEach((operator) => {
      if (req?.query?.price?.startsWith(operator)) {
        query.price = {
          [operators[operator]]: req.query.price.slice(operator.length),
        };
      }
    });
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: "i" }; // here i stands for case insensitive means it will ignore the case of the letters
    }
    // console.log(query);

    const products = await ProductModel.find(query).sort(sortArgs);
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

export const addToWishlist = async (req, res) => {
  let updatedUser;
  try {
    const { productId } = req.params;
    const user = req.user;
    console.log("user data from database", user);
    const existingProduct = user.wishlist.find((ids) => ids === productId);
    if (!existingProduct) {
      updatedUser = await UserModel.findByIdAndUpdate(
        user._,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
    } else {
      updatedUser = await UserModel.findByIdAndDelete(
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
      message: "Product added to wishlist",
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
