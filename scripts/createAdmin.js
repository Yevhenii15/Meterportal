import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../server/models/Admin.ts"; // adjust path if needed
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    const username = "admin"; // choose your username
    const password = "myStrongPassword123"; // choose your password

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, passwordHash });

    await admin.save();
    console.log("Admin user created successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

createAdmin();
