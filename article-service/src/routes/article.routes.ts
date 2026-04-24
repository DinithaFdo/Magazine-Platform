import express from "express";
import * as controller from "../controllers/article.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validation.middleware";
import {
  articleIdParamsSchema,
  createArticleBodySchema,
  listArticlesQuerySchema,
  updateArticleBodySchema,
} from "../validators/article.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Article management APIs
 */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     description: Create a new article with draft or published status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author_id
 *               - category_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introduction to Artificial Intelligence
 *               content:
 *                 type: string
 *                 example: This article explains the basics of AI...
 *               author_id:
 *                 type: string
 *                 format: uuid
 *                 example: 22222222-2222-4222-8222-222222222222
 *               category_id:
 *                 type: string
 *                 format: uuid
 *                 example: 33333333-3333-4333-8333-333333333333
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["AI", "Technology"]
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: draft
 *               thumbnail_url:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Invalid article data
 */
router.post(
  "/",
  validateBody(createArticleBodySchema),
  controller.createArticle,
);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     description: Retrieve paginated and filtered articles
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
 *         name: category_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: author_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *     responses:
 *       200:
 *         description: Articles fetched successfully
 *       500:
 *         description: Failed to fetch articles
 */
router.get("/", validateQuery(listArticlesQuerySchema), controller.getArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article fetched successfully
 *       404:
 *         description: Article not found
 */
router.get(
  "/:id",
  validateParams(articleIdParamsSchema),
  controller.getArticleById,
);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Update article
 *     tags: [Articles]
 *     description: Update only provided fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article UUID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated AI Trends in 2026
 *               content:
 *                 type: string
 *                 example: Updated article body with new references and insights.
 *               author_id:
 *                 type: string
 *                 format: uuid
 *                 example: 22222222-2222-4222-8222-222222222222
 *               category_id:
 *                 type: string
 *                 format: uuid
 *                 example: 33333333-3333-4333-8333-333333333333
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["AI", "Research"]
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: published
 *               thumbnail_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/updated-image.jpg
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Invalid update data
 */
router.put(
  "/:id",
  validateParams(articleIdParamsSchema),
  validateBody(updateArticleBodySchema),
  controller.updateArticle,
);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
router.delete(
  "/:id",
  validateParams(articleIdParamsSchema),
  controller.deleteArticle,
);

/**
 * @swagger
 * /articles/{id}/publish:
 *   patch:
 *     summary: Publish article
 *     tags: [Articles]
 *     description: Change article status from draft to published
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article published successfully
 *       400:
 *         description: Article already published
 */
router.patch(
  "/:id/publish",
  validateParams(articleIdParamsSchema),
  controller.publishArticle,
);

/**
 * @swagger
 * /articles/{id}/unpublish:
 *   patch:
 *     summary: Unpublish article
 *     tags: [Articles]
 *     description: Change article status from published to draft
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article moved to draft
 *       400:
 *         description: Article already in draft state
 */
router.patch(
  "/:id/unpublish",
  validateParams(articleIdParamsSchema),
  controller.unpublishArticle,
);

export default router;
