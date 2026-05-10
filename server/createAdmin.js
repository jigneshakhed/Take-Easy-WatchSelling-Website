import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) return console.log("Admin already exists");

  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true,
  });

  console.log("Admin created!", admin);
  process.exit();
};

createAdmin();
