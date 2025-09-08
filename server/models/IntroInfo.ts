import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const IntroInfoSchema = new Schema({
  Title: { type: String, required: true },
  Slogan: { type: String },
  MainImgUrl: { type: String },
  LogoUrl: { type: String },
  UtilityLink: { type: String },
  ConsumerLink: { type: String },
  DownloadAppStore: { type: String },
  DownloadGooglePlay: { type: String },
  Description: { type: String },
});

export default models.IntroInfo || model("IntroInfo", IntroInfoSchema);
