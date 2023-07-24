import { z } from "zod";

export const getHostelsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).default(10),
  page: z.coerce.number().int().min(1).default(1),
  search: z.string().optional(),
});

export const getHostelsParamsSchema = z.object({
  id: z.string().uuid(),
});
