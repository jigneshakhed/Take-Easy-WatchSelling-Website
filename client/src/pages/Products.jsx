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
    <div>
      <h2>All Products</h2>
      <div className="products">
        {products.map(p => (
          <div key={p._id}>
            <img src={p.image} alt={p.name} width={200} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
