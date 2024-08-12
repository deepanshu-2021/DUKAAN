const fixDecimal = (number) => {
  return Math.round(number * 100) / 100;
};
export const updateCart = (state) => {
  //item price
  state.itemPrice = fixDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // delivery price
  state.deliveryPrice = state.itemPrice >= 500 ? 0 : 40;
  //total tax 10%
  state.totalTax = fixDecimal(Number(0.15 * state.itemPrice));
  //total price
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.deliveryPrice) +
    Number(state.totalTax)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
