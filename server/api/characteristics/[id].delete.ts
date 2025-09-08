import Characteristic from "../../models/Characteristic";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const deletedCharacteristic = await Characteristic.findByIdAndDelete(id);
  return { message: "Characteristic deleted", deletedCharacteristic };
});

/**
 * @openapi
 * /api/characteristics/{id}:
 *   delete:
 *     summary: Delete a characteristic by ID
 *     tags:
 *       - Characteristics
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
 */
