import { z } from "zod";

export const bidsSchema = z.object({
  id: z.string().uuid(),
  auction_id: z.string().uuid(),
  bidder_id: z.string().uuid(),
  amount: z.number({
    required_error: "Amount is required",
  }),
  created_at: z.date(),
});

export const bidsCreateSchema = bidsSchema.omit({
  id: true,
  created_at: true,
});

export const getBidsParamsSchema = z.object({
  id: z.string().uuid(),
});
