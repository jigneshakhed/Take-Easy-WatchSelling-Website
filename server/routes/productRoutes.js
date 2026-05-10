import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Only admin can add product
router.post("/", verifyToken(true), addProduct); // adminOnly = true
router.get("/", getProducts);

export default router;
