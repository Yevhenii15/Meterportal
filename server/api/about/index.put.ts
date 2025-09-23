import { readBody } from "h3";
import About from "../../models/About";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Find the existing About doc
    let about = await About.findOne();

    if (!about) {
      // If none exists, create new one
      about = new About(body);
    } else {
      // Update fields
      about.Description = body.Description ?? about.Description;
      about.NameOfCDO = body.NameOfCDO ?? about.NameOfCDO;
      about.PositionOfCDO = body.PositionOfCDO ?? about.PositionOfCDO;
      about.ImgUrl = body.ImgUrl ?? about.ImgUrl;
    }

    await about.save();
    return about;
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Failed to update About info",
    });
  }
});
