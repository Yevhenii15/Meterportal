import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model, models } = mongoose;

const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // hashed password
});

// Helper method to check password
AdminSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

export default models.Admin || model("Admin", AdminSchema);
