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