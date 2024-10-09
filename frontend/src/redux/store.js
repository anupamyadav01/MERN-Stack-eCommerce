import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    // products: productSlice,
  },
});

export default store;
