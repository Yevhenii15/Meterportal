import Characteristic from "../../models/Characteristic";
import { verifyAuth } from "../../middleware/auth";

export default verifyAuth(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Characteristic ID is required",
    });
  }

  const body = await readBody(event);

  const updatedCharacteristic = await Characteristic.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
      upsert: true, // creates if not exists
    }
  );

  return updatedCharacteristic;
});

/**
 * @openapi
 * /api/characteristics/{id}:
 *   put:
 *     summary: Update a characteristic by ID (admin only)
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Characteristic'
 *     responses:
 *       200:
 *         description: Updated characteristic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characteristic'
 *       401:
 *         description: Unauthorized
 */
