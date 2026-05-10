import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map(product => (
        <div key={product._id} className="border p-2 rounded">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
          <h3 className="font-bold">{product.name}</h3>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
