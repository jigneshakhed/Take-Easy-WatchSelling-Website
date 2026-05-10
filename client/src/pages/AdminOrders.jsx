import axios from "axios";
import { useEffect, useState } from "react";

const user = JSON.parse(localStorage.getItem("user")); // user stored after login
const token = user?.token;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // ✅ important
        });
        setOrders(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 mt-24">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="border p-4 mb-3">
          <p><b>Total:</b> ₹{order.total}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Items:</b> {order.items.length}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
