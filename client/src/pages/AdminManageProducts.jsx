import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data.products);
  };

  

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    setProducts(products.filter(p => p._id !== id));

    toast.success("Product deleted");
  } catch (error) {
    toast.error("Product not deleted");
    console.error(error);
  }
};

  return (
    <div className="pt-24 px-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {products.map((p) => (
        <div
          key={p._id}
          className="border p-3 mb-3 flex justify-between items-center"
        >
          <span>{p.title}</span>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admin/edit-product/${p._id}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminManageProducts;
