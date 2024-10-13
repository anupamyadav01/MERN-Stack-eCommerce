import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: null,
  },
  reducers: {
    updateCartItems: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    increaseQuantity: () => {},
    decreaseQuantity: () => {},
    removeFromCart: () => {},
    resetCart: () => {},
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
