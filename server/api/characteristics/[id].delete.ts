import Characteristic from "../../models/Characteristic";
import { verifyAuth } from "../../utils/auth";

export default verifyAuth(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Characteristic ID is required",
    });
  }

  const deletedCharacteristic = await Characteristic.findByIdAndDelete(id);
  return { message: "Characteristic deleted", deletedCharacteristic };
});

/**
 * @openapi
 * /api/characteristics/{id}:
 *   delete:
 *     summary: Delete a characteristic by ID (admin only)
 *     tags:
 *       - Characteristics
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
 *         description: Characteristic deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedCharacteristic:
 *                   $ref: '#/components/schemas/Characteristic'
 *       401:
 *         description: Unauthorized
 */
