import Feature from "../../models/Feature";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
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
 *     summary: Update a feature by ID
 *     tags:
 *       - Features
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
 */
