import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const ContactSchema = new Schema({
  Phone: { type: String, required: true },
  Email: { type: String, required: true },
  Address: { type: String, required: true },
  WorkingTime: { type: String, required: true },
  VatNumber: { type: String, required: true },
});

export default models.Contact || model("Contact", ContactSchema);
