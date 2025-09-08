import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const AboutSchema = new Schema({
  Description: { type: String, required: true },
  NameOfCDO: { type: String, required: true },
  PositionOfCDO: { type: String, required: true },
  ImgUrl: { type: String, required: true },
});

export default models.About || model("About", AboutSchema);
