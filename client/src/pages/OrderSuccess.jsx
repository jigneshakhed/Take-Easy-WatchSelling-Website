import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for shopping with us.
      </p>

      <Link
        to="/products"
        className="bg-black text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
