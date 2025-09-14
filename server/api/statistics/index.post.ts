import Statistic from "../../models/Statistic";
import { verifyAuth } from "../../utils/auth";

export default verifyAuth(async (event) => {
  const body = await readBody(event);

  const statistic = new Statistic(body);
  await statistic.save();

  return statistic;
});

/**
 * @openapi
 * /api/statistics:
 *   post:
 *     summary: Create a new statistic (admin only)
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []   # requires JWT auth
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
 *       401:
 *         description: Unauthorized
 */
