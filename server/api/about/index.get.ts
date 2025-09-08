import About from "../../models/About";

export default defineEventHandler(async () => {
  const about = await About.findOne(); // expect only one document
  return about;
});

/**
 * @openapi
 * /api/about:
 *   get:
 *     summary: Get About info
 *     tags:
 *       - About
 *     responses:
 *       200:
 *         description: About entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/About'
 */
