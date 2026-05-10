import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <Link to="/admin/add-product">
          <button>Add Product</button>
        </Link>

        <Link to="/admin/products" style={{ marginLeft: "10px" }}>
          <button>Manage Products</button>
        </Link>

        <Link to="/admin/orders" style={{ marginLeft: "10px" }}>
          <button>Manage Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
