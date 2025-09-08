import Contact from "../../models/Contact";

export default defineEventHandler(async () => {
  const contact = await Contact.findOne();
  return contact;
});

/**
 * @openapi
 * /api/contact:
 *   get:
 *     summary: Get the Contact entry
 *     tags:
 *       - Contact
 *     responses:
 *       200:
 *         description: The Contact entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
