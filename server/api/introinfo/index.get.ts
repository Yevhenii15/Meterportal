import IntroInfo from "../../models/IntroInfo";

export default defineEventHandler(async () => {
  const introinfo = await IntroInfo.findOne(); // only one record
  return introinfo;
});

/**
 * @swagger
 * /api/introinfo:
 *   get:
 *     summary: Get IntroInfo
 *     tags: [IntroInfo]
 *     responses:
 *       200:
 *         description: IntroInfo object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IntroInfo'
 */
