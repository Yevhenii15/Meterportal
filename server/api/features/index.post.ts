import Feature from "../../models/Feature";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const feature = new Feature(body);
  await feature.save();

  return feature;
});

/**
 * @openapi
 * /api/features:
 *   post:
 *     summary: Create a new feature
 *     tags:
 *       - Features
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
 */
