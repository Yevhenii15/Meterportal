import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CharacteristicSchema = new Schema({
  GraphicUrl: { type: String, required: true },
  Title: { type: String, required: true },
  ShortDescription: { type: String, required: true },
  SecondTitle: { type: String },
  Description: { type: String },
  ImgUrl1: { type: String },
});

export default models.Characteristic ||
  model("Characteristic", CharacteristicSchema);
