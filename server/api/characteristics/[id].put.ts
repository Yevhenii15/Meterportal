import Characteristic from "../../models/Characteristic";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
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
 *     summary: Update a characteristic by ID
 *     tags:
 *       - Characteristics
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
 */
