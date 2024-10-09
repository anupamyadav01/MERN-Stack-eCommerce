import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
  },
  reducers: {
    updateProductsArray: (state, action) => {
      state.products = [state.products, ...action.payload];
      console.log("inside slice", state.products);
    },
  },
});
export const { updateProductsArray } = productSlice.actions;
export default productSlice.reducer;
