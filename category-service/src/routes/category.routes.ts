import express from "express";
import * as controller from "../controllers/category.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validation.middleware";
import {
  categoryIdParamsSchema,
  createCategoryBodySchema,
  listCategoriesQuerySchema,
  updateCategoryBodySchema,
} from "../validators/category.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     description: Create a category (name must be unique)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Technology
 *               description:
 *                 type: string
 *                 example: Articles related to technology and innovations
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists
 */
router.post(
  "/",
  validateBody(createCategoryBodySchema),
  controller.createCategory,
);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     description: Retrieve paginated list of categories
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
 *         description: Categories fetched successfully
 *       500:
 *         description: Failed to fetch categories
 */
router.get(
  "/",
  validateQuery(listCategoriesQuerySchema),
  controller.getCategories,
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 */
router.get(
  "/:id",
  validateParams(categoryIdParamsSchema),
  controller.getCategoryById,
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     description: Update category fields (name must remain unique)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Business
 *               description:
 *                 type: string
 *                 example: Articles related to business and finance
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid data or category already exists
 */
router.put(
  "/:id",
  validateParams(categoryIdParamsSchema),
  validateBody(updateCategoryBodySchema),
  controller.updateCategory,
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     description: Delete a category (may affect related articles)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete(
  "/:id",
  validateParams(categoryIdParamsSchema),
  controller.deleteCategory,
);

/**
 * @swagger
 * /categories/{id}/articles:
 *   get:
 *     summary: Get articles by category
 *     tags: [Categories]
 *     description: Returns all articles under a specific category (mocked or via service integration)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Articles fetched successfully for category
 *       404:
 *         description: Category not found
 */
router.get(
  "/:id/articles",
  validateParams(categoryIdParamsSchema),
  controller.getArticlesByCategory,
);

export default router;
