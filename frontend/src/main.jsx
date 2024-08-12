import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./style/index.css";
import CartScreen from "./screens/cartScreen.jsx";
import LoginScreen from "./screens/loginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShoppingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/placeOrderScreen.jsx";
import OrderViewScreen from "./screens/orderViewScreen.jsx";
import UserProfile from "./screens/userProfile.jsx";
import AdminRoute from "./components/adminRoute.jsx";
import OrdersScreen from "./screens/ordersScreen.jsx";
import AdminProductListScreen from "./screens/productList.jsx";
import ProductEditScreen from "./screens/productEdit.jsx";
import AdminUserListScreen from "./screens/userList.jsx";
import AdminUserProfileScreen from "./screens/adminUserProfile.jsx";
import { HelmetProvider } from "react-helmet-async";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/order" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderViewScreen />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="/admin/orders/" element={<OrdersScreen />} />
        <Route
          path="/admin/products/:pageNumber"
          element={<AdminProductListScreen />}
        />
        <Route path="/admin/edit/:id" element={<ProductEditScreen />} />
        <Route path="/admin/users/" element={<AdminUserListScreen />} />
        <Route path="/admin/user/:id" element={<AdminUserProfileScreen />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="main-content">
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
  </div>
);
