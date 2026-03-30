import { z } from "zod";

export const categoryIdParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const listCategoriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const createCategoryBodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(500).optional(),
});

export const updateCategoryBodySchema = createCategoryBodySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
