import {
  condition as condition_enum,
  item_status as item_status_enum,
} from "@prisma/client";
import { z } from "zod";

export const itemsSchema = z.object({
  id: z.string().uuid(),
  name: z.string({
    required_error: "Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  price: z.number({
    required_error: "Price is required",
  }),
  image_url: z.string().nullish(),
  category_id: z.string({
    required_error: "Category is required",
  }),
  seller_id: z
    .string({
      required_error: "Seller id is required",
    })
    .uuid(),
  condition: z.nativeEnum(condition_enum, {
    required_error: "Condition is required",
  }),
  status: z.nativeEnum(item_status_enum),
  created_at: z.date(),
  updated_at: z.date(),
});

export const itemsCreateSchema = itemsSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const itemsUpdateSchema = itemsCreateSchema.partial().extend({
  id: z.string().uuid(),
});

export const getItemsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).default(10),
  page: z.coerce.number().int().min(1).default(1),
  user_id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
  condition: z.nativeEnum(condition_enum).optional(),
  search: z.string().optional(),
});

export const getItemsParamsSchema = z.object({
  id: z.string().uuid(),
});
