import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

// Optional: get current logged-in user
router.get("/user", (req, res) => {
  res.status(200).json({ message: "No user route yet" });
});

export default router;
