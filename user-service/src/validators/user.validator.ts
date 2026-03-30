import { z } from "zod";

export const userIdParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const createUserBodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  bio: z.string().trim().max(500).optional(),
  country: z.string().trim().max(100).optional(),
  preferred_categories: z.array(z.string().trim().min(1)).optional(),
});

export const updateUserBodySchema = createUserBodySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const followUserBodySchema = z.object({
  follower_id: z.string().uuid("follower_id must be a valid UUID"),
});
