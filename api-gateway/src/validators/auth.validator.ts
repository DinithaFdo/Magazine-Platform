import { z } from "zod";

export const loginBodySchema = z.object({
  username: z.string().trim().min(3).max(100),
  password: z.string().min(8).max(128),
});
