import Feature from "../../models/Feature";
import { verifyAuth } from "../../middleware/auth";

export default verifyAuth(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Feature ID is required",
    });
  }

  const body = await readBody(event);

  const updatedFeature = await Feature.findByIdAndUpdate(id, body, {
    new: true,
    upsert: true, // creates if not exists
  });

  return updatedFeature;
});

/**
 * @openapi
 * /api/features/{id}:
 *   put:
 *     summary: Update a feature by ID (admin only)
 *     tags:
 *       - Features
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
 *             $ref: '#/components/schemas/Feature'
 *     responses:
 *       200:
 *         description: Updated feature
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feature'
 *       401:
 *         description: Unauthorized
 */
