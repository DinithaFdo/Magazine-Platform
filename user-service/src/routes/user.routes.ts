import express from "express";
import * as controller from "../controllers/user.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validation.middleware";
import {
  createUserBodySchema,
  followUserBodySchema,
  listUsersQuerySchema,
  updateUserBodySchema,
  userIdParamsSchema,
} from "../validators/user.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Create a user profile with default role as "reader"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               bio:
 *                 type: string
 *                 example: Tech enthusiast
 *               country:
 *                 type: string
 *                 example: Sri Lanka
 *               preferred_categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Technology", "Business"]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already exists
 */
router.post("/", validateBody(createUserBodySchema), controller.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve paginated list of users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       500:
 *         description: Failed to fetch users
 */
router.get("/", validateQuery(listUsersQuerySchema), controller.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.get("/:id", validateParams(userIdParamsSchema), controller.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     description: Update only provided fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid update data
 */
router.put(
  "/:id",
  validateParams(userIdParamsSchema),
  validateBody(updateUserBodySchema),
  controller.updateUser,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  validateParams(userIdParamsSchema),
  controller.deleteUser,
);

/**
 * @swagger
 * /users/{id}/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Users]
 *     description: User can follow another user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User to follow
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *                 example: uuid
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Already following user
 */
router.post(
  "/:id/follow",
  validateParams(userIdParamsSchema),
  validateBody(followUserBodySchema),
  controller.followUser,
);

/**
 * @swagger
 * /users/{id}/unfollow:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Users]
 *     description: User can unfollow another user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User to unfollow
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *                 example: uuid
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       400:
 *         description: Not following user
 */
router.post(
  "/:id/unfollow",
  validateParams(userIdParamsSchema),
  validateBody(followUserBodySchema),
  controller.unfollowUser,
);

export default router;
