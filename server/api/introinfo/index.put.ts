import IntroInfo from "../../models/IntroInfo";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const introInfo = await IntroInfo.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });

  return introInfo;
});

/**
 * @openapi
 * /api/introinfo:
 *   put:
 *     summary: Update or create the IntroInfo entry
 *     tags:
 *       - IntroInfo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IntroInfo'
 *     responses:
 *       200:
 *         description: The updated or created IntroInfo entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IntroInfo'
 */
