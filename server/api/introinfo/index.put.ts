import IntroInfo from "../../models/IntroInfo";
import { verifyAuth } from "../../middleware/auth";

export default verifyAuth(async (event) => {
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
 *     summary: Update or create the IntroInfo entry (admin only)
 *     tags:
 *       - IntroInfo
 *     security:
 *       - bearerAuth: []   # requires JWT auth
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
 *       401:
 *         description: Unauthorized
 */
