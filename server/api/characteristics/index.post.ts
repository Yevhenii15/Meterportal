import Characteristic from "../../models/Characteristic";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const characteristic = new Characteristic(body);
  await characteristic.save();

  return characteristic;
});

/**
 * @openapi
 * /api/characteristics:
 *   post:
 *     summary: Create a new characteristic
 *     tags:
 *       - Characteristics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Characteristic'
 *     responses:
 *       201:
 *         description: Characteristic created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characteristic'
 */
