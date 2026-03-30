import { z } from "zod";

export const mediaIdParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const mediaUserIdParamsSchema = z.object({
  userId: z.string().uuid("userId must be a valid UUID"),
});

export const listMediaQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  uploaded_by: z.string().uuid().optional(),
});

export const updateMediaBodySchema = z
  .object({
    file_name: z.string().trim().max(255).optional(),
    file_type: z.string().trim().max(100).optional(),
    file_size: z.coerce.number().positive().optional(),
    uploaded_by: z.string().uuid().optional(),
    url: z.string().trim().url().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const uploadMediaBodySchema = z.object({
  uploaded_by: z.string().uuid().optional(),
});
