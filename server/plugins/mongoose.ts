import mongoose from "mongoose";

export default async () => {
  const config = useRuntimeConfig();

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(config.mongoUri, {
      dbName: "Måleportal",
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
