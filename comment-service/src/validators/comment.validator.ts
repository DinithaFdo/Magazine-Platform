import { z } from "zod";

export const commentIdParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const articleIdParamsSchema = z.object({
  articleId: z.string().uuid("articleId must be a valid UUID"),
});

export const userIdParamsSchema = z.object({
  userId: z.string().uuid("userId must be a valid UUID"),
});

export const listCommentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  article_id: z.string().uuid().optional(),
});

export const createCommentBodySchema = z.object({
  article_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string().trim().min(1).max(2000),
  parent_comment_id: z.string().uuid().nullable().optional(),
});

export const updateCommentBodySchema = z.object({
  content: z.string().trim().min(1).max(2000),
});
