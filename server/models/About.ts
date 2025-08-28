import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const AboutSchema = new Schema({
  title: { type: String, required: true },
  slogan: { type: String, required: true },
  link: { type: String, required: true },
});

export default models.About || model("About", AboutSchema);
