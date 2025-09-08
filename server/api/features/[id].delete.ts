import Feature from "../../models/Feature";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const deletedFeature = await Feature.findByIdAndDelete(id);
  return { message: "Feature deleted", deletedFeature };
});

/**
 * @openapi
 * /api/features/{id}:
 *   delete:
 *     summary: Delete a feature by ID
 *     tags:
 *       - Features
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
 */
