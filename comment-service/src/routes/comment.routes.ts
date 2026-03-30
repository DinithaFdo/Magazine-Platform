import express from "express";
import * as controller from "../controllers/comment.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validation.middleware";
import {
  articleIdParamsSchema,
  commentIdParamsSchema,
  createCommentBodySchema,
  listCommentsQuerySchema,
  updateCommentBodySchema,
  userIdParamsSchema,
} from "../validators/comment.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management APIs
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     description: Add a comment to an article (supports replies)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article_id
 *               - user_id
 *               - content
 *             properties:
 *               article_id:
 *                 type: string
 *                 example: uuid
 *               user_id:
 *                 type: string
 *                 example: uuid
 *               content:
 *                 type: string
 *                 example: This is a very informative article!
 *               parent_comment_id:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid comment data
 */
router.post(
  "/",
  validateBody(createCommentBodySchema),
  controller.createComment,
);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     description: Retrieve paginated comments with optional article filter
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
 *       - in: query
 *         name: article_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *       500:
 *         description: Failed to fetch comments
 */
router.get("/", validateQuery(listCommentsQuerySchema), controller.getComments);

router.get(
  "/article/:articleId",
  validateParams(articleIdParamsSchema),
  controller.getCommentsByArticle,
);

router.get(
  "/user/:userId",
  validateParams(userIdParamsSchema),
  controller.getCommentsByUser,
);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment fetched successfully
 *       404:
 *         description: Comment not found
 */
router.get(
  "/:id",
  validateParams(commentIdParamsSchema),
  controller.getCommentById,
);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update comment
 *     tags: [Comments]
 *     description: Only content field can be updated
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid update data
 */
router.put(
  "/:id",
  validateParams(commentIdParamsSchema),
  validateBody(updateCommentBodySchema),
  controller.updateComment,
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete(
  "/:id",
  validateParams(commentIdParamsSchema),
  controller.deleteComment,
);

export default router;
