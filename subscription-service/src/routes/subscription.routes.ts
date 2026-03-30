import express from "express";
import * as controller from "../controllers/subscription.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validation.middleware";
import {
  createSubscriptionBodySchema,
  listSubscriptionsQuerySchema,
  subscriptionIdParamsSchema,
  subscriptionUserIdParamsSchema,
  updateSubscriptionBodySchema,
} from "../validators/subscription.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management APIs
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - plan
 *               - start_date
 *               - end_date
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               plan:
 *                 type: string
 *                 enum: [free, standard, premium]
 *               start_date:
 *                 type: string
 *                 example: 2026-01-01
 *               end_date:
 *                 type: string
 *                 example: 2026-12-31
 *               status:
 *                 type: string
 *                 enum: [active, expired, cancelled]
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       422:
 *         description: Validation failed
 *   get:
 *     summary: List subscriptions
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, expired, cancelled]
 *     responses:
 *       200:
 *         description: Subscriptions fetched successfully
 */

router.post(
  "/",
  validateBody(createSubscriptionBodySchema),
  controller.createSubscription,
);
router.get(
  "/",
  validateQuery(listSubscriptionsQuerySchema),
  controller.getSubscriptions,
);

/**
 * @swagger
 * /subscriptions/user/{userId}:
 *   get:
 *     summary: Get subscriptions by user
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User subscriptions fetched successfully
 *       422:
 *         description: Validation failed
 */

router.get(
  "/user/:userId",
  validateParams(subscriptionUserIdParamsSchema),
  controller.getSubscriptionsByUser,
);

/**
 * @swagger
 * /subscriptions/{id}:
 *   get:
 *     summary: Get subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Subscription fetched successfully
 *       404:
 *         description: Subscription not found
 *   put:
 *     summary: Update subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               plan:
 *                 type: string
 *                 enum: [free, standard, premium]
 *               start_date:
 *                 type: string
 *                 example: 2026-01-01
 *               end_date:
 *                 type: string
 *                 example: 2026-12-31
 *               status:
 *                 type: string
 *                 enum: [active, expired, cancelled]
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       422:
 *         description: Validation failed
 *   delete:
 *     summary: Delete subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 */

router.get(
  "/:id",
  validateParams(subscriptionIdParamsSchema),
  controller.getSubscriptionById,
);
router.put(
  "/:id",
  validateParams(subscriptionIdParamsSchema),
  validateBody(updateSubscriptionBodySchema),
  controller.updateSubscription,
);
router.delete(
  "/:id",
  validateParams(subscriptionIdParamsSchema),
  controller.deleteSubscription,
);

export default router;
