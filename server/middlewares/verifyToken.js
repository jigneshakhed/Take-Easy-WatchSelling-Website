// server/middlewares/verifyToken.js
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // make sure the path matches your project

// Middleware to verify JWT token
// adminOnly = true will restrict access to admins only
export const verifyToken = (adminOnly = false) => async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (adminOnly && !req.user.isAdmin)
      return res.status(403).json({ message: "Admin access only" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

