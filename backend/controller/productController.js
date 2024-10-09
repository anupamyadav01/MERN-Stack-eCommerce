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
    console.log(error);
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

// export const rating = async (req, res) => {
//   const productId = req.params.productId;
//   const { ratingNumber, comment } = req.body;
//   const userId = req.user._id;

//   try {
//     // find product by id
//     const product = await ProductModel.find({ _id: productId });

//     // check wheater user has already rated or not

//     const existingRating = product.rating.find((ratingObj) => {
//       return ratingObj.postedBy.toString() === userId.toString();
//     });

//     let updatedProduct;
//     if (existingRating) {
//       updatedProduct = await ProductModel.findOneAndUpdate(
//         {
//           _id: productId,
//           "rating.postedBy": userId,
//         },
//         {
//           $set: {
//             "rating.$.commnet": comment,
//             "rating.$.star": ratingNumber,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//     } else {
//       updatedProduct = await ProductModel.findByIdAndUpdate(
//         productId,
//         {
//           $push: {
//             star: ratingNumber,
//             comment: comment,
//             postedBy: userId,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//     }
//     res.send(updatedProduct);
//   } catch (error) {
//     console.log("Error occurred in rating: " + error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong, please try again. {Rating Controller}",
//     });
//   }
// };
export async function rating(req, res) {
  const productID = req.params.productId;
  let { starRating, comment } = req.body;
  const userID = req.user._id;

  // productID = new mongoose.Types.ObjectId(productID);

  try {
    //FIND THE PRODUCT BY ID
    const product = await ProductModel.findById(productID);

    //CHECK IF THE USER HAS ALREADY RATED THE PRODUCT
    const alreadyRated = product.ratings.find(
      (ratingObj) => ratingObj.postedBy.toString() === userID.toString()
    );

    let updatedProduct;

    if (alreadyRated) {
      //IF ALREADY RATED:
      // UPDATE THE RATING

      updatedProduct = await ProductModel.findOneAndUpdate(
        {
          _id: productID,
          "ratings.postedBy": userID,
        },
        {
          $set: {
            "ratings.$.comment": comment,
            "ratings.$.star": starRating,
          },
        },
        { new: true }
      );
    } else {
      //IF IT'S A NEW RATING:
      // ADD A NEW RATING

      updatedProduct = await ProductModel.findByIdAndUpdate(
        productID,
        {
          $push: {
            ratings: {
              star: starRating,
              comment: comment,
              postedBy: userID,
            },
          },
        },
        { new: true }
      );
    }
    res.status(200).send({
      success: true,
      message: "Rating saved successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
