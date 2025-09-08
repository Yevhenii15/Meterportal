import Characteristic from "../../models/Characteristic";

export default defineEventHandler(async () => {
  const characteristics = await Characteristic.find();
  return characteristics;
});

/**
 * @openapi
 * /api/characteristics:
 *   get:
 *     summary: Get all characteristics
 *     tags:
 *       - Characteristics
 *     responses:
 *       200:
 *         description: List of characteristics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Characteristic'
 */
