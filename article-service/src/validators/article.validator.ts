import { z } from "zod";

export const articleIdParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const listArticlesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  category_id: z.string().uuid().optional(),
  author_id: z.string().uuid().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export const createArticleBodySchema = z.object({
  title: z.string().trim().min(3).max(200),
  content: z.string().trim().min(10),
  author_id: z.string().uuid(),
  category_id: z.string().uuid(),
  tags: z.array(z.string().trim().min(1)).optional(),
  status: z.enum(["draft", "published"]).optional(),
  thumbnail_url: z.string().trim().url().optional(),
});

export const updateArticleBodySchema = createArticleBodySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
