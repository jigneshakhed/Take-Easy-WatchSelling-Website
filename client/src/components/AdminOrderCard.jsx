import React, { useState } from "react";
import axios from "axios";

const AdminOrderCard = ({ order, fetchOrders }) => {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await axios.put(`http://localhost:5000/api/orders/${order._id}/status`, { status: newStatus });
      fetchOrders(); // Refresh orders list after updating
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="border p-4 mb-2 rounded shadow-sm">
      <h2 className="font-bold">Order ID: {order._id}</h2>
      <p>User: {order.user.name || order.user}</p>
      <p>Total: ₹{order.totalAmount}</p>
      <select value={status} onChange={handleStatusChange} className="mt-2 p-1 border rounded">
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  );
};

export default AdminOrderCard;
