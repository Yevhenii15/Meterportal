import Characteristic from "../../models/Characteristic";
import { verifyAuth } from "../../utils/auth";

export default verifyAuth(async (event) => {
  const body = await readBody(event);

  const characteristic = new Characteristic(body);
  await characteristic.save();

  return characteristic;
});

/**
 * @openapi
 * /api/characteristics:
 *   post:
 *     summary: Create a new characteristic (admin only)
 *     tags:
 *       - Characteristics
 *     security:
 *       - bearerAuth: []   # JWT authentication required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Characteristic'
 *     responses:
 *       201:
 *         description: Characteristic created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characteristic'
 *       401:
 *         description: Unauthorized
 */
