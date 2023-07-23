import { z } from "zod";

export const getHostelsQuery = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  search: z.string().optional(),
});

export const getHostelsParams = z.object({
  id: z.string().uuid(),
});
