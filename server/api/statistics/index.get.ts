import Statistic from "../../models/Statistic";

export default defineEventHandler(async () => {
  const statistics = await Statistic.find();
  return statistics;
});

/**
 * @openapi
 * /api/statistics:
 *   get:
 *     summary: Get all statistics
 *     tags:
 *       - Statistics
 *     responses:
 *       200:
 *         description: List of statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
