import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const StatisticSchema = new Schema({
  ImgUrl: { type: String, required: true },
  Ammount: { type: Number, required: true },
  Description: { type: String, required: true },
});

export default models.Statistic || model("Statistic", StatisticSchema);
