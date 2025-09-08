import Feature from "../../models/Feature";

export default defineEventHandler(async () => {
  const features = await Feature.find();
  return features;
});

/**
 * @openapi
 * /api/features:
 *   get:
 *     summary: Get all features
 *     tags:
 *       - Features
 *     responses:
 *       200:
 *         description: List of features
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feature'
 */
