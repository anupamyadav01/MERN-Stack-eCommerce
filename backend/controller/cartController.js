import { UserModel } from "../model/userModel.js";

export const addProductToCart = async (req, res) => {
  try {
    const user = req.user; // Get the logged-in user
    const { productId, quantity = 1 } = req.body; // Get product ID and quantity from request body

    // Check if the product already exists in the user's cart
    const existingProduct = user.cartItem.find(
      (item) => item.productId.toString() === productId.toString()
    );

    let updatedCart;
    if (existingProduct) {
      // Product already exists in the cart, just update the quantity
      updatedCart = await UserModel.findOneAndUpdate(
        {
          _id: user._id, // Find the user by ID
          "cartItem.productId": productId, // Check for the product inside the cart array
        },
        {
          $set: {
            "cartItem.$.quantity": existingProduct.quantity + quantity, // Increment quantity
          },
        },
        {
          new: true, // Return the updated user document
        }
      ).populate("cartItem.productId");
    } else {
      // If the product doesn't exist, add it to the cart
      updatedCart = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $push: {
            cartItem: {
              productId: productId, // Add the product ID
              quantity: quantity, // Set the initial quantity
            },
          },
        },
        {
          new: true, // Return the updated user document
        }
      ).populate("cartItem.productId");
    }

    // Return the updated cart information
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      user: updatedCart, // Return the updated user model
    });
  } catch (error) {
    console.log("Error from AddToCart", error);

    // Handle any errors and return a 500 status code
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
