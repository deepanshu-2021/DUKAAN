import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apislices";
import cartReducer from "../slices/cartSlice";
import authReducer from "../slices/authSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
export default store;
