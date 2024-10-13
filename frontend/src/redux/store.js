import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";

// Save cart to localStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
  } catch (e) {
    console.log("Error saving to localStorage", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.log("Error loading from localStorage", e);
    return [];
  }
};

const preloadedState = {
  cart: {
    cartItems: loadFromLocalStorage(),
  },
};

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    products: productSlice,
  },
  preloadedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
