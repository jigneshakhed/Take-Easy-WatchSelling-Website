import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../app/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
     const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <h2 className="mt-24 text-center">Cart is empty 🛒</h2>;
  }

  return (
    <div className="p-4 mt-24 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Cart</h2>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 items-center border-b py-4"
        >
          <img
            src={`${import.meta.env.VITE_SERVER_URL}${item.image}`}
            alt={item.title}
            className="h-20 w-20 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p>₹{item.price}</p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => dispatch(decreaseQty(item._id))}
                className="px-2 bg-gray-300 rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQty(item._id))}
                className="px-2 bg-gray-300 rounded"
              >
                +
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Subtotal: ₹{item.price * item.quantity}
            </p>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item._id))}
            className="text-red-600 text-xl"
          >
            ❌
          </button>
        </div>
      ))}

      {/* TOTAL SECTION */}
      <div className="mt-6 p-4 border-t text-right">
        <h3 className="text-lg font-semibold">
          Total: ₹{totalPrice}
        </h3>

        <button 
        onClick={() => navigate("/checkout")}
        className="mt-3 bg-black text-white px-6 py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
