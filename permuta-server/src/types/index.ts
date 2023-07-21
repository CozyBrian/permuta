import { z } from "zod";
import {
  userCreateSchema,
  userLoginSchema,
  userSchema,
  userUpdateSchema,
} from "../schema/users.schema";

export type IUser = z.infer<typeof userSchema>;
export type IUserCreate = z.infer<typeof userCreateSchema>;
export type IUserUpdate = z.infer<typeof userUpdateSchema>;
export type IUserLogin = z.infer<typeof userLoginSchema>;
