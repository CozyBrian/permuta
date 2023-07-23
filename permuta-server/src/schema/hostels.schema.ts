import { z } from "zod";

export const getHostelsQuerySchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  search: z.string().optional(),
});

export const getHostelsParamsSchema = z.object({
  id: z.string().uuid(),
});
