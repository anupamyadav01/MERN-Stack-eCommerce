import { UserModel } from "../model/userModel.js";

export const addProductToCart = async (req, res) => {
  try {
    const user = req.user;

    const { productId, quantity } = req.body; // Ensure quantity is included

    // Check if the product already exists in the user's cart
    const existingProduct = user.cartItem.find(
      (item) => item.productId.toString() === productId.toString()
    );
    console.log(existingProduct);

    let updatedCart;
    if (existingProduct) {
      // If the product already exists, update the quantity
      updatedCart = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $set: {
            "cartItem.$[elem].quantity": existingProduct.quantity + quantity, // Increase quantity
          },
        },
        {
          new: true,
          arrayFilters: [{ "elem.productId": productId }], // Update the correct item in the array
        }
      );
    } else {
      // If the product is not in the cart, add it
      updatedCart = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $push: {
            cartItem: {
              productId: productId,
              quantity: quantity, // Set the initial quantity
            },
          },
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json({
      success: true,
      user: updatedCart, // Return the updated user model
    });
  } catch (error) {
    console.log("Error from AddToCart", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
