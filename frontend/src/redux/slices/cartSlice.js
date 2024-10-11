import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: [],
  },
  reducers: {
    updateCartItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
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
