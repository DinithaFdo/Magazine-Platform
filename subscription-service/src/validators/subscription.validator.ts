import { z } from "zod";

export const subscriptionIdParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const subscriptionUserIdParamsSchema = z.object({
  userId: z.string().uuid("userId must be a valid UUID"),
});

export const listSubscriptionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  status: z.enum(["active", "expired", "cancelled"]).optional(),
});

const subscriptionBodyBaseSchema = z.object({
  user_id: z.string().uuid(),
  plan: z.enum(["free", "standard", "premium"]),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(["active", "expired", "cancelled"]).optional(),
});

export const createSubscriptionBodySchema = subscriptionBodyBaseSchema.refine(
  (data) => new Date(data.end_date) >= new Date(data.start_date),
  {
    message: "end_date must be greater than or equal to start_date",
    path: ["end_date"],
  },
);

export const updateSubscriptionBodySchema = subscriptionBodyBaseSchema
  .partial()
  .refine(
    (data) =>
      data.start_date === undefined ||
      data.end_date === undefined ||
      new Date(data.end_date) >= new Date(data.start_date),
    {
      message: "end_date must be greater than or equal to start_date",
      path: ["end_date"],
    },
  )
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
