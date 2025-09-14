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

  const deletedFeature = await Feature.findByIdAndDelete(id);
  return { message: "Feature deleted", deletedFeature };
});

/**
 * @openapi
 * /api/features/{id}:
 *   delete:
 *     summary: Delete a feature by ID (admin only)
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
 *     responses:
 *       200:
 *         description: Feature deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedFeature:
 *                   $ref: '#/components/schemas/Feature'
 *       401:
 *         description: Unauthorized
 */
