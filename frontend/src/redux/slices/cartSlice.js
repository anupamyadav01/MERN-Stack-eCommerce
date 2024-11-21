import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: [],
  },
  reducers: {
    updateCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity by 1
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Decrease quantity by 1
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      ); // Remove item from cart
    },
    resetCart: (state) => {
      state.cartItems = []; // Reset cart to an empty array
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  resetCart,
  updateCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
