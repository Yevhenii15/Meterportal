import Statistic from "../../models/Statistic";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const statistic = new Statistic(body);
  await statistic.save();

  return statistic;
});

/**
 * @openapi
 * /api/statistics:
 *   post:
 *     summary: Create a new statistic
 *     tags:
 *       - Statistics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Statistic'
 *     responses:
 *       201:
 *         description: Statistic created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 */
