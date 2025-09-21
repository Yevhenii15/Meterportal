import Feedback from "../../models/Feedback";
import { verifyAuth } from "../../utils/auth";

export default verifyAuth(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Feedback ID is required",
    });
  }

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    id,
    {
      adminResponse: {
        message: body.message,
        respondedAt: new Date(),
      },
    },
    { new: true }
  );

  return updatedFeedback;
});
