import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Admin not logged in!");

      const res = await axios.post(
        "http://localhost:5000/api/products",
        { name, price, description, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product added successfully!");
      setName(""); setPrice(""); setDescription(""); setImage("");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
