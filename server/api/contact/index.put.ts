/**
 * @openapi
 * /api/contact:
 *   put:
 *     summary: Update or create the Contact entry
 *     tags:
 *       - Contact
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
 */

import Contact from "../../models/Contact";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const contact = await Contact.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });

  return contact;
});
