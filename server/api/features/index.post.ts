import Feature from "../../models/Feature";
import { verifyAuth } from "../../middleware/auth";

export default verifyAuth(async (event) => {
  const body = await readBody(event);

  const feature = new Feature(body);
  await feature.save();

  return feature;
});

/**
 * @openapi
 * /api/features:
 *   post:
 *     summary: Create a new feature (admin only)
 *     tags:
 *       - Features
 *     security:
 *       - bearerAuth: []   # requires JWT auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feature'
 *     responses:
 *       201:
 *         description: Feature created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feature'
 *       401:
 *         description: Unauthorized
 */
