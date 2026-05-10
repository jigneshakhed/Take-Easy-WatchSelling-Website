import { useDispatch } from "react-redux";
import { addToCart } from "../app/slices/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("ADD TO CART CLICKED", product);
    dispatch(addToCart(product));
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="border p-4 rounded">
      <img
        src={`${import.meta.env.VITE_SERVER_URL}${product.image}`}
        className="h-40 w-full object-cover"
      />

      <h3 className="font-bold">{product.title}</h3>
      <p>₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-2 bg-black text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
