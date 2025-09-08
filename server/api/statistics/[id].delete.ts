import Statistic from "../../models/Statistic";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const deletedStatistic = await Statistic.findByIdAndDelete(id);
  return { message: "Statistic deleted", deletedStatistic };
});

/**
 * @openapi
 * /api/statistics/{id}:
 *   delete:
 *     summary: Delete a statistic by ID
 *     tags:
 *       - Statistics
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
 */
