import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", verifyToken(true), getAllOrders);
router.put("/:orderId/status", verifyToken(true), updateOrderStatus);

export default router;
