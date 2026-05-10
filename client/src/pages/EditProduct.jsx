import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.product));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    toast.success("Product Updated ✅");
    navigate("/admin/manage-products");
  };

  return (
    <div className="pt-24 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <input name="title" value={product.title} onChange={handleChange} className="w-full border p-2 mb-3" />
        <input name="price" value={product.price} onChange={handleChange} className="w-full border p-2 mb-3" />
        <input name="image" value={product.image} onChange={handleChange} className="w-full border p-2 mb-3" />
        <textarea name="description" value={product.description} onChange={handleChange} className="w-full border p-2 mb-3" />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
