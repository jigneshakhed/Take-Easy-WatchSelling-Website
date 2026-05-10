import { useEffect, useState } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // ✅ FIXED
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { // ✅ FIXED
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div>
      <h2>Manage Products</h2>

      {products.map((p) => (
        <div key={p._id}>
          {p.title} - ₹{p.price}
          <button onClick={() => deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
