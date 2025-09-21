import Feedback from "../../models/Feedback";

export default defineEventHandler(async () => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return feedbacks;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch feedback",
    });
  }
});
