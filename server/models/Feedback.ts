import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const FeedbackSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["Consumer", "Utility"], required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  message: { type: String, required: true },

  adminResponse: {
    message: { type: String },
    respondedAt: { type: Date },
  },

  createdAt: { type: Date, default: Date.now },
});

export default models.Feedback || model("Feedback", FeedbackSchema);
