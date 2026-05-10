import mongoose from "mongoose";

// Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // for now, use image URL
}, { timestamps: true });

// Fix OverwriteModelError
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
