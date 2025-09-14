import Contact from "../../models/Contact";
import { verifyAuth } from "../../middleware/auth";

export default verifyAuth(async (event) => {
  const body = await readBody(event);

  const contact = await Contact.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });

  return contact;
});

/**
 * @openapi
 * /api/contact:
 *   put:
 *     summary: Update or create the Contact entry (admin only)
 *     tags:
 *       - Contact
 *     security:
 *       - bearerAuth: []   # requires JWT auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: The updated or created Contact entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized
 */
