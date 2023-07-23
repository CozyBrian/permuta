import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
  full_name: z
    .string({
      required_error: "Full name is required",
    })
    .min(3),
  phone_number: z
    .string({
      required_error: "Phone number is required",
    })
    .min(3),
  image_url: z.string().nullish(),
  hostel_id: z.string().uuid(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
});

export const userUpdateSchema = userCreateSchema.partial().extend({
  id: z.string().uuid(),
});

export const userLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
});

export const getUsersParamsSchema = z.object({
  id: z.string().uuid(),
});

export const getUsersQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).default(10),
  page: z.coerce.number().int().min(1).default(1),
  hostel_id: z.string().uuid().optional(),
  search: z.string().optional(),
});

export const getUserDetailsQuerySchema = z.object({
  items: z.boolean().or(z.string()).pipe(z.coerce.boolean()).optional(),
  hostel: z.boolean().or(z.string()).pipe(z.coerce.boolean()).optional(),
});

export const getUsernameQuerySchema = z.object({
  username: z.string().min(3),
});
