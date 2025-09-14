import Admin from "../../models/Admin";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username and password required",
    });
  }

  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const isValid = await admin.validatePassword(password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  // Generate JWT token (valid for 1 hour)
  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET || "supersecret", // use real secret in production!
    { expiresIn: "1h" }
  );

  return { token };
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Admin login (backend only)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: myStrongPassword123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Invalid credentials
 */
