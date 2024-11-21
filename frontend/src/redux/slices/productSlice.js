import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
  },
  reducers: {
    updateProductsArray: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { updateProductsArray } = productSlice.actions;
export default productSlice.reducer;
