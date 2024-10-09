import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    products: productSlice,
  },
});

export default store;
