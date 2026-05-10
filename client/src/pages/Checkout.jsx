import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../app/slices/cartSlice";
import { useState } from "react";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.18;
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + delivery;

  const handlePlaceOrder = async() => {
    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill all address fields");
      return;
    }
        await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: cart,
      address,
      total,
    }),
  });
    dispatch(clearCart());
    alert("Order placed successfully 🎉");
    navigate("/order-success");
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-4 grid md:grid-cols-2 gap-6">
      {/* ADDRESS */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <input className="input" name="name" placeholder="Full Name" onChange={handleChange} />
        <input className="input" name="phone" placeholder="Phone Number" onChange={handleChange} />
        <input className="input" name="address" placeholder="Address" onChange={handleChange} />
        <input className="input" name="city" placeholder="City" onChange={handleChange} />
        <input className="input" name="pincode" placeholder="Pincode" onChange={handleChange} />
      </div>

      {/* SUMMARY */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>{item.title} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "Free" : `₹${delivery}`}</span></div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-4 bg-black text-white py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
