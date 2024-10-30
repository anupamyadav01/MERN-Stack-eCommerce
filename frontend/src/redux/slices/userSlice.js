import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isUserLoggedIn: false,
    isAdmin: false,
    userInfo: null,
  },
  reducers: {
    updateLoginState: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    updateAdminState: (state, action) => {
      state.isAdmin = action.payload;
    },
    updateUser: (state, action) => {
      state.userInfo = action.payload;
      console.log(state?.userInfo);
    },
  },
});
export const { updateLoginState, updateAdminState, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
