import About from "../../models/About";

export default defineEventHandler(async () => {
  // Fetch the first About document
  const about = await About.findOne();
  return about;
});
