import Statistic from "../../models/Statistic";
import { verifyAuth } from "../../utils/auth";

export default verifyAuth(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Statistic ID is required",
    });
  }

  const deletedStatistic = await Statistic.findByIdAndDelete(id);
  return { message: "Statistic deleted", deletedStatistic };
});

/**
 * @openapi
 * /api/statistics/{id}:
 *   delete:
 *     summary: Delete a statistic by ID (admin only)
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
 *     responses:
 *       200:
 *         description: Statistic deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedStatistic:
 *                   $ref: '#/components/schemas/Statistic'
 *       401:
 *         description: Unauthorized
 */
