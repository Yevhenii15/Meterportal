/**
 * @openapi
 * /api/about:
 *   get:
 *     summary: Get all About entries
 *     tags:
 *      - About
 *     responses:
 *       200:
 *         description: List of About documents
 */
import About from "../../models/About";

export default defineEventHandler(async () => {
  return await About.find();
});
