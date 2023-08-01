import { z } from "zod";
import { auction_status } from "@prisma/client";

export const auctionsSchema = z.object({
  id: z.string().uuid(),
  item_id: z.string().uuid(),
  seller_id: z.string().uuid(),
  starting_price: z.number(),
  start_time: z.date(),
  end_time: z.date(),
  status: z.nativeEnum(auction_status).optional(),
});

export const auctionsCreateSchema = auctionsSchema.omit({
  id: true,
});

export const auctionsUpdateSchema = auctionsCreateSchema
  .omit({
    item: true,
    item_id: true,
    seller_id: true,
  })
  .partial()
  .extend({
    id: z.string().uuid(),
  });

export const getAuctionParamsSchema = z.object({
  id: z.string().uuid(),
});

export const getAuctionsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).default(10),
  page: z.coerce.number().int().min(1).default(1),
  seller_id: z.string().uuid().optional(),
  status: z.nativeEnum(auction_status).optional(),
});
