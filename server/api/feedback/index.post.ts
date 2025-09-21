import Feedback from "../../models/Feedback";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const feedback = new Feedback(body);
  await feedback.save();

  return feedback;
});
