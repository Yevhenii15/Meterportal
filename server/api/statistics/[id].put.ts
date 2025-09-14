import Statistic from "../../models/Statistic";
import { verifyAuth } from "../../middleware/auth";

export default verifyAuth(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Statistic ID is required",
    });
  }

  const body = await readBody(event);

  const updatedStatistic = await Statistic.findByIdAndUpdate(id, body, {
    new: true,
    upsert: true, // creates if not exists
  });

  return updatedStatistic;
});

/**
 * @openapi
 * /api/statistics/{id}:
 *   put:
 *     summary: Update a statistic by ID (admin only)
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []   # requires JWT auth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Statistic'
 *     responses:
 *       200:
 *         description: Updated statistic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 *       401:
 *         description: Unauthorized
 */
