import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const FeatureSchema = new Schema({
  Title: { type: String, required: true },
  ShortDescription: { type: String, required: true },
  MainImgUrl: { type: String, required: true },
  SecondTitle: { type: String },
  Description: { type: String },
  ImgUrl1: { type: String },
  ImgUrl2: { type: String },
});

export default models.Feature || model("Feature", FeatureSchema);
