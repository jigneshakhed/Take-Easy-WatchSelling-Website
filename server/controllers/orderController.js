import Order from "../models/order.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    const order = await Order.create({
      user: userId,
      items,
      total,
      status: "pending"
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
