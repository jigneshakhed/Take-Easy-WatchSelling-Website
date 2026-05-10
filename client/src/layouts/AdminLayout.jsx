import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", padding: "20px", background: "#eee" }}>
        <h3>Admin Panel</h3>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/add-product">Add Product</Link></li>
        </ul>
      </aside>

      <main style={{ padding: "20px", width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
