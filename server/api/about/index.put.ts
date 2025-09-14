import About from "../../models/About";
import { verifyAuth } from "../../utils/auth";

export default verifyAuth(async (event) => {
  const body = await readBody(event);

  const about = await About.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });

  return about;
});

/**
 * @openapi
 * /api/about:
 *   put:
 *     summary: Update or create the About entry (admin only)
 *     tags:
 *       - About
 *     security:
 *       - bearerAuth: []   # indicates JWT auth required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/About'
 *     responses:
 *       200:
 *         description: The updated or created About entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/About'
 *       401:
 *         description: Unauthorized
 */
