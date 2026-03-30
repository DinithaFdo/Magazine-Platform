import express from "express";
import { timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";
import { validateBody } from "../middleware/validation.middleware";
import { loginBodySchema } from "../validators/auth.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and generate JWT token
 *     tags: [Authentication]
 *     security: []
 *     description: Authenticate user with username and password and generate access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 token_type:
 *                   type: string
 *                   example: Bearer
 *                 expires_in:
 *                   type: string
 *                   example: 24h
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateBody(loginBodySchema), (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "username and password are required",
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  const expectedUsername = process.env.AUTH_USERNAME;
  const expectedPassword = process.env.AUTH_PASSWORD;

  if (!jwtSecret || !expectedUsername || !expectedPassword) {
    return res.status(500).json({
      message: "Authentication service misconfigured",
    });
  }

  const usernameMatches =
    Buffer.byteLength(username) === Buffer.byteLength(expectedUsername) &&
    timingSafeEqual(Buffer.from(username), Buffer.from(expectedUsername));

  const passwordMatches =
    Buffer.byteLength(password) === Buffer.byteLength(expectedPassword) &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expectedPassword));

  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const expiresIn = "24h";
  const accessToken = jwt.sign({ sub: username, username }, jwtSecret, {
    expiresIn,
  });

  res.json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: expiresIn,
  });
});

export default router;
