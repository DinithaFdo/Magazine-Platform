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
router.get(
  "/user/:userId",
  validateParams(subscriptionUserIdParamsSchema),
  controller.getSubscriptionsByUser,
);
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
