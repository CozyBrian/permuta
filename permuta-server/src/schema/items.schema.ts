import { condition as condition_enum } from "@prisma/client";
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
  user_id: z
    .string({
      required_error: "User id is required",
    })
    .uuid(),
  condition: z.any(),
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
  limit: z.number().optional(),
  page: z.number().optional(),
  user_id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
  condition: z.nativeEnum(condition_enum).optional(),
});

export const getItemsParamsSchema = z.object({
  id: z.string().uuid(),
});
