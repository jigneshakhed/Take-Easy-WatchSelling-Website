import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import AdminOrders from "./pages/AdminOrders";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import AdminManageProducts from "./pages/AdminManageProducts";
import EditProduct from "./pages/EditProduct";
import { setUser } from "./app/slices/authSlice";
import Checkout from "./pages/Checkout";
import getUserFromServer from "./helpers/getUserFromServer";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  const getUser = async () => {
    const data = await getUserFromServer();
    if (data?.success) {
      dispatch(setUser(data.user));
     
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Toaster />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="pt-20">
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login getUser={getUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success getUser={getUser} />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/admin/manage-products" element={<AdminManageProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          {/* ADMIN ROUTES (PROTECTED) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
  path="/admin/products"
  element={<AdminManageProducts />}
/>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isAdminPage && <Footer />}
    </div>
  );
};

export default App;
