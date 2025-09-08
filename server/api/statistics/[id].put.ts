import Statistic from "../../models/Statistic";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  const updatedStatistic = await Statistic.findByIdAndUpdate(id, body, {
    new: true,
    upsert: true, // creates if not exists
  });

  return updatedStatistic;
});

/**
 * @openapi
 * /api/statistics/{id}:
 *   put:
 *     summary: Update a statistic by ID
 *     tags:
 *       - Statistics
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
 *             $ref: '#/components/schemas/Statistic'
 *     responses:
 *       200:
 *         description: Updated statistic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 */
