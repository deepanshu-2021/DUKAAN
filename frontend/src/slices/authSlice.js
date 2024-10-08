import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("userInfo")
  ? { userInfo: JSON.parse(localStorage.getItem("userInfo")) }
  : { userInfo: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    unSetCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    
  },
});
export const { setCredentials, unSetCredentials } = authSlice.actions;
export default authSlice.reducer;
