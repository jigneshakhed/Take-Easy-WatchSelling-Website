import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../app/slices/authSlice";
import toast from "react-hot-toast";
import { CiLight, CiDark, CiMenuBurger } from "react-icons/ci";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart); // ✅ cart state
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = localStorage.getItem("role"); // ✅ moved inside

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      dispatch(setUser(null));
      navigate("/login");
      toast.success("Logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`shadow fixed w-full z-50 top-0 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <nav className="container mx-auto lg:p-5 px-1 py-2 flex justify-between items-center">
        <Link className="text-xl font-bold" to="/">
          Take Easy
        </Link>

        <button
          className="md:hidden visible absolute right-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CiMenuBurger size={25} />
        </button>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-5 items-start md:items-center w-full md:w-auto p-3 md:p-0 ${
            isDarkMode ? "bg-black" : "bg-white"
          } md:relative absolute md:top-0 top-10`}
        >
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {role === "admin" && <Link to="/admin">Admin</Link>}
          {role === "admin" && (
  <Link to="/admin/orders">Orders</Link>
)}

          {user ? (
            <>
              {/* ✅ CART LINK WITH COUNT */}
              <Link to="/cart">
                🛒 Cart
                {totalItems > 0 && (
                  <span className="ml-1 text-sm font-bold">
                    ({totalItems})
                  </span>
                )}
              </Link>

              <button
                className="px-4 py-1 bg-red-500 text-white rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
            
          )}
        </div>

        <button
          className="px-2 py-1 text-xl"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <CiLight size={25} /> : <CiDark size={25} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
