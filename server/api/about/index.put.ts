/**
 * @openapi
 * /api/about:
 *   put:
 *     summary: Update or create the About entry
 *     tags:
 *       - About
 *     description: Updates the single About document, or creates it if it doesn't exist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slogan
 *               - link
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Måleportal"
 *               slogan:
 *                 type: string
 *                 example: "We measure everything precisely"
 *               link:
 *                 type: string
 *                 example: "https://maleportal.com"
 *     responses:
 *       200:
 *         description: The updated or created About entry
 */

import About from "../../models/About";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const about = await About.findOneAndUpdate(
    {}, // match any document (there should be only one)
    body, // new data
    { new: true, upsert: true } // create if not exists, return updated doc
  );

  return about;
});
