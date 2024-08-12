import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isExist = state.cartItems.find((x) => item._id === x._id);
      if (isExist) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    deleteFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== item._id);
      return updateCart(state);
    },
    addShipingAddress: (state, action) => {
      const address = action.payload;
      state.shippingAddress = address;
      return updateCart(state);
    },
    addPayment: (state, action) => {
      const paymentMethod = action.payload;
      state.paymentMethod = paymentMethod;
      return updateCart(state);
    },
    addeOrder: (state, action) => {
      const Order = action.payload;
      state.Order = Order;
      return updateCart(state);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});
export const {
  addToCart,
  deleteFromCart,
  addShipingAddress,
  clearCart,
  addPayment,
  addeOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
