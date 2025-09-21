import Feedback from "../../models/Feedback";
import { verifyAuth } from "../../utils/auth";

export default verifyAuth(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Feedback ID is required",
    });
  }

  const deletedFeedback = await Feedback.findByIdAndDelete(id);

  if (!deletedFeedback) {
    throw createError({ statusCode: 404, statusMessage: "Feedback not found" });
  }

  return { message: "Feedback deleted", deletedFeedback };
});
